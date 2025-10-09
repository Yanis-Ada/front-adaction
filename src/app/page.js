"use client";
import React, { useEffect, useState } from "react";
import { Trophy, Sprout, UserPlus, MapPin, Trash2, Pen } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Header />
      <Navbar mode={"1"} />
      <VolunteerList />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-[#039668] text-white text-center p-5">
      <h1 className="text-xl font-bold">♻️ Adaction</h1>
      <p className="text-sm text-[#A6F3D0]">
        Agir pour un environnement plus propre
      </p>
    </header>
  );
}

function Navbar({ mode }) {
  return (
    <nav className="flex space-x-4 bg-white p-4 shadow">
      <div className="flex space-x-4 items-center justify-center w-full">
        {mode === "1" && (
          <>
            <div className="flex gap-1 flex-col md:gap-3 md:flex-row items-center bg-[#ECFDF5] rounded-xl ">
              <Sprout color="#039668" className="mt-2 md:mt-0" />
              <a
                href="#"
                className="text-[#039668]  hover:text-gray-900 mx-2 mb-2 md:mb-0 md:mx-0"
              >
                Gestion des bénévoles
              </a>
            </div>
            <div className="flex gap-1 flex-col md:gap-3 md:flex-row items-center mx-2">
              <Trophy color="#6C7280" />
              <a href="#" className="text-[#6C7280] hover:text-gray-900 ">
                Leaderboard
              </a>
            </div>
          </>
        )}
        {mode === "2" && (
          <>
            <div className="flex gap-1 flex-col md:gap-3 md:flex-row items-center ">
              <Sprout color="#6C7280" />
              <a
                href="#"
                className="text-[#6C7280]  hover:text-gray-900 "
              >
                Gestion des bénévoles
              </a>
            </div>
            <div className="flex gap-1 flex-col md:gap-3 md:flex-row items-center mx-2  bg-[#ECFDF5] rounded-xl ">
              <Trophy color="#039668" className="mt-2 md:mt-0" />
              <a href="#" className="text-[#039668] hover:text-gray-900 mx-2 mb-2 md:mb-0 md:mx-0">
                Leaderboard
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}



function VolunteerList() {

  return (
    <div className="bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">

        <button className="w-full flex items-center justify-center gap-2 bg-[#039668] hover:bg-green-700 text-white font-medium py-2.5 rounded-lg mb-4 transition">
          <UserPlus />
          Ajouter un.e bénévole
        </button>

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
                <option>Paris</option>
                <option>Nantes</option>
                <option>Lyon</option>
              </select>
            </div>
          </div>
        </div>
        <VolunteerCard />
      </div>
    </div>
  );
}


function VolunteerCard() {
  const [data, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/volunteers")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);
  return (
    <div>
      {data.map((volunteer) => (
        <div className="space-y-3 mb-2" key={volunteer.volunteers_id}>
          <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition">
            <div>
              <p className="font-medium">{volunteer.firstname} {volunteer.lastname}</p>
              <p className="text-sm text-gray-500">{volunteer.city_name}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200">
                <Pen />
              </button>
              <ButtonDelete onSmash={() => {
                let answer = confirm(`Veux-tu vraiment supprimer ${volunteer.firstname} ${volunteer.lastname} ?`);
                if (answer) {
                  fetch(`http://localhost:3001/volunteers/${volunteer.volunteers_id}`, {
                    method: 'DELETE',
                  });
                  setPosts(data.filter(v => v.volunteers_id !== volunteer.volunteers_id));
                }
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ButtonDelete({ onSmash }) {
  return (
    <button onClick={onSmash} className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200">
      <Trash2 />
    </button>
  )
}
