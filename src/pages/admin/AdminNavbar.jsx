import React from "react";
import { Menu } from "lucide-react";

export default function AdminNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <nav
      className="bg-[#173A64] text-white fixed top-0 h-16 flex items-center px-6 shadow-md z-40 w-full transition-all duration-300"
      style={{ marginLeft: isSidebarOpen ? 256 : 0 }}
    >
      <Menu
        size={24}
        className="cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <h1 className="ml-4 text-lg font-semibold">Admin Dashboard</h1>
    </nav>
  );
}
