import React, { useState } from "react";
import { Lock, Mail, LogIn } from "lucide-react";
import letsWrite from "../assets/letsWrite.png";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login info:", { email, password });
    // TODO: Hook this to your Flask login route
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Login Section */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-blue-700/50 bg-blue-900/30 backdrop-blur-sm">
          {/* Logo + Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="p-2 rounded-2xl bg-blue-600/20 border border-blue-400/40">
              <img
                src={letsWrite}
                alt="Let's Write Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-300">Login to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-blue-400">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-300 hover:text-white transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
