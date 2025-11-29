/* src/pages/mahasiswa/essay/ViewGraded.jsx */

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ViewGradedCard from "../../../components/mahasiswa/essay/ViewGradedCard";
import LecturerFeedbackCard from "../../../components/mahasiswa/essay/LecturerFeedbackCard";
import feedbackImg from "../../../assets/feedback1.png";

export default function ViewGraded() {
  const navigate = useNavigate();
  const { state: essay } = useLocation();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("lecturer"); 
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F5F8FB] font-[Inter] px-12 py-24 overflow-hidden">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <img src={feedbackImg} alt="icon" className="w-20 h-20" />
        Detail Feedback
      </h1>

      {/* Filter Section */}
      <div className="relative flex items-center gap-3 mb-6">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center justify-between w-[220px] bg-[#D9D9D9] text-[#1F1F1F] font-medium px-4 py-2 rounded-md shadow-sm hover:bg-[#cfcfcf] transition"
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M9 12h6" />
            </svg>
            <span>View feedback by</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transform transition-transform duration-300 ${showFilter ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref={filterRef}
          className={`absolute left-[240px] top-0 flex items-center bg-[#D9D9D9] rounded-md overflow-hidden transition-all duration-500 ease-in-out ${
            showFilter ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <button
            className={`px-4 py-2 border-r border-gray-400 ${
              selectedFeedback === "Lecturer" ? "font-bold text-black" : "text-gray-500"
            }`}
            onClick={() => {
              setSelectedFeedback("Lecturer");
            }}
          >
            Lecturer
          </button>
          <button
            className={`px-4 py-2 ${
              selectedFeedback === "AI" ? "font-bold text-black" : "text-gray-500"
            }`}
            onClick={() => {
              setSelectedFeedback("AI");
            }}
          >
            AI
          </button>
        </div>
      </div>

      {/* Content */}
      {selectedFeedback === "AI" ? (
        <ViewGradedCard
          score={essay.score}
          status={essay.status}
          feedback={essay.feedbackAI}
          onViewAnswer={() => alert("Lihat jawaban essay")}
        />
      ) : (
        <LecturerFeedbackCard 
          score={essay.score}
          status={essay.status}
          feedback={essay.feedbackLecturer}
          lecturerName={essay.lecturerName}
          date={essay.date}
          title={essay.title}
          onViewAnswer={() => alert("Lihat jawaban essay")}
        />
      )}

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
