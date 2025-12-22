import React, { useState } from "react";
import { Edit2, Trash2, X, AlertTriangle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../../assets/default-course.png";
import { useAuth } from "../../../context/AuthContext";

export default function CourseCard({ course, onRefresh }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageSrc = course.image || defaultImage;

  // Navigasi ke detail course saat card diklik
  const handleClick = () => {
    navigate(`/dosen/course/${course.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Mencegah navigasi detail
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Mencegah navigasi detail
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // --- LOGIKA UTAMA: LEAVE COURSE ---
  const handleLeaveConfirm = async () => {
    if (!course.id) {
        alert("ID Course tidak ditemukan.");
        return;
    }

    setLoading(true);
    try {
      // Pastikan URL ini sesuai dengan Backend: /course/leave/{id}
      const response = await fetch(`http://127.0.0.1:8000/course/leave/${course.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();

      if (response.ok) {
        setIsDeleteModalOpen(false);
        // Memanggil fungsi refresh dari parent (CourseList.jsx) agar kartu menghilang
        if (onRefresh) onRefresh(); 
      } else {
        // Jika 404, tampilkan pesan detail dari backend
        alert(result.detail || "Gagal keluar dari course (Error 404).");
      }
    } catch (error) {
      console.error("Error leaving course:", error);
      alert("Terjadi kesalahan jaringan. Pastikan backend menyala.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD UI */}
      <div
        className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition group"
        onClick={handleClick}
      >
        <div className="relative">
          <img
            src={imageSrc}
            alt={course.title}
            className="w-full h-28 object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition"></div>
          
          <span className="absolute top-2 left-2 bg-[#173A64] text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-md">
            {course.category || "Informatics"}
          </span>
          

        </div>

        <div className="p-3 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm font-extrabold text-[#173A64] truncate w-40">{course.title}</p>
            <p className="text-[10px] text-gray-400 font-bold">{course.code || "No Code"}</p>
          </div>
          
          <button
            className="text-red-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full"
            onClick={handleDeleteClick}
            title="Leave Course"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* MODAL EDIT COURSE */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-6 text-[#173A64] border-b pb-2">
              Edit Course Detail
            </h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Course Title</label>
                <input
                  type="text"
                  defaultValue={course.title}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Code</label>
                  <input
                    type="text"
                    defaultValue={course.code}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">SKS</label>
                  <input
                    type="number"
                    defaultValue={3}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#173A64] text-white py-2.5 rounded-lg hover:bg-[#0f2846] transition font-bold shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL LEAVE COURSE (INTUITIF) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-center mb-4">
              <div className="bg-red-50 rounded-full p-4 text-red-500 ring-8 ring-red-50/50">
                <AlertTriangle size={40} />
              </div>
            </div>

            <h3 className="text-xl font-extrabold mb-2 text-gray-800">
              Leave Course?
            </h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Anda akan berhenti mengampu kursus <br/>
                <span className="font-bold text-gray-700">"{course.title}"</span>. <br/>
                Data Anda akan dihapus dari daftar pendaftaran.
            </p>

            <div className="flex flex-col gap-2">
              <button
                disabled={loading}
                onClick={handleLeaveConfirm}
                className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition font-bold shadow-md flex justify-center items-center gap-2 disabled:bg-gray-400"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Ya, Keluar dari Kursus"}
              </button>
              <button
                disabled={loading}
                onClick={handleCloseModal}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition font-bold"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}