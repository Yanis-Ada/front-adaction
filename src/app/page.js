"use client";
import React, { useEffect, useState } from "react";

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
      <Navbar />
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
    <header class="bg-[#039668] text-white text-center p-5 mb-4">
      <h1 class="text-xl font-bold">♻️ Adaction</h1>
      <p class="text-sm text-[#A6F3D0]">
        Agir pour un environnement plus propre
      </p>
    </header>
  );
}

function Navbar() {
  return (
    <nav class="flex space-x-4 bg-white p-4 rounded-lg shadow">
      <button class="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Gestion des bénévoles</span>
      </button>
      <button class="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m1 5a9 9 0 11-8-8"
          />
        </svg>
        <span>Leaderboard</span>
      </button>
    </nav>
  );
}
