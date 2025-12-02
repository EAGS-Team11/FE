/* src/pages/dosen/course/CourseDetail.jsx */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, ArrowLeft, PlusCircle } from "lucide-react"; // Hapus Loader2, tambah PlusCircle
import { useAuth } from "../../../context/AuthContext"; // 1. Import Auth

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); // Ambil token dosen

  // STATE DATA REAL
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]); // Ganti courseEssays jadi assignments
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // A. AMBIL INFO COURSE
        // (Cara cepat: fetch all lalu find. Idealnya: GET /course/{id})
        const resCourse = await fetch("http://127.0.0.1:8000/course/");
        if (!resCourse.ok) throw new Error("Gagal mengambil data course");
        
        const allCourses = await resCourse.json();
        const foundCourse = allCourses.find((c) => c.id_course === Number(courseId));
        
        if (foundCourse) setCourse(foundCourse);

        // B. AMBIL DAFTAR ASSIGNMENT (Supaya tombol Grade tahu ID-nya)
        const resAssign = await fetch(`http://127.0.0.1:8000/assignment/course/${courseId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (resAssign.ok) {
            const dataAssign = await resAssign.json();
            setAssignments(dataAssign); 
        }

      } catch (err) {
        console.error("Error fetching detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [courseId, token]);

  const handleCreateAssignment = () =>
    navigate(`/dosen/course/${courseId}/create-essay`, { state: { course } });

  // TAMPILAN LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex justify-center items-center">
        <div className="text-blue-600 font-bold animate-pulse">Loading Detail Course...</div>
      </div>
    );
  }

  // TAMPILAN JIKA COURSE TIDAK KETEMU
  if (!course) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold text-gray-500">Course tidak ditemukan</h2>
        <button onClick={() => navigate("/dosen/course")} className="mt-4 text-blue-600 underline">
            Kembali ke List
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex flex-col px-8 py-6">
      {/* Header Course */}
      <div className="flex justify-between items-start mb-6">
        <div>
            <h2 className="text-2xl font-bold text-[#2c2f77]">
                {course.nama_course}
            </h2>
            <p className="text-gray-500 font-medium">
                {course.kode_course}
            </p>
        </div>

        {/* Tombol Create Assignment */}
        <button
          onClick={handleCreateAssignment}
          className="flex items-center gap-2 bg-[#1E4F91] text-white px-4 py-2 rounded-lg hover:bg-[#163E74] transition shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      <div className="border-t border-gray-300 my-4 mb-8 w-full" />

      {/* JUDUL SECTION */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Assignments List</h3>

      {/* DAFTAR TUGAS (GRID) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.length > 0 ? (
            assignments.map((assign) => (
            <div key={assign.id_assignment} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition relative group">
                <div className="flex items-start justify-between mb-2">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <FileText size={24} />
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Essay Task
                    </span>
                </div>
                
                <h4 className="font-bold text-[#25335A] text-lg mb-1 truncate" title={assign.judul}>
                    {assign.judul}
                </h4>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                    {assign.deskripsi}
                </p>
                
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                        Deadline: {new Date(assign.deadline).toLocaleDateString("id-ID")}
                    </span>
                    
                    {/* TOMBOL GIVE GRADE YANG BENAR (Per Kartu) */}
                    <button 
                        onClick={() => navigate("/dosen/give-grade", {
                            state: { 
                                courseId: course.id_course, 
                                // PENTING: Kirim objek assignment lengkap agar tidak error di halaman sebelah
                                assignment: {
                                    id: assign.id_assignment,
                                    title: assign.judul
                                }
                            }
                        })}
                        className="text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition font-medium"
                    >
                        Grade This
                    </button>
                </div>
            </div>
            ))
        ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-400 text-lg">Belum ada tugas yang dibuat.</p>
                <p className="text-sm text-gray-300">Klik tombol "Create New Assignment" di atas.</p>
            </div>
        )}
      </div>

      {/* Tombol Back */}
      <div className="mt-10">
        <button
          onClick={() => navigate("/dosen/course")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1E4F91] transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
        
      </div>
    </div>
  );
}
