"use client";
import Header from "../header";
import Navbar from "../navbar";
import Dashboard from "./dashboard";
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
      <Navbar mode="1" />
      <Dashboard />
    </div>
  );
}