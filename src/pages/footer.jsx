/* src/pages/footer.jsx */

import React from "react";

export default function Footer({ isSidebarOpen }) {
  return (
    <footer
      className="bg-[#1a1a1a] py-4 transition-all duration-300"
      style={{
        marginLeft: isSidebarOpen ? 256 : 0, 
      }}
    >
      <p className="text-center text-gray-300 text-sm">
        © 2025 <span className="font-medium">Essay Grading</span>. All Rights Reserved.
      </p>
    </footer>
  );
}
