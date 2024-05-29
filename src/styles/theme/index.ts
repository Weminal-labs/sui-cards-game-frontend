"use client";

import { createTheme, Theme } from "@mui/material/styles";
import { montserrat } from "@/assets/fonts";
import colors from "@/styles/colors";

const theme: Theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: colors.bgColor1,
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
});

export default theme;
