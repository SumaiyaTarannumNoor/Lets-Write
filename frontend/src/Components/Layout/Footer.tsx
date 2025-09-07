import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 border-t border-blue-700/50 mt-12">
      <div className="container mx-auto px-6 py-6 text-center">
        <p className="text-sm text-blue-400">
          © {new Date().getFullYear()} Let's Write. All rights reserved.
        </p>
        <p className="text-sm text-blue-500 mt-1">
          Powered by your custom CharLSTM text generation model
        </p>
      </div>
    </footer>
  );
};

export default Footer;
