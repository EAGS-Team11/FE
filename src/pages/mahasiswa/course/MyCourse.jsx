/* src/pages/mahasiswa/course/MyCourse.jsx */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../../components/mahasiswa/course/CourseCard";
import courseImg from "../../../assets/course1.png";
import { Plus, ChevronLeft, ChevronRight, X } from "lucide-react";
// 1. IMPORT AUTH CONTEXT
import { useAuth } from "../../../context/AuthContext"; 

const MyCourse = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // Ambil token untuk validasi ke backend
  
  const [showModal, setShowModal] = useState(false);
  const [classCode, setClassCode] = useState("");

  // STATE DATA REAL
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. FETCH COURSE CATALOG (Daftar semua mata kuliah)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/course/");
        if (!response.ok) throw new Error("Gagal mengambil data course");
        
        const rawData = await response.json();

        // Mapping Data dari Backend ke Frontend
        const mappedData = rawData.map((item) => ({
          id: item.id_course,            // ID Course (Penting untuk Join)
          title: item.nama_course,       // Nama Matkul
          category: item.kode_course,    // Kode Matkul
          access_code: item.access_code, // Kode Akses (Password Kelas)
        }));

        setCourses(mappedData);
      } catch (err) {
        console.error(err);
        setError("Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 3. LOGIKA JOIN CLASS (Paling Penting)
  const handleSubmit = async () => {
    if (classCode.trim() === "") {
      alert("Masukkan kode akses kelas!");
      return;
    }

    // A. Cari Course mana yang punya kode akses tersebut
    // (Dalam aplikasi real, validasi ini sebaiknya full di backend, tapi ini cara cepat untuk MVP)
    const targetCourse = courses.find(c => c.access_code === classCode);

    if (!targetCourse) {
        alert("Kode akses salah atau kelas tidak ditemukan!");
        return;
    }

    // B. Kirim Request Join ke Backend
    try {
        const response = await fetch("http://127.0.0.1:8000/course/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Wajib pakai Token Mahasiswa
            },
            body: JSON.stringify({
                id_course: targetCourse.id // Backend butuh ID Course untuk enroll
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || "Gagal join kelas");
        }

        // C. Sukses!
        alert(`Berhasil bergabung ke kelas: ${targetCourse.title}!`);
        setShowModal(false);
        setClassCode("");
        
        // Opsional: Redirect ke halaman detail course
        navigate(`/course/${targetCourse.id}`);

    } catch (err) {
        alert(`Gagal: ${err.message}`);
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
          <h1 className="text-[32px] font-bold">Course Catalog</h1>
        </div>

        {/* Add Class Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2f5f97] text-white px-4 py-2 rounded-[10px] hover:bg-[#a3a2b4] transition"
        >
          <Plus size={18} />
          Join Class
        </button>
      </div>

      {/* Tampilan Grid Course */}
      <div className="bg-[#ECEDEF] rounded-[15px] p-8 flex flex-col items-center max-w-[1000px] mx-auto">
        {/* Search Bar (Visual Only) */}
        <div className="mb-6 w-full max-w-[800px]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Course"
              className="w-full h-[40px] rounded-[10px] bg-white border border-black/50 pl-4 pr-10 text-black/50 placeholder-black/50 font-inter font-normal"
            />
            
          </div>
        </div>

        {/* LOGIKA LOADING / DATA */}
        {loading ? (
            <div className="py-10 text-blue-600 font-bold animate-pulse">Memuat Daftar Kuliah...</div>
        ) : error ? (
            <div className="py-10 text-red-500 font-bold">{error}</div>
        ) : courses.length === 0 ? (
            <div className="py-10 text-gray-500">Belum ada kelas yang tersedia.</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-center">
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
        )}

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