import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload } from "lucide-react"; 
import createEssayImg from "../../../assets/createessay.png";

export default function CreateEssay() {
  const [form, setForm] = useState({
    assignmentName: "",
    description: "",
    taskType: "Essay",
    startDate: "",
    timeDuration: "",
    deadline: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    navigate(`/dosen/course/${courseId}/add-question`);
  };

  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleBack = () => {
  navigate(`/dosen/course/${courseId}`);
 };


  return (
    <div className="w-full bg-[#F9FAFB] min-h-screen p-8 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center mb-6 ml-[-70px]">
          <img src={createEssayImg} alt="Create Essay" className="w-8 h-8 mr-3" />
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
                type="text"
                name="startDate"
                placeholder="15 November 2025"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-[#0B102D] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
              />
            </div>

            {/* Time Duration */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                * TIME DURATION
              </label>
              <input
                type="text"
                name="timeDuration"
                placeholder="13.00 – 17.00 WIB"
                value={form.timeDuration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-[#0B102D] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#30326A]"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-[#0B102D] font-semibold mb-1 font-inter text-sm text-left">
                * DEADLINE
              </label>
              <input
                type="text"
                name="deadline"
                placeholder="16 November 2025, 17.00 WIB"
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
