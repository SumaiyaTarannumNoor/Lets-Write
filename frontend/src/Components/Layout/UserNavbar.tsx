import React from "react";
import { useNavigate } from "react-router-dom";
import letsWrite from "../../assets/letsWrite.png";

const UserNavbar: React.FC = () => {
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

        {/* Right Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/write")}
            className="px-4 py-2 rounded-lg font-medium text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200"
          >
            Write Something
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="px-4 py-2 rounded-lg font-medium text-blue-700 bg-white hover:bg-gray-100 transition-all duration-200"
          >
            Explore
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 rounded-lg font-medium text-blue-700 bg-white hover:bg-gray-100 transition-all duration-200"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
