import { Pen } from "lucide-react";
import React, { useState, useEffect } from "react";
import { url } from "../backend";

export default function ButtonEdit({ id }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    city: "",
  });
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch(`${url}/volunteers/` + id, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
      .then(async (response) => {
        if (response.status !== 200) {
          window.location.href = "/";
        } else {
          const data = await response.json();
          setFormData({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            email: data.email || "",
            password: "",
            city: data.city || "",
          });
        }
      });
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/volunteers/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    if (res.status !== 201) {
      window.location.href = "/";
    }
    let response = await res.json()
    let error = { error: 'Email already exists' }
    if (response['error'] == error['error']) {
      alert("Email déjà utilisé");
    } else {
      window.location.reload();
    }
  };

  const requiredFields = ["firstname", "lastname", "email", "city"];
  const isFormValid = requiredFields.every(
    (key) => formData[key].trim() !== ""
  );
  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200">
        <Pen />
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
            <h2 className="text-xl font-bold mb-4">Éditer un.e bénévoles</h2>

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

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
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
  )
}
