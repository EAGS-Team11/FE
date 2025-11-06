import React from "react";
import { Clock, Hourglass, Users, Trash2, Pencil } from "lucide-react";

export default function EssayCard({ essay, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-[280px] bg-white rounded-[20px] shadow-md cursor-pointer overflow-hidden relative transition-transform hover:-translate-y-1 hover:shadow-lg"
    >

      <div className="bg-gradient-to-r from-[#4A6FA5] to-[#5F799C] h-10 rounded-t-[20px] flex items-center justify-between px-4">
        <Trash2 className="text-white w-5 h-5" />
        <button className="flex items-center gap-1 bg-white text-gray-700 text-xs px-2 py-[2px] rounded-full shadow-sm hover:bg-gray-100 transition">
          <span>Edit</span>
          <Pencil className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 text-sm">
        <h3 className="text-center font-semibold text-[#1D2A57] text-[14px] mb-2 leading-tight">
          {essay.title}
        </h3>

        <hr className="border-gray-300 mb-3" />

        <div className="space-y-2 text-gray-600 text-[13px]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>Create on: {essay.createdAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Hourglass className="w-4 h-4 text-gray-500" />
            <span>Deadline: {essay.deadline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span>Total submitted: {essay.totalSubmitted}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
