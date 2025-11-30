import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Trash } from "lucide-react";

import { facultyDetails } from "../../../data/admin/facultyDetails";

export default function DetailFaculties() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const found = facultyDetails.find((f) => String(f.id) === String(id));
    setDetail(found);
  }, [id]);

  if (!detail) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading faculty data...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* BACK BUTTON */}
      <button
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-5"
        onClick={() => navigate("/admin/faculties")}
      >
        <ArrowLeft size={18} /> Back to Faculties
      </button>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{detail.name}</h1>
          <p className="text-gray-600 mt-1">
            Code: <span className="font-semibold">{detail.code}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Pencil size={18} /> Edit
          </button>

          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Trash size={18} /> Delete
          </button>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <h2 className="text-lg font-semibold mb-2">Faculty Description</h2>
        <p className="text-gray-700">{detail.description}</p>

        <p className="mt-4">
          Status:{" "}
          <span
            className={`px-2 py-1 rounded text-white text-sm ${
              detail.status === "active" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {detail.status}
          </span>
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Programs", value: detail.stats.programs },
          { title: "Total Lecturers", value: detail.stats.lecturers },
          { title: "Total Students", value: detail.stats.students },
          { title: "AI-Evaluated Essays", value: detail.stats.essays },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-5 text-center">
            <h3 className="text-gray-600">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* PROGRAM STUDIES */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">Programs of Study</h2>

        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Program Name</th>
              <th className="p-3 border">Level</th>
              <th className="p-3 border">Lecturers</th>
              <th className="p-3 border">Students</th>
            </tr>
          </thead>

          <tbody>
            {detail.programs.map((prodi) => (
              <tr key={prodi.id} className="hover:bg-gray-50">
                <td className="p-3 border">{prodi.name}</td>
                <td className="p-3 border">{prodi.level}</td>
                <td className="p-3 border">{prodi.lecturers}</td>
                <td className="p-3 border">{prodi.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LECTURERS */}
      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">Lecturers</h2>

        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Program</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {detail.lecturers.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="p-3 border">{d.name}</td>
                <td className="p-3 border">{d.email}</td>
                <td className="p-3 border">{d.program}</td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 text-white rounded ${
                      d.status === "active" ? "bg-green-600" : "bg-gray-500"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ACTIVITY LOG */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>

        {detail.activity.length === 0 ? (
          <p className="text-gray-500">No activity recorded.</p>
        ) : (
          <ul className="space-y-2">
            {detail.activity.map((log, i) => (
              <li key={i} className="text-gray-700">
                • {log}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
