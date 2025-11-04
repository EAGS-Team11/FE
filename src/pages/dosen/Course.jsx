import React from "react";
import { Search, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Course() {
  const courses = [
    { id: 1, title: "Capstone Project - A2526", category: "Informatics" },
    { id: 2, title: "Capstone Project - A2526", category: "Informatics" },
    { id: 3, title: "Capstone Project - A2526", category: "Informatics" },
    { id: 4, title: "Capstone Project - A2526", category: "Informatics" },
    { id: 5, title: "Capstone Project - A2526", category: "Informatics" },
    { id: 6, title: "Capstone Project - A2526", category: "Informatics" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-10">

      <main className="flex-grow px-10 ">
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search Course"
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <button className="bg-[#1E4F91] text-white px-5 py-2 rounded-md hover:bg-[#163E74] transition">
            Create new course
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden"
            >
              <div className="relative bg-gradient-to-r from-[#7A8CA3] to-[#B7C5D9] h-28">
                <span className="absolute top-2 left-2 bg-[#3D2CA1] text-white text-xs px-2 py-1 rounded-md">
                  {course.category}
                </span>
                <button className="absolute top-2 right-2 flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md hover:bg-gray-200">
                  <Edit2 size={12} />
                  Edit
                </button>
              </div>
              <div className="p-3 flex justify-between items-center">
                <p className="text-sm font-medium">{course.title}</p>
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
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
      </main>

      
    </div>
  );
}
