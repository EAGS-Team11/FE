/* src/pages/dosen/course/EssayDetail.jsx */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { essays } from "../../../data/dosen/course/essayData";
import createEssayImg from "../../../assets/createessay.png";

export default function EssayDetail() {
  const { courseId, essayId } = useParams();
  const navigate = useNavigate();

  // Ambil essay berdasarkan ID
  const essay = essays.find((e) => e.id === Number(essayId));

  const handleBack = () => navigate(`/dosen/course/${courseId}`);
  
  const handleEdit = () =>
    navigate(`/dosen/course/${courseId}/edit-essay/${essayId}`, {
    state: { essay },
  });

  if (!essay) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Essay not found 😢
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-8 flex justify-center -mt-20">
      <div className="w-full max-w-4xl scale-[0.9]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 ml-[-70px]">
          <div className="flex items-center">
            <img src={createEssayImg} alt="Essay Detail" className="w-8 h-8 mr-3" />
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
            <input
              type="text"
              value={essay.assignmentName}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
            />
          </div>

          <div>
            <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
              * DESCRIPTION
            </label>
            <textarea
              value={essay.description}
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
                value={essay.taskType}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
                * START DATE
              </label>
              <input
                type="text"
                value={essay.startDate}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
                * TIME DURATION
              </label>
              <input
                type="text"
                value={essay.timeDuration}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
                * DEADLINE
              </label>
              <input
                type="text"
                value={essay.deadline}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#0B102D] font-semibold text-sm mb-1 text-left">
              * TOTAL SUBMITTED
            </label>
            <input
              type="text"
              value={`${essay.totalSubmitted} Students`}
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
              value={essay.attachment ? essay.attachment : "No attachment"}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-100 text-sm italic"
            />
          </div>

          {/* Questions */}
          <div>
            <label className="block text-[#0B102D] font-semibold text-sm mb-3 text-left">
              QUESTIONS
            </label>
            {essay.questions && essay.questions.length > 0 ? (
              <div className="space-y-3">
                {essay.questions.map((q) => (
                  <div
                    key={q.number}
                    className="border border-gray-300 rounded-lg p-3 bg-gray-50"
                  >
                    <p className="text-sm font-semibold text-[#30326A]">
                      Question {q.number}
                    </p>
                    <p className="text-sm text-gray-700">{q.question}</p>
                    <p className="text-xs text-gray-500 mt-1">Points: {q.points}</p>
                    {/* Answer Key */}
                    {q.answerKey && (
                      <p className="text-xs text-green-600 mt-1">
                        Answer Key: {q.answerKey}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No questions added.</p>
            )}
          </div>
        </div>

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
