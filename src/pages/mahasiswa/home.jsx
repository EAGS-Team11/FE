// src/pages/mahasiswa/home.jsx

import React from "react";
import { FileText, BarChart2, Hourglass, MessageCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
// Asumsi path homeImg adalah benar
import homeImg from "../../assets/home.png"; 

// Data dummy untuk chart dan statistik
const data = [
  { name: "AI Ethics", score: 85 },
  { name: "Data Science", score: 78 },
  { name: "PAPB", score: 90 },
  { name: "Cloud Computing", score: 82 },
  { name: "Machine Learning", score: 88 },
];

const Home = () => {
  // TODO: Tambahkan logic untuk fetch data statistik dan essays di sini
  
  const StatCard = ({ title, value, icon: Icon, bgColor, textColor }) => (
    <div className={`bg-white rounded-xl p-5 flex flex-col justify-between shadow-lg border-l-4 ${bgColor} transition-all duration-300 hover:shadow-xl`}>
        <p className="text-sm font-medium text-gray-500 mb-2 leading-snug">
            {title}
        </p>
        <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-[#1F3A60]">{value}</p>
            <Icon className={`w-6 h-6 ${textColor} opacity-60`} />
        </div>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-[#F6F7FB] font-[Inter] pt-[110px] px-10 pb-16 overflow-hidden">
      
      {/* Background (Dipertahankan, tapi diposisikan lebih baik) */}
      <img
        src={homeImg}
        alt="Background"
        className="absolute bottom-0 right-0 w-[400px] opacity-20 select-none translate-x-1/4 translate-y-1/4 z-10 hidden lg:block"
      />

      {/* Dashboard Header */}
      <h1 className="text-3xl font-extrabold text-[#1F3A60] mb-8 relative z-30">
        Mahasiswa Dashboard
      </h1>

      {/* Grid Utama: 4 Stat Cards + Chart/Table */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 relative z-20">

        {/* SECTION 1: STATISTIK RINGKAS (KIRI) */}
        <div className="flex flex-col gap-6">
          <StatCard
            title="Total Essays Submitted"
            value={5}
            icon={FileText}
            bgColor="border-yellow-500"
            textColor="text-yellow-500"
          />
          <StatCard
            title="Average Score (Graded)"
            value={85}
            icon={BarChart2}
            bgColor="border-green-500"
            textColor="text-green-500"
          />
          <StatCard
            title="Pending Review"
            value={1}
            icon={Hourglass}
            bgColor="border-indigo-500"
            textColor="text-indigo-500"
          />
          <StatCard
            title="Feedback Received"
            value={3}
            icon={MessageCircle}
            bgColor="border-purple-500"
            textColor="text-purple-500"
          />
        </div>

        {/* SECTION 2: CHART & LATEST SUBMISSIONS (KANAN) */}
        <div className="flex flex-col gap-8 w-full">
          
          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full border border-gray-200">
            <h2 className="text-lg font-semibold text-[#1F3A60] mb-4 text-left">
              Progress Over Assignments
            </h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F3A60" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1F3A60" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="name" stroke="#555" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#555" tick={{ fontSize: 11 }} domain={[60, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#1F3A60"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#1F3A60" }}
                    activeDot={{ r: 6, stroke: "#1F3A60", fill: '#fff', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="none"
                    fill="url(#colorScore)"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Latest Essays Table */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full border border-gray-200">
            <h2 className="text-lg font-semibold text-[#1F3A60] mb-4 text-left">
              Latest Essays Activity
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 font-medium">
                    <th className="py-2 px-3 w-1/4">Essay Title</th>
                    <th className="py-2 px-3 w-1/5">Status</th>
                    <th className="py-2 px-3 w-1/6">Score</th>
                    <th className="py-2 px-3 w-1/3">Quick Feedback</th>
                    <th className="py-2 px-3 w-1/6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* DUMMY DATA ROWS - Replace with actual state data */}
                  <tr className="border-b hover:bg-indigo-50/30 transition">
                    <td className="py-3 px-3 font-medium text-gray-800">AI Ethics</td>
                    <td className="py-3 px-3">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Graded</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-green-700">85</td>
                    <td className="py-3 px-3 text-gray-600 text-xs italic">
                        Strengthening the introduction and conclusion...
                    </td>
                    <td className="py-3 px-3 text-center">
                        <button className="text-[#1F3A60] text-xs font-semibold hover:underline">
                            View Details
                        </button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-indigo-50/30 transition">
                    <td className="py-3 px-3 font-medium text-gray-800">Data Privacy</td>
                    <td className="py-3 px-3">
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">In Review</span>
                    </td>
                    <td className="py-3 px-3 text-gray-500">—</td>
                    <td className="py-3 px-3 text-gray-500 text-xs italic">
                        Awaiting lecturer review...
                    </td>
                    <td className="py-3 px-3 text-center">
                        <button className="text-[#1F3A60] text-xs font-semibold hover:underline">
                            Track
                        </button>
                    </td>
                  </tr>
                  {/* Akhir DUMMY DATA */}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;