import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

import {
  Users,
  BookOpen,
  BarChart2,
  LogOut,
  ChevronDown,
  UserCircle,
  X
} from "lucide-react";

import logo from "../../assets/logo capstone.png";

export default function AdminSidebar({ isSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const userName = user?.nama || "Admin";

  // STATE DROPDOWN
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  // STATE LOGOUT MODAL
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // FUNGSI DROPDOWN
  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
    setActiveMenu(name);
  };

  const handleMenuClick = (menuName, path) => {
    setActiveMenu(menuName);
    setOpenDropdown(null);
    navigate(path);
  };

  const handleChildClick = (parent, sub, path) => {
    setActiveMenu(parent);
    setActiveSubMenu(sub);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#173A64] text-white z-50 
          shadow-xl border-r border-white/10 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex flex-col items-center py-6 border-b border-white/10">
          <img src={logo} className="w-20 mb-2" />
          <h3 className="font-semibold text-white text-base tracking-wide">
            Admin Panel
          </h3>

          {/* USER INFO */}
          <div
            className="flex items-center space-x-2 mt-2 cursor-pointer hover:text-white/80 transition"
            onClick={() => navigate("/admin/dashboard")}
          >
            <UserCircle size={18} />
            <span>Hello, {userName.split(" ")[0]}</span>
          </div>
        </div>

        {/* MENU */}
        <ul className="p-4 space-y-2 text-sm">
          
          {/* DASHBOARD */}
          <li
            onClick={() => handleMenuClick("dashboard", "/admin/dashboard")}
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-md transition-all
              ${
                location.pathname.includes("/admin/dashboard")
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
          >
            <BarChart2 size={17} />
            <span>Dashboard</span>
          </li>

          {/* USER MANAGEMENT */}
          <li>
            <div
              onClick={() => toggleDropdown("userMgmt")}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md
                ${
                  openDropdown === "userMgmt"
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                } transition-all`}
            >
              <div className="flex items-center space-x-3">
                <Users size={17} />
                <span>User Management</span>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform duration-500 ${
                  openDropdown === "userMgmt" ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* CHILD MENU */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openDropdown === "userMgmt" ? "max-h-40" : "max-h-0"
              }`}
            >
              <ul className="ml-10 mt-1 space-y-1">
                <li
                  onClick={() =>
                    handleChildClick("userMgmt", "lecturers", "/admin/lecturers")
                  }
                  className={`px-3 py-2 rounded cursor-pointer ${
                    location.pathname.includes("/admin/lecturers")
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  Lecturers
                </li>

                <li
                  onClick={() =>
                    handleChildClick("userMgmt", "students", "/admin/students")
                  }
                  className={`px-3 py-2 rounded cursor-pointer ${
                    location.pathname.includes("/admin/students")
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  Students
                </li>
              </ul>
            </div>
          </li>

          {/* UNIVERSITY MASTER DATA */}
          <li>
            <div
              onClick={() => toggleDropdown("masterData")}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md
                ${
                  openDropdown === "masterData"
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
            >
              <div className="flex items-center space-x-3">
                <BookOpen size={17} />
                <span>University Master Data</span>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform duration-500 ${
                  openDropdown === "masterData" ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                openDropdown === "masterData" ? "max-h-40" : "max-h-0"
              }`}
            >
              <ul className="ml-10 mt-1 space-y-1">
                <li
                  onClick={() => navigate("/admin/faculties")}
                  className={`px-3 py-2 rounded cursor-pointer ${
                    location.pathname.includes("/admin/faculties")
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  Faculties
                </li>

                <li
                  onClick={() => navigate("/admin/programs")}
                  className={`px-3 py-2 rounded cursor-pointer ${
                    location.pathname.includes("/admin/programs")
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  Study Programs
                </li>
              </ul>
            </div>
          </li>

          {/* LOG & MONITORING */}
          <li>
            <div
              onClick={() => toggleDropdown("log")}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md
                ${
                  openDropdown === "log"
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
            >
              <div className="flex items-center space-x-3">
                <BarChart2 size={17} />
                <span>Log & Monitoring</span>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform duration-500 ${
                  openDropdown === "log" ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                openDropdown === "log" ? "max-h-40" : "max-h-0"
              }`}
            >
              <ul className="ml-10 mt-1 space-y-1">
                <li
                  onClick={() => navigate("/admin/SistemLog")}
                  className={`px-3 py-2 rounded cursor-pointer ${
                    location.pathname.includes("/admin/SistemLog")
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  System Logs
                </li>

                <li
                  onClick={() => navigate("/admin/AiMonitoring")}
                  className={`px-3 py-2 rounded cursor-pointer ${
                    location.pathname.includes("/admin/AiMonitoring")
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  AI Monitoring
                </li>
              </ul>
            </div>
          </li>
        </ul>

        {/* LOGOUT */}
        <div
          onClick={() => setIsLogoutOpen(true)}
          className="absolute bottom-8 left-5 flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-all"
        >
          <LogOut size={16} /> <span>Logout</span>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {isLogoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-xl shadow-lg w-80 p-6 text-center relative">
            <button
              onClick={() => setIsLogoutOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-2 text-gray-800 mt-4">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
