import React, { useState } from "react";
import loginImg from "../assets/login.png";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-screen h-screen flex font-[Inter] bg-[#E6F0FA] overflow-hidden">
      {/* Side image */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-full h-full object-cover rounded-tr-[200px] rounded-br-[200px]"
        />
      </div>

      {/* Login form */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center">
        <div className="w-[60%] space-y-6">
          {/* Judul */}
          <h2 className="text-[28px] font-bold text-center text-[#1F3A60]">
            Log In
          </h2>

          <form className="space-y-6">
            {/* Input Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
              <input
                type="email"
                placeholder="ID Number (Username)"
                className="w-full bg-[#EAEBF0] border border-black/50 rounded-[12px] pl-12 pr-4 py-3 text-[16px] text-black/70 font-medium focus:outline-none focus:ring-2 focus:ring-[#1F3A60]"
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-[#EAEBF0] border border-black/50 rounded-[12px] pl-12 pr-10 py-3 text-[16px] text-black/70 font-medium focus:outline-none focus:ring-2 focus:ring-[#1F3A60]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50"
                onClick={togglePassword}
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>

            {/* Lupa password */}
            <div className="text-center">
              <a
                href="#"
                className="text-[#1F3A60] hover:underline text-[16px] font-semibold"
              >
                Forget your password?
              </a>
            </div>

            {/* Tombol login */}
            <button
              type="submit"
              className="w-full bg-[#1F3A60] text-white py-3 rounded-[12px] text-[16px] font-bold hover:bg-[#274a7c] transition"
            >
              Log In
            </button>

            {/* Teks daftar */}
            <p className="text-center text-[14px] text-black/70">
              Don't have an account?{" "}
              <a href="/register" className="text-[#1F3A60] font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
