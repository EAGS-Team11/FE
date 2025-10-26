import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ViewGradedCard from "../../components/essay/ViewGradedCard";
import feedbackImg from "../../assets/feedback1.png";

export default function ViewGraded() {
  const navigate = useNavigate();
  const { state: essay } = useLocation(); // Ambil data essay dari table

  // Tentukan kalimat berdasarkan score
  const getMessageByScore = (score) => {
    if (score >= 70) {
      return {
        title: "Congratulations!",
        subtitle: "You achieved a high score.",
      };
    } else {
      return {
        title: "Keep learning!",
        subtitle: "You can do even better next time.",
      };
    }
  };

  const message = getMessageByScore(essay.score);

  return (
    <div className="relative w-full min-h-screen bg-[#F5F8FB] font-[Inter] px-12 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        Detail Feedback
        <img src={feedbackImg} alt="icon" className="w-10 h-10" />
      </h1>

      {/* View feedback selector */}
      <div className="flex gap-2 mb-6">
        <button className="bg-gray-200 px-4 py-2 rounded cursor-not-allowed">
          Lecturer
        </button>
        <button className="bg-gray-400 px-4 py-2 rounded text-white">
          AI
        </button>
      </div>

      {/* Graded Essay Card */}
      <ViewGradedCard
        score={essay.score}
        status={essay.status}
        feedback={essay.feedbackAI} 
        onViewAnswer={() => alert("Lihat jawaban essay")}
      />

      {/* Back Button */}
      <div className="mt-6 flex justify-start">
        <button
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded-[7px] hover:bg-blue-700 flex items-center gap-2 transition"
          onClick={() => navigate(-1)}
        >
          &#8592; Back
        </button>
      </div>
    </div>
  );
}
