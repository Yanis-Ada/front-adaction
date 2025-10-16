"use client";

import { useEffect, useState } from "react";
import { url } from "../backend";
import { Trophy } from "lucide-react";

export default function Leaderboard() {
    const [data, setPosts] = useState([]);
    useEffect(() => {
        fetch(`${url}/leaderboard`)
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);
    return (
        <div className="bg-gray-50 flex justify-center py-10">
            <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
                <h2 className="flex items-center  justify-center text-lg font-semibold text-gray-800 mb-2">
                    <Trophy className='mr-2' /> Leaderboard
                </h2>
                <div>
                    {data.map((volunteer) => (
                        <div className="space-y-3 mb-2" key={volunteer.volunteers_id}>
                            <div className="flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition">
                                <div>
                                    <p className="font-medium">{volunteer.firstname} {volunteer.lastname}</p>
                                    <p className="text-sm text-gray-500">{volunteer.collect} collecte{volunteer.collect > 1 ? "s" : ""}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}