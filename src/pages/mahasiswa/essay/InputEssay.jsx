/* src/pages/mahasiswa/essay/InputEssay.jsx */

import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Plus, Minus, ListTree, Loader2 } from "lucide-react";
// 1. IMPORT AUTH
import { useAuth } from "../../../context/AuthContext";

export default function InputEssay() {
  const { courseId, essayId } = useParams(); // essayId disini adalah assignmentId dari database
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { token } = useAuth();

  // STATE DATA REAL
  const [assignmentData, setAssignmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // STATE EDITOR (Kita set default array 1 elemen karena backend cuma 1 soal)
  const [answers, setAnswers] = useState([""]); 
  const [checked, setChecked] = useState([false]);
  
  // Styling State
  const [currentIndex, setCurrentIndex] = useState(0); // Selalu 0 (karena cuma 1 soal)
  const [fontSize, setFontSize] = useState(14);
  const [fontColor, setFontColor] = useState("#000000");

  // --- 1. FETCH DATA ASSIGNMENT DARI BACKEND ---
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        // Kita fetch list assignment dari course ini, lalu cari yang ID-nya cocok
        const response = await fetch(`http://127.0.0.1:8000/assignment/course/${courseId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            const target = data.find(a => a.id_assignment === Number(essayId));
            
            if (target) {
                setAssignmentData(target);
            } else {
                alert("Tugas tidak ditemukan!");
                navigate(-1);
            }
        }
      } catch (err) {
        console.error("Error fetching assignment:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && courseId) fetchAssignment();
  }, [courseId, essayId, token, navigate]);


  // --- EDITOR FUNCTIONS ---
  const handleInput = () => {
    const updated = [...answers];
    updated[currentIndex] = editorRef.current.innerHTML;
    setAnswers(updated);
  };

  const applyCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const changeFontSize = (change) => {
    const newSize = Math.max(10, Math.min(36, fontSize + change));
    setFontSize(newSize);
    applyCommand("fontSize", "4"); 
    // Hack untuk execCommand fontSize
    const fontElements = document.getElementsByTagName("font");
    for (let i = 0; i < fontElements.length; i++) {
      if (fontElements[i].size === "4") {
        fontElements[i].removeAttribute("size");
        fontElements[i].style.fontSize = `${newSize}px`;
      }
    }
  };
  
  const handleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  // --- 2. LOGIKA SUBMIT KE BACKEND ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!checked[0] || answers[0].trim() === "") {
      alert("⚠️ Harap isi jawaban dan centang konfirmasi 'Finalized' sebelum mengirim.");
      return;
    }

    try {
        // Payload sesuai Schema SubmissionCreate Backend
        const payload = {
            id_assignment: Number(essayId),
            jawaban: answers[0] // Kita ambil jawaban pertama saja
        };

        const response = await fetch("http://127.0.0.1:8000/submission/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Gagal mengirim jawaban");
        }

        alert(`✅ Jawaban untuk "${assignmentData.judul}" berhasil dikirim!`);
        // Redirect kembali ke halaman list tugas atau halaman sukses
        navigate(`/course/${courseId}`);

    } catch (err) {
        console.error(err);
        alert("Gagal mengirim jawaban: " + err.message);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-blue-600">Memuat Soal...</div>;
  if (!assignmentData) return null;

  return (
    <div className="min-h-screen bg-white flex font-[Inter] py-20">
      
      {/* Sidebar Soal (Disederhanakan jadi 1 Soal) */}
      <div className="w-[150px] bg-white border-r border-gray-200 flex flex-col items-center py-8">
        <h2 className="text-[#222] font-semibold text-lg mb-6">Soal</h2>
        <div className="grid grid-cols-1 gap-3">
            <button
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    checked[0] ? "bg-green-500 text-white" : "bg-[#3D73B4] text-white ring-2 ring-[#3D73B4]"
                }`}
            >
                1
            </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 px-14 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Judul Tugas dari Backend */}
          <h1 className="text-[22px] font-bold text-gray-900 mb-6 border-b pb-2">
            {assignmentData.judul}
          </h1>

          {/* Deskripsi Soal dari Backend */}
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6 text-gray-800 font-medium">
            <h3 className="text-sm text-blue-600 font-bold mb-1">SOAL:</h3>
            {assignmentData.deskripsi}
          </div>

          {/* Toolbar Editor */}
          <div className="flex flex-wrap gap-3 mb-4 p-2 bg-gray-100 rounded-md border border-gray-300">
            <button onClick={() => applyCommand("bold")} title="Bold"><Bold className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("italic")} title="Italic"><Italic className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("underline")} title="Underline"><Underline className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("strikeThrough")} title="Strikethrough"><Strikethrough className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("justifyLeft")} title="Align Left"><AlignLeft className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("justifyCenter")} title="Center"><AlignCenter className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("justifyRight")} title="Align Right"><AlignRight className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("justifyFull")} title="Justify"><ListTree className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("insertUnorderedList")} title="Bullets"><List className="w-5 h-5" /></button>
            <button onClick={() => applyCommand("insertOrderedList")} title="Numbering"><ListOrdered className="w-5 h-5" /></button>
            <button onClick={() => changeFontSize(1)} title="Increase Font Size"><Plus className="w-5 h-5" /></button>
            <button onClick={() => changeFontSize(-1)} title="Decrease Font Size"><Minus className="w-5 h-5" /></button>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => {
                setFontColor(e.target.value);
                applyCommand("foreColor", e.target.value);
              }}

              className="w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Area Ketik Jawaban */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="w-full min-h-[300px] border border-gray-300 rounded-md p-4 bg-white focus:outline-[#3D73B4] text-left"
            style={{
              fontSize: `${fontSize}px`,
              color: fontColor,

            }}

          ></div>

          {/* Checkbox Konfirmasi */}
          <div className="flex items-center gap-3 mt-4 bg-yellow-50 p-3 rounded-md border border-yellow-100">
            <input
              type="checkbox"
              checked={checked[0]}
              onChange={() => handleCheck(0)}
              className="w-5 h-5 accent-[#3D73B4]"
            />
            <label className="text-gray-700 text-sm">
              Saya telah meninjau jawaban dan siap untuk mengirimkannya. (Tidak bisa diedit setelah dikirim)
            </label>
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-end mt-10">
            <button
                onClick={handleSubmit}
                className={`px-8 py-3 text-white rounded-lg font-bold transition shadow-lg ${
                    checked[0] 
                    ? "bg-green-600 hover:bg-green-700 hover:scale-105" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!checked[0]}
            >
                Submit Essay
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
