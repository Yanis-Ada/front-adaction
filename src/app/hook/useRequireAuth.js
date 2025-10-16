"use client";
import { useEffect, useState } from "react";
import { url } from "../backend";

export default function useRequireAuth() {
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        async function verifyToken() {
            let token = sessionStorage.getItem("token");
            const infoToken = await fetch(`${url}/token`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token }),
            });
            let info = await infoToken.json();
            if (info["message"] !== 'Token is valid') {
                window.location.href = "/";
            } else {
                setIsValidating(false);
            }
        }
        verifyToken();
    },[]);

    return isValidating;
};