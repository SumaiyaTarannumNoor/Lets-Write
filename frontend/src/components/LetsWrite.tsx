import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, RefreshCw, Sparkles, FileText, Settings, Moon, Sun, AlertCircle } from 'lucide-react';

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
  const [isDarkMode, setIsDarkMode] = useState(true);
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
      // You could add a toast notification here
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${
              isDarkMode ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-white border border-purple-200'
            }`}>
              <Sparkles className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <h1 className={`text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Let's Write
              </h1>
              <p className={`text-lg ${
                isDarkMode ? 'text-purple-300' : 'text-purple-600'
              }`}>
                AI-Powered Text Generation
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200 shadow-sm'
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200 shadow-sm'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
            isDarkMode 
              ? 'bg-red-900/20 border-red-500/30 text-red-300' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className={`mb-6 p-6 rounded-2xl border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/30 border-gray-700/50 backdrop-blur-sm' 
              : 'bg-white/80 border-gray-200 backdrop-blur-sm shadow-sm'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Generation Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Character Count: {wordCount}
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  value={wordCount}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Model Info
                </label>
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    CharLSTM with 6 layers, 160 hidden units
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/30 border-gray-700/50 backdrop-blur-sm' 
              : 'bg-white/80 border-gray-200 backdrop-blur-sm shadow-sm'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <FileText className={`h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h2 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Your Prompt
              </h2>
            </div>
            
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your writing prompt here... What would you like me to help you write?"
              className={`w-full min-h-48 p-4 rounded-xl border resize-none transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
              } focus:outline-none`}
            />
            
            <div className="flex items-center justify-between mt-4">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {prompt.length} characters
              </span>
              
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                
                <button
                  onClick={handleGenerateText}
                  disabled={!prompt.trim() || isGenerating}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    !prompt.trim() || isGenerating
                      ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                      : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
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
          <div className={`p-6 rounded-2xl border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/30 border-gray-700/50 backdrop-blur-sm' 
              : 'bg-white/80 border-gray-200 backdrop-blur-sm shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className={`h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Generated Text
                </h2>
              </div>
              
              {generatedText && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={downloadText}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                    title="Download as text file"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className={`min-h-48 p-4 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-900/50 border-gray-600' 
                : 'bg-gray-50/50 border-gray-300'
            }`}>
              {isGenerating ? (
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <RefreshCw className={`h-8 w-8 animate-spin mx-auto mb-4 ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`} />
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Generating your text...
                    </p>
                  </div>
                </div>
              ) : generatedText ? (
                <div className={`whitespace-pre-wrap leading-relaxed ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {generatedText}
                </div>
              ) : (
                <div className="flex items-center justify-center h-48">
                  <p className={`text-center ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    Your generated text will appear here...
                  </p>
                </div>
              )}
            </div>
            
            {generatedText && (
              <div className="mt-4 text-sm text-center">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {generatedText.split(' ').length} words • {generatedText.length} characters
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Powered by your custom CharLSTM text generation model
          </p>
        </div>
      </div>
    </div>
  );
};

export default LetsWrite;