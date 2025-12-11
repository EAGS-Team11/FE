// src/pages/mahasiswa/course/MyCourse.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../../components/mahasiswa/course/CourseCard";
import courseImg from "../../../assets/course1.png";
import { Plus, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react"; 
import { useAuth } from "../../../context/AuthContext"; 
import { apiFetch } from "../../../services/apiService"; 

const MyCourse = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    
    const [showModal, setShowModal] = useState(false);
    const [classCode, setClassCode] = useState("");
    const [modalLoading, setModalLoading] = useState(false); // Loading khusus modal
    
    // STATE DATA REAL
    const [myCourses, setMyCourses] = useState([]); // Courses yang sudah di-join
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. FETCH COURSE YANG SUDAH DI-JOIN (Tampilan Utama)
    const fetchMyCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Endpoint Mahasiswa: GET /course/my
            const response = await apiFetch("/course/my", "GET");

            // Mapping Response (CourseOut) ke format Card Mahasiswa
            const mappedData = response.map((item) => ({
                id: item.id_course,
                title: item.nama_course,
                category: item.kode_course,
                access_code: item.access_code,
            }));

            setMyCourses(mappedData);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat daftar Course Anda. Silakan coba login ulang.");
            setLoading(false);
        } 
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchMyCourses();
        } else {
            setLoading(false);
        }
    }, [token, fetchMyCourses]);


    // 2. LOGIKA JOIN CLASS (Gabungan: Cari Course + Join)
    const handleSubmit = async () => {
        if (classCode.trim() === "") {
            alert("Masukkan kode akses kelas!");
            return;
        }

        setModalLoading(true);

        try {
            // A. Cari ID Course berdasarkan Access Code
            // KARENA KITA TIDAK MAU FETCH SEMUA COURSE, ASUMSIKAN ADA ENDPOINT /course/lookup?code=
            // Karena BE Anda tidak punya endpoint lookup, kita paksakan ambil semua course (catalog)
            // HANYA saat JOIN, lalu cari di sisi frontend.

            const catalogResponse = await apiFetch("/course/", "GET");
            const targetCourse = catalogResponse.find(c => c.access_code === classCode);

            if (!targetCourse) {
                throw new Error("Kode akses salah atau kelas tidak ditemukan.");
            }

            // B. Kirim Request Join ke Backend
            // Endpoint: POST /course/join
            await apiFetch("/course/join", "POST", { id_course: targetCourse.id_course });

            alert(`✅ Berhasil bergabung ke kelas: ${targetCourse.nama_course}!`);
            setShowModal(false);
            setClassCode("");
            
            // Re-fetch daftar kursus yang sudah di-join
            fetchMyCourses(); 
            
            // Redirect ke halaman detail course (CourseEssay.jsx)
            navigate(`/course/${targetCourse.id_course}`); 

        } catch (err) {
            console.error(err);
            alert(`Gagal join: ${err.message}. Course mungkin sudah Anda ikuti.`);
        } finally {
            setModalLoading(false);
        }
    };

    return (
        <div className="p-8 bg-[#F6F7FB] min-h-screen font-inter py-24 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 mt-1 ml-8 mr-10">
                <div className="flex items-center gap-2">
                    <div className="w-20 h-20 flex justify-center items-center rounded-[10px] mt-1">
                        <img src={courseImg} alt="Book" className="w-30 h-30" />
                    </div>
                    {/* Halaman ini kini hanya menampilkan course yang di-join */}
                    <h1 className="text-[32px] font-bold">My Courses</h1> 
                </div>

                {/* Add Class Button */}
                <button
                    onClick={() => { setShowModal(true); setClassCode(''); setError(null); }}
                    className="flex items-center gap-2 bg-[#2f5f97] text-white px-4 py-2 rounded-[10px] hover:bg-[#a3a2b4] transition"
                >
                    <Plus size={18} />
                    Join New Class
                </button>
            </div>

            {/* Tampilan Grid Course */}
            <div className="bg-[#ECEDEF] rounded-[15px] p-8 flex flex-col items-center max-w-[1000px] mx-auto">
                
                {/* Search Bar (Visual Only) */}
                <div className="mb-6 w-full max-w-[800px]">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search My Courses"
                            className="w-full h-[40px] rounded-[10px] bg-white border border-black/50 pl-4 pr-10 text-black/50 placeholder-black/50 font-inter font-normal"
                        />
                    </div>
                </div>

                {/* LOGIKA LOADING / DATA */}
                {loading ? (
                    <div className="py-10 text-blue-600 font-bold animate-pulse flex items-center gap-2">
                        <Loader2 size={24} className="animate-spin" />
                        Memuat daftar Course yang Anda ikuti...
                    </div>
                ) : error ? (
                    <div className="py-10 text-red-500 font-bold">{error}</div>
                ) : myCourses.length === 0 ? (
                    <div className="py-10 text-gray-500">
                        Anda belum terdaftar di Course mana pun. Klik 'Join New Class' di atas.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-center">
                        {myCourses.map((course) => (
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
                )}

                {/* Pagination (Visual) */}
                <div className="flex justify-center items-center mt-8 space-x-3 w-full">
                    <button className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition">
                        <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                    <span className="text-sm font-medium text-gray-600">Page 1 of 1</span>
                    <button className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition">
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Modal Add Class */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-[999] backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white rounded-2xl p-7 w-[400px] shadow-2xl relative animate-fadeIn">
                        
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-[20px] font-semibold mb-4 text-center text-[#2F2975]">
                            Join a Class
                        </h2>
                        <p className="text-center text-xs text-gray-400 mb-4">
                            Masukkan Access Code dari Dosen
                        </p>

                        <input
                            type="text"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            placeholder="Contoh: masuk123"
                            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#2F2975]/50"
                            autoFocus
                            disabled={modalLoading}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                                disabled={modalLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={modalLoading}
                                className="px-4 py-2 rounded-md bg-[#2F2975] text-white hover:bg-[#4039A5] transition flex items-center gap-2 disabled:bg-gray-400"
                            >
                                {modalLoading ? <Loader2 size={18} className="animate-spin" /> : 'Join'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCourse;