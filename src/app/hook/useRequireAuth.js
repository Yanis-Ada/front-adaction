"use client";
import { useEffect, useState } from "react";
import { url } from "../backend";

export default function useRequireAuth(isAdmin) {
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        async function verifyToken() {
            let token = sessionStorage.getItem("token");
            const infoToken = await fetch(`${url}/token`, {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            let info = await infoToken.json();
            if (isAdmin ? info["message"] !== "Token is valid and user is admin" : info["message"] !== 'Token is valid') {
                window.location.href = "/";
            } else {
                setIsValidating(false);
            }
        }
        verifyToken();
    },[]);

    return isValidating;
};