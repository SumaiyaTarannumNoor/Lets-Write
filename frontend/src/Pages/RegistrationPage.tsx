import React, { useState, useMemo } from "react";
import { Lock, Mail, User, Phone, Globe, LogIn } from "lucide-react";
import letsWrite from "../assets/letsWrite.png";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import countryList from "react-select-country-list";
// import Select from "react-select";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerUser } from "../../api/registration";


const RegistrationPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");

  const options = useMemo (() => countryList().getData(), [])

  // const handleChange = (value: any) => {
  //   setCountry(value);
  // }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await registerUser({
      name,
      email,
      password,
    });

    console.log("Registration successful:", response);

    alert("Registration successful!");

    // Clear form
    setName("");
    setEmail("");
    setPassword("");

    window.location.href = "/login";

  } catch (error: any) {
    console.error(error);
    alert(error.message || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Registration Section */}
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
            <h1 className="mt-4 text-3xl font-bold text-white">Create Account</h1>
            <p className="text-blue-300">Sign up to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
            </div>

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

            {/* //Phone 
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <PhoneInput
                    country={"bangladesh"}
                    value={phone}
                    onChange={(value) => setPhone(value)}
                    inputClass = "!w-full !h-12 !text-base !pl-12 !rounded-lg border border-blue-300"
                    buttonClass= "!rounded-l-lg"
                />
              </div>
            </div>  */}

            {/* //Country
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Country
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                <Select options={options} value={country} onChange = {handleChange} 
                styles={{control: (base) => ({...base, color:"gray"}) }}/>
              </div>
            </div> */}

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
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-blue-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-300 hover:text-white transition-colors"
            >
              Login
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RegistrationPage;
