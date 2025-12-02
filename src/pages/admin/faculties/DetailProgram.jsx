// src/pages/admin/faculties/DetailProgram.jsx

import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { curriculumData } from "../../../data/admin/curriculum";
import { graduateProfiles } from "../../../data/admin/graduateProfiles";

export default function DetailProgram() {
  const navigate = useNavigate();
  const { facultyId, programId } = useParams();
  const [activeTab, setActiveTab] = useState("kurikulum");
  const [openSemester, setOpenSemester] = useState(null);

  // local copies supaya file asli tidak terganggu
  const [localData, setLocalData] = useState(() => JSON.parse(JSON.stringify(curriculumData)));
  const [profiles, setProfiles] = useState(() => JSON.parse(JSON.stringify(graduateProfiles)));

  // modal generic
  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState(null); 
  const [modalType, setModalType] = useState(""); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // ---------------- CURRICULUM CRUD ----------------
  const openAddCourse = (semester) => {
    setSelectedCourse({ semester, no: null, kode: "", mk: "", sks: 3, praktikum: "Tidak Ada" });
    setModalFor("course");
    setModalType("add");
    setShowModal(true);
  };

  const openEditCourse = (course, semester) => {
    setSelectedCourse({ ...course, semester });
    setModalFor("course");
    setModalType("edit");
    setShowModal(true);
  };

  const openDeleteCourse = (course, semester) => {
    setSelectedCourse({ ...course, semester });
    setModalFor("course");
    setModalType("delete");
    setShowModal(true);
  };

  const saveCourse = () => {
    const updated = { ...localData };
    const sem = updated.semesters.find((s) => s.semester === selectedCourse.semester);

    if (modalType === "add") {
      // assign no sequential
      const newNo = sem.courses.length ? Math.max(...sem.courses.map((c) => c.no)) + 1 : 1;
      sem.courses.push({
        no: newNo,
        kode: selectedCourse.kode,
        mk: selectedCourse.mk,
        sks: Number(selectedCourse.sks),
        praktikum: selectedCourse.praktikum,
      });
      sem.total = sem.courses.reduce((a, b) => a + Number(b.sks || 0), 0);
    }

    if (modalType === "edit") {
      const idx = sem.courses.findIndex((c) => c.no === selectedCourse.no);
      if (idx > -1) {
        sem.courses[idx] = {
          no: selectedCourse.no,
          kode: selectedCourse.kode,
          mk: selectedCourse.mk,
          sks: Number(selectedCourse.sks),
          praktikum: selectedCourse.praktikum,
        };
        sem.total = sem.courses.reduce((a, b) => a + Number(b.sks || 0), 0);
      }
    }

    if (modalType === "delete") {
      sem.courses = sem.courses.filter((c) => c.no !== selectedCourse.no);
      // re-sequence numbers
      sem.courses = sem.courses.map((c, i) => ({ ...c, no: i + 1 }));
      sem.total = sem.courses.reduce((a, b) => a + Number(b.sks || 0), 0);
    }

    setLocalData(updated);
    closeModal();
  };

  // ---------------- PROFILE CRUD ----------------
  const openAddProfile = () => {
    setSelectedProfile({ profil: "", capaian: "" });
    setModalFor("profile");
    setModalType("add");
    setShowModal(true);
  };

  const openEditProfile = (p, idx) => {
    setSelectedProfile({ ...p, __idx: idx });
    setModalFor("profile");
    setModalType("edit");
    setShowModal(true);
  };

  const openDeleteProfile = (p, idx) => {
    setSelectedProfile({ ...p, __idx: idx });
    setModalFor("profile");
    setModalType("delete");
    setShowModal(true);
  };

  const saveProfile = () => {
    if (modalType === "add") {
      setProfiles((prev) => [...prev, { profil: selectedProfile.profil, capaian: selectedProfile.capaian }]);
    } else if (modalType === "edit") {
      setProfiles((prev) => prev.map((p, i) => (i === selectedProfile.__idx ? { profil: selectedProfile.profil, capaian: selectedProfile.capaian } : p)));
    } else if (modalType === "delete") {
      setProfiles((prev) => prev.filter((_, i) => i !== selectedProfile.__idx));
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setModalFor(null);
    setModalType("");
    setSelectedCourse(null);
    setSelectedProfile(null);
  };

  // ---------------- UI helpers ----------------
  const toggleSemester = (sem) => {
    setOpenSemester((prev) => (prev === sem ? null : sem));
  };

  return (
    <div className="p-6 flex gap-6">
      {/* LEFT: Back (outside filter) */}
      <div className="flex flex-col gap-4 w-64">
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* FILTER */}
        <div className="border border-gray-300 px-3 py-2">
          <h3 className="text-xs text-gray-500 tracking-wide mb-2">AKADEMIK</h3>
          <ul className="flex flex-col gap-1 text-sm">
            <li
              className={`cursor-pointer px-2 py-1 ${activeTab === "kurikulum" ? "border-l-4 border-blue-600 font-semibold" : "hover:bg-gray-50"}`}
              onClick={() => setActiveTab("kurikulum")}
            >
              Kurikulum
            </li>

            <li
              className={`cursor-pointer px-2 py-1 ${activeTab === "profil" ? "border-l-4 border-blue-600 font-semibold" : "hover:bg-gray-50"}`}
              onClick={() => setActiveTab("profil")}
            >
              Profil Lulusan
            </li>
          </ul>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1">
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{activeTab === "kurikulum" ? "Kurikulum" : "Profil Lulusan"}</h1>
          <p className="text-gray-600 text-sm">Informasi perangkat mata kuliah & profil lulusan.</p>
        </div>

        {/* KURIKULUM */}
        {activeTab === "kurikulum" && (
          <div className="space-y-4">
            {localData.semesters.map((s) => {
              const isOpen = openSemester === s.semester;
              return (
                <div key={s.semester} className="bg-white border">
                  <div
                    onClick={() => toggleSemester(s.semester)}
                    className="flex justify-between items-center px-4 py-3 cursor-pointer"
                  >
                    <div>
                      <h3 className="font-semibold">Semester {s.semester}</h3>
                      <p className="text-xs text-gray-500">Total SKS: {s.total}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); openAddCourse(s.semester); }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        <Plus size={14} /> Tambah
                      </button>

                      <div className="p-2">
                        {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                      </div>
                    </div>
                  </div>

                  {/* animated panel */}
                  <div
                    className={`transition-all duration-300 ease-out overflow-hidden px-4`}
                    style={{
                      maxHeight: isOpen ? 1000 : 0,
                      opacity: isOpen ? 1 : 0.0,
                    }}
                  >
                    <div className="py-3">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="border p-2 text-center w-12">No</th>
                              <th className="border p-2">Kode</th>
                              <th className="border p-2">Mata Kuliah</th>
                              <th className="border p-2 w-20 text-center">Sks</th>
                              <th className="border p-2 w-28 text-center">Praktikum</th>
                              <th className="border p-2 w-36 text-center">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {s.courses.map((c) => (
                              <tr key={c.no} className="hover:bg-gray-50">
                                <td className="border p-2 text-center">{c.no}</td>
                                <td className="border p-2">{c.kode}</td>
                                <td className="border p-2">{c.mk}</td>
                                <td className="border p-2 text-center">{c.sks}</td>
                                <td className="border p-2 text-center">{c.praktikum}</td>
                                <td className="border p-2 text-center">
                                  <button
                                    className="text-blue-600 hover:text-blue-800 mr-2"
                                    onClick={() => openEditCourse(c, s.semester)}
                                  >
                                    <Pencil size={16} />
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => openDeleteCourse(c, s.semester)}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}

                            <tr className="bg-gray-50 font-semibold">
                              <td className="border p-2" colSpan={3}>Total</td>
                              <td className="border p-2 text-center">{s.total}</td>
                              <td className="border p-2" colSpan={2}></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PROFIL LULUSAN */}
        {activeTab === "profil" && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Profil Lulusan</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={openAddProfile}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  <Plus size={14} /> Tambah Profil
                </button>
              </div>
            </div>

            <div className="bg-white border">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border p-2 w-40">Profil</th>
                    <th className="border p-2">Capaian Pembelajaran</th>
                    <th className="border p-2 w-36 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {profiles.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50 align-top">
                      <td className="border p-2 font-semibold align-top">{p.profil}</td>
                      <td className="border p-2">{p.capaian}</td>
                      <td className="border p-2 text-center">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-2"
                          onClick={() => openEditProfile(p, i)}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => openDeleteProfile(p, i)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {profiles.length === 0 && (
                    <tr>
                      <td className="border p-2 text-center italic" colSpan={3}>Belum ada profil lulusan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-[720px] max-w-full p-6 border">
            <button className="absolute top-4 right-4 text-gray-600" onClick={closeModal}><X size={20} /></button>

            {/* COURSE MODAL */}
            {modalFor === "course" && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  {modalType === "add" && "Tambah Mata Kuliah"}
                  {modalType === "edit" && "Edit Mata Kuliah"}
                  {modalType === "delete" && "Hapus Mata Kuliah"}
                </h3>

                {modalType === "delete" ? (
                  <p className="text-gray-700 mb-4">Yakin ingin menghapus mata kuliah <strong>{selectedCourse?.mk}</strong>?</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="border p-2"
                      placeholder="Kode MK"
                      value={selectedCourse?.kode || ""}
                      onChange={(e) => setSelectedCourse((s) => ({ ...s, kode: e.target.value }))}
                    />
                    <input
                      className="border p-2"
                      placeholder="SKS"
                      type="number"
                      value={selectedCourse?.sks || 3}
                      onChange={(e) => setSelectedCourse((s) => ({ ...s, sks: Number(e.target.value) }))}
                    />
                    <input
                      className="border p-2 col-span-2"
                      placeholder="Nama Mata Kuliah"
                      value={selectedCourse?.mk || ""}
                      onChange={(e) => setSelectedCourse((s) => ({ ...s, mk: e.target.value }))}
                    />
                    <select
                      className="border p-2"
                      value={selectedCourse?.praktikum || "Tidak Ada"}
                      onChange={(e) => setSelectedCourse((s) => ({ ...s, praktikum: e.target.value }))}
                    >
                      <option value="Ada">Ada</option>
                      <option value="Tidak Ada">Tidak Ada</option>
                    </select>
                    <div></div>
                  </div>
                )}

                <div className="mt-5 flex justify-end gap-2">
                  <button className="border px-4 py-2" onClick={closeModal}>Batal</button>
                  <button
                    className={`px-4 py-2 text-white ${modalType === "delete" ? "bg-red-600" : "bg-blue-600"}`}
                    onClick={saveCourse}
                  >
                    {modalType === "delete" ? "Hapus" : "Simpan"}
                  </button>
                </div>
              </>
            )}

            {/* PROFILE MODAL */}
            {modalFor === "profile" && (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  {modalType === "add" && "Tambah Profil Lulusan"}
                  {modalType === "edit" && "Edit Profil Lulusan"}
                  {modalType === "delete" && "Hapus Profil Lulusan"}
                </h3>

                {modalType === "delete" ? (
                  <p className="text-gray-700 mb-4">Yakin ingin menghapus profil <strong>{selectedProfile?.profil}</strong>?</p>
                ) : (
                  <div className="space-y-3">
                    <input
                      className="w-full border p-2"
                      placeholder="Nama Profil (contoh: Data Analyst)"
                      value={selectedProfile?.profil || ""}
                      onChange={(e) => setSelectedProfile((s) => ({ ...s, profil: e.target.value }))}
                    />
                    <textarea
                      className="w-full border p-2 h-36"
                      placeholder="Capaian Pembelajaran (ringkasan)"
                      value={selectedProfile?.capaian || ""}
                      onChange={(e) => setSelectedProfile((s) => ({ ...s, capaian: e.target.value }))}
                    />
                  </div>
                )}

                <div className="mt-5 flex justify-end gap-2">
                  <button className="border px-4 py-2" onClick={closeModal}>Batal</button>
                  <button
                    className={`px-4 py-2 text-white ${modalType === "delete" ? "bg-red-600" : "bg-blue-600"}`}
                    onClick={saveProfile}
                  >
                    {modalType === "delete" ? "Hapus" : "Simpan"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
