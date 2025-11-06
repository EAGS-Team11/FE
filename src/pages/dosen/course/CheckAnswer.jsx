import React, { useState } from "react";

const CheckAnswer = () => {
  const [expanded, setExpanded] = useState({});
  const [activeFeedback, setActiveFeedback] = useState(null); 

  const questions = [
    {
      id: 1,
      title: "Question 1",
      question:
        "Jelaskan konsep komunikasi antar node dalam sistem terdistribusi.",
      answer:
        "Komunikasi antar node dalam sistem terdistribusi melibatkan proses pengiriman pesan (message passing) antara node-node yang terpisah secara fisik, tetapi saling terhubung melalui jaringan. Komunikasi ini dapat bersifat sinkron atau asinkron, tergantung pada kebutuhan sistem. Biasanya digunakan protokol seperti TCP/IP atau gRPC untuk memastikan data dikirim dengan andal dan efisien. Mekanisme ini penting untuk koordinasi tugas, replikasi data, dan menjaga konsistensi antar node.",
    },
    {
      id: 2,
      title: "Question 2",
      question:
        "Sebutkan konsep komunikasi dalam hubungan sistem terdistribusi.",
      answer:
        "Konsep komunikasi dalam sistem terdistribusi meliputi remote procedure call (RPC), message queue, publish-subscribe, dan data streaming. RPC memungkinkan satu node mengeksekusi fungsi di node lain seolah-olah lokal. Message queue digunakan untuk komunikasi asinkron antar layanan. Publish-subscribe memungkinkan banyak subscriber menerima data dari satu publisher tanpa koneksi langsung. Sementara data streaming mendukung pengiriman data real-time antar komponen sistem.",
    },
    {
      id: 3,
      title: "Question 3",
      question:
        "A mutation in beetles causes a red phenotype that increases reproduction but also predation risk. What is the likely evolutionary outcome for the red allele over time?",
      answer: "(Belum ada jawaban)",
    },
  ];

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 relative font-sans">
      <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-r from-[#A7C7E7] to-[#5D6F81] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 pt-8">
        {/* Header */}
        <div className="text-left text-black">
          <h2 className="text-base font-semibold">Capstone Project</h2>
          <div className="w-1/2 h-[1.5px] bg-black mt-1 mb-2 rounded-full"></div>
          <h1 className="text-xl font-bold leading-snug">
            UTS Sistem Paralel dan Terdistribusi — Implementasi Sistem
            Terdistribusi
          </h1>
          <p className="mt-1 text-xs font-medium">Azzatul Nabila - 11221085</p>
        </div>

        {/* ===== Pertanyaan ===== */}
        <div className="mt-8 flex flex-col gap-5 text-left">
          {questions.map((item) => (
            <div
              key={item.id}
              className="rounded-[10px] border border-gray-300 p-5 bg-transparent"
            >
              <div className="flex justify-between items-start w-full">
                <h3 className="font-semibold text-sm text-gray-700">
                  {item.title}
                </h3>

                <button
                  className="px-3 py-[2px] border border-[#5D6F81] text-[#5D6F81] italic text-xs rounded-[10px] hover:bg-[#5D6F81]/10 transition"
                  onClick={() => setActiveFeedback(item.id)}
                >
                  + add feedback
                </button>
              </div>

              <p className="mt-2 font-nunito font-bold text-gray-900 text-sm">
                {item.question}
              </p>

              <div className="w-1/2 h-[1px] bg-gray-400 mt-2 mb-2 rounded-full"></div>

              <div
                className="text-sm text-gray-700 cursor-pointer select-none"
                onClick={() => toggleExpand(item.id)}
              >
                {expanded[item.id]
                  ? item.answer
                  : item.answer.length > 150
                  ? item.answer.slice(0, 150) + "..."
                  : item.answer}
                {item.answer.length > 150 && (
                  <span className="text-[#5D6F81] italic ml-1 hover:underline">
                    {expanded[item.id] ? "Show less" : "Read more"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Back */}
        <div className="mt-8 mb-10 text-left">
          <button className="px-5 py-2 bg-[#5D6F81] text-white text-sm rounded-md hover:bg-[#4b5e6f] transition">
            ← Back
          </button>
        </div>
      </div>

      {/* ===== Modal Add Feedback ===== */}
      {activeFeedback && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setActiveFeedback(null)}
          ></div>

          {/* Modal Box */}
          <div className="fixed top-1/2 left-1/2 z-50 w-[420px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] shadow-lg p-6">
            <h3 className="text-base font-semibold mb-3">Add Feedback</h3>

            {/* Tabs */}
            <div className="flex gap-6 mb-3 text-sm font-medium">
              <button className="text-gray-900 border-b-2 border-gray-900 pb-1">
                Incorrect Answer
              </button>
              <button className="text-gray-500 hover:text-gray-800 pb-1">
                Correct Answer
              </button>
            </div>

            {/* Textarea */}
            <textarea
              placeholder="Enter Feedback"
              className="w-full border border-gray-300 rounded-[6px] p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5D6F81]"
              rows="3"
            ></textarea>

            {/* Icon Row */}
            <div className="flex items-center gap-3 mt-3 border-t border-gray-200 pt-2 text-gray-600">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13.828 10.172a4 4 0 010 5.656l-2.828 2.828a4 4 0 11-5.656-5.656l1.414-1.414m2.828-2.828a4 4 0 015.656 0"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.752 11.168l-4.596-2.65A1 1 0 009 9.32v5.36a1 1 0 001.156.802l4.596-2.65a1 1 0 000-1.664z"
                  />
                </svg>
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setActiveFeedback(null)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button className="px-4 py-1.5 bg-[#5D6F81] text-white text-sm rounded-md hover:bg-[#4b5e6f] transition">
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckAnswer;
