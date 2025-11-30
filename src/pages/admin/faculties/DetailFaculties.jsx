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

  // AUTO PICK IMAGE
  const facultyImage = `/src/assets/faculties${detail.id}.png`;
  const bgImage = `/src/assets/facultiesbg${detail.id}.png`;

  // WARNA BERDASARKAN FAKULTAS
  const cardColor =
    detail.name === "Faculty of Sustainable Development"
      ? "border-green-500 shadow-green-200"
      : detail.name === "Faculty of Engineering and Industrial Technology"
      ? "border-red-500 shadow-red-200"
      : "border-blue-300 shadow-blue-100";

  const titleColor =
    detail.name === "Faculty of Sustainable Development"
      ? "text-green-700"
      : detail.name === "Faculty of Engineering and Industrial Technology"
      ? "text-red-700"
      : "text-blue-700";

  const buttonColor =
    detail.name === "Faculty of Sustainable Development"
      ? "bg-green-600 hover:bg-green-700"
      : detail.name === "Faculty of Engineering and Industrial Technology"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

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

      {/* DESCRIPTION + IMAGE */}
      <div className="bg-white rounded-lg shadow p-5 mb-6 flex gap-6">
        <img
          src={facultyImage}
          alt="faculty illustration"
          className="w-56 h-auto rounded-xl object-cover"
        />

        <div>
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
      </div>

      {/* DEPARTMENTS / PROGRAMS */}
      <div
        className="relative rounded-lg p-5 mb-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* BLUR OVERLAY */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-5 text-white drop-shadow">
            Departments & Programs
          </h2>

          {detail.departments.map((dept, index) => (
            <div key={index} className="mb-10">
              <h3 className="text-lg font-bold mb-4 text-white drop-shadow">
                {dept.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {dept.programs.map((p) => (
                  <div
                    key={p.id}
                    className={`bg-white border ${cardColor} shadow-md rounded-2xl p-5 hover:shadow-xl transition`}
                  >
                    <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>
                      {p.name}
                    </h3>

                    <div className="text-gray-700 mb-3">
                      <p>
                        <span className="font-semibold">Akreditasi:</span>{" "}
                        {p.akreditasi}
                      </p>
                      <p>
                        <span className="font-semibold">Gelar:</span> {p.gelar}
                      </p>
                    </div>

                    <div className="border-b border-gray-300 my-3"></div>

                    <div className="flex justify-between items-center mt-3">
                      <button className="font-semibold text-gray-700 hover:text-black">
                        Kurikulum
                      </button>

                      <button
                        onClick={() => navigate(`/admin/faculties/${detail.id}/program/${p.id}`)}
                        className={`${buttonColor} text-white px-4 py-1 rounded-full text-sm flex items-center gap-1`}
                      >
                        Dapatkan <span>↗</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
