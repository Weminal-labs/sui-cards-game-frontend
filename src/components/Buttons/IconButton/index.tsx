import { ButtonProps, Button, Box } from "@mui/material";
import { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export type TextButtonProps = {
  width?: string;
  height: string;
  boxShadow?: string;
  border?: string;
  borderRadius?: string;
  backGround?: string;
  onClick?: ButtonProps["onClick"];
  children?: ReactNode;
  buttonLabel?: string;
  color?: string;
  src: string;
  src_width: number;
  src_height: number;
  opacity?: string;
  margin_left_icon_label_button?: string;
  text_button_label_prop?: object;
};

export default function IconButton({
  width,
  height,
  border,
  borderRadius,
  boxShadow,
  backGround,
  onClick,
  color,
  src,
  src_width,
  src_height,
  opacity,
}: TextButtonProps) {
  return (
    <Button
      sx={{
        minWidth: width ?? "auto",
        height: height ?? "auto",
        flexShrink: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: border,
        borderRadius: borderRadius,
        background: backGround ?? "white",
        color: color ?? "black",
        boxShadow: boxShadow,
        textTransform: "none",
        padding: 0,
        opacity: opacity,
        "&:hover": {
          backgroundColor: "#FFFFFF",
        },
      }}
      onClick={onClick}
    >
      <Image
        src={src}
        width={src_width}
        height={src_height}
        alt="icon button label"
      />
    </Button>
  );
}
