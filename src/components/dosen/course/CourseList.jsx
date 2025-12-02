/* src/components/dosen/course/CourseList.jsx */

import React, { useState, useEffect } from "react";
// PENTING: Jangan import Loader2 agar tidak crash
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import CourseCard from "./CourseCard";

export default function CourseList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // STATE: Data Real dari Backend
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchCourses = async () => {
      try {
        // Tembak ke Backend Port 8000
        const response = await fetch("http://127.0.0.1:8000/course/");
        if (!response.ok) throw new Error("Gagal mengambil data course");
        
        const rawData = await response.json();

        // MAPPING DATA: Translate bahasa Backend ke Frontend
        const mappedData = rawData.map(item => ({
            ...item,
            id: item.id_course,        // PENTING: id_course (BE) -> id (FE)
            title: item.nama_course,   // nama_course (BE) -> title (FE)
            code: item.kode_course,    // kode_course (BE) -> code (FE)
            description: "Deskripsi course dari database...",
            category: "Informatics",
            sks: 3,
            totalStudents: 0
        }));

        setCourses(mappedData);
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Gagal terhubung ke server Backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
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

      {/* LOGIKA TAMPILAN: Loading / Error / Data */}
      {loading ? (
        <div className="flex justify-center py-20">
            <p className="text-blue-600 font-bold animate-pulse">Sedang mengambil data...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10 font-bold bg-red-50 rounded-lg border border-red-200">
            {error}
            <br/><span className="text-sm font-normal text-black">Pastikan terminal backend (uvicorn) jalan.</span>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
            Belum ada course. Silakan buat baru.
        </div>
      ) : (
        /* Courses Grid - DATA REAL */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
            ))}
        </div>
      )}

      {/* Pagination (Visual) */}
      <div className="flex justify-end items-center mt-6 space-x-2">
        <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
          <ChevronLeft size={14} />
        </button>
        <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Modal (UI Only) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-5 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-center text-lg font-semibold mb-5">Create new course</h2>
            <p className="text-center text-gray-500 text-sm">Fitur Create via UI akan segera hadir.</p>
          </div>
        </div>
      )}
    </div>
  );
}
