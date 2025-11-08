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
    <div className="p-8 bg-[#F6F7FB] min-h-screen">
      <h1 className="text-2xl font-semibold text-[#173A64] flex items-center gap-2 mb-6">
        <FileText className="w-7 h-7 text-[#173A64]" />
        AI Grading Review
      </h1>

      {/* Info Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-5 flex flex-col items-center justify-center">
          <FileText className="w-8 h-8 text-[#173A64] mb-2" />
          <p className="text-2xl font-bold text-[#173A64]">10</p>
          <p className="text-gray-600 text-sm">Total Assignments</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex flex-col items-center justify-center">
          <Hourglass className="w-8 h-8 text-[#173A64] mb-2" />
          <p className="text-2xl font-bold text-[#173A64]">0</p>
          <p className="text-gray-600 text-sm">Pending Review</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex flex-col items-center justify-center">
          <Bot className="w-8 h-8 text-[#173A64] mb-2" />
          <p className="text-2xl font-bold text-[#173A64]">2</p>
          <p className="text-gray-600 text-sm">AI Grading</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex flex-col items-center justify-center">
          <CheckSquare className="w-8 h-8 text-[#173A64] mb-2" />
          <p className="text-2xl font-bold text-[#173A64]">4</p>
          <p className="text-gray-600 text-sm">Completed</p>
        </div>
      </div>

      {/* Assignment List */}
      <div className="bg-white shadow rounded-lg">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#173A64]" />
            Assignment List
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Course"
              className="border border-gray-300 rounded-md pl-10 pr-3 py-1.5 text-sm text-gray-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="divide-y">
          <div className="grid grid-cols-4 text-sm font-semibold text-gray-700 bg-gray-100 py-2 px-5">
            <p>Assignment Name</p>
            <p>Due Date</p>
            <p>Submissions</p>
            <p>Status</p>
          </div>

          {assignments.map((a, i) => (
            <div
              key={i}
              className="grid grid-cols-4 text-sm items-center py-3 px-5 hover:bg-gray-50 cursor-pointer transition"
              onClick={() => navigate("/dosen/AiGrading2")}
            >
              <p className="text-[#173A64] font-medium hover:underline">{a.name}</p>
              <p>
                {a.date}
                <br />
                {a.time}
              </p>
              <p>{a.submissions}</p>
              <div className="flex justify-center">
                <span
                  className={`px-3 py-1 rounded-md text-white text-xs font-semibold ${
                    a.status === "AI Graded"
                      ? "bg-[#4B4B89]"
                      : "bg-[#4B91E2]"
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
