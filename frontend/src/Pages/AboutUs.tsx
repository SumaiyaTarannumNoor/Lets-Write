import React from 'react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import { Brain, Target, Rocket } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">

          {/* Title */}
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            About Our Platform
          </h1>

          {/* Intro */}
          <p className="text-blue-200 text-center mb-10 leading-relaxed">
            We build AI-powered writing tools that help users generate,
            refine, and communicate ideas faster using modern machine learning systems.
          </p>

          {/* Sections */}
          <div className="space-y-6">

            <div className="p-6 rounded-2xl border bg-blue-900/30 border-blue-700/50">
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-blue-300" />
                <h2 className="text-xl text-white font-semibold">Our Goal</h2>
              </div>
              <p className="text-blue-200">
                To simplify content creation so anyone can express ideas without writing barriers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-blue-900/30 border-blue-700/50">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="text-blue-300" />
                <h2 className="text-xl text-white font-semibold">Technology</h2>
              </div>
              <p className="text-blue-200">
                Built using neural language models, optimized APIs, and scalable React + backend architecture.
              </p>
            </div>

            <div className="p-6 rounded-2xl border bg-blue-900/30 border-blue-700/50">
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="text-blue-300" />
                <h2 className="text-xl text-white font-semibold">Vision</h2>
              </div>
              <p className="text-blue-200">
                To become a universal AI writing assistant across education, business, and development.
              </p>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;