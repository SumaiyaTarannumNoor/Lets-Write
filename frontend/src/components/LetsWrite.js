import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, RefreshCw, Sparkles, FileText, Settings, Moon, Sun, AlertCircle } from 'lucide-react';
import letsWrite from '../assets/letsWrite.png';
// API function to connect to your Flask backend
const generateText = async (prompt, length) => {
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
    }
    catch (error) {
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
    const textareaRef = useRef(null);
    const handleGenerateText = async () => {
        if (!prompt.trim())
            return;
        setIsGenerating(true);
        setError('');
        try {
            const result = await generateText(prompt, wordCount);
            setGeneratedText(result);
        }
        catch (err) {
            setError('Failed to generate text. Please make sure your Flask server is running on http://localhost:5000');
            console.error('Generation error:', err);
        }
        finally {
            setIsGenerating(false);
        }
    };
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedText);
            // You could add a toast notification here
        }
        catch (err) {
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
    return (_jsx("div", { className: `min-h-screen transition-colors duration-300 ${isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800'
            : 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200'}`, children: _jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-2xl ${isDarkMode ? 'bg-blue-600/20 border border-blue-400/40' : 'bg-white border border-blue-300 shadow-md'}`, children: _jsx("img", { src: letsWrite, alt: "Let's Write Logo", className: "h-16 w-16 object-contain" }) }), _jsxs("div", { children: [_jsx("h1", { className: `text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`, children: "Let's Write" }), _jsx("p", { className: `text-lg ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`, children: "AI-Powered Text Generation" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => setShowSettings(!showSettings), className: `p-3 rounded-xl transition-all duration-200 ${isDarkMode
                                        ? 'bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white border border-blue-700'
                                        : 'bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-800 border border-blue-300 shadow-sm'}`, children: _jsx(Settings, { className: "h-5 w-5" }) }), _jsx("button", { onClick: () => setIsDarkMode(!isDarkMode), className: `p-3 rounded-xl transition-all duration-200 ${isDarkMode
                                        ? 'bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white border border-blue-700'
                                        : 'bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-800 border border-blue-300 shadow-sm'}`, children: isDarkMode ? _jsx(Sun, { className: "h-5 w-5" }) : _jsx(Moon, { className: "h-5 w-5" }) })] })] }), error && (_jsxs("div", { className: `mb-6 p-4 rounded-xl border flex items-center gap-3 ${isDarkMode
                        ? 'bg-red-900/20 border-red-500/30 text-red-300'
                        : 'bg-red-50 border-red-200 text-red-700'}`, children: [_jsx(AlertCircle, { className: "h-5 w-5 flex-shrink-0" }), _jsx("p", { children: error })] })), showSettings && (_jsxs("div", { className: `mb-6 p-6 rounded-2xl border transition-all duration-300 ${isDarkMode
                        ? 'bg-blue-900/30 border-blue-700/50 backdrop-blur-sm'
                        : 'bg-white/90 border-blue-300 backdrop-blur-sm shadow-lg'}`, children: [_jsx("h3", { className: `text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-900'}`, children: "Generation Settings" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("label", { className: `block text-sm font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`, children: ["Character Count: ", wordCount] }), _jsx("input", { type: "range", min: "50", max: "1000", value: wordCount, onChange: (e) => setWordCount(parseInt(e.target.value)), className: `w-full h-3 rounded-lg appearance-none cursor-pointer ${isDarkMode ? 'bg-blue-800' : 'bg-blue-200'}`, style: {
                                                background: isDarkMode
                                                    ? `linear-gradient(to right, #2563eb 0%, #2563eb ${(wordCount - 50) / (1000 - 50) * 100}%, #1e40af ${(wordCount - 50) / (1000 - 50) * 100}%, #1e40af 100%)`
                                                    : `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(wordCount - 50) / (1000 - 50) * 100}%, #bfdbfe ${(wordCount - 50) / (1000 - 50) * 100}%, #bfdbfe 100%)`
                                            } })] }), _jsxs("div", { children: [_jsx("label", { className: `block text-sm font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`, children: "Model Info" }), _jsx("div", { className: `p-3 rounded-lg ${isDarkMode ? 'bg-blue-800/50' : 'bg-blue-100'}`, children: _jsx("p", { className: `text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`, children: "CharLSTM with 6 layers, 160 hidden units" }) })] })] })] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: `p-6 rounded-2xl border transition-all duration-300 ${isDarkMode
                                ? 'bg-blue-900/30 border-blue-700/50 backdrop-blur-sm'
                                : 'bg-white/90 border-blue-300 backdrop-blur-sm shadow-lg'}`, children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(FileText, { className: `h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}` }), _jsx("h2", { className: `text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-blue-900'}`, children: "Your Prompt" })] }), _jsx("textarea", { ref: textareaRef, value: prompt, onChange: (e) => setPrompt(e.target.value), placeholder: "Enter your writing prompt here... What would you like me to help you write?", className: `w-full min-h-48 p-4 rounded-xl border resize-none transition-all duration-200 ${isDarkMode
                                        ? 'bg-blue-950/50 border-blue-600 text-white placeholder-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                                        : 'bg-white border-blue-400 text-blue-900 placeholder-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30'} focus:outline-none` }), _jsxs("div", { className: "flex items-center justify-between mt-4", children: [_jsxs("span", { className: `text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`, children: [prompt.length, " characters"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: clearAll, className: `px-4 py-2 rounded-lg transition-all duration-200 ${isDarkMode
                                                        ? 'bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white'
                                                        : 'bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800'}`, children: _jsx(RefreshCw, { className: "h-4 w-4" }) }), _jsx("button", { onClick: handleGenerateText, disabled: !prompt.trim() || isGenerating, className: `px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${!prompt.trim() || isGenerating
                                                        ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105'}`, children: isGenerating ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }), "Generating..."] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "h-4 w-4" }), "Generate"] })) })] })] })] }), _jsxs("div", { className: `p-6 rounded-2xl border transition-all duration-300 ${isDarkMode
                                ? 'bg-blue-900/30 border-blue-700/50 backdrop-blur-sm'
                                : 'bg-white/90 border-blue-300 backdrop-blur-sm shadow-lg'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: `h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}` }), _jsx("h2", { className: `text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-blue-900'}`, children: "Generated Text" })] }), generatedText && (_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: copyToClipboard, className: `p-2 rounded-lg transition-all duration-200 ${isDarkMode
                                                        ? 'bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white'
                                                        : 'bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800'}`, title: "Copy to clipboard", children: _jsx(Copy, { className: "h-4 w-4" }) }), _jsx("button", { onClick: downloadText, className: `p-2 rounded-lg transition-all duration-200 ${isDarkMode
                                                        ? 'bg-blue-800/50 hover:bg-blue-700/50 text-blue-300 hover:text-white'
                                                        : 'bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800'}`, title: "Download as text file", children: _jsx(Download, { className: "h-4 w-4" }) })] }))] }), _jsx("div", { className: `min-h-48 p-4 rounded-xl border ${isDarkMode
                                        ? 'bg-blue-950/50 border-blue-600'
                                        : 'bg-blue-50/50 border-blue-400'}`, children: isGenerating ? (_jsx("div", { className: "flex items-center justify-center h-48", children: _jsxs("div", { className: "text-center", children: [_jsx(RefreshCw, { className: `h-8 w-8 animate-spin mx-auto mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}` }), _jsx("p", { className: `${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`, children: "Generating your text..." })] }) })) : generatedText ? (_jsx("div", { className: `whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-blue-100' : 'text-blue-900'}`, children: generatedText })) : (_jsx("div", { className: "flex items-center justify-center h-48", children: _jsx("p", { className: `text-center ${isDarkMode ? 'text-blue-500' : 'text-blue-400'}`, children: "Your generated text will appear here..." }) })) }), generatedText && (_jsx("div", { className: "mt-4 text-sm text-center", children: _jsxs("span", { className: `${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`, children: [generatedText.split(' ').length, " words \u2022 ", generatedText.length, " characters"] }) }))] })] }), _jsx("div", { className: "mt-12 text-center", children: _jsx("p", { className: `text-sm ${isDarkMode ? 'text-blue-500' : 'text-blue-400'}`, children: "Powered by your custom CharLSTM text generation model" }) })] }) }));
};
export default LetsWrite;
