"use client";

import Header from "../header";
import Navbar from "./navbar";
import VolunteerList from "./volunteerList";
import { useEffect , useState} from "react";
import { url } from "../backend";


export default function Home() {
  const [isValidating, setIsValidating] = useState(true);
  useEffect(() => {
    async function token() {
    let token = sessionStorage.getItem("token")
    const infoToken = await fetch(`${url}/token`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });
    let info = await infoToken.json()
    if (info["message"] !== "Token is valid and user is admin") {
      window.location.href = "/"
    }else{
      setIsValidating(false);
    }
  }
  token()
  }, []);
  if (isValidating) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-700">
        Vérification du token...
      </div>
    );
  }
  return (
    <div>
      <Header />
      <Navbar mode={"1"} />
      <VolunteerList />
    </div>
  );
}















