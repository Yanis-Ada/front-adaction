"use client";
import { useEffect, useState } from "react";
import { url } from "../backend";

export default function UserForm() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        city: "",
    });


    useEffect(() => {
        const token = sessionStorage.getItem("token")
        fetch(`${url}/volunteers/token/${token}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    firstname: data.firstname || "",
                    lastname: data.lastname || "",
                    email: data.email || "",
                    password: "",
                    city: data.city || "",
                });
            })
            .catch((error) => console.error("Erreur lors du chargement :", error));
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token")
        const res = await fetch(`${url}/volunteers/token/${token}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        let response = await res.json()
        let error = { error: 'Email already exists' }
        if (response['error'] == error['error']) {
            alert("Email déjà utilisé");
        } else {
            window.location.reload();
            alert("Informations mises à jour !");
        }
    };

    const requiredFields = ["firstname", "lastname", "email", "city"];
    const isFormValid = requiredFields.every(
        (key) => formData[key].trim() !== ""
    );
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Éditer mes informations</h2>

            <form className="space-y-4">
                <div>
                    <label className="block font-medium">Prénom</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block font-medium">Nom</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block font-medium">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block font-medium">Localisation</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    />
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className=" w-full px-4 py-2 bg-[#039668] text-white rounded-lg mb-2"
                >
                    Mettre à jour
                </button>
            </form>
        </div>
    )

}