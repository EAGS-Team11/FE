import React from "react";

export default function EssayCard({ essay, onClick }) {
  return (
    <div
      className="bg-white border border-gray-300 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h4 className="font-medium text-sm mb-2">{essay.title}</h4>
      <p className="text-xs text-gray-500">⏱ Create on: {essay.createdAt}</p>
      <p className="text-xs text-gray-500">⌛ Deadline: {essay.deadline}</p>
      <p className="text-xs text-gray-500">👥 Total submitted: {essay.totalSubmitted}</p>
    </div>
  );
}
