"use client";

import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MapPin, CircleAlert } from "lucide-react";


export default function Collect() {
    const [cityList, setcityList] = useState([]);
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [city, setCity] = useState("");
    const [waste, setWaste] = useState({
        nb_butt: 0,
        nb_plastic: 0,
        nb_glass: 0,
        nb_metal: 0,
        nb_electronic: 0,
        nb_other: 0,
    });

    const handleIncrement = (type) => {
        setWaste((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    };

    const handleDecrement = (type) => {
        setWaste((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
    };

    const handleChange = (type, value) => {
        const val = Number(value);
        setWaste((prev) => ({ ...prev, [type]: isNaN(val) ? 0 : val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        alert("Collecte enregistrée !");
        const token = sessionStorage.getItem('token');
        const res = await fetch("http://localhost:3001/collect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, date, city, waste }),
        });
        console.log({ token, date, city, waste })
        let response = await res.json()
        console.log(response)
        window.location.reload();

    };

    useEffect(() => {
        fetch("http://localhost:3001/city")
            .then((response) => response.json())
            .then((data) => setcityList(data))
    }, []);

    return (
        <div className="bg-gray-50 flex justify-center py-10">
            <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4"
                >
                    <h2 className="flex items-center  justify-center text-lg font-semibold text-gray-800">
                        <CircleAlert className='mr-2' /> Enregistrer une collecte
                    </h2>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                            Date *
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                            Localisation
                        </label>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Sélectionnez une ville</option>
                            {cityList.map((city) => (
                                <option key={city.name} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Type de déchet *</p>
                        <div className="space-y-2">
                            {Object.entries(waste).map(([type, valeur]) => (
                                <div
                                    key={type}
                                    className="flex items-center justify-between border border-gray-200 rounded-xl p-2"
                                >
                                    <span className="flex items-center gap-2 capitalize">
                                        {type === "nb_butt" && "🚬 Mégots de cigarette"}
                                        {type === "nb_plastic" && "🧴 Plastique"}
                                        {type === "nb_glass" && "🍾 Verre"}
                                        {type === "nb_metal" && "🪙 Métal"}
                                        {type === "nb_electronic" && "💻 Électronique"}
                                        {type === "nb_other" && "❓ Autre"}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleDecrement(type)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                                        >
                                            −
                                        </button>

                                        <input
                                            type="number"
                                            min={0}
                                            value={valeur}
                                            onChange={(e) => handleChange(type, e.target.value)}
                                            className="w-16 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleIncrement(type)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!city || Object.values(waste).every((val) => val === 0)}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                        💾 Enregistrer
                    </button>
                </form>
            </div>
        </div>

    );
}

