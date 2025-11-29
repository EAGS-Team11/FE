/* src/pages/mahasiswa/course/MyCourse.jsx */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../../components/mahasiswa/course/CourseCard";
import { dummyCourses } from "../../../data/mahasiswa/course/dummyCourses";
import courseImg from "../../../assets/course1.png";
import { Plus, ChevronLeft, ChevronRight, X } from "lucide-react";

const MyCourse = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [classCode, setClassCode] = useState("");

  const handleSubmit = () => {
    if (classCode.trim() === "") {
      alert("Please enter a class code!");
      return;
    }
    alert(`Class code "${classCode}" submitted! Waiting for lecturer approval.`);
    setShowModal(false);
    setClassCode("");
  };

  return (
    <div className="p-8 bg-[#F6F7FB] min-h-screen font-inter py-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-1 ml-8 mr-10">
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 flex justify-center items-center rounded-[10px] mt-1">
            <img src={courseImg} alt="Book" className="w-30 h-30" />
          </div>
          <h1 className="text-[32px] font-bold">Courses</h1>
        </div>

        {/* Add Class Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2f5f97] text-white px-4 py-2 rounded-[10px] hover:bg-[#a3a2b4] transition"
        >
          <Plus size={18} />
          Add Class
        </button>
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

        {/* Pagination */}
        <div className="flex justify-end items-center mt-6 space-x-2 w-full">
          <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
            <ChevronLeft size={14} />
          </button>
          <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Modal Add Class */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white rounded-[15px] p-6 w-[350px] shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-[20px] font-semibold mb-4 text-center text-[#2F2975]">
              Join a Class
            </h2>

            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="Enter class code"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#2F2975]/50"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-[#2F2975] text-white hover:bg-[#4039A5] transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourse;
