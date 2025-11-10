import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  MessageCircle,
  User,
  LogOut,
  UserCircle,
} from "lucide-react";
import logo from "../assets/logo capstone.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token"); 
    window.location.href = "/login";
  };

  return (
    <>
      {/* Navbar Utama */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#1E3A5F] text-white flex justify-between items-center px-10 py-3 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/home" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Essay Grading Logo"
              className="h-14 w-auto mr-3"
            />
          </Link>
        </div>


        <div className="flex items-center space-x-10 mr-10">
          <ul className="flex items-center space-x-10 text-gray-300">
            <li>
              <Link
                to="/home"
                className={`flex items-center space-x-1 ${
                  location.pathname === "/home"
                    ? "text-white font-semibold"
                    : "text-gray-300"
                } hover:text-white`}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-essays"
                className={`flex items-center space-x-1 ${
                  location.pathname === "/my-essays"
                    ? "text-white font-semibold"
                    : "text-gray-300"
                } hover:text-white`}
              >
                <FileText size={18} />
                <span>My Essays</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-course"
                className={`flex items-center space-x-1 ${
                  location.pathname === "/my-course"
                    ? "text-white font-semibold"
                    : "text-gray-300"
                } hover:text-white`}
              >
                <MessageCircle size={18} />
                <span>Courses</span>
              </Link>
            </li>
          </ul>


          <div className="relative mr-8" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-1 text-gray-300 hover:text-white focus:outline-none"
            >
              <User size={18} />
              <span>Hello, User</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <UserCircle size={16} className="mr-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsLogoutOpen(true)}
                      className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <LogOut size={16} className="mr-2" />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>


      {isLogoutOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]">
          <div className="bg-white rounded-2xl shadow-lg w-80 p-6 text-center animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
