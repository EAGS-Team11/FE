import React from "react";
import { FileText, BarChart2, Hourglass, MessageCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts";
import homeImg from "../assets/home.png";

const data = [
  { name: "AI Ethics", score: 85 },
  { name: "Data Science", score: 78 },
  { name: "PAPB", score: 90 },
  { name: "Cloud Computing", score: 82 },
  { name: "Machine Learning", score: 88 },
];

const Home = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#F6F7FB] font-[Inter] overflow-hidden px-8 py-20">
      {/* Gambar kiri bawah */}
      <img
        src={homeImg}
        alt="Background"
        className="absolute bottom-0 left-0 w-[350px] opacity-80 pointer-events-none select-none translate-x-[-95px] translate-y-[70px]"
      />

      {/* Judul Dashboard */}
      <h1 className="text-[32px] font-bold text-left mb-8 text-black mt-8 ml-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 relative z-10">
        {/* Bagian kiri */}
        <div className="flex flex-col gap-6">
          {/* Kotak statistik */}
          <div className="grid grid-cols-2 gap-x-1 gap-y-4">
            {/* Total Essays Submitted */}
            <div className="bg-[#E8DEA0] rounded-[40px] w-[160px] h-[140px] p-3 flex flex-col justify-between shadow ml-[50px]">
              <p className="text-[16px] font-light text-left text-black leading-tight pt-2 ml-4">
                Total Essays Submitted
              </p>
              <div className="flex justify-between items-end">
                <p className="text-[32px] font-light text-black ml-4">5</p>
                <FileText className="w-5 h-5 text-black/50 translate-y-[-14px] translate-x-[-12px]" />
              </div>
            </div>

            {/* Average Score */}
            <div className="bg-[#D6E8A0] rounded-[40px] w-[160px] h-[140px] p-3 flex flex-col justify-between shadow -ml-[70px]">
              <p className="text-[16px] font-light text-left text-black leading-tight pt-2 ml-4">
                Average <br /> Score
              </p>
              <div className="flex justify-between items-end">
                <p className="text-[32px] font-light text-black ml-4">48</p>
                <BarChart2 className="w-5 h-5 text-black/50 translate-y-[-14px] translate-x-[-12px]" />
              </div>
            </div>

            {/* Pending Review */}
            <div className="bg-[#A7E7E5] rounded-[40px] w-[160px] h-[140px] p-3 flex flex-col justify-between shadow ml-[50px]">
              <p className="text-[16px] font-light text-left text-black leading-tight pt-2 ml-4">
                Pending <br /> Review
              </p>
              <div className="flex justify-between items-end">
                <p className="text-[32px] font-light text-black ml-4">1</p>
                <Hourglass className="w-5 h-5 text-black/50 translate-y-[-14px] translate-x-[-12px]" />
              </div>
            </div>

            {/* Feedback Received */}
            <div className="bg-[#E7C8A7] rounded-[40px] w-[160px] h-[140px] p-3 flex flex-col justify-between shadow -ml-[70px]">
              <p className="text-[16px] font-light text-left text-black leading-tight pt-2 ml-4">
                Feedback <br /> Received
              </p>
              <div className="flex justify-between items-end">
                <p className="text-[32px] font-light text-black ml-4">2</p>
                <MessageCircle className="w-5 h-5 text-black/50 translate-y-[-14px] translate-x-[-12px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="flex flex-col gap-6">
          {/* Grafik Line + Area Chart */}
          <div className="bg-white rounded-2xl shadow-md p-5 w-[700px] ml-[-120px] mt-[-60px]">
            <h2 className="text-[16px] font-medium text-left text-black mb-3">
              Progress over the last 5 assignments
            </h2>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  {/* Warna gradasi area di bawah garis */}
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

                  {/* Garis utama */}
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#1F3A60"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#1F3A60" }}
                    activeDot={{ r: 6, stroke: "#1F3A60" }}
                  />

                  {/* Area warna di bawah garis */}
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
          <div className="bg-white rounded-2xl shadow-md p-5 w-[700px] ml-[-120px]">
            <h2 className="text-[16px] font-medium text-left text-black mb-3">
              Latest Essays
            </h2>

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
                  <td className="py-2 text-[14px] text-black">Climate Change</td>
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
  );
};

export default Home;
