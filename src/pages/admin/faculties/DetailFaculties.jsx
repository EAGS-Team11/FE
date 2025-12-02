// src/pages/admin/faculties/DetailFaculties.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Trash,
  Plus,
  X as IconX,
} from "lucide-react";

import { facultyDetails } from "../../../data/admin/facultyDetails";

export default function DetailFaculties() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);

  // Modal state
  const [showEditDesc, setShowEditDesc] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null); 
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showProgramModal, setShowProgramModal] = useState(false);

  // Forms
  const [descDraft, setDescDraft] = useState("");
  const [deptDraft, setDeptDraft] = useState({ index: null, name: "" });
  const [programDraft, setProgramDraft] = useState({
    deptIndex: null,
    program: { id: null, name: "", akreditasi: "", gelar: "" },
  });

  useEffect(() => {
    const found = facultyDetails.find((f) => String(f.id) === String(id));
    // clone deep enough to avoid mutating source
    setDetail(found ? JSON.parse(JSON.stringify(found)) : null);
    if (found) setDescDraft(found.description || "");
  }, [id]);

  if (!detail) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-600">Loading faculty data...</p>
      </div>
    );
  }

  // theme colors based on faculty name (adjust mapping as needed)
  const theme =
    detail.name === "Faculty of Sustainable Development"
      ? {
          color: "green",
          hex: "green-500",
          leftBorder: "before:bg-green-500",
          glow: "shadow-[0_8px_30px_rgba(34,197,94,0.12)]",
        }
      : detail.name === "Faculty of Engineering and Industrial Technology"
      ? {
          color: "red",
          hex: "red-500",
          leftBorder: "before:bg-red-500",
          glow: "shadow-[0_8px_30px_rgba(239,68,68,0.12)]",
        }
      : {
          color: "blue",
          hex: "blue-500",
          leftBorder: "before:bg-blue-500",
          glow: "shadow-[0_8px_30px_rgba(59,130,246,0.12)]",
        };

  const leftBarClass =
    "relative before:content-[''] before:absolute before:-left-3 before:top-0 before:h-full before:w-1.5 before:rounded-l-md";

  // Small icon-only button
  const IconBtn = ({ onClick, children, title, extra = "" }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md hover:bg-white/30 transition ${extra}`}
      aria-label={title}
    >
      {children}
    </button>
  );

  // ---------- Faculty description edit ----------
  const saveDescription = () => {
    setDetail({ ...detail, description: descDraft });
    setShowEditDesc(false);
  };

  // ---------- Faculty delete ----------
  const confirmDeleteFaculty = () => {
    // For local-only demo: navigate back and optionally remove from list (we won't mutate original data file)
    navigate("/admin/faculties");
  };

  // ---------- Department CRUD ----------
  const openAddDept = () => {
    setDeptDraft({ index: null, name: "" });
    setShowDeptModal(true);
  };

  const openEditDept = (idx) => {
    setDeptDraft({ index: idx, name: detail.departments[idx].name });
    setShowDeptModal(true);
  };

  const saveDept = () => {
    const copy = { ...detail };
    if (deptDraft.index === null) {
      // add new department with empty programs
      copy.departments.push({ name: deptDraft.name || "New Department", programs: [] });
    } else {
      copy.departments[deptDraft.index].name = deptDraft.name;
    }
    setDetail(copy);
    setShowDeptModal(false);
  };

  const requestDeleteDept = (idx) => {
    setShowConfirm({ type: "dept", payload: { index: idx } });
  };

  const doDeleteDept = (idx) => {
    const copy = { ...detail };
    copy.departments = copy.departments.filter((_, i) => i !== idx);
    setDetail(copy);
    setShowConfirm(null);
  };

  // ---------- Program CRUD ----------
  const openAddProgram = (deptIndex) => {
    setProgramDraft({
      deptIndex,
      program: { id: Date.now(), name: "", akreditasi: "", gelar: "" },
    });
    setShowProgramModal(true);
  };

  const openEditProgram = (deptIndex, program) => {
    setProgramDraft({ deptIndex, program: { ...program } });
    setShowProgramModal(true);
  };

  const saveProgram = () => {
    const copy = { ...detail };
    const dIdx = programDraft.deptIndex;
    if (dIdx === null || copy.departments[dIdx] === undefined) return;

    // if program id exists -> edit; else add
    const exists = copy.departments[dIdx].programs.findIndex(
      (p) => p.id === programDraft.program.id
    );
    if (exists >= 0) {
      copy.departments[dIdx].programs[exists] = { ...programDraft.program };
    } else {
      copy.departments[dIdx].programs.push({ ...programDraft.program });
    }
    setDetail(copy);
    setShowProgramModal(false);
  };

  const requestDeleteProgram = (deptIndex, programId) => {
    setShowConfirm({ type: "program", payload: { deptIndex, programId } });
  };

  const doDeleteProgram = (deptIndex, programId) => {
    const copy = { ...detail };
    copy.departments[deptIndex].programs = copy.departments[deptIndex].programs.filter(
      (p) => p.id !== programId
    );
    setDetail(copy);
    setShowConfirm(null);
  };

  // ---------- UI helpers ----------
  const cardBaseClasses =
    "bg-white rounded-xl p-4 text-sm relative transition-transform duration-200 hover:scale-[1.02] hover:-translate-y-1";

  const programCardClasses = (deptColor) =>
    `${cardBaseClasses} before:content-[''] ${leftBarClass} ${deptColor} overflow-hidden`;

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h1 className="text-xl font-bold">{detail.name}</h1>
          <p className="text-sm text-gray-600 mt-1">
            Code: <span className="font-semibold">{detail.code}</span>
          </p>
        </div>

        {/* top-right small edit (edit description) and delete */}
        <div className="flex items-center gap-2">
          <IconBtn
            onClick={() => setShowEditDesc(true)}
            title="Edit description"
            extra="bg-white/5"
          >
            <Pencil size={14} className={`text-${theme.color}-600`} />
          </IconBtn>

          <IconBtn
            onClick={() => setShowConfirm({ type: "faculty" })}
            title="Delete faculty"
            extra="bg-white/5"
          >
            <Trash size={14} className="text-red-500" />
          </IconBtn>
        </div>
      </div>

      {/* DESCRIPTION + IMAGE */}
      <div className="bg-white rounded-lg shadow p-4 mb-5 flex gap-4 items-start">
        <img
          src={detail.image || `/src/assets/faculties${detail.id}.png`}
          alt="faculty illustration"
          className="w-36 h-auto rounded-lg object-cover"
        />

        <div className="text-sm flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-base font-semibold mb-2">Description</h2>
            <div className="text-xs">
              <span
                className={`px-2 py-0.5 rounded text-white text-xs bg-${
                  theme.hex
                }`}
                style={{
                  backgroundColor: undefined,
                }}
              >
                {detail.status}
              </span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{detail.description}</p>
        </div>
      </div>

      {/* DEPARTMENTS & PROGRAMS */}
      <div
        className="relative rounded-lg p-4 mb-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${detail.bgImage || `/src/assets/facultiesbg${detail.id}.png`})` }}
      >
        <div className="absolute inset-0 bg-black/28 backdrop-blur-sm rounded-lg"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Departments & Programs</h2>

            <div className="flex items-center gap-2">
              <button
                onClick={openAddDept}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white/20 hover:bg-white/30 text-white"
                title="Add Department"
              >
                <Plus size={14} /> Add Dept
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {detail.departments.map((dept, dIdx) => {
              // per-department color bar (use theme.hex but slightly darker)
              const deptLeft = `before:bg-${theme.color}-500`;

              return (
                <div key={dIdx} className="bg-black/20 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold text-white">{dept.name}</h3>

                    <div className="flex items-center gap-2">
                      <IconBtn
                        onClick={() => openEditDept(dIdx)}
                        title="Edit department"
                        extra="bg-white/5"
                      >
                        <Pencil size={14} className="text-white" />
                      </IconBtn>

                      <IconBtn
                        onClick={() => requestDeleteDept(dIdx)}
                        title="Delete department"
                        extra="bg-white/5"
                      >
                        <Trash size={14} className="text-red-300" />
                      </IconBtn>

                      <IconBtn
                        onClick={() => openAddProgram(dIdx)}
                        title="Add program"
                        extra="bg-white/5"
                      >
                        <Plus size={14} className="text-white" />
                      </IconBtn>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {dept.programs.map((p) => (
                      <article
                        key={p.id}
                        className={`${programCardClasses(deptLeft)} ${theme.glow} border border-gray-100`}
                        // inline style for left bar because tailwind dynamic class for before not trivial
                        style={{
                          boxShadow: undefined,
                        }}
                      >
                        {/* left colored bar using a pseudo element is tricky inline; use flex with empty div */}
                        <div className="absolute -left-3 top-0 h-full w-1.5 rounded-l-md"
                          style={{
                            backgroundColor:
                              theme.color === "green"
                                ? "#16a34a"
                                : theme.color === "red"
                                ? "#ef4444"
                                : "#3b82f6",
                          }}
                        />
                        <div className="relative z-10">
                          <div className="flex justify-between items-start">
                            <h4 className={`font-semibold mb-1 text-${theme.color}-700`} style={{ color: undefined }}>
                              {p.name}
                            </h4>

                            <div className="flex items-center gap-1">
                              <IconBtn
                                onClick={() => openEditProgram(dIdx, p)}
                                title="Edit program"
                              >
                                <Pencil size={12} />
                              </IconBtn>

                              <IconBtn
                                onClick={() => requestDeleteProgram(dIdx, p.id)}
                                title="Delete program"
                                extra="text-red-500"
                              >
                                <Trash size={12} />
                              </IconBtn>
                            </div>
                          </div>

                          <p className="text-xs text-gray-600 mt-1">
                            <span className="font-semibold text-gray-700">Akreditasi:</span>{" "}
                            {p.akreditasi || "-"}
                          </p>
                          <p className="text-xs text-gray-600">
                            <span className="font-semibold text-gray-700">Gelar:</span> {p.gelar || "-"}
                          </p>

                          <div className="flex justify-end mt-3">
                            <button
                              onClick={() =>
                                navigate(`/admin/faculties/${detail.id}/program/${p.id}`)
                              }
                              className={`text-white px-3 py-1 rounded-full text-xs flex items-center gap-1`}
                              style={{
                                backgroundColor:
                                  theme.color === "green"
                                    ? "#16a34a"
                                    : theme.color === "red"
                                    ? "#ef4444"
                                    : "#3b82f6",
                              }}
                            >
                              Dapatkan <span className="text-xs">↗</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BACK BUTTON AT BOTTOM */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/admin/faculties")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow"
        >
          <ArrowLeft size={16} />
          Back to Faculties
        </button>
      </div>

      {/* ===================== MODALS ===================== */}

      {/* Edit Description Modal */}
      {showEditDesc && (
        <CenteredModal onClose={() => setShowEditDesc(false)}>
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-semibold">Edit Description</h3>
            <button
              onClick={() => setShowEditDesc(false)}
              className="text-red-500 p-1 rounded-full hover:bg-red-50"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>
          </div>

          <textarea
            value={descDraft}
            onChange={(e) => setDescDraft(e.target.value)}
            rows={6}
            className="mt-3 border p-2 rounded w-full text-sm"
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setShowEditDesc(false)}
              className="px-3 py-1 rounded border text-sm"
            >
              Cancel
            </button>
            <button
              onClick={saveDescription}
              className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
            >
              Save
            </button>
          </div>
        </CenteredModal>
      )}

      {/* Dept Modal (Add / Edit) */}
      {showDeptModal && (
        <CenteredModal onClose={() => setShowDeptModal(false)}>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{deptDraft.index === null ? "Add Department" : "Edit Department"}</h3>
            <button
              onClick={() => setShowDeptModal(false)}
              className="text-red-500 p-1 rounded-full hover:bg-red-50"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>
          </div>

          <input
            value={deptDraft.name}
            onChange={(e) => setDeptDraft({ ...deptDraft, name: e.target.value })}
            placeholder="Department name"
            className="mt-3 border p-2 rounded w-full text-sm"
          />

          <div className="mt-3 flex justify-end gap-2">
            <button onClick={() => setShowDeptModal(false)} className="px-3 py-1 rounded border text-sm">Cancel</button>
            <button onClick={saveDept} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Save</button>
          </div>
        </CenteredModal>
      )}

      {/* Program Modal (Add / Edit) */}
      {showProgramModal && (
        <CenteredModal onClose={() => setShowProgramModal(false)}>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{programDraft.program.id && detail.departments[programDraft.deptIndex] && detail.departments[programDraft.deptIndex].programs.some(p=>p.id===programDraft.program.id) ? "Edit Program" : "Add Program"}</h3>
            <button
              onClick={() => setShowProgramModal(false)}
              className="text-red-500 p-1 rounded-full hover:bg-red-50"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>
          </div>

          <input
            value={programDraft.program.name}
            onChange={(e) => setProgramDraft({ ...programDraft, program: { ...programDraft.program, name: e.target.value } })}
            placeholder="Program name"
            className="mt-3 border p-2 rounded w-full text-sm mb-2"
          />

          <input
            value={programDraft.program.akreditasi}
            onChange={(e) => setProgramDraft({ ...programDraft, program: { ...programDraft.program, akreditasi: e.target.value } })}
            placeholder="Akreditasi"
            className="border p-2 rounded w-full text-sm mb-2"
          />

          <input
            value={programDraft.program.gelar}
            onChange={(e) => setProgramDraft({ ...programDraft, program: { ...programDraft.program, gelar: e.target.value } })}
            placeholder="Gelar"
            className="border p-2 rounded w-full text-sm"
          />

          <div className="mt-3 flex justify-end gap-2">
            <button onClick={() => setShowProgramModal(false)} className="px-3 py-1 rounded border text-sm">Cancel</button>
            <button onClick={saveProgram} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Save</button>
          </div>
        </CenteredModal>
      )}

      {/* Confirmation Modal for deletes */}
      {showConfirm && (
        <CenteredModal onClose={() => setShowConfirm(null)}>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">Konfirmasi Hapus</h3>
            <button
              onClick={() => setShowConfirm(null)}
              className="text-red-500 p-1 rounded-full hover:bg-red-50"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-700">
            {showConfirm.type === "faculty" && "Apakah Anda yakin ingin menghapus fakultas ini? Tindakan ini tidak dapat dibatalkan."}
            {showConfirm.type === "dept" && "Apakah Anda yakin ingin menghapus departemen ini beserta seluruh program di dalamnya?"}
            {showConfirm.type === "program" && "Apakah Anda yakin ingin menghapus program ini?"}
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setShowConfirm(null)} className="px-3 py-1 rounded border text-sm">Batal</button>

            {showConfirm.type === "faculty" && (
              <button onClick={confirmDeleteFaculty} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Hapus Fakultas</button>
            )}

            {showConfirm.type === "dept" && (
              <button onClick={() => doDeleteDept(showConfirm.payload.index)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Hapus Dept</button>
            )}

            {showConfirm.type === "program" && (
              <button onClick={() => doDeleteProgram(showConfirm.payload.deptIndex, showConfirm.payload.programId)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Hapus Program</button>
            )}
          </div>
        </CenteredModal>
      )}
    </div>
  );
}

/* Centered modal component with backdrop; onClose used by parent to hide */
function CenteredModal({ children, onClose }) {
  // prevent background scroll could be added if needed
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onClose && onClose()}
      />
      <div className="relative z-10 bg-white rounded-xl shadow-lg p-4 w-[min(92%,520px)] animate-[fadeIn_.14s_ease]">
        {children}
      </div>
    </div>
  );
}
