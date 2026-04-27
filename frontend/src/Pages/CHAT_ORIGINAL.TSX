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
// import { chatMistral } from '../../api/chatMistral';

// type Message = {
//   role: 'user' | 'bot';
//   content: string;
// };

// const ChatMistral = () => {
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
//       const reply = await chatMistral(userMessage.content);

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
//         <aside className="w-72 border-r border-orange-800 bg-slate-950/70 backdrop-blur-md flex flex-col">

//           {/* MISTRAL HEADER */}
//           <div className="p-6 border-b border-orange-800">
//             <h1
//               className="text-5xl tracking-wider bg-gradient-to-r from-[#ffba08] via-[#ffa200] to-[#ff4800] bg-clip-text text-transparent drop-shadow-lg"
//               style={{
//                 fontFamily: '"Pixelify Sans", sans-serif',
//                 fontWeight: 700,
//                 lineHeight: 1.1,
//                 transform: 'scaleX(1.12)',
//                 transformOrigin: 'left center',
//                 textShadow: `
//                   1px 0 0 rgba(255,186,8,0.25),
//                   -1px 0 0 rgba(255,72,0,0.25)
//                 `,
//               }}
//             >
//               Mistral
//             </h1>
//           </div>

//           {/* SIDEBAR ACTIONS */}
//           <div className="p-4 space-y-3">

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-900/30 hover:bg-orange-800/40 text-orange-200">
//               <MessageSquarePlus className="w-4 h-4" />
//               New Chat
//             </button>

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-900/20 text-orange-300">
//               <History className="w-4 h-4" />
//               History
//             </button>

//             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-900/20 text-orange-300">
//               <Settings className="w-4 h-4" />
//               Settings
//             </button>

//           </div>

//           {/* OPTIONAL HISTORY PLACEHOLDER */}
//           <div className="flex-1 px-4 py-2 overflow-y-auto text-sm text-orange-300">
//             <p className="mb-2">Recent Chats</p>

//             <div className="space-y-2">
//               <div className="p-3 rounded-lg bg-orange-900/20 cursor-pointer hover:bg-orange-900/40">
//                 Explain transformers
//               </div>
//               <div className="p-3 rounded-lg bg-orange-900/20 cursor-pointer hover:bg-orange-900/40">
//                 Python API setup
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
//                 <div className="text-center text-orange-300 mt-20">
//                   Start chatting with Mistral...
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
//                     <div className="p-2 rounded-full bg-orange-900 border border-orange-700">
//                       <Bot className="text-orange-300 w-4 h-4" />
//                     </div>
//                   )}

//                   <div
//                     className={`px-4 py-3 rounded-2xl max-w-[75%] whitespace-pre-wrap text-sm leading-relaxed ${
//                       msg.role === 'user'
//                         ? 'bg-orange-600 text-white rounded-br-none'
//                         : 'bg-orange-950/50 text-orange-100 border border-orange-700 rounded-bl-none'
//                     }`}
//                   >
//                     {msg.content}
//                   </div>

//                   {msg.role === 'user' && (
//                     <div className="p-2 rounded-full bg-orange-600">
//                       <User className="text-white w-4 h-4" />
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex items-center gap-2 text-orange-300">
//                   <RefreshCw className="animate-spin w-4 h-4" />
//                   Thinking...
//                 </div>
//               )}

//               <div ref={bottomRef} />
//             </div>
//           </div>

//           {/* INPUT BAR */}
//           <div className="border-t border-orange-700 bg-orange-950/20 backdrop-blur-md">
//             <div className="max-w-4xl mx-auto flex items-center gap-3 p-4">

//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) =>
//                   e.key === 'Enter' && handleSend()
//                 }
//                 placeholder="Message Mistral..."
//                 className="flex-1 bg-orange-900/20 text-white px-4 py-3 rounded-xl outline-none border border-orange-700"
//               />

//               <button
//                 onClick={handleSend}
//                 disabled={!input.trim() || loading}
//                 className="p-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50"
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

// export default ChatMistral;






import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  RefreshCw,
  User,
  Bot,
  MessageSquarePlus,
  History,
  Settings,
} from 'lucide-react';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import { chatMistral } from '../../api/chatMistral';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const ChatMistral = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

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
      const reply = await chatMistral(userMessage.content);

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">

      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <aside className="w-72 border-r border-blue-800 bg-slate-950/70 backdrop-blur-md flex flex-col">

          {/* MISTRAL HEADER */}
          <div className="p-6 border-b border-blue-800">
            <h1
              className="text-5xl tracking-wider bg-gradient-to-r from-[#ffba08] via-[#ffa200] to-[#ff4800] bg-clip-text text-transparent drop-shadow-lg"
              style={{
                fontFamily: '"Pixelify Sans", sans-serif',
                fontWeight: 700,
                lineHeight: 1.1,
                transform: 'scaleX(1.12)',
                transformOrigin: 'left center',
                textShadow: `
                  1px 0 0 rgba(255,186,8,0.25),
                  -1px 0 0 rgba(255,72,0,0.25)
                `,
              }}
            >
              Mistral
            </h1>
          </div>

          {/* SIDEBAR ACTIONS */}
          <div className="p-4 space-y-3">

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

          {/* OPTIONAL HISTORY PLACEHOLDER */}
          <div className="flex-1 px-4 py-2 overflow-y-auto text-sm text-blue-400">
            <p className="mb-2">Recent Chats</p>

            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-blue-900/20 cursor-pointer hover:bg-blue-900/40">
                Explain transformers
              </div>
              <div className="p-3 rounded-lg bg-blue-900/20 cursor-pointer hover:bg-blue-900/40">
                Python API setup
              </div>
            </div>
          </div>

        </aside>

        {/* CHAT SECTION */}
        <div className="flex-1 flex flex-col">

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="max-w-4xl mx-auto space-y-4">

              {messages.length === 0 && (
                <div className="text-center text-blue-300 mt-20">
                  Start chatting with Mistral...
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

          {/* INPUT BAR */}
          <div className="border-t border-blue-700 bg-blue-950/40 backdrop-blur-md">
            <div className="max-w-4xl mx-auto flex items-center gap-3 p-4">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleSend()
                }
                placeholder="Message Mistral..."
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

      <Footer />
    </div>
  );
};

export default ChatMistral;