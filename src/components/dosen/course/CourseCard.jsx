import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dosen/course/${course.id}`); 
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={handleClick} 
    >
      <div className="relative bg-gradient-to-r from-[#7A8CA3] to-[#B7C5D9] h-28">
        <span className="absolute top-2 left-2 bg-[#3D2CA1] text-white text-xs px-2 py-1 rounded-md">
          {course.category}
        </span>
        <button className="absolute top-2 right-2 flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md hover:bg-gray-200" onClick={(e) => e.stopPropagation()}>
          <Edit2 size={12} />
          Edit
        </button>
      </div>
      <div className="p-3 flex justify-between items-center">
        <p className="text-sm font-medium">{course.title}</p>
        <button className="text-red-500 hover:text-red-600" onClick={(e) => e.stopPropagation()}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
