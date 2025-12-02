// src/pages/admin/dashboard/dashboard.jsx

import React, { useState, useEffect } from "react";
import { Users, GraduationCap, BookOpen, Layers, Activity, Cpu, FileText, Loader2 } from "lucide-react";
// Import service layer
import { apiFetch } from "../../../services/apiService"; 

const StatCard = ({ title, value, icon: Icon, color, className = "" }) => (
    <div className={`bg-white shadow rounded-xl p-4 border-l-4 border-${color}-600 ${className}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-xl font-semibold mt-1 text-[#173A64]">{value}</h2>
            </div>
            <Icon size={28} className={`text-${color}-600`} />
        </div>
    </div>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalLecturers: 0,
        totalStudents: 0,
        totalFaculties: 0,
        totalCourses: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Fetch Users (for Lecturers and Students count) and Courses simultaneously
                const [usersData, coursesData] = await Promise.all([
                    apiFetch("/auth/users", "GET"),
                    apiFetch("/course/", "GET"),
                ]);

                const lecturers = usersData.filter(u => u.role === 'dosen');
                const students = usersData.filter(u => u.role === 'mahasiswa');
                
                // Calculate unique Faculties/Prodi (Simplistic: count unique prodi)
                const uniqueProdi = new Set(usersData.map(u => u.prodi).filter(p => p));
                
                setStats({
                    totalLecturers: lecturers.length,
                    totalStudents: students.length,
                    totalFaculties: Array.from(uniqueProdi).length, // Menggunakan prodi sebagai proxy fakultas
                    totalCourses: coursesData.length,
                });

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError(err.message || "Gagal memuat data dashboard. Periksa koneksi API.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
                <Loader2 size={32} className="animate-spin text-[#173A64] mb-4" />
                <p className="text-[#173A64] font-semibold">Loading Dashboard Data...</p>
            </div>
        );
    }

    if (error) {
         return (
            <div className="text-center text-red-500 py-10 font-bold bg-red-50 rounded-lg border border-red-200 mt-5">
                Error: {error}
                <br/><span className="text-sm font-normal text-black">Pastikan terminal backend (uvicorn) berjalan dan Admin token valid.</span>
            </div>
        );
    }


    return (
        <div className="min-h-screen pb-10 px-4 md:px-8">
            {/* TITLE */}
            <h1 className="text-2xl font-bold text-[#173A64] mb-6">Admin Dashboard</h1>
            
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700">Main Statistics</h2>
            </div>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <StatCard
                    title="Total Lecturers"
                    value={stats.totalLecturers}
                    icon={Users}
                    color="blue"
                    className="border-[#173A64]"
                />

                <StatCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={GraduationCap}
                    color="green"
                    className="border-green-600"
                />

                <StatCard
                    title="Total Courses"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    color="indigo"
                    className="border-indigo-600"
                />

                <StatCard
                    title="Study Programs (Unique)"
                    value={stats.totalFaculties}
                    icon={Layers}
                    color="yellow"
                    className="border-yellow-600"
                />
            </div>

            {/* BOTTOM SECTION - DUMMY (FEATURING LIVE METRICS) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">

                {/* AI ANALYTICS (Dummy Data) */}
                <div className="bg-white shadow rounded-xl p-5 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-3">
                        <Cpu size={18} /> AI Usage Overview (Dummy)
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

                {/* SYSTEM HEALTH (Dummy Data) */}
                <div className="bg-white shadow rounded-xl p-5">
                    <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-3">
                        <Activity size={18} /> System Health (Dummy)
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

            {/* RECENT ACTIVITIES (Dummy Data) */}
            <div className="bg-white shadow rounded-xl p-5 mt-6">
                <h2 className="text-lg font-semibold text-[#173A64] flex items-center gap-2 mb-3">
                    <FileText size={18} /> Recent System Activities (Dummy)
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