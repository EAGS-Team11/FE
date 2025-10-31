import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/course/CourseCard";
import { dummyCourses } from "../../data/course/dummyCourses";
import courseImg from "../../assets/course1.png";

const MyCourse = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-[#F6F7FB] min-h-screen font-inter">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 mt-1 ml-8">
        <h1 className="text-[32px] font-bold">Courses</h1>
        <div className="w-10 h-10 flex justify-center items-center rounded-[10px] mt-1">
          <img src={courseImg} alt="Book" className="w-30 h-30" />
        </div>
      </div>

      {/* Search + Course Grid */}
      <div className="bg-[#ECEDEF] rounded-[15px] p-8 flex flex-col items-center max-w-[1000px] mx-auto">
        {/* Search Bar */}
        <div className="mb-6 w-full max-w-[800px]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Course"
              className="w-full h-[40px] rounded-[10px] bg-white border border-black/50 pl-4 pr-10 text-black/50 placeholder-black/50 font-inter font-normal"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-black/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-center">
          {dummyCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="cursor-pointer"
            >
              <CourseCard
                id={course.id}
                title={course.title}
                category={course.category}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
