/* src/pages/dosen/course/GiveGrade.jsx */

import React, { useEffect, useState } from "react";
import { FileText, Users, Search, Eye, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function GiveGrade() {
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useAuth();

    // Data dari navigasi sebelumnya
    const initialAssignment = location.state?.assignment; 
    const courseId = location.state?.courseId;

    const [groupedSubmissions, setGroupedSubmissions] = useState([]);
    
    // STATE PENTING: Menyimpan Detail Assignment LENGKAP (termasuk questions)
    const [detailedAssignment, setDetailedAssignment] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // --- HELPER: GROUPING ---
    const groupSubmissionsByStudent = (data, maxScore) => {
        const grouped = {};
        
        data.forEach(item => {
            const studentId = item.id_mahasiswa;
            const studentNIM = item.mahasiswa ? item.mahasiswa.nim_nip : "N/A";
            const studentName = item.mahasiswa ? item.mahasiswa.nama : "Unknown";
            
            if (!grouped[studentId]) {
                grouped[studentId] = {
                    studentId: studentNIM,
                    name: studentName,
                    submittedAt: item.submitted_at, 
                    submissionItems: [], 
                    isFullyGraded: true,
                    totalScore: 0,
                    totalMaxScore: maxScore, 
                };
            }

            grouped[studentId].submissionItems.push(item);

            if (item.is_graded === false || item.grading === null) {
                 grouped[studentId].isFullyGraded = false;
            }
            
            const scoreValue = item.grading ? parseFloat(item.grading.skor_dosen) : 0;
            if (!isNaN(scoreValue)) {
                grouped[studentId].totalScore += scoreValue;
            }
        });

        return Object.values(grouped).map(group => ({
            key: group.studentId,
            studentId: group.studentId,
            name: group.name,
            submittedAt: new Date(group.submittedAt).toLocaleString("id-ID", {
                day: 'numeric', month: 'short', year: 'numeric', 
                hour: '2-digit', minute: '2-digit'
            }),
            scoreDisplay: group.isFullyGraded ? `${group.totalScore}` : '-',
            status: group.isFullyGraded ? "Graded" : "Need to Grade",
            rawData: group.submissionItems 
        }));
    };

    // --- FETCH DATA (PERBAIKAN UTAMA DISINI) ---
    useEffect(() => {
        const fetchData = async () => {
            if (!initialAssignment?.id) return;
            setLoading(true);

            try {
                // 1. FETCH ASSIGNMENT DETAIL (WAJIB: Agar dapat QUESTIONS)
                const resAssign = await fetch(`http://127.0.0.1:8000/assignment/${initialAssignment.id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const assignmentData = await resAssign.json();
                setDetailedAssignment(assignmentData); // Simpan data lengkap

                // Hitung Max Score dari soal yang didapat
                const maxScore = assignmentData.questions 
                    ? assignmentData.questions.reduce((sum, q) => sum + q.bobot, 0) 
                    : 0;

                // 2. FETCH SUBMISSIONS
                const resSub = await fetch(`http://127.0.0.1:8000/submission/assignment/${initialAssignment.id}/submissions`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (resSub.ok) {
                    const submissionData = await resSub.json();
                    const processed = groupSubmissionsByStudent(submissionData, maxScore);
                    setGroupedSubmissions(processed);
                } else if (resSub.status === 404) {
                    setGroupedSubmissions([]);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchData();
    }, [initialAssignment, token]);


    // Navigasi ke Check Answer
    const handleCheckGrade = (studentSubmission) => {
        // SAFETY CHECK: Pastikan data soal sudah ada
        if (!detailedAssignment || !detailedAssignment.questions) {
            alert("Sedang memuat data soal... Silakan tunggu sebentar lalu coba lagi.");
            return;
        }

        navigate("/dosen/check-answer", { 
            state: { 
                submissionItems: studentSubmission.rawData, 
                studentName: studentSubmission.name,
                // KIRIM DATA LENGKAP YANG KITA FETCH DARI ENDPOINT /assignment/:id
                assignment: detailedAssignment 
            } 
        });
    };

    // Filter
    const filteredSubmissions = groupedSubmissions.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.studentId.includes(searchTerm)
    );

    if (!initialAssignment) return <div className="p-10 text-center">Data Error.</div>;

    return (
        <div className="p-4 bg-[#F6F7FB] min-h-screen flex justify-center">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <h1 className="text-lg font-semibold text-[#173A64] flex items-center gap-1 mb-3">
                    <FileText className="w-5 h-5 text-[#173A64]" />
                    Give Grade: {initialAssignment.title || initialAssignment.judul}
                </h1>

                {/* Table Wrapper */}
                <div className="bg-white shadow-sm rounded-lg mb-4">
                    <div className="flex items-center justify-between p-3 border-b">
                        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            <Users className="w-4 h-4 text-[#173A64]" />
                            Student Submissions ({filteredSubmissions.length})
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
                        <div className="grid grid-cols-6 font-semibold text-gray-700 bg-gray-100 py-1.5 px-3 items-center">
                            <p>Name</p>
                            <p>ID (NIM)</p>
                            <p>Submitted At</p>
                            <p className="text-center">Total Score</p>
                            <p className="text-center">Status</p>
                            <p className="text-center">Action</p>
                        </div>

                        {loading ? (
                            <div className="p-5 text-center flex justify-center items-center gap-2 text-gray-500">
                                <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                            </div>
                        ) : filteredSubmissions.length === 0 ? (
                            <div className="p-5 text-center text-gray-400 italic">
                                Belum ada mahasiswa yang mengumpulkan tugas ini.
                            </div>
                        ) : (
                            filteredSubmissions.map((s) => (
                            <div key={s.key} className="grid grid-cols-6 items-center py-1.5 px-3 text-gray-700 hover:bg-gray-50 transition">
                                <p className="truncate font-medium">{s.name}</p>
                                <p>{s.studentId}</p>
                                <p>{s.submittedAt}</p>
                                <div className="flex justify-center text-center font-bold text-gray-800 text-sm">
                                    {s.scoreDisplay}
                                </div>
                                <div className="flex justify-center">
                                    <span className={`px-2 py-0.5 rounded-md text-white text-[10px] font-semibold ${s.status === "Graded" ? "bg-green-600" : "bg-yellow-500"}`}>
                                        {s.status}
                                    </span>
                                </div>
                                <div className="flex justify-center gap-1">
                                    <button
                                        onClick={() => handleCheckGrade(s)}
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