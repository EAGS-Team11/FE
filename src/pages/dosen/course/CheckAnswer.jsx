/* src/pages/dosen/course/CheckAnswer.jsx */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Bot, User, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function CheckAnswer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const { submissionItems, studentName, assignment } = location.state || {};
  const [grades, setGrades] = useState({}); 
  const [isSaving, setIsSaving] = useState(false);

  // Safety Check
  useEffect(() => {
    if (!submissionItems || !assignment) {
      alert("Data sesi hilang. Kembali ke list.");
      navigate(-1);
    }
  }, [submissionItems, assignment, navigate]);

  // Init Data
  useEffect(() => {
    if (submissionItems) {
        const initialGrades = {};
        submissionItems.forEach((item) => {
            const skor = item.grading ? item.grading.skor_dosen : "";
            const feedback = item.grading ? item.grading.feedback_dosen : "";
            initialGrades[item.id_submission] = {
                score: skor !== null ? skor : "",
                feedback: feedback || "",
            };
        });
        setGrades(initialGrades);
    }
  }, [submissionItems]);

  // --- PERBAIKAN LOGIC INPUT SCORE (MAX LIMIT) ---
  const handleScoreChange = (submissionId, value, maxBobot) => {
    let numericVal = parseFloat(value);

    // Cek jika kosong
    if (value === "") {
        setGrades(prev => ({ ...prev, [submissionId]: { ...prev[submissionId], score: "" } }));
        return;
    }

    // Cek Max Value
    if (numericVal > maxBobot) {
        // alert(`Nilai tidak boleh melebihi bobot maksimal (${maxBobot})`);
        numericVal = maxBobot; // Otomatis mentok ke max
    } else if (numericVal < 0) {
        numericVal = 0;
    }

    setGrades(prev => ({ ...prev, [submissionId]: { ...prev[submissionId], score: numericVal } }));
  };

  const handleFeedbackChange = (sid, val) => {
    setGrades(prev => ({ ...prev, [sid]: { ...prev[sid], feedback: val } }));
  };

  const handleAiGrade = (question, submissionItem) => {
    alert("Fitur AI Suggestion belum diaktifkan di Frontend ini.");
  };

  const handleSaveAll = async () => {
    if (!window.confirm("Simpan semua penilaian?")) return;
    setIsSaving(true);
    
    try {
      const promises = submissionItems.map(async (item) => {
        const gradeData = grades[item.id_submission];
        // Jika dosen belum mengisi nilai (string kosong), jangan kirim update untuk item ini
        if (!gradeData || gradeData.score === "") return null;

        const payload = {
            id_submission: item.id_submission,
            skor_dosen: parseFloat(gradeData.score),
            feedback_dosen: gradeData.feedback
        };

        const response = await fetch("http://127.0.0.1:8000/grading/grade_submission", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || "Gagal menyimpan.");
        }
        return response.json();
      });

      await Promise.all(promises);
      alert("Berhasil menyimpan penilaian!");
      navigate(-1); 

    } catch (error) {
      console.error("Error:", error);
      alert(`Gagal menyimpan: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!assignment || !submissionItems) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F6F7FB] p-8 font-[Inter]">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-[#173A64] font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="text-right">
             <h1 className="text-xl font-bold text-[#173A64]">{assignment.judul}</h1>
             <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>Student: <span className="font-semibold text-gray-700">{studentName}</span></span>
             </div>
          </div>
        </div>

        {/* LIST SOAL */}
        <div className="space-y-8 pb-24">
            {assignment.questions.map((q) => {
                const subItem = submissionItems.find(s => s.id_question === q.id_question);
                const current = subItem ? grades[subItem.id_submission] : { score: "", feedback: "" };

                return (
                    <div key={q.id_question} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-bold text-[#173A64] text-lg">Soal {q.nomor_soal}</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Max: {q.bobot}</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* KIRI */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Pertanyaan</label>
                                    <div className="text-gray-800 font-medium whitespace-pre-wrap">{q.teks_soal}</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                    <label className="block text-xs font-bold text-green-700 uppercase mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Kunci Jawaban
                                    </label>
                                    <div className="text-gray-700 text-sm italic whitespace-pre-wrap">{q.kunci_jawaban || "-"}</div>
                                </div>
                            </div>
                            {/* KANAN */}
                            <div className="space-y-6 border-l pl-8 border-gray-100">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Jawaban Mahasiswa</label>
                                    {subItem ? (
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 min-h-[100px] whitespace-pre-wrap">
                                            {subItem.jawaban || subItem.jawaban_mahasiswa}
                                        </div>
                                    ) : (
                                        <div className="text-red-500 italic text-sm">Tidak ada jawaban.</div>
                                    )}
                                </div>
                                {subItem && (
                                    <div className="bg-[#F8FAFC] p-5 rounded-xl border border-gray-200 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-bold text-[#173A64]">Penilaian Dosen</label>
                                            <button onClick={() => handleAiGrade(q, subItem)} className="flex items-center gap-1.5 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-200 font-semibold">
                                                <Bot className="w-4 h-4" /> AI Suggestion
                                            </button>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-32">
                                                <label className="block text-xs text-gray-500 mb-1">Skor (Max: {q.bobot})</label>
                                                <input 
                                                    type="number" 
                                                    min="0" 
                                                    max={q.bobot} 
                                                    value={current?.score ?? ""} 
                                                    // PERBAIKAN: PASS q.bobot KE HANDLER
                                                    onChange={(e) => handleScoreChange(subItem.id_submission, e.target.value, q.bobot)} 
                                                    className="w-full border border-gray-300 rounded-lg p-2 text-center font-bold text-[#173A64] focus:ring-2 focus:ring-blue-500 outline-none" 
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs text-gray-500 mb-1">Feedback</label>
                                                <input type="text" value={current?.feedback ?? ""} onChange={(e) => handleFeedbackChange(subItem.id_submission, e.target.value)} placeholder="Berikan masukan..." className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* SAVE BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
            <div className="max-w-6xl mx-auto flex justify-end gap-4">
                <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={handleSaveAll} disabled={isSaving} className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold text-white shadow-lg hover:scale-105 transition ${isSaving ? "bg-gray-400" : "bg-[#173A64] hover:bg-[#23245c]"}`}>
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {isSaving ? "Saving..." : "Save All Grades"}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}