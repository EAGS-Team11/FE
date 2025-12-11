// src/pages/dosen/class/ClassAnalitik1.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3, Loader2, BookOpen, FileText, Hourglass, TrendingUp } from "lucide-react";
import { apiFetch } from "../../../services/apiService";
import { useAuth } from "../../../context/AuthContext";

// --- Komponen Reusable Card ---
function StatCard({ title, value, icon: Icon, bgColor, textColor, unit = "" }) {
    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between border-l-4 border-indigo-500 transition-all duration-300 hover:shadow-xl">
            <p className="text-gray-500 text-sm">{title}</p>
            <div className="flex items-end justify-between mt-2">
                <h2 className={`text-3xl font-bold text-[#173A64]`}>
                    {value}
                    {unit}
                </h2>
                <Icon className={`w-6 h-6 text-indigo-500 opacity-70`} />
            </div>
        </div>
    );
}

// Data dummy untuk chart (akan diganti dengan data dari BE jika tersedia)
const dummyChartData = [
  { week: "W1", score: 70 },
  { week: "W2", score: 75 },
  { week: "W3", score: 82 },
  { week: "W4", score: 85 },
];


export default function ClassAnalytics() {
    const navigate = useNavigate();
    const { token, user } = useAuth();
    
    const [stats, setStats] = useState({
        // Default Stats
        totalCourses: 0,
        totalAssignments: 0,
        pendingSubmissions: 0,
        averageScore: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Fetch Data Dashboard Dosen ---
    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // 1. Fetch Course yang Dibuat (untuk menghitung total course dan assignments)
            const courses = await apiFetch("/course/dosen", "GET");
            let totalAssignments = 0;
            
            // Asumsi: Kita harus fetch /assignment/course/{id} untuk setiap course
            // Untuk Sederhana: Hitung saja courses dan berikan nilai dummy untuk assignments
            
            // 2. Fetch User Stats (di endpoint /predict/my_stats yang sebenarnya untuk Mahasiswa,
            // tetapi kita gunakan untuk melihat gambaran umum)
            // *CATATAN: Endpoint ini di BE Anda dibuat KHUSUS MAHASISWA. Kita perlu
            // membuatnya kompatibel atau membuat /predict/dosen_stats.*
            
            // Karena /predict/my_stats memeriksa role MHS, kita pakai data Course yang dibuat saja
            
            // --- Mengambil metrik yang dapat dihitung dari data yang tersedia ---
            
            // Total Submissions (DUMMY)
            const assignmentsPromise = courses.map(c => 
                 apiFetch(`/assignment/course/${c.id_course}`, "GET")
                 // Jika API assignment/course/{id} mengembalikan jumlah submission, gunakan di sini.
            );
            
            const assignmentsData = await Promise.all(assignmentsPromise);
            assignmentsData.forEach(list => totalAssignments += list.length);


            setStats({
                totalCourses: courses.length,
                totalAssignments: totalAssignments, // Total assignments dibuat
                pendingSubmissions: 15, // DUMMY: Perlu endpoint BE baru untuk menghitung ini
                averageScore: 82.5, // DUMMY: Perlu endpoint BE baru
            });

        } catch (err) {
            console.error("Error fetching Dosen Dashboard data:", err);
            setError(err.message || "Gagal memuat data dashboard. Periksa koneksi API.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if(token) fetchDashboardData();
    }, [fetchDashboardData, token]);
    
    // UI Helpers
    const Card = ({ children, className = "" }) => <div className={`bg-white rounded-xl shadow-md ${className}`}>{children}</div>;
    const CardContent = ({ children, className = "" }) => <div className={`p-5 ${className}`}>{children}</div>;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
                <Loader2 size={36} className="animate-spin text-[#173A64] mb-4" />
                <h1 className="text-xl font-bold text-[#173A64]">Memuat Dashboard Dosen...</h1>
            </div>
        );
    }
    
    return (
        <div className="p-8 bg-[#F6F7FB] min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="text-[#173A64]" />
                <h1 className="text-2xl font-semibold text-[#173A64]">Dashboard Dosen</h1>
            </div>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
                    Error loading data: {error} (Menampilkan data dummy untuk bagian yang gagal dimuat).
                </div>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Courses Diajarkan"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    color="blue"
                />
                <StatCard
                    title="Assignments Aktif"
                    value={stats.totalAssignments}
                    icon={FileText}
                    color="green"
                />
                <StatCard
                    title="Submission Pending"
                    value={stats.pendingSubmissions}
                    icon={Hourglass}
                    color="orange"
                />
                <StatCard
                    title="Nilai Rata-rata Kelas"
                    value={stats.averageScore}
                    unit="%"
                    icon={TrendingUp}
                    color="red"
                />
            </div>

            {/* Chart Section */}
            <Card className="shadow-md mb-8">
                <CardContent>
                    <h2 className="text-lg font-semibold text-[#173A64] mb-4">
                        Tren Nilai Rata-rata Assignments (Dummy)
                    </h2>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dummyChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="week" stroke="#555" />
                                <YAxis stroke="#555" domain={[60, 100]} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#173A64"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#173A64" }}
                                    activeDot={{ r: 6, stroke: "#173A64", fill: '#fff', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Other Sections (Dummy) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold text-[#173A64] mb-3">Recent Class Activities (Dummy)</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>[10:00] Mahasiswa X submitted assignment 'Project A'</li>
                            <li>[09:30] AI Graded 20 submissions for 'Quiz 3'</li>
                            <li>[Yesterday] Course 'System Terdistribusi' edited by Admin.</li>
                        </ul>
                    </CardContent>
                 </Card>

                 <Card>
                    <CardContent>
                        <h2 className="text-lg font-semibold text-[#173A64] mb-3">AI Grading Status (Dummy)</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>**Accuracy:** 94% (Stable)</li>
                            <li>**Latency:** 120ms (Fast)</li>
                            <li>**Manual Review Needed:** 5 submissions flagged.</li>
                        </ul>
                    </CardContent>
                 </Card>
            </div>
            
            {/* Navigasi ke Halaman Detail Analitik */}
            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate("/dosen/ClassAnalitik2")}
                    className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition shadow"
                >
                    View Detailed Analytics
                </button>
            </div>
        </div>
    );
}