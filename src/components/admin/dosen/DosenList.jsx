// src/components/admin/dosen/DosenList.jsx

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, X, UserPlus, Save } from "lucide-react";
import DosenCard from "./DosenCard";
import { dosenData } from "../../../data/admin/dosenData";
import { apiFetch } from "../../../services/apiService"; // Import service layer

export default function DosenList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [form, setForm] = useState({
        nama: "",
        nim_nip: "", // NIP
        prodi: "",
        password: ""
    });

    const filtered = dosenData.filter((dosen) =>
        dosen.name.toLowerCase().includes(search.toLowerCase()) ||
        dosen.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddDosen = async (e) => {
        e.preventDefault();
        setModalError(null);
        setLoading(true);

        const newDosen = {
            nim_nip: form.nim_nip,
            password: form.password,
            nama: form.nama,
            role: 'dosen', // Ditentukan secara hardcode di FE
            prodi: form.prodi
        };

        try {
            // Memanggil endpoint baru: /auth/register/admin
            const data = await apiFetch("/auth/register/admin", "POST", newDosen);
            
            console.log("Dosen berhasil terdaftar:", data);

            // TODO: Setelah sukses, tambahkan data ke state lokal atau refresh list
            
            alert(`✅ Dosen ${data.nama} berhasil didaftarkan!`);
            setIsModalOpen(false);
            setForm({ nama: "", nim_nip: "", prodi: "", password: "" });

        } catch (err) {
            setModalError(err.message || "Gagal mendaftarkan dosen. Cek koneksi atau NIP.");
        } finally {
            setLoading(false);
        }
    };


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
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#1E4F91] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#163E74] transition flex items-center gap-2"
                >
                    <UserPlus size={16} />
                    Add New Lecturer
                </button>
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {filtered.map((dosen) => (
                    <DosenCard key={dosen.id} dosen={dosen} />
                ))}
            </div>

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
                                    disabled={loading}
                                    className="bg-[#1E4F91] text-white text-sm px-6 py-2 rounded-md hover:bg-[#163E74] transition disabled:bg-gray-400 flex items-center gap-2"
                                >
                                    <Save size={16}/>
                                    {loading ? "Saving..." : "Save Lecturer"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}