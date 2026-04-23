import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Sparkles, User, Bot } from 'lucide-react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

const sendMessage = async (message: string): Promise<string> => {
  const API_URL = 'http://localhost:5000/api/chat';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
};

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendMessage(userMessage.content);

      const botMessage: Message = {
        role: 'bot',
        content: reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Error: Unable to get response from server.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

      <Navbar />

      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-4xl flex flex-col flex-1">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-2xl bg-blue-600/20 border border-blue-400/40">
              <Sparkles className="text-blue-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Chat</h1>
              <p className="text-blue-300">Talk with your AI assistant</p>
            </div>
          </div>

          {/* Chat Box */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 rounded-2xl border bg-blue-900/30 border-blue-700/50 backdrop-blur-sm space-y-4"
            style={{ minHeight: '60vh' }}
          >
            {messages.length === 0 && (
              <div className="text-center text-blue-400 mt-20">
                Start a conversation...
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'bot' && (
                  <Bot className="text-blue-300 mt-1" />
                )}

                <div
                  className={`px-4 py-3 rounded-xl max-w-[75%] whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white ml-auto'
                      : 'bg-blue-950/50 text-blue-100 border border-blue-700'
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <User className="text-blue-300 mt-1" />
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-blue-300">
                <RefreshCw className="animate-spin h-4 w-4" />
                Thinking...
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="mt-4 flex items-center gap-3 p-3 rounded-2xl border bg-blue-900/30 border-blue-700/50">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white outline-none px-2"
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;