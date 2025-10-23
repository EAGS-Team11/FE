import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import myessays1 from "../../assets/myessays1.png";
import myessays2 from "../../assets/myessays2.png";
import EssayStat from "../../components/EssayStat";
import EssayTable from "../../components/EssayTable";
import { stats, essays } from "../../data/essayData";

export default function MyEssays() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter essays berdasarkan status & pencarian
  const filteredEssays = essays.filter((essay) => {
    const matchesSearch =
      essay.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      essay.feedback.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ? true : essay.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative w-full min-h-screen bg-[#F5F8FB] font-[Inter] overflow-hidden">
      {/* Background images */}
      <img
        src={myessays1}
        alt="header decoration"
        className="absolute top-4 left-6 w-20"
      />
      <img
        src={myessays2}
        alt="background decoration"
        className="absolute bottom-0 right-0 w-[450px] opacity-20 -z-10"
      />

      {/* Header section */}
      <div className="flex justify-between items-center px-12 pt-10">
        <h1 className="text-[28px] font-bold text-black ml-14">My Essays</h1>
        <button className="bg-[#3D73B4] text-white font-bold px-6 py-2 rounded-[7px] hover:bg-[#2f5f97] transition">
          Submit New Essay
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center gap-4 px-12 mt-6 relative">
        {/* Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-[180px] rounded-[10px] px-4 py-2 text-[16px] text-black/70 focus:outline-none"
          >
            <span className="truncate">
                {filterStatus === "All" ? "Filter by Status" : filterStatus}
            </span>
            <ChevronDown className="w-5 h-5 text-black/60 flex-shrink-0" />
          </button>

          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded-[10px] shadow-md z-10 w-[180px] animate-fadeIn">
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
          )}
        </div>

        {/* Search Box */}
        <div className="relative w-[600px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Title / Keyword"
            className="w-full border border-black/50 rounded-[10px] py-2 pl-4 pr-10 text-[16px] text-black/70 placeholder-black/50 focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
        </div>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-12 mt-10">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[10px] shadow-md p-6 text-center"
          >
            <p className="text-[16px] text-black/70 font-medium">{item.label}</p>
            <h3 className="text-[26px] font-bold text-[#3D73B4] mt-2">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Essay Table */}
      <div className="px-12 mt-10 pb-16 min-h-[400px]">
        <EssayTable essays={filteredEssays} />
      </div>
    </div>
  );
}
