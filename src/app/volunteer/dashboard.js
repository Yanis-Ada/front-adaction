import {
  ChevronLeft,
  ChevronRight,
  Cigarette,
  Package,
  Wine,
  Trash2,
  Smartphone,
  CircleQuestionMark,
} from "lucide-react";
export default function Dashboard() {
  const count = 3; // Exemple de nombre de collectes
  return (
    <div className="bg-gray-50 flex justify-center py-10">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold mb-4">
          Bonjour Phoebe !
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-800 font-semibold text-lg">
          <button
            // onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Mois précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span>Octobre 2025</span>

          <button
            // onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Mois suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-2 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-[#fbbf24]"
          >
            <Cigarette />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Mégot de cigarette
            </h3>
            <p className="text-xs text-gray-500">
              {count} collecte{count > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-[#7cb4fb]"
          >
            <Package />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Plastique
            </h3>
            <p className="text-xs text-gray-500">
              {count} collecte{count > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-[#32d399]"
          >
            <Wine />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Verre
            </h3>
            <p className="text-xs text-gray-500">
              {count} collecte{count > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-[#94a3b8]"
          >
            <Trash2 />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Métal
            </h3>
            <p className="text-xs text-gray-500">
              {count} collecte{count > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="mb-2 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-[#a78bfa]"
          >
            <Smartphone />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Électronique
            </h3>
            <p className="text-xs text-gray-500">
              {count} collecte{count > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-md text-white bg-[#f87171]`}
          >
            <CircleQuestionMark />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Autres
            </h3>
            <p className="text-xs text-gray-500">
              {count} collecte{count > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
