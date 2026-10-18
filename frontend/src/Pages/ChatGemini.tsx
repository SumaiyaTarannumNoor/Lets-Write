// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Send,
//   RefreshCw,
//   User,
//   Bot,
//   MessageSquarePlus,
//   History,
//   Settings,
// } from 'lucide-react';
// import Navbar from '../Components/Layout/Navbar';
// import Footer from '../Components/Layout/Footer';
// import { chatGemini } from '../../api/chatGemini';

// type Message = {
//   role: 'user' | 'bot';
//   content: string;
// };

// const ChatGemini = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);

//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: 'smooth',
//     });
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       role: 'user',
//       content: input,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const reply = await chatGemini(userMessage.content);

//       setMessages((prev) => [
//         ...prev,
//         { role: 'bot', content: reply },
//       ]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'bot',
//           content:
//             'Sorry dear friend 😔 something went wrong. Please try again.',
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

//       <Navbar />

//       <div className="flex flex-1 overflow-hidden">

//         {/* SIDEBAR */}
//         <aside className="w-72 border-r border-blue-800 bg-slate-950/70 backdrop-blur-md flex flex-col">

//           {/* GEMINI HEADER */}
//           <div className="p-6 border-b border-blue-800">
//             <h1
//               className="text-5xl tracking-wider bg-gradient-to-r from-[#3a0ca3] via-[#7209b7] to-[#f72585] bg-clip-text text-transparent drop-shadow-lg"
//               style={{
//                 fontFamily: '"Pixelify Sans", sans-serif',
//                 fontWeight: 700,
//                 lineHeight: 1.1,
//                 transform: 'scaleX(1.12)',
//                 transformOrigin: 'left center',
//                 textShadow: `
//                   1px 0 0 rgba(58,12,163,0.25),
//                   -1px 0 0 rgba(114,9,183,0.25)
//                 `,
//               }}
//             >
//               Gemini
//             </h1>
//           </div>

//           {/* SIDEBAR ACTIONS */}
//           <div className="p-4 space-y-3">

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-900/40 hover:bg-blue-800/50 text-blue-200">
//               <MessageSquarePlus className="w-4 h-4" />
//               New Chat
//             </button>

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-900/30 text-blue-300">
//               <History className="w-4 h-4" />
//               History
//             </button>

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-900/30 text-blue-300">
//               <Settings className="w-4 h-4" />
//               Settings
//             </button>

//           </div>

//           {/* OPTIONAL HISTORY PLACEHOLDER */}
//           <div className="flex-1 px-4 py-2 overflow-y-auto text-sm text-blue-400">
//             <p className="mb-2">Recent Chats</p>

//             <div className="space-y-2">
//               <div className="p-3 rounded-lg bg-blue-900/20 cursor-pointer hover:bg-blue-900/40">
//                 How to build React app
//               </div>
//               <div className="p-3 rounded-lg bg-blue-900/20 cursor-pointer hover:bg-blue-900/40">
//                 Explain Gemini API
//               </div>
//             </div>
//           </div>

//         </aside>

//         {/* CHAT SECTION */}
//         <div className="flex-1 flex flex-col">

//           {/* MESSAGES */}
//           <div className="flex-1 overflow-y-auto px-6 py-6">
//             <div className="max-w-4xl mx-auto space-y-4">

//               {messages.length === 0 && (
//                 <div className="text-center text-blue-300 mt-20">
//                   Start chatting with Gemini...
//                 </div>
//               )}

//               {messages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`flex items-start gap-3 ${
//                     msg.role === 'user'
//                       ? 'justify-end'
//                       : 'justify-start'
//                   }`}
//                 >
//                   {msg.role === 'bot' && (
//                     <div className="p-2 rounded-full bg-blue-900 border border-blue-700">
//                       <Bot className="text-blue-300 w-4 h-4" />
//                     </div>
//                   )}

//                   <div
//                     className={`px-4 py-3 rounded-2xl max-w-[75%] whitespace-pre-wrap text-sm leading-relaxed ${
//                       msg.role === 'user'
//                         ? 'bg-blue-600 text-white rounded-br-none'
//                         : 'bg-blue-950/60 text-blue-100 border border-blue-700 rounded-bl-none'
//                     }`}
//                   >
//                     {msg.content}
//                   </div>

//                   {msg.role === 'user' && (
//                     <div className="p-2 rounded-full bg-blue-600">
//                       <User className="text-white w-4 h-4" />
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex items-center gap-2 text-blue-300">
//                   <RefreshCw className="animate-spin w-4 h-4" />
//                   Thinking...
//                 </div>
//               )}

//               <div ref={bottomRef} />
//             </div>
//           </div>

//           {/* INPUT BAR */}
//           <div className="border-t border-blue-700 bg-blue-950/40 backdrop-blur-md">
//             <div className="max-w-4xl mx-auto flex items-center gap-3 p-4">

//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) =>
//                   e.key === 'Enter' && handleSend()
//                 }
//                 placeholder="Message Gemini..."
//                 className="flex-1 bg-blue-900/40 text-white px-4 py-3 rounded-xl outline-none border border-blue-700"
//               />

//               <button
//                 onClick={handleSend}
//                 disabled={!input.trim() || loading}
//                 className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
//               >
//                 <Send className="w-4 h-4" />
//               </button>

//             </div>
//           </div>

//         </div>

//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ChatGemini;

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Send,
//   RefreshCw,
//   User,
//   Bot,
//   MessageSquarePlus,
//   History,
//   Settings,
//   Play,
//   Pause,
//   Volume2,
//   ChevronDown,
// } from 'lucide-react';
// import Navbar from '../Components/Layout/Navbar';
// import Footer from '../Components/Layout/Footer';
// import { chatGemini } from '../../api/chatGemini';

// type Message = {
//   role: 'user' | 'bot';
//   content: string;
// };

// const tracks = [
//   "Aventure - A Beautiful Garden (freetouse.com).mp3",
//   "Aylex - Life is Beautiful (freetouse.com).mp3",
//   "Lukrembo - Chocolate (freetouse.com).mp3",
//   "Lukrembo - Imagine (freetouse.com).mp3",
//   "Lukrembo - Jay (freetouse.com).mp3",
//   "Lukrembo - This Is For You (freetouse.com).mp3",
//   "massobeats - daydream (freetouse.com).mp3",
//   "Milky Wayvers - Love in Japan (freetouse.com).mp3",
//   "Moavii - Midnight Bliss (freetouse.com).mp3",
//   "Nebulite - Kyoto (freetouse.com).mp3",
//   "Pufino - Feeling Good (freetouse.com).mp3",
//   "massobeats - gift (freetouse.com).mp3",
// ];

// const ChatGemini = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🎵 MUSIC STATES
//   const [trackIndex, setTrackIndex] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [openMusic, setOpenMusic] = useState(false);
//   const [volume, setVolume] = useState(0.5);

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   // scroll
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // INIT MUSIC + AUTO PLAY
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.src = `/Music/${encodeURIComponent(tracks[trackIndex])}`;
//     audio.loop = true;
//     audio.volume = volume;

//     const playMusic = async () => {
//       try {
//         await audio.play();
//         setPlaying(true);
//       } catch {
//         setPlaying(false);
//       }
//     };

//     playMusic();
//   }, []);

//   // TOGGLE PLAY
//   const togglePlay = async () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (playing) {
//       audio.pause();
//       setPlaying(false);
//     } else {
//       await audio.play();
//       setPlaying(true);
//     }
//   };

//   // CHANGE TRACK
//   const changeTrack = async (i: number) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     setTrackIndex(i);
//     audio.src = `/Music/${encodeURIComponent(tracks[i])}`;

//     await audio.play();
//     setPlaying(true);
//   };

//   // VOLUME
//   const changeVolume = (v: number) => {
//     setVolume(v);
//     if (audioRef.current) audioRef.current.volume = v;
//   };

//   // CHAT
//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       role: 'user',
//       content: input,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const reply = await chatGemini(userMessage.content);

//       setMessages((prev) => [
//         ...prev,
//         { role: 'bot', content: reply },
//       ]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'bot',
//           content: 'Sorry dear friend 😔 something went wrong. Please try again.',
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

//       <Navbar />

//       <div className="flex flex-1 overflow-hidden">

//         {/* SIDEBAR (UNCHANGED UI) */}
//         <aside className="w-72 border-r border-blue-800 bg-slate-950/70 backdrop-blur-md flex flex-col">

//           {/* GEMINI HEADER (UNCHANGED) */}
//           <div className="p-6 border-b border-blue-800">

//             <h1
//               className="text-5xl tracking-wider bg-gradient-to-r from-[#3a0ca3] via-[#7209b7] to-[#f72585] bg-clip-text text-transparent drop-shadow-lg"
//               style={{
//                 fontFamily: '"Pixelify Sans", sans-serif',
//                 fontWeight: 700,
//                 lineHeight: 1.1,
//                 transform: 'scaleX(1.12)',
//                 transformOrigin: 'left center',
//               }}
//             >
//               Gemini
//             </h1>

//             {/* 🌊 WAVE ANIMATION */}
//             <div className="flex gap-1 mt-3 h-6 items-end">
//               {[1, 2, 3, 4, 5].map((b) => (
//                 <div
//                   key={b}
//                   className="w-1 bg-cyan-400 rounded animate-pulse"
//                   style={{
//                     height: playing ? `${10 + b * 6}px` : '6px',
//                     opacity: playing ? 1 : 0.3,
//                   }}
//                 />
//               ))}
//             </div>

//           </div>

//           {/* 🎵 MUSIC SECTION (NEW BUT SAFE ADDITION) */}
//           <div className="p-3 border-b border-blue-800">

//             <div className="flex items-center justify-between mb-2">
//               <p className="text-xs text-blue-300">LoFi Music</p>

//               <button onClick={() => setOpenMusic(!openMusic)}>
//                 <ChevronDown className="w-4 h-4 text-blue-300" />
//               </button>
//             </div>

//             <div className="flex items-center gap-2">

//               <button
//                 onClick={togglePlay}
//                 className="p-2 bg-blue-800/40 rounded-lg"
//               >
//                 {playing ? <Pause className="w-4 h-4 text-blue-200" /> : <Play className="w-4 h-4 text-blue-200" />}
//               </button>

//               <p className="text-xs text-blue-300 truncate">
//                 {tracks[trackIndex]}
//               </p>

//             </div>

//             {/* 🔊 VOLUME */}
//             <div className="flex items-center gap-2 mt-3">
//               <Volume2 className="w-4 h-4 text-blue-300" />

//               <input
//                 type="range"
//                 min={0}
//                 max={1}
//                 step={0.01}
//                 value={volume}
//                 onChange={(e) => changeVolume(Number(e.target.value))}
//                 className="w-full"
//                 style={{
//                   background: 'linear-gradient(to right,#3a0ca3,#7209b7,#f72585)'
//                 }}
//               />
//             </div>

//             {/* 🎶 TRACK LIST */}
//             {openMusic && (
//               <div className="mt-3 max-h-40 overflow-y-auto text-xs space-y-1">

//                 {tracks.map((t, i) => (
//                   <div
//                     key={i}
//                     onClick={() => changeTrack(i)}
//                     className={`p-2 rounded cursor-pointer ${
//                       i === trackIndex
//                         ? 'bg-blue-700 text-white'
//                         : 'text-blue-300 hover:bg-blue-900/40'
//                     }`}
//                   >
//                     {t}
//                   </div>
//                 ))}

//               </div>
//             )}

//           </div>

//           {/* SIDEBAR ACTIONS (UNCHANGED) */}
//           <div className="p-4 space-y-3">

//             <button
//               onClick={() => (window.location.href = '/chat-mistral')}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#ffba08] via-[#ffa200] to-[#ff4800] hover:opacity-90 transition"
//             >
//               <MessageSquarePlus className="w-4 h-4" />
//               Chat with Mistral
//             </button>

//             <button
//               onClick={() => (window.location.href = '/chat-groq')}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-900 font-medium bg-gradient-to-r from-[#80ed99] via-[#57cc99] to-[#38b000] hover:opacity-90 transition"
//             >
//               <MessageSquarePlus className="w-4 h-4" />
//               Chat with Groq
//             </button>

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-900/40 hover:bg-blue-800/50 text-blue-200">
//               <MessageSquarePlus className="w-4 h-4" />
//               New Chat
//             </button>

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-900/30 text-blue-300">
//               <History className="w-4 h-4" />
//               History
//             </button>

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-900/30 text-blue-300">
//               <Settings className="w-4 h-4" />
//               Settings
//             </button>

//           </div>

//         </aside>

//         {/* CHAT SECTION (UNCHANGED) */}
//         <div className="flex-1 flex flex-col">

//           <div className="flex-1 overflow-y-auto px-6 py-6">

//             <div className="max-w-4xl mx-auto space-y-4">

//               {messages.length === 0 && (
//                 <div className="text-center text-blue-300 mt-20">
//                   Start chatting with Gemini...
//                 </div>
//               )}

//               {messages.map((msg, i) => (
//                   <div
//                     key={i}
//                     className={`flex items-start gap-3 ${
//                       msg.role === 'user'
//                         ? 'justify-end'
//                         : 'justify-start'
//                     }`}
//                   >
//                     {msg.role === 'bot' && (
//                       <div className="p-2 rounded-full bg-blue-900 border border-blue-700">
//                         <Bot className="text-blue-300 w-4 h-4" />
//                       </div>
//                     )}

//                     <div
//                       className={`px-4 py-3 rounded-2xl max-w-[75%] whitespace-pre-wrap text-sm leading-relaxed ${
//                         msg.role === 'user'
//                           ? 'bg-blue-600 text-white rounded-br-none'
//                           : 'bg-blue-950/60 text-blue-100 border border-blue-700 rounded-bl-none'
//                       }`}
//                     >
//                       {msg.content}
//                     </div>

//                     {msg.role === 'user' && (
//                       <div className="p-2 rounded-full bg-blue-600">
//                         <User className="text-white w-4 h-4" />
//                       </div>
//                     )}
//                   </div>
//                 ))}

//               {loading && (
//                 <div className="flex items-center gap-2 text-blue-300">
//                   <RefreshCw className="animate-spin w-4 h-4" />
//                   Thinking...
//                 </div>
//               )}

//               <div ref={bottomRef} />

//             </div>
//           </div>

//           {/* INPUT (UNCHANGED) */}
//           <div className="border-t border-blue-700 bg-blue-950/40 backdrop-blur-md">

//             <div className="max-w-4xl mx-auto flex items-center gap-3 p-4">

//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//                 placeholder="Message Gemini..."
//                 className="flex-1 bg-blue-900/40 text-white px-4 py-3 rounded-xl outline-none border border-blue-700"
//               />

//               <button
//                 onClick={handleSend}
//                 disabled={!input.trim() || loading}
//                 className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
//               >
//                 <Send className="w-4 h-4" />
//               </button>

//             </div>

//           </div>

//         </div>

//       </div>

//       <audio ref={audioRef} />
//       <Footer />

//     </div>
//   );
// };

// export default ChatGemini;

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  RefreshCw,
  User,
  Bot,
  MessageSquarePlus,
  MessageSquare, // ADDED: icon for the Write option
  History,
  Settings,
  Play,
  Pause,
  Volume2,
  ChevronDown,
} from 'lucide-react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import { chatGemini } from '../../api/chatGemini';

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

// ADDED: removes emojis so the voice does not read their names aloud
const cleanForSpeech = (text: string) =>
  text
    .replace(/[\uD83C-\uDBFF][\uDC00-\uDFFF]/g, '')
    .replace(/[\u2190-\u2BFF\u2600-\u27BF\uFE0F\u200D]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const ChatGemini = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // ADDED: Speak / Write selection
  const [showModeCard, setShowModeCard] = useState(true);

  // 🎵 MUSIC STATES
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ADDED: speech refs
  const speakModeRef = useRef(false); // true = Speak, false = Write
  const speechIdRef = useRef(0);
  const musicResumeRef = useRef(false);

  // scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // INIT MUSIC + AUTO PLAY
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = `/Music/${encodeURIComponent(tracks[trackIndex])}`;
    audio.loop = true;
    audio.volume = volume;

    const playMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    playMusic();
  }, []);

  // ADDED: load voices early (Chrome loads them asynchronously) and stop speech on leave
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const warmUp = () => {
      window.speechSynthesis.getVoices();
    };

    warmUp();
    window.speechSynthesis.addEventListener('voiceschanged', warmUp);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', warmUp);
      window.speechSynthesis.cancel();
    };
  }, []);

  // TOGGLE PLAY
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);
    }
  };

  // CHANGE TRACK
  const changeTrack = async (i: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setTrackIndex(i);
    audio.src = `/Music/${encodeURIComponent(tracks[i])}`;

    await audio.play();
    setPlaying(true);
  };

  // VOLUME
  const changeVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  // ADDED: choose Speak or Write (this click also unlocks speech in the browser)
  const chooseMode = (speak: boolean) => {
    speakModeRef.current = speak;
    setShowModeCard(false);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      if (speak) {
        const unlock = new SpeechSynthesisUtterance(' ');
        unlock.volume = 0;
        window.speechSynthesis.speak(unlock);
      }
    }
  };

  // ADDED: speak Gemini's response
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech is not supported in this browser.');
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++speechIdRef.current;

    const cleaned = cleanForSpeech(text);
    if (!cleaned) return;

    // pause the lo-fi music while Gemini talks, resume afterwards
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      musicResumeRef.current = true;
      audio.pause();
      setPlaying(false);
    }

    const finish = () => {
      if (speechIdRef.current !== id) return;

      if (audio && musicResumeRef.current) {
        musicResumeRef.current = false;
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    };

    // Chrome can cut off long utterances, so speak sentence by sentence
    const sentences = (cleaned.match(/[^.!?]+[.!?]*/g) ?? [cleaned])
      .map((s) => s.trim())
      .filter(Boolean);

    const voices = synth.getVoices();
    const voice =
      voices.find((v) => v.lang.startsWith('en') && /Google|Natural/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      null;

    sentences.forEach((sentence, i) => {
      const utterance = new SpeechSynthesisUtterance(sentence);

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = 'en-US';
      }

      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      if (i === sentences.length - 1) {
        utterance.onend = finish;
        utterance.onerror = (event) => {
          console.error('Speech error:', event.error);
          finish();
        };
      }

      synth.speak(utterance);
    });
  };

  // CHAT
  const handleSend = async () => {
    if (!input.trim()) return;

    // ADDED: stop the previous spoken answer when a new message is sent
    if ('speechSynthesis' in window) {
      speechIdRef.current += 1;
      window.speechSynthesis.cancel();
    }

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const reply = await chatGemini(userMessage.content);

      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: reply },
      ]);

      // ADDED: speak the reply only when Speak mode is selected
      if (speakModeRef.current) {
        speakText(reply);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: 'Sorry dear friend 😔 something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

      <Navbar />

      {/* ADDED: SPEAK / WRITE POPUP */}
      {showModeCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-blue-700 bg-slate-950 p-6 text-center shadow-2xl">
            <div className="mb-4 text-4xl">🎧</div>

            <h2 className="mb-2 text-2xl font-bold text-white">
              How would you like to chat?
            </h2>

            <p className="mb-6 text-sm text-slate-300">
              Choose how Gemini should respond to you.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => chooseMode(true)}
                className="flex flex-col items-center gap-3 rounded-xl border border-cyan-400 bg-cyan-600/20 p-5 text-white transition hover:bg-cyan-600/40"
              >
                <Volume2 className="h-8 w-8" />
                <span className="font-semibold">Speak</span>
                <span className="text-xs text-slate-300">
                  Read replies aloud
                </span>
              </button>

              <button
                type="button"
                onClick={() => chooseMode(false)}
                className="flex flex-col items-center gap-3 rounded-xl border border-blue-500 bg-blue-900/30 p-5 text-white transition hover:bg-blue-800/50"
              >
                <MessageSquare className="h-8 w-8" />
                <span className="font-semibold">Write</span>
                <span className="text-xs text-slate-300">
                  Text responses only
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR (UNCHANGED UI) */}
        <aside className="w-72 border-r border-blue-800 bg-slate-950/70 backdrop-blur-md flex flex-col">

          {/* GEMINI HEADER (UNCHANGED) */}
          <div className="p-6 border-b border-blue-800">

            <h1
              className="text-5xl tracking-wider bg-gradient-to-r from-[#3a0ca3] via-[#7209b7] to-[#f72585] bg-clip-text text-transparent drop-shadow-lg"
              style={{
                fontFamily: '"Pixelify Sans", sans-serif',
                fontWeight: 700,
                lineHeight: 1.1,
                transform: 'scaleX(1.12)',
                transformOrigin: 'left center',
              }}
            >
              Gemini
            </h1>

            {/* 🌊 WAVE ANIMATION */}
            <div className="flex gap-1 mt-3 h-6 items-end">
              {[1, 2, 3, 4, 5].map((b) => (
                <div
                  key={b}
                  className="w-1 bg-cyan-400 rounded animate-pulse"
                  style={{
                    height: playing ? `${10 + b * 6}px` : '6px',
                    opacity: playing ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

          </div>

          {/* 🎵 MUSIC SECTION (NEW BUT SAFE ADDITION) */}
          <div className="p-3 border-b border-blue-800">

            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-blue-300">LoFi Music</p>

              <button onClick={() => setOpenMusic(!openMusic)}>
                <ChevronDown className="w-4 h-4 text-blue-300" />
              </button>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={togglePlay}
                className="p-2 bg-blue-800/40 rounded-lg"
              >
                {playing ? <Pause className="w-4 h-4 text-blue-200" /> : <Play className="w-4 h-4 text-blue-200" />}
              </button>

              <p className="text-xs text-blue-300 truncate">
                {tracks[trackIndex]}
              </p>

            </div>

            {/* 🔊 VOLUME */}
            <div className="flex items-center gap-2 mt-3">
              <Volume2 className="w-4 h-4 text-blue-300" />

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
                className="w-full"
                style={{
                  background: 'linear-gradient(to right,#3a0ca3,#7209b7,#f72585)'
                }}
              />
            </div>

            {/* 🎶 TRACK LIST */}
            {openMusic && (
              <div className="mt-3 max-h-40 overflow-y-auto text-xs space-y-1">

                {tracks.map((t, i) => (
                  <div
                    key={i}
                    onClick={() => changeTrack(i)}
                    className={`p-2 rounded cursor-pointer ${
                      i === trackIndex
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-300 hover:bg-blue-900/40'
                    }`}
                  >
                    {t}
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* SIDEBAR ACTIONS (UNCHANGED) */}
          <div className="p-4 space-y-3">

            <button
              onClick={() => (window.location.href = '/chat-mistral')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#ffba08] via-[#ffa200] to-[#ff4800] hover:opacity-90 transition"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Chat with Mistral
            </button>

            <button
              onClick={() => (window.location.href = '/chat-groq')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-900 font-medium bg-gradient-to-r from-[#80ed99] via-[#57cc99] to-[#38b000] hover:opacity-90 transition"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Chat with Groq
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

        {/* CHAT SECTION (UNCHANGED) */}
        <div className="flex-1 flex flex-col">

          <div className="flex-1 overflow-y-auto px-6 py-6">

            <div className="max-w-4xl mx-auto space-y-4">

              {messages.length === 0 && (
                <div className="text-center text-blue-300 mt-20">
                  Start chatting with Gemini...
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
                placeholder="Message Gemini..."
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

export default ChatGemini;