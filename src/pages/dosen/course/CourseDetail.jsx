import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { essays } from "../../../data/dosen/course/essayData";
import { courses } from "../../../data/dosen/course/courseData";
import EssayCard from "../../../components/dosen/course/EssayCard";
import {
  FileText,
  Download,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleCreateAssignment = () =>
    navigate(`/dosen/course/${courseId}/create-essay`);
  const handleGiveGrade = () => console.log("Give a grade clicked");
  const handleEssayClick = (essayId) => console.log("Essay clicked:", essayId);
  const handleBack = () => navigate("/dosen/course");

  const course = courses.find((c) => c.id === Number(courseId));
  const courseEssays = essays.filter(
    (essay) => essay.courseId === Number(courseId)
  );

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col px-10 py-8">
      {/* Title */}
      <h2 className="text-2xl font-bold text-[#2c2f77] mb-6">
        {course?.title || "Course Detail"}
      </h2>

      <div className="flex flex-col space-y-4 max-w-xl">
        <button
          onClick={handleCreateAssignment}
          className="flex items-center gap-3 border border-gray-300 bg-white rounded-lg px-6 py-4 text-blue-600 font-semibold hover:bg-blue-50 transition"
        >
          <FileText className="w-6 h-6" />
          <span>Create Assignments / Essay</span>
        </button>
        <button
          onClick={handleGiveGrade}
          className="flex items-center gap-3 border border-gray-300 bg-white rounded-lg px-6 py-4 text-blue-600 font-semibold hover:bg-blue-50 transition"
        >
          <Download className="w-6 h-6" />
          <span>Give a grade</span>
        </button>
      </div>

      <div className="border-t border-gray-300 my-8 w-full" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-10">
        {courseEssays.map((essay) => (
          <EssayCard
            key={essay.id}
            essay={essay}
            onClick={() => handleEssayClick(essay.id)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-[#2c59c0] text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-[#204aa8] transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="flex gap-2">
          <button className="border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
