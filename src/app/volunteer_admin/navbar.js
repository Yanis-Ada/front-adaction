import { Trophy, Sprout, } from "lucide-react";

export default function Navbar({ mode }) {
  return (
    <nav className="flex space-x-4 bg-white p-4 shadow">
      <div className="flex space-x-4 items-center justify-center w-full">
        {mode === "1" && (
          <>
            <div className="flex gap-1 flex-col md:gap-3 md:flex-row items-center bg-[#ECFDF5] rounded-xl ">
              <Sprout color="#039668" className="mt-2 md:mt-0" />
              <a
                href="#"
                className="text-[#039668]  hover:text-gray-900 mx-2 mb-2 md:mb-0 md:mx-0"
              >
                Gestion des bénévoles
              </a>
            </div>
            <div className="flex gap-1 flex-col md:gap-3 md:flex-row items-center mx-2">
              <Trophy color="#6C7280" />
              <a href="#" className="text-[#6C7280] hover:text-gray-900 ">
                Leaderboard
              </a>
            </div>
          </>
        )}
        {mode === "2" && (
          <>
            <div className="flex gap-1 flex-col md:gap-3 md:flex-row items-center ">
              <Sprout color="#6C7280" />
              <a
                href="#"
                className="text-[#6C7280]  hover:text-gray-900 "
              >
                Gestion des bénévoles
              </a>
            </div>
            <div className="flex gap-1 flex-col md:gap-3 md:flex-row items-center mx-2  bg-[#ECFDF5] rounded-xl ">
              <Trophy color="#039668" className="mt-2 md:mt-0" />
              <a href="#" className="text-[#039668] hover:text-gray-900 mx-2 mb-2 md:mb-0 md:mx-0">
                Leaderboard
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}