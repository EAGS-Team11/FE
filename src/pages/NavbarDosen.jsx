import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); // 🔹 modal logout
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (menu) => {
    if (menu === "Courses") navigate("/dosen/course");
    if (menu === "AI Grading Review") navigate("/dosen/AiGrading1");
    if (menu === "Class Analytics") navigate("/dosen/ClassAnalitik1");
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token"); // contoh logika logout
    window.location.href = "/login"; // redirect ke halaman login
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <>
      {/* Navbar */}
      <nav
        className="bg-[#173A64] text-white flex items-center justify-between px-6 py-3 shadow-md fixed top-0 z-50 transition-all duration-300"
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

        <div className="flex items-center space-x-2">
          <img src={logo} alt="Essay Grading Logo" className="h-14 w-auto mr-3" />
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#173A64] text-white z-50 transform transition-transform duration-300 py-5 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profil Dosen */}
        <div className="flex flex-col px-5 py-6 border-b border-white/20 relative">
          <div
            className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3 cursor-pointer hover:ring-2 hover:ring-white/40 transition"
            onClick={() => navigate("/dosen/ProfilDosen")}
          ></div>

          <div
            className="relative flex items-center justify-center cursor-pointer select-none"
            onClick={() => navigate("/dosen/ProfilDosen")}
          >
            <h3 className="font-semibold text-white hover:text-white/80 transition">
              Jennifer Carter
            </h3>
            <ChevronDown
              size={16}
              className="text-white/50 absolute right-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
            />
          </div>

          <p className="text-sm text-gray-300 mt-1 mb-2 text-center">lecturer</p>

          {/* Dropdown kecil untuk logout */}
          <div
            className={`overflow-hidden transition-all duration-300 mt-2 ${
              isDropdownOpen ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              onClick={() => setIsLogoutOpen(true)} // 🔹 buka modal logout
              className="flex items-center space-x-2 pl-0 cursor-pointer hover:text-gray-300 transition"
            >
              <LogOut size={16} className="text-white/70" />
              <span className="text-white text-sm pl-5">Log Out</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="p-3 text-sm">
          <div className="uppercase text-gray-300 text-xs mb-3 text-left px-2">
            Main Menu
          </div>
          <ul className="space-y-1">
            <li
              onClick={() => handleNavigation("Courses")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-all ${
                isActive("/dosen/course") ? "bg-gray-500" : "hover:bg-white/10"
              }`}
            >
              <BookOpen size={18} /> <span>Courses</span>
            </li>

            <li
              onClick={() => handleNavigation("AI Grading Review")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-all ${
                isActive("/dosen/AiGrading1") ? "bg-gray-500" : "hover:bg-white/10"
              }`}
            >
              <MessageSquare size={18} /> <span>AI Grading Review</span>
            </li>

            <li
              onClick={() => handleNavigation("Class Analytics")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-all ${
                isActive("/dosen/ClassAnalitik1") ? "bg-gray-500" : "hover:bg-white/10"
              }`}
            >
              <BarChart2 size={18} /> <span>Class Analytics</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Modal Logout */}
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
