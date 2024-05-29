"use client";
import { Box, Typography } from "@mui/material";

export default function LeaderBoard() {
  return (
    <Box
      sx={{
        width: "658px",
        height: "344px",
        background: "#50D7F5",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: "12px",
          mb: "16px",
        }}
      >
        <Typography
          sx={{
            color: "#FFFFFF",
            fontSize: "45px",
            fontWeight: "600",
            lineHeight: "65px",
          }}
        >
          Leaderboard Game View
        </Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          background: "red",
          display: "flex",
        }}
      >
        <Box sx={{ width: "160px", height: "208px", background: "blue" }}></Box>
      </Box>
    </Box>
  );
}
