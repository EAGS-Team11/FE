/* src/pages/dosen/ai/AiGrading1.jsx */

import React, { useEffect } from "react";
import { FileText, Hourglass, Bot, CheckSquare, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AiGrading1() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const assignments = [
    {
      name: "Essay Sistem Terdistribusi I",
      date: "1 November 2025",
      time: "12.00 PM",
      submissions: "45/50",
      status: "AI Graded",
    },
    {
      name: "Essay Sistem Terdistribusi II",
      date: "1 November 2025",
      time: "12.00 PM",
      submissions: "45/50",
      status: "AI Graded",
    },
    {
      name: "Essay Sistem Terdistribusi III",
      date: "1 November 2025",
      time: "12.00 PM",
      submissions: "45/50",
      status: "Submitted",
    },
    {
      name: "Essay Sistem Terdistribusi IV",
      date: "1 November 2025",
      time: "12.00 PM",
      submissions: "45/50",
      status: "Submitted",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F6F7FB] min-h-screen">
      
      {/* Judul */}
      <h1 className="text-xl sm:text-2xl font-semibold text-[#173A64] flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-[#173A64]" />
        AI Grading Review
      </h1>

      {/* Statistik atas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { icon: FileText, label: "Total Assignments", value: "10" },
          { icon: Hourglass, label: "Pending Review", value: "0" },
          { icon: Bot, label: "AI Grading", value: "2" },
          { icon: CheckSquare, label: "Completed", value: "4" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-lg p-4 sm:p-5 flex flex-col items-center justify-center"
          >
            <item.icon className="w-7 h-7 text-[#173A64] mb-2" />
            <p className="text-xl sm:text-2xl font-bold text-[#173A64]">
              {item.value}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b gap-3">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#173A64]" />
            Assignment List
          </h2>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Course"
              className="border border-gray-300 rounded-md pl-10 pr-3 py-1.5 text-sm w-full text-gray-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* HEADER TABEL - hanya muncul di layar besar */}
        <div className="hidden md:grid grid-cols-[3fr_2fr_1.5fr_1.3fr] text-sm font-semibold text-gray-700 bg-gray-100 py-2 px-5">
          <p>Assignment Name</p>
          <p>Due Date</p>
          <p>Submissions</p>
          <p>Status</p>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y">
          {assignments.map((a, i) => (
            <div
              key={i}
              className="
                cursor-pointer transition hover:bg-gray-50 
                grid md:grid-cols-[3fr_2fr_1.5fr_1.3fr] 
                px-5 py-4 text-sm
              "
              onClick={() => navigate("/dosen/AiGrading2")}
            >
              {/* MOBILE VERSION — stacked */}
              <div className="flex flex-col gap-1 md:hidden">
                <p className="text-[#173A64] font-semibold">{a.name}</p>

                <p className="text-gray-700 text-xs">
                  <span className="font-semibold">Due:</span> {a.date}, {a.time}
                </p>

                <p className="text-gray-700 text-xs">
                  <span className="font-semibold">Submissions:</span> {a.submissions}
                </p>

                <span
                  className={`px-3 py-1 w-fit rounded-md text-white text-xs font-semibold mt-1 ${
                    a.status === "AI Graded" ? "bg-[#4B4B89]" : "bg-[#4B91E2]"
                  }`}
                >
                  {a.status}
                </span>
              </div>

              {/* DESKTOP VERSION */}
              <p className="hidden md:block text-[#173A64] font-medium hover:underline">
                {a.name}
              </p>

              <p className="hidden md:block text-gray-700">
                {a.date}
                <br />
                {a.time}
              </p>

              <p className="hidden md:block text-gray-700">{a.submissions}</p>

              <div className="hidden md:flex justify-start">
                <span
                  className={`px-3 py-1 rounded-md text-white text-xs font-semibold ${
                    a.status === "AI Graded" ? "bg-[#4B4B89]" : "bg-[#4B91E2]"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
