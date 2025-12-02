// src/pages/admin/dashboard/dashboard.jsx

import React from "react";
import { Users, GraduationCap, BookOpen, Layers, Activity, Cpu, FileText } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen pb-10 px-4 md:px-8">
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-[#173A64] mb-6">Admin Dashboard</h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* TOTAL LECTURERS */}
        <div className="bg-white shadow rounded-xl p-4 border-l-4 border-[#173A64]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Lecturers</p>
              <h2 className="text-xl font-semibold mt-1">24</h2>
            </div>
            <Users size={28} className="text-[#173A64]" />
          </div>
        </div>

        {/* TOTAL STUDENTS */}
        <div className="bg-white shadow rounded-xl p-4 border-l-4 border-[#173A64]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <h2 className="text-xl font-semibold mt-1">820</h2>
            </div>
            <GraduationCap size={28} className="text-[#173A64]" />
          </div>
        </div>

        {/* FACULTIES */}
        <div className="bg-white shadow rounded-xl p-4 border-l-4 border-[#173A64]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Faculties</p>
              <h2 className="text-xl font-semibold mt-1">6</h2>
            </div>
            <Layers size={28} className="text-[#173A64]" />
          </div>
        </div>

        {/* STUDY PROGRAMS */}
        <div className="bg-white shadow rounded-xl p-4 border-l-4 border-[#173A64]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Study Programs</p>
              <h2 className="text-xl font-semibold mt-1">18</h2>
            </div>
            <BookOpen size={28} className="text-[#173A64]" />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">

        {/* AI ANALYTICS */}
        <div className="bg-white shadow rounded-xl p-5 col-span-2">
          <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-3">
            <Cpu size={18} /> AI Usage Overview
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg text-center shadow-sm">
              <p className="text-xs text-gray-500">Essays Graded</p>
              <h3 className="text-lg font-semibold">1,240</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center shadow-sm">
              <p className="text-xs text-gray-500">Avg Processing Time</p>
              <h3 className="text-lg font-semibold">11s</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center shadow-sm">
              <p className="text-xs text-gray-500">AI Accuracy</p>
              <h3 className="text-lg font-semibold">94%</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center shadow-sm">
              <p className="text-xs text-gray-500">Flagged Cases</p>
              <h3 className="text-lg font-semibold">32</h3>
            </div>
          </div>
        </div>

        {/* SYSTEM HEALTH */}
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-3">
            <Activity size={18} /> System Health
          </h2>

          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Server Status</span>
              <span className="text-green-600 font-semibold">Online</span>
            </li>
            <li className="flex justify-between">
              <span>Database</span>
              <span className="text-green-600 font-semibold">Connected</span>
            </li>
            <li className="flex justify-between">
              <span>Uptime</span>
              <span className="font-semibold">99.8%</span>
            </li>
            <li className="flex justify-between">
              <span>Concurrent Users</span>
              <span className="font-semibold">128</span>
            </li>
          </ul>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="bg-white shadow rounded-xl p-5 mt-6">
        <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-3">
          <FileText size={18} /> Recent System Activities
        </h2>

        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>📝 New lecturer account created</span>
            <span className="text-gray-500">2 mins ago</span>
          </li>
          <li className="flex justify-between">
            <span>📄 45 essays graded by AI model</span>
            <span className="text-gray-500">1 hour ago</span>
          </li>
          <li className="flex justify-between">
            <span>⚙️ System health check passed</span>
            <span className="text-gray-500">3 hours ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
