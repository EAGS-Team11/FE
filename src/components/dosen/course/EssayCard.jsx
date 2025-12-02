/* src/components/dosen/course/EssayCard.jsx */

import React, { useState } from "react";
import { Clock, Hourglass, Users, Trash2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import defaultEssayImage from "../../../assets/default-essay.png";

export default function EssayCard({ essay }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleCardClick = () => {
    navigate(`/dosen/course/${courseId}/essay/${essay.id}`, { state: { essay } });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="w-full max-w-[360px] bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Header image */}
        <div className="relative">
          <img
            src={defaultEssayImage}
            alt="Default essay"
            className="w-full h-24 object-cover"
          />
          <button
            onClick={handleDeleteClick}
            className="absolute top-2 right-2 bg-black/40 rounded-full p-1 hover:bg-black/60 transition"
          >
            <Trash2 className="text-white w-4 h-4" />
          </button>
        </div>

        {/* Isi card */}
        <div className="p-4 text-xs">
          <h3 className="text-center font-semibold text-[#1D2A57] text-[13px] mb-3 leading-snug break-words px-1">
            {essay.assignmentName || "Untitled Essay"}
          </h3>

          <hr className="border-gray-200 mb-3" />

          <div className="space-y-2 text-gray-600 text-[11.5px] text-left">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <div className="flex justify-between w-full">
                <span className="text-gray-700 w-[100px]">Created on</span>
                <span className="text-gray-800 font-medium truncate">{essay.createdAt}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Hourglass className="w-3.5 h-3.5 text-gray-500" />
              <div className="flex justify-between w-full">
                <span className="text-gray-700 w-[100px]">Deadline</span>
                <span className="text-gray-800 font-medium truncate">{essay.deadline}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-gray-500" />
              <div className="flex justify-between w-full">
                <span className="text-gray-700 w-[100px]">Total submitted</span>
                <span className="text-gray-800 font-medium truncate">{essay.totalSubmitted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Delete */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 text-center relative">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
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
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-[#1E4F91] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#163E74] transition"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
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
