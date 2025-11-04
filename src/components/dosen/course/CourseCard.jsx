import React, { useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleClick = () => {
    navigate(`/dosen/course/${course.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      {/* Card */}
      <div
        className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition"
        onClick={handleClick}
      >
        <div className="relative bg-gradient-to-r from-[#7A8CA3] to-[#B7C5D9] h-28">
          <span className="absolute top-2 left-2 bg-[#3D2CA1] text-white text-xs px-2 py-1 rounded-md">
            {course.category}
          </span>
          <button
            onClick={handleEditClick}
            className="absolute top-2 right-2 flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md hover:bg-gray-200"
          >
            <Edit2 size={12} />
            Edit
          </button>
        </div>
        <div className="p-3 flex justify-between items-center">
          <p className="text-sm font-medium">{course.title}</p>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-5 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-center text-lg font-semibold mb-5">
              Edit Course
            </h2>

            {/* Form */}
            <form className="space-y-3 text-sm">
              <div>
                <label className="block font-medium mb-1 text-left">
                  Course Title
                </label>
                <input
                  type="text"
                  defaultValue={course.title}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">
                  Course Code
                </label>
                <input
                  type="text"
                  defaultValue={course.code || "MATH101"}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">
                  Description
                </label>
                <input
                  type="text"
                  defaultValue={
                    course.description || "Deskripsi singkat mata kuliah"
                  }
                  className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">
                  Category / Department
                </label>
                <input
                  type="text"
                  defaultValue={course.category || "Informatics Engineering"}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">
                  Credit (SKS)
                </label>
                <input
                  type="number"
                  defaultValue={course.sks || 3}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div className="pt-3 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#1E4F91] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#163E74] transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
