// src/pages/admin/AdminSidebar.jsx

import React, { useState } from "react";
import {
  Users,
  BookOpen,
  BarChart2,
  LogOut,
  ChevronDown
} from "lucide-react";
import logo from "../../assets/logo capstone.png";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ isSidebarOpen }) {
  const navigate = useNavigate();

  // State dropdown & active menu
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  // Modal state
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
    setActiveMenu(name);
    setActiveSubMenu("");
  };

  const handleMenuClick = (menuName, path) => {
    setActiveMenu(menuName);
    setActiveSubMenu("");
    setOpenDropdown(null);
    navigate(path);
  };

  const handleChildClick = (parentMenu, subMenu, path) => {
    setActiveMenu(parentMenu);
    setActiveSubMenu(subMenu);
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/login"); // arahkan ke halaman login
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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
          <img src={logo} className="w-16 mb-2" />
          <h3 className="font-semibold text-white text-base tracking-wide">
            Admin Panel
          </h3>
        </div>

        {/* MENU */}
        <ul className="p-4 space-y-2 text-sm">
          <li
            onClick={() => handleMenuClick("dashboard", "/admin/dashboard")}
            className={`flex items-center space-x-3 px-4 py-2 cursor-pointer transition-all 
              ${activeMenu === "dashboard" ? "bg-white/20 shadow-md" : "hover:bg-white/10"}`}
          >
            <BarChart2 size={17} />
            <span>Dashboard</span>
          </li>

          {/* USER MANAGEMENT */}
          <li>
            <div
              onClick={() => toggleDropdown("userMgmt")}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer 
                ${activeMenu === "userMgmt" ? "bg-white/20 shadow-md" : "hover:bg-white/10"} transition-all`}
            >
              <div className="flex items-center space-x-3">
                <Users size={17} />
                <span>User Management</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-500 ${openDropdown === "userMgmt" ? "rotate-180" : ""}`}
              />
            </div>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out
              ${openDropdown === "userMgmt" ? "max-h-40" : "max-h-0"}`}
            >
              <ul className="ml-10 mt-1 space-y-1">
                <li
                  onClick={() => handleChildClick("userMgmt", "lecturer", "/admin/lecturers")}
                  className={`px-3 py-2 cursor-pointer text-sm rounded
                    ${activeSubMenu === "lecturer" ? "bg-white/20 shadow-md text-white" : "hover:bg-white/10"}`}
                >
                  Lecturers
                </li>
                <li
                  onClick={() => handleChildClick("userMgmt", "student", "/admin/students")}
                  className={`px-3 py-2 cursor-pointer text-sm rounded
                    ${activeSubMenu === "student" ? "bg-white/20 shadow-md text-white" : "hover:bg-white/10"}`}
                >
                  Students
                </li>
              </ul>
            </div>
          </li>

          {/* FACULTIES */}
          <li
            onClick={() => handleMenuClick("faculties", "/admin/faculties")}
            className={`flex items-center space-x-3 px-4 py-2 cursor-pointer transition-all 
              ${activeMenu === "faculties" ? "bg-white/20 shadow-md" : "hover:bg-white/10"}`}
          >
            <BookOpen size={17} />
            <span>University Master Data</span>
          </li>

          {/* LOG & MONITORING */}
          <li>
            <div
              onClick={() => toggleDropdown("log")}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer 
                ${activeMenu === "log" ? "bg-white/20 shadow-md" : "hover:bg-white/10"} transition-all`}
            >
              <div className="flex items-center space-x-3">
                <BarChart2 size={17} />
                <span>Log & Monitoring</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-500 ${openDropdown === "log" ? "rotate-180" : ""}`}
              />
            </div>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out
              ${openDropdown === "log" ? "max-h-40" : "max-h-0"}`}
            >
              <ul className="ml-10 mt-1 space-y-1">
                <li
                  onClick={() => handleChildClick("log", "systemLogs", "/admin/SistemLog")}
                  className={`px-3 py-2 cursor-pointer text-sm rounded
                    ${activeSubMenu === "systemLogs" ? "bg-white/20 shadow-md text-white" : "hover:bg-white/10"}`}
                >
                  System Logs
                </li>
                <li
                  onClick={() => handleChildClick("log", "aiMonitoring", "/admin/AiMonitoring")}
                  className={`px-3 py-2 cursor-pointer text-sm rounded
                    ${activeSubMenu === "aiMonitoring" ? "bg-white/20 shadow-md text-white" : "hover:bg-white/10"}`}
                >
                  AI Monitoring
                </li>
              </ul>
            </div>
          </li>
        </ul>

        {/* LOGOUT */}
        <div
          onClick={handleLogout}
          className="absolute bottom-8 left-5 flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-all"
        >
          <LogOut size={16} /> <span>Logout</span>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
