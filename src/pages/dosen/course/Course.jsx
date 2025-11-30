/* src/pages/dosen/course/Course.jsx */

import React from "react";
import CourseList from "../../../components/dosen/course/CourseList";

import { createCourse } from '../../../services/courseService';

const handleCreateCourse = async (e) => {
  e.preventDefault();
  const newCourseData = {
    kode_course: 'CAPSTONE_2526',
    nama_course: 'Capstone Project - A2526',
    access_code: 'CAPS123',
    // ... data lain dari form
  };

  try {
    const result = await createCourse(newCourseData);
    alert(`Course ${result.nama_course} berhasil dibuat! ID: ${result.id_course}`);
    // Refresh daftar kursus
  } catch (error) {
    console.error("Gagal membuat course:", error.message);
    alert(`Error: ${error.message}`);
  }
};

export default function Course() {
  return (
    <div className="relative min-h-screen w-full bg-[#F6F7FB] flex flex-col py-4 px-5">
      <CourseList />
    </div>
  );
}
