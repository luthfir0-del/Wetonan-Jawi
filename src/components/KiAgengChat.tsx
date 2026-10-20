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
  text: 'Tulis pertanyaan yang ingin kamu bahas. Saya akan menjawab langsung ke inti, menggunakan bahasa Indonesia sehari-hari, dan membedakan perhitungan, tafsir tradisi, serta refleksi praktis.',
  timestamp: 'Awal sesi',
});

// Hanya kirim riwayat jika pertanyaan baru jelas merujuk ke percakapan sebelumnya.
const isFollowUpQuestion = (question: string): boolean =>
  /\b(itu|tadi|yang tadi|sebelumnya|lanjutkan|lanjut|maksudnya|jelaskan lagi|lebih detail|contohnya|bagaimana dengan itu|kalau begitu|terus bagaimana|poin tersebut)\b/i.test(
    question.trim(),
  );

/**
 * Merapikan format Markdown yang sering muncul dari model.
 * Tampilan chat mengikuti gaya Gem Wetonanjawi: teks sederhana,
 * tanpa heading Markdown, bold marker, garis dekoratif, atau bullet bintang.
 */
const cleanAssistantText = (rawText: string): string => {
  return rawText
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/^```[^\n]*\n?/, '').replace(/```$/, ''))
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/(?<!\*)\*(?!\s)(.*?)(?<!\s)\*(?!\*)/g, '$1')
    .replace(/(?<!_)_(?!\s)(.*?)(?<!\s)_(?!_)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*(?:---+|\*\*\*+|___+)\s*$/gm, '')
    .replace(/^\s*[*+]\s+/gm, '')
    .replace(/^\s*-\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const renderMessageText = (text: string) => cleanAssistantText(text);

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
