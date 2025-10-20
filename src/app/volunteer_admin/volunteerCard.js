import { useState, useEffect } from "react";
import ButtonEdit from "./button_edit";
import ButtonDelete from "./button_delete";
import { url } from "../backend";

export default function VolunteerCard({ city, name }) {
  const [data, setPosts] = useState([]);
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    if (city !== "Toutes les villes" && name !== "") {
      fetch(`${url}/volunteers/city/${city}/name/${name}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
        .then(async (response) => {
          if (response.status !== 200) {
            window.location.href = "/";
          } else {
            const data = await response.json();
            setPosts(data);
          }
        });
    } else if (city !== "Toutes les villes") {
      fetch(`${url}/volunteers/city/${city}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
        .then(async (response) => {
          if (response.status !== 200) {
            window.location.href = "/";
          } else {
            const data = await response.json();
            setPosts(data);
          }
        });
    } else if (name !== "") {
      fetch(`${url}/volunteers/name/${name}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
        .then(async (response) => {
          if (response.status !== 200) {
            window.location.href = "/";
          } else {
            const data = await response.json();
            setPosts(data);
          }
        });
    } else {
      fetch(`${url}/volunteers`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
        .then(async (response) => {
          if (response.status !== 200) {
            window.location.href = "/";
          } else {
            const data = await response.json();
            setPosts(data);
          }
        });
    }
  }, [city, name]);

  return (
    <div>
      {data.map((volunteer) => (
        <div className="space-y-3 mb-2" key={volunteer.volunteers_id}>
          <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition">
            <div>
              <p className="font-medium">{volunteer.firstname} {volunteer.lastname}</p>
              <p className="text-sm text-gray-500">{volunteer.city}</p>
            </div>
            <div className="flex gap-2">
              <ButtonEdit id={volunteer.volunteers_id} />
              <ButtonDelete onSmash={() => {
                let answer = confirm(`Veux-tu vraiment supprimer ${volunteer.firstname} ${volunteer.lastname} ?`);
                if (answer) {
                  fetch(`${url}/volunteers/${volunteer.volunteers_id}`, {
                    method: 'DELETE',
                    headers: {
                      "authorization": `Bearer ${token}`
                    }
                  }).then(async (response) => {
                    if (response.status !== 200) {
                      window.location.href = "/";
                    } else {
                      setPosts(data.filter(v => v.volunteers_id !== volunteer.volunteers_id));
                    }
                  });
                }
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
