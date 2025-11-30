import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../../components/mahasiswa/course/CourseCard";
import { dummyCourses } from "../../../data/mahasiswa/course/dummyCourses";
import courseImg from "../../../assets/course1.png";
import { Plus, ChevronLeft, ChevronRight, X } from "lucide-react";
import { apiFetch } from "../../../services/apiService"; // Import service layer
import { useAuth } from "../../../context/AuthContext"; // Untuk otorisasi

const MyCourse = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Ambil user untuk otorisasi
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [classCode, setClassCode] = useState("");
    const [modalError, setModalError] = useState(null);

    // --- FETCHING DATA COURSE DARI BE ---
    useEffect(() => {
        const fetchCourses = async () => {
            if (!user) return; 

            setLoading(true);
            setError(null);
            try {
                // Panggil endpoint GET /course/my yang baru dibuat di BE
                const data = await apiFetch("/course/my");
                setCourses(data);
                // Gantikan dummyCourses dengan data asli: setCourses(data);

            } catch (err) {
                console.error("Error fetching courses:", err);
                setError(err.message || "Failed to load courses.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
        
        // Saat ini menggunakan data dummy karena BE fetch belum fully implemented
        setCourses(dummyCourses);
        setLoading(false);
    }, [user]); 


    // --- SUBMIT JOIN CLASS KE BE ---
    const handleSubmit = async () => {
        setModalError(null);
        if (classCode.trim() === "") {
            setModalError("Please enter a class access code!");
            return;
        }

        try {
            // Asumsi: Kita perlu mencari ID Course berdasarkan Access Code terlebih dahulu
            // Karena BE Anda belum punya endpoint GET course by access code, kita langsung POST ke join.
            
            // Asumsi ID Course: Dalam implementasi nyata, FE harus mendapatkan Course ID dulu. 
            // Untuk sementara, kita asumsikan classCode adalah Course ID 
            // (ATAU BUAT LOGIC DI BE UNTUK CEK CODE DAN JOIN DALAM SATU ENDPOINT)
            const payload = {
                id_course: 1, // DUMMY ID: Ganti dengan logic pencarian ID
                // access_code: classCode (Jika BE Anda menerima access_code di /join)
            };
            
            // Panggil POST /course/join
            await apiFetch("/course/join", "POST", { id_course: parseInt(classCode) }); // Menggunakan classCode sebagai ID dummy
            
            alert(`Class code "${classCode}" submitted! You have joined the course.`);
            setShowModal(false);
            setClassCode("");
            // Refresh daftar course
            // fetchCourses(); 

        } catch (err) {
            setModalError(err.message || "Failed to join course. Check code or try again.");
        }
    };

    return (
        <div className="p-8 bg-[#F6F7FB] min-h-screen font-inter py-24 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 mt-1 ml-8 mr-10">
                <div className="flex items-center gap-4">
                    <img src={courseImg} alt="Book" className="w-16 h-16" />
                    <h1 className="text-3xl font-extrabold text-[#1F3A60]">My Courses</h1>
                </div>

                {/* Add Class Button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-[#3D73B4] text-white px-5 py-2.5 rounded-xl hover:bg-[#2c5a90] transition shadow-md"
                >
                    <Plus size={18} />
                    Join Class
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mx-auto max-w-[1000px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <p className="font-bold">Error Loading Courses:</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}


            {/* Search + Course Grid */}
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-[1000px] mx-auto border border-gray-200">
                
                {/* Search Bar */}
                <div className="mb-6 w-full max-w-[800px] mx-auto">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search Course"
                            className="w-full h-[45px] rounded-xl bg-gray-50 border border-gray-300 pl-4 pr-10 text-gray-700 placeholder-gray-500 font-normal focus:ring-2 focus:ring-[#3D73B4] focus:outline-none transition"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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

                {/* Loading / Empty State */}
                {loading && <p className="text-center text-gray-500 py-10">Loading courses...</p>}
                
                {!loading && courses.length === 0 && (
                    <div className="text-center py-10 text-gray-600">
                        <p className="text-lg font-semibold">No courses found.</p>
                        <p className="text-sm">Join a class using the "Join Class" button above!</p>
                    </div>
                )}

                {/* Course Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full justify-center mt-6">
                    {courses.map((course) => (
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

                        <h2 className="text-xl font-extrabold mb-5 text-center text-[#1F3A60]">
                            Join a Class
                        </h2>
                        
                        {modalError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
                                {modalError}
                            </div>
                        )}

                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Enter the class access code provided by your lecturer.
                        </p>

                        <input
                            type="text"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            placeholder="Class Access Code (e.g., IF401)"
                            className="w-full border border-gray-300 rounded-lg p-3 mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D73B4]"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-5 py-2 rounded-lg bg-[#3D73B4] text-white font-semibold hover:bg-[#2c5a90] transition shadow-md"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCourse;