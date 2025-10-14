import { url } from "../backend";

import {
  ChevronLeft,
  ChevronRight,
  Cigarette,
  Package,
  Wine,
  Trash2,
  Smartphone,
  CircleQuestionMark,
} from "lucide-react";
import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';



export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [user, setUser] = useState([]);
  const [counts, setCounts] = useState({
    nb_butt: 0,
    nb_plastic: 0,
    nb_glass: 0,
    nb_metal: 0,
    nb_electronic: 0,
    nb_other: 0,
  });
  let token = sessionStorage.getItem("token")
  const reload = async (date) => {
    try {
      const res = await fetch(
        `${url}/dashboard/${format(date, "yyyy-MM", { locale: fr })}/${token}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      const data = response[0] || response;
      setCounts(data);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  useEffect(() => {
    reload(currentDate);
  }, [currentDate]);


  useEffect(() => {
    fetch(`${url}/volunteers/token/${token}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
  }, []);

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  return (
    <div className="bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold mb-4">
          Bonjour {user.firstname} !
        </h1>

        <div className="flex items-center justify-center gap-4 text-gray-800 font-semibold text-lg">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Mois précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span>{format(currentDate, "MMMM yyyy", { locale: fr })}</span>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Mois suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {[
          { icon: <Cigarette />, color: "bg-[#fbbf24]", label: "Mégot de cigarette", value: counts.nb_butt },
          { icon: <Package />, color: "bg-[#7cb4fb]", label: "Plastique", value: counts.nb_plastic },
          { icon: <Wine />, color: "bg-[#32d399]", label: "Verre", value: counts.nb_glass },
          { icon: <Trash2 />, color: "bg-[#94a3b8]", label: "Métal", value: counts.nb_metal },
          { icon: <Smartphone />, color: "bg-[#a78bfa]", label: "Électronique", value: counts.nb_electronic },
          { icon: <CircleQuestionMark />, color: "bg-[#f87171]", label: "Autres", value: counts.nb_other },
        ].map(({ icon, color, label, value }, i) => (
          <div
            key={i}
            className="mb-2 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-md text-white ${color}`}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">{label}</h3>
              <p className="text-xs text-gray-500">
                {value} collecte{value > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
