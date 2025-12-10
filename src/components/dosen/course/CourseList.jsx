// src/components/dosen/course/CourseList.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import CourseCard from "./CourseCard";
import { apiFetch } from "../../../services/apiService"; 
import { useAuth } from "../../../context/AuthContext"; // Import Auth

export default function CourseList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    // Fungsi fetch khusus untuk Dosen: mengambil hanya course yang dibuatnya
    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Menggunakan endpoint khusus Dosen: GET /course/dosen
            const response = await apiFetch("/course/dosen", "GET");
            
            const mappedData = response.map(item => ({
                ...item,
                id: item.id_course,
                title: item.nama_course,
                code: item.kode_course,
                description: "Deskripsi course dari database...",
                category: "Informatics", // Placeholder
                sks: 3,
                totalStudents: 0
            }));

            setCourses(mappedData);
        } catch (err) {
            console.error("Error fetching Dosen courses:", err);
            setError(err.message || "Gagal memuat Course yang Anda ampu.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if(token) fetchCourses();
    }, [fetchCourses, token]);

    return (
        <div className="flex flex-col">
            {/* Search + Button */}
            <div className="flex justify-between items-center mb-10">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search My Course"
                        className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <Search className="absolute left-2.5 top-2 text-gray-400" size={16} />
                </div>
                {/* 🛑 Tombol Create Course DIHAPUS dari halaman Dosen */}
                <div className="text-sm text-gray-500 font-medium">
                    Course Management via Admin Panel
                </div>
            </div>

            {/* LOGIKA TAMPILAN: Loading / Error / Data */}
            {loading ? (
                 <div className="flex justify-center py-20">
                     <Loader2 size={24} className="animate-spin text-blue-600 mr-2"/>
                     <p className="text-blue-600 font-bold">Sedang mengambil Course yang Anda ampu...</p>
                 </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10 font-bold bg-red-50 rounded-lg border border-red-200">
                    {error}
                    <br/><span className="text-sm font-normal text-black">Pastikan Anda login sebagai Dosen.</span>
                </div>
            ) : courses.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    Belum ada Course yang Anda buat. Silakan minta Admin untuk membuatkannya.
                </div>
            ) : (
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
        </div>
    );
}