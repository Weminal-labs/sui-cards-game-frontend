"use client";
import { useAppDispatch } from "@/store";
import { setAuthState } from "@/slice/authSlice";
import { useAppSelector } from "@/store";
import { Box } from "@mui/material";
import LogoIcons from "@/assets/svgs/logos";
import Image from "next/image";
import UserSelectionBox from "@/components/userSelectionBox";
import IconButton from "@/components/Buttons/IconButton";
import BasicIcons from "@/assets/svgs/basicIcons";
import TransactionsTable from "@/components/TransactionsTable";
import { makeStyles } from "@material-ui/core/styles";
import { Unity, useUnityContext } from "react-unity-webgl";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const useStyles = makeStyles(() => ({
  canvas: {
    width: "100%",
    height: "500px",
    maxHeight: "500px",
    minHeight: "300px",
    borderRadius: "20px",
  },
}));

export default function GamingPage() {
  const classes = useStyles();
  const router = useRouter();

  const { unityProvider } = useUnityContext({
    loaderUrl: "build/WebGL.loader.js",
    dataUrl: "build/WebGL.data",
    frameworkUrl: "build/WebGL.framework.js",
    codeUrl: "build/WebGL.wasm",
  });

  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.auth);
  const handleGoogleLogOut = () => {
    sessionStorage.clear();
    dispatch(setAuthState(false));
    console.log(authState);
    router.push("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        minWidth: "761px",
        minHeight: "514px",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          height: "73px",
          pl: "50px",
          pr: "32px",
          display: "flex",
          justifyContent: "space-between",
          mb: "20px",
        }}
      >
        <Image
          src={LogoIcons.lg_edu}
          width={57}
          height={73}
          alt="Edu icon"
          priority
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            height: "100%",
          }}
        >
          <IconButton
            width={"54px"}
            height={"46px"}
            src={BasicIcons.ic_shopping}
            src_width={43}
            src_height={39}
            borderRadius={"27px"}
            backGround="#70FFFF"
            border={"2px solid var(--Colors-Black, #18191F)"}
            onClick={handleGoogleLogOut}
          />
          <Box sx={{ ml: "13px" }}>
            <UserSelectionBox />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          height: "calc(100vh - 73px - 20px - 33px)",
          width: "calc(100vw - 24px - 32px)",
          minWidth: "705px",
          minHeight: "514px",
          borderRadius: "15px",
          background: "#E9E7FC",
          position: "absolute",
          pointerEvents: "none",
          ml: "24px",
          mr: "32px",
          opacity: 0.8,
          zIndex: 0,
        }}
      ></Box>

      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "15px",
          display: "flex",
          ml: "24px",
          mr: "32px",
          height: "calc(100vh - 73px - 20px - 33px)",
          px: "20px",
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            zIndex: 1,
          }}
        >
          <Unity unityProvider={unityProvider} className={classes.canvas} />
        </Box>
        <Box
          sx={{
            width: "40%",
            zIndex: 1,
          }}
        >
          <Box sx={{ ml: "30px" }}>
            <TransactionsTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
