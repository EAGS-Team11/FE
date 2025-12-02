// src/services/apiService.js

import { API_BASE_URL } from "../config";

/**
 * Mendapatkan header otentikasi (JWT Bearer Token)
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  const headers = { "Content-Type": "application/json" };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`; // Format wajib FastAPI
  }
  return headers;
};

/**
 * Fungsi fetch generik untuk semua endpoint
 * @param {string} endpoint - Misalnya: "/course" atau "/submission"
 * @param {string} method - Misalnya: "GET", "POST"
 * @param {object} body - Data body untuk POST/PUT
 * @param {boolean} isFile - Jika true, tidak menyertakan Content-Type: application/json
 */
export const apiFetch = async (endpoint, method = "GET", body = null, isFile = false) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Ambil headers (termasuk token)
  const headers = getAuthHeaders();
  
  // Hapus Content-Type jika mengirim FormData (misalnya untuk upload file)
  if (isFile) {
    delete headers['Content-Type']; 
  }

  const options = {
    method,
    headers,
    body: (body && !isFile) ? JSON.stringify(body) : body, // Jika bukan file, stringify body
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    let errorData = {};
    try {
        errorData = await response.json();
    } catch (e) {
        // Jika respons bukan JSON (misal 500 Internal Server Error)
        errorData.detail = `Request failed with status ${response.status}`;
    }
    throw new Error(errorData.detail || `API request failed: ${response.statusText}`);
  }

  if (response.status === 204) {
    return {};
  }
  
  return response.json();
};

/**
 * Fungsi khusus untuk Upload File (Multipart Form Data)
 * @param {string} endpoint - Misalnya: "/upload/file"
 * @param {File} file - Objek File yang akan diupload
 * @returns {Promise<object>} Response object dari backend
 */
export const apiUploadFile = async (endpoint, file) => {
  const formData = new FormData();
  formData.append('file', file);
  // Endpoint: POST /upload/file

  // Gunakan apiFetch dengan body berupa FormData dan flag isFile=true
  return apiFetch(endpoint, 'POST', formData, true);
};