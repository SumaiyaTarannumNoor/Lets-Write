import React, { useState } from 'react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert('Message sent successfully');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-3xl">

          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Contact Us
          </h1>

          {/* Contact Info */}
          <div className="mb-8 space-y-3 text-blue-200 text-center">
            <p className="flex justify-center items-center gap-2">
              <Mail size={16} /> colourclouddeco@gmail.com
            </p>
            <p className="flex justify-center items-center gap-2">
              <Phone size={16} /> +880 1XXXXXXXXX
            </p>
            <p className="flex justify-center items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </p>
          </div>

          {/* Form */}
          <div className="p-6 rounded-2xl border bg-blue-900/30 border-blue-700/50 space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-blue-950/50 text-white border border-blue-700"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-blue-950/50 text-white border border-blue-700"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full p-3 min-h-36 rounded-lg bg-blue-950/50 text-white border border-blue-700"
            />

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Send Message
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;