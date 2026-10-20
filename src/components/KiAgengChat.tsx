import React, { useState, useRef, useEffect } from 'react';
import { WetonResult } from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import {
  Send,
  Sparkles,
  User,
  Loader2,
  RefreshCw,
  Quote
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'kiageng';
  text: string;
  timestamp: string;
}

interface KiAgengChatProps {
  currentWeton: WetonResult;
  initialQuestion?: string;
}

export const KiAgengChat: React.FC<KiAgengChatProps> = ({ currentWeton, initialQuestion }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'kiageng',
      text: `Halo kisanak! Selamat datang di Tanya Minton (@wetonanjawi). Minton siap membantu membedah weton kelahiran, kecocokan jodoh, saran hari baik hajatan, hingga arah rezeki panjenengan.

Minton mencatat weton panjenengan adalah **${currentWeton.dina} ${currentWeton.pasaran} (Neptu ${currentWeton.neptuTotal}, Lakuning ${currentWeton.lakuning})**.

Ada yang ingin panjenengan tanyakan atau diskusikan bersama Minton hari ini?`,
      timestamp: 'Saat ini',
    },
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSendMessage = async (textToSend?: string) => {
    const question = textToSend || inputVal.trim();
    if (!question || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuestion: question,
          wetonContext: currentWeton,
          chatHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'Matur nuwun, kisanak. Teruslah melangkah dengan niat baik dan ketulusan hati.';

      const kiAgengMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'kiageng',
        text: reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, kiAgengMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'kiageng',
        text: 'Nuwun sewu, kisanak. Jaringan internet sedang mengalami kendala. Silakan coba kirimkan pesan kembali beberapa saat lagi.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    `Kapan hari dan jam paling baik untuk memulai usaha sesuai weton saya?`,
    `Bagaimana membuka pintu rezeki untuk weton ${currentWeton.dina} ${currentWeton.pasaran}?`,
    `Semalam saya bermimpi dipatuk ular, apa arti firasatnya menurut Primbon Jawa?`,
    `Apa makna filosofis dan amalan terbaik saat hari naas saya (${currentWeton.hariNaas})?`,
    `Saya bermimpi gigi atas copot dan melihat air jernih, bagaimana tafsirnya?`,
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs sm:text-sm font-medium mb-3 shadow-lg shadow-blue-950/40">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Konsultasi & Tanya Jawab Primbon Jawa @wetonanjawi</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Bilik <span className="gold-gradient-text">Tanya Minton</span>
        </h2>
        <p className="mt-2 text-blue-200/80 text-xs sm:text-sm">
          Tanyakan saran hari baik hajatan, arah rezeki, kecocokan jodoh, atau tips kehidupan. Minton siap memadukan kearifan primbon dengan solusi praktis sehari-hari.
        </p>
        <KeratonOrnament className="mt-3" />
      </div>

      {/* Main Chat Container (Biru Dongker) */}
      <div className="bg-[#0c1838]/95 border-2 border-blue-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[650px] relative">
        {/* Chat Topbar */}
        <div className="bg-gradient-to-r from-[#081026] via-[#0f214d] to-[#081026] p-4 border-b border-blue-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-blue-700/30 border border-amber-400 flex items-center justify-center shadow-inner">
              <GununganIcon className="w-6 h-6 text-amber-300" />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070c18]"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-white text-base">
                  Minton Wetonan Jawi
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600/30 text-amber-300 border border-blue-500/30">
                  Pamong Primbon @wetonanjawi
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                Terhubung dengan Weton: <strong className="text-amber-300">{currentWeton.dina} {currentWeton.pasaran}</strong> ({currentWeton.neptuTotal})
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setMessages([
                {
                  id: 'welcome_reset',
                  sender: 'kiageng',
                  text: `Rahayu kisanak. Ruang wejangan sampun dipun resiki. Wonten pitedah punapa malih ingkang dipun kersakaken?`,
                  timestamp: 'Baru saja',
                },
              ])
            }
            className="p-2 rounded-xl text-blue-300 hover:text-amber-300 hover:bg-blue-950/60 transition-colors"
            title="Mulai Sesi Baru"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Bubble List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#081026]/70">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isUser ? (
                  <div className="w-8 h-8 rounded-xl bg-blue-800/30 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <GununganIcon className="w-4 h-4 text-amber-300" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-blue-900 border border-blue-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-blue-200" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-medium rounded-tr-none shadow-md'
                      : 'bg-[#0c1838] border border-blue-500/30 text-blue-100 rounded-tl-none shadow-md whitespace-pre-line'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-2 text-right ${
                      isUser ? 'text-amber-950/70 font-semibold' : 'text-blue-300/60'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-800/30 border border-amber-500/40 flex items-center justify-center shrink-0 animate-pulse">
                <GununganIcon className="w-4 h-4 text-amber-300" />
              </div>
              <div className="bg-[#0c1838] border border-blue-500/30 rounded-2xl rounded-tl-none p-4 text-sm text-amber-300/90 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span className="italic">Minton sedang menyiapkan jawaban terbaik...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 bg-[#081026] border-t border-blue-900/60 overflow-x-auto whitespace-nowrap space-x-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b142d] hover:bg-blue-900/50 text-blue-200 hover:text-amber-300 text-xs border border-blue-900/50 hover:border-amber-500/30 transition-all cursor-pointer"
            >
              <Quote className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate max-w-[280px]">{prompt}</span>
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 bg-[#081026] border-t border-blue-900/60 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Tanya Minton seputar saran hari baik, arah rezeki, jodoh, outfit..."
            className="flex-1 bg-[#0b142d] border border-blue-900/60 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-blue-300/50"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className="p-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
