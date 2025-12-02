import React, { useState } from "react";
import {
  Activity,
  Cpu,
  Database,
  AlertTriangle,
  BarChart3,
  LineChart,
  Gauge,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AiMonitoringDashboard() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy distribusi
  const distribution = [
    { name: "Benar", value: 62 },
    { name: "Salah", value: 31 },
    { name: "Ambigu", value: 7 },
  ];

  // Dummy table untuk detail modal
  const results = [
    {
      id: 1,
      student: "Budi Santoso",
      question: "Jelaskan penyebab utama terjadinya inflasi?",
      answer: "Inflasi terjadi karena jumlah uang beredar terlalu banyak.",
      aiScore: 88,
      status: "Benar",
      confidence: 0.92,
      reasoning: "Jawaban sesuai dengan konsep demand-pull inflation.",
      timestamp: "2025-01-12 10:44:21",
      time: "125ms",
    },
    {
      id: 2,
      student: "Dewi Lestari",
      question: "Apa fungsi utama mitokondria?",
      answer: "Menghasilkan energi melalui respirasi sel.",
      aiScore: 95,
      status: "Benar",
      confidence: 0.97,
      reasoning: "AI mencocokkan jawaban dengan buku biologi standar.",
      timestamp: "2025-01-12 10:51:11",
      time: "142ms",
    },
    {
      id: 3,
      student: "Agus Pratama",
      question: "Sebutkan contoh perubahan kimia!",
      answer: "Es mencair menjadi air.",
      aiScore: 40,
      status: "Salah",
      confidence: 0.78,
      reasoning: "Perubahan wujud adalah fisika, bukan kimia.",
      timestamp: "2025-01-12 11:03:55",
      time: "154ms",
    },
  ];

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getStatusColor = (status) => {
    if (status === "Benar") return "text-green-600";
    if (status === "Salah") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto text-[15px] pb-20">
      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">AI Monitoring</h1>
        <p className="text-gray-600">Analytics tingkat universitas & kesehatan model AI.</p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow flex items-center gap-4">
          <Activity className="w-10 h-10" />
          <div>
            <p className="text-gray-600">Total Essay Diproses</p>
            <h2 className="text-2xl font-bold">12,482</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow flex items-center gap-4">
          <Gauge className="w-10 h-10" />
          <div>
            <p className="text-gray-600">Avg Response Time</p>
            <h2 className="text-2xl font-bold">148 ms</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow flex items-center gap-4">
          <AlertTriangle className="w-10 h-10" />
          <div>
            <p className="text-gray-600">Error Rate</p>
            <h2 className="text-2xl font-bold">0.92%</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Cpu className="w-10 h-10" />
            <div>
              <p className="text-gray-600">Model Status</p>
              <h2 className="text-xl font-bold text-green-600">Online</h2>
            </div>
          </div>
          <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Distribusi Penilaian AI</h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={distribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow overflow-hidden mb-10">
        <table className="w-full text-[15px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Mahasiswa</th>
              <th className="p-3 text-left">Pertanyaan</th>
              <th className="p-3 text-left">Skor AI</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => openModal(item)}
              >
                <td className="p-3">{item.student}</td>
                <td className="p-3 truncate">{item.question}</td>
                <td className="p-3 font-semibold">{item.aiScore}</td>
                <td className={`p-3 font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </td>
                <td className="p-3">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DETAIL */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
          <div className="bg-white p-6 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto shadow-xl">
            <h2 className="text-xl font-bold mb-3">Detail Evaluasi Jawaban</h2>

            <div className="space-y-3 text-[15px]">
              <p><strong>Mahasiswa:</strong> {selectedItem.student}</p>
              <p><strong>Pertanyaan:</strong> {selectedItem.question}</p>
              <p><strong>Jawaban:</strong><br />{selectedItem.answer}</p>

              <p>
                <strong>Hasil AI:</strong>{" "}
                <span className={getStatusColor(selectedItem.status)}>
                  {selectedItem.status}
                </span>
              </p>

              <p><strong>Confidence:</strong> {Math.round(selectedItem.confidence * 100)}%</p>
              <p><strong>Alasan AI:</strong><br />{selectedItem.reasoning}</p>
              <p><strong>Waktu Proses:</strong> {selectedItem.time}</p>
              <p><strong>Timestamp:</strong> {selectedItem.timestamp}</p>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
