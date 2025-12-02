/* src/pages/dosen/course/EditEssay.jsx */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Upload, Trash2 } from "lucide-react";
import createEssayImg from "../../../assets/createessay.png";
import { essays } from "../../../data/dosen/course/essayData";

export default function EditEssay() {
  const navigate = useNavigate();
  const { courseId, essayId } = useParams();
  const location = useLocation();

  // Ambil essay yang sedang diedit dari state atau dari data essays
  const existingEssay =
    location.state?.essay ||
    essays.find(
      (essay) => essay.id === parseInt(essayId) && essay.courseId === parseInt(courseId)
    );

  const [showQuestions, setShowQuestions] = useState(false);

  const [form, setForm] = useState({
    assignmentName: "",
    description: "",
    taskType: "Essay",
    startDate: "",
    timeDuration: "",
    deadline: "",
    attachment: null,
  });

  const [questions, setQuestions] = useState([]);

  // Prefill form dan pertanyaan dari data dummy
  useEffect(() => {
    if (existingEssay) {
      setForm({
        assignmentName: existingEssay.assignmentName || "",
        description: existingEssay.description || "",
        taskType: existingEssay.taskType || "Essay",
        startDate: existingEssay.startDate || "",
        timeDuration: existingEssay.timeDuration || "",
        deadline: existingEssay.deadline || "",
        attachment: existingEssay.attachment || null,
      });

      setQuestions(existingEssay.questions || []);
    }
  }, [existingEssay]);

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
      { number: questions.length + 1, question: "", points: "" },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleDeleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    const renumbered = updated.map((q, i) => ({ ...q, number: i + 1 }));
    setQuestions(renumbered);
  };

  const handleNext = () => {
    setShowQuestions(true);
  };

  const handleSaveAssignment = () => {
    const updatedEssay = { ...form, questions };
    console.log("Updated Essay:", updatedEssay);
    navigate(`/dosen/course/${courseId}/essay/${essayId}`);
  };

  const handleBack = () => {
    if (showQuestions) {
      setShowQuestions(false);
    } else {
      navigate(`/dosen/course/${courseId}/essay/${essayId}`);
    }
  };

  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-8 flex justify-center -mt-20">
      <div className="w-full max-w-3xl scale-[0.9]">
        {/* Header */}
        <div className="flex items-center mb-6 ml-[-70px]">
          <img src={createEssayImg} alt="Edit Essay" className="w-8 h-8 mr-3" />
          <h1 className="text-[#30326A] font-bold text-xl font-inter text-left">
            {showQuestions ? "Add Question" : "Edit Assignment / Essay"}
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
                  <input
                    type="text"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleFormChange}
                    placeholder="15 November 2025"
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
                    placeholder="13.00 – 17.00 WIB"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                    * DEADLINE
                  </label>
                  <input
                    type="text"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleFormChange}
                    placeholder="16 November 2025, 17.00 WIB"
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
                    Next
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* --- STEP 2: ADD QUESTION --- */}
        {showQuestions && (
          <>
            <div className="mb-8 ml-[-20px]">
              <h2 className="text-[#0B102DB3] font-bold text-base mb-1 font-inter text-left">
                Add Question
              </h2>
              <p className="text-[#0B102DB3] font-semibold text-sm font-inter text-left">
                Please add question contents below.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
              {questions.map((q, index) => (
                <div key={index} className="border border-gray-300 rounded-lg">
                  <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2">
                    <span className="font-semibold text-sm">Question {q.number}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4 text-sm">
                    {/* Question Number */}
                    <div className="grid grid-cols-3 border-b py-2">
                      <span className="font-semibold col-span-1">Question Number:</span>
                      <input
                        type="text"
                        value={q.number}
                        readOnly
                        className="col-span-2 border rounded-md p-1 bg-gray-50"
                      />
                    </div>

                    {/* Question Text */}
                    <div className="grid grid-cols-3 border-b py-2">
                      <span className="font-semibold col-span-1">The Question:</span>
                      <textarea
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(index, "question", e.target.value)
                        }
                        rows="2"
                        placeholder="Tuliskan pertanyaan di sini..."
                        className="col-span-2 border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                      />
                    </div>

                    {/* Points */}
                    <div className="grid grid-cols-3 border-b py-2">
                      <span className="font-semibold col-span-1">Points:</span>
                      <input
                        type="number"
                        value={q.points}
                        onChange={(e) =>
                          handleQuestionChange(index, "points", e.target.value)
                        }
                        placeholder="Masukkan poin"
                        className="col-span-2 border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                      />
                    </div>

                    {/* Answer Key */}
                    <div className="grid grid-cols-3 py-2">
                      <span className="font-semibold col-span-1">Answer Key:</span>
                      <input
                        type="text"
                        value={q.answerKey || ""}
                        onChange={(e) =>
                          handleQuestionChange(index, "answerKey", e.target.value)
                        }
                        placeholder="Masukkan jawaban kunci"
                        className="col-span-2 border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddQuestion}
                type="button"
                className="w-full border border-gray-300 text-[#30326A] font-semibold text-sm rounded-lg py-2 hover:bg-gray-100"
              >
                + ADD QUESTION
              </button>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSaveAssignment}
                  className="bg-[#30326A] text-white px-8 py-2 rounded-lg text-sm hover:bg-[#23245c]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}


        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={handleBack}
            className="bg-[#30326A] text-white px-6 py-2 rounded-lg font-inter text-sm hover:bg-[#23245c]"
            >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
