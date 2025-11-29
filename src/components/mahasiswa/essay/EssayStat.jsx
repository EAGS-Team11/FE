/* src/components/mahasiswa/essay/EssayStat.jsx */

import React from "react";

export default function EssayStat({ label, value, staticShadow }) {
  return (
    <div
      className={`bg-white rounded-[14px] p-6 text-center ${
        staticShadow
          ? "shadow-md" 
          : "hover:shadow-md transition duration-200"
      }`}
    >
      <h3 className="text-[16px] font-semibold text-black/70">{label}</h3>
      <p className="text-[28px] font-bold text-[#3D73B4] mt-2">{value}</p>
    </div>
  );
}
