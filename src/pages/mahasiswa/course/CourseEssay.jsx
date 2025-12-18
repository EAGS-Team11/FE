/* src/pages/mahasiswa/course/CourseEssay.jsx */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; 
import { Clock, Calendar, FileText, ArrowRight, HelpCircle } from "lucide-react"; // Import Icons

export default function CourseEssayList() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); 

  const [courseInfo, setCourseInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. AMBIL INFO COURSE
        const resCourse = await fetch("http://127.0.0.1:8000/course/", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const dataCourses = await resCourse.json();
        const foundCourse = dataCourses.find(c => c.id_course === Number(courseId));
        setCourseInfo(foundCourse);

        // 2. AMBIL DAFTAR ASSIGNMENT
        const resAssign = await fetch(`http://127.0.0.1:8000/assignment/course/${courseId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (resAssign.ok) {
            const dataAssign = await resAssign.json();
            console.log("Data Backend:", dataAssign); // Debugging

            // Mapping Data BE -> FE
            const mappedAssign = dataAssign.map(item => ({
                id: item.id_assignment,
                title: item.judul,
                desc: item.deskripsi,
                
                // Format Deadline
                deadline: item.deadline 
                    ? new Date(item.deadline).toLocaleDateString("id-ID", {
                        weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                      })
                    : "Tanpa Deadline",

                // Data Baru dari Backend
                duration: item.time_duration || "-", 
                type: item.task_type || "Essay",
                
                // Hitung jumlah soal jika array questions dikirim
                questionCount: item.questions ? item.questions.length : 0 
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
    return <div className="min-h-screen flex items-center justify-center text-blue-800 font-bold">Memuat Tugas...</div>;
  }

  if (!courseInfo) {
    return (
        <div className="p-10 text-center">
            <h2 className="text-xl font-bold text-gray-700">Course Tidak Ditemukan</h2>
            <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 underline">Kembali</button>
        </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-[#F6F7FB] min-h-screen font-[Inter] py-28">
      
      {/* HEADER */}
      <div className="mb-8 ml-2">
        <h1 className="text-3xl font-bold text-[#173A64] mb-2">
          {courseInfo.nama_course}
        </h1>
        <div className="flex items-center gap-2 text-gray-500 font-medium bg-white px-4 py-2 rounded-lg w-fit shadow-sm">
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-sm font-bold">{courseInfo.kode_course}</span>
            <span>List Assignment</span>
        </div>
      </div>

      {/* LIST TUGAS */}
      <div className="max-w-4xl">
        {assignments.length > 0 ? (
          <div className="grid gap-6">
            {assignments.map((essay) => (
              <div
                key={essay.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Decorative Left Border */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#173A64]"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                             <h3 className="text-xl font-bold text-[#173A64]">
                                {essay.title}
                            </h3>
                            <span className="text-[10px] uppercase font-bold tracking-wider bg-purple-100 text-purple-700 px-2 py-1 rounded-md border border-purple-200">
                                {essay.type}
                            </span>
                        </div>
                       
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {essay.desc || "Tidak ada deskripsi tambahan."}
                        </p>
                        
                        {/* Meta Info Badge */}
                        <div className="flex flex-wrap gap-3 text-xs font-semibold text-gray-600">
                            <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg">
                                <Clock className="w-3.5 h-3.5" /> 
                                {essay.deadline}
                            </div>
                            
                            {essay.duration !== "-" && (
                                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">
                                    <Calendar className="w-3.5 h-3.5" /> 
                                    Durasi: {essay.duration}
                                </div>
                            )}

                            <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">
                                <HelpCircle className="w-3.5 h-3.5" /> 
                                {essay.questionCount} Soal
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => navigate(`/submit-essay/${courseId}/${essay.id}`)}
                        className="group flex items-center gap-2 bg-[#173A64] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#23245c] transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-blue-900/20"
                    >
                        Kerjakan Tugas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">Tidak Ada Tugas Aktif</h3>
            <p className="text-sm text-gray-500 mt-1">Hore! Anda tidak memiliki tanggungan tugas saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}