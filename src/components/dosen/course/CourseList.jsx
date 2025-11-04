import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";
import { courses } from "../../../data/dosen/course/courseData";

export default function CourseList() {
  return (
    <div className="flex flex-col">
      {/* Search + Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Course"
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button className="bg-[#1E4F91] text-white px-5 py-2 rounded-md hover:bg-[#163E74] transition">
          Create new course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-8 space-x-3">
        <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
          <ChevronLeft size={16} />
        </button>
        <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
