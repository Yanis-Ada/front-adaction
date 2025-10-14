"use client";
import Header from "../header";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import Collect from "./collect";

export default function Home() {
    const [isValidating, setIsValidating] = useState(true);
      useEffect(() => {
        async function token() {
        let token = sessionStorage.getItem("token")
        const infoToken = await fetch("http://localhost:3001/token", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });
        let info = await infoToken.json()
        if (info["message"] !== 'Token is valid') {
          window.location.href = "/"
        }else{
          setIsValidating(false);
        }
      }
      token()
      }, []);
      if (isValidating) {
        return (
          <div >
          </div>
        );
      }
  return (
    <div>
      <Header />
      <Navbar mode="2" />
      <Collect />
    </div>
  );
}