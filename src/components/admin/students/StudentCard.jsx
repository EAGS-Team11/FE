// src/components/admin/students/StudentCard.jsx

import React, { useState } from "react";
import { Edit2, Trash2, X, UserCircle, Save, Loader2 } from "lucide-react";
// Import apiFetch dan useAuth jika diperlukan di sini (asumsi dipanggil di parent List)

export default function StudentCard({ student, refreshList }) {
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // State Form untuk Edit (untuk demo, tidak terikat ke BE)
    const [editForm, setEditForm] = useState({
        name: student.name,
        prodi: student.prodi,
        password: "",
    });

    const displayEmail = student.email; // Email sudah tersedia di prop student

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditConfirm = (e) => {
        e.preventDefault();
        // Logika PUT API akan dipanggil di sini.
        // Asumsi: Jika sukses, panggil refreshList().
        console.log("Simulasi Edit Student:", editForm);
        // if (refreshList) refreshList();
        setIsEdit(false);
    };

    const handleDeleteConfirm = () => {
        // Logika DELETE API akan dipanggil di sini.
        // Asumsi: Jika sukses, panggil refreshList().
        console.log("Simulasi Delete Student:", student.nim);
        // if (refreshList) refreshList();
        setIsDelete(false);
    };

    return (
        <>
            {/* Card Utama (Student Card) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4 hover:shadow-lg transition-all duration-200">
                <div className="flex justify-between items-start">
                    <div className="text-left">
                        {/* Tambahkan Ikon UserCircle */}
                        <UserCircle size={30} className="mb-2 text-gray-400" />
                        
                        <p className="font-semibold text-base text-[#173A64]">{student.name}</p>
                        
                        {/* PERUBAHAN: Email, NIM, Prodi */}
                        <p className="text-xs text-blue-600 hover:underline cursor-pointer mt-1" title="Email Address">
                            {displayEmail}
                        </p>
                        <p className="text-sm text-gray-700 font-medium">{student.nim}</p>
                        <p className="text-xs text-gray-500">{student.prodi}</p>
                        
                        <span
                            className={`mt-3 inline-block px-3 py-1 text-xs rounded-full font-medium ${
                                student.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {student.status}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => { setIsEdit(true); setEditForm({name: student.name, prodi: student.prodi, password: ""}); setError(null); }}
                            className="bg-gray-100 p-1.5 rounded-md hover:bg-gray-200 transition"
                            title="Edit Profile"
                        >
                            <Edit2 size={14} />
                        </button>

                        <button
                            onClick={() => { setIsDelete(true); setError(null); }}
                            className="text-red-500 bg-gray-100 p-1.5 rounded-md hover:bg-red-100 transition"
                            title="Delete Account"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
            {/* Edit Modal (Mirip DosenCard) */}
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
                            Edit Student: {student.name}
                        </h2>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg mb-4 text-xs">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleEditConfirm} className="space-y-3 text-sm">
                            
                            <label className="block text-left text-xs font-medium text-gray-500">NIM (Read-Only)</label>
                            <input
                                type="text"
                                defaultValue={student.nim}
                                readOnly
                                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600"
                            />
                            
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
                                name="name"
                                value={editForm.name}
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
                            Are you sure you want to delete student **{student.name}**?
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
