import {Trash2} from "lucide-react";

export default function ButtonDelete({ onSmash }) {
  return (
    <button onClick={onSmash} className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200">
      <Trash2 />
    </button>
  )
}