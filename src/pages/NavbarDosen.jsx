import React, { useState } from "react";
import { Menu, X, BookOpen, MessageSquare, BarChart2 } from "lucide-react";
import logo from "../assets/logo capstone.png";

export default function NavbarDosen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#173A64] text-white flex items-center justify-between px-6 py-3 shadow-md">
        <div className="flex items-center space-x-3">
          <Menu
            size={24}
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2">
          <img src={logo} alt="Essay Grading Logo" className="h-14 w-auto mr-3" />
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#173A64] text-white z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
          <h2 className="font-semibold text-lg">Lecturer Menu</h2>
          <X
            size={22}
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Profil Dosen */}
        <div className="flex flex-col items-center py-6 border-b border-white/20">
          <div className="w-20 h-20 rounded-full bg-gray-300 mb-3"></div>
          <h3 className="font-semibold text-white">Jennifer Carter</h3>
          <p className="text-sm text-gray-300">lecturer</p>
        </div>

        {/* Menu */}
        <div className="p-5 text-sm ">
          <div className="uppercase text-gray-300 text-xs mb-3 text-left">Main Menu</div>
          <ul className="space-y-2">
            <li className="flex items-center space-x-3 hover:bg-white/10 py-2 rounded-md cursor-pointer">
              <BookOpen size={16} /> <span>Courses</span>
            </li>
            <li className="flex items-center space-x-3 hover:bg-white/10 py-2 rounded-md cursor-pointer">
              <MessageSquare size={16} /> <span>AI Grading Review</span>
            </li>
            <li className="flex items-center space-x-3 hover:bg-white/10 py-2 rounded-md cursor-pointer">
              <BarChart2 size={16} /> <span>Class Analytics</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
