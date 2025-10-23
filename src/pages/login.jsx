import React from "react";
import loginImg from "../assets/login.png";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  return (
    <div className="w-screen h-screen flex font-[Inter] bg-[#E6F0FA] overflow-hidden">
      {/* Kiri: gambar full mentok pinggir */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-full h-full object-cover rounded-tr-[200px] rounded-br-[200px]"
        />
      </div>

      {/* Kanan: form login full tinggi, mentok kanan */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center">
        <div className="w-[70%] space-y-10">
          {/* Judul */}
          <h2 className="text-[32px] font-bold text-center text-[#1F3A60]">
            Log In
          </h2>

          <form className="space-y-8">
            {/* Input Email */}
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-black/50 w-6 h-6" />
              <input
                type="email"
                placeholder="ID Number (Username)"
                className="w-full bg-[#EAEBF0] border border-black/50 rounded-[12px] pl-14 pr-4 py-4 text-[20px] text-black/70 font-medium focus:outline-none focus:ring-2 focus:ring-[#1F3A60]"
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-black/50 w-6 h-6" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#EAEBF0] border border-black/50 rounded-[12px] pl-14 pr-4 py-4 text-[20px] text-black/70 font-medium focus:outline-none focus:ring-2 focus:ring-[#1F3A60]"
              />
            </div>

            {/* Lupa password */}
            <div className="text-center">
              <a
                href="#"
                className="text-[#1F3A60] hover:underline text-[18px] font-semibold"
              >
                Forget your password?
              </a>
            </div>

            {/* Tombol login */}
            <button
              type="submit"
              className="w-full bg-[#1F3A60] text-white py-4 rounded-[12px] text-[18px] font-bold hover:bg-[#274a7c] transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
