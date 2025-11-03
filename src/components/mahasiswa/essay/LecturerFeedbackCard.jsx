import React from "react";
import { User } from "lucide-react";

export default function LecturerFeedbackCard({ score, status, feedback, onViewAnswer, lecturerName, date, title }) {
  const getMessageByScore = (score, status) => {
    if (score === "-" && status === "In Review") {
      return {
        title: "In Review",
        subtitle: "Your essay is being evaluated. Stay tuned for the results!"
      };
    } else if (score === "-" && status === "Pending") {
      return {
        title: "Pending Submission",
        subtitle: "You haven’t submitted your essay yet. Submit it to receive feedback!"
      };
    } else if (score >= 70) {
      return {
        title: "Congratulations!",
        subtitle: "You achieved a high score."
      };
    } else {
      return {
        title: "Keep learning!",
        subtitle: "You can do even better next time."
      };
    }
  };

  const message = getMessageByScore(score, status);

  return (
    <div className="flex flex-col gap-4">
      {/* Kotak Title + Lecturer + Date */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-4">
        {/* Title */}
        <p className="text-lg font-semibold text-gray-800 text-left">{title}</p>

        {/* Garis horizontal full */}
        <div className="border-t border-gray-500 opacity-50"></div>

        {/* Lecturer dan Date */}
        <div className="flex items-center gap-12">
          {/* Lecturer */}
          <div className="flex flex-col items-start">
            <p className="font-medium text-gray-500 mb-1 text-left">Lecturer</p>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-semibold text-gray-700">{lecturerName}</span>
            </div>
          </div>

          {/* Garis Vertikal */}
          <div className="h-12 w-[1px] bg-gray-700 opacity-50 ml-8"></div>

          {/* Date */}
          <div className="flex flex-col items-start">
            <p className="font-medium text-gray-500 mb-1 text-left">Date</p>
            <p className="font-semibold text-gray-700">{date}</p>
          </div>
        </div>
      </div>

      {/* Kotak Utama: Score dan Feedback */}
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[250px] flex flex-col md:flex-row gap-6">
        {/* Left Side: Score & Message */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <div className="text-2xl font-bold">{message.title}</div>
          <div className="text-gray-600 text-sm">{message.subtitle}</div>
          <div className="text-5xl font-bold text-green-600 mt-2">{score}</div>
        </div>

        {/* Right Side: Feedback */}
        <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col justify-between">
          <h3 className="font-semibold text-green-700 mb-2">Feedback</h3>
          <p className="text-gray-700 text-sm">{feedback}</p>
          <button
            className="mt-4 bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={onViewAnswer}
          >
            Lihat Jawaban
          </button>
        </div>
      </div>
    </div>
  );
}
