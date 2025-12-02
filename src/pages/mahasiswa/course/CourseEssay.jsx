/* src/pages/mahasiswa/course/CourseEssay.jsx */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // 1. Import Auth

export default function CourseEssayList() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); // Ambil token

  // STATE DATA REAL
  const [courseInfo, setCourseInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // A. AMBIL INFO COURSE (Judul & Kategori)
        // Kita fetch semua course dulu (Catalog) lalu cari yg ID-nya pas
        const resCourse = await fetch("http://127.0.0.1:8000/course/", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const dataCourses = await resCourse.json();
        const foundCourse = dataCourses.find(c => c.id_course === Number(courseId));
        setCourseInfo(foundCourse);

        // B. AMBIL DAFTAR ASSIGNMENT (TUGAS)
        const resAssign = await fetch(`http://127.0.0.1:8000/assignment/course/${courseId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (resAssign.ok) {
            const dataAssign = await resAssign.json();
            
            // Mapping Data BE -> FE
            const mappedAssign = dataAssign.map(item => ({
                id: item.id_assignment,
                title: item.judul,
                desc: item.deskripsi,
                deadline: new Date(item.deadline).toLocaleDateString("id-ID", {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                }),
                questions: 5 // Placeholder (karena BE belum kirim jumlah soal)
            }));
            
            setAssignments(mappedAssign);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && courseId) fetchData();
  }, [courseId, token]);

  if (loading) {
    return <div className="p-20 text-center text-blue-600 font-bold animate-pulse">Memuat Data Tugas...</div>;
  }

  if (!courseInfo) {
    return <div className="p-20 text-center text-gray-500">Course tidak ditemukan atau Anda belum login.</div>;
  }

  return (
    <div className="p-8 bg-[#F6F7FB] min-h-screen font-inter py-28">
      {/* Header Course */}
      <div className="flex flex-col items-start mb-8 ml-12">
        <h1 className="text-[28px] font-bold text-[#25335A] mb-2">
          {courseInfo.nama_course}
        </h1>
        <p className="text-gray-600 font-medium">
            {courseInfo.kode_course} - {courseInfo.nama_course}
        </p>
      </div>

      {/* Essay List */}
      <div className="bg-[#ECEDEF] rounded-[15px] p-8 max-w-[900px] mx-auto">
        {assignments.length > 0 ? (
          <div className="flex flex-col gap-6">
            {assignments.map((essay) => (
              <div
                key={essay.id}
                className="bg-white p-6 rounded-[15px] shadow-md hover:shadow-lg transition border border-gray-200"
              >
                <h3 className="text-[20px] font-semibold text-[#25335A] mb-2">
                  {essay.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{essay.desc}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <p>🗓 Deadline: {essay.deadline}</p>
                  <p>📘 Essay Task</p>
                </div>
                
                <button
                  onClick={() => navigate(`/submit-essay/${courseId}/${essay.id}`)}
                  className="bg-[#3D73B4] text-white px-5 py-2 rounded-[8px] font-medium hover:bg-[#2f5f97] transition"
                >
                  Start Essay
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Belum ada tugas yang diberikan dosen.</p>
            <p className="text-sm text-gray-400">Silakan cek lagi nanti.</p>
          </div>
        )}
      </div>
    </div>
  );
}
