// src/pages/dosen/course/JoinCourseModalDosen.jsx 

import React, { useState } from "react";
import { X, Loader2, BookOpen } from "lucide-react"; 
import { apiFetch } from "../../../services/apiService"; 

export default function JoinCourseModalDosen({ onClose, fetchMyCourses }) {
    const [classCode, setClassCode] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (classCode.trim() === "") {
            setError("Masukkan kode akses kelas!");
            return;
        }

        setModalLoading(true);
        setError(null);

        try {
            // A. Cari ID Course berdasarkan Access Code
            // Walaupun tidak efisien, ini perlu karena BE tidak punya endpoint lookup.
            const catalogResponse = await apiFetch("/course/", "GET");
            const targetCourse = catalogResponse.find(c => c.access_code === classCode);

            if (!targetCourse) {
                throw new Error("Kode akses salah atau kelas tidak ditemukan.");
            }

            // B. Kirim Request Join ke Backend (Menggunakan token Dosen)
            // Endpoint: POST /course/join
            await apiFetch("/course/join", "POST", { id_course: targetCourse.id_course });

            alert(`✅ Berhasil bergabung ke kelas: ${targetCourse.nama_course}!`);
            
            if(fetchMyCourses) fetchMyCourses(); // Refresh daftar course Dosen
            onClose();

        } catch (err) {
            console.error(err);
            setError(`Gagal join: ${err.message}.`);
        } finally {
            setModalLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-[999] backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-2xl p-7 w-[400px] shadow-2xl relative animate-fadeIn">
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                    disabled={modalLoading}
                >
                    <X size={24} />
                </button>

                <h2 className="text-[20px] font-semibold mb-4 text-center text-[#2F2975] flex items-center justify-center gap-2">
                    <BookOpen size={20} /> Join New Course
                </h2>
                <p className="text-center text-xs text-gray-500 mb-4">
                    Masukkan Access Code untuk bergabung ke Course.
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-xs">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    placeholder="Masukkan Access Code"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#2F2975]/50"
                    autoFocus
                    disabled={modalLoading}
                />

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
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
    );
}