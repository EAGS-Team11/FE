// src/config.js
// Menggunakan environment variables Vite (VITE_APP_...)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';