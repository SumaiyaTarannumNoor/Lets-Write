import React, { useState, useRef, useEffect } from "react";
import { Settings, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import letsWrite from "../assets/letsWrite.png";

import "../../styles/LetsWrite.css";

const generateText = async (prompt: string, length: number): Promise<string> => {
  const API_URL = "http://localhost:5000/api/generate";

  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ prompt, length }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate text");
  }

  const data = await response.json();
  return data.text;
};

/* =========================
   MAIN COMPONENT
========================= */
const LetsWriteUser: React.FC = () => {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(300);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* =========================
     🔐 AUTH GUARD (IMPORTANT)
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  /* =========================
     GENERATE TEXT
  ========================= */
  const handleGenerateText = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      const result = await generateText(prompt, wordCount);
      setGeneratedText(result);
    } catch (err) {
      setError("Session expired or request failed. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setIsGenerating(false);
    }
  };

  /* =========================
     CLEAR ALL
  ========================= */
  const clearAll = () => {
    setPrompt("");
    setGeneratedText("");
    setError("");
  };

  /* =========================
     AUTO RESIZE TEXTAREA
  ========================= */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  /* =========================
     UI
  ========================= */
  return (
    <div className="letswrite-bg min-h-screen flex flex-col">

      {/* NAVBAR (LOGGED IN VERSION) */}
      <Navbar />

      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img src={letsWrite} className="h-16 w-16" />

              <div>
                <h1 className="text-4xl font-bold text-white">
                  Let's Write
                </h1>
                <p className="text-blue-300">
                  AI Powered Writing Tool
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-xl bg-blue-800/50 text-blue-300"
            >
              <Settings />
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 flex items-center gap-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          {/* SETTINGS */}
          {showSettings && (
            <div className="mb-6 p-4 bg-blue-900/30 rounded-xl text-white">
              <p>Character limit: {wordCount}</p>

              <input
                type="range"
                min="50"
                max="1000"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* INPUT */}
            <div className="p-6 rounded-xl bg-blue-900/30">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full min-h-40 p-3 rounded-lg bg-blue-950 text-white"
                placeholder="Enter your prompt..."
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={clearAll}
                  className="text-blue-300"
                >
                  Clear
                </button>

                <button
                  onClick={handleGenerateText}
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-blue-600 px-4 py-2 rounded-lg text-white"
                >
                  {isGenerating ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>

            {/* OUTPUT */}
            <div className="p-6 rounded-xl bg-blue-900/30 text-white">
              {isGenerating
                ? "Generating..."
                : generatedText || "Your output will appear here..."
              }
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LetsWriteUser;