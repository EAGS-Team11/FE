import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import createEssayImg from "../../../assets/createessay.png";

export default function AddQuestion() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [questions, setQuestions] = useState([
    { number: 1, question: "", points: "" },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { number: questions.length + 1, question: "", points: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleDelete = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    const renumbered = updated.map((q, i) => ({ ...q, number: i + 1 }));
    setQuestions(renumbered);
  };

  const handleSave = () => {
    console.log("Saved Questions:", questions);
  };

  const handleBack = () => {
    navigate(`/dosen/course/${courseId}/create-essay`);
  };

  return (
    <div className="w-full bg-[#F9FAFB] min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center mb-6 ml-[-70px]">
          <img src={createEssayImg} alt="Create Essay" className="w-8 h-8 mr-3" />
          <h1 className="text-[#30326A] font-bold text-xl font-inter text-left">
            Create Assignments / Essay
          </h1>
        </div>

        {/* Title section */}
        <div className="mb-8 ml-[-20px]">
          <h2 className="text-[#0B102DB3] font-bold text-base mb-1 font-inter text-left">
            Add Question
          </h2>
          <p className="text-[#0B102DB3] font-semibold text-sm font-inter text-left">
            Please add question contents below.
          </p>
        </div>

        {/* White box for questions */}
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="border border-gray-300 rounded-lg">
              {/* Header row with delete icon */}
              <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2">
                <span className="text-[#0B102D] font-semibold font-inter text-sm">
                  Question {q.number}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Table-like content */}
              <div className="p-4 text-sm text-[#0B102D] font-inter">
                <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                  <span className="font-semibold col-span-1">Question Number:</span>
                  <input
                    type="text"
                    value={q.number}
                    readOnly
                    className="col-span-2 border border-gray-300 rounded-md p-1 text-sm bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-3 border-b border-gray-200 py-2">
                  <span className="font-semibold col-span-1">The Question:</span>
                  <textarea
                    value={q.question}
                    onChange={(e) => handleChange(index, "question", e.target.value)}
                    rows="2"
                    placeholder="Tuliskan pertanyaan di sini..."
                    className="col-span-2 border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  />
                </div>

                <div className="grid grid-cols-3 py-2">
                  <span className="font-semibold col-span-1">Points:</span>
                  <input
                    type="number"
                    value={q.points}
                    onChange={(e) => handleChange(index, "points", e.target.value)}
                    placeholder="Masukkan poin"
                    className="col-span-2 border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <button
            onClick={handleAddQuestion}
            type="button"
            className="w-full border border-gray-300 text-[#30326A] font-semibold font-inter text-sm rounded-lg py-2 hover:bg-gray-100"
          >
            + ADD QUESTION
          </button>

          {/* Save Assignment Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSave}
              className="bg-[#30326A] text-white px-8 py-2 rounded-lg font-inter text-sm hover:bg-[#23245c]"
            >
              Save Assignment
            </button>
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
