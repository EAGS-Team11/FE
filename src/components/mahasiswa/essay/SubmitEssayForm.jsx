import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitEssayForm({ question }) {
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Buat objek essay baru
    const newEssay = {
      title: `Essay : ${question.questionTitle}`,
      status: "In Review",
      score: "-",
      feedbackAI: "-",
      feedbackLecturer: "-",
      date: new Date().toLocaleDateString("en-GB"),
      action: "View",
    };

    // Ambil essay lama, lalu tambah essay baru di depan
    const existingEssays = JSON.parse(localStorage.getItem("submittedEssays")) || [];
    const updatedEssays = [newEssay, ...existingEssays];

    // Simpan ke localStorage
    localStorage.setItem("submittedEssays", JSON.stringify(updatedEssays));

    alert("✅ Essay berhasil dikirim! Cek di halaman My Essays.");
    navigate("/my-essays");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{question.questionTitle}</h2>
      <p className="text-sm text-gray-600 mb-6">{question.questionDesc}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Ketik jawabanmu di sini..."
        className="w-full h-40 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      <button
        type="submit"
        className="mt-4 bg-[#3D73B4] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#2f5f97] transition"
      >
        Submit Essay
      </button>
    </form>
  );
}
