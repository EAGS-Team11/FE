import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, FileText, Clock, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function InputEssay() {
  const { courseId, essayId } = useParams();
  const navigate = useNavigate();
  const questionRefs = useRef({}); 

  const [assignment, setAssignment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false); 
  const [activeQuestion, setActiveQuestion] = useState(null);

  const getToken = () => {
    const keys = ["authToken", "token", "access_token"];
    for (const key of keys) {
      const t = localStorage.getItem(key) || sessionStorage.getItem(key);
      if (t) {
        try {
            const parsed = JSON.parse(t);
            return parsed.token || parsed.access_token || parsed.authToken || t;
        } catch (e) { return t; }
      }
    }
    return null;
  };

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

        if (!response.ok) throw new Error("Gagal mengambil detail tugas.");

        const data = await response.json();
        setAssignment(data);
        
        const initialAnswers = {};
        if (data.questions) {
            data.questions.forEach(q => { initialAnswers[q.id_question] = ''; });
        }
        setAnswers(initialAnswers);
      } catch (err) {
        setError(err.message || "Gagal memuat data tugas.");
      } finally {
        setLoading(false);
      }
    };

    if (essayId) fetchAssignmentDetail();
  }, [essayId, navigate]);

  const scrollToQuestion = (questionId) => {
    const element = questionRefs.current[questionId];
    if (element) {
      // Offset 100px agar tidak tertutup Navbar saat scroll ke elemen
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveQuestion(questionId); 
    }
  };

  const handleScroll = () => {
    if (!assignment || !assignment.questions) return;
    const threshold = 150; 

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

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfirmed) {
        alert("⚠️ Harap centang konfirmasi 'Finalized' sebelum mengirim.");
        return;
    }
    
    const token = getToken();
    setIsSubmitting(true);

    const payload = {
        id_assignment: parseInt(essayId),
        items: assignment.questions.map(q => ({
          id_question: q.id_question,
          jawaban: answers[q.id_question] || '',
        }))
    };
    
    try {
        const response = await fetch(`http://127.0.0.1:8000/submission/`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Gagal mengirimkan jawaban.");

        alert("Jawaban berhasil dikirimkan!");
        navigate(`/course/${courseId}`); 
    } catch (error) {
        alert(`Gagal: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-[#F6F7FB] flex flex-col justify-center items-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#3D73B4] mb-4" />
            <div className="font-bold text-[#30326A] animate-pulse">Menyiapkan Lembar Jawaban...</div>
        </div>
    );
  }

  const sortedQuestions = assignment?.questions 
    ? [...assignment.questions].sort((a, b) => a.nomor_soal - b.nomor_soal) 
    : [];

  return (
    <div className="flex bg-[#F6F7FB] min-h-screen font-[Inter] pt-24"> 
      {/* ^ pt-24 Mengatasi konten terhalang Navbar */}

      {/* Sidebar Navigasi Soal */}
      <aside className="fixed left-0 top-24 w-[240px] h-[calc(100vh-6rem)] bg-white border-r border-gray-200 flex flex-col shadow-sm z-20">
        <div className="p-6">
            <h2 className="text-[#30326A] font-bold text-sm uppercase tracking-wider mb-4">Navigasi Soal</h2>
            <div className="grid grid-cols-3 gap-2">
            {sortedQuestions.map(q => (
                <button
                    key={q.id_question}
                    onClick={() => scrollToQuestion(q.id_question)}
                    className={`h-10 w-10 rounded-lg font-bold transition-all text-xs flex items-center justify-center border ${
                        activeQuestion === q.id_question 
                            ? "bg-[#3D73B4] text-white border-[#3D73B4] shadow-lg scale-110" 
                            : answers[q.id_question]?.trim() !== "" 
                                ? "bg-green-50 text-green-600 border-green-200" 
                                : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"
                    }`}
                >
                    {q.nomor_soal}
                </button>
            ))}
            </div>
        </div>

        <div className="mt-auto p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${isConfirmed ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                <span className="text-xs font-bold text-gray-700">Status: {isConfirmed ? 'Siap' : 'Draft'}</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-tight">Pastikan semua soal terjawab sebelum konfirmasi.</p>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 px-10 pb-20 ml-[240px]">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Card */}
          <header className="bg-white shadow-sm rounded-3xl p-8 mb-8 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                  <FileText size={120} />
              </div>
              <div className="relative z-10">
                <h1 className="text-3xl font-black text-[#30326A] mb-2">{assignment.judul}</h1>
                <p className="text-gray-500 text-sm mb-6 max-w-2xl">{assignment.deskripsi}</p>
                
                <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400 border-t pt-6">
                    <span className="flex items-center text-red-500">
                        <Clock className="w-4 h-4 mr-2" />
                        Deadline: {assignment.deadline ? new Date(assignment.deadline).toLocaleString('id-ID') : '-'}
                    </span>
                    <span className="flex items-center text-blue-600">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {sortedQuestions.length} Pertanyaan
                    </span>
                </div>
              </div>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            {sortedQuestions.map((q, idx) => (
                <section 
                    key={q.id_question} 
                    ref={el => questionRefs.current[q.id_question] = el}
                    className={`bg-white shadow-sm rounded-3xl p-8 border-2 transition-all duration-500 ${
                        activeQuestion === q.id_question ? "border-[#3D73B4] shadow-blue-100 shadow-2xl" : "border-transparent"
                    }`}
                >
                    <div className="flex justify-between items-center mb-6">
                        <span className="bg-[#3D73B4] text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter">
                            Pertanyaan {q.nomor_soal}
                        </span>
                        <span className="text-gray-400 text-xs font-bold uppercase italic">
                            Bobot Nilai: {q.bobot}
                        </span>
                    </div>

                    <h3 className="text-xl text-[#30326A] font-semibold mb-8 leading-relaxed">
                        {q.teks_soal}
                    </h3>

                    <div className="relative">
                        <textarea
                            rows="8"
                            value={answers[q.id_question] || ''}
                            onChange={(e) => handleAnswerChange(q.id_question, e.target.value)}
                            placeholder="Ketik analisis jawaban Anda di sini..."
                            className="w-full bg-gray-50 border-none rounded-2xl p-6 text-gray-700 text-base focus:ring-2 focus:ring-[#3D73B4] transition-all placeholder:text-gray-300"
                        />
                        <div className="absolute bottom-4 right-6 text-[10px] font-bold text-gray-300 uppercase">
                            {answers[q.id_question]?.length || 0} Karakter
                        </div>
                    </div>
                </section>
            ))}

            {/* Panel Konfirmasi Akhir */}
            <div className="bg-[#30326A] rounded-3xl p-10 text-white shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <AlertCircle className="text-yellow-400" />
                    Konfirmasi Pengiriman
                </h3>
                <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                    Setelah menekan tombol kirim, jawaban Anda akan otomatis masuk ke sistem grading AI. 
                    Anda tidak dapat melakukan perubahan jawaban setelah proses ini selesai.
                </p>

                <div className="flex items-center gap-4 mb-10 bg-white/10 p-4 rounded-2xl border border-white/10">
                    <input
                        type="checkbox"
                        id="confirmCheck"
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                        className="w-6 h-6 rounded border-none accent-[#3D73B4] cursor-pointer"
                    />
                    <label htmlFor="confirmCheck" className="text-sm font-semibold cursor-pointer select-none">
                        Saya sudah memeriksa kembali semua jawaban dan siap dinilai.
                    </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || !isConfirmed}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                            isConfirmed && !isSubmitting
                                ? 'bg-white text-[#30326A] hover:bg-blue-50'
                                : 'bg-white/20 text-white/40 cursor-not-allowed'
                        }`}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                        {isSubmitting ? "Proses Grading..." : "Submit Tugas"}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate(`/course/${courseId}`)}
                        className="px-8 py-4 rounded-2xl font-bold text-sm text-white/60 hover:text-white transition-colors"
                    >
                        Batal
                    </button>
                </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}