"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LoginPage from "./login/page";
import { useRouter } from "next/navigation";
import LeaderBoard from "@/components/LeaderBoard";

const setupDataKey = "zklogin-demo.setup";

export default function MainPage() {
  const [dataRaw, setDataRaw] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if we are running on the client side
    if (typeof window !== "undefined") {
      const data = sessionStorage?.getItem(setupDataKey);
      setDataRaw(data);
      if (data) {
        router.push("/playGame");
      }
    }
  }, [router]);

  return <Box>{!dataRaw ? <LoginPage /> : null}</Box>;
}
