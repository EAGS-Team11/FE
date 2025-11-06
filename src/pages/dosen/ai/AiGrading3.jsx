import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function AiGrading3() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      {/* Container utama */}
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-left">
            Student Submission Details
          </h2>

          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700 text-left">
            <div>
              <p className="font-medium text-gray-500 mb-1">Assignment Name</p>
              <p className="mb-2">Essay Sistem Terdistribusi I</p>
            </div>
            <div>
              <p className="font-medium text-gray-500 mb-1">Student Name</p>
              <p className="mb-2">Anifa Dyah S.</p>
            </div>
            <div>
              <p className="font-medium text-gray-500 mb-1">Submitted Date</p>
              <p>1 November 2025 | 12.00 PM</p>
            </div>
            <div>
              <p className="font-medium text-gray-500 mb-1">Student ID</p>
              <p>112210001</p>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button className="px-3 py-1 text-xs font-semibold bg-[#E5EDFF] text-[#3B82F6] rounded-md border border-[#D0E1FF]">
              AI Graded
            </button>
          </div>
        </div>


        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-xl p-6 text-center shadow-md">
          <p className="text-sm font-medium text-gray-700 mb-1">
            AI Generated Score
          </p>
          <h1 className="text-5xl font-bold text-gray-800">85/100</h1>
          <p className="text-blue-800 font-medium mt-2">
            Excellent Performance
          </p>
        </div>


        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">
            Rubric Breakdown
          </h3>

          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-5 text-sm text-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">1. Content Quality & Depth</h4>
              <p className="text-blue-600 font-semibold">22/25</p>
            </div>
            <p className="text-justify">
              The essay demonstrates strong understanding of the workshop design
              concepts. The student effectively analyzes the key principles and
              provides relevant examples. However, some sections could benefit
              from <em>deeper critical analysis</em> and more diverse perspectives
              on the design challenges discussed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-5 text-sm text-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">2. Structure & Organization</h4>
              <p className="text-blue-600 font-semibold">20/25</p>
            </div>
            <p className="text-justify">
              The essay follows a logical structure with clear introduction and
              conclusion. Transitions between paragraphs are mostly smooth. The
              argument flow is coherent, though some sections could be better
              connected to strengthen the overall narrative.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-5 text-sm text-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">3. Critical Thinking & Analysis</h4>
              <p className="text-blue-600 font-semibold">20/25</p>
            </div>
            <p className="text-justify">
              Good demonstration of analytical skills with several insightful
              observations. The student shows ability to evaluate design
              decisions critically. To improve, consider incorporating more
              theoretical frameworks and comparing alternative approaches to
              workshop design.
            </p>
          </div>

          <div className="text-right">
            <button className="text-blue-600 text-sm font-medium hover:underline">
              See All →
            </button>
          </div>
        </div>


        <div className="flex justify-between items-center pt-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-[#3973B9] hover:bg-[#336aa8] text-white font-semibold px-5 py-2 rounded-md transition"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="flex gap-3">
            <button className="bg-white border border-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-100">
              View Submission
            </button>
            <button className="bg-[#3973B9] hover:bg-[#336aa8] text-white font-semibold px-4 py-2 rounded-md">
              Review & Approve
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
