/* src/pages/dosen/course/CheckAnswer.jsx */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Save, Calendar, FileText } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const CheckAnswer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  // Ambil data dari halaman GiveGrade
  const submission = location.state?.submission;
  const assignmentInfo = location.state?.assignment; // Data judul tugas dari props

  const [score, setScore] = useState(submission?.grading?.nilai || "");
  const [feedback, setFeedback] = useState(submission?.grading?.feedback || "");
  const [loading, setLoading] = useState(false);

  // Jika data hilang (misal di-refresh), kembalikan ke list
  if (!submission) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <p className="text-red-500 mb-4 font-semibold">Data tidak ditemukan.</p>
            <button 
                onClick={() => navigate("/dosen/course")} 
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
                Kembali ke Dashboard
            </button>
        </div>
    );
  }

  // --- FUNGSI SIMPAN NILAI ---
  const handleSaveGrade = async () => {
    if (score === "" || score < 0 || score > 100) {
        alert("Harap masukkan nilai valid (0-100).");
        return;
    }

    setLoading(true);
    try {
        const response = await fetch("http://127.0.0.1:8000/grading/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                id_submission: submission.id_submission,
                nilai: parseInt(score),
                feedback: feedback || "Dinilai oleh Dosen"
            })
        });

        if (!response.ok) throw new Error("Gagal menyimpan nilai");

        alert("✅ Nilai berhasil disimpan!");
        navigate(-1); // Mundur ke halaman tabel

    } catch (err) {
        console.error(err);
        alert("Gagal menyimpan: " + err.message);
    } finally {
        setLoading(false);
    }
  };

  // Safe Title Access (Agar tidak putih lagi)
  const taskTitle = assignmentInfo?.title || submission.assignment?.judul || "Detail Jawaban";
  const courseName = assignmentInfo?.courseName || "Tugas Mahasiswa";

  return (
    <div className="min-h-screen bg-[#F6F7FB] relative font-sans pb-20">
      {/* Header Background */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-r from-[#173A64] to-[#2c59c0] -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 pt-8">
        {/* Navigation & Title */}
        <div className="mb-8 text-white">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition mb-4"
            >
                <ArrowLeft size={16} /> Back to Submission List
            </button>
            <h1 className="text-2xl font-bold">{taskTitle}</h1>
            <p className="opacity-90 text-sm mt-1">{courseName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* KOLOM KIRI: JAWABAN MAHASISWA */}
            <div className="lg:col-span-2 space-y-6">
                {/* Info Mahasiswa */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                            {submission.mahasiswa?.nama?.charAt(0) || "M"}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-lg">{submission.mahasiswa?.nama}</h3>
                            <p className="text-sm text-gray-500">{submission.mahasiswa?.nim_nip}</p>
                        </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                        <p className="flex items-center gap-1 justify-end"><Calendar size={14}/> Submitted:</p>
                        <p className="font-medium">{new Date(submission.waktu_submit).toLocaleString("id-ID")}</p>
                    </div>
                </div>

                {/* Jawaban */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <FileText size={18}/> Student's Answer
                        </h3>
                    </div>
                    
                    <div className="p-8 min-h-[300px]">
                        {/* Render HTML Jawaban */}
                        <div 
                            className="prose max-w-none text-gray-800 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: submission.jawaban }}
                        />
                    </div>
                </div>
            </div>

            {/* KOLOM KANAN: FORM PENILAIAN */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 sticky top-24">
                    <h3 className="font-bold text-[#173A64] text-lg mb-4 border-b pb-2">Grading Form</h3>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Score (0-100)</label>
                        <input 
                            type="number" 
                            min="0" max="100"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-center text-3xl font-bold text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="0"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Feedback</label>
                        <textarea 
                            rows="4"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Berikan masukan untuk mahasiswa..."
                        ></textarea>
                    </div>

                    <button 
                        onClick={handleSaveGrade}
                        disabled={loading}
                        className={`w-full text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#173A64] hover:bg-[#2c59c0]"
                        }`}
                    >
                        {loading ? "Saving..." : <><Save size={18}/> Submit Grade</>}
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default CheckAnswer;
