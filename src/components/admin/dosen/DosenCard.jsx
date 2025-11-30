import React, { useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";

export default function DosenCard({ dosen }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4 hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-sm">{dosen.name}</p>
            <p className="text-xs text-gray-500">{dosen.email}</p>
            <p className="text-xs">{dosen.nip}</p>
            <p className="text-xs mt-1">{dosen.fakultas} - {dosen.prodi}</p>

            <span
              className={`mt-2 inline-block px-2 py-1 text-xs rounded-md ${
                dosen.status === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
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
              className="text-red-500 hover:text-red-700 transition"
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

            <h2 className="text-center font-semibold mb-4 text-lg">
              Edit Lecturer
            </h2>

            <form className="space-y-3 text-sm">
              <input
                type="text"
                defaultValue={dosen.name}
                className="w-full border border-gray-300 rounded-md p-2"
              />

              <input
                type="email"
                defaultValue={dosen.email}
                className="w-full border border-gray-300 rounded-md p-2"
              />

              <input
                type="text"
                defaultValue={dosen.nip}
                className="w-full border border-gray-300 rounded-md p-2"
              />

              <input
                type="text"
                defaultValue={dosen.fakultas}
                className="w-full border border-gray-300 rounded-md p-2"
              />

              <input
                type="text"
                defaultValue={dosen.prodi}
                className="w-full border border-gray-300 rounded-md p-2"
              />

              <div className="pt-3 flex justify-center">
                <button className="bg-[#173A64] text-white px-6 py-2 rounded-md hover:bg-[#123052] transition">
                  Save
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
            <button
              onClick={() => setIsDelete(false)}
              className="absolute top-3 right-3 text-red-500"
            >
              <X size={20} />
            </button>

            <Trash2 size={40} className="mx-auto text-[#173A64]" />

            <p className="mt-4 text-sm">
              Are you sure you want to delete this lecturer?
            </p>

            <div className="flex justify-center gap-3 mt-5 text-sm">
              <button className="bg-[#173A64] text-white px-5 py-1.5 rounded-md hover:bg-[#123052]">
                Yes, delete
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
