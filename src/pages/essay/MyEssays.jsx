import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import myessays1 from "../../assets/myessays1.png";
import myessays2 from "../../assets/myessays2.png";
import EssayTable from "../../components/essay/EssayTable";
import EssayStat from "../../components/essay/EssayStat"; 
import { essays } from "../../data/essay/essayData";
import { useNavigate } from "react-router-dom";

export default function MyEssays() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter essays 
  const filteredEssays = essays.filter((essay) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      essay.title.toLowerCase().includes(query) ||
      essay.status.toLowerCase().includes(query) ||
      essay.feedback.toLowerCase().includes(query) ||
      essay.score?.toString().includes(query) ||
      essay.date?.toLowerCase().includes(query);
    const matchesStatus =
      filterStatus === "All" ? true : essay.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Hitung statistik berdasarkan tabel
  const totalSubmitted = essays.length;
  const gradedEssays = essays.filter((e) => e.status === "Graded").length;
  const pendingReview = essays.filter(
    (e) => e.status === "Pending" || e.status === "In Review"
  ).length;
  const averageScore =
    gradedEssays > 0
      ? (
          essays
            .filter((e) => e.status === "Graded")
            .reduce((sum, e) => sum + (e.score || 0), 0) / gradedEssays
        ).toFixed(1)
      : 0;

  const stats = [
    { label: "Total Essay Submitted", value: totalSubmitted },
    { label: "Pending Review", value: pendingReview },
    { label: "Graded Essays", value: gradedEssays },
    { label: "Average Score", value: averageScore },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#F5F8FB] font-[Inter] overflow-hidden z-10">
      {/* Background images */}
      <img
        src={myessays1}
        alt="header decoration"
        className="absolute top-4 left-6 w-20"
      />
      <img
        src={myessays2}
        alt="background decoration"
        className="absolute bottom-0 right-[-130px] w-[350px]"
      />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-12 pt-10">
        <h1 className="text-[28px] font-bold text-black ml-14">My Essays</h1>
        <button 
          className="bg-[#3D73B4] text-white font-bold px-6 py-2 rounded-[7px] hover:bg-[#2f5f97] transition"
          onClick={() => navigate("/submit-essay")}
        >
          Submit New Essay
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center gap-4 px-12 mt-6 relative">
        {/* Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center justify-between w-[180px] rounded-[10px] px-4 py-2 text-[16px] text-black/70 transition-all duration-200 
              ${isDropdownOpen ? "shadow-md scale-[1.02]" : "hover:shadow-sm"}`}
          >
            <span className="truncate">
              {filterStatus === "All" ? "Filter by Status" : filterStatus}
            </span>
            <ChevronDown
              className="w-5 h-5 text-black/60 flex-shrink-0 transition-transform duration-200"
              style={{
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Dropdown slide down */}
          <div
            className={`absolute bg-white border border-gray-300 rounded-[10px] shadow-md z-10 w-[180px] 
              transition-all duration-300 ease-out origin-top
              ${
                isDropdownOpen
                  ? "scale-y-100 opacity-100 mt-2"
                  : "scale-y-0 opacity-0 mt-0"
              } `}
            style={{ transformOrigin: "top" }}
          >
            {["All", "Graded", "In Review", "Pending"].map((status) => (
              <div
                key={status}
                onClick={() => {
                  setFilterStatus(status);
                  setIsDropdownOpen(false);
                }}
                className="px-4 py-2 text-[15px] text-black/70 hover:bg-[#E8EEF6] cursor-pointer"
              >
                {status}
              </div>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="relative w-[600px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Title / Keyword"
            className="w-full border border-black/40 rounded-[10px] py-2 pl-4 pr-10 text-[16px] text-black/70 placeholder-black/50 focus:outline-none 
              focus:ring-2 focus:ring-[#3D73B4] transition-all duration-200"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
        </div>
      </div>

      {/* Statistic Cards pakai komponen EssayStat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-12 mt-10">
        {stats.map((item, idx) => (
          <EssayStat
            key={idx}
            label={item.label}
            value={item.value}
            staticShadow={true}
          />
        ))}
      </div>

      {/* Essay Table */}
      <div className="relative z-10 px-12 mt-10 pb-16 min-h-[400px]">
        <EssayTable essays={filteredEssays} />
      </div>
    </div>
  );
}
