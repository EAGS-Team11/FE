/* src/components/mahasiswa/essay/EssayTable.jsx */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EssayTable({ essays }) {
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState(
    essays.map(() => "AI") // default AI untuk semua row
  );

  // Status icon
  const getStatusIcon = (status) => {
    if (status === "Graded") {
      return (
        <div className="relative w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
          <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-2 h-2 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      );
    }

    if (status === "In Review" || status === "Pending") {
      return (
        <div className="relative w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
          <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg
              className="w-2 h-2 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
            </svg>
          </div>
        </div>
      );
    }

    return null;
  };

  // Wrap text untuk title
  const wrapText = (text) => {
    const words = text.split(" ");
    const chunked = [];
    for (let i = 0; i < words.length; i += 3) {
      chunked.push(words.slice(i, i + 3).join(" "));
    }
    return chunked.join("\n");
  };

  // Truncate 2 kalimat pertama untuk feedback
  const truncateFeedback = (text) => {
    if (!text) return "-";
    const sentences = text.split(". ");
    return sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "..." : "");
  };

  return (
    <div className="bg-white border border-[#B8C8E0] rounded-lg overflow-hidden shadow-sm">
      <table className="w-full table-fixed text-[13.5px] font-[Inter] text-left">
        <thead className="bg-[#D4E2F0] text-[#1F3A60] font-semibold">
          <tr>
            <th className="py-3 px-4 w-[25%] text-left">Essay Title</th>
            <th className="py-3 px-4 w-[15%] text-left">Status</th>
            <th className="py-3 px-4 w-[10%] text-left">Score</th>
            <th className="py-3 px-4 w-[25%] text-left">Feedback</th>
            <th className="py-3 px-4 w-[10%] text-left"></th> 
            <th className="py-3 px-4 w-[15%] text-left">Date</th>
            <th className="py-3 px-4 w-[10%] text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="align-top font-normal text-[#1F3A60]">
          {essays.map((essay, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {/* Essay Title */}
              <td className="py-3 px-4 whitespace-pre-line break-words leading-snug text-left">
                {wrapText(essay.title)}
              </td>

              {/* Status */}
              <td className="py-3 px-4 flex items-center gap-2 text-left whitespace-nowrap">
                {getStatusIcon(essay.status)}
                <span>{essay.status}</span>
              </td>

              {/* Score */}
              <td className="py-3 px-4 text-left">{essay.score}</td>

              {/* Feedback */}
              <td className="py-3 px-4 whitespace-pre-line break-words leading-snug text-left">
                <p>{truncateFeedback(essay[feedbackType[index] === "AI" ? "feedbackAI" : "feedbackLecturer"])}</p>
              </td>

              {/* Dropdown Feedback Type */}
              <td className="py-3 px-4">
                <select
                  value={feedbackType[index]}
                  onChange={(e) => {
                    const newTypes = [...feedbackType];
                    newTypes[index] = e.target.value;
                    setFeedbackType(newTypes);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-[12px] w-full"
                >
                  <option value="AI">AI</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
              </td>

              {/* Date */}
              <td className="py-3 px-4 text-left">{essay.date}</td>

              {/* Action */}
              <td className="py-3 px-4 text-right text-[#3D73B4] font-semibold cursor-pointer hover:underline">
                <span onClick={() => navigate("/view-graded", { state: essay })}>
                  {essay.action}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
