// src/pages/forgotPassword.jsx (BARU)

import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE_URL = 'http://127.0.0.1:8000'; // Gunakan base URL penuh

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
                message: "Permintaan reset berhasil. Cek email (atau lihat token di bawah untuk demo).",
                token: data.token // Hapus data.token di produksi!
            });

        } catch (err) {
            setStatusMessage({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-[#E6F0FA] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-2xl p-8 w-[90%] max-w-[400px]"
            >
                <h2 className="text-2xl font-bold text-center text-[#173A64] mb-6">
                    Forgot Password
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your NIM/NIP to receive a password reset token.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="NIM / NIP"
                            value={nimNip}
                            onChange={(e) => setNimNip(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#173A64] focus:border-transparent transition-all"
                        />
                    </div>

                    {statusMessage.message && (
                        <div className={`text-sm p-3 rounded-lg border ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-green-100 text-green-700 border-green-400'}`}>
                            {statusMessage.message}
                        </div>
                    )}
                    
                    {/* DEBUGGING NOTE: Hapus di produksi! */}
                    {statusMessage.token && (
                        <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-400 text-xs break-all">
                            Token (DEMO): <strong>{statusMessage.token}</strong>
                            <button
                                type="button"
                                onClick={() => navigate('/reset-password', { state: { token: statusMessage.token } })}
                                className="block mt-2 text-blue-600 font-semibold hover:underline"
                            >
                                Continue to Reset Page
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#173A64] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#123052] transition disabled:bg-gray-400"
                    >
                        {loading ? "Sending..." : "Request Reset Link"}
                    </button>
                </form>

                <Link to="/login" className="flex items-center justify-center mt-4 text-sm text-gray-500 hover:text-[#173A64] transition">
                    <ArrowLeft size={14} className="mr-2" /> Back to Login
                </Link>
            </motion.div>
        </div>
    );
}