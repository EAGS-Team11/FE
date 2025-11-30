// src/services/courseService.js
import { apiFetch } from "./apiService";

/**
 * [DOSEN] Membuat mata kuliah baru.
 * @param {object} courseData - { kode_course, nama_course, access_code }
 * @returns {Promise<object>} CourseOut object
 */
export const createCourse = async (courseData) => {
  // Endpoint: POST /course/
  return apiFetch("/course/", "POST", courseData);
};

/**
 * [MAHASISWA] Bergabung ke mata kuliah menggunakan ID Course.
 * CATATAN: Backend saat ini HARDCODE id_mahasiswa = 2.
 * @param {number} courseId
 * @returns {Promise<object>} CourseEnrollOut object
 */
export const joinCourse = async (courseId) => {
  // Endpoint: POST /course/join
  const enrollData = { id_course: courseId };
  return apiFetch("/course/join", "POST", enrollData);
};

/**
 * [DOSEN/MAHASISWA] Mengambil daftar mata kuliah yang relevan (implementasi di BE belum ada, ini hanya placeholder)
 * @returns {Promise<array>} Array of CourseOut
 */
export const getMyCourses = async () => {
  // Asumsi ada endpoint GET /course/mine di backend (Walaupun belum ada di main.py)
  return apiFetch("/course/mine", "GET");
};