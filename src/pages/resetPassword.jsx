import React, { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = 'http://127.0.0.1:8000'; 

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Ambil token dari state navigasi (jika datang dari ForgotPassword demo)
    const initialToken = location.state?.token || ''; 

    const [token, setToken] = useState(initialToken);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: null, message: null });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ type: null, message: null });

        if (newPassword !== confirmPassword) {
            setStatusMessage({ type: 'error', message: "Konfirmasi password tidak cocok." });
            return;
        }
        if (newPassword.length < 6) {
            setStatusMessage({ type: 'error', message: "Password minimal 6 karakter." });
            return;
        }
        
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    token: token,
                    new_password: newPassword 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Token tidak valid atau kedaluwarsa.");
            }

            setStatusMessage({
                type: 'success',
                message: "Password berhasil diatur ulang! Mengalihkan ke halaman Login...",
            });

            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (err) {
            setStatusMessage({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-[#507aab] overflow-hidden font-[Inter]">
            {/* Background Decorations (Sama dengan ForgotPassword) */}
            <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-[#173A64] opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 bg-white/80 backdrop-blur-md border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-10 w-[95%] max-w-[420px]"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                        <ShieldCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#173A64] tracking-tight text-center">
                        Password Baru
                    </h2>
                    <p className="text-sm text-gray-500 text-center mt-2 px-2 leading-relaxed">
                        Silakan buat kata sandi baru yang kuat untuk akun Anda.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    
                    <AnimatePresence mode="wait">
                        {statusMessage.message && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`flex items-start gap-3 p-4 rounded-2xl border ${
                                    statusMessage.type === 'error' 
                                    ? 'bg-red-50 text-red-700 border-red-100' 
                                    : 'bg-green-50 text-green-700 border-green-100'
                                }`}
                            >
                                {statusMessage.type === 'error' ? <AlertCircle size={18} className="shrink-0" /> : <CheckCircle2 size={18} className="shrink-0" />}
                                <span className="text-xs font-medium leading-tight">{statusMessage.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Input Token */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Reset Token</label>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Tempel token di sini"
                            className="w-full bg-gray-100/50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-mono focus:ring-4 focus:ring-blue-100 focus:border-[#173A64] outline-none transition-all read-only:bg-gray-200/50"
                            required
                            readOnly={!!initialToken}
                        />
                    </div>
                    
                    {/* Input New Password */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password Baru</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#173A64] transition-colors w-4 h-4" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Minimal 6 karakter"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-12 pr-12 py-3.5 text-sm focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#173A64] transition-all outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#173A64] transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Input Confirm Password */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Konfirmasi Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#173A64] transition-colors w-4 h-4" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Ulangi password baru"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#173A64] transition-all outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-4 rounded-2xl text-sm font-bold shadow-lg shadow-green-900/20 hover:bg-green-700 active:scale-[0.98] transition-all disabled:bg-gray-300 flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Simpan Password Baru"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                    <Link 
                        to="/login" 
                        className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#173A64] transition-colors"
                    >
                        <ArrowLeft size={16} /> Kembali ke Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}