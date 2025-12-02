import React, { useState } from "react";
import { RefreshCw, X } from "lucide-react";

export default function SystemLog() {
  const logs = [
    {
      time: "2025-01-12 10:24:11",
      event: "Server Started",
      severity: "info",
      description: "Main application server initialized successfully.",
      details: "Everything loaded correctly. No issues detected.",
    },
    {
      time: "2025-01-12 11:03:44",
      event: "Database Reconnected",
      severity: "warning",
      description: "Lost connection for 3 seconds before automatic recovery.",
      details: "Possible network instability. Auto-reconnect successful.",
    },
    {
      time: "2025-01-12 11:25:55",
      event: "API Error /grade-essay",
      severity: "error",
      description: "AI service timeout. Model responded too slowly.",
      details: "AI engine exceeded the 5s execution limit. Might require performance check.",
    },
  ];

  const [selectedLog, setSelectedLog] = useState(null);

  const getBadgeColor = (severity) => {
    switch (severity) {
      case "info":
        return "bg-blue-100 text-blue-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "error":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4 pb-20 text-[15px]">
      <h1 className="text-2xl font-bold mb-2">System Log</h1>
      <p className="text-gray-600 mb-6">Monitoring semua aktivitas dan status sistem.</p>

      {/* FILTERS */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <select className="border rounded-lg px-3 py-2 mb-4">
            <option>All Severity</option>
            <option>Info</option>
            <option>Warning</option>
            <option>Error</option>
          </select>

          <input
            type="date"
            className="border rounded-lg px-3 py-2 mb-4"
          />
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4">
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-semibold">Time</th>
              <th className="text-left py-3 px-4 font-semibold">Event</th>
              <th className="text-left py-3 px-4 font-semibold">Severity</th>
              <th className="text-left py-3 px-4 font-semibold">Description</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                onClick={() => setSelectedLog(log)}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="py-3 px-4">{log.time}</td>
                <td className="py-3 px-4">{log.event}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-sm font-semibold ${getBadgeColor(log.severity)}`}>
                    {log.severity}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[450px] rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setSelectedLog(null)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-3">Log Details</h2>

            <div className="text-gray-700 space-y-2">
              <p><span className="font-semibold">Time:</span> {selectedLog.time}</p>
              <p><span className="font-semibold">Event:</span> {selectedLog.event}</p>
              <p>
                <span className="font-semibold">Severity:</span>{" "}
                <span className={`px-2 py-1 rounded text-sm font-semibold ${getBadgeColor(selectedLog.severity)}`}>
                  {selectedLog.severity}
                </span>
              </p>
              <p><span className="font-semibold">Description:</span> {selectedLog.description}</p>
              <p><span className="font-semibold">Details:</span> {selectedLog.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
