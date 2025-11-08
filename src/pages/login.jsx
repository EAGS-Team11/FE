import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import loginImg from "../assets/login1.png";
import logoCapstone from "../assets/Logo capstone.png";
import { motion } from "framer-motion";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center font-[JetBrains_Mono] overflow-hidden">
      <img
        src={loginImg}
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay hitam transparan untuk kontras */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Kotak login */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 bg-black/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.6)] p-7 w-[85%] max-w-[420px]"
      >
        {/* Judul */}
        <h2 className="text-[22px] font-bold text-center text-white mb-3 tracking-wide">
          Log In
        </h2>

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src={logoCapstone}
            alt="Logo Capstone"
            className="w-[65px] h-auto opacity-90 hover:opacity-100 transition-all"
          />
        </div>

        <form className="space-y-5">
          {/* Input Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              placeholder="Username"
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
            className="w-full bg-[#4F8EF7] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6edb] transition-all shadow-[0_0_10px_rgba(79,142,247,0.4)] hover:shadow-[0_0_20px_rgba(79,142,247,0.6)]"
          >
            Log In
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
