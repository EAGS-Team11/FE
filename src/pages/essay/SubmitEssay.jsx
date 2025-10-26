import React from "react";
import SubmitEssayTable from "../../components/essay/SubmitEssayTable";
import myessays3 from "../../assets/myessays3.png";
import { useNavigate } from "react-router-dom";
import { submitEssayData } from "../../data/essay/submitData";
import { ArrowLeft } from "lucide-react"; 

export default function SubmitEssay() {
  const navigate = useNavigate();

  const courses = submitEssayData.map(item => ({
    ...item,
    onAction: () => navigate(item.route),
  }));

  return (
    <div className="relative w-full min-h-screen bg-[#F5F8FB] font-[Inter] overflow-hidden px-12 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[28px] font-bold text-black flex items-center gap-2">
          <img src={myessays3} alt="icon" className="w-20 h-20" />
          Submit New Essay
        </h1>
      </div>

      {/* Table */}
      <SubmitEssayTable courses={courses} />

      {/* Back Button */}
      <div className="mt-6 flex justify-start">
        <button
          className="bg-[#3D73B4] text-white font-bold px-8 py-2 rounded-[7px] hover:bg-[#2f5f97] flex items-center gap-2 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          Back
        </button>
      </div>
    </div>
  );
}
