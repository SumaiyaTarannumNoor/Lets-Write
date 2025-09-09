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
          <h1 className="text-white text-[24px] pb-10">Your Creations</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 text-black flex rounded-lg">
              <p className="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
             <div className="bg-white p-4 text-black flex rounded-lg">
              <p className="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div> <div className="bg-white p-4 text-black flex rounded-lg">
              <p className="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div> <div className="bg-white p-4 text-black flex rounded-lg">
              <p className="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>

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
