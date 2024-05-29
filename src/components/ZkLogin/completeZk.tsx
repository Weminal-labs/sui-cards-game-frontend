type OpenIdProvider = "Google" | "Twitch" | "Facebook";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/zklogin";
import {
  NetworkName,
  makeExplorerUrl,
  requestSuiFromFaucet,
  shortenSuiAddress,
} from "@polymedia/suits";
import { jwtDecode } from "jwt-decode";
import {
  SerializedSignature,
  decodeSuiPrivateKey,
} from "@mysten/sui.js/cryptography";
import { useAppDispatch } from "@/store";
import { setAuthState } from "@/slice/authSlice";

const NETWORK: NetworkName = "devnet";
const MAX_EPOCH = 2;
const CLIENT_ID_GOOGLE =
  "549669484812-dh07q7ifi51v0l7dgic6l2ugm1gh5lsf.apps.googleusercontent.com";

const ENOKI_API_KEY = "enoki_private_91190f0f97b67a73de5d23ff7177f674";
const ENOKI_API_AUTHORIZATION = "Bearer " + ENOKI_API_KEY;

const accountDataKey = "zklogin-demo.accounts";
const setupDataKey = "zklogin-demo.setup";

type SetupData = {
  provider: OpenIdProvider;
  maxEpoch: number;
  randomness: string;
  ephemeralPrivateKey: string;
};

type AccountData = {
  provider: OpenIdProvider;
  userAddr: string;
  zkProofs: any;
  ephemeralPrivateKey: string;
  userSalt: string;
  sub: string;
  aud: string;
  maxEpoch: number;
};

function loadSetupData(): SetupData | null {
  const dataRaw = sessionStorage.getItem(setupDataKey);
  if (!dataRaw) {
    return null;
  }
  const data: SetupData = JSON.parse(dataRaw);
  return data;
}

function clearSetupData(): void {
  sessionStorage.removeItem(setupDataKey);
}

function keypairFromSecretKey(privateKeyBase64: string): Ed25519Keypair {
  const keyPair = decodeSuiPrivateKey(privateKeyBase64);
  return Ed25519Keypair.fromSecretKey(keyPair.secretKey);
}

export default async function completeZkLogin(accounts: AccountData[]) {
  // === Grab and decode the JWT that beginZkLogin() produced ===
  // https://docs.sui.io/concepts/cryptography/zklogin#decoding-jwt

  function saveAccount(account: AccountData): void {
    const newAccounts = [account, ...accounts];
    sessionStorage.setItem(accountDataKey, JSON.stringify(newAccounts));
    accounts = newAccounts;
  }

  // grab the JWT from the URL fragment (the '#...')
  const urlFragment = window.location.hash.substring(1);
  const urlParams = new URLSearchParams(urlFragment);
  const jwt = urlParams.get("id_token");

  if (!jwt) {
    return;
  }

  console.log("jwt", jwt);

  // remove the URL fragment
  window.history.replaceState(null, "", window.location.pathname);

  // decode the JWT
  const jwtPayload = jwtDecode(jwt);

  /****************** */
  sessionStorage.setItem("jwtPayload", JSON.stringify(jwtPayload));
  /************** */

  if (!jwtPayload.sub || !jwtPayload.aud) {
    console.warn("[completeZkLogin] missing jwt.sub or jwt.aud");
    return;
  }

  // === Get the salt by using zklogin ===
  // https://docs.sui.io/concepts/cryptography/zklogin#user-salt-management

  const enokiRequestOptions = {
    method: "GET", // Hoặc "POST" tùy thuộc vào yêu cầu của bạn
    headers: {
      Authorization: ENOKI_API_AUTHORIZATION,
      "zklogin-jwt": jwt,
    },
  };

  const enokiResponse = await fetch(
    "https://api.enoki.mystenlabs.com/v1/zklogin",
    enokiRequestOptions
  )
    .then((res) => {
      console.debug("[completeZkLogin] salt service success");
      return res.json();
    })
    .catch((error: unknown) => {
      console.warn("[completeZkLogin] salt service error:", error);
      return null;
    });

  if (!enokiResponse) {
    return;
  }

  console.log("Enoki zklogin: ", enokiResponse.data);

  if (enokiResponse.data) {
  }

  const userSalt = BigInt(enokiResponse.data.salt);

  // === Get a Sui address for the user ===
  // https://docs.sui.io/concepts/cryptography/zklogin#get-the-users-sui-address

  const userAddr = jwtToAddress(jwt, userSalt);

  // === Load and clear the data which beginZkLogin() created before the redirect ===
  const setupData = loadSetupData();
  if (!setupData) {
    console.warn("[completeZkLogin] missing session storage data");
    return;
  }

  clearSetupData();

  for (const account of accounts) {
    if (userAddr === account.userAddr) {
      console.warn(
        `[completeZkLogin] already logged in with this ${setupData.provider} account`
      );
      return;
    }
  }

  // === Get the zero-knowledge proof ===
  // https://docs.sui.io/concepts/cryptography/zklogin#get-the-zero-knowledge-proof

  const ephemeralKeyPair = keypairFromSecretKey(setupData.ephemeralPrivateKey);

  const ephemeralPublicKey = ephemeralKeyPair.getPublicKey();

  const payload = JSON.stringify({
    network: "devnet",
    randomness: setupData.randomness,
    maxEpoch: setupData.maxEpoch,
    ephemeralPublicKey: getExtendedEphemeralPublicKey(ephemeralPublicKey),
  });

  const zkProofs = await fetch(
    "https://api.enoki.mystenlabs.com/v1/zklogin/zkp",
    {
      method: "POST",
      headers: {
        Authorization: ENOKI_API_AUTHORIZATION,
        "zklogin-jwt": jwt,
      },
      body: payload,
    }
  )
    .then((res) => {
      console.debug("[completeZkLogin] ZK proving service success");
      return res.json();
    })
    .catch((error: unknown) => {
      console.warn("[completeZkLogin] ZK proving service error:", error);
      return null;
    });

  if (!zkProofs) {
    return;
  }

  console.log("zkProofs", zkProofs.data);

  saveAccount({
    provider: setupData.provider,
    userAddr,
    zkProofs: zkProofs.data,
    ephemeralPrivateKey: setupData.ephemeralPrivateKey,
    userSalt: userSalt.toString(),
    sub: jwtPayload.sub,
    aud:
      typeof jwtPayload.aud === "string" ? jwtPayload.aud : jwtPayload.aud[0],
    maxEpoch: setupData.maxEpoch,
  });
}
