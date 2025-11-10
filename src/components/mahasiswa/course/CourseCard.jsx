import React from "react";
import defaultCourseImg from "../../../assets/default-course.png"; // 🔹 Gambar default

const CourseCard = ({ title, category }) => {
  return (
    <div className="relative w-[280px] h-[273px] bg-white rounded-[15px] overflow-hidden shadow-md
                    hover:shadow-xl hover:-translate-y-2 transition transform duration-300">
      
      {/* Gambar Default */}
      <div className="w-full h-[173px] relative">
        <img
          src={defaultCourseImg}
          alt="Course Background"
          className="w-full h-full object-cover"
        />

        {/* Label kategori */}
        <div className="absolute top-3 left-3 w-[137px] h-[27px] bg-[#2F2975]/90 rounded-[15px] flex justify-center items-center">
          <span className="text-white text-[15px] italic font-inter">
            {category}
          </span>
        </div>
      </div>

      {/* Judul course */}
      <div className="p-3">
        <h3 className="text-[#25335A] font-inter font-medium text-[14px]">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CourseCard;
