import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import DosenCard from "./DosenCard";
import { dosenData } from "../../../data/admin/dosenData";

export default function DosenList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = dosenData.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
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
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1E4F91] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#163E74] transition"
        >
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
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-5 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-center text-lg font-semibold mb-5">
              Add New Lecturer
            </h2>

            <form className="space-y-3 text-sm">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-md p-1.5"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-1.5"
              />

              <input
                type="text"
                placeholder="NIP"
                className="w-full border border-gray-300 rounded-md p-1.5"
              />

              <input
                type="text"
                placeholder="Faculty"
                className="w-full border border-gray-300 rounded-md p-1.5"
              />

              <input
                type="text"
                placeholder="Study Program"
                className="w-full border border-gray-300 rounded-md p-1.5"
              />

              <div className="pt-3 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#1E4F91] text-white text-sm px-5 py-1.5 rounded-md hover:bg-[#163E74] transition"
                >
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
