import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Sparkles, MessageSquare } from 'lucide-react';

export interface UserWetonData {
  hari: string;
  pasaran: string;
  neptu: number;
  watak?: string;
}

interface KiAgengChatProps {
  userWeton?: UserWetonData | null;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const KiAgengChat: React.FC<KiAgengChatProps> = ({ userWeton }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inisialisasi Greeting persis seperti di gambar UI Wetonan Jawi
  useEffect(() => {
    let greetingText = '';

    if (userWeton) {
      greetingText = `Halo kisanak! Selamat datang di Tanya Minton (@wetonanjawi). Minton siap membantu membedah weton kelahiran, kecocokan jodoh, saran hari baik hajatan, hingga arah rezeki panjenengan.\n\nMinton mencatat weton panjenengan adalah **${userWeton.hari} ${userWeton.pasaran} (Neptu ${userWeton.neptu}${userWeton.watak ? `, ${userWeton.watak}` : ''})**.\n\nAda yang ingin panjenengan tanyakan atau diskusikan bersama Minton hari ini?`;
    } else {
      greetingText = `Halo kisanak! Selamat datang di Tanya Minton (@wetonanjawi). Minton siap membantu membedah weton kelahiran, kecocokan jodoh, saran hari baik hajatan, hingga arah rezeki panjenengan.\n\nPanjenengan belum memasukkan tanggal lahir di kalkulator weton. Silakan hitung weton panjenengan di atas terlebih dahulu, atau langsung sebutkan tanggal lahir panjenengan di sini!`;
    }

    setMessages([
      {
        role: 'assistant',
        text: greetingText,
        timestamp: 'Saat ini',
      },
    ]);
  }, [userWeton]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleResetChat = () => {
    let greetingText = '';
    if (userWeton) {
      greetingText = `Halo kisanak! Selamat datang di Tanya Minton (@wetonanjawi). Minton siap membantu membedah weton kelahiran, kecocokan jodoh, saran hari baik hajatan, hingga arah rezeki panjenengan.\n\nMinton mencatat weton panjenengan adalah **${userWeton.hari} ${userWeton.pasaran} (Neptu ${userWeton.neptu}${userWeton.watak ? `, ${userWeton.watak}` : ''})**.\n\nAda yang ingin panjenengan tanyakan atau diskusikan bersama Minton hari ini?`;
    } else {
      greetingText = `Halo kisanak! Selamat datang di Tanya Minton (@wetonanjawi).\n\nPanjenengan belum memasukkan tanggal lahir. Silakan hitung weton panjenengan terlebih dahulu!`;
    }

    setMessages([
      {
        role: 'assistant',
        text: greetingText,
        timestamp: 'Saat ini',
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages: Message[] = [...messages, { role: 'user', text: query, timestamp: time }];

    setMessages(newMessages);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: newMessages.map((m) => ({ role: m.role, text: m.text })),
          userContext: userWeton
            ? {
                weton: `${userWeton.hari} ${userWeton.pasaran}`,
                neptu: userWeton.neptu,
                watak: userWeton.watak || '',
              }
            : null,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('No reply');
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Ngapunten kisanak, koneksi Minton sedang mengalami kendala. Silakan coba kirim ulang pertanyaan panjenengan.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Kapan hari dan jam paling baik untuk memulai usaha?',
    'Bagaimana membuka pintu rezeki untuk weton saya?',
    'Semalam saya bermimpi dipatuk ular, apa artinya?',
  ];

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-[#090d16] border border-blue-900/30 rounded-2xl shadow-2xl overflow-hidden font-sans">
      {/* Header Chat */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0d1322] border-b border-blue-900/20">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-400">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#090d16]"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-100 tracking-wide text-sm md:text-base">MINTON WETONAN JAWI</h2>
              <span className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Pamong Primbon @wetonanjawi
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Terhubung dengan Weton:{' '}
              <span className="text-amber-400 font-medium">
                {userWeton ? `${userWeton.hari} ${userWeton.pasaran} (${userWeton.neptu})` : 'Belum Diset'}
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={handleResetChat}
          title="Reset Percakapan"
          className="p-2 text-slate-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-slate-800/50"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#060911]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex gap-3 max-w-[85%]">
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-600 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-[#0f172a]/80 border border-blue-900/30 text-slate-200 rounded-tl-none whitespace-pre-line'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`block text-[10px] mt-2 text-right ${
                    msg.role === 'user' ? 'text-amber-950/70' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-[#0f172a]/80 border border-blue-900/30 text-amber-400 rounded-2xl rounded-tl-none p-4 text-sm">
              Minton sedang membedah primbon...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-6 py-2.5 bg-[#090d16] border-t border-blue-900/20 flex gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="flex items-center gap-1.5 whitespace-nowrap text-xs bg-[#0f172a] hover:bg-amber-950/30 border border-blue-900/30 text-slate-300 hover:text-amber-300 px-3.5 py-2 rounded-xl transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-[#0d1322] border-t border-blue-900/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tanya Minton seputar saran hari baik, arah rezeki, jodoh, outfit..."
            className="flex-1 bg-[#060911] border border-blue-900/30 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-3 rounded-xl font-medium disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
