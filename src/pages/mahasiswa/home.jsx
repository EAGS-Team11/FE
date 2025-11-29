/* src/pages/mahasiswa/home.jsx */

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
import homeImg from "../../assets/home.png";

const data = [
  { name: "AI Ethics", score: 85 },
  { name: "Data Science", score: 78 },
  { name: "PAPB", score: 90 },
  { name: "Cloud Computing", score: 82 },
  { name: "Machine Learning", score: 88 },
];

const Home = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#F6F7FB] font-[Inter] pt-[110px] px-10 pb-16 overflow-hidden">
      {/* Background */}
      <img
        src={homeImg}
        alt="Background"
        className="absolute bottom-0 left-0 w-[320px] opacity-80 select-none -translate-x-20 translate-y-20 z-20 drop-shadow-lg"
      />

      {/* Dashboard */}
      <h1 className="text-[32px] font-bold text-left mb-10 text-black relative z-30 mt-2">
        Dashboard
      </h1>

      {/* Grid Utama */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-8 justify-items-center lg:justify-items-stretch -mt-8">
        <div className="rounded-3xl p-4 flex flex-col items-center justify-center w-full max-w-[480px] relative -mt-28">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 place-items-center">
            {/* Total Essays Submitted */}
            <div className="bg-[#E8DEA0] rounded-[30px] h-[130px] w-[180px] p-4 flex flex-col justify-between shadow">
              <p className="text-[14px] font-light text-left text-black">
                Total Essays Submitted
              </p>
              <div className="flex justify-between items-end">
                <p className="text-[28px] font-light text-black">5</p>
                <FileText className="w-5 h-5 text-black/50 -translate-y-2" />
              </div>
            </div>

            {/* Average Score */}
            <div className="bg-[#D6E8A0] rounded-[30px] h-[130px] w-[180px] p-4 flex flex-col justify-between shadow">
              <p className="text-[14px] font-light text-left text-black">
                Average <br /> Score
              </p>
              <div className="flex justify-between items-end">
                <p className="text-[28px] font-light text-black">48</p>
                <BarChart2 className="w-5 h-5 text-black/50 -translate-y-2" />
              </div>
            </div>

            {/* Pending Review */}
            <div className="bg-[#A7E7E5] rounded-[30px] h-[130px] w-[180px] p-4 flex flex-col justify-between shadow">
              <p className="text-[14px] font-light text-left text-black">
                Pending <br /> Review
              </p>
              <div className="flex justify-between items-end">
                <p className="text-[28px] font-light text-black">1</p>
                <Hourglass className="w-5 h-5 text-black/50 -translate-y-2" />
              </div>
            </div>

            {/* Feedback Received */}
            <div className="bg-[#E7C8A7] rounded-[30px] h-[130px] w-[180px] p-4 flex flex-col justify-between shadow">
              <p className="text-[14px] font-light text-left text-black">
                Feedback <br /> Received
              </p>
              <div className="flex justify-between items-end">
                <p className="text-[28px] font-light text-black">2</p>
                <MessageCircle className="w-5 h-5 text-black/50 -translate-y-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Kanan (Chart + Tabel) */}
        <div className="flex flex-col gap-6 w-full relative z-10">
          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-md p-5 w-full">
            <h2 className="text-[16px] font-medium text-left text-black mb-3">
              Progress over the last 5 assignments
            </h2>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F3A60" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#1F3A60" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="name" stroke="#555" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#555" tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#1F3A60"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#1F3A60" }}
                    activeDot={{ r: 6, stroke: "#1F3A60" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="none"
                    fill="url(#colorScore)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Latest Essays */}
          <div className="bg-white rounded-2xl shadow-md p-5 w-full">
            <h2 className="text-[16px] font-medium text-left text-black mb-3">
              Latest Essays
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2 text-[13px] font-medium text-black/50">
                      Essay Title
                    </th>
                    <th className="py-2 text-[13px] font-medium text-black/50">
                      Status
                    </th>
                    <th className="py-2 text-[13px] font-medium text-black/50">
                      Score
                    </th>
                    <th className="py-2 text-[13px] font-medium text-black/50">
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition cursor-pointer">
                    <td className="py-2 text-[14px] text-black">AI Ethics</td>
                    <td className="text-[14px] text-black">Graded</td>
                    <td className="text-[14px] text-black">85</td>
                    <td>
                      <button className="w-[70px] h-[24px] bg-gray-200 rounded-[6px] text-[12px] text-black shadow hover:shadow-md transition">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition cursor-pointer">
                    <td className="py-2 text-[14px] text-black">Data Privacy</td>
                    <td className="text-[14px] text-black">In Review</td>
                    <td className="text-[14px] text-black">-</td>
                    <td>-</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition cursor-pointer">
                    <td className="py-2 text-[14px] text-black">
                      Climate Change
                    </td>
                    <td className="text-[14px] text-black">In Review</td>
                    <td className="text-[14px] text-black">-</td>
                    <td>-</td>
                  </tr>
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
