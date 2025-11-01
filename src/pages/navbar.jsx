import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, FileText, MessageCircle, User, LogOut, UserCircle } from "lucide-react";
import logo from "../assets/logo capstone.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1E3A5F] text-white flex justify-between items-center px-10 py-3 shadow-md">
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

      {/* Menu Navigasi */}
      <ul className="flex items-center space-x-10 text-gray-300 ml-32"> 
        <li>
          <Link to="/home" className="flex items-center space-x-1 hover:text-white">
            <Home size={18} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/my-essays" className="flex items-center space-x-1 hover:text-white">
            <FileText size={18} />
            <span>My Essays</span>
          </Link>
        </li>
        <li>
          <Link to="/my-course" className="flex items-center space-x-1 hover:text-white">
            <MessageCircle size={18} />
            <span>Courses</span>
          </Link>
        </li>
      </ul>

      {/* Dropdown User */}
      <div className="relative mr-8">
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
                  onClick={() => {
                    console.log("User logged out");
                  }}
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
    </nav>
  );
}
