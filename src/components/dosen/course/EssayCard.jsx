import React, { useState } from "react";
import { Clock, Hourglass, Users, Trash2, Pencil, X } from "lucide-react";

export default function EssayCard({ essay, onClick }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Essay deleted:", essay.title);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div
        onClick={onClick}
        className="w-[280px] bg-white rounded-[20px] shadow-md cursor-pointer overflow-hidden relative transition-transform hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="bg-gradient-to-r from-[#4A6FA5] to-[#5F799C] h-10 rounded-t-[20px] flex items-center justify-between px-4">
          <button onClick={handleDeleteClick}>
            <Trash2 className="text-white w-5 h-5 hover:text-gray-200 transition" />
          </button>

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
              <div className="flex w-full justify-between">
                <span>Create on</span>
                <span>: {essay.createdAt}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Hourglass className="w-4 h-4 text-gray-500" />
              <div className="flex w-full justify-between">
                <span>Deadline</span>
                <span>: {essay.deadline}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <div className="flex w-full justify-between">
                <span>Total submitted</span>
                <span>: {essay.totalSubmitted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 text-center relative">

            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>


            <div className="flex justify-center mb-4">
              <div className="bg-[#E6ECF5] rounded-full p-4">
                <Trash2 size={40} className="text-[#1E4F91]" />
              </div>
            </div>


            <h3 className="text-base font-semibold mb-2">
              Are you sure you want to delete this essay?
            </h3>


            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={handleDeleteConfirm}
                className="bg-[#1E4F91] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#163E74] transition"
              >
                Yes, delete
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-700 text-sm px-5 py-1.5 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
