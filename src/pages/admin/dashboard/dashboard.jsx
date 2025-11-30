import React from "react";
import { Users, GraduationCap, BookOpen, Layers, Activity, Cpu, FileText } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen pb-10">
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-[#173A64] mb-6">Admin Dashboard</h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* TOTAL LECTURERS */}
        <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#173A] hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Lecturers</p>
              <h2 className="text-2xl font-semibold mt-1">24</h2>
            </div>
            <Users size={32} className="text-[#173A64]" />
          </div>
        </div>

        {/* TOTAL STUDENTS */}
        <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#173A] hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <h2 className="text-2xl font-semibold mt-1">820</h2>
            </div>
            <GraduationCap size={32} className="text-[#173A64]" />
          </div>
        </div>

        {/* FACULTIES */}
        <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#173A] hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Faculties</p>
              <h2 className="text-2xl font-semibold mt-1">6</h2>
            </div>
            <Layers size={32} className="text-[#173A64]" />
          </div>
        </div>

        {/* STUDY PROGRAMS */}
        <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#173A] hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Study Programs</p>
              <h2 className="text-2xl font-semibold mt-1">18</h2>
            </div>
            <BookOpen size={32} className="text-[#173A64]" />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* AI ANALYTICS */}
        <div className="bg-white shadow-md rounded-xl p-6 col-span-2 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-4">
            <Cpu size={20} /> AI Usage Overview
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center shadow-sm">
              <p className="text-sm text-gray-500">Essays Graded</p>
              <h3 className="text-xl font-semibold">1,240</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center shadow-sm">
              <p className="text-sm text-gray-500">Avg Processing Time</p>
              <h3 className="text-xl font-semibold">11s</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center shadow-sm">
              <p className="text-sm text-gray-500">AI Accuracy</p>
              <h3 className="text-xl font-semibold">94%</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center shadow-sm">
              <p className="text-sm text-gray-500">Flagged Cases</p>
              <h3 className="text-xl font-semibold">32</h3>
            </div>
          </div>
        </div>

        {/* SYSTEM HEALTH */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-4">
            <Activity size={20} /> System Health
          </h2>

          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span>Server Status</span>
              <span className="text-green-600 font-semibold">Online</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Database</span>
              <span className="text-green-600 font-semibold">Connected</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Uptime</span>
              <span className="font-semibold">99.8%</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Concurrent Users</span>
              <span className="font-semibold">128</span>
            </li>
          </ul>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-8 hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-4">
          <FileText size={20} /> Recent System Activities
        </h2>

        <ul className="space-y-3 text-sm">
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
