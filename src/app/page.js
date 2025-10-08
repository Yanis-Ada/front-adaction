"use client";
import React, { useEffect, useState } from "react";
import { Trophy, Sprout, UserPlus, MapPin, Trash2 , Pen  } from "lucide-react";

export default function Home() {
  const [data, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/volunteers")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);
  return (
    <div>
      <Header />
      <Navbar mode={"1"} />
      <VolunteerList />
      <ul>
        {data.map((volunteer) => (
          <li key={volunteer.volunteers_id}>
            {volunteer.firstname} {volunteer.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header() {
  return (
    <header class="bg-[#039668] text-white text-center p-5">
      <h1 class="text-xl font-bold">♻️ Adaction</h1>
      <p class="text-sm text-[#A6F3D0]">
        Agir pour un environnement plus propre
      </p>
    </header>
  );
}

function Navbar({ mode }) {
  return (
    <nav class="flex space-x-4 bg-white p-4 shadow">
      <div class="flex space-x-4 items-center justify-center w-full">
        {mode === "1" && (
          <>
            <div class="flex gap-1 flex-col md:gap-3 md:flex-row items-center bg-[#ECFDF5] rounded-xl ">
              <Sprout color="#039668" class="mt-2 md:mt-0" />
              <a
                href="#"
                class="text-[#039668]  hover:text-gray-900 mx-2 mb-2 md:mb-0 md:mx-0"
              >
                Gestion des bénévoles
              </a>
            </div>
            <div class="flex gap-1 flex-col md:gap-3 md:flex-row items-center mx-2">
              <Trophy color="#6C7280" />
              <a href="#" class="text-[#6C7280] hover:text-gray-900 ">
                Leaderboard
              </a>
            </div>
          </>
        )}
        {mode === "2" && (
          <>
            <div class="flex gap-1 flex-col md:gap-3 md:flex-row items-center ">
              <Sprout color="#6C7280" />
              <a
                href="#"
                class="text-[#6C7280]  hover:text-gray-900 "
              >
                Gestion des bénévoles
              </a>
            </div>
            <div class="flex gap-1 flex-col md:gap-3 md:flex-row items-center mx-2  bg-[#ECFDF5] rounded-xl ">
              <Trophy color="#039668" class="mt-2 md:mt-0" />
              <a href="#" class="text-[#039668] hover:text-gray-900 mx-2 mb-2 md:mb-0 md:mx-0">
                Leaderboard
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

// function VolunteerList() {
//   return (
//     <div class="bg-gray-50 flex justify-center py-10">
//       <div class="bg-white rounded-2xl shadow p-5 w-full max-w-sm">

//         <button class="w-full flex items-center justify-center gap-2 bg-[#039668] hover:bg-green-700 text-white font-medium py-2.5 rounded-lg mb-4 transition">
//           <UserPlus />
//           Ajouter un.e bénévole
//         </button>


//         <div class="flex gap-2 mb-4">
//           <input type="text" placeholder="Rechercher un.e bénévole" class="relative  flex px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
//           <div class="relative  flex border rounded-lg px-3 py-2 text-sm text-gray-600 border-gray-300 hover:bg-gray-100 cursor-pointer">
//           <MapPin />
//           <select class="flex items-center gap-1 px-3 py-2">
//             <option>Toutes les villes</option>
//             <option>Paris</option>
//             <option>Nantes</option>
//             <option>Lyon</option>
//           </select>
//           </div>
//         </div>


//         <div class="space-y-3">

//           <div class="flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition">
//             <div>
//               <p class="font-medium">Monica Geller</p>
//               <p class="text-sm text-gray-500">Paris</p>
//             </div>
//             <div class="flex gap-2">
//               <button class="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200">
//                 <Pen/>
//               </button>
//               <button class="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200">
//                 <Trash2 />
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

function VolunteerList() {
  return (
    <div className="bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">

        <button className="w-full flex items-center justify-center gap-2 bg-[#039668] hover:bg-green-700 text-white font-medium py-2.5 rounded-lg mb-4 transition">
          <UserPlus />
          Ajouter un.e bénévole
        </button>

        {/* Filtres */}
        <div className="grid grid-cols-2 gap-2 mb-4 w-full">
          {/* Input recherche */}
          <input
            type="text"
            placeholder="Rechercher un.e bénévole"
            className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Select ville (avec icône) */}
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

        {/* Liste */}
        <div className="space-y-3">
          <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition">
            <div>
              <p className="font-medium">Monica Geller</p>
              <p className="text-sm text-gray-500">Paris</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200">
                <Pen />
              </button>
              <button className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200">
                <Trash2 />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}