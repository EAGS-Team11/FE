import React, { useEffect, useState } from "react";
import { FileText, Users, Search, Eye, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function GiveGrade() {
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = location.state?.assignment;
  const courseId = location.state?.courseId;

  const [students, setStudents] = useState([
    { name: "Arifia Dyah S.", id: "11221001", date: "4 Nov 2025", time: "12.00 PM", score: "", status: "Not Graded" },
    { name: "Ni Wayan R.K", id: "11221002", date: "4 Nov 2025", time: "12.05 PM", score: "", status: "Not Graded" },
    { name: "Azzatul Nabila K.", id: "11221003", date: "4 Nov 2025", time: "12.10 PM", score: "", status: "Not Graded" },
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleScoreChange = (index, value) => {
    const updated = [...students];
    updated[index].score = value;
    setStudents(updated);
  };

  const handleSaveGrade = (index) => {
    const updated = [...students];
    updated[index].status = "Graded";
    setStudents(updated);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <h1 className="text-lg font-semibold text-[#173A64] flex items-center gap-1 mb-3">
          <FileText className="w-5 h-5 text-[#173A64]" />
          Give Grade (Manual)
        </h1>

        {/* Table Student Submissions */}
        <div className="bg-white shadow-sm rounded-lg mb-4">
          <div className="flex items-center justify-between p-3 border-b">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Users className="w-4 h-4 text-[#173A64]" />
              Student Submissions
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Student"
                className="border border-gray-300 rounded-md pl-7 pr-2 py-0.5 text-xs text-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="divide-y text-xs">
            <div className="grid grid-cols-6 font-semibold text-gray-700 bg-gray-100 py-1.5 px-3 items-center">
              <p>Name</p>
              <p>ID</p>
              <p>Submitted</p>
              <p>Score</p>
              <p className="text-center">Status</p>
              <p className="text-center">Action</p>
            </div>

            {students.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-6 items-center py-1.5 px-3 text-gray-700 hover:bg-gray-50 transition"
              >
                <p>{s.name}</p>
                <p>{s.id}</p>
                <p>
                  {s.date}
                  <br />
                  <span className="text-[10px] text-gray-500">{s.time}</span>
                </p>

                {/* Input score */}
                <div className="flex justify-center">
                  <input
                    type="number"
                    placeholder="0-100"
                    value={s.score}
                    onChange={(e) => handleScoreChange(i, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-center w-16 text-xs"
                  />
                </div>

                <div className="flex justify-center">
                  <span
                    className={`px-2 py-0.5 rounded-md text-white text-[10px] font-semibold ${
                      s.status === "Graded" ? "bg-[#4B4B89]" : "bg-gray-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>

                <div className="flex justify-center gap-1">
                  <button
                    onClick={() =>
                      navigate("/dosen/check-answer", { state: { student: s } })
                    }
                    className="flex items-center gap-0.5 text-[#4B91E2] hover:underline text-[11px]"
                  >
                    <Eye className="w-3 h-3" /> Check
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-start mt-6">
          <button
            onClick={() => navigate(`/dosen/course/${courseId}`)}
            className="flex items-center gap-2 bg-[#2c59c0] text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-[#204aa8] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
