/* src/pages/register.jsx */

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import registerImg from "../assets/login1.png";
import logoCapstone from "../assets/Logo capstone.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center font-[JetBrains_Mono] overflow-hidden">
      {/* Background image full layar */}
      <img
        src={registerImg}
        alt="Register Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      {/* Kotak register */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 bg-black/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.6)] p-7 w-[85%] max-w-[420px]"
      >
        {/* Judul */}
        <h2 className="text-[22px] font-bold text-center text-white mb-3 tracking-wide">
          Create Account
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
          {/* Username */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
          </div>

          {/* NIM */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="NIM"
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
            className="w-full bg-[#4F8EF7] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6edb] transition-all shadow-[0_0_10px_rgba(79,142,247,0.4)] hover:shadow-[0_0_20px_rgba(79,142,247,0.6)]"
          >
            Register
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
