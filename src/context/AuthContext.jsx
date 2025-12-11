// src/context/AuthContext.jsx (Diperbarui)

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [token, setToken] = useState(localStorage.getItem('authToken')); 
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    
    // --- STATE BARU: Menandakan loading awal / inisialisasi ---
    const [isLoading, setIsLoading] = useState(true); 
    
    const navigate = useNavigate();

    // Memuat data user saat aplikasi dimuat atau token berubah
    useEffect(() => {
        const initializeAuth = () => {
            const storedToken = localStorage.getItem('authToken');
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
                // Token dan data user ditemukan di storage
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } else {
                // Tidak ada token, pastikan state bersih
                setToken(null);
                setUser(null);
                setIsAuthenticated(false);
            }
            
            // Proses inisialisasi selesai, set loading ke false
            setIsLoading(false); 
        };

        // Panggil inisialisasi (di dunia nyata, ini bisa berupa panggilan API /auth/me)
        initializeAuth();
    }, []); 


    const login = (userData, accessToken) => {
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(accessToken);
        setUser(userData);
        setIsAuthenticated(true);
        // Biarkan isLoading tetap false setelah login
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    const contextValue = {
        user,
        token,
        isAuthenticated,
        // --- Ekspor state loading ---
        isLoading, 
        // -----------------------------
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};