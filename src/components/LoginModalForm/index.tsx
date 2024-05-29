import Box from "@mui/material/Box";
import XCloseButton from "@/components/Buttons/XCloseButton";
import TextButton from "../Buttons/TextButton";
import LogoIcons from "@/assets/svgs/logos";

export type LoginModalFormProp = {
  handleCloseModal: () => void;
  handleGoogleLogin?: () => void;
};

export default function LoginModalForm({
  handleCloseModal,
  handleGoogleLogin,
}: LoginModalFormProp) {
  return (
    <Box sx={{ width: "359.27px", height: "271.05px" }}>
      <Box
        sx={{
          width: "359px",
          height: "257px",
          background: "#E9E7FC",
          filter: "blur(100px)",
          position: "absolute",
          pointerEvents: "none",
        }}
      ></Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            width: "359.27px",
            height: "257.4px",
            background: "#D9D9D9",
            borderRadius: "20px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            sx={{
              height: "27.29px",
              mx: "25.47px",
              mt: "16.37px",
              mb: "34.56px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <XCloseButton onClick={handleCloseModal} />
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", mb: "22.25px" }}
          >
            <TextButton
              width="294.69px"
              height="50.93px"
              border="2px solid var(--Colors-Black, #18191F)"
              borderRadius="16px"
              backGround="var(--White, #FFFFF)"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              src={LogoIcons.lg_google}
              src_width={28}
              src_height={28}
              buttonLabel="Login with Google"
              margin_left_icon_label_button="63px"
              text_button_label_prop={{
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "20px",
                ml: "15px",
              }}
              onClick={handleGoogleLogin}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextButton
              width="294.69px"
              height="50.93px"
              border="2px solid var(--Colors-Black, #18191F)"
              borderRadius="16px"
              backGround="#4AE8F2"
              src={LogoIcons.lg_sui}
              src_width={28}
              src_height={28}
              buttonLabel="Sui Wallet"
              margin_left_icon_label_button="63px"
              text_button_label_prop={{
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "20px",
                ml: "15px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
