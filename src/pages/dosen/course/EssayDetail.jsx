import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, FileText } from "lucide-react";
// import createEssayImg from "../../../assets/createessay.png"; // Gunakan jika file ada
// Jika gambar tidak ada/error, kita pakai Icon FileText sebagai fallback di bawah

export default function EssayDetail() {
  // Pastikan parameter di route App.jsx Anda sesuai, misal: /course/:courseId/essay/:essayId
  // Di sini kita anggap essayId = assignmentId dari database
  const { courseId, essayId } = useParams(); 
  const navigate = useNavigate();

  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- FETCH DATA DARI API ---
  useEffect(() => {
    const fetchEssayDetail = async () => {
      try {
        // Ambil token
        const token = localStorage.getItem("token") || 
                      localStorage.getItem("access_token") || 
                      localStorage.getItem("authToken");

        if (!token) {
            alert("Sesi habis, silakan login kembali.");
            navigate("/login");
            return;
        }

        // Panggil Endpoint Backend: GET /assignment/{id}
        const response = await fetch(`http://127.0.0.1:8000/assignment/${essayId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 404) throw new Error("Assignment tidak ditemukan");
          throw new Error("Gagal mengambil data assignment");
        }

        const data = await response.json();
        setEssay(data); // Simpan data ke state
      } catch (err) {
        console.error("Error fetching detail:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (essayId) {
        fetchEssayDetail();
    }
  }, [essayId, navigate]);

  // Kembali ke halaman course, menggunakan courseId
  const handleBack = () => navigate(`/dosen/course/${courseId}`);
  
  // --- NAVIGASI KE HALAMAN EDIT (Path sudah benar) ---
  const handleEdit = () =>
    navigate(`/dosen/course/${courseId}/edit-essay/${essayId}`, {
    state: { essay }, // Mengirim data saat ini ke halaman edit (opsional)
  });

  // --- TAMPILAN LOADING / ERROR ---
  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading data...</div>;
  }

  if (error || !essay) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error || "Essay not found 😢"}
        <div className="mt-4">
            <button onClick={handleBack} className="text-blue-600 underline">Kembali</button>
        </div>
      </div>
    );
  }

  // --- RENDER UI UTAMA ---
  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-8 flex justify-center -mt-20">
      <div className="w-full max-w-4xl scale-[0.9]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 ml-[-70px]">
          <div className="flex items-center">
            {/* Ganti img dengan Icon jika gambar createEssayImg error */}
            <FileText className="w-8 h-8 mr-3 text-[#30326A]" />
            <h1 className="text-[#30326A] font-bold text-xl font-inter text-left">
              Essay Detail
            </h1>
          </div>

          {/* Tombol Edit */}
          <button
            onClick={handleEdit}
            className="flex items-center text-[#30326A] hover:text-[#23245c] transition font-inter text-sm"
          >
            <Pencil className="w-5 h-5 mr-2" />
            Edit
          </button>
        </div>

        {/* Info Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
              * ASSIGNMENT NAME
            </label>
            {/* Mapping field 'judul' dari API */}
            <input
              type="text"
              value={essay.judul || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
            />
          </div>

          <div>
            <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
              * DESCRIPTION
            </label>
            {/* Mapping field 'deskripsi' dari API */}
            <textarea
              value={essay.deskripsi || ""}
              readOnly
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
                * TASK TYPE
              </label>
              <input
                type="text"
                value="Essay" 
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
                * CREATED AT / START
              </label>
              <input
                type="text"
                // Menggunakan created_at jika ada, atau fallback
                value={essay.created_at ? new Date(essay.created_at).toLocaleString() : "-"}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Jika ada field time_duration di DB, tampilkan. Jika tidak, hide atau strip */}
            <div>
              <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
                * TIME DURATION
              </label>
              <input
                type="text"
                value="-" // Placeholder karena belum ada di DB standard
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
                * DEADLINE
              </label>
              {/* Format Tanggal Deadline */}
              <input
                type="text"
                value={essay.deadline ? new Date(essay.deadline).toLocaleString() : ""}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
              />
            </div>
          </div>

          {/* Bagian Total Submitted (Placeholder Logic) */}
          <div>
            <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
              * TOTAL SUBMITTED
            </label>
            <input
              type="text"
              value="0 Students" // Belum ada endpoint count submission
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
            />
          </div>

          <div>
            <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
              ATTACHMENT
            </label>
            <input
              type="text"
              value="No attachment"
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm italic"
            />
          </div>

          {/* --- QUESTIONS SECTION (DYNAMIC FROM API) --- */}
          <div>
            <label className="block text-[#0B102D] font-semibold text-sm mb-3 text-left">
              QUESTIONS
            </label>
            {essay.questions && essay.questions.length > 0 ? (
              <div className="space-y-4">
                {essay.questions.map((q, index) => (
                  <div
                    key={q.id_question || index}
                    className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-white transition shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-bold text-[#30326A]">
                        Question {q.nomor_soal}
                        </p>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">
                            {q.bobot} Poin
                        </span>
                    </div>
                    
                    <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Pertanyaan:</p>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{q.teks_soal}</p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-green-600 uppercase mb-1">Kunci Jawaban:</p>
                        <p className="text-sm text-gray-700 bg-green-50 p-2 rounded border border-green-100 italic">
                            {q.kunci_jawaban}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic border border-dashed border-gray-300 p-4 rounded text-center">
                No questions found for this assignment.
              </p>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={handleBack}
            className="bg-[#30326A] text-white px-6 py-2 rounded-lg font-inter text-sm hover:bg-[#23245c] ml-[-800px]"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}