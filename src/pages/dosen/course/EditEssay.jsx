import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Upload, Trash2, FileText, ArrowLeft, Save } from "lucide-react";

export default function EditEssay() {
  const navigate = useNavigate();
  // Gunakan essayId untuk fetch, courseId hanya diambil jika tersedia
  const { courseId, essayId } = useParams();
  
  const [showQuestions, setShowQuestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id_course: null, // <<< INI TAMBAHAN PENTING
    assignmentName: "",
    description: "",
    taskType: "Essay",
    startDate: "",
    timeDuration: "",
    deadline: "",
    attachment: null,
  });

  const [questions, setQuestions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

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

  // --- STEP 1: FETCH DATA DARI API SAAT HALAMAN DIBUKA ---
  useEffect(() => {
    const fetchEssayDetail = async () => {
      const token = getToken();
      if (!token) {
        setError("Token hilang atau sesi berakhir.");
        setLoading(false);
        navigate("/login"); 
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/assignment/${essayId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.status === 401) {
             throw new Error("Sesi kadaluarsa (Unauthorized).");
        }
        if (!response.ok) {
          throw new Error("Gagal mengambil data assignment");
        }

        const data = await response.json();
        
        const formatForInput = (isoString) => {
            if (!isoString) return "";
            const date = new Date(isoString);
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); 
            return date.toISOString().slice(0, 16); 
        };

        setForm({
          id_course: data.id_course, // <<< AMBIL ID COURSE DARI API
          assignmentName: data.judul || "",
          description: data.deskripsi || "",
          taskType: "Essay", 
          startDate: data.created_at ? formatForInput(data.created_at) : "",
          timeDuration: "", 
          deadline: data.deadline ? formatForInput(data.deadline) : "",
          attachment: null,
        });

        const mappedQuestions = data.questions.map(q => ({
          number: q.nomor_soal,
          question: q.teks_soal,
          referenceAnswer: q.kunci_jawaban, 
          points: q.bobot.toString(),
        }));
        
        setQuestions(mappedQuestions);

      } catch (err) {
        console.error("Error fetching data for edit:", err);
        setError(err.message || "Gagal memuat detail tugas.");
        if (err.message.includes("Unauthorized") || err.message.includes("kadaluarsa")) {
             navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (essayId) {
        fetchEssayDetail();
    }
  }, [essayId, navigate]);


  // Handle perubahan data form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, attachment: e.target.files[0] });
  };

  // Handle pertanyaan
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { 
        number: questions.length + 1, 
        question: "", 
        referenceAnswer: "", 
        points: "" 
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleDeleteQuestion = (index) => {
    if (questions.length === 1) {
      alert("Minimal harus ada satu soal.");
      return;
    }
    const updated = questions.filter((_, i) => i !== index);
    const renumbered = updated.map((q, i) => ({ ...q, number: i + 1 }));
    setQuestions(renumbered);
  };

  const handleNext = () => {
    if (!form.assignmentName || !form.description || !form.deadline) {
        alert("Mohon lengkapi Assignment Name, Description, dan Deadline sebelum melanjutkan.");
        return;
    }
    setShowQuestions(true);
  };

  // --- HANDLE SAVE (UPDATE) ---
  const handleSaveAssignment = async () => {
    // 1. Validasi Soal
    for (const q of questions) {
        if (!q.question || !q.referenceAnswer || !q.points) {
            alert(`Mohon lengkapi Soal, Kunci Jawaban, dan Bobot untuk nomor ${q.number}`);
            return;
        }
    }

    const token = getToken();
    if (!token) {
        alert("Sesi tidak valid. Harap login ulang.");
        navigate("/login");
        return;
    }
    
    // Validasi ID Course (Sekarang diambil dari state, bukan URL)
    const courseIdInt = form.id_course; 
    if (!courseIdInt || isNaN(courseIdInt)) {
        alert("Fatal Error: ID Course tidak ditemukan atau tidak valid.");
        return;
    }

    // Konversi string datetime-local ke ISO string yang diterima Pydantic
    const formatDeadline = (dateString) => {
        if (!dateString) return null; 
        try {
            return new Date(dateString).toISOString(); 
        } catch (e) {
            return null;
        }
    };

    const formattedDeadline = formatDeadline(form.deadline);
    if (!formattedDeadline) {
        alert("Deadline harus diisi dengan format tanggal/waktu yang benar.");
        return;
    }

    setIsSaving(true);

    // 2. Bentuk Payload untuk Backend (PUT)
    const payload = {
        id_course: courseIdInt, // <<< MENGGUNAKAN ID DARI STATE
        judul: form.assignmentName,
        deskripsi: form.description,
        deadline: formattedDeadline, 
        questions: questions.map((q) => ({
            nomor_soal: q.number,
            teks_soal: q.question,
            kunci_jawaban: q.referenceAnswer, 
            bobot: parseInt(q.points) || 0,
        })),
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/assignment/${essayId}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(payload),
        });

        if (response.status === 401) {
            throw new Error("Sesi kadaluarsa saat menyimpan.");
        }
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Backend Error Detail:", errorData);
            throw new Error(errorData.detail ? JSON.stringify(errorData.detail) : "Gagal memperbarui assignment (Lihat konsol untuk detail error).");
        }

        alert("Assignment berhasil diperbarui!");
        // Redirect kembali ke halaman detail setelah update
        // Kita gunakan ID Course dari state form agar path-nya utuh
        navigate(`/dosen/course/${courseIdInt}/essay/${essayId}`);

    } catch (error) {
        console.error("Error updating assignment:", error);
        alert(`Terjadi kesalahan saat menyimpan perubahan: ${error.message}`);
        if (error.message.includes("kadaluarsa")) {
             navigate("/login");
        }
    } finally {
        setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (showQuestions) {
      setShowQuestions(false);
    } else {
      // Kembali ke halaman detail
      navigate(`/dosen/assignment/${essayId}`);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-8 flex justify-center -mt-20">
      <div className="w-full max-w-3xl scale-[0.9]">
        {/* Header */}
        <div className="flex items-center mb-6 ml-[-70px]">
          <FileText className="w-8 h-8 mr-3 text-[#30326A]" />
          <h1 className="text-[#30326A] font-bold text-xl font-inter text-left">
            {showQuestions ? "Edit Questions" : "Edit Assignment / Essay"}
          </h1>
        </div>

        {/* --- STEP 1: EDIT ESSAY FORM --- */}
        {!showQuestions && (
          <>
            <div className="mb-8 ml-[-20px]">
              <h2 className="text-[#0B102DB3] font-bold text-base mb-1 font-inter text-left">
                Edit Assignment / Essay
              </h2>
              <p className="text-[#0B102DB3] font-semibold text-sm font-inter text-left">
                Please update the assignment details below.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* Assignment Name */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                    * ASSIGNMENT NAME
                  </label>
                  <input
                    type="text"
                    name="assignmentName"
                    value={form.assignmentName}
                    onChange={handleFormChange}
                    placeholder="Masukkan judul essay"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                    * ADD DESCRIPTION
                  </label>
                  <textarea
                    name="description"
                    rows="6"
                    value={form.description}
                    onChange={handleFormChange}
                    placeholder="Task instruction"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  />
                </div>

                {/* Task Type */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                    * TASK TYPE
                  </label>
                  <select
                    name="taskType"
                    value={form.taskType}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  >
                    <option value="Essay">Essay</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Project">Project</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                    * START DATE
                  </label>
                  {/* Gunakan datetime-local agar widgetnya muncul */}
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  />
                </div>

                {/* Time Duration */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                    * TIME DURATION
                  </label>
                  <input
                    type="text"
                    name="timeDuration"
                    value={form.timeDuration}
                    onChange={handleFormChange}
                    placeholder="Durasi pengerjaan (misal: 2 Jam)"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                    * DEADLINE
                  </label>
                   {/* Gunakan datetime-local agar widgetnya muncul */}
                  <input
                    type="datetime-local"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  />
                </div>

                {/* Attachment */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-2 font-inter text-sm text-left">
                    ATTACHMENT FILE (optional)
                  </label>
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-center bg-gray-50">
                    <Upload className="w-10 h-10 text-[#30326A] mb-3" />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileUpload"
                    />
                    <label
                      htmlFor="fileUpload"
                      className="cursor-pointer text-[#0B102D] font-inter text-sm"
                    >
                      <div className="text-[#0B102DB3]">
                        Drag and drop an image, or{" "}
                        <span className="text-[#007BFF] underline">Browse</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-tight">
                        Allowed file types: PNG, JPEG, JPG, GIF, PDF, DOCX, HTML
                        <br />
                        Maksimum file size 1GB
                      </p>
                    </label>
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#30326A] text-white px-8 py-2 rounded-lg text-sm hover:bg-[#23245c]"
                  >
                    Next (Edit Questions) →
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* --- STEP 2: EDIT QUESTION --- */}
        {showQuestions && (
          <>
            <div className="mb-8 ml-[-20px]">
              <h2 className="text-[#0B102DB3] font-bold text-base mb-1 font-inter text-left">
                Edit Questions
              </h2>
              <p className="text-[#0B102DB3] font-semibold text-sm font-inter text-left">
                Update question contents and reference answers below.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
              {questions.map((q, index) => (
                <div key={index} className="border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center bg-gray-50 border-b border-gray-300 px-4 py-2">
                    <span className="font-bold text-[#30326A] text-sm">Question {q.number}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(index)}
                      className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-white"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Question Text */}
                    <div>
                        <label className="block text-sm font-semibold text-[#0B102D] mb-1">Pertanyaan:</label>
                        <textarea
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                            rows="2"
                            placeholder="Tuliskan pertanyaan di sini..."
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                        />
                    </div>
                    
                    {/* Reference Answer */}
                    <div>
                        <label className="block text-sm font-semibold text-green-700 mb-1">Reference Answer (Kunci Jawaban):</label>
                        <textarea
                            value={q.referenceAnswer} 
                            onChange={(e) => handleQuestionChange(index, "referenceAnswer", e.target.value)}
                            rows="3"
                            placeholder="Jawaban ideal untuk penilaian AI..."
                            className="w-full border border-gray-300 rounded-md p-2 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    
                    {/* Points */}
                    <div className="w-32">
                        <label className="block text-sm font-semibold text-[#0B102D] mb-1">Points (Bobot):</label>
                        <input
                            type="number"
                            min="1"
                            value={q.points}
                            onChange={(e) => handleQuestionChange(index, "points", e.target.value)}
                            placeholder="10"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                        />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddQuestion}
                type="button"
                className="w-full border-2 border-dashed border-[#30326A] text-[#30326A] font-semibold text-sm rounded-lg py-2 hover:bg-gray-100 flex justify-center items-center gap-2"
              >
                + ADD QUESTION
              </button>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveAssignment}
                  disabled={isSaving}
                  className={`flex items-center gap-2 bg-[#30326A] text-white px-8 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-[#23245c] transition ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "SAVE CHANGES"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#30326A] transition font-inter text-sm ml-[-800px]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}