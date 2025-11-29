/* src/pages/dosen/ai/AiGrading2.jsx */

import React, { useEffect } from "react";
import { FileText, Users, Search, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AiGrading2() {
  const location = useLocation();
  const navigate = useNavigate();
  const assignment = location.state?.assignment;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const students = [
    {
      name: "Arifia Dyah S.",
      id: "11221001",
      date: "4 November 2025",
      time: "12.00 PM",
      score: "85/100",
      status: "AI Graded",
    },
    {
      name: "Ni Wayan R.K",
      id: "11221002",
      date: "4 November 2025",
      time: "12.00 PM",
      score: "90/100",
      status: "AI Graded",
    },
    {
      name: "Azzatul Nabila K.",
      id: "11221003",
      date: "4 November 2025",
      time: "12.00 PM",
      score: "95/100",
      status: "AI Graded",
    },
    {
      name: "Dion Prayoga",
      id: "11221004",
      date: "4 November 2025",
      time: "12.00 PM",
      score: "80/100",
      status: "AI Graded",
    },
  ];

  return (
    <div className="p-8 bg-[#F6F7FB] min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#173A64] flex items-center gap-2 mb-6">
        <FileText className="w-7 h-7 text-[#173A64]" />
        AI Grading Review
      </h1>


      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-left">
          Assignment Details
        </h2>

        <div className="grid grid-cols-3 gap-y-3 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-500 text-left">
              Assignment Name
            </p>
            <p className="text-left mb-2">
              {assignment?.name || "Essay Sistem Terdistribusi I"}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500 text-left">
              Total Submissions
            </p>
            <p className="text-left mb-2">
              {assignment?.submissions || "45/50 Students"}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500 text-left">
              Submission Type
            </p>
            <p className="text-left">Essay</p>
          </div>
          <div>
            <p className="font-medium text-gray-500 text-left">Due Date</p>
            <p className="text-left">
              {assignment?.date || "1 November 2025"}{" "}
              {assignment?.time || "12.00 PM"}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500 text-left">Average Score</p>
            <p className="text-left">87.5/100</p>
          </div>
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded-md text-white text-xs font-semibold ${
                assignment?.status === "AI Graded"
                  ? "bg-[#4B4B89]"
                  : "bg-[#4B91E2]"
              }`}
            >
              {assignment?.status || "AI Graded"}
            </span>
          </div>
        </div>
      </div>


      <div className="bg-white shadow rounded-xl mb-8">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#173A64]" />
            Student Submission
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Student"
              className="border border-gray-300 rounded-md pl-10 pr-3 py-1.5 text-sm text-gray-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>


        <div className="divide-y">
          <div className="grid grid-cols-5 text-sm font-semibold text-gray-700 bg-gray-100 py-2 px-5">
            <p>Student Name</p>
            <p>Student ID</p>
            <p>Submitted Date</p>
            <p>AI Score</p>
            <p className="text-center">Status</p>
          </div>

          {students.map((s, i) => (
            <div
              key={i}
              onClick={() =>
                navigate("/dosen/AiGrading3", { state: { student: s } })
              }
              className="grid grid-cols-5 text-sm items-center py-3 px-5 text-gray-700 hover:bg-gray-50 cursor-pointer transition"
            >
              <p>{s.name}</p>
              <p>{s.id}</p>
              <p>
                {s.date}
                <br />
                {s.time}
              </p>
              <p className="font-semibold">{s.score}</p>
              <div className="flex justify-center">
                <span className="px-3 py-1 rounded-md text-white text-xs font-semibold bg-[#4B4B89]">
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="flex justify-start mt-6">
        <button
          onClick={() => navigate("/dosen/AiGrading1")}
          className="flex items-center gap-2 bg-[#4B91E2] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#397ac7] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
}
