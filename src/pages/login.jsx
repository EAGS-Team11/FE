import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import loginImg from "../assets/login1.png";
import logoCapstone from "../assets/Logo capstone.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [nim_nip, setNimNip] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const finalData = {
        nim_nip: nim_nip,
        password: password,
        nama: "dummy", 
        role: "mahasiswa", 
        prodi: "dummy"
    };

    try {
      const response = await fetch(`/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Authentication failed.");
      }

      const data = await response.json();
      login(data.user, data.access_token);
      
      if (data.user.role === 'admin') navigate("/admin/dashboard");
      else if (data.user.role === 'dosen') navigate("/dosen/course");
      else navigate("/home");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center font-[Inter] overflow-hidden bg-black">
      {/* Background Image with Blur Effect */}
      <div 
        className="absolute inset-0 w-full h-full scale-110 blur-sm brightness-[0.4]"
        style={{
          backgroundImage: `url(${loginImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl p-10 w-[90%] max-w-[440px]"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.img 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={logoCapstone} 
            alt="Logo" 
            className="w-20 h-auto mb-6 drop-shadow-2xl"
          />
          <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Please enter your details to sign in</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}> 
          <AnimatePresence>
            {error && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl flex items-center gap-3"
                >
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    {error}
                </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {/* NIM / NIP Input */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
              <input
                type="text"
                placeholder="NIM / NIP"
                value={nim_nip}
                onChange={(e) => setNimNip(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password" 
              className="text-blue-400 hover:text-blue-300 text-xs font-semibold tracking-wide transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:bg-gray-700 disabled:shadow-none flex items-center justify-center gap-2 overflow-hidden group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-[10px] mt-10 uppercase tracking-[2px] font-bold">
            Project EAGS Team 11
        </p>
      </motion.div>
    </div>
  );
}