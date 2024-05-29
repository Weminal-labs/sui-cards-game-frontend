import { Box, Button } from "@mui/material";
import BasicIcons from "@/assets/svgs/basicIcons";
import Image from "next/image";

export type XCloseButtonProp = {
  onClick: () => void;
};

export default function XCloseButton({ onClick }: XCloseButtonProp) {
  return (
    <Button
      sx={{
        width: "28px",
        minWidth: "28px",
        minHeight: "28px",
        flexShrink: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.1s linear",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 4px 0px 0px #18191F",
        },
        "&:active": {
          transform: "translateY(0px)",
          boxShadow: "0",
        },
        border: `2px solid black`,
        borderRadius: "360px",
      }}
      onClick={onClick}
    >
      <Image
        src={BasicIcons.ic_x_button}
        width={29}
        height={29}
        alt="close button icon"
      />
    </Button>
  );
}
