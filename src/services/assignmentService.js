// src/services/assignmentService.js
import { apiFetch } from "./apiService";

/**
 * [DOSEN] Membuat tugas/essay baru.
 */
export const createAssignment = async (assignmentData) => {
  // Endpoint: POST /assignment/
  return apiFetch("/assignment/", "POST", assignmentData);
};

/**
 * [MAHASISWA] Mengirimkan jawaban tugas.
 * CATATAN: Backend saat ini HARDCODE id_mahasiswa = 2.
 */
export const submitAnswer = async (id_assignment, jawaban) => {
  // Endpoint: POST /submission/
  const submissionData = {
    id_assignment: id_assignment,
    jawaban: jawaban,
  };
  return apiFetch("/submission/", "POST", submissionData);
};

// **********************************************
// NOTE: Endpoint GET untuk Assignments dan Submissions 
// yang spesifik belum ada di main.py, ini adalah placeholder.
// **********************************************

/**
 * [MAHASISWA] Mengambil daftar tugas berdasarkan Course ID.
 */
export const getAssignmentsByCourse = async (courseId) => {
    // Asumsi ada endpoint GET /assignment/by-course/{courseId}
    return apiFetch(`/assignment/by-course/${courseId}`, "GET");
};