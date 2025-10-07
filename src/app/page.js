"use client";
import React, { useEffect, useState } from "react";
import { Trophy, Sprout } from "lucide-react";

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
              <Trophy color="#039668" class="mt-2 md:mt-0"/>
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

