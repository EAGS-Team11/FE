/* src/pages/login.jsx */

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import loginImg from "../assets/login1.png";
import logoCapstone from "../assets/Logo capstone.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Use relative paths; Vite dev proxy forwards /auth to backend during development
const API_BASE_URL = '';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [nim_nip, setNimNip] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const { login } = useAuth(); // Ambil fungsi login dari Context

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    // Menggunakan skema lengkap karena BE endpoint login Anda masih menerima UserCreate/UserLogin
    // Untuk menghindari 422, kita kirim semua field yang dibutuhkan BE
    const finalData = {
        nim_nip: nim_nip,
        password: password,
        nama: "dummy", 
        role: "mahasiswa", // Default role
        prodi: "dummy"
    };

    try {
      const response = await fetch(`/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData), 
      });

      setLoading(false);

      if (!response.ok) {
        let errMsg = `Request failed (${response.status})`;
        try {
          const errorData = await response.json();
          errMsg = errorData.detail || JSON.stringify(errorData) || errMsg;
        } catch (parseErr) {
          // ignore JSON parse error
        }
        setError(errMsg);
        return;
      }

      const data = await response.json();
      
      // Panggil fungsi login dari Context untuk menyimpan token dan user
      login(data.user, data.access_token);
      
      // 1. Cek Role dan Redirect
      if (data.user.role === 'dosen' || data.user.role === 'admin') {
          navigate("/dosen/course"); // Redirect ke halaman Dosen
      } else {
          navigate("/home"); // Redirect ke halaman Mahasiswa
      }

    } catch (err) {
      setLoading(false);
      console.error("Login request failed:", err);
      // Tampilkan pesan error yang lebih informatif jika tersedia
      setError(err?.message || "Failed to connect to the API server or network error.");
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center font-[JetBrains_Mono] overflow-hidden">
      <img src={loginImg} alt="Login Background" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Kotak login */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 bg-black/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.6)] p-7 w-[85%] max-w-[420px]"
      >
        <h2 className="text-[22px] font-bold text-center text-white mb-3 tracking-wide">Log In</h2>
        <div className="flex justify-center mb-5">
          <img src={logoCapstone} alt="Logo Capstone" className="w-[65px] h-auto opacity-90 hover:opacity-100 transition-all"/>
        </div>

        {/* Form Submission */}
        <form className="space-y-5" onSubmit={handleSubmit}> 
          
          {/* Tampilkan Error */}
          {error && (
             <div className="bg-red-900/50 text-red-300 text-sm p-3 rounded-lg border border-red-700">
               {error}
             </div>
          )}

          {/* Input NIM / NIP */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="NIM / NIP"
              value={nim_nip}
              onChange={(e) => setNimNip(e.target.value)}
              required
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-9 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={togglePassword}
            >
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Lupa password */}
          <div className="text-center">
            <a
              href="#"
              className="text-[#4F8EF7] hover:underline text-xs font-medium"
            >
              Forgot your password?
            </a>
          </div>

          {/* Tombol login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4F8EF7] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6edb] transition-all shadow-[0_0_10px_rgba(79,142,247,0.4)] hover:shadow-[0_0_20px_rgba(79,142,247,0.6)] disabled:bg-gray-500"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
          
           {/* Teks daftar */}
           <p className="text-center text-xs text-gray-400">
             Don’t have an account?{" "}
             <a
               href="/register"
               className="text-[#4F8EF7] font-medium hover:underline"
             >
               Sign Up
             </a>
           </p>
        </form>
      </motion.div>
    </div>
  );
}