import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Sparkles, User, Bot } from 'lucide-react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

const sendMessage = async (message: string): Promise<string> => {
  const API_URL = 'http://localhost:5000/api/chat';

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) throw new Error('API Error');

  const data = await response.json();
  return data.reply;
};

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendMessage(userMsg.content);
      setMessages((prev) => [...prev, { role: 'bot', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Server error. Try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

      <Navbar />

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-4">

            {messages.length === 0 && (
              <div className="text-center text-blue-300 mt-20">
                Start chatting with AI...
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >

                {msg.role === 'bot' && (
                  <div className="p-2 rounded-full bg-blue-900 border border-blue-700">
                    <Bot className="text-blue-300 w-4 h-4" />
                  </div>
                )}

                <div
                  className={`px-4 py-3 rounded-2xl max-w-[75%] whitespace-pre-wrap text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-blue-950/60 text-blue-100 border border-blue-700 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="p-2 rounded-full bg-blue-600">
                    <User className="text-white w-4 h-4" />
                  </div>
                )}

              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-blue-300">
                <RefreshCw className="animate-spin w-4 h-4" />
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* INPUT BAR (sticky chat style) */}
        <div className="sticky bottom-0 border-t border-blue-700 bg-blue-950/40 backdrop-blur-md">
          <div className="max-w-3xl mx-auto flex items-center gap-3 p-4">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message AI..."
              className="flex-1 bg-blue-900/40 text-white px-4 py-3 rounded-xl outline-none border border-blue-700"
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Chat;