/* src/pages/dosen/profil/ProfilDosen.jsx */

import React from "react";
import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilDosen() {
  const navigate = useNavigate(); 

  return (
    <div className="max-w-5xl mx-auto py-15">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2 text-4xl">🦉</span> Hello, Lecturer
      </h1>

      <div className="bg-white rounded-md shadow-md mb-6 border border-gray-200">
        <div className="bg-[#f3f5f9] px-4 py-2 flex justify-between items-center rounded-t-md">
          <h2 className="font-semibold text-[#1E3A5F]">My Profile</h2>
          <button
            onClick={() => navigate("/dosen/EditProfilDosen")}
            className="p-1 hover:bg-gray-100 rounded-md transition"
          >
            <Edit2 size={16} className="text-gray-900" />
          </button>
        </div>

        <div className="flex items-center p-6">
          {/* Avatar */}
          <div className="w-1/3 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
              alt="Profile Avatar"
              className="w-28 h-28 rounded-full border border-gray-300"
            />
          </div>

          <div className="w-2/3 text-left">
            <h3 className="font-bold text-gray-800 mb-1">
              Azzatul Nabila Kahar
            </h3>
            <p className="text-base font-semibold text-gray-500 mb-1">ecamayyy</p>
            <a
              href="mailto:11221085@student.itk.ac.id"
              className="text-blue-600 hover:underline"
            >
              11221085@student.itk.ac.id
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-md border border-gray-200 mb-20">
        <div className="bg-[#f3f5f9] px-4 py-2 flex justify-between items-center rounded-t-md">
          <h2 className="font-semibold text-[#1E3A5F]">Personal Information</h2>
          <button
            onClick={() => navigate("/dosen/EditPersonalDosen")}
            className="p-1 hover:bg-gray-100 rounded-md transition"
          >
          <Edit2 size={16} className="text-gray-900 cursor-pointer" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6 text-left">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="font-medium text-gray-800">Azzatul</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="ffont-medium text-gray-800">Nabila</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium text-gray-800">
              11221085@student.itk.ac.id
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">085252525222</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="font-medium text-gray-800">Indonesia</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium text-gray-800">Balikpapan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
