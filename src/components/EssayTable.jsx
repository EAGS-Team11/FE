import React from "react";

export default function EssayTable({ essays }) {
  const getStatusColor = (status) => {
    if (status === "Graded")
      return <span className="text-green-600">●</span>;
    if (status === "In Review" || status === "Pending")
      return <span className="text-yellow-500">●</span>;
    return null;
  };

  return (
    <div className="bg-white border border-[#B8C8E0] rounded-lg overflow-hidden shadow-sm">
      <table className="w-full text-left text-[15px] font-medium">
        <thead className="bg-[#D4E2F0] text-[#1F3A60]">
          <tr>
            <th className="py-3 px-4">Essay Title</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Score</th>
            <th className="py-3 px-4">Feedback</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {essays.map((essay, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">{essay.title}</td>
              <td className="py-3 px-4 flex items-center gap-2">
                {getStatusColor(essay.status)} {essay.status}
              </td>
              <td className="py-3 px-4">{essay.score}</td>
              <td className="py-3 px-4">{essay.feedback}</td>
              <td className="py-3 px-4">{essay.date}</td>
              <td className="py-3 px-4 text-right text-[#3D73B4] font-semibold cursor-pointer hover:underline">
                {essay.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
