"use client";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import LogoIcons from "@/assets/svgs/logos";
import Image from "next/image";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import BasicIcons from "@/assets/svgs/basicIcons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/system";

const StyledArrowIcon = styled(KeyboardArrowDownIcon)({
  fontSize: "30px", // Điều chỉnh kích thước ở đây
  color: "black", // Điều chỉnh màu sắc ở đây
});

const StyledTyprography = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  fontStyle: "normal",
});

export default function UserSelectionBox() {
  const [age, setAge] = useState("");
  const [userData, setUserData] = useState<any>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataRaw = sessionStorage.getItem("jwtPayload");
      if (dataRaw) {
        setUserData(JSON.parse(dataRaw));
      }
    }
  }, []);

  return (
    <Box>
      <FormControl>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          IconComponent={StyledArrowIcon}
          sx={{
            borderRadius: "12px",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
            height: "43px",
            background: "white",
            display: "flex",
          }}
        >
          <MenuItem value="">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                sx={{ width: "40px", height: "40px", borderRadius: "360px" }}
                src={userData?.picture}
              ></Box>
              <StyledTyprography sx={{ mx: "15px", mr: "15px" }}>
                {userData?.email}
              </StyledTyprography>
            </Box>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
