import React from "react";
import { Link } from "react-router-dom";
import letsWrite from "../../assets/letsWrite.png";

const UserNavbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 shadow-md border-b border-blue-700/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={letsWrite} alt="Let's Write Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-white">Let's Write</span>
        </Link>
        {/* Right Actions */}
        <div className="flex gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg font-medium text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200"
          >
            Write Something
          </Link>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg font-medium text-blue-700 bg-white hover:bg-gray-100 transition-all duration-200"
          >
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
