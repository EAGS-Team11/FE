import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Trash2, Save, PlusCircle, ArrowLeft, FileText } from "lucide-react";

export default function AddQuestion() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();

  // Menerima data Judul/Deskripsi/Deadline dari halaman sebelumnya (CreateEssay)
  const assignmentData = location.state || {};

  const [questions, setQuestions] = useState([
    { number: 1, teks_soal: "", kunci_jawaban: "", bobot: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        number: questions.length + 1,
        teks_soal: "",
        kunci_jawaban: "",
        bobot: "", 
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleDelete = (index) => {
    if (questions.length === 1) {
      alert("Minimal harus ada satu soal.");
      return;
    }
    const updated = questions.filter((_, i) => i !== index);
    const renumbered = updated.map((q, i) => ({ ...q, number: i + 1 }));
    setQuestions(renumbered);
  };

  // --- FUNGSI BARU: PENCARIAN TOKEN YANG LEBIH LUAS ---
  const getToken = () => {
    // Cek function helper untuk mencari di storage tertentu
    const searchInStorage = (storage) => {
        // 1. Cek key langsung
        // UPDATE: Menambahkan 'authToken' (sesuai screenshot console Anda)
        let t = storage.getItem("token") || 
                storage.getItem("access_token") || 
                storage.getItem("jwt") ||
                storage.getItem("auth_token") ||
                storage.getItem("authToken"); 
        
        // 2. Cek di dalam objek JSON (misal: 'user', 'auth', 'session')
        if (!t) {
            const possibleKeys = ["user", "auth", "session", "persist:root"];
            for (const key of possibleKeys) {
                const item = storage.getItem(key);
                if (item) {
                    try {
                        const parsed = JSON.parse(item);
                        // Cek property umum
                        t = parsed.token || parsed.access_token || parsed.jwt || parsed.authToken;
                        // Khusus Redux Persist kadang perlu parsing lagi
                        if (!t && parsed.user) {
                             // Cek apakah user adalah string JSON lagi
                             if (typeof parsed.user === 'string') {
                                 const nestedUser = JSON.parse(parsed.user);
                                 t = nestedUser.token || nestedUser.access_token || nestedUser.authToken;
                             } else {
                                 t = parsed.user.token || parsed.user.access_token || parsed.user.authToken;
                             }
                        }
                    } catch (e) {
                        // Abaikan error parsing
                    }
                }
                if (t) break;
            }
        }
        return t;
    };

    // Prioritas 1: localStorage
    let token = searchInStorage(localStorage);
    
    // Prioritas 2: sessionStorage (jika tidak ketemu di local)
    if (!token) {
        token = searchInStorage(sessionStorage);
    }

    // Pembersihan: Kadang token ada kutipnya jika dari JSON stringify yang tidak rapi
    if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }

    return token;
  };

  // Simpan ke Database
  const handleSave = async () => {
    // 1. Validasi Input
    for (const q of questions) {
      if (!q.teks_soal || !q.kunci_jawaban) {
        alert(`Mohon lengkapi Soal dan Kunci Jawaban untuk nomor ${q.number}`);
        return;
      }
      if (!q.bobot) {
         alert(`Mohon isi bobot poin untuk soal nomor ${q.number}`);
         return;
      }
    }

    if (!assignmentData.judul) {
      alert("Data Assignment (Judul) tidak ditemukan. Silakan kembali ke halaman sebelumnya.");
      return;
    }

    // 2. AMBIL TOKEN
    const token = getToken();
    
    // Debugging: Log isi storage untuk membantu diagnosa jika masih gagal
    if (!token) {
        console.error("Gagal menemukan token.");
        console.log("Mencari 'authToken' di localStorage...", localStorage.getItem("authToken"));
        
        alert("Sesi tidak valid (Token tidak ditemukan). Cek Console (F12) untuk detail storage.");
        return;
    }

    setIsSubmitting(true);

    const payload = {
      id_course: parseInt(courseId),
      judul: assignmentData.judul,
      deskripsi: assignmentData.deskripsi,
      deadline: assignmentData.deadline, 
      questions: questions.map((q) => ({
        nomor_soal: q.number,
        teks_soal: q.teks_soal,
        kunci_jawaban: q.kunci_jawaban,
        bobot: parseInt(q.bobot) || 0,
      })),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/assignment/create_with_questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Sesi kadaluarsa (Unauthorized). Silakan login kembali.");
        }
        const errData = await response.json();
        throw new Error(errData.detail || "Gagal menyimpan assignment");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Assignment berhasil dibuat!");
      
      // PERBAIKAN DI SINI:
      // Sebelumnya: navigate(`/dosen/course-detail/${courseId}`);
      // Sekarang diarahkan kembali ke halaman course standar
      navigate(`/dosen/course/${courseId}`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert(`Gagal menyimpan: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(`/dosen/course/${courseId}/create-essay`, { state: assignmentData });
  };

  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 mr-3 text-[#30326A]" />
          <h1 className="text-[#30326A] font-bold text-xl font-inter">
            Create Assignments / Essay
          </h1>
        </div>

        {/* Title section */}
        <div className="mb-6">
          <h2 className="text-[#0B102DB3] font-bold text-lg mb-1 font-inter">
            Add Questions
          </h2>
          <p className="text-[#0B102DB3] font-semibold text-sm font-inter">
            Please add question contents and reference answers below.
          </p>
          {assignmentData.judul && (
             <div className="mt-2 text-sm text-[#30326A] bg-blue-50 p-2 rounded w-fit">
                <strong>Assignment:</strong> {assignmentData.judul}
             </div>
          )}
        </div>

        {/* List of Questions */}
        <div className="space-y-6 pb-20">
          {questions.map((q, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gray-50 flex justify-between items-center px-6 py-3 border-b border-gray-200">
                <span className="text-[#30326A] font-bold font-inter text-sm">
                  Question #{q.number}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-red-50"
                  title="Delete Question"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Row 1: Question Text */}
                <div>
                    <label className="block text-sm font-semibold text-[#0B102D] mb-1">
                        The Question (Pertanyaan)
                    </label>
                    <textarea
                        value={q.teks_soal}
                        onChange={(e) => handleChange(index, "teks_soal", e.target.value)}
                        rows="3"
                        placeholder="Tuliskan pertanyaan untuk mahasiswa..."
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A] transition"
                    />
                </div>

                {/* Row 2: Reference Answer */}
                <div>
                    <label className="block text-sm font-semibold text-[#0B102D] mb-1">
                        Reference Answer (Kunci Jawaban)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                        Jawaban ini digunakan sistem AI untuk menilai essay mahasiswa.
                    </p>
                    <textarea
                        value={q.kunci_jawaban}
                        onChange={(e) => handleChange(index, "kunci_jawaban", e.target.value)}
                        rows="4"
                        placeholder="Tuliskan jawaban yang benar/ideal di sini..."
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A] transition"
                    />
                </div>

                {/* Row 3: Points */}
                <div className="flex items-center gap-4">
                    <div className="w-32">
                        <label className="block text-sm font-semibold text-[#0B102D] mb-1">
                            Points (Bobot)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={q.bobot}
                            onChange={(e) => handleChange(index, "bobot", e.target.value)}
                            placeholder="10"
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                        />
                    </div>
                </div>

              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
                onClick={handleAddQuestion}
                type="button"
                className="w-full border-2 border-dashed border-[#30326A] text-[#30326A] font-semibold font-inter text-sm rounded-xl py-3 hover:bg-blue-50 transition flex justify-center items-center gap-2"
            >
                <PlusCircle className="w-5 h-5" />
                ADD NEW QUESTION
            </button>

            <div className="flex justify-between items-center pt-4">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#30326A] font-semibold transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>

                <button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 bg-[#30326A] text-white px-8 py-3 rounded-xl font-inter text-sm font-bold shadow-lg hover:bg-[#23245c] transition transform hover:scale-105 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    <Save className="w-5 h-5" />
                    {isSubmitting ? "Saving..." : "SAVE ASSIGNMENT"}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}