import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Trash2, FileText, ArrowLeft, Save } from "lucide-react";

export default function EditEssay() {
  const navigate = useNavigate();
  // Kita ambil essayId saja dari URL. Abaikan courseId dari params karena sering undefined.
  const { essayId } = useParams();
  
  const [showQuestions, setShowQuestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id_course: null, // <--- INI PENTING: KITA SIMPAN ID COURSE DI SINI
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

  // Helper function token
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

  // --- STEP 1: FETCH DATA ---
  useEffect(() => {
    const fetchEssayDetail = async () => {
      const token = getToken();
      if (!token) {
        setError("Token hilang atau sesi berakhir.");
        navigate("/login"); 
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/assignment/${essayId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Gagal mengambil data assignment");

        const data = await response.json();
        
        const formatForInput = (isoString) => {
            if (!isoString) return "";
            const date = new Date(isoString);
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); 
            return date.toISOString().slice(0, 16); 
        };

        // SIMPAN ID COURSE DARI API KE STATE
        setForm({
          id_course: data.id_course, // <--- ID COURSE DIAMBIL DARI DATABASE
          assignmentName: data.judul || "",
          description: data.deskripsi || "",
          taskType: "Essay", 
          startDate: data.created_at ? formatForInput(data.created_at) : "",
          timeDuration: "", 
          deadline: data.deadline ? formatForInput(data.deadline) : "",
          attachment: null,
        });

        const mappedQuestions = data.questions.map(q => ({
          id: q.id_question,
          number: q.nomor_soal,
          question: q.teks_soal,
          referenceAnswer: q.kunci_jawaban, 
          points: q.bobot.toString(),
        }));
        
        setQuestions(mappedQuestions);

      } catch (err) {
        console.error("Error fetching:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (essayId) fetchEssayDetail();
  }, [essayId, navigate]);


  // Handle Form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, attachment: e.target.files[0] });
  };

  // Handle Questions
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: null, number: questions.length + 1, question: "", referenceAnswer: "", points: "" },
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
        alert("Mohon lengkapi Assignment Name, Description, dan Deadline.");
        return;
    }
    setShowQuestions(true);
  };

  // --- LOGIKA NAVIGASI YANG DIPERBAIKI (ANTI UNDEFINED) ---
  const handleBack = () => {
    if (showQuestions) {
      setShowQuestions(false);
    } else {
      // PERBAIKAN: Gunakan ID Course dari State Form (karena URL param mungkin null)
      const validCourseId = form.id_course;
      
      if (validCourseId) {
        navigate(`/dosen/course/${validCourseId}`);
      } else {
        // Fallback jika state belum terload (misal user klik back super cepat)
        console.warn("Course ID belum terload, kembali ke dashboard");
        navigate("/dosen/dashboard"); 
      }
    }
  };

  // --- HANDLE SAVE ---
  const handleSaveAssignment = async () => {
    const token = getToken();
    if (!token) { navigate("/login"); return; }
    
    // Validasi ID Course dari State
    const courseIdInt = form.id_course; 
    if (!courseIdInt) {
        alert("Error: ID Course data hilang. Silakan refresh halaman.");
        return;
    }

    const formatDeadline = (dateString) => {
        try { return new Date(dateString).toISOString(); } catch (e) { return null; }
    };
    const formattedDeadline = formatDeadline(form.deadline);
    
    setIsSaving(true);

    const payload = {
        id_course: courseIdInt,
        judul: form.assignmentName,
        deskripsi: form.description,
        deadline: formattedDeadline, 
        questions: questions.map((q) => ({
            id_question: q.id,
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Gagal update assignment.");
        }

        alert("Assignment berhasil diperbarui!");
        
        // Redirect menggunakan ID Course yang VALID dari state
        navigate(`/dosen/course/${courseIdInt}/essay/${essayId}`);

    } catch (error) {
        console.error("Error updating:", error);
        alert(`Gagal menyimpan: ${error.message}`);
    } finally {
        setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading data...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-8 flex justify-center -mt-20">
      <div className="w-full max-w-3xl scale-[0.9]">
        
        {/* Header */}
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 mr-3 text-[#30326A]" />
          <h1 className="text-[#30326A] font-bold text-xl font-inter text-left">
            {showQuestions ? "Edit Questions" : "Edit Assignment / Essay"}
          </h1>
        </div>

        {/* --- FORM STEP 1 --- */}
        {!showQuestions && (
          <>
            <div className="mb-8">
              <h2 className="text-[#0B102DB3] font-bold text-base mb-1 font-inter text-left">
                Edit Assignment Details
              </h2>
              <p className="text-[#0B102DB3] font-semibold text-sm font-inter text-left">
                 Please update the assignment details below.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* Judul */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 text-sm text-left">* ASSIGNMENT NAME</label>
                  <input type="text" name="assignmentName" value={form.assignmentName} onChange={handleFormChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 text-sm text-left">* DESCRIPTION</label>
                  <textarea name="description" rows="6" value={form.description} onChange={handleFormChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>

                {/* Task Type */}
                <div>
                    <label className="block text-[#0B102D] font-semibold mb-1 text-sm text-left">* TASK TYPE</label>
                    <select name="taskType" value={form.taskType} onChange={handleFormChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm">
                        <option value="Essay">Essay</option>
                    </select>
                </div>

                {/* Start Date */}
                <div>
                        <label className="block text-[#0B102D] font-semibold mb-1 text-sm text-left">* START DATE</label>
                        <input type="datetime-local" name="startDate" value={form.startDate} onChange={handleFormChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-[#0B102D] font-semibold mb-1 text-sm text-left">* DURATION</label>
                    <input type="text" name="timeDuration" value={form.timeDuration} onChange={handleFormChange} placeholder="e.g. 2 Jam" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>

                {/* Deadline */}
                <div>
                    <label className="block text-[#0B102D] font-semibold mb-1 text-sm text-left">* DEADLINE</label>
                    <input type="datetime-local" name="deadline" value={form.deadline} onChange={handleFormChange} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                </div>

                {/* Attachment */}
                <div>
                   <label className="block text-[#0B102D] font-semibold mb-2 text-sm text-left">ATTACHMENT (Optional)</label>
                   <div className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 bg-gray-50">
                     <Upload className="w-10 h-10 text-[#30326A] mb-3" />
                     <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
                     <label htmlFor="fileUpload" className="cursor-pointer text-sm text-blue-600 underline">Browse File</label>
                   </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end mt-6">
                  <button type="button" onClick={handleNext} className="bg-[#30326A] text-white px-8 py-2 rounded-lg text-sm hover:bg-[#23245c]">
                    Next (Edit Questions) →
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* --- FORM STEP 2 (QUESTIONS) --- */}
        {showQuestions && (
          <>
            <div className="mb-8">
              <h2 className="text-[#0B102DB3] font-bold text-base mb-1 font-inter text-left">Edit Questions</h2>
               <p className="text-[#0B102DB3] font-semibold text-sm font-inter text-left">
                Update question contents and reference answers below.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
              {questions.map((q, index) => (
                <div key={index} className="border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center bg-gray-50 border-b px-4 py-2">
                    <span className="font-bold text-[#30326A] text-sm">Question {q.number}</span>
                    <button type="button" onClick={() => handleDeleteQuestion(index)} className="text-gray-500 hover:text-red-500 p-1">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Pertanyaan:</label>
                        <textarea value={q.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} rows="2" className="w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-green-700 mb-1">Kunci Jawaban:</label>
                        <textarea value={q.referenceAnswer} onChange={(e) => handleQuestionChange(index, "referenceAnswer", e.target.value)} rows="3" className="w-full border border-gray-300 rounded-md p-2 bg-green-50" />
                    </div>
                    <div className="w-32">
                        <label className="block text-sm font-semibold mb-1">Bobot:</label>
                        <input type="number" min="1" value={q.points} onChange={(e) => handleQuestionChange(index, "points", e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={handleAddQuestion} type="button" className="w-full border-2 border-dashed border-[#30326A] text-[#30326A] py-2 rounded-lg flex justify-center items-center gap-2">
                 + ADD QUESTION
              </button>

              <div className="flex justify-end pt-4">
                <button onClick={handleSaveAssignment} disabled={isSaving} className="bg-[#30326A] text-white px-8 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "SAVE CHANGES"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* --- TOMBOL BACK (FIXED) --- */}
        <div className="mt-10 w-full flex justify-start">
          <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-[#30326A] transition font-inter text-sm">
            <ArrowLeft className="w-5 h-5" />
            {showQuestions ? "Back to Details" : "Back to Course"}
          </button>
        </div>

      </div>
    </div>
  );
}