"use client";
import Header from "../header";
import Navbar from "../navbar";
import Donation from "./donation";
import useRequireAuth from "../hook/useRequireAuth";


export default function Home() {
    const isValidating = useRequireAuth();
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
      <Navbar mode="3" />
      <Donation />
    </div>
  );
}