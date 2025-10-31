import React from "react";

export default function SubmitEssayTable({ courses }) {
  return (
    <div className="bg-white border border-[#B8C8E0] rounded-lg overflow-hidden shadow-sm">
      <table className="w-full table-fixed text-[13.5px] font-[Inter] text-left">
        <thead className="bg-[#D4E2F0] text-[#1F3A60] font-semibold">
          <tr>
            <th className="py-3 px-4 w-[30%] text-left">Course</th>
            <th className="py-3 px-4 w-[30%] text-left">Essay Title</th>
            <th className="py-3 px-4 w-[20%] text-left">Deadline</th>
            <th className="py-3 px-4 w-[20%] text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="align-top font-normal text-[#1F3A60]">
          {courses.map((course, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">{course.courseTitle}</td>
              <td className="py-3 px-4">{course.essayTitle}</td>
              <td className="py-3 px-4">{course.deadline}</td>
              <td
                className="py-3 px-4 text-right text-[#3D73B4] font-semibold cursor-pointer hover:underline"
                onClick={course.onAction}
              >
                {course.status === "Belum Dikirim" ? "Kirim Jawaban" : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
