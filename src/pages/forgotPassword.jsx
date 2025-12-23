import React, { useState } from "react";
import { Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = 'http://127.0.0.1:8000';

export default function ForgotPassword() {
    const [nimNip, setNimNip] = useState("");
    const [statusMessage, setStatusMessage] = useState({ type: null, message: null, token: null });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ type: null, message: null, token: null });
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/request-reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nim_nip: nimNip }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Request reset gagal.");
            }

            const data = await response.json();
            setStatusMessage({
                type: 'success',
                message: "Permintaan berhasil dikirim. Silakan cek email Anda.",
                token: data.token 
            });

        } catch (err) {
            setStatusMessage({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-[#0d2d53] overflow-hidden font-[Inter]">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-[#173A64] opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 bg-white/80 backdrop-blur-md border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-10 w-[95%] max-w-[420px]"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                        <Mail className="w-8 h-8 text-[#173A64]" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#173A64] tracking-tight">
                        Reset Password
                    </h2>
                    <p className="text-sm text-gray-500 text-center mt-2 px-4 leading-relaxed">
                        Masukkan NIM/NIP Anda untuk menerima tautan pemulihan kata sandi.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                            Identitas Pengguna
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#173A64] transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Masukkan NIM atau NIP"
                                value={nimNip}
                                onChange={(e) => setNimNip(e.target.value)}
                                required
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#173A64] transition-all outline-none"
                            />
                        </div>
                    </div>

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
                    
                    {/* DEMO TOOL - Hanya muncul jika ada token */}
                    {statusMessage.token && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-50 p-4 rounded-2xl border border-amber-100"
                        >
                            <p className="text-[10px] uppercase font-bold text-amber-600 tracking-tighter mb-2">Internal Testing Tool</p>
                            <button
                                type="button"
                                onClick={() => navigate('/reset-password', { state: { token: statusMessage.token } })}
                                className="w-full flex items-center justify-between bg-white px-4 py-2 rounded-xl text-xs font-bold text-[#173A64] shadow-sm hover:shadow-md transition-shadow"
                            >
                                Lanjut ke Reset Page 
                                <ArrowLeft size={14} className="rotate-180" />
                            </button>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#173A64] text-white py-4 rounded-2xl text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-[#123052] active:scale-[0.98] transition-all disabled:bg-gray-300 disabled:shadow-none flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Kirim Tautan Pemulihan"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link 
                        to="/login" 
                        className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#173A64] transition-colors"
                    >
                        <ArrowLeft size={16} /> Kembali ke Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}