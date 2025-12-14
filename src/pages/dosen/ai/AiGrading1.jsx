import React, { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Hourglass,
  Bot,
  CheckSquare,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listEssay } from "../../../data/dosen/ai/listEssay";

export default function AiGrading1() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // =====================
  // FILTER DATA
  // =====================
  const filteredEssay = useMemo(() => {
    return listEssay.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // =====================
  // STATISTIK
  // =====================
  const stats = useMemo(() => {
    const total = filteredEssay.length;
    const pending = filteredEssay.filter(
      (a) => a.status === "Submitted"
    ).length;
    const aiGrading = filteredEssay.filter(
      (a) => a.status === "AI Graded"
    ).length;
    const completed = filteredEssay.filter(
      (a) => a.status === "Completed"
    ).length;

    return { total, pending, aiGrading, completed };
  }, [filteredEssay]);

  return (
    <div className="p-6 bg-[#F6F7FB] min-h-screen">
      {/* HEADER */}
      <h1 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5" />
        AI Grading Review
      </h1>

      {/* STAT CARD */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard icon={<FileText />} value={stats.total} label="Assignments" />
        <StatCard icon={<Hourglass />} value={stats.pending} label="Pending" />
        <StatCard icon={<Bot />} value={stats.aiGrading} label="AI Grading" />
        <StatCard icon={<CheckSquare />} value={stats.completed} label="Completed" />
      </div>

      {/* ASSIGNMENT LIST */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Assignment List
          </h2>

          {/* SEARCH */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignment..."
              className="border rounded-md pl-9 pr-3 py-1.5 text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[3fr_2fr_1.5fr_1.3fr] text-xs font-semibold text-gray-600 bg-gray-50 px-5 py-2">
          <p>Assignment</p>
          <p>Due Date</p>
          <p className="text-center">Submissions</p>
          <p className="text-center">Status</p>
        </div>

        {/* TABLE BODY */}
        {filteredEssay.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-6">
            No assignment found.
          </p>
        ) : (
          filteredEssay.map((a) => (
            <div
              key={a.id_assignment}
              onClick={() =>
                navigate("/dosen/AiGrading2", { state: { assignment: a } })
              }
              className="grid grid-cols-[3fr_2fr_1.5fr_1.3fr] text-xs px-5 py-3 hover:bg-gray-50 cursor-pointer transition"
            >
              <p className="font-medium text-[#173A64] hover:underline">
                {a.name}
              </p>

              <p className="text-gray-600">
                {a.date}
                <br />
                {a.time}
              </p>

              {/* SUBMISSIONS */}
              <div className="flex justify-center text-gray-700 font-medium">
                {a.submissions}
              </div>

              {/* STATUS */}
              <div className="flex justify-center">
                <span
                  className={`min-w-[72px] h-5 flex items-center justify-center text-[10px] font-semibold border ${
                    a.status === "AI Graded"
                      ? "bg-indigo-100 text-indigo-700 border-indigo-500"
                      : "bg-green-100/60 text-green-700 border-green-600"
                  }`}
                >
                  {a.status === "Submitted" ? "Final Result" : a.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
const StatCard = ({ icon, value, label }) => (
  <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-3">
    <div className="p-2 rounded-md bg-blue-100 text-blue-700">
      {React.cloneElement(icon, { className: "w-4 h-4" })}
    </div>
    <div>
      <p className="text-base font-semibold text-gray-800">{value}</p>
      <p className="text-[11px] text-gray-500">{label}</p>
    </div>
  </div>
);
