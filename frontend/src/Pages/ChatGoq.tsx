import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  RefreshCw,
  User,
  Bot,
  MessageSquarePlus,
  History,
  Settings,
  Play,
  Pause,
  Volume2,
  ChevronDown,
} from 'lucide-react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import { chatGroq } from '../../api/chatGroq';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const tracks = [
  "Aventure - A Beautiful Garden (freetouse.com).mp3",
  "Aylex - Life is Beautiful (freetouse.com).mp3",
  "Lukrembo - Chocolate (freetouse.com).mp3",
  "Lukrembo - Imagine (freetouse.com).mp3",
  "Lukrembo - Jay (freetouse.com).mp3",
  "Lukrembo - This Is For You (freetouse.com).mp3",
  "massobeats - daydream (freetouse.com).mp3",
  "Milky Wayvers - Love in Japan (freetouse.com).mp3",
  "Moavii - Midnight Bliss (freetouse.com).mp3",
  "Nebulite - Kyoto (freetouse.com).mp3",
  "Pufino - Feeling Good (freetouse.com).mp3",
  "massobeats - gift (freetouse.com).mp3",
];

const ChatGroq = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [userInteracted, setUserInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = `/Music/${encodeURIComponent(tracks[trackIndex])}`;
    audio.loop = true;
    audio.volume = 0;
    audio.muted = true;

    const playMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);

        setTimeout(() => {
          if (userInteracted) {
            audio.muted = false;
            audio.volume = volume;
          }
        }, 500);
      } catch (err) {
        console.log("Autoplay prevented:", err);
        setPlaying(false);
      }
    };

    playMusic();
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);

      if (!userInteracted) setUserInteracted(true);

      audio.muted = false;
      audio.volume = volume;
    }
  };

  const changeTrack = async (i: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setTrackIndex(i);
    audio.src = `/Music/${encodeURIComponent(tracks[i])}`;

    await audio.play();
    setPlaying(true);

    if (!userInteracted) setUserInteracted(true);

    audio.muted = false;
    audio.volume = volume;
  };

  const changeVolume = (v: number) => {
    setVolume(v);

    if (audioRef.current) {
      audioRef.current.volume = v;
      audioRef.current.muted = false;
    }
  };

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
      const reply = await chatGroq(userMessage.content);

      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            'Sorry dear friend 😔 something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800"
      onClick={() => setUserInteracted(true)}
    >
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 border-r border-blue-800 bg-slate-950/70 backdrop-blur-md flex flex-col">

          {/* HEADER */}
          <div className="p-6 border-b border-blue-800">
            <h1
              className="text-5xl tracking-wider bg-gradient-to-r from-[#80ED99] via-[#57CC99] to-[#38A169] bg-clip-text text-transparent drop-shadow-lg"
              style={{
                fontFamily: '"Pixelify Sans", sans-serif',
                fontWeight: 700,
                lineHeight: 1.1,
                transform: 'scaleX(1.12)',
                transformOrigin: 'left center',
                textShadow: `
                  1px 0 0 rgba(128,237,153,0.35),
                  -1px 0 0 rgba(56,161,105,0.35)
                `,
              }}
            >
              Groq
            </h1>

            {/* WAVE */}
            <div className="flex gap-1 mt-3 h-6 items-end">
              {[1, 2, 3, 4, 5].map((b) => (
                <div
                  key={b}
                  className="w-1 bg-[#80ED99] rounded animate-pulse"
                  style={{
                    height: playing ? `${10 + b * 6}px` : '6px',
                    opacity: playing ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* MUSIC */}
          <div className="p-3 border-b border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-blue-300">LoFi Music</p>

              <button onClick={() => setOpenMusic(!openMusic)}>
                <ChevronDown className="w-4 h-4 text-green-300" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 bg-green-900/30 rounded-lg"
              >
                {playing ? (
                  <Pause className="w-4 h-4 text-green-200" />
                ) : (
                  <Play className="w-4 h-4 text-green-200" />
                )}
              </button>

              <p className="text-xs text-green-300 truncate">
                {tracks[trackIndex]}
              </p>
            </div>

            {/* VOLUME */}
            <div className="flex items-center gap-2 mt-3">
              <Volume2 className="w-4 h-4 text-green-300" />

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) =>
                  changeVolume(Number(e.target.value))
                }
                className="w-full"
                style={{
                  background:
                    'linear-gradient(to right,#80ED99,#57CC99,#38A169)',
                }}
              />
            </div>

            {/* TRACKS */}
            {openMusic && (
              <div className="mt-3 max-h-40 overflow-y-auto text-xs space-y-1">
                {tracks.map((t, i) => (
                  <div
                    key={i}
                    onClick={() => changeTrack(i)}
                    className={`p-2 rounded cursor-pointer ${
                      i === trackIndex
                        ? 'bg-green-600 text-white'
                        : 'text-green-300 hover:bg-green-900/30'
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="p-4 space-y-3">
            <button
              onClick={() => (window.location.href = '/chat-gemini')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#3a0ca3] via-[#7209b7] to-[#f72585] hover:opacity-90 transition"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Chat with Gemini
            </button>

            <button
              onClick={() => (window.location.href = '/chat-mistral')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#ffba08] via-[#ffa200] to-[#ff4800] hover:opacity-90 transition"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Chat with Mistral
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-900/40 hover:bg-blue-800/50 text-blue-200">
              <MessageSquarePlus className="w-4 h-4" />
              New Chat
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-900/30 text-blue-300">
              <History className="w-4 h-4" />
              History
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-900/30 text-blue-300">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </aside>

        {/* CHAT */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-blue-300 mt-20">
                  Start chatting with Groq...
                </div>
              )}

              {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  msg.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
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

          {/* INPUT (UNCHANGED) */}
          <div className="border-t border-blue-700 bg-blue-950/40 backdrop-blur-md">

            <div className="max-w-4xl mx-auto flex items-center gap-3 p-4">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message Groq..."
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
      </div>

      <audio ref={audioRef} />
      <Footer />
    </div>
  );
};

export default ChatGroq;