/* src/pages/dosen/course/CheckAnswer.jsx */

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Save, User, FileText, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function CheckAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  // 1) Ambil data dari state (priority) atau params (fallback)
  const params = useParams();
  const state = location.state;

  const courseId = state?.assignment?.id_course || params.courseId;
  const assignmentId = state?.assignment?.id_assignment || params.assignmentId;
  const studentId = state?.studentId || params.studentId;
  const studentName = state?.studentName || "Mahasiswa";

  // UI state
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Data state
  const [data, setData] = useState([]);
  const [assignmentInfo, setAssignmentInfo] = useState(state?.assignment || {});

  // ✅ Trigger AI bulk hanya sekali per page load
  const aiTriggeredRef = useRef(false);

  // -----------------------------
  // Fetch Data (Assignment, Submissions, AI bulk, Grades)
  // -----------------------------
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      if (!assignmentId || !studentId) {
        alert("Data ID Assignment atau Mahasiswa hilang. Kembali ke halaman sebelumnya.");
        navigate(-1);
        return;
      }

      try {
        setLoading(true);

        // A) Ambil detail assignment + questions (kalau belum ada di state)
        let dataAssignment = assignmentInfo;
        if (!dataAssignment?.questions || dataAssignment.questions.length === 0) {
          const resAssignment = await fetch(`http://127.0.0.1:8000/assignment/${assignmentId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!resAssignment.ok) throw new Error("Gagal ambil soal");
          dataAssignment = await resAssignment.json();
          setAssignmentInfo(dataAssignment);
        }

        // B) Ambil jawaban mahasiswa (submissions)
        const resSubmission = await fetch(
          `http://127.0.0.1:8000/submission/assignment/${assignmentId}/student/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataSubmissions = resSubmission.ok ? await resSubmission.json() : [];

        // C) Trigger AI bulk grading sekali (untuk isi skor_ai + feedback_ai di DB)
        if (!aiTriggeredRef.current && dataSubmissions.length > 0) {
          aiTriggeredRef.current = true;
          try {
            const resAIBulk = await fetch(
              `http://127.0.0.1:8000/predict/grade/assignment/${assignmentId}/student/${studentId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ min_answer_len: 5 }),
              }
            );

            // Kalau AI error, jangan hentikan halaman
            if (!resAIBulk.ok) {
              const txt = await resAIBulk.text();
              console.warn("AI bulk grading failed:", resAIBulk.status, txt);
            }
          } catch (e) {
            console.warn("AI bulk grading error:", e);
          }
        }

        // D) Ambil grading (AI + dosen)
        const resGrades = await fetch(
          `http://127.0.0.1:8000/grading/assignment/${assignmentId}/student/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataGrades = resGrades.ok ? await resGrades.json() : [];

        // E) Merge: question + submission + grading
        if (dataAssignment?.questions) {
          const merged = dataAssignment.questions.map((q) => {
            const studentAns = dataSubmissions.find((s) => s.id_question === q.id_question);

            const existingGrade = studentAns
              ? dataGrades.find((g) => g.id_submission === studentAns.id_submission)
              : null;

            // AI values (might be Decimal/string -> Number)
            const aiScore =
              existingGrade?.skor_ai != null && existingGrade?.skor_ai !== ""
                ? Number(existingGrade.skor_ai)
                : null;
            const aiFeedback = existingGrade?.feedback_ai ?? "";

            // Dosen values (might be Decimal/string -> Number)
            const dosenScore =
              existingGrade?.skor_dosen != null && existingGrade?.skor_dosen !== ""
                ? Number(existingGrade.skor_dosen)
                : null;
            const dosenFeedback = existingGrade?.feedback_dosen ?? "";

            // ✅ Autofill:
            // - jika dosen sudah pernah isi => pakai dosen
            // - jika belum => pakai AI
            // - jika AI belum ada => 0 / ""
            const defaultScore = dosenScore != null ? dosenScore : (aiScore != null ? aiScore : 0);
            const defaultFeedback = dosenFeedback ? dosenFeedback : (aiFeedback || "");

            return {
              id_question: q.id_question,
              nomor_soal: q.nomor_soal,
              teks_soal: q.teks_soal,
              kunci_jawaban: q.kunci_jawaban,
              bobot_maks: q.bobot,

              // submission data
              id_submission: studentAns ? studentAns.id_submission : null,
              jawaban_mahasiswa: studentAns ? studentAns.jawaban : "(Belum dijawab)",

              // AI preview (read-only)
              ai_score: aiScore,
              ai_feedback: aiFeedback,

              // dosen inputs (editable)
              input_nilai: defaultScore,
              input_feedback: defaultFeedback,
            };
          });

          setData(merged);
        }
      } catch (err) {
        console.error("Error fetching check answer data:", err);
        alert("Gagal memuat data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId, studentId, token, navigate]);

  // -----------------------------
  // Handlers: input dosen
  // -----------------------------
  const handleScoreChange = (index, val) => {
    const newData = [...data];
    let score = parseFloat(val) || 0;

    if (score > newData[index].bobot_maks) score = newData[index].bobot_maks;
    if (score < 0) score = 0;

    newData[index].input_nilai = score;
    setData(newData);
  };

  const handleFeedbackChange = (index, val) => {
    const newData = [...data];
    newData[index].input_feedback = val;
    setData(newData);
  };

  const handleResetToAI = (index) => {
    const newData = [...data];
    newData[index].input_nilai = newData[index].ai_score ?? 0;
    newData[index].input_feedback = newData[index].ai_feedback || "";
    setData(newData);
  };

  // -----------------------------
  // Save all dosen grades
  // -----------------------------
  const handleSaveAll = async () => {
    setIsSaving(true);

    const payload = data
      .filter((item) => item.id_submission !== null)
      .map((item) => ({
        id_submission: item.id_submission,
        nilai: parseFloat(item.input_nilai) || 0,
        feedback: item.input_feedback || "",
      }));

    if (payload.length === 0) {
      alert("Tidak ada jawaban valid untuk dinilai.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/grading/grade_submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Gagal menyimpan ke database");

      alert("Berhasil menyimpan nilai!");

      // balik ke give grade/submissions list
      navigate(`/dosen/course/${courseId}/essay/${assignmentId}`, {
        state: {
          assignment: assignmentInfo,
          courseId: courseId,
        },
      });
    } catch (err) {
      console.error("Save Error:", err);
      alert("Gagal menyimpan nilai: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  if (loading)
    return (
      <div className="flex h-screen justify-center items-center gap-2 text-gray-500">
        <Loader2 className="animate-spin" /> Memuat Jawaban...
      </div>
    );

  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-8 flex justify-center -mt-20 pt-24">
      <div className="w-full max-w-5xl scale-[0.95] origin-top">
        {/* Header Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#30326A] transition font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Submissions
          </button>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <User className="w-5 h-5 text-[#30326A]" />
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-400">Mahasiswa</span>
              <span className="text-sm font-bold text-[#30326A]">{studentName}</span>
            </div>
          </div>
        </div>

        {/* Info Assignment */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border-l-4 border-[#30326A]">
          <h1 className="text-2xl font-bold text-[#30326A] mb-1">
            {assignmentInfo.judul || "Assignment"}
          </h1>
          <p className="text-gray-500 text-sm">{assignmentInfo.deskripsi || "Tidak ada deskripsi"}</p>
        </div>

        {/* LIST SOAL & JAWABAN */}
        <div className="space-y-6">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Header Soal */}
              <div className="bg-[#F6F7FB] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <span className="font-bold text-[#30326A]">Soal No. {item.nomor_soal}</span>
                <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Bobot Max: {item.bobot_maks}
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Kiri: Soal & Kunci & Jawaban Mahasiswa */}
                <div className="space-y-4 border-r border-gray-100 pr-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Pertanyaan
                    </p>
                    <p className="text-gray-800 font-medium">{item.teks_soal}</p>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Kunci Jawaban
                    </p>
                    <p className="text-green-800 text-sm italic whitespace-pre-wrap">
                      {item.kunci_jawaban}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-2">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Jawaban Mahasiswa
                    </p>
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {item.jawaban_mahasiswa}
                    </p>
                  </div>

                  {/* ✅ AI Preview (Read-only) di bawah jawaban mahasiswa */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                      Penilaian AI (Preview)
                    </p>

                    <p className="text-sm font-bold text-[#30326A]">
                      Skor AI: {item.ai_score ?? "-"} / {item.bobot_maks}
                    </p>

                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                      {item.ai_feedback || "Belum ada feedback AI."}
                    </p>
                  </div>
                </div>

                {/* Kanan: Form Penilaian Dosen */}
                <div className="flex flex-col justify-center bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-[#30326A]">Berikan Nilai</label>

                    {/* Optional: reset ke AI */}
                    <button
                      type="button"
                      onClick={() => handleResetToAI(index)}
                      className="text-xs px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-100"
                      title="Isi ulang nilai & feedback dari AI"
                    >
                      Reset ke AI
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="number"
                      min="0"
                      max={item.bobot_maks}
                      value={item.input_nilai}
                      onChange={(e) => handleScoreChange(index, e.target.value)}
                      className="w-24 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg p-2 focus:border-[#30326A] focus:outline-none text-[#30326A]"
                      disabled={item.id_submission === null}
                    />
                    <span className="text-gray-400 font-medium text-lg">/ {item.bobot_maks}</span>
                  </div>

                  <label className="text-sm font-bold text-[#30326A] mb-2">Feedback Dosen</label>
                  <textarea
                    rows="4"
                    value={item.input_feedback || ""}
                    onChange={(e) => handleFeedbackChange(index, e.target.value)}
                    placeholder="Tulis masukan untuk mahasiswa..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                    disabled={item.id_submission === null}
                  />

                  {item.id_submission === null && (
                    <p className="text-xs text-gray-400 mt-3 italic">
                      Mahasiswa belum mengisi jawaban untuk soal ini.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Save Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#30326A] text-white px-8 py-4 rounded-full shadow-2xl hover:bg-[#23245c] transition transform hover:scale-105 font-bold text-lg disabled:opacity-50"
          >
            <Save className="w-6 h-6" />
            {isSaving ? "Menyimpan..." : "Simpan Semua Nilai"}
          </button>
        </div>

        <div className="mb-20"></div>
      </div>
    </div>
  );
}
