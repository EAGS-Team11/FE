import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { listSubmission } from "../../../data/dosen/ai/listSubmission";

const CheckAnswer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ================= AMBIL DATA DARI AiGrading3 =================
  const locationState = location.state;

// ambil student dari state ATAU fallback dari data
  const student =
    locationState?.student ??
    listSubmission.find(
      (s) => s.student_id === locationState?.student?.student_id
    );

  const assignment = locationState?.assignment;

  const [expandedText, setExpandedText] = useState({});
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [tempFeedback, setTempFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState({});
  const [finalScore, setFinalScore] = useState("");

  // ================= DUMMY QUESTIONS (4 SOAL) =================
  const questions = [
    {
      id: 1,
      title: "Question 1",
      question:
        "Jelaskan konsep komunikasi antar node dalam sistem terdistribusi dan bagaimana mekanisme ini mendukung koordinasi antar proses.",
      answer:
        "Komunikasi antar node dilakukan melalui message passing menggunakan protokol jaringan seperti TCP/IP atau middleware seperti gRPC. Mekanisme ini memungkinkan sinkronisasi data dan koordinasi tugas.",
      ai_feedback:
        "Jawaban sudah cukup baik, namun akan lebih kuat jika disertai contoh implementasi nyata.",
    },
    {
      id: 2,
      title: "Question 2",
      question:
        "Sebutkan dan jelaskan konsep komunikasi yang umum digunakan dalam sistem terdistribusi.",
      answer:
        "Konsep komunikasi meliputi RPC, message queue, publish-subscribe, dan data streaming. Masing-masing memiliki kelebihan tergantung kebutuhan sistem.",
      ai_feedback:
        "Jawaban cukup lengkap, namun penjelasan tiap konsep masih bisa diperdalam.",
    },
    {
      id: 3,
      title: "Question 3",
      question:
        "Apa perbedaan komunikasi sinkron dan asinkron dalam sistem terdistribusi?",
      answer:
        "Komunikasi sinkron mengharuskan pengirim menunggu respons, sedangkan asinkron memungkinkan proses berlanjut tanpa menunggu balasan.",
      ai_feedback:
        "Jawaban sudah tepat dan ringkas, dapat ditambahkan contoh penggunaan.",
    },
    {
      id: 4,
      title: "Question 4",
      question:
        "Mengapa fault tolerance penting dalam sistem terdistribusi?",
      answer:
        "Karena sistem terdiri dari banyak node yang berpotensi gagal, fault tolerance memastikan sistem tetap berjalan meskipun terjadi kegagalan sebagian.",
      ai_feedback:
        "Jawaban sudah sesuai dan menjelaskan konsep dasar dengan baik.",
    },
  ];

  // ================= UTIL =================
  const toggleText = (key) => {
    setExpandedText((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const truncate = (text, key, limit = 150) => {
    if (!text) return "-";
    if (text.length <= limit) return text;

    return (
      <>
        {expandedText[key] ? text : text.slice(0, limit) + "..."}
        <span
          onClick={() => toggleText(key)}
          className="text-[#5D6F81] italic ml-1 cursor-pointer hover:underline"
        >
          {expandedText[key] ? "Show less" : "See all"}
        </span>
      </>
    );
  };

  const openFeedbackModal = (q) => {
    setActiveFeedback(q.id);
    setTempFeedback(feedbacks[q.id] ?? q.ai_feedback);
  };

  const saveFeedback = () => {
    setFeedbacks((prev) => ({
      ...prev,
      [activeFeedback]: tempFeedback,
    }));
    setActiveFeedback(null);
  };

  const isTouched =
    Object.keys(feedbacks).length > 0 || finalScore !== "";

  const handleSaveApprove = () => {
    const payload = {
      assignment_id: assignment?.id_assignment,
      student_id: student?.student_id,
      final_score_dosen: finalScore,
      feedback_per_soal: feedbacks,
      status: "Completed",
    };

    console.log("FINAL PAYLOAD:", payload);
    navigate("/dosen/AiGrading1");
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] relative font-sans">
      <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-r from-[#A7C7E7] to-[#5D6F81] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 pt-8">

        {/* ================= HEADER ================= */}
        <div className="text-left text-black">
          <h2 className="text-base font-semibold">
            {assignment?.name || "-"}
          </h2>

          <div className="w-1/2 h-[1.5px] bg-black mt-1 mb-2 rounded-full"></div>

          <h1 className="text-xl font-bold leading-snug">
            UTS Sistem Paralel dan Terdistribusi
          </h1>

          {/* 🔥 INI YANG KAMU MAU */}
          <p className="mt-1 text-xs font-medium">
            {student?.name || "-"} - {student?.student_id || "-"}
          </p>
        </div>

        {/* ================= QUESTIONS ================= */}
        <div className="mt-8 flex flex-col gap-5">
          {questions.map((q) => (
            <div
              key={q.id}
              className="border border-gray-300 p-5 bg-transparent"
            >
              <h3 className="font-semibold text-sm text-gray-700">
                {q.title}
              </h3>

              <p className="mt-2 font-bold text-sm text-gray-900">
                {truncate(q.question, `q-${q.id}`)}
              </p>

              <div className="w-1/2 h-[1px] bg-gray-400 mt-2 mb-2"></div>

              <p className="text-sm text-gray-700">
                {truncate(q.answer, `a-${q.id}`)}
              </p>

              {/* ===== AI FEEDBACK ===== */}
              <div className="mt-4 border border-[#5D6F81] bg-[#F4F7FA] p-4">
                <div className="flex justify-between mb-2">
                  <p className="text-xs font-semibold text-[#4b5e6f]">
                    AI Feedback
                  </p>
                  <button
                    onClick={() => openFeedbackModal(q)}
                    className="text-xs italic text-[#5D6F81] hover:underline"
                  >
                    Edit Feedback
                  </button>
                </div>

                <p className="text-xs italic text-gray-700">
                  {truncate(
                    feedbacks[q.id] ?? q.ai_feedback,
                    `f-${q.id}`,
                    120
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= FINAL SCORE ================= */}
        <div className="mt-8 border border-gray-300 p-5 w-fit">
          <p className="text-sm font-semibold mb-2">
            Final Score (Dosen)
          </p>
          <input
            type="number"
            value={finalScore}
            onChange={(e) => setFinalScore(e.target.value)}
            className="w-32 border border-gray-300 px-3 py-1.5 text-sm"
          />
        </div>

        {/* ================= FOOTER ================= */}
        <div className="mt-8 mb-10 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#2c59c0] text-white text-sm px-4 py-2"
          >
            ← Back
          </button>

          <button
            disabled={!isTouched}
            onClick={handleSaveApprove}
            className={`text-white text-sm px-5 py-2 transition
              ${
                isTouched
                  ? "bg-[#2E7D32] hover:bg-[#256528]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Save Review & Approve
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {activeFeedback && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" />
          <div className="fixed top-1/2 left-1/2 z-50 w-[420px] -translate-x-1/2 -translate-y-1/2 bg-white p-6">
            <h3 className="font-semibold mb-3">Edit AI Feedback</h3>
            <textarea
              rows="4"
              value={tempFeedback}
              onChange={(e) => setTempFeedback(e.target.value)}
              className="w-full border p-2 text-sm"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setActiveFeedback(null)}
                className="text-sm text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveFeedback}
                className="bg-[#5D6F81] text-white px-4 py-1.5 text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckAnswer;
