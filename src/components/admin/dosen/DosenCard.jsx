// src/components/admin/dosen/DosenCard.jsx

import React, { useState } from "react";
import { Edit2, Trash2, X, UserCircle } from "lucide-react"; // Import UserCircle

export default function DosenCard({ dosen }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  
  // Menggunakan data yang lebih sesuai dengan UserOut schema
  const displayEmail = `${dosen.nip}@univ.ac.id`; 

  const handleEditConfirm = (e) => {
      e.preventDefault();
      // Implementasi logic Edit API di sini
      console.log("Saving changes for:", dosen.nip);
      setIsEdit(false);
  };
  
  const handleDeleteConfirm = () => {
    // Implementasi logic Delete API di sini
    console.log("Deleting Dosen:", dosen.nip);
    setIsDelete(false);
  };


  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4 hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start">
          <div className="text-left">
            <UserCircle size={30} className="mb-2 text-gray-400" />
            <p className="font-semibold text-base text-[#173A64]">{dosen.name}</p>
            <p className="text-sm text-gray-700 font-medium mt-1">{dosen.nip}</p>
            <p className="text-xs text-gray-500">{dosen.prodi}</p>
            
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

          <div className="flex gap-2">
            <button
              onClick={() => setIsEdit(true)}
              className="bg-gray-100 p-1.5 rounded-md hover:bg-gray-200 transition"
            >
              <Edit2 size={14} />
            </button>

            <button
              onClick={() => setIsDelete(true)}
              className="text-red-500 bg-gray-100 p-1.5 rounded-md hover:bg-red-100 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 relative shadow-lg">
            <button
              onClick={() => setIsEdit(false)}
              className="absolute top-3 right-3 text-red-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-center font-semibold mb-4 text-lg text-[#173A64]">
              Edit Lecturer: {dosen.name}
            </h2>

            <form onSubmit={handleEditConfirm} className="space-y-3 text-sm">
              
              {/* NIP (Read-Only) */}
              <label className="block text-left text-xs font-medium text-gray-500">NIP (Read-Only)</label>
              <input
                type="text"
                defaultValue={dosen.nip}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600"
              />
              
              {/* Nama */}
              <label className="block text-left text-xs font-medium text-gray-500">Full Name</label>
              <input
                type="text"
                defaultValue={dosen.name}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none"
              />

              {/* Prodi */}
              <label className="block text-left text-xs font-medium text-gray-500">Study Program</label>
              <input
                type="text"
                defaultValue={dosen.prodi}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#173A64] outline-none"
              />


              <div className="pt-3 flex justify-center">
                <button type="submit" className="bg-[#173A64] text-white px-6 py-2 rounded-md hover:bg-[#123052] transition">
                  Save Changes
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
             <button onClick={() => setIsDelete(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition">
                <X size={20} />
             </button>

            <Trash2 size={40} className="mx-auto text-red-600 mb-4" />

            <p className="mt-2 text-base font-medium">
              Are you sure you want to delete lecturer **{dosen.name}**?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3 mt-5 text-sm">
              <button onClick={handleDeleteConfirm} className="bg-red-600 text-white px-5 py-1.5 rounded-md hover:bg-red-700">
                Yes, Delete
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