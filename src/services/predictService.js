// src/services/predictService.js
import { apiFetch } from "./apiService";

/**
 * [SISTEM/DOSEN] Meminta skor prediksi AI untuk jawaban yang baru di-submit.
 * @param {object} predictionData - Biasanya berisi ID Submission atau teks jawaban.
 */
export const getAiPrediction = async (predictionData) => {
  // Endpoint: POST /predict/
  // Backend saat ini menggunakan dummy score.
  return apiFetch("/predict/", "POST", predictionData);
};

/**
 * [DOSEN] Endpoint untuk menyimpan grading manual atau yang telah disetujui Dosen.
 * *Endpoint ini belum ada di Backend, Anda perlu membuatnya!*
 */
export const saveGrading = async (gradingData) => {
    // Endpoint: POST /grading/ (PERLU DITAMBAH DI BACKEND)
    return apiFetch("/grading/", "POST", gradingData);
};