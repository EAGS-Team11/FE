// src/pages/admin/course/CreateCourseModal.jsx

import React, { useState } from "react";
import { X, Save, Loader2, BookOpen } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { apiFetch } from "../../../services/apiService";

export default function CreateCourseModal({ onClose, refreshDosenList }) {
    const { user } = useAuth(); // Ambil user (untuk ditampilkan siapa yang membuat, jika perlu)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        kode_course: "",
        nama_course: "",
        access_code: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Client-side validation sederhana
        if (!form.kode_course || !form.nama_course || !form.access_code) {
            setError("Semua field harus diisi.");
            setLoading(false);
            return;
        }

        try {
            // Endpoint: POST /course/ (Token Admin digunakan melalui apiFetch)
            const result = await apiFetch("/course/", "POST", form);
            
            alert(`✅ Course '${result.nama_course}' berhasil dibuat oleh Admin!`);
            
            // Panggil refresh list di parent (AdminCourseList.jsx)
            if(refreshDosenList) refreshDosenList(); 
            onClose();

        } catch (err) {
            console.error("Gagal membuat course:", err);
            // Tangkap error 400 dari backend (misalnya kode_course sudah ada)
            setError(err.message || "Gagal terhubung ke API atau Course Code sudah ada.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>
                <h2 className="text-center text-lg font-semibold mb-5 text-[#173A64] flex items-center justify-center gap-2">
                    <BookOpen size={20} /> Create New Course
                </h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg mb-4 text-xs">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    {/* Input Nama Course */}
                    <div>
                        <label className="block text-left text-xs font-medium text-gray-500">Course Name</label>
                        <input
                            type="text"
                            name="nama_course"
                            value={form.nama_course}
                            onChange={handleChange}
                            placeholder="e.g., Capstone Project A"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none"
                            required
                        />
                    </div>
                    {/* Input Kode Course */}
                    <div>
                        <label className="block text-left text-xs font-medium text-gray-500">Course Code (Unique)</label>
                        <input
                            type="text"
                            name="kode_course"
                            value={form.kode_course}
                            onChange={handleChange}
                            placeholder="e.g., CS401"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none"
                            required
                        />
                    </div>
                     {/* Input Access Code */}
                    <div>
                        <label className="block text-left text-xs font-medium text-gray-500">Access Code (for Students and Lecturer to Join)</label>
                        <input
                            type="text"
                            name="access_code"
                            value={form.access_code}
                            onChange={handleChange}
                            placeholder="e.g., JOIN123"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none"
                            required
                        />
                    </div>
                    
                    <div className="pt-3 flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#173A64] text-white text-sm px-6 py-2 rounded-md hover:bg-[#123052] transition disabled:bg-gray-400 flex items-center gap-2"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16}/>}
                            {loading ? "Creating..." : "Create Course"}
                        </button>
                    </div>
                </form>

                <p className="text-xs text-gray-400 mt-4 text-center">
                    Course is automatically created under the Admin's user ID (or the Dosen you configure in the backend).
                </p>
            </div>
        </div>
    );
}