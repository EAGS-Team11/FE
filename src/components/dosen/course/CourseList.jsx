import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import CourseCard from "./CourseCard";
import { courses } from "../../../data/dosen/course/courseData";

export default function CourseList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }, []);

  return (
    <div className="flex flex-col">
      {/* Search + Button */}
      <div className="flex justify-between items-center mb-10">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Course"
            className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <Search className="absolute left-2.5 top-2 text-gray-400" size={16} />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1E4F91] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#163E74] transition"
        >
          Create new course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-6 space-x-2">
        <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
          <ChevronLeft size={14} />
        </button>
        <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-5 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-center text-lg font-semibold mb-5">
              Create new course
            </h2>

            <form className="space-y-3 text-sm">
              <div>
                <label className="block font-medium mb-1 text-left">Course Title</label>
                <input
                  type="text"
                  placeholder="Kalkulus"
                  className="w-full border border-gray-300 rounded-md p-1.5 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">Course Code</label>
                <input
                  type="text"
                  placeholder="MATH101"
                  className="w-full border border-gray-300 rounded-md p-1.5 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">Description</label>
                <input
                  type="text"
                  placeholder="Deskripsi singkat mata kuliah"
                  className="w-full border border-gray-300 rounded-md p-1.5 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">
                  Category / Department
                </label>
                <input
                  type="text"
                  placeholder="Informatics Engineering"
                  className="w-full border border-gray-300 rounded-md p-1.5 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">Credit (SKS)</label>
                <input
                  type="number"
                  placeholder="3"
                  className="w-full border border-gray-300 rounded-md p-1.5 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                />
              </div>

              <div className="pt-3 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#1E4F91] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#163E74] transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
