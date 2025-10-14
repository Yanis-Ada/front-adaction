"use client";
import Header from "../header";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import { url } from "../backend";
import UserForm from "./update";


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
            if (info["message"] !== 'Token is valid') {
                window.location.href = "/"
            } else {
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