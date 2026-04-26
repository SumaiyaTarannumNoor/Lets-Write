import React from "react";
import { useNavigate } from "react-router-dom";
import letsWrite from "../../assets/letsWrite.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 shadow-md border-b border-blue-700/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={letsWrite} alt="Let's Write Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-white">Let's Write</span>
        </div>

        {/* Center Nav */}
        <div className="hidden md:flex gap-6">
          <span
            className="text-blue-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span
            className="text-blue-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => navigate("/about-us")}
          >
            About Us
          </span>
          <span
            className="text-blue-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => navigate("/contact-us")}
          >
            Contact Us
          </span>
          <span
            className="text-blue-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => navigate("/faq")}
          >
            FAQ
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg font-medium text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-4 py-2 rounded-lg font-medium text-blue-700 bg-white hover:bg-gray-100 transition-all duration-200"
            onClick={() => navigate("/registration")}
          >
            Registration
          </button>
          <button
            className="px-4 py-2 rounded-lg font-medium text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200"
            onClick={() => navigate("/chat-gemini")}
          >
            Chat
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
