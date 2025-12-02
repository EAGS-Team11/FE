// src/context/authContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Definisikan Context
const AuthContext = createContext(null);

// 2. Custom Hook untuk menggunakan Context
export const useAuth = () => useContext(AuthContext);

// 3. Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan objek user {id, nama, role, dll.}
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Menyimpan token JWT
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();

  // Memuat data user saat aplikasi dimuat atau token berubah (Jika token ada)
  useEffect(() => {
    // Pada aplikasi nyata, di sini kita akan memanggil API /users/me untuk mendapatkan data user dari token
    // Untuk tujuan demo ini, kita akan asumsikan user dimuat saat login.
    if (token && !user) {
        // Coba baca role dari local storage jika ada, atau biarkan null
        const storedUser = JSON.parse(localStorage.getItem('user')) || null;
        if (storedUser) {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
    }
  }, [token]);


  const login = (userData, accessToken) => {
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };
  
  // --- SOLUSI 1: FUNGSI BARU UNTUK UPDATE USER DI CONTEXT ---
  const updateUser = (newUserData) => {
      // Pastikan token dan data user lama ada sebelum update
      if (token && user) {
          const updatedUser = { ...user, ...newUserData };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          // Catatan: Jika token baru juga dikirim, Anda perlu memperbarui token di sini.
      }
  };
  const contextValue = {
      user,
      token,
      isAuthenticated,
      login,
      logout,
      updateUser, // <-- TAMBAHKAN KE CONTEXT VALUE
  };

  return (
      <AuthContext.Provider value={contextValue}>
          {children}
      </AuthContext.Provider>
  );
};