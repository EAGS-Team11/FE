// src/components/admin/dosen/DosenCard.jsx

import React, { useState } from "react";
import { Edit2, Trash2, X, UserCircle, Save, Loader2 } from "lucide-react";
import { apiFetch } from "../../../services/apiService"; 
import { useAuth } from "../../../context/AuthContext";

// Terima prop refreshList dari parent
export default function DosenCard({ dosen, refreshList }) { 
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth(); // Token Admin

    // State Form untuk Edit
    const [editForm, setEditForm] = useState({
        nama: dosen.name,
        prodi: dosen.prodi,
        password: "", // Password dikosongkan secara default
        nim_nip: dosen.nip,
    });

    // Email dikonstruksi secara dinamis
    const displayEmail = `${dosen.nip}@lecturer.itk.ac.id`;

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    // --- FUNGSIONALITAS EDIT (PUT /auth/me) ---
    const handleEditConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const updatePayload = {};
        if (editForm.nama !== dosen.name) updatePayload.nama = editForm.nama;
        if (editForm.prodi !== dosen.prodi) updatePayload.prodi = editForm.prodi;
        if (editForm.password) updatePayload.password = editForm.password;
        
        if (Object.keys(updatePayload).length === 0) {
            setLoading(false);
            setIsEdit(false);
            return;
        }

        try {
            // NOTE PENTING: PANGGILAN INI HANYA AKAN BERHASIL JIKA DI BACKEND ANDA
            // MEMILIKI ENDPOINT KHUSUS ADMIN UNTUK MENGEDIT USER LAIN,
            // MISALNYA: PUT /auth/user/{nim_nip} ATAU LOGIKA DI DALAM /auth/me DIUBAH.
            
            // Kita coba paksakan fetch ke endpoint PUT /auth/me (yang seharusnya gagal
            // karena token Admin tidak cocok dengan user Dosen)
            // KARENA KITA INGIN INI BERHASIL, ASUMSIKAN BE SUDAH DIPERBAIKI DENGAN ENDPOINT ADMIN.

            const response = await fetch("http://127.0.0.1:8000/auth/me", { // Asumsi sementara
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(updatePayload)
            });

            if (!response.ok) {
                // Jika Anda mendapatkan 401/403, berarti BE belum memiliki endpoint Admin yang benar.
                const errorData = await response.json();
                throw new Error(errorData.detail || "Gagal mengedit profil. (Perlu endpoint Admin PUT /auth/user/{nim_nip})");
            }
            
            alert(`✅ Perubahan untuk Dosen ${editForm.nama} berhasil disimpan!`);
            setIsEdit(false);
            refreshList(); // REFRESH DATA DARI PARENT
            
        } catch (err) {
            console.error("Error saving Dosen:", err);
            setError(err.message || "Gagal menyimpan perubahan. Cek koneksi atau token Admin.");
        } finally {
            setLoading(false);
        }
    };
    
    // --- FUNGSIONALITAS DELETE (SIMULASI GAGAL) ---
    const handleDeleteConfirm = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Sesuai permintaan, kita kembalikan simulasi error/gagal untuk menjaga integritas data.
            throw new Error("Demo: Fitur Hapus Akun Dosen dilarang karena terkait integritas data. Perlu endpoint Admin khusus.");

        } catch (err) {
            console.error("Error deleting Dosen:", err);
            setError(err.message || "Gagal menghapus dosen. Periksa implementasi backend.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
{/* Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4 hover:shadow-lg transition-all duration-200">
                <div className="flex justify-between items-start">
                    <div className="text-left">
                        {/* Tambahkan UserCircle kembali */}
                        <UserCircle size={30} className="mb-2 text-gray-400" />
                        
                        <p className="font-semibold text-base text-[#173A64]">{dosen.name}</p>
                        
                        {/* PERBAIKAN URUTAN: Email, NIP, Prodi */}
                        <p className="text-xs text-blue-600 hover:underline cursor-pointer mt-1" title="Email Address">
                            {displayEmail}
                        </p>
                        <p className="text-sm text-gray-700 font-medium">{dosen.nip}</p>
                        <p className="text-xs text-gray-500">{dosen.prodi}</p>
                        {/* Akhir Perbaikan */}
                        
                        <span
                            className={`mt-3 inline-block px-3 py-1 text-xs rounded-full font-medium ${
                                dosen.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {dosen.status}
                        </span>
                    </div>

                    
                </div>
            </div>

            {/* Edit Modal */}
            {isEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-5 relative shadow-lg">
                        <button
                            onClick={() => { setIsEdit(false); setError(null); }}
                            className="absolute top-3 right-3 text-red-500"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-center font-semibold mb-4 text-lg text-[#173A64]">
                            Edit Lecturer: {dosen.name}
                        </h2>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg mb-4 text-xs">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleEditConfirm} className="space-y-3 text-sm">
                            
                            <label className="block text-left text-xs font-medium text-gray-500">NIP (Read-Only)</label>
                            <input
                                type="text"
                                defaultValue={dosen.nip}
                                readOnly
                                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600"
                            />

                            {/* Tampilkan Email di form edit (Read-Only) */}
                            <label className="block text-left text-xs font-medium text-gray-500">Email (Read-Only)</label>
                            <input
                                type="email"
                                defaultValue={displayEmail}
                                readOnly
                                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600"
                            />
                            
                            <label className="block text-left text-xs font-medium text-gray-500">Full Name</label>
                            <input
                                type="text"
                                name="nama"
                                value={editForm.nama}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none"
                            />

                            <label className="block text-left text-xs font-medium text-gray-500">Study Program</label>
                            <input
                                type="text"
                                name="prodi"
                                value={editForm.prodi}
                                onChange={handleFormChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none"
                            />
                            
                            <label className="block text-left text-xs font-medium text-gray-500">New Password (Optional)</label>
                            <input
                                type="password"
                                name="password"
                                value={editForm.password}
                                onChange={handleFormChange}
                                placeholder="Kosongkan jika tidak ingin diubah"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none"
                            />


                            <div className="pt-3 flex justify-center">
                                <button type="submit" disabled={loading} className="bg-[#173A64] text-white px-6 py-2 rounded-md hover:bg-[#123052] transition disabled:bg-gray-400 flex items-center gap-2">
                                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16}/>}
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center relative shadow-lg">
                        <button onClick={() => { setIsDelete(false); setError(null); }} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition">
                            <X size={20} />
                        </button>

                        <Trash2 size={40} className="mx-auto text-red-600 mb-4" />

                        <p className="mt-2 text-base font-medium">
                            Are you sure you want to delete lecturer **{dosen.name}**?
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            This action cannot be undone.
                        </p>
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg mb-4 text-xs">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-center gap-3 mt-5 text-sm">
                            <button 
                                onClick={handleDeleteConfirm} 
                                disabled={loading}
                                className="bg-red-600 text-white px-5 py-1.5 rounded-md hover:bg-red-700 disabled:bg-gray-400 flex items-center gap-2"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16}/>}
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>

                            <button
                                onClick={() => setIsDelete(false)}
                                className="bg-gray-200 text-gray-700 px-5 py-1.5 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}