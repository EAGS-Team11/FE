/* src/components/dosen/course/CourseList.jsx */

import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import CourseCard from "./CourseCard";
import { courses } from "../../../data/dosen/course/courseData";

export default function CourseList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col w-full">
      
      {/* SEARCH + BUTTON RESPONSIVE */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">

        {/* Search box */}
        <div className="relative w-full sm:w-2/3 md:w-1/3">
          <input
            type="text"
            placeholder="Search Course"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-9 pr-9 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Icon Search */}
          <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />

          {searchTerm !== "" && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Button Create */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-[#1E4F91] text-white text-sm px-4 py-2 rounded-md hover:bg-[#163E74] transition"
        >
          Create new course
        </button>
      </div>

      {/* RESPONSIVE GRID FIX */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full text-center py-5">
            No courses found.
          </p>
        )}
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
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-center text-lg font-semibold mb-5">
              Create new course
            </h2>

            {/* Form */}
            <form className="space-y-3 text-sm">
              <div>
                <label className="block font-medium mb-1 text-left">Course Title</label>
                <input type="text" placeholder="Kalkulus" className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">Course Code</label>
                <input type="text" placeholder="MATH101" className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">Description</label>
                <input type="text" placeholder="Deskripsi singkat mata kuliah" className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">Category</label>
                <input type="text" placeholder="Informatics Engineering" className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              <div>
                <label className="block font-medium mb-1 text-left">Credit (SKS)</label>
                <input type="number" placeholder="3" className="w-full border border-gray-300 rounded-md p-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              <div className="pt-3 flex justify-center">
                <button type="submit" className="bg-[#1E4F91] text-white text-sm px-6 py-1.5 rounded-md hover:bg-[#163E74] transition">
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
