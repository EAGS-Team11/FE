import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import StudentCard from "./StudentCard";
import { studentData } from "../../../data/admin/studentData";

export default function StudentList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = studentData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
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
          onClick={() => setIsModalOpen(true)}
          className="bg-[#173A64] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#123052]"
        >
          Add New Student
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

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

            <h2 className="text-lg font-semibold text-center mb-4">
              Add New Student
            </h2>

            <form className="space-y-3 text-sm">
              <input type="text" placeholder="Full Name" className="w-full border rounded-md p-2" />
              <input type="email" placeholder="Email" className="w-full border rounded-md p-2" />
              <input type="text" placeholder="NIM" className="w-full border rounded-md p-2" />
              <input type="text" placeholder="Faculty" className="w-full border rounded-md p-2" />
              <input type="text" placeholder="Study Program" className="w-full border rounded-md p-2" />

              <div className="pt-2 flex justify-center">
                <button className="bg-[#173A64] text-white px-6 py-2 rounded-md hover:bg-[#123052]">
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
