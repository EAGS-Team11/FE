import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, FileText, Clock, ArrowLeft, AlertCircle } from "lucide-react";

export default function InputEssay() {
  // Pastikan parameter di URL router Anda sesuai (misal: /submit-essay/:courseId/:essayId)
  const { courseId, essayId } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [answers, setAnswers] = useState({}); // { id_question: "jawaban..." }
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // --- HELPER TOKEN ---
  const getToken = () => {
    const keys = ["authToken", "token", "access_token"];
    for (const key of keys) {
      const t = localStorage.getItem(key) || sessionStorage.getItem(key);
      if (t) {
        try {
            const parsed = JSON.parse(t);
            return parsed.token || parsed.access_token || parsed.authToken || t;
        } catch (e) {
            return t;
        }
      }
    }
    return null;
  };

  // --- 1. FETCH ASSIGNMENT DATA ---
  useEffect(() => {
    const fetchAssignmentDetail = async () => {
      const token = getToken();
      if (!token) {
        alert("Sesi habis, harap login kembali.");
        navigate("/login");
        return;
      }
      
      try {
        setLoading(true);
        // Endpoint GET Detail Assignment
        const response = await fetch(`http://127.0.0.1:8000/assignment/${essayId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil detail tugas (Mungkin ID salah atau deadline lewat).");
        }

        const data = await response.json();
        setAssignment(data);
        
        // Inisialisasi state jawaban
        const initialAnswers = {};
        if (data.questions) {
            data.questions.forEach(q => {
                initialAnswers[q.id_question] = ''; 
            });
        }
        setAnswers(initialAnswers);

      } catch (err) {
        console.error("Error fetching assignment:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (essayId) {
        fetchAssignmentDetail();
    }
  }, [essayId, navigate]);

  // Handle Input Change
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // --- 2. SUBMIT JAWABAN (PERBAIKAN UTAMA DISINI) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi Jawaban Kosong
    const emptyCount = assignment.questions.filter(q => !answers[q.id_question] || answers[q.id_question].trim() === "").length;
    
    if (emptyCount > 0) {
        if (!window.confirm(`Ada ${emptyCount} soal yang belum dijawab. Yakin ingin mengumpulkan?`)) {
            return;
        }
    } else {
        if (!window.confirm("Kirim semua jawaban? Anda tidak dapat mengubahnya lagi.")) {
            return;
        }
    }

    const token = getToken();
    setIsSubmitting(true);

    // BENTUK PAYLOAD (Harus sesuai Schema Backend: SubmissionCreate)
    const payload = {
        id_assignment: parseInt(essayId),
        items: assignment.questions.map(q => ({
            id_question: q.id_question,
            jawaban: answers[q.id_question] || ""
        }))
    };
    
    try {
        // PERBAIKAN URL: Gunakan /submission/ (tanpa submit_multi)
        const response = await fetch(`http://127.0.0.1:8000/submission/`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Gagal mengirimkan jawaban.");
        }

        const result = await response.json();
        alert(`Berhasil! ${result.message}`);
        
        // Redirect ke halaman list course
        navigate(`/course/${courseId}`); 

    } catch (error) {
        console.error("Error submitting:", error);
        alert(`Gagal Submit: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  // --- RENDER LOADING/ERROR ---
  if (loading) return <div className="text-center mt-20 font-bold text-gray-500 animate-pulse">Memuat Soal...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 font-bold">{error}</div>;
  if (!assignment) return <div className="text-center mt-20 text-gray-500">Data tidak ditemukan.</div>;
  
  // --- RENDER UI UTAMA ---
  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-6 md:p-10 font-[Inter] py-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Assignment */}
        <div className="bg-white shadow-sm rounded-2xl p-8 mb-8 border border-gray-200">
            <h1 className="text-2xl font-bold text-[#173A64] flex items-center mb-2">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                {assignment.judul}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                    <Clock className="w-4 h-4" /> 
                    Deadline: {assignment.deadline ? new Date(assignment.deadline).toLocaleString() : 'Tidak ada'}
                </span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
                    {assignment.questions ? assignment.questions.length : 0} Soal
                </span>
                {assignment.time_duration && (
                     <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium">
                        Durasi: {assignment.time_duration}
                    </span>
                )}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-gray-700 border border-gray-200">
                {assignment.deskripsi || "Kerjakan soal-soal di bawah ini dengan teliti."}
            </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 pb-24">
          
          {/* Loop Questions */}
          {assignment.questions && assignment.questions.length > 0 ? (
            assignment.questions
                .sort((a, b) => a.nomor_soal - b.nomor_soal)
                .map((q, index) => (
                <div key={q.id_question} className="bg-white shadow-sm rounded-2xl p-8 border border-gray-200 relative overflow-hidden">
                    {/* Hiasan Nomor Soal */}
                    <div className="absolute top-0 left-0 bg-[#173A64] text-white px-4 py-2 rounded-br-2xl text-sm font-bold shadow-sm">
                        Soal {index + 1}
                    </div>
                    
                    <div className="flex justify-end mb-4">
                         <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            Bobot: {q.bobot}
                        </span>
                    </div>

                    {/* Teks Soal */}
                    <div className="mb-6 mt-4 text-gray-800 text-lg leading-relaxed font-medium">
                        {q.teks_soal}
                    </div>

                    {/* Area Jawaban */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Jawaban Anda</label>
                        <textarea
                            rows="6"
                            value={answers[q.id_question] || ''}
                            onChange={(e) => handleAnswerChange(q.id_question, e.target.value)}
                            placeholder="Ketik jawaban Anda di sini..."
                            className="w-full border border-gray-300 rounded-xl p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#173A64] focus:border-transparent transition shadow-inner bg-gray-50 focus:bg-white"
                        />
                    </div>
                </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Belum ada soal untuk tugas ini.</p>
            </div>
          )}

          {/* Footer Action */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20">
             <div className="max-w-4xl mx-auto flex justify-between items-center">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#173A64] font-bold transition px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                    <ArrowLeft className="w-5 h-5" /> Batal
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition transform hover:-translate-y-1 ${
                        isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#173A64] hover:bg-[#23245c]'
                    }`}
                >
                    {isSubmitting ? "Mengirim..." : "Kirim Jawaban"} 
                    {!isSubmitting && <Send className="w-5 h-5" />}
                </button>
             </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}