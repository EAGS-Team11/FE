// src/components/dosen/course/CourseList.jsx 

import React, { useState, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react"; 
import CourseCard from "./CourseCard";
import { apiFetch } from "../../../services/apiService"; 
import { useAuth } from "../../../context/AuthContext"; 
import JoinCourseModalDosen from "../../../pages/dosen/course/JoinCourseModalDosen"; 

// Helper untuk memetakan data
const mapCourseData = (items) => {
    return items.map(item => ({
        ...item,
        id: item.id_course,
        title: item.nama_course,
        code: item.kode_course,
        description: "Deskripsi course dari database...",
        category: "Informatics", // Placeholder
        sks: 3,
        totalStudents: 0
    }));
};

// Gabungan unik data Course berdasarkan ID
const getUniqueCourses = (arr1, arr2) => {
    const combined = [...arr1, ...arr2];
    const uniqueIds = new Set();
    const uniqueCourses = [];
    
    for (const course of combined) {
        if (!uniqueIds.has(course.id_course)) {
            uniqueIds.add(course.id_course);
            uniqueCourses.push(course);
        }
    }
    return uniqueCourses;
};

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    const { token } = useAuth();

    // --- FUNGSI BARU: MENGAMBIL COURSE DIAMPU DAN COURSE DIIKUTI ---
    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Fetch Course yang Dibuat/Diampu Dosen: GET /course/dosen
            const promiseTaught = apiFetch("/course/dosen", "GET");
            
            // 2. Fetch Course yang Diikuti Dosen (via enrollment): GET /course/my
            //    Endpoint ini akan bekerja karena kita hapus role check di BE /course/join
            const promiseJoined = apiFetch("/course/my", "GET"); 
            
            const [taughtCoursesRaw, joinedCoursesRaw] = await Promise.all([promiseTaught, promiseJoined]);
            
            // 3. Gabungkan dan hapus duplikasi
            const uniqueRawCourses = getUniqueCourses(taughtCoursesRaw, joinedCoursesRaw);
            
            const mappedData = mapCourseData(uniqueRawCourses);
            setCourses(mappedData);

        } catch (err) {
            console.error("Error fetching Dosen courses:", err);
            setError(err.message || "Gagal memuat Course yang relevan.");
        } finally {
            setLoading(false);
        }
    }, [token]);
    // -------------------------------------------------------------

    const handleRefreshAfterJoin = () => {
        fetchCourses(); // Re-fetch untuk memperbarui daftar
        setIsJoinModalOpen(false); 
    }


    useEffect(() => {
        if (token) fetchCourses();
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
                
                {/* Tombol Join Course */}
                <button
                    onClick={() => setIsJoinModalOpen(true)}
                    className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-green-700 transition flex items-center gap-2"
                >
                    <Plus size={16} />
                    Join New Course
                </button>
            </div>

            {/* LOGIKA TAMPILAN: Loading / Error / Data */}
            {loading ? (
                 <div className="flex justify-center py-20">
                     <Loader2 size={24} className="animate-spin text-blue-600 mr-2"/>
                     <p className="text-blue-600 font-bold">Sedang mengambil Course...</p>
                 </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10 font-bold bg-red-50 rounded-lg border border-red-200">
                    {error}
                    <br/><span className="text-sm font-normal text-black">Pastikan Anda login sebagai Dosen.</span>
                </div>
            ) : courses.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    Belum ada Course yang Anda ampu atau ikuti.
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
            
            {/* Modal Join Course */}
            {isJoinModalOpen && (
                <JoinCourseModalDosen 
                    onClose={() => setIsJoinModalOpen(false)} 
                    fetchMyCourses={handleRefreshAfterJoin}
                />
            )}
        </div>
    );
}