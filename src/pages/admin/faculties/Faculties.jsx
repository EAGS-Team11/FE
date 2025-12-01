import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { facultiesData } from "../../../data/admin/faculties";

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const [form, setForm] = useState({
    code: "",
    name: "",
    status: "active",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFaculties(facultiesData);
  }, []);

  const filteredList = faculties.filter(
    (x) =>
      x.name.toLowerCase().includes(search.toLowerCase()) ||
      x.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (editData) {
      setFaculties((prev) =>
        prev.map((item) =>
          item.id === editData.id ? { ...item, ...form } : item
        )
      );
    } else {
      const newData = {
        id: Date.now(),
        ...form,
      };
      setFaculties((prev) => [...prev, newData]);
    }
    closeModal();
  };

  const openModalAdd = () => {
    setEditData(null);
    setForm({ code: "", name: "", status: "active" });
    setShowModal(true);
  };

  const openModalEdit = (item) => {
    setEditData(item);
    setForm({
      code: item.code,
      name: item.name,
      status: item.status,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  const confirmDelete = () => {
    setFaculties((prev) => prev.filter((x) => x.id !== deleteData.id));
    setDeleteData(null);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Faculties Master Data</h1>

        <button
          onClick={openModalAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-md flex items-center gap-1"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-4 relative w-[400px]">
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="border pl-9 pr-9 py-2 text-sm rounded-md w-full shadow-sm focus:ring-1 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-md p-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-xs">
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Faculty Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredList.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50">
                <td className="p-2 border font-medium">{faculty.code}</td>

                <td
                  className="p-2 border text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate(`/admin/faculties/${faculty.id}`)}
                >
                  {faculty.name}
                </td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-0.5 rounded text-white text-xs ${
                      faculty.status === "active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {faculty.status}
                  </span>
                </td>

                <td className="p-2 border">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openModalEdit(faculty)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={() => setDeleteData(faculty)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-5">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[320px]">
            <h2 className="text-base font-semibold mb-3">
              {editData ? "Edit Faculty" : "Add Faculty"}
            </h2>

            <div className="flex flex-col gap-2 text-sm">
              <input
                type="text"
                placeholder="Code"
                className="border p-2 rounded"
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Faculty Name"
                className="border p-2 rounded"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <select
                className="border p-2 rounded"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2 text-sm">
              <button
                onClick={closeModal}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
      {deleteData && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-[300px] text-sm">
            <h2 className="text-base font-semibold">Delete Faculty</h2>

            <p className="mt-2">
              Are you sure you want to delete{" "}
              <b>{deleteData.name}</b>?
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDeleteData(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
