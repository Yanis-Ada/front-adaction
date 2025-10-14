import { MapPin } from "lucide-react";
import VolunteerCard from "./volunteerCard";
import ButtonAdd from "./button_add";
import React, { useState, useEffect } from 'react';
import { url } from "../backend";

export default function VolunteerList() {
  const [cityList, setcityList] = useState([]);
  useEffect(() => {
    fetch(`${url}/city`)
      .then((response) => response.json())
      .then((data) => setcityList(data))
  }, []);
  return (
    <div className="bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">

        <ButtonAdd />

        <div className="grid grid-cols-2 gap-2 mb-4 w-full">

          <input
            type="text"
            placeholder="Rechercher un.e bénévole"
            className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="w-full">
            <div className="flex items-center w-full h-11 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 hover:bg-gray-100">
              <MapPin className="mr-2" />
              <select className="w-full bg-transparent outline-none appearance-none">
                <option>Toutes les villes</option>
                {cityList.map((city) => (
                  <option key={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <VolunteerCard />
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
  );
}