// src/components/admin/dosen/DosenList.jsx

import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, X, UserPlus, Save } from "lucide-react";
import DosenCard from "./DosenCard";
import { apiFetch } from "../../../services/apiService"; // Import service layer

// Hapus import dosenData, kita akan fetch data live
// import { dosenData } from "../../../data/admin/dosenData"; 

export default function DosenList() {
    // --- STATE DATA ---
    const [dosenList, setDosenList] = useState([]); // Data live dari BE
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    
    // --- STATE MODAL & FORM ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [form, setForm] = useState({
        nama: "",
        nim_nip: "", 
        prodi: "",
        password: ""
    });

    // --- FUNGSIONALITAS FETCHING DATA DOSEN (GET /auth/users) ---
    const fetchDosenList = async () => {
        setLoading(true);
        setFetchError(null);
        try {
            // Memanggil endpoint Admin untuk mendapatkan list semua user
            const rawUsers = await apiFetch("/auth/users", "GET");
            
            // Filter hanya role Dosen/Lecturer untuk ditampilkan
            const dosen = rawUsers
                .filter(u => u.role === 'dosen')
                .map(u => ({
                    // Mapping ke format yang dibutuhkan DosenCard
                    id: u.id_user,
                    name: u.nama,
                    nip: u.nim_nip,
                    email: `${u.nim_nip}@univ.ac.id`, // Dummy email
                    prodi: u.prodi,
                    status: 'active' // Asumsi user yang terdaftar aktif
                }));

            setDosenList(dosen);
        } catch (err) {
            console.error("Error fetching Dosen:", err);
            setFetchError(err.message || "Gagal mengambil data dosen.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDosenList();
    }, []); // Panggil saat komponen pertama kali dimuat

    // --- FUNGSIONALITAS TAMBAH DOSEN ---
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddDosen = async (e) => {
        e.preventDefault();
        setModalError(null);
        setModalLoading(true);

        const newDosen = {
            nim_nip: form.nim_nip,
            password: form.password,
            nama: form.nama,
            role: 'dosen', // Hardcode role dosen untuk registrasi dari Admin Panel ini
            prodi: form.prodi
        };

        try {
            // Memanggil endpoint baru: /auth/register/admin
            const data = await apiFetch("/auth/register", "POST", newDosen);
            
            alert(`✅ Dosen ${data.nama} berhasil didaftarkan!`);
            
            // Refresh list data setelah sukses
            fetchDosenList(); 

            setIsModalOpen(false);
            setForm({ nama: "", nim_nip: "", prodi: "", password: "" }); // Reset form

        } catch (err) {
            setModalError(err.message || "Gagal mendaftarkan dosen. Cek koneksi atau NIP.");
        } finally {
            setModalLoading(false);
        }
    };

    const filteredDosen = dosenList.filter((dosen) =>
        dosen.name.toLowerCase().includes(search.toLowerCase()) ||
        dosen.nip.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="flex flex-col">
            {/* Search + Button */}
            <div className="flex justify-between items-center mb-10">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search Lecturer"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <Search className="absolute left-2.5 top-2 text-gray-400" size={16} />
                </div>

                <button
                    onClick={() => { setIsModalOpen(true); setModalError(null); setForm({ nama: "", nim_nip: "", prodi: "", password: "" }); }}
                    className="bg-[#1E4F91] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#163E74] transition flex items-center gap-2"
                >
                    <UserPlus size={16} />
                    Add New Lecturer
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
            ) : filteredDosen.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    {search ? "Dosen tidak ditemukan." : "Belum ada data Dosen dalam sistem."}
                </div>
            ) : (
                /* Courses Grid - DATA REAL */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {filteredDosen.map((dosen) => (
                        <DosenCard key={dosen.id} dosen={dosen} />
                    ))}
                </div>
            )}

            {/* Pagination Dummy */}
            <div className="flex justify-end items-center mt-6 space-x-2">
                <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
                    <ChevronLeft size={14} />
                </button>
                <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Modal Add */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                        
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-center text-lg font-semibold mb-5 flex items-center justify-center gap-2 text-[#1E4F91]">
                            <UserPlus size={20} /> Add New Lecturer
                        </h2>
                        
                        {modalError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg mb-4 text-xs">
                                {modalError}
                            </div>
                        )}


                        <form onSubmit={handleAddDosen} className="space-y-4 text-sm">
                            
                            <input
                                type="text"
                                name="nama"
                                value={form.nama}
                                onChange={handleFormChange}
                                placeholder="Full Name"
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#1E4F91] outline-none"
                            />

                            <input
                                type="text"
                                name="nim_nip"
                                value={form.nim_nip}
                                onChange={handleFormChange}
                                placeholder="NIP"
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#1E4F91] outline-none"
                            />

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleFormChange}
                                placeholder="Temporary Password (min 6 char)"
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#1E4F91] outline-none"
                            />

                            <input
                                type="text"
                                name="prodi"
                                value={form.prodi}
                                onChange={handleFormChange}
                                placeholder="Study Program"
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#1E4F91] outline-none"
                            />
                            
                            {/* Role dan Fakultas dihilangkan untuk menyederhanakan */}

                            <div className="pt-3 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={modalLoading}
                                    className="bg-[#1E4F91] text-white text-sm px-6 py-2 rounded-md hover:bg-[#163E74] transition disabled:bg-gray-400 flex items-center gap-2"
                                >
                                    <Save size={16}/>
                                    {modalLoading ? "Saving..." : "Save Lecturer"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}