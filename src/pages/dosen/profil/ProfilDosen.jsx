import React from "react";
import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ProfilDosen() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Default data
    const displayNama = user?.nama || "User Dosen";
    const displayNIP = user?.nim_nip || "N/A";
    const displayProdi = user?.prodi || "N/A";

    // Split name
    const nameParts = displayNama.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "—";
    const email = displayNIP !== "N/A" ? `${displayNIP}@lecturer.itk.ac.id` : "N/A";

    return (
        <div className="max-w-5xl mx-auto py-15">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2 text-4xl">🦉</span> Hello, {firstName}
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
                    <div className="w-1/3 flex justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                            alt="Profile Avatar"
                            className="w-28 h-28 rounded-full border border-gray-300"
                        />
                    </div>
                    <div className="w-2/3 text-left">
                        <h3 className="font-bold text-gray-800 mb-1">{displayNama}</h3>
                        <p className="text-base font-semibold text-gray-500 mb-1">
                            {displayNIP} ({displayProdi})
                        </p>
                        <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
                            {email}
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
                        <p className="font-medium text-gray-800">{firstName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="font-medium text-gray-800">{lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">NIP</p>
                        <p className="font-medium text-gray-800">{displayNIP}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium text-gray-800">{email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Program Studi</p>
                        <p className="font-medium text-gray-800">{displayProdi}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
