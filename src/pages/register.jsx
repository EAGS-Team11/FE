// src/pages/register.jsx

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, GraduationCap } from "lucide-react"; 
import registerImg from "../assets/login1.png";
import logoCapstone from "../assets/Logo capstone.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; 

// Use relative paths; Vite dev proxy forwards /auth to backend during development
const API_BASE_URL = '';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State untuk data form
  const [nama, setNama] = useState(""); 
  const [nim_nip, setNimNip] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [prodi, setProdi] = useState(""); 
  
  // ROLE DIHAPUS DARI STATE DAN DISET DEFAULT MAHASISWA DI handleSubmit
  const role = "mahasiswa"; 
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook untuk navigasi setelah sukses

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    // 1. Validasi Password
    if (password !== confirmPassword) {
      setError("Error: Password dan Confirm Password tidak cocok.");
      return;
    }
    
    // Pastikan password tidak terlalu pendek (walaupun BE Anda memotong)
    if (password.length < 6) {
        setError("Error: Password minimal 6 karakter.");
        return;
    }

    setLoading(true);

    const registerData = {
      nim_nip: nim_nip,
      password: password,
      nama: nama,
      role: role,  // <-- DISET DEFAULT MAHASISWA
      prodi: prodi 
    };

    try {
      const response = await fetch(`/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData), 
      });

      setLoading(false);

      if (!response.ok) {
        let errMsg = `Request failed (${response.status})`;
        try {
          const errorData = await response.json();
          // Error detail dari FastAPI (e.g., NIM/NIP sudah terdaftar)
          errMsg = errorData.detail || JSON.stringify(errorData) || errMsg; 
        } catch (parseErr) {
          // Jika response body tidak bisa di-parse sebagai JSON
        }
        setError(errMsg);
        return;
      }

      // >>> BERHASIL REGISTRASI <<<
      setSuccess("Registration successful! Redirecting to login...");
      
      // Redirect ke halaman login setelah 2 detik
      setTimeout(() => {
          navigate("/login");
      }, 2000);

    } catch (err) {
      setLoading(false);
      setError("Failed to connect to the API server or network error.");
      console.error(err);
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center font-[JetBrains_Mono] overflow-hidden">
      <img
        src={registerImg}
        alt="Register Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 bg-black/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.6)] p-7 w-[85%] max-w-[420px] max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-[22px] font-bold text-center text-white mb-3 tracking-wide">
          Create Account
        </h2>

        <div className="flex justify-center mb-5">
          <img
            src={logoCapstone}
            alt="Logo Capstone"
            className="w-[65px] h-auto opacity-90 hover:opacity-100 transition-all"
          />
        </div>

        {/* Form Submission */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Status Message */}
          {(error || success) && (
             <div className={`text-sm p-3 rounded-lg border ${error ? 'bg-red-900/50 text-red-300 border-red-700' : 'bg-green-900/50 text-green-300 border-green-700'}`}>
               {error || success}
             </div>
          )}

          {/* Input Nama (Username) */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
          </div>

          {/* Input NIM */}
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
          
          {/* Input Program Studi */}
          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Program Studi"
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              required
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
          </div>
          
          {/* Pilihan Role (Dihapus) */}
          {/* Dihapus: Pilihan Role */}
          

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (Min 6 Karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-9 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-9 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Tombol Register */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4F8EF7] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6edb] transition-all shadow-[0_0_10px_rgba(79,142,247,0.4)] hover:shadow-[0_0_20px_rgba(79,142,247,0.6)] disabled:bg-gray-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Link ke login */}
          <p className="text-center text-xs text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-[#4F8EF7] font-medium hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}