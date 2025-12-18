/* src/pages/mahasiswa/essay/ViewGraded.jsx */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, FileText, MessageSquare, Star, AlertCircle } from "lucide-react";
import LecturerFeedbackCard from "../../../components/mahasiswa/essay/LecturerFeedbackCard";
import feedbackImg from "../../../assets/feedback1.png";
import { useAuth } from "../../../context/AuthContext";

export default function ViewGraded() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  // data dari MyEssays (state.submission atau state langsung)
  const essay = location.state?.submission || location.state;

  // detail per soal
  const [detailData, setDetailData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);

  // FETCH detail per soal
  useEffect(() => {
    const fetchDetail = async () => {
      const assignmentId = essay?.id_assignment || essay?.rawData?.id_assignment;
      if (!assignmentId || !token) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/submission/my/${assignmentId}/detail`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error("Gagal mengambil detail nilai");

        const data = await response.json();
        setDetailData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [essay, token]);

  const handleViewAnswer = () => {
    setShowAnswerSheet(true);
    setTimeout(() => {
      document.getElementById("answer-sheet-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!essay) return <div className="p-10 text-center">Data tidak ditemukan.</div>;

  return (
    <div className="relative w-full min-h-screen bg-[#F5F8FB] font-[Inter] px-12 py-24 overflow-hidden">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-[#1F1F1F]">
        <img src={feedbackImg} alt="icon" className="w-20 h-20" />
        Detail Feedback
      </h1>

      {/* Card utama (Title + Lecturer + Date + Congratulation + Score + Button Lihat Jawaban) */}
      <div className="mb-10">
        <LecturerFeedbackCard
          score={essay.score}
          status={essay.status}
          lecturerName={essay.lecturerName || "Dosen Pengampu"}
          date={essay.date}
          title={essay.title}
          onViewAnswer={handleViewAnswer} // ✅ tombol ada di bawah score (di dalam card)
        />
      </div>

      {/* --- LEMBAR JAWABAN --- */}
      {showAnswerSheet && (
        <div id="answer-sheet-section" className="animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-300 pb-2">
            <FileText className="w-6 h-6 text-[#173A64]" />
            <h2 className="text-2xl font-bold text-[#173A64]">Lembar Jawaban & Detail Nilai</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : detailData.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
              Tidak ada data soal untuk ditampilkan.
            </div>
          ) : (
            <div className="space-y-6">
              {detailData.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header Soal */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-[#173A64] flex items-center gap-2">
                      <span className="bg-[#173A64] text-white w-7 h-7 flex items-center justify-center rounded-full text-sm">
                        {item.nomor_soal}
                      </span>
                      Pertanyaan
                    </span>
                    <span className="text-xs font-semibold text-gray-600 bg-white border px-3 py-1 rounded-full">
                      Bobot Max: {item.bobot_maks}
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Teks Soal */}
                    <p className="text-gray-800 font-medium mb-6 text-lg leading-relaxed">
                      {item.pertanyaan}
                    </p>

                    {/* Jawaban Mahasiswa */}
                    <div className="mb-6">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Jawaban Kamu
                      </p>
                      <div className="bg-[#F8FAFC] p-4 rounded-lg border border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {item.jawaban_kamu}
                      </div>
                    </div>

                    {/* Feedback Dosen Per Soal */}
                    <div
                      className={`rounded-xl p-5 border transition-colors ${
                        item.status_nilai === "Sudah Dinilai"
                          ? "bg-blue-50/40 border-blue-100"
                          : "bg-gray-50 border-dashed border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-bold text-[#3D73B4] uppercase flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> Catatan Dosen
                        </p>

                        {item.status_nilai === "Sudah Dinilai" && (
                          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-blue-100">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-lg font-bold text-[#173A64]">{item.nilai_dosen}</span>
                            <span className="text-gray-400 text-xs font-normal">/ {item.bobot_maks}</span>
                          </div>
                        )}
                      </div>

                      <p className={`text-sm ${item.status_nilai === "Sudah Dinilai" ? "text-gray-800" : "text-gray-400 italic"}`}>
                        {item.status_nilai === "Sudah Dinilai"
                          ? item.feedback_dosen || "Tidak ada feedback tertulis untuk soal ini."
                          : "Belum dinilai secara spesifik."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Back Button */}
      <div className="mt-10 flex justify-start pb-10">
        <button
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded-[7px] hover:bg-blue-700 flex items-center gap-2 transition shadow-lg"
          onClick={() => navigate(-1)}
        >
          &#8592; Back
        </button>
      </div>
    </div>
  );
}
