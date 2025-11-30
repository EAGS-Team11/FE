import React, { useState } from "react";
import {
  Users,
  BookOpen,
  BarChart2,
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import logo from "../../assets/logo capstone.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar({ isSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  // STATE UNTUK DROPDOWN
  const [openUserMgmt, setOpenUserMgmt] = useState(false);
  const [openLog, setOpenLog] = useState(false);

  // MENU GROUPS
  const userManagement = [
    { name: "Lecturers", path: "/admin/lecturers" },
    { name: "Students", path: "/admin/students" }
  ];

  const logMonitoring = [
    { name: "System Logs", path: "/admin/logs" },
    { name: "AI Monitoring", path: "/admin/ai-monitoring" }
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#173A64] text-white z-50 transition-transform duration-300
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex flex-col items-center py-6 border-b border-white/20">
        <img src={logo} className="w-20 mb-3" />
        <h3 className="font-semibold text-white text-lg">Admin Panel</h3>
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
        
        <li
          onClick={() => navigate("/admin/faculties")}
          className={`flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer transition-all
            ${location.pathname.includes("/admin/faculties")
              ? "bg-gray-500"
              : "hover:bg-white/10"}`}
        >
          <BookOpen size={18} />
          <span>University Master Data</span>
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

      {/* Logout */}
      <div className="absolute bottom-8 left-5 flex items-center space-x-3 cursor-pointer">
        <LogOut size={16} /> <span>Logout</span>
      </div>
    </div>
  );
}
