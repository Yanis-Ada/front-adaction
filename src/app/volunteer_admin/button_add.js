import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import { url } from "../backend";

export default function ButtonAdd() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    city: "",
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
    let token = sessionStorage.getItem("token");
    const res = await fetch(`${url}/volunteers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    if (res.status !== 201) {
      window.location.href = "/";
    }
    let response = await res.json();
    let error = { error: "Email already exists" };
    if (response["error"] == error["error"]) {
      alert("Email déjà utilisé");
    } else {
      window.location.reload();
    }
  };


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-[#039668] hover:bg-green-700 text-white font-medium py-2.5 rounded-lg mb-4 transition"
      >
        <UserPlus />
        Ajouter un.e bénévole
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Ajouter un.e bénévoles</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block font-medium">Prénom</label>
                <input
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setFormData({
                      firstname: "",
                      lastname: "",
                      email: "",
                      password: "",
                      city: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#039668] text-white rounded-lg"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
