// src/services/uploadService.js
import { apiFetch, apiUploadFile } from "./apiService"; // Import apiUploadFile

/**
 * [USER] Mengirimkan esai sebagai teks JSON untuk diproses.
 */
export const uploadEssayText = async (title, content) => {
  // Endpoint: POST /upload/text
  const essayData = { title, content };
  return apiFetch("/upload/text", "POST", essayData);
};

/**
 * [USER] Mengunggah file (PDF/TXT) dan memprosesnya.
 * @param {File} file - Objek file dari input HTML.
 */
export const uploadFile = async (file) => {
  // Endpoint: POST /upload/file
  // Menggunakan helper apiUploadFile untuk FormData
  return apiUploadFile("/upload/file", file);
};