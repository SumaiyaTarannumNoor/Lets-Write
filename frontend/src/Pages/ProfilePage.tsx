import React, { useState } from "react";
import UserNavbar from "../Components/Layout/UserNavbar";
import Footer from "../Components/Layout/Footer";
import UserPostModule from "../Components/UserPostModule";
import ProfilePageSidebar from "../Components/Layout/ProfilePageSidebar";

const ProfilePage: React.FC = () => {

    const texts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ]

  const [expandedPosts, setExpandedPosts] = useState<{[key: number]: boolean}>({});

  const toggleExpand = (index: number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
      {/* Navbar */}
      <UserNavbar />

      {/* Main content */}
      <div className="flex flex-1 container mx-auto px-6 py-8 gap-6">
        {/* Left Main Section */}
        <div className="flex-1 p-6 rounded-2xl border border-blue-700/50 bg-blue-900/30 backdrop-blur-sm">
          <h1 className="text-white text-[24px] pb-10">Your Creations</h1>
          <div className="grid grid-cols-3 gap-4 items-start">
             {texts.map((text, idx) => (
              <UserPostModule 
                key={idx} 
                text={text} 
                expand={!!expandedPosts[idx]}
                onToggle={() => toggleExpand(idx)}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <ProfilePageSidebar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;