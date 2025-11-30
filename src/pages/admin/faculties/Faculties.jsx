import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { facultiesData } from "../../../data/admin/faculties";

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFaculties(facultiesData);
  }, []);

  const filteredList = faculties.filter(
    (x) =>
      x.name.toLowerCase().includes(search.toLowerCase()) ||
      x.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Faculties Master Data</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={20} /> Add Faculty
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search faculties..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Code</th>
              <th className="p-3 border">Faculty Name</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredList.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50">
                <td className="p-3 border font-semibold">{faculty.code}</td>
                <td
                  className="p-3 border text-blue-600 hover:underline cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/faculties/${faculty.id}`)
                  }
                >
                  {faculty.name}
                </td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      faculty.status === "active" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {faculty.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3 border text-center flex justify-center gap-3">
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No faculty data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
