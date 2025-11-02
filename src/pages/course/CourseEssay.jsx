import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyCourses } from "../../data/course/dummyCourses";
import { courseEssays } from "../../data/course/courseEssay";

export default function CourseEssayList() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = dummyCourses.find((c) => c.id === Number(courseId));
  const essays = courseEssays[courseId] || [];

  if (!course) {
    return <p className="text-center text-gray-500 mt-10">Course not found.</p>;
  }

  return (
    <div className="p-8 bg-[#F6F7FB] min-h-screen font-inter py-28">
      {/* Header */}
      <div className="flex flex-col items-start mb-8 ml-12">
        <h1 className="text-[28px] font-bold text-[#25335A] mb-2">
          {course.title}
        </h1>
        <p className="text-gray-600">{course.category}</p>
      </div>

      {/* Essay List */}
      <div className="bg-[#ECEDEF] rounded-[15px] p-8 max-w-[900px] mx-auto">
        {essays.length > 0 ? (
          <div className="flex flex-col gap-6">
            {essays.map((essay) => (
              <div
                key={essay.id}
                className="bg-white p-6 rounded-[15px] shadow-md hover:shadow-lg transition border border-gray-200"
              >
                <h3 className="text-[20px] font-semibold text-[#25335A] mb-2">
                  {essay.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{essay.desc}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <p>🗓 Deadline: {essay.deadline}</p>
                  <p>📘 {essay.questions} Questions</p>
                </div>
                <button
                  onClick={() => navigate(`/submit-essay/${courseId}/${essay.id}`)}
                  className="bg-[#3D73B4] text-white px-5 py-2 rounded-[8px] font-medium hover:bg-[#2f5f97] transition"
                >
                  Start Essay
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No essay available yet.</p>
        )}
      </div>
    </div>
  );
}
