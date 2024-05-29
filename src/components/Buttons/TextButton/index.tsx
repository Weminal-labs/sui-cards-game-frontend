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
  src?: string;
  src_width?: number;
  src_height?: number;
  opacity?: string;
  margin_left_icon_label_button?: string;
  text_button_label_prop?: object;
};

export default function TextButton({
  width,
  height,
  border,
  borderRadius,
  boxShadow,
  backGround,
  onClick,
  children,
  buttonLabel,
  color,
  src,
  src_width,
  src_height,
  opacity,
  margin_left_icon_label_button,
  text_button_label_prop,
}: TextButtonProps) {
  return (
    <Button
      sx={{
        width: width ?? "auto",
        height: height ?? "auto",
        flexShrink: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        border: border,
        borderRadius: borderRadius,
        background: backGround ?? "white",
        color: color ?? "black",
        boxShadow: boxShadow,
        textTransform: "none",
        padding: 0,
        opacity: opacity,
      }}
      onClick={onClick}
    >
      {buttonLabel ? (
        src ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: margin_left_icon_label_button,
            }}
          >
            <Image
              src={src}
              width={src_width}
              height={src_height}
              alt="icon button label"
            />
            <Typography sx={text_button_label_prop}>{buttonLabel}</Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "20px",
            }}
          >
            {buttonLabel}
          </Typography>
        )
      ) : (
        children
      )}
    </Button>
  );
}
