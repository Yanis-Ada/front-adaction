import { useState, useEffect } from "react";
import ButtonEdit from "./button_edit";
import ButtonDelete from "./button_delete";

export default function VolunteerCard() {
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
              <p className="text-sm text-gray-500">{volunteer.city}</p>
            </div>
            <div className="flex gap-2">
              <ButtonEdit id={volunteer.volunteers_id} />
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
