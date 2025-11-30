import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import {
  Users,
  BookOpen,
  BarChart2,
  LogOut,
  ChevronDown,
  ChevronRight,
  UserCircle,
  X // Import X untuk tombol tutup modal
} from "lucide-react";
import logo from "../../assets/logo capstone.png";

export default function AdminSidebar({ isSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // STATE UNTUK LOGOUT MODAL
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); 
  
  // STATE UNTUK DROPDOWN
  const [openUserMgmt, setOpenUserMgmt] = useState(false);
  const [openMasterData, setOpenMasterData] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  
  const userName = user?.nama || "Admin";

  const handleLogout = () => {
    // Memanggil fungsi logout dari context, yang akan menghapus token dan redirect ke /login
    logout(); 
  };

  // MENU GROUPS
  const userManagement = [
    { name: "Lecturers", path: "/admin/lecturers" },
    { name: "Students", path: "/admin/students" }
  ];
  const masterData = [
    { name: "Faculties", path: "/admin/faculties" },
    { name: "Study Programs", path: "/admin/programs" }
  ];
  const logMonitoring = [
    { name: "System Logs", path: "/admin/logs" },
    { name: "AI Monitoring", path: "/admin/ai-monitoring" }
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#173A64] text-white z-50 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex flex-col items-center py-6 border-b border-white/20">
          <img src={logo} className="w-20 mb-3" alt="Logo"/>
          <h3 className="font-semibold text-white text-lg">Admin Panel</h3>
          
          {/* User Info */}
          <div 
             className="flex items-center space-x-2 mt-2 cursor-pointer hover:text-white/80 transition"
             onClick={() => navigate("/admin/dashboard")}
          >
             <UserCircle size={18} />
             <span className="text-sm">Hello, {userName.split(' ')[0]}</span>
          </div>

        </div>

        {/* MENU LIST */}
        <ul className="p-4 space-y-2 text-sm">

          {/* DASHBOARD */}
          <li
            onClick={() => navigate("/admin/dashboard")}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-all
              ${location.pathname.includes("/admin/dashboard")
                ? "bg-gray-500"
                : "hover:bg-white/10"}`}
          >
            <BarChart2 size={18} />
            <span>Dashboard</span>
          </li>

          {/* USER MANAGEMENT DROPDOWN */}
          <li>
            <div
              onClick={() => setOpenUserMgmt(!openUserMgmt)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/10 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <Users size={18} />
                <span>User Management</span>
              </div>
              {openUserMgmt ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>

            {openUserMgmt && (
              <ul className="ml-10 mt-1 space-y-1">
                {userManagement.map((m) => (
                  <li
                    key={m.path}
                    onClick={() => navigate(m.path)}
                    className={`px-3 py-2 rounded cursor-pointer
                      ${location.pathname.includes(m.path)
                        ? "bg-gray-500"
                        : "hover:bg-white/10"}`}
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* UNIVERSITY MASTER DATA DROPDOWN */}
          <li>
            <div
              onClick={() => setOpenMasterData(!openMasterData)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/10 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <BookOpen size={18} />
                <span>University Master Data</span>
              </div>
              {openMasterData ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>

            {openMasterData && (
              <ul className="ml-10 mt-1 space-y-1">
                {masterData.map((m) => (
                  <li
                    key={m.path}
                    onClick={() => navigate(m.path)}
                    className={`px-3 py-2 rounded cursor-pointer
                      ${location.pathname.includes(m.path)
                        ? "bg-gray-500"
                        : "hover:bg-white/10"}`}
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* LOG & MONITORING DROPDOWN */}
          <li>
            <div
              onClick={() => setOpenLog(!openLog)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/10 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <BarChart2 size={18} />
                <span>Log & Monitoring</span>
              </div>
              {openLog ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>

            {openLog && (
              <ul className="ml-10 mt-1 space-y-1">
                {logMonitoring.map((m) => (
                  <li
                    key={m.path}
                    onClick={() => navigate(m.path)}
                    className={`px-3 py-2 rounded cursor-pointer
                      ${location.pathname.includes(m.path)
                        ? "bg-gray-500"
                        : "hover:bg-white/10"}`}
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

        </ul>

        {/* Logout Button (Fixed Bottom) */}
        <div 
          className="absolute bottom-8 left-5 w-[85%] px-2 py-2 flex items-center justify-start space-x-3 cursor-pointer rounded-md hover:bg-red-700 transition duration-300"
          onClick={() => setIsLogoutOpen(true)}
        >
          <LogOut size={18} className="text-white" /> 
          <span>Logout</span>
        </div>
      </div>
      
      {/* ===== MODAL LOGOUT ===== */}
      {isLogoutOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]">
          <div className="bg-white rounded-2xl shadow-lg w-80 p-6 text-center relative">
             {/* Close button */}
             <button
               onClick={() => setIsLogoutOpen(false)}
               className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
             >
               <X size={20} />
             </button>

            <h2 className="text-lg font-semibold mb-2 text-gray-800 mt-4">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to log out? Your session will end.
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