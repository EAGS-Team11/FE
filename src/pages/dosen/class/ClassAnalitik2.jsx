import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Rewind } from "lucide-react";

const students = [
  {
    name: "Arifia Dyah S.",
    answers: ["correct", "partial", "correct", "correct", "correct", "correct", "correct", "partial", "correct", "not"],
    score: 85,
  },
  {
    name: "Ni Wayan R.K.",
    answers: ["correct", "correct", "correct", "correct", "not", "correct", "correct", "partial", "correct", "correct"],
    score: 90,
  },
  {
    name: "Azzatul Nabila",
    answers: ["correct", "correct", "correct", "correct", "correct", "correct", "partial", "correct", "correct", "correct"],
    score: 95,
  },
  {
    name: "Dion Prayoga",
    answers: ["partial", "correct", "correct", "incorrect", "not", "correct", "correct", "correct", "correct", "correct"],
    score: 80,
  },
];

const colorMap = {
  correct: "bg-green-500 text-white",
  partial: "bg-orange-400 text-white",
  incorrect: "bg-red-500 text-white",
  not: "bg-gray-200 text-gray-700",
};

export default function EssayAnalytics() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="p-8 bg-[#F6F7FB] min-h-screen flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-indigo-700" />
          <h1 className="text-2xl font-semibold text-indigo-900">Class Analytics</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Essay Sistem Terdistribusi I</h2>
          </div>

          {/* Legend */}
          <div className="bg-gray-200 flex justify-around py-2 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500" /> Correct
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-400" /> Partially Correct
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500" /> Incorrect
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-200 border" /> Not Answered
            </div>
          </div>

          {/* Table Section */}
          <div className="divide-y">
            {students.map((student, index) => (
              <div key={index} className="flex items-center justify-between px-6 py-4">
                <div className="w-1/5 font-medium text-gray-800">{student.name}</div>
                <div className="flex gap-2 flex-wrap w-3/5">
                  {student.answers.map((status, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${colorMap[status]}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 w-1/5 justify-end">
                  <p className="text-gray-700 font-semibold">{student.score}%</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md shadow">
                    Evaluate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/dosen/ClassAnalitik1")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow"
        >
          <Rewind className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
  );
}
