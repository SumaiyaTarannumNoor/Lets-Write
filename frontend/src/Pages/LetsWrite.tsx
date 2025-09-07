import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, RefreshCw, Sparkles, FileText, Settings, AlertCircle } from 'lucide-react';
import letsWrite from '../assets/letsWrite.png'
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

// API function to connect to your Flask backend
const generateText = async (prompt: string, length: number): Promise<string> => {
  const API_URL = 'http://localhost:5000/api/generate';
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, length }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};

const LetsWrite = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(300);

  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerateText = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError('');
    
    try {
      const result = await generateText(prompt, wordCount);
      setGeneratedText(result);
    } catch (err) {
      setError('Failed to generate text. Please make sure your Flask server is running on http://localhost:5000');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'generated-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearAll = () => {
    setPrompt('');
    setGeneratedText('');
    setError('');
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [prompt]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
     <Navbar/>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-blue-600/20 border border-blue-400/40">
              <img 
                src={letsWrite} 
                alt="Let's Write Logo" 
                className="h-16 w-16 object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Let's Write</h1>
              <p className="text-lg text-blue-300">AI-Powered Text Generation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-xl bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white border border-blue-700 transition-all duration-200"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border flex items-center gap-3 bg-red-900/20 border-red-500/30 text-red-300">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-6 rounded-2xl border bg-blue-900/30 border-blue-700/50 backdrop-blur-sm transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-white">Generation Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-300">
                  Character Count: {wordCount}
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-blue-800"
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(wordCount - 50) / (1000 - 50) * 100}%, #1e40af ${(wordCount - 50) / (1000 - 50) * 100}%, #1e40af 100%)`
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-300">
                  Model Info
                </label>
                <div className="p-3 rounded-lg bg-blue-800/50">
                  <p className="text-sm text-blue-300">
                    CharLSTM with 6 layers, 160 hidden units
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="p-6 rounded-2xl border bg-blue-900/30 border-blue-700/50 backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Your Prompt</h2>
            </div>
            
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your writing prompt here... What would you like me to help you write?"
              className="w-full min-h-48 p-4 rounded-xl border resize-none bg-blue-950/50 border-blue-600 text-white placeholder-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200"
            />
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-blue-400">{prompt.length} characters</span>
              
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="px-4 py-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white transition-all duration-200"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                
                <button
                  onClick={handleGenerateText}
                  disabled={!prompt.trim() || isGenerating}
                  className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
                    !prompt.trim() || isGenerating
                      ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="p-6 rounded-2xl border bg-blue-900/30 border-blue-700/50 backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Generated Text</h2>
              </div>
              
              {generatedText && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white transition-all duration-200"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={downloadText}
                    className="p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white transition-all duration-200"
                    title="Download as text file"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="min-h-48 p-4 rounded-xl border bg-blue-950/50 border-blue-600">
              {isGenerating ? (
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-400" />
                    <p className="text-blue-300">Generating your text...</p>
                  </div>
                </div>
              ) : generatedText ? (
                <div className="whitespace-pre-wrap leading-relaxed text-blue-100">
                  {generatedText}
                </div>
              ) : (
                <div className="flex items-center justify-center h-48">
                  <p className="text-center text-blue-500">Your generated text will appear here...</p>
                </div>
              )}
            </div>
            
            {generatedText && (
              <div className="mt-4 text-sm text-center">
                <span className="text-blue-400">
                  {generatedText.split(' ').length} words • {generatedText.length} characters
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LetsWrite;
