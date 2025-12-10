// src/pages/admin/course/AdminCourseList.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Search, Layers, Loader2, Edit2, Trash2 } from "lucide-react";
import { apiFetch } from "../../../services/apiService";
import { useAuth } from "../../../context/AuthContext";
import CreateCourseModal from "./CreateCourseModal"; // Pastikan path ini benar (relative ke direktori yang sama)

export default function AdminCourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { token } = useAuth();

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Menggunakan endpoint public: GET /course/ (semua course)
            const response = await apiFetch("/course/", "GET");
            setCourses(response);
        } catch (err) {
            console.error("Error fetching all courses:", err);
            setError(err.message || "Gagal memuat daftar course.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if(token) fetchCourses();
    }, [fetchCourses, token]);

    // Handle Delete Course (Simulasi/API Call)
    const handleDeleteCourse = async (courseId, courseName) => {
        if (!window.confirm(`Yakin ingin menghapus Course ${courseName} (ID: ${courseId})? Ini akan menghapus Assignments, Submissions, dan Enrollments terkait!`)) {
            return;
        }

        setLoading(true);
        try {
            // Endpoint di backend: DELETE /course/{course_id}
            await apiFetch(`/course/${courseId}`, "DELETE"); 
            alert(`✅ Course ${courseName} berhasil dihapus.`);
            fetchCourses(); // Refresh list
        } catch (err) {
            console.error("Delete failed:", err);
            alert(`❌ Gagal menghapus course: ${err.message}. Pastikan tidak ada data yang terkait yang belum dihapus!`);
            setLoading(false);
        }
    };

    // Fungsi untuk memicu refresh setelah modal Create Course ditutup dan sukses
    const handleCourseCreated = () => {
        setIsCreateModalOpen(false);
        fetchCourses(); 
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-[#173A64] mb-6 flex items-center gap-2">
                <Layers size={24} /> Course Management
            </h1>

            {/* Header / Add Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search Course by Code or Name"
                        className="w-full border rounded-md pl-9 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                </div>
                
                {/* Tombol Tambah Course (Membuka Modal) */}
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add New Course
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 size={24} className="animate-spin text-blue-600 mr-2"/>
                    <p className="text-blue-600 font-bold">Loading Courses...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10 font-bold bg-red-50 rounded-lg border border-red-200">
                    {error}
                </div>
            ) : courses.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    Tidak ada Course ditemukan.
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-500 w-[15%]">Code</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500 w-[30%]">Course Name</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500 w-[15%]">Access Code</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500 w-[15%]">Created At</th>
                                <th className="px-6 py-3 text-center font-medium text-gray-500 w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.map((course) => (
                                <tr key={course.id_course} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-[#173A64]">{course.kode_course}</td>
                                    <td className="px-6 py-4">{course.nama_course}</td>
                                    <td className="px-6 py-4 font-mono text-xs">{course.access_code}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(course.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <div className="flex justify-center space-x-2">
                                            {/* Tombol Edit */}
                                            <button 
                                                title="Edit Course"
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            {/* Tombol Delete */}
                                            <button 
                                                onClick={() => handleDeleteCourse(course.id_course, course.nama_course)}
                                                title="Delete Course"
                                                className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Create Course (Memanggil handler sukses) */}
            {isCreateModalOpen && (
                <CreateCourseModal 
                    onClose={() => setIsCreateModalOpen(false)} 
                    refreshDosenList={handleCourseCreated} // Panggil handler sukses di sini
                />
            )}
        </div>
    );
}