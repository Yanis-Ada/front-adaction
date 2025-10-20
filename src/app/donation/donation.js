import { Gift, Heart } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { url } from "../backend";

export default function Donation() {
  const [data, setData] = useState([]);
  const [points, setpoints] = useState([]);
  let token = sessionStorage.getItem("token")
  useEffect(() => {
    fetch(`${url}/association`, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
      .then(async (response) => {
        if (response.status !== 200) {
          window.location.href = "/";
        } else {
          const data = await response.json();
          setData(data);
        }
      });
  }, []);
  useEffect(() => {
    fetch(`${url}/volunteers/point`, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
      .then(async (response) => {
        if (response.status !== 200) {
          window.location.href = "/";
        } else {
          const data = await response.json();
          setpoints(data);
        }
      });
  }, []);
  return (
    <div className="bg-gray-50 flex justify-center py-10 ">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
        <h1 className="text-center text-xl font-bold mb-4">Faire un don</h1>
        <div className="w-full justify-center item-center text-center flex gap-1 flex-row">
          <Gift className=" mb-4" color="#039668" />
          <p className="text-center mb-6 text-[#039668]">
            Points collectés : {points.current}
          </p>
        </div>
        {data.map((association) => (
          <div key={association.association_id}
            className="bg-white rounded-xl shadow p-4 w-full max-w-sm border-[#f0f2f4] border mb-3">

            <div className="flex items-center gap-2 mb-2">
              <p>{association.image}</p>
              <h2 className="font-bold text-gray-900">{association.name}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {association.description}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-[#f0f2f4]">
              <span className="text-[#039668] font-medium text-sm">
                {association.donation_value} <span className="text-[#039668]">points</span>
              </span>
              <button
                disabled={points.current < association.donation_value}
                onClick={async () => {
                  const response = await fetch(`${url}/donation`, {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json",
                      "authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ association_id: association.association_id })
                  });
                  if (response.status !== 201) {
                    window.location.href = "/";
                  } else {
                    window.location.reload();
                  }
                }}

                className="flex items-center gap-2 bg-[#039668] text-white text-sm px-4 py-2 rounded-md hover:bg-green-700 transition">
                <Heart size={16} /> Faire un don
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
