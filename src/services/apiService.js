import { API_BASE_URL } from "../config";

/**
 * Mendapatkan token JWT dari local storage
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return { "Content-Type": "application/json" };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Format wajib FastAPI
  };
};

/**
 * Fungsi fetch generik untuk endpoint yang terproteksi
 * @param {string} endpoint - Misalnya: "/course" atau "/submission"
 * @param {string} method - Misalnya: "GET", "POST"
 * @param {object} body - Data body untuk POST/PUT
 */
export const apiFetch = async (endpoint, method = "GET", body = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = getAuthHeaders();

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);

  // Jika response tidak ok, lempar error yang lebih informatif
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `API request failed with status ${response.status}`);
  }

  // Khusus untuk 204 No Content (misalnya DELETE)
  if (response.status === 204) {
    return {}; 
  }
  
  return response.json();
};