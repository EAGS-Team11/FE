/* src/pages/dosen/course/CourseDetail.jsx */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { essays } from "../../../data/dosen/course/essayData";
import { courses } from "../../../data/dosen/course/courseData";
import EssayCard from "../../../components/dosen/course/EssayCard";
import { FileText, Download, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === Number(courseId));

  const courseEssays = essays
    .filter((essay) => essay.courseId === Number(courseId))
    .map((essay) => ({
      ...essay,
      createdAt: essay.createdAt || new Date().toLocaleDateString("en-GB"),
      totalSubmitted: essay.totalSubmitted ?? Math.floor(Math.random() * 15),
    }));

  const handleCreateAssignment = () =>
    navigate(`/dosen/course/${courseId}/create-essay`, { state: { course } });

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex flex-col px-8 py-6">
      {/* Judul */}
      <h2 className="text-xl font-bold text-[#2c2f77] mb-6 text-center sm:text-left">
        {course?.title || "Course Detail"}
      </h2>

      {/* Tombol aksi */}
      <div className="flex flex-col gap-3 w-full max-w-md mx-auto sm:mx-0 mb-6">
        <button
          onClick={handleCreateAssignment}
          className="flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-5 py-2.5 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition"
        >
          <FileText className="w-4 h-4" />
          <span>Create Assignments / Essay</span>
        </button>

        <button
          onClick={() => 
            navigate("/dosen/give-grade", {
              state: { courseId: course.id, assignment: null }
            })
          }
          className="flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-5 py-2.5 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition"
        >
          <Download className="w-4 h-4" />
          <span>Give a grade</span>
        </button>
      </div>

      {/* Garis pemisah */}
      <div className="border-t border-gray-400 my-6 mt-2 mb-8 w-full max-w-6xl mx-auto" />

      {/* Daftar Essay */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-6xl mx-auto">
        {courseEssays.map((essay) => (
          <EssayCard key={essay.id} essay={essay} />
        ))}
      </div>

      {/* Navigasi bawah */}
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto mt-6">
        <button
          onClick={() => navigate("/dosen/course")}
          className="flex items-center gap-2 bg-[#2c59c0] text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-[#204aa8] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Pagination */}
        <div className="flex gap-2 ml-auto">
          <button className="border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
