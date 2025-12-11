// src/pages/NavbarDosen.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  BookOpen,
  MessageSquare,
  BarChart2,
  ChevronDown,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo capstone.png";

export default function NavbarDosen({ isSidebarOpen, setIsSidebarOpen }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // 2. AMBIL DATA USER DARI CONTEXT
  const { user, logout } = useAuth(); 

  const handleNavigation = (menu) => {
    if (menu === "Courses") navigate("/dosen/course");
    // PERUBAHAN 1: Dashboard mengarah ke ClassAnalitik1
    if (menu === "Dashboard") navigate("/dosen/ClassAnalitik1");
    if (menu === "AI Grading Review") navigate("/dosen/AiGrading1");
  };

  const handleLogout = () => {
    // 3. Gunakan fungsi logout dari context (standar)
    if (logout) logout(); 
    // Hapus baris localStorage.removeItem("token"); dan window.location.href karena ditangani oleh context
  };

  const userName = user?.nama || "Lecturer";

  const isActive = (path) => location.pathname.includes(path);

  return (
    <>
      {/* ------------------------------------------- */}
      {/* HEADER BAR (TOP) */}
      {/* ------------------------------------------- */}
      <nav
        className="bg-[#173A64] text-white flex items-center justify-between px-6 py-3 fixed top-0 z-50 transition-all duration-300"
        style={{
          left: isSidebarOpen ? 256 : 0,
          width: isSidebarOpen ? "calc(100% - 256px)" : "100%",
        }}
      >
        <div className="flex items-center space-x-3">
          <Menu
            size={24}
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        <img src={logo} alt="Logo" className="h-14 w-auto mr-3" />
      </nav>

      {/* ------------------------------------------- */}
      {/* SIDEBAR */}
      {/* ------------------------------------------- */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#173A64] text-white z-50 flex flex-col justify-between transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* PROFILE SECTION */}
          <div className="flex flex-col px-5 py-6 border-b border-white/20 relative">
            <div
              className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3 cursor-pointer transition"
              onClick={() => navigate("/dosen/ProfilDosen")}
            >
              <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold text-2xl">
                {user?.nama ? user.nama.charAt(0).toUpperCase() : "D"}
              </div>
            </div>

            <div
              className="relative flex items-center justify-center cursor-pointer select-none"
              onClick={() => navigate("/dosen/ProfilDosen")}
            >
              {/* TAMPILKAN NAMA ASLI DARI DATABASE */}
              <h3 className="font-semibold text-white hover:text-white/80 transition text-center">
                {user?.nama || "Dosen User"} 
              </h3>
              
              {/* Chevron hanya untuk visual / menandakan klik */}
              <ChevronDown
                size={16}
                className="text-white/60 absolute right-0 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
              />
            </div>

            {/* TAMPILKAN ROLE ASLI */}
            <p className="text-sm text-gray-300 mt-1 mb-2 text-center capitalize">
              {user?.role || "Lecturer"}
            </p>
            
            {/* Dropdown Profil (Dikosongkan / Bisa digunakan untuk Edit) */}
            <div
              className={`overflow-hidden transition-all duration-300 mt-2 ${
                isDropdownOpen ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {/* Tambahkan menu profil detail jika diperlukan di sini */}
            </div>
          </div>

          {/* MAIN MENU */}
          <div className="p-3 text-sm">
            <div className="uppercase text-gray-300 text-xs mb-3 text-left px-2">
              Main Menu
            </div>

            <ul className="space-y-1">
              {/* PERUBAHAN 2: Dashboard (Menggantikan Class Analytics) */}
              <li
                onClick={() => handleNavigation("Dashboard")}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all 
                  ${
                    isActive("/dosen/ClassAnalitik1") || location.pathname === "/dosen/course" // Menyorot jika berada di dashboard atau courses
                      ? "bg-white/20 shadow-md"
                      : "hover:bg-white/10"
                  }`}
              >
                <BarChart2 size={18} /> <span>Dashboard</span>
              </li>

              {/* Courses */}
              <li
                onClick={() => handleNavigation("Courses")}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all 
                  ${
                    isActive("/dosen/course")
                      ? "bg-white/20 shadow-md"
                      : "hover:bg-white/10"
                  }`}
              >
                <BookOpen size={18} /> <span>Courses</span>
              </li>

              {/* AI Grading Review */}
              <li
                onClick={() => handleNavigation("AI Grading Review")}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all 
                  ${
                    isActive("/dosen/AiGrading1")
                      ? "bg-white/20 shadow-md"
                      : "hover:bg-white/10"
                  }`}
              >
                <MessageSquare size={18} /> <span>AI Grading Review</span>
              </li>
            </ul>
          </div>
        </div>

        {/* PERUBAHAN 3: LOGOUT DI BAWAH SIDEBAR (Selalu terlihat) */}
        <div className="px-5 py-4 border-t border-white/20">
            <button
                onClick={() => setIsLogoutOpen(true)}
                className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-white/20 transition-all text-sm"
            >
                <LogOut size={18} className="text-white/80" />
                <span className="font-medium">Log Out</span>
            </button>
        </div>
      </div>

      {isLogoutOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]">
          <div className="bg-white rounded-2xl shadow-lg w-80 p-6 text-center animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}