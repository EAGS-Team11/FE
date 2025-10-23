import React, { useState } from "react";
import registerImg from "../assets/login.png";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-screen h-screen flex font-[Inter] bg-[#E6F0FA] overflow-hidden">
      {/* Ilustrasi */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src={registerImg}
          alt="Register Illustration"
          className="w-full h-full object-cover rounded-tr-[200px] rounded-br-[200px]"
        />
      </div>

      {/* Form */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center">
        <div className="w-[70%] space-y-8">
          {/* Judul */}
          <h2 className="text-[28px] font-bold text-center text-[#1F3A60]">
            Daftar Akun
          </h2>

          <form className="space-y-4">
            {/* Input Username */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-[#EAEBF0] border border-black/50 rounded-[10px] pl-12 pr-4 py-3 text-[16px] text-black/70 font-medium focus:outline-none focus:ring-2 focus:ring-[#1F3A60]"
              />
            </div>

            {/* Input NIM */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
              <input
                type="text"
                placeholder="NIM"
                className="w-full bg-[#EAEBF0] border border-black/50 rounded-[10px] pl-12 pr-4 py-3 text-[16px] text-black/70 font-medium focus:outline-none focus:ring-2 focus:ring-[#1F3A60]"
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-[#EAEBF0] border border-black/50 rounded-[10px] pl-12 pr-10 py-3 text-[16px] text-black/70 font-medium focus:outline-none focus:ring-2 focus:ring-[#1F3A60]"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>

            {/* Input Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full bg-[#EAEBF0] border border-black/50 rounded-[10px] pl-12 pr-10 py-3 text-[16px] text-black/70 font-medium focus:outline-none focus:ring-2 focus:ring-[#1F3A60]"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/50"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>

            {/* Tombol Register */}
            <button
              type="submit"
              className="w-full bg-[#1F3A60] text-white py-3 rounded-[10px] text-[16px] font-bold hover:bg-[#274a7c] transition"
            >
              Register
            </button>
          </form>

          {/* Link ke login */}
          <p className="text-center text-black/70 text-[14px]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1F3A60] font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
