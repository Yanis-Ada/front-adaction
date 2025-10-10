"use client";
import Header from "./header";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <Header />
      <Login />
    </div>
  );
}

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let response = await res.json()
    if (response["message"] == "Login successful") {
      sessionStorage.setItem("token", response["token"])
      const infoToken = await fetch("http://localhost:3001/token", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response["token"] }),
      });
      let info = await infoToken.json()
      if (info["message"] == "Token is valid and user is admin"){
        window.location.href = "/volunteer_admin"
      }else if (info["message"] == "Token is valid"){
        window.location.href = "/volunteer"
      }else{
        alert("Problème avec le token")
      }
    } else {
      alert("email ou mot de passe incorrect")
    }
  };

  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");
  return (
    <div className="bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium">password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="px-4 py-2 bg-[#039668] text-white rounded-lg w-full"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}