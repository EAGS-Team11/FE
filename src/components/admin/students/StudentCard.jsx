// src/components/admin/students/StudentCard.jsx

import React, { useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";

export default function StudentCard({ student }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-lg transition">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-sm">{student.name}</p>
            <p className="text-xs text-gray-500">{student.email}</p>
            <p className="text-xs">{student.nim}</p>
            <p className="text-xs mt-1">{student.fakultas} - {student.prodi}</p>

            <span
              className={`mt-2 inline-block px-2 py-1 text-xs rounded-md ${
                student.status === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {student.status}
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
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-xl relative">
            <button
              onClick={() => setIsEdit(false)}
              className="absolute top-3 right-3 text-red-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-center font-semibold text-lg mb-4">
              Edit Student
            </h2>

            <form className="space-y-3 text-sm">
              <input type="text" defaultValue={student.name} className="w-full border rounded-md p-2" />
              <input type="email" defaultValue={student.email} className="w-full border rounded-md p-2" />
              <input type="text" defaultValue={student.nim} className="w-full border rounded-md p-2" />
              <input type="text" defaultValue={student.fakultas} className="w-full border rounded-md p-2" />
              <input type="text" defaultValue={student.prodi} className="w-full border rounded-md p-2" />

              <div className="pt-2 flex justify-center">
                <button className="bg-[#173A64] text-white px-6 py-2 rounded-md hover:bg-[#123052]">
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
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center relative">
            <button
              onClick={() => setIsDelete(false)}
              className="absolute top-3 right-3 text-red-500"
            >
              <X size={20} />
            </button>

            <Trash2 size={40} className="mx-auto text-[#173A64]" />

            <p className="mt-3 text-sm">
              Are you sure you want to delete this student?
            </p>

            <div className="flex justify-center gap-3 mt-4 text-sm">
              <button className="bg-[#173A64] text-white px-5 py-1.5 rounded-md">
                Yes, delete
              </button>

              <button
                onClick={() => setIsDelete(false)}
                className="bg-gray-200 px-5 py-1.5 rounded-md hover:bg-gray-300"
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
