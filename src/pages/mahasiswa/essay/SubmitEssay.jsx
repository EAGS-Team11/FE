/* src/pages/mahasiswa/essay/SubmitEssay.jsx */

import React from "react";
import { useNavigate } from "react-router-dom";
import SubmitEssayTable from "../../../components/mahasiswa/essay/SubmitEssayTable";
import { dummyCourses } from "../../../data/mahasiswa/course/dummyCourses";
import { courseEssays } from "../../../data/mahasiswa/course/courseEssay";
import myessays3 from "../../../assets/myessays3.png";
import { ArrowLeft } from "lucide-react";

export default function SubmitEssay() {
  const navigate = useNavigate();

  // 🔗 Ambil hanya essay yang belum dikerjakan
  const courses = dummyCourses.flatMap((course) => {
    const essays = courseEssays[course.id];
    if (!essays) return [];

    return essays.map((essay) => ({
      courseTitle: course.title, // Judul course
      essayTitle: essay.title, // Title essay
      deadline: essay.deadline,
      status: "Belum Dikirim",
      onAction: () => navigate(`/submit-essay/${course.id}/${essay.id}`),
    }));
  });

  return (
    <div className="relative w-full min-h-screen bg-[#F5F8FB] font-[Inter] overflow-hidden px-12 py-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[28px] font-bold text-black flex items-center gap-2">
          <img src={myessays3} alt="icon" className="w-20 h-20" />
          Submit New Essay
        </h1>
      </div>

      {/* Table */}
      <div className="-mt-6">
        <SubmitEssayTable courses={courses} />
      </div>

      {/* Back Button */}
      <div className="mt-6 flex justify-start">
        <button
          className="bg-[#3D73B4] text-white font-bold px-8 py-2 rounded-[7px] hover:bg-[#2f5f97] flex items-center gap-2 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          Back
        </button>
      </div>
    </div>
  );
}
