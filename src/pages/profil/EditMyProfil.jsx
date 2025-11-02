import React from "react";
import { Lock, Eye, User, Camera, ArrowLeft, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditMyProfil() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto mt-10 font-inter">
      {/* Judul */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        Hello, User <span className="ml-2 text-4xl">🦉</span>
      </h1>

      {/* Card utama */}
      <div className="bg-white rounded-md shadow-md border border-gray-200">
        {/* Header */}
        <div className="bg-[#f3f5f9] px-4 py-2 flex justify-between items-center rounded-t-md">
          <h2 className="font-semibold text-[#1E3A5F]">Edit My Profile</h2>
          <Edit2 size={16} className="text-gray-700" />
        </div>

        {/* Isi */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Kiri - Avatar */}
            <div className="flex flex-col items-center md:w-1/3">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                  alt="Avatar"
                  className="w-32 h-32 rounded-md shadow-md border border-gray-300"
                />
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-100">
                  <Camera size={16} className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Kanan - Form */}
            <div className="md:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 text-left font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#1E3A5F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1 text-left font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#1E3A5F] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Password  */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-1 text-left">Password</h3>
            <p className="text-sm text-gray-500 mb-4 text-left">
              Modify your current password.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current*/}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                  <Lock size={16} className="text-gray-500 mr-2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="flex-grow text-sm outline-none"
                  />
                  <Eye size={16} className="text-gray-500 cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                  <Lock size={16} className="text-gray-500 mr-2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="flex-grow text-sm outline-none"
                  />
                  <Eye size={16} className="text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2 rounded-md hover:bg-[#244772] transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
    </div>
  );
}
