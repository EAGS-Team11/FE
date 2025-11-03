import React from "react";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditPersonal() {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    alert("Perubahan berhasil disimpan!");
    navigate("/profil");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 py-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2 text-4xl">🦉</span> Hello, User
      </h1>

      <div className="bg-white rounded-md shadow-md border border-gray-200">
        {/* Header */}
        <div className="bg-[#f3f5f9] px-4 py-2 flex justify-between items-center rounded-t-md">
          <h2 className="font-semibold text-[#1E3A5F]">
            Edit Personal Information
          </h2>
          <button
            onClick={handleSave}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <Save size={18} className="text-gray-700" />
          </button>
        </div>

        <form className="p-6 grid grid-cols-2 gap-6 text-left">
          <div>
            <label className="text-sm text-gray-800 font-bold">First Name</label>
            <input
              type="text"
              placeholder="Masukkan nama depan"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-800 font-bold">Last Name</label>
            <input
              type="text"
              placeholder="Masukkan nama belakang"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-800 font-bold">Email Address</label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-800 font-bold">Phone</label>
            <input
              type="tel"
              placeholder="Masukkan nomor telepon"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-800 font-bold">Country</label>
            <input
              type="text"
              placeholder="Masukkan negara"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-800 font-bold">City</label>
            <input
              type="text"
              placeholder="Masukkan kota"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </form>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    </div>
  );
}
