import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, FileText, Clock, ArrowLeft, Loader2 } from "lucide-react";

export default function InputEssay() {
  const { courseId, essayId } = useParams(); // essayId = id_assignment
  const navigate = useNavigate();
  // Ref untuk menampung referensi ke setiap elemen pertanyaan (untuk scrolling)
  const questionRefs = useRef({}); 

  const [assignment, setAssignment] = useState(null);
  const [answers, setAnswers] = useState({}); // Key: id_question, Value: jawaban string
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false); 
  const [activeQuestion, setActiveQuestion] = useState(null); // ID pertanyaan yang sedang aktif/dilihat

  // Helper function untuk mengambil token
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

  // --- FETCH DATA ASSIGNMENT ---
  useEffect(() => {
    const fetchAssignmentDetail = async () => {
      const token = getToken();
      if (!token) {
        setError("Sesi habis, harap login kembali.");
        setLoading(false);
        navigate("/login");
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/assignment/${essayId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil detail tugas.");
        }

        const data = await response.json();
        setAssignment(data);
        
        // Inisialisasi state jawaban berdasarkan ID Soal
        const initialAnswers = {};
        if (data.questions) {
            data.questions.forEach(q => {
                initialAnswers[q.id_question] = '';
            });
        }
        setAnswers(initialAnswers);

      } catch (err) {
        console.error("Error fetching assignment:", err);
        setError(err.message || "Gagal memuat data tugas.");
      } finally {
        setLoading(false);
      }
    };

    if (essayId) {
        fetchAssignmentDetail();
    }
  }, [essayId, navigate]);


  // --- LOGIKA SCROLL INTERAKSI ---
  const scrollToQuestion = (questionId) => {
    const element = questionRefs.current[questionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveQuestion(questionId); 
    }
  };

  const handleScroll = () => {
    if (!assignment || !assignment.questions) return;
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.4; 

    for (const q of assignment.questions) {
      const element = questionRefs.current[q.id_question];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= threshold) {
          setActiveQuestion(q.id_question);
          break; 
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [assignment]);


  // Handle perubahan input jawaban per ID Soal
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // --- SUBMIT SEMUA JAWABAN (PERBAIKAN UTAMA) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConfirmed) {
        alert("⚠️ Harap centang konfirmasi 'Finalized' sebelum mengirim.");
        return;
    }
    
    const token = getToken();
    if (!token) {
        alert("Sesi tidak valid. Harap login ulang.");
        navigate("/login");
        return;
    }

    setIsSubmitting(true);

    // 1. Siapkan Payload (Structure harus: items: [{id_question, jawaban}])
    const submissionItems = assignment.questions.map(q => ({
      id_question: q.id_question,
      jawaban: answers[q.id_question] || '', // Ubah key jadi 'jawaban' sesuai Backend
    }));

    const payload = {
        id_assignment: parseInt(essayId),
        items: submissionItems // Ubah key jadi 'items' sesuai Backend
    };
    
    try {
        // 2. URL Fix: Hapus 'submit_multi', gunakan root '/submission/'
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
            throw new Error(errorData.detail ? JSON.stringify(errorData.detail) : "Gagal mengirimkan jawaban.");
        }

        alert("Jawaban berhasil dikirimkan!");
        navigate(`/course/${courseId}`); 

    } catch (error) {
        console.error("Error submitting answers:", error);
        alert(`Terjadi kesalahan saat menyimpan jawaban: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  // --- TAMPILAN LOADING / ERROR ---
  if (loading) {
    return (
        <div className="min-h-screen bg-[#F6F7FB] flex justify-center items-center">
            <Loader2 className="w-8 h-8 mr-2 animate-spin text-[#3D73B4]" />
            <div className="font-bold text-[#3D73B4]">Memuat Soal...</div>
        </div>
    );
  }

  if (error || !assignment) {
    return <div className="text-center mt-20 text-red-500">{error || "Tugas tidak ditemukan."}</div>;
  }
  
  // Safety check sorting
  const sortedQuestions = assignment.questions 
    ? [...assignment.questions].sort((a, b) => a.nomor_soal - b.nomor_soal) 
    : [];

  // --- RENDER UI UTAMA ---
  return (
    <div className="flex bg-[#F6F7FB] min-h-screen font-[Inter]">
      
      {/* Sidebar Soal (Fixed Position) */}
      <div className="fixed w-[200px] h-full bg-white border-r border-gray-200 flex flex-col items-center py-8 shadow-xl z-20 overflow-y-auto">
        <h2 className="text-[#222] font-semibold text-lg mb-6">Navigasi Soal</h2>
        <div className="flex flex-col gap-3 px-4 w-full mb-20">
          {sortedQuestions.map(q => (
            <button
                key={q.id_question}
                onClick={() => scrollToQuestion(q.id_question)}
                className={`w-full py-2 rounded-lg font-semibold transition-all text-sm flex items-center justify-center ${
                    activeQuestion === q.id_question 
                        ? "bg-[#3D73B4] text-white shadow-md" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
                Soal {q.nomor_soal}
            </button>
          ))}
        </div>

        {/* Status Submit di Sidebar Bawah */}
        <div className="fixed bottom-0 w-[200px] bg-white border-t border-gray-200 p-4 text-center shadow-inner-top">
            <p className={`text-xs font-bold ${isConfirmed ? 'text-green-600' : 'text-yellow-600'}`}>
                {isConfirmed ? "✅ Siap Kirim" : "⏳ Menunggu Konfirmasi"}
            </p>
        </div>
      </div>

      {/* Main Area (Content) */}
      <div className="flex-1 px-8 py-10 ml-[200px]">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Tugas */}
          <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 border-b-4 border-[#30326A]">
              <h1 className="text-2xl font-bold text-[#30326A] flex items-center mb-1">
                  <FileText className="w-6 h-6 mr-3" />
                  {assignment.judul}
              </h1>
              <p className="text-sm text-gray-600 mb-4 whitespace-pre-wrap">{assignment.deskripsi}</p>
              
              <div className="flex justify-between text-xs text-gray-500 border-t pt-3 mt-3">
                  <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Batas Akhir: {assignment.deadline ? new Date(assignment.deadline).toLocaleString() : '-'}
                  </span>
                  <span className="font-semibold text-[#1E4F91]">
                      Total Soal: {assignment.questions ? assignment.questions.length : 0}
                  </span>
              </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 pb-20">
            
            {/* DAFTAR PERTANYAAN DAN KOLOM JAWABAN */}
            {sortedQuestions.map((q) => (
                <div 
                    key={q.id_question} 
                    id={`question-${q.id_question}`}
                    ref={el => questionRefs.current[q.id_question] = el}
                    className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 transition-all scroll-mt-24"
                >
                    
                    <div className="flex justify-between items-start mb-4 border-b pb-3 border-gray-100">
                        <h2 className="text-lg font-bold text-[#30326A] flex items-center">
                            Soal {q.nomor_soal}
                        </h2>
                         <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">
                            Bobot: {q.bobot} Poin
                        </span>
                    </div>

                    {/* Teks Soal */}
                    <div className="text-md text-gray-800 mb-6 whitespace-pre-wrap font-medium leading-relaxed">
                        {q.teks_soal}
                    </div>

                    {/* Input Jawaban */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Jawaban Anda:</label>
                        <textarea
                            rows="10"
                            value={answers[q.id_question] || ''}
                            onChange={(e) => handleAnswerChange(q.id_question, e.target.value)}
                            placeholder="Tuliskan jawaban essay Anda di sini..."
                            className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E4F91] focus:border-transparent shadow-sm"
                        />
                    </div>
                </div>
            ))}

            {/* Checkbox Konfirmasi */}
            <div className="flex items-center gap-3 mt-8 bg-yellow-50 p-6 rounded-xl border border-yellow-200 shadow-sm">
                <input
                    type="checkbox"
                    id="confirmCheck"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    className="w-6 h-6 accent-[#3D73B4] cursor-pointer"
                />
                <label htmlFor="confirmCheck" className="text-gray-800 text-sm font-medium cursor-pointer select-none">
                    Saya menyatakan bahwa saya telah meninjau semua jawaban dan siap untuk mengirimkannya. <br/>
                    <span className="text-red-500 text-xs">(Jawaban tidak dapat diedit setelah dikirim)</span>
                </label>
            </div>


            {/* Tombol Submit */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                  type="button"
                  onClick={() => navigate(`/course/${courseId}`)}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#173A64] font-bold transition px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                  <ArrowLeft className="w-5 h-5" />
                  Kembali
              </button>
              
              <button
                  type="submit"
                  disabled={isSubmitting || !isConfirmed}
                  className={`flex items-center gap-2 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition transform hover:scale-105 ${
                      isConfirmed && !isSubmitting
                          ? 'bg-[#173A64] hover:bg-[#23245c]'
                          : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                  {isSubmitting ? (
                      <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Mengirim...
                      </>
                  ) : (
                      <>
                          <Send className="w-5 h-5" />
                          KIRIM JAWABAN
                      </>
                  )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}