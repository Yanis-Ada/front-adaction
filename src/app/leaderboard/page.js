"use client";

import Header from "../header";
import Navbar from "../navbar";
import Leaderboard from "./leaderboard";
import useRequireAuth from "../hook/useRequireAuth";

export default function Home() {
    const isValidating = useRequireAuth(true);
      if (isValidating) {
  return (
    <div>
      <p>Chargement de la page...</p>
    </div>
  );
}
    return (
        <div>
            <Header />
            <Navbar mode={"2"} isadmin={true} />
            <Leaderboard />
        </div>
    );
}
