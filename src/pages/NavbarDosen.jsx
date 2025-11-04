import React, { useState } from "react";
import { Menu, X, BookOpen, MessageSquare, BarChart2, ChevronDown, LogOut } from "lucide-react";
import logo from "../assets/logo capstone.png";

export default function NavbarDosen({ isSidebarOpen, setIsSidebarOpen, activeMenu }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-3"></div>

          {/* Nama + Dropdown */}
          <div className="relative flex items-center justify-center">
            <h3 className="font-semibold text-white">Jennifer Carter</h3>
            <ChevronDown
              size={16}
              className="text-white/50 absolute right-0 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
          </div>

          {/* Lecturer */}
          <p className="text-sm text-gray-300 mt-1 mb-2 text-center">lecturer</p>

          {/* Dropdown Log Out */}
          <div
            className={`overflow-hidden transition-all duration-300 mt-2 ${
              isDropdownOpen ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex items-center space-x-2 pl-0">
              <LogOut size={16} className="text-white/70" />
              <span className="text-white text-sm cursor-pointer pl-5">Log Out</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="p-5 text-sm">
          <div className="uppercase text-gray-300 text-xs mb-3 text-left">Main Menu</div>
          <ul className="space-y-2">
            <li
              className={`flex items-center space-x-3 py-2 rounded-md cursor-pointer ${
                activeMenu === "Courses" ? "bg-gray-600" : "hover:bg-white/10"
              }`}
            >
              <BookOpen size={16} /> <span>Courses</span>
            </li>
            <li
              className={`flex items-center space-x-3 py-2 rounded-md cursor-pointer ${
                activeMenu === "AI Grading Review" ? "bg-gray-600" : "hover:bg-white/10"
              }`}
            >
              <MessageSquare size={16} /> <span>AI Grading Review</span>
            </li>
            <li
              className={`flex items-center space-x-3 py-2 rounded-md cursor-pointer ${
                activeMenu === "Class Analytics" ? "bg-gray-600" : "hover:bg-white/10"
              }`}
            >
              <BarChart2 size={16} /> <span>Class Analytics</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
