import React from "react";
import UserNavbar from "../Components/Layout/UserNavbar";
import Footer from "../Components/Layout/Footer";

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
      {/* Navbar */}
      <UserNavbar />

      {/* Main content */}
      <div className="flex flex-1 container mx-auto px-6 py-8 gap-6">
        {/* Left Main Section */}
        <div className="flex-1 p-6 rounded-2xl border border-blue-700/50 bg-blue-900/30 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4">Profile Info</h2>
          <p className="text-blue-300">Here is your profile information...</p>
          {/* Add more profile details here */}
        </div>

        {/* Right Sidebar */}
        <div className="w-64 p-6 rounded-2xl border border-blue-700/50 bg-blue-900/30 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-4">Sidebar</h3>
          <ul className="space-y-2 text-blue-300">
            <li><a href="#" className="hover:text-white">Edit Profile</a></li>
            <li><a href="#" className="hover:text-white">Settings</a></li>
            <li><a href="#" className="hover:text-white">Activity</a></li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
