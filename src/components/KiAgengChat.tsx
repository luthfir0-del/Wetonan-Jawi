/**
 * KiAgengChat.tsx
 * Chat konsultasi Wetonan Jawi dengan bahasa Indonesia natural.
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WetonResult } from '../lib/primbon';
import { Send, Sparkles, User, Loader2, RefreshCw, Quote } from 'lucide-react';

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
  text: 'Tulis pertanyaan yang ingin kamu bahas. Saya akan menjawab dengan bahasa Indonesia yang jelas dan natural, serta membedakan perhitungan, tafsir tradisi, dan saran praktis.',
  timestamp: 'Awal sesi',
});

const isFollowUpQuestion = (question: string): boolean =>
  /\b(itu|tadi|yang tadi|sebelumnya|lanjutkan|lanjut|maksudnya|jelaskan lagi|lebih detail|contohnya|bagaimana dengan itu|kalau begitu|terus bagaimana|poin tersebut|yang kamu maksud|hal tersebut)\b/i.test(
    question.trim(),
  );

/** Hilangkan penanda Markdown tanpa mengubah isi utama jawaban. */
const cleanAssistantText = (rawText: string): string => {
  return rawText
    .replace(/```(?:[a-zA-Z0-9_-]+)?\s*\n?([\s\S]*?)```/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/(?<!\*)\*(?!\s)(.*?)(?<!\s)\*(?!\*)/g, '$1')
    .replace(/(?<!_)_(?!\s)(.*?)(?<!\s)_(?!_)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*(?:---+|\*\*\*+|___+)\s*$/gm, '')
    .replace(/^\s*[*+]\s+/gm, '')
    .replace(/^\s*-\s+/gm, '')
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
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const lastInitialQuestionRef = useRef<string | undefined>(undefined);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const question = (textToSend ?? inputVal).trim();
      if (!question || isLoading) return;

      const priorMessages = messages.filter((message) => message.id !== 'welcome');
      const useHistory = isFollowUpQuestion(question) && priorMessages.length > 0;
      const chatHistory = useHistory
        ? priorMessages.slice(-8).map((message) => ({
            sender: message.sender === 'user' ? 'user' : 'assistant',
            text: message.text,
          }))
        : [];

      const userMessage: Message = {
        id: `${Date.now()}-user`,
        sender: 'user',
