import React, { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Users,
  Search,
  ChevronLeft,
  Award,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { listSubmission } from "../../../data/dosen/ai/listSubmission";

export default function AiGrading2() {
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = location.state?.assignment;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // =======================
  // DATA
  // =======================
  const [students] = useState(listSubmission);
  const [search, setSearch] = useState("");

  // =======================
  // FILTER SEARCH
  // =======================
  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  // =======================
  // STATISTIK
  // =======================
  const stats = useMemo(() => {
    const total = students.length;
    const completed = students.filter(
      (s) => s.final_score !== null
    ).length;

    const scored = students.filter(
      (s) => s.final_score !== null || s.ai_score !== null
    );

    const average =
      scored.reduce(
        (sum, s) => sum + (s.final_score ?? s.ai_score),
        0
      ) / (scored.length || 1);

    return {
      total,
      completed,
      average: average.toFixed(1),
    };
  }, [students]);

  // =======================
  // NAVIGATE DETAIL
  // =======================
  const goToDetail = (student) => {
    navigate("/dosen/AiGrading3", {
      state: { student, assignment },
    });
  };

  // =======================
  // STATUS STYLE
  // =======================
  const getStatusClass = (status) => {
    if (status === "AI Graded") {
      return "bg-indigo-100 text-indigo-700 border border-indigo-500";
    }
    if (status === "Completed") {
      return "bg-green-100/60 text-green-700 border border-green-600";
    }
    return "bg-gray-100 text-gray-600 border border-gray-400";
  };

  return (
    <div className="p-6 bg-[#F6F7FB] min-h-screen">
      {/* HEADER */}
      <h1 className="text-xl font-semibold text-[#173A64] flex items-center gap-2 mb-5">
        <FileText className="w-5 h-5" />
        AI Grading Review
      </h1>

      {/* ================= ASSIGNMENT DETAILS ================= */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Assignment Details
        </h2>

        <div className="grid grid-cols-3 gap-5 text-xs">
          <Info label="Assignment Name">
            {assignment?.name || "Essay Sistem Terdistribusi I"}
          </Info>

          <Info label="Total Submissions">
            {stats.completed}/{stats.total} Students
          </Info>

          <Info label="Submission Type">Essay</Info>

          <Info label="Due Date">
            {assignment?.date || "1 November 2025"}{" "}
            {assignment?.time || "12.00 PM"}
          </Info>

          <Info label="Average Score">
            <div className="flex items-center gap-1 font-semibold">
              <Award className="w-3.5 h-3.5 text-yellow-500" />
              {stats.average}/100
            </div>
          </Info>
        </div>
      </div>

      {/* ================= STUDENT SUBMISSION ================= */}
      <div className="bg-white rounded-xl shadow-sm">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Student Submission
          </h2>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student"
              className="border rounded-md pl-9 pr-3 py-1.5 text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-6 text-[11px] font-semibold text-gray-600 bg-gray-50 px-5 py-2">
          <p>Student Name</p>
          <p>Student ID</p>
          <p>Submitted</p>
          <p>AI Score</p>

          {/* ⬇️ FINAL SCORE HEADER DI-TENGAHKAN */}
          <p className="text-center">Final Score</p>

          <p className="text-center">Status</p>
        </div>

        {/* TABLE BODY */}
        {filteredStudents.map((s) => (
          <div
            key={s.id_submission}
            className="grid grid-cols-6 items-center text-xs px-5 py-3 hover:bg-gray-50 transition"
          >
            <p
              onClick={() => goToDetail(s)}
              className="font-medium text-[#173A64] cursor-pointer hover:underline"
            >
              {s.name}
            </p>

            <p>{s.student_id}</p>

            <p>
              {s.date}
              <br />
              <span className="text-[10px] text-gray-500">{s.time}</span>
            </p>

            <p className="font-semibold">{s.ai_score}/100</p>

            {/* FINAL SCORE — SEJAJAR DENGAN HEADER */}
            <p className="text-center font-medium text-gray-500">
              {s.final_score !== null ? `${s.final_score}/100` : "–"}
            </p>

            {/* STATUS */}
            <div className="flex justify-center">
              <span
                onClick={() => goToDetail(s)}
                className={`min-w-[72px] h-5 flex items-center justify-center 
                text-[10px] font-semibold cursor-pointer 
                ${getStatusClass(s.status)}`}
              >
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* BACK */}
      <div className="mt-5">
        <button
          onClick={() => navigate("/dosen/AiGrading1")}
          className="flex items-center gap-2 bg-[#4B91E2] text-white font-semibold px-4 py-2 rounded-md text-xs hover:bg-[#397ac7]"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
}

/* ================= INFO ITEM ================= */
const Info = ({ label, children }) => (
  <div>
    <p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p>
    <p className="text-gray-800">{children}</p>
  </div>
);
