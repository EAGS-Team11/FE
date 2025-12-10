// src/pages/resetPassword.jsx (BARU)

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
            setStatusMessage({ type: 'error', message: "Password baru dan konfirmasi tidak cocok." });
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
                throw new Error(errorData.detail || "Reset password gagal. Token mungkin tidak valid atau kedaluwarsa.");
            }

            setStatusMessage({
                type: 'success',
                message: "✅ Password berhasil diatur ulang! Mengarahkan ke Login...",
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
        <div className="relative w-screen h-screen flex items-center justify-center bg-[#E6F0FA] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-2xl p-8 w-[90%] max-w-[400px]"
            >
                <h2 className="text-2xl font-bold text-center text-[#173A64] mb-6">
                    Set New Password
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    {statusMessage.message && (
                        <div className={`text-sm p-3 rounded-lg border ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-green-100 text-green-700 border-green-400'}`}>
                            {statusMessage.message}
                        </div>
                    )}

                    {/* Input Token (Hidden/Readonly jika sudah ada) */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 text-left">Reset Token</label>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Paste your reset token here"
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-gray-50 read-only:bg-gray-100 focus:ring-2 focus:ring-[#173A64] focus:border-transparent outline-none"
                            required
                            readOnly={!!initialToken}
                        />
                    </div>
                    
                    {/* Input New Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password (min 6 char)"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-9 py-2 text-sm focus:ring-2 focus:ring-[#173A64] focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                    </div>

                    {/* Input Confirm Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-9 py-2 text-sm focus:ring-2 focus:ring-[#173A64] focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
                    >
                        {loading ? "Setting Password..." : "Reset Password"}
                    </button>
                </form>

                <Link to="/login" className="flex items-center justify-center mt-4 text-sm text-gray-500 hover:text-[#173A64] transition">
                    Back to Login
                </Link>
            </motion.div>
        </div>
    );
}