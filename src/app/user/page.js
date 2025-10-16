"use client";
import Header from "../header";
import Navbar from "../navbar";
import UserForm from "./update";
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
            <Navbar mode="4" />
            <div className="bg-gray-50 flex justify-center py-10">
                <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
                    <UserForm />
                    <button
                        onClick={() => {
                            sessionStorage.removeItem("token");
                            window.location.href = "/";
                        }}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
}