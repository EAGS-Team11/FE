import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { essays } from "../../../data/dosen/course/essayData";
import { courses } from "../../../data/dosen/course/courseData"; 
import EssayCard from "../../../components/dosen/course/EssayCard";

export default function CourseDetail() {
  const { courseId } = useParams(); 
  const navigate = useNavigate();

  const handleCreateAssignment = () => {navigate(`/dosen/course/${courseId}/create-essay`);};
  const handleGiveGrade = () => console.log("Give a grade clicked");
  const handleEssayClick = (essayId) => console.log("Essay clicked:", essayId);
  const handleBack = () => navigate("/dosen/course"); 

  // Cari course berdasarkan courseId
  const course = courses.find(c => c.id === Number(courseId));

  // Filter essay berdasarkan courseId
  const courseEssays = essays.filter(essay => essay.courseId === Number(courseId));

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">{course?.title || "Course Detail"}</h2>

      {/* Buttons */}
      <div className="bg-gray-100 rounded-xl p-4 mb-8 flex flex-col space-y-3 max-w-md">
        <button
          className="flex items-center justify-start gap-2 text-blue-700 text-sm font-medium px-3 py-2 border rounded hover:bg-gray-200 transition"
          onClick={handleCreateAssignment}
        >
          📄 Create Assignments / Essay
        </button>
        <button
          className="flex items-center justify-start gap-2 text-blue-700 text-sm font-medium px-3 py-2 border rounded hover:bg-gray-200 transition"
          onClick={handleGiveGrade}
        >
          🗂 Give a grade
        </button>
      </div>

      {/* Essay Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {courseEssays.map((essay) => (
          <EssayCard
            key={essay.id}
            essay={essay}
            onClick={() => handleEssayClick(essay.id)}
          />
        ))}
      </div>

      {/* Back Button */}
      <div>
        <button
          className="flex items-center gap-2 text-sm text-blue-700 font-medium px-3 py-2 border rounded hover:bg-gray-200 transition"
          onClick={handleBack}
        >
          ← Back to Courses
        </button>
      </div>
    </div>
  );
}
