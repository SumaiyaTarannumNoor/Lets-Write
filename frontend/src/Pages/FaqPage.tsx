import React, { useState } from 'react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What is this platform used for?",
    a: "It helps generate AI-based text and chat responses for users."
  },
  {
    q: "Do I need backend running?",
    a: "Yes, Flask backend must be running for generation and chat features."
  },
  {
    q: "Is my data stored?",
    a: "No personal data is stored unless you implement a database layer."
  },
  {
    q: "Can I integrate this into my project?",
    a: "Yes, the API can be reused in any React or backend system."
  }
];

const FaqPage = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-3xl">

          <h1 className="text-4xl font-bold text-white text-center mb-10">
            FAQ
          </h1>

          <div className="space-y-4">

            {faqs.map((item, i) => (
              <div
                key={i}
                className="border border-blue-700 bg-blue-900/30 rounded-xl p-4 cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
              >

                <div className="flex justify-between items-center text-white">
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {open === i && (
                  <p className="text-blue-200 mt-3 text-sm">
                    {item.a}
                  </p>
                )}

              </div>
            ))}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FaqPage;