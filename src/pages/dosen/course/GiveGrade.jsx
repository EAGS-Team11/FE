/* src/pages/dosen/course/GiveGrade.jsx */

import React, { useEffect, useState } from "react";
import { FileText, Users, Search, Eye, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function GiveGrade() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth(); 

  const assignment = location.state?.assignment; 
  const courseId = location.state?.courseId;

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchSubmissions = async () => {
        if (!assignment?.id) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/submission/assignment/${assignment.id}/submissions`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                if (response.status === 404) return setSubmissions([]);
                throw new Error("Gagal mengambil data submission");
            }

            const data = await response.json();

            // Mapping Data BE -> FE Table
            const mappedData = data.map(item => ({
                submissionId: item.id_submission,
                studentId: item.mahasiswa.nim_nip,
                name: item.mahasiswa.nama,
                submittedAt: new Date(item.waktu_submit).toLocaleString("id-ID", {
                    day: 'numeric', month: 'short', year: 'numeric', 
                    hour: '2-digit', minute: '2-digit'
                }),
                
                // --- PERBAIKAN DI SINI ---
                // Database Anda menggunakan 'skor_dosen', bukan 'nilai'
                score: item.grading ? item.grading.skor_dosen : "-", 
                
                status: item.grading ? "Graded" : "Not Graded",
                rawData: item 
            }));

            setSubmissions(mappedData);

        } catch (err) {
            console.error(err);
            setError("Gagal memuat data mahasiswa.");
        } finally {
            setLoading(false);
        }
    };

    if (token) fetchSubmissions();
    else setLoading(false);

  }, [assignment, token]);

  // Filter Search
  const filteredSubmissions = submissions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.studentId.includes(searchTerm)
  );

  if (!assignment) {
      return (
        <div className="p-10 text-center">
            <p className="text-red-500">Error: Data Assignment hilang. Silakan kembali ke halaman course.</p>
            <button onClick={() => navigate("/dosen/course")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Back to Course</button>
        </div>
      );
  }

  return (
    <div className="p-4 bg-[#F6F7FB] min-h-screen flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <h1 className="text-lg font-semibold text-[#173A64] flex items-center gap-1 mb-3">
          <FileText className="w-5 h-5 text-[#173A64]" />
          Give Grade: {assignment.title}
        </h1>

        {/* Table Student Submissions */}
        <div className="bg-white shadow-sm rounded-lg mb-4">
          <div className="flex items-center justify-between p-3 border-b">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Users className="w-4 h-4 text-[#173A64]" />
              Student Submissions ({submissions.length})
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Student"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md pl-7 pr-2 py-0.5 text-xs text-gray-600 focus:outline-none"
              />
              <Search className="w-3 h-3 text-gray-400 absolute left-2 top-1.5" />
            </div>
          </div>

          <div className="divide-y text-xs">
            {/* Table Head */}
            <div className="grid grid-cols-6 font-semibold text-gray-700 bg-gray-100 py-1.5 px-3 items-center">
              <p>Name</p>
              <p>ID (NIM)</p>
              <p>Submitted At</p>
              <p className="text-center">Score</p>
              <p className="text-center">Status</p>
              <p className="text-center">Action</p>
            </div>

            {/* Table Body */}
            {loading ? (
                <div className="p-5 text-center text-gray-500">Loading data...</div>
            ) : filteredSubmissions.length === 0 ? (
                <div className="p-5 text-center text-gray-400 italic">Belum ada mahasiswa yang mengumpulkan tugas ini.</div>
            ) : (
                filteredSubmissions.map((s, i) => (
                <div
                    key={i}
                    className="grid grid-cols-6 items-center py-1.5 px-3 text-gray-700 hover:bg-gray-50 transition"
                >
                    <p className="truncate font-medium">{s.name}</p>
                    <p>{s.studentId}</p>
                    <p>{s.submittedAt}</p>

                    {/* Score Display */}
                    <div className="flex justify-center text-center font-bold text-gray-800">
                        {s.score}
                    </div>

                    {/* Status Badge */}
                    <div className="flex justify-center">
                    <span
                        className={`px-2 py-0.5 rounded-md text-white text-[10px] font-semibold ${
                        s.status === "Graded" ? "bg-green-600" : "bg-gray-400"
                        }`}
                    >
                        {s.status}
                    </span>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center gap-1">
                    <button
                        onClick={() =>
                            navigate("/dosen/check-answer", { 
                                state: { 
                                    submission: s.rawData,
                                    assignment: assignment 
                                } 
                            })
                        }
                        className="flex items-center gap-0.5 text-[#4B91E2] hover:underline text-[11px] font-bold"
                    >
                        <Eye className="w-3 h-3" /> Check & Grade
                    </button>
                    </div>
                </div>
                ))
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-start mt-6">
          <button
            onClick={() => navigate(`/dosen/course/${courseId}`)}
            className="flex items-center gap-2 bg-[#2c59c0] text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-[#204aa8] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Course</span>
          </button>
        </div>
      </div>
    </div>
  );
}
