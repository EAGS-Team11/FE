import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, FileText } from "lucide-react"; 

export default function CreateEssay() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [form, setForm] = useState({
    assignmentName: "",
    description: "",
    taskType: "Essay",
    startDate: "",
    timeDuration: "",
    deadline: "",
    attachment: null,
  });

  // State untuk menyimpan nilai input waktu (Format HH:mm)
  // Ini digunakan sebagai picker durasi (Jam : Menit)
  const [durationValue, setDurationValue] = useState("");

  // Update form.timeDuration setiap kali picker berubah
  useEffect(() => {
    if (durationValue) {
      const [h, m] = durationValue.split(":").map(Number);
      
      let durationStr = "";
      if (h > 0) durationStr += `${h} Jam `;
      if (m > 0) durationStr += `${m} Menit`;
      
      // Jika user memilih 00:00, anggap kosong
      if (h === 0 && m === 0) {
         setForm((prev) => ({ ...prev, timeDuration: "" }));
      } else {
         setForm((prev) => ({
            ...prev,
            timeDuration: durationStr.trim()
         }));
      }
    } else {
       setForm((prev) => ({ ...prev, timeDuration: "" }));
    }
  }, [durationValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!form.assignmentName || !form.description || !form.deadline || !form.timeDuration) {
        alert("Mohon lengkapi Assignment Name, Description, Time Duration, dan Deadline.");
        return;
    }

    const dataToSend = {
        judul: form.assignmentName,
        deskripsi: form.description,
        deadline: form.deadline,
        startDate: form.startDate,
        taskType: form.taskType,
        timeDuration: form.timeDuration 
    };

    navigate(`/dosen/course/${courseId}/add-question`, { state: dataToSend });
  };

  const handleBack = () => {
    navigate(`/dosen/course/${courseId}`);
  };

  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen p-8 flex justify-center -mt-20">
      <div className="w-full max-w-3xl scale-[0.9]">
        {/* Header */}
        <div className="flex items-center mb-6 ml-[-70px]">
          <FileText className="w-8 h-8 mr-3 text-[#30326A]" />
          <h1 className="text-[#30326A] font-bold text-xl font-inter text-left">
            Create Assignments / Essay
          </h1>
        </div>

        {/* Title section */}
        <div className="mb-8">
          <h2 className="text-[#0B102DB3] font-bold text-base mb-1 font-inter text-left ml-[-20px]">
            Add Assignment / Essay
          </h2>
          <p className="text-[#0B102DB3] font-semibold text-sm mb-3 font-inter text-left ml-[-20px]">
            Please add assignment contents below.
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Assignment Name */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                * ASSIGNMENT NAME
              </label>
              <input
                type="text"
                name="assignmentName"
                placeholder="Masukkan judul essay"
                value={form.assignmentName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-[#0B102D] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                * ADD DESCRIPTION 
              </label>
              <textarea
                name="description"
                rows="6"
                placeholder="Task Instruction"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-[#0B102D] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
              ></textarea>
            </div>

            {/* Task Type */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                * TASK TYPE
              </label>
              <select
                name="taskType"
                value={form.taskType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-[#0B102D] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
              >
                <option value="Essay">Essay</option>
                <option value="Quiz">Quiz</option>
                <option value="Project">Project</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                * START DATE
              </label>
              <input
                type="datetime-local" 
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-[#0B102D] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
              />
            </div>

            {/* Time Duration (Single Widget Input) */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                * TIME DURATION (Batas Waktu Pengerjaan)
              </label>
              <div className="relative">
                <input
                    type="time"
                    value={durationValue}
                    onChange={(e) => setDurationValue(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-[#0B102D] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
                />
                <p className="text-xs text-gray-400 mt-1">
                    Pilih durasi (Jam : Menit)
                </p>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                * DEADLINE
              </label>
              <input
                type="datetime-local"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-[#0B102D] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
              />
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-2 font-inter text-sm text-left">
                ATTACHMENT FILE (optional)
              </label>
              <div className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-center bg-gray-50">
                <Upload className="w-10 h-10 text-[#30326A] mb-3" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer text-[#0B102D] font-inter text-sm"
                >
                  <div className="text-[#0B102DB3]">
                    Drag and drop an image, or{" "}
                    <span className="text-[#007BFF] underline">Browse</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">
                    Allowed file types: PNG, JPEG, JPG, GIF, PDF, DOCX, HTML
                    <br />
                    Maksimum file size 1GB
                  </p>
                </label>
              </div>
            </div>

            {/* Next Button (Inside) */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-[#30326A] text-white px-8 py-2 rounded-lg font-inter text-sm hover:bg-[#23245c]"
              >
                Next →
              </button>
            </div>
          </form>
        </div>

        {/* Back Button (Outside box) */}
        <div className="mt-12">
          <button
            type="button"
            onClick={handleBack}
            className="bg-[#30326A] text-white px-6 py-2 rounded-lg font-inter text-sm hover:bg-[#23245c] ml-[-800px]"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}