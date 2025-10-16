import { Sprout, Heart, User, PackagePlus,Trophy } from "lucide-react";

const volunteer = [
  { id: "1", label: "Dashboard", Icon: Sprout , href: "/dashboard"},
  { id: "2", label: "Collectes", Icon: PackagePlus, href: "/collect" },
  { id: "3", label: "Dons", Icon: Heart, href: "/donation" },
  { id: "4", label: "Profil", Icon: User, href: "/user" },
];

const volunteer_admin = [
  { id: "1", label: "Gestion des bénévoles", Icon: Sprout , href: "/volunteer_admin"},
  { id: "2", label: "Leaderboard", Icon: Trophy, href: "/leaderboard" },
];

export default function Navbar({ mode, isadmin }) {
  return (
    <nav className="flex space-x-4 bg-white p-4 shadow">
      <div className="flex space-x-4 items-center justify-center w-full">
        {(isadmin ? volunteer_admin : volunteer).map(({ id, label, Icon,href }) => {
          const isActive = mode === id;
          const activeColor = "#039668";
          const inactiveColor = "#6C7280";
          const activeBg = isActive ? "bg-[#ECFDF5]" : "";
          const color = isActive  ? activeColor : inactiveColor;

            return (
            <div
              key={id}
              className={`flex gap-1 flex-col md:gap-3 md:flex-row items-center rounded-xl mx-2 ${activeBg}`}
            >
              <Icon color={color} className="mt-2 md:mt-0" />
              <a
              href={href}
              className={`hover:text-gray-900 mx-2 mb-2 md:mb-0 md:mx-0 text-[${color}]`}
              style={{ color }}
              >
              {label}
              </a>
            </div>
            );
        })}
      </div>
    </nav>
  );
}
