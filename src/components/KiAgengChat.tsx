/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WetonResult } from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import {
  Send,
  Sparkles,
  User,
  Loader2,
  RefreshCw,
  Quote,
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

const getTime = () =>
  new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

const makeWelcomeMessage = (): Message => ({
  id: 'welcome',
  sender: 'kiageng',
  text: 'Halo! Saya Minton, asisten Wetonan Jawi. Saya bisa membantu membahas weton, tradisi Primbon Jawa, hubungan, pekerjaan, rezeki, dan pengembangan diri. Silakan tulis pertanyaan yang ingin kamu bahas.',
  timestamp: 'Awal sesi',
});

// Hanya kirim riwayat jika pertanyaan baru jelas merujuk ke percakapan sebelumnya.
const isFollowUpQuestion = (question: string): boolean =>
  /\b(itu|tadi|yang tadi|sebelumnya|lanjutkan|lanjut|maksudnya|jelaskan lagi|lebih detail|contohnya|bagaimana dengan itu|kalau begitu|terus bagaimana|poin tersebut)\b/i.test(
    question.trim(),
  );

const renderMessageText = (text: string) => {
  // Dukungan Markdown sederhana untuk **teks tebal** dan baris baru.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

export const KiAgengChat: React.FC<KiAgengChatProps> = ({
  currentWeton,
  initialQuestion,
}) => {
  const [messages, setMessages] = useState<Message[]>([makeWelcomeMessage()]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const lastInitialQuestionRef = useRef<string | undefined>(undefined);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const question = (textToSend ?? inputVal).trim();
      if (!question || isLoading) return;

      const previousMessages = messages;
      const userMsg: Message = {
        id: `${Date.now()}-user`,
        sender: 'user',
        text: question,
        timestamp: getTime(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputVal('');
      setIsLoading(true);

      // Weton yang dikirim adalah konteks kalender/layar saat ini, bukan bukti
