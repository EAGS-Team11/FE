// src/components/admin/students/StudentList.jsx

import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, X, UserPlus, Save } from "lucide-react";
import StudentCard from "./StudentCard";
// Hapus import data dummy: import { studentData } from "../../../data/admin/studentData"; 
import { apiFetch } from "../../../services/apiService"; // Import service layer

export default function StudentList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    
    // --- STATE DATA LIVE ---
    const [studentList, setStudentList] = useState([]); // Data live dari BE
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    // State Form Modal
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [form, setForm] = useState({
        nama: "",
        nim_nip: "",
        prodi: "",
        password: ""
    });

    // --- FUNGSIONALITAS FETCHING LIST STUDENT (LIVE) ---
    const fetchStudentList = async () => {
        setLoading(true);
        setFetchError(null);
        try {
            // Memanggil endpoint Admin untuk mendapatkan list semua user
            const rawUsers = await apiFetch("/auth/users", "GET");
            
            // Filter hanya role Mahasiswa dan mapping data (BE UserOut -> FE StudentCard)
            const students = rawUsers
                .filter(u => u.role === 'mahasiswa')
                .map(u => ({
                    id: u.id_user,
                    name: u.nama,
                    nim: u.nim_nip, // FE menggunakan 'nim'
                    email: `${u.nim_nip}@student.itk.ac.id`, // Dummy email construct
                    prodi: u.prodi,
                    fakultas: "Fakultas Teknik", // Data dummy/hardcode karena tidak ada di schema BE
                    status: 'active' 
                }));

            setStudentList(students);
        } catch (err) {
            console.error("Error fetching Students:", err);
            setFetchError(err.message || "Gagal mengambil data mahasiswa.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentList();
    }, []); // Panggil saat komponen pertama kali dimuat

    
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // --- LOGIC TAMBAH STUDENT (POST /auth/register/admin) ---
    const handleAddStudent = async (e) => {
        e.preventDefault();
        setModalError(null);
        setModalLoading(true);

        const newStudent = {
            nim_nip: form.nim_nip,
            password: form.password,
            nama: form.nama,
            role: 'mahasiswa', 
            prodi: form.prodi
        };

        try {
            const data = await apiFetch("/auth/register", "POST", newStudent);
            
            alert(`✅ Mahasiswa ${data.nama} berhasil didaftarkan!`);
            
            // Refresh list data setelah sukses
            fetchStudentList(); 
            
            setIsModalOpen(false);
            setForm({ nama: "", nim_nip: "", prodi: "", password: "" }); // Reset form

        } catch (err) {
            setModalError(err.message || "Gagal mendaftarkan mahasiswa. Cek koneksi atau NIM.");
        } finally {
            setModalLoading(false);
        }
    };
    
    // --- FILTERING ---
    const filtered = studentList.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()) ||
            s.nim.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="flex flex-col">
            {/* Search + Button */}
            <div className="flex justify-between items-center mb-10">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search Student"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-md pl-9 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <Search size={16} className="absolute left-2.5 top-2 text-gray-400" />
                </div>

                <button
                    onClick={() => { setIsModalOpen(true); setModalError(null); setForm({ nama: "", nim_nip: "", prodi: "", password: "" }); }}
                    className="bg-[#173A64] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#123052] flex items-center gap-2"
                >
                    <UserPlus size={16} />
                    Add New Student
                </button>
            </div>

            {/* LOGIKA TAMPILAN: Loading / Error / Data */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <p className="text-blue-600 font-bold animate-pulse">Loading data...</p>
                </div>
            ) : fetchError ? (
                <div className="text-center text-red-500 py-10 font-bold bg-red-50 rounded-lg border border-red-200">
                    Error: {fetchError}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    {search ? "Mahasiswa tidak ditemukan." : "Belum ada data Mahasiswa dalam sistem."}
                </div>
            ) : (
                /* Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filtered.map((student) => (
                        <StudentCard key={student.id} student={student} />
                    ))}
                </div>
            )}


            {/* Pagination */}
            <div className="flex justify-end items-center mt-6 gap-2">
                <button className="border rounded-md p-1.5 hover:bg-gray-100">
                    <ChevronLeft size={14} />
                </button>
                <button className="border rounded-md p-1.5 hover:bg-gray-100">
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-xl">

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-red-500"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-lg font-semibold text-center mb-4 text-[#173A64]">
                            Add New Student
                        </h2>

                        {modalError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg mb-4 text-xs">
                                {modalError}
                            </div>
                        )}

                        <form onSubmit={handleAddStudent} className="space-y-3 text-sm">
                            
                            {/* Input Nama */}
                            <input 
                                type="text" 
                                name="nama"
                                value={form.nama}
                                onChange={handleFormChange}
                                placeholder="Full Name" 
                                required
                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none" 
                            />
                            
                            {/* Input NIM */}
                            <input 
                                type="text" 
                                name="nim_nip"
                                value={form.nim_nip}
                                onChange={handleFormChange}
                                placeholder="NIM" 
                                required
                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none" 
                            />
                            
                            {/* Input Password */}
                            <input 
                                type="password" 
                                name="password"
                                value={form.password}
                                onChange={handleFormChange}
                                placeholder="Temporary Password" 
                                required
                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none" 
                            />
                            
                            {/* Input Prodi */}
                            <input 
                                type="text" 
                                name="prodi"
                                value={form.prodi}
                                onChange={handleFormChange}
                                placeholder="Study Program" 
                                required
                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none" 
                            />
                            

                            <div className="pt-2 flex justify-center">
                                <button 
                                    type="submit" 
                                    disabled={modalLoading}
                                    className="bg-[#173A64] text-white px-6 py-2 rounded-md hover:bg-[#123052] disabled:bg-gray-400"
                                >
                                    {modalLoading ? "Saving..." : "Save Student"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}