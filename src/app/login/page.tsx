"use client";

import Box from "@mui/material/Box";
import LoginModalForm from "@/components/LoginModalForm";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Modal, Button } from "@mui/material";
import TextButton from "@/components/Buttons/TextButton";
import LogoIcons from "@/assets/svgs/logos";
import { useAppSelector } from "@/store";
import { useAppDispatch } from "@/store";
import { setAuthState } from "@/slice/authSlice";
import beginZkLogin from "@/components/ZkLogin/beginZk";
import completeZkLogin from "@/components/ZkLogin/completeZk";
import { useRef } from "react";

type OpenIdProvider = "Google" | "Twitch" | "Facebook";
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

const setupDataKey = "zklogin-demo.setup";
const accountDataKey = "zklogin-demo.accounts";

export default function LoginPage() {
  const accounts = useRef<AccountData[]>([]);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const authState = useAppSelector((state) => state.auth.auth);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGoogleLogin = async () => {
    beginZkLogin("Google");
  };

  const handleGoogleLogOut = () => {
    sessionStorage.clear();
    accounts.current = [];
    dispatch(setAuthState(false));
  };

  useEffect(() => {
    console.log(authState);
    completeZkLogin(accounts.current);
    const dataRaw = sessionStorage.getItem(setupDataKey);
    if (dataRaw) {
      console.log(dataRaw);
      setTimeout(() => {
        dispatch(setAuthState(true));
      }, 3000);
    }
  }, [authState]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextButton
            onClick={handleOpen}
            height={"43px"}
            borderRadius="15px"
            border="1px solid var(--Black, #000)"
            opacity="0.5"
            src={LogoIcons.lg_sui_transparent}
            src_width={20}
            src_height={25}
            margin_left_icon_label_button="12px"
            backGround="rgba(81, 185, 185, 1)"
            color="white"
            text_button_label_prop={{
              fontSize: "17px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              ml: "5px",
              mr: "12px",
            }}
            buttonLabel="Connect"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Button
            onClick={handleGoogleLogOut}
            sx={{
              background: "green",
              color: "white",
              my: 3,
              width: "123px",
              height: "43px",
            }}
          >
            Logout
          </Button> */}
        </Box>
      </Box>
      <Typography variant="h4"></Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LoginModalForm
            handleCloseModal={handleClose}
            handleGoogleLogin={handleGoogleLogin}
          ></LoginModalForm>
        </Box>
      </Modal>
    </Box>
  );
}
