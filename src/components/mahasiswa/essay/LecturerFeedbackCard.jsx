/* src/components/mahasiswa/essay/LecturerFeedbackCard.jsx */

import React from "react";
import { User } from "lucide-react";

export default function LecturerFeedbackCard({
  score,
  status,
  onViewAnswer,
  lecturerName,
  date,
  title,
}) {
  const getMessageByScore = (scoreVal, statusVal) => {
    if (scoreVal === "-" && statusVal === "In Review") {
      return {
        title: "In Review",
        subtitle: "Your essay is being evaluated. Stay tuned for the results!",
      };
    }
    if (scoreVal === "-" && statusVal === "Pending") {
      return {
        title: "Pending Submission",
        subtitle: "You haven’t submitted your essay yet. Submit it to receive feedback!",
      };
    }

    const n = Number(scoreVal);
    if (!Number.isNaN(n) && n >= 70) {
      return { title: "Congratulations!", subtitle: "You achieved a high score." };
    }
    if (!Number.isNaN(n)) {
      return { title: "Keep learning!", subtitle: "You can do even better next time." };
    }
    return { title: "Essay Result", subtitle: "See your score details below." };
  };

  const message = getMessageByScore(score, status);

  return (
    <div className="flex flex-col gap-4">
      {/* Kotak Title + Lecturer + Date */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-4">
        <p className="text-lg font-semibold text-gray-800 text-left">{title}</p>

        <div className="border-t border-gray-500 opacity-50" />

        <div className="flex items-center gap-12">
          <div className="flex flex-col items-start">
            <p className="font-medium text-gray-500 mb-1 text-left">Lecturer</p>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-semibold text-gray-700">{lecturerName}</span>
            </div>
          </div>

          <div className="h-12 w-[1px] bg-gray-700 opacity-50 ml-8" />

          <div className="flex flex-col items-start">
            <p className="font-medium text-gray-500 mb-1 text-left">Date</p>
            <p className="font-semibold text-gray-700">{date}</p>
          </div>
        </div>
      </div>

      {/* Kotak Utama: Congratulations + Score + Button di bawah score */}
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[250px] flex flex-col items-center justify-center gap-3 text-center">
        <div className="text-2xl font-bold">{message.title}</div>
        <div className="text-gray-600 text-sm">{message.subtitle}</div>

        <div className="text-5xl font-bold text-green-600 mt-2">{score}</div>

        {onViewAnswer && (
          <button
            className="mt-4 bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={onViewAnswer}
            type="button"
          >
            Lihat Jawaban
          </button>
        )}
      </div>
    </div>
  );
}
