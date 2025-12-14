import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AiGrading3() {
  const navigate = useNavigate();
  const location = useLocation();

  // ⬇️ DATA DARI AiGrading2
  const { student, assignment } = location.state || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7FB] py-6 px-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* ================= STUDENT SUBMISSION DETAILS ================= */}
        <div className="bg-white shadow-sm rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">
              Student Submission Details
            </h2>

            <span
              className={`px-2.5 py-0.5 text-[11px] font-semibold border
                ${
                  student?.status === "Completed"
                    ? "bg-green-100 text-green-700 border-green-600"
                    : "bg-indigo-100 text-indigo-700 border-indigo-500"
                }`}
            >
              {student?.status || "AI Graded"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-3 text-xs text-gray-700">
            <Info label="Assignment Name">
              {assignment?.name || "–"}
            </Info>

            <Info label="Student Name">
              {student?.name || "–"}
            </Info>

            <Info label="Submitted Date">
              {student?.date} | {student?.time}
            </Info>

            <Info label="Student ID">
              {student?.student_id || "–"}
            </Info>
          </div>
        </div>

        {/* ================= AI GENERATED SCORE ================= */}
        <div className="bg-gray-200 rounded-lg p-5 text-center shadow-sm">
          <p className="text-xs font-medium text-gray-700 mb-1">
            AI Generated Score
          </p>

          <h1 className="text-3xl font-bold text-gray-800">
            {student?.ai_score ?? "-"} /100
          </h1>

          <p className="text-xs text-blue-800 font-medium mt-1">
            {student?.ai_score >= 85
              ? "Excellent Performance"
              : "Good Performance"}
          </p>
        </div>

        {/* ================= RUBRIC BREAKDOWN ================= */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">
            Rubric Breakdown
          </h3>

          <Rubric
            title="1. Content Quality & Depth"
            score="22/25"
            desc="The essay demonstrates strong understanding of the workshop design
            concepts. Relevant examples are provided, although deeper critical
            analysis could further strengthen the discussion."
          />

          <Rubric
            title="2. Structure & Organization"
            score="20/25"
            desc="The essay is well structured with a clear flow of ideas.
            Transitions between sections are mostly smooth, though some parts
            could be better connected."
          />

          <Rubric
            title="3. Critical Thinking & Analysis"
            score="20/25"
            desc="The student shows good analytical ability with insightful
            observations. Incorporating more theoretical frameworks could
            enhance the analysis."
          />
        </div>

        {/* ================= FOOTER BUTTON ================= */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => navigate("/dosen/AiGrading2")}
            className="flex items-center gap-2
                       bg-[#4B91E2] hover:bg-[#397ac7]
                       text-white font-semibold px-4 py-2
                       rounded-md text-xs transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* ❗ VIEW SUBMISSION TETAP ADA */}
          <button
            onClick={() =>
              navigate("/dosen/check-answer", {
                state: {
                  student,
                  assignment,
                },
              })
            }
            className="bg-white border border-gray-300
                      text-gray-700 font-medium
                      px-4 py-2 rounded-md
                      text-xs hover:bg-gray-100 transition"
          >
            View Submission
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Info = ({ label, children }) => (
  <div>
    <p className="text-[11px] text-gray-500 font-medium mb-0.5">
      {label}
    </p>
    <p className="text-gray-800">
      {children}
    </p>
  </div>
);

const Rubric = ({ title, score, desc }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 text-xs text-gray-700">
    <div className="flex justify-between items-center mb-1.5">
      <h4 className="font-semibold">{title}</h4>
      <span className="text-indigo-600 font-semibold">{score}</span>
    </div>
    <p className="text-justify leading-relaxed">
      {desc}
    </p>
  </div>
);
