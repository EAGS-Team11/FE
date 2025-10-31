import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseEssays } from "../../data/course/courseEssay";

export default function InputEssay() {
  const { courseId, essayId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const selectedEssay =
    courseEssays[courseId]?.find((e) => e.id === parseInt(essayId)) || {};

  const essayQuestions = [
    {
      id: 1,
      questionTitle: "Describe your understanding of this topic.",
      questionDesc: "Explain what you know about this essay subject in detail.",
    },
    {
      id: 2,
      questionTitle: "Explain the process involved.",
      questionDesc:
        "Discuss the main stages and challenges in implementing this concept.",
    },
    {
      id: 3,
      questionTitle: "Give a practical example.",
      questionDesc: "Provide one real-life example that relates to the topic.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(essayQuestions.map(() => ""));
  const [checked, setChecked] = useState(essayQuestions.map(() => false));

  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  const handleInput = () => {
    const updated = [...answers];
    updated[currentIndex] = editorRef.current.innerHTML;
    setAnswers(updated);
  };

  const handleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const handleNavigation = (direction) => {
    handleInput();
    if (direction === "next" && currentIndex < essayQuestions.length - 1)
      setCurrentIndex(currentIndex + 1);
    if (direction === "prev" && currentIndex > 0)
      setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const incomplete = checked.some((c, i) => !c || answers[i].trim() === "");
    if (incomplete) {
      alert("⚠️ Some answers are incomplete. Please review them before submitting.");
      return;
    }

    // 🔹 Simpan ke localStorage agar muncul di My Essays
    const newEssay = {
      title: selectedEssay.title || "Untitled Essay",
      status: "In Review",
      score: "-",
      feedbackAI: "-",
      feedbackLecturer: "-",
      date: new Date().toLocaleDateString("en-GB"),
      action: "View",
    };

    const storedEssays = JSON.parse(localStorage.getItem("submittedEssays")) || [];
    const updatedEssays = [...storedEssays, newEssay];
    localStorage.setItem("submittedEssays", JSON.stringify(updatedEssays));

    alert(`✅ Essay "${selectedEssay.title}" berhasil dikirim!`);
    navigate("/myessays");
  };

  return (
    <div className="min-h-screen bg-[#F5F8FB] flex font-[Inter]">
      {/* Sidebar */}
      <div className="w-[120px] bg-white border-r border-gray-200 shadow-md flex flex-col items-center py-8">
        <h2 className="text-[#3D73B4] font-bold text-lg mb-6">Soal</h2>
        <div className="flex flex-col gap-4">
          {essayQuestions.map((q, index) => {
            const answerFilled = answers[index].trim() !== "";
            const isChecked = checked[index];
            const color = isChecked
              ? "bg-green-500 text-white"
              : answerFilled
              ? "bg-yellow-400 text-white"
              : "bg-gray-200 text-gray-700";

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${color} ${
                  currentIndex === index ? "ring-4 ring-[#3D73B4]" : ""
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-10 py-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h1 className="text-[26px] font-bold text-gray-800 mb-2">
            {selectedEssay.title || "Essay Title"}
          </h1>
          <p className="text-gray-600 mb-6">
            {selectedEssay.desc || "Essay description not found."}
          </p>

          {/* Toolbar */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => applyFormat("bold")}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
            >
              B
            </button>
            <button
              onClick={() => applyFormat("italic")}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 italic"
            >
              I
            </button>
            <button
              onClick={() => applyFormat("underline")}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 underline"
            >
              U
            </button>
          </div>

          {/* Editable Text Area */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: answers[currentIndex] }}
            className="min-h-[200px] border border-gray-300 rounded-md p-4 focus:outline-[#3D73B4] bg-white"
          ></div>

          {/* Checkbox */}
          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={checked[currentIndex]}
              onChange={() => handleCheck(currentIndex)}
              className="w-5 h-5 text-[#3D73B4]"
            />
            <label className="text-gray-700">
              I have reviewed and finalized this answer.
            </label>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {currentIndex > 0 && (
              <button
                onClick={() => handleNavigation("prev")}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                ← Back
              </button>
            )}

            {currentIndex < essayQuestions.length - 1 ? (
              <button
                onClick={() => handleNavigation("next")}
                className="bg-[#3D73B4] text-white px-5 py-2 rounded-lg hover:bg-[#2f5f97] transition ml-auto"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition ml-auto"
              >
                Submit Essay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
