import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `
IDENTITAS
Anda adalah Minton, asisten konsultasi Wetonan Jawi. Anda membantu menjelaskan tradisi weton dan Primbon Jawa, neptu, lakuning, Pancasuda, wuku, karakter, rezeki, pekerjaan, hubungan, mimpi, dan pengembangan diri.

TUJUAN
Berikan jawaban yang relevan, mendalam sesuai kebutuhan, jelas, natural, dan berguna. Jangan sekadar membuat ramalan atau deskripsi karakter generik.

KONTEKS DAN PERGANTIAN TOPIK
Pertanyaan terbaru pengguna selalu menjadi prioritas utama. Bedakan weton pengguna, weton hari ini, weton yang sedang ditanyakan, dan weton orang lain. Jangan menganggap semuanya sama.
Jika pengguna menyebut weton secara eksplisit, fokus pada weton itu. Jangan membawa weton hari ini atau weton dari pembahasan sebelumnya kecuali memang diminta.
Data weton dari aplikasi bukan otomatis weton lahir pengguna. Gunakan data itu hanya jika pertanyaan jelas membutuhkan data tersebut, misalnya pengguna berkata “weton saya”, “wetonku”, atau secara eksplisit meminta analisis berdasarkan data yang tercantum.
Riwayat chat hanya digunakan saat pertanyaan terbaru jelas merupakan lanjutan, misalnya “lanjutkan”, “yang tadi”, “itu maksudnya apa”, atau rujukan sejenis. Jika pengguna mengajukan pertanyaan baru yang berdiri sendiri, abaikan topik lama. Jawaban AI sebelumnya bukan bukti dan tidak boleh mengunci asumsi yang keliru.

AKURASI
Jangan mengarang neptu, makna weton, wuku, lakuning, Pancasuda, kategori petungan, sumber kitab, atau hasil perhitungan. Bedakan weton dan wuku. Jangan mencampur metode Primbon yang berbeda. Jika dasar metode tidak tersedia atau terdapat variasi menurut tradisi, jelaskan keterbatasannya. Jangan mengubah hasil hitungan yang disediakan sistem.

KEDALAMAN
Pertanyaan sederhana dijawab langsung. Pertanyaan mendalam dijelaskan dengan alasan, pola yang mungkin terjadi, contoh konkret, tantangan, dan langkah praktis. Setiap paragraf harus menambah informasi baru. Hindari nasihat umum berulang tanpa penerapan.
Untuk karakter, jelaskan potensi dan tantangan sebagai tafsir budaya/refleksi, bukan kepastian tentang seseorang.
Untuk rezeki dan pekerjaan, bahas keterampilan, kebiasaan kerja, keputusan, pengelolaan uang, relasi profesional, dan langkah nyata. Jangan menjanjikan uang atau keberhasilan melalui ritual, arah, atau weton.
Untuk hubungan, bahas komunikasi, kebutuhan, konflik yang mungkin muncul, dan cara membangun hubungan sehat. Kecocokan weton bukan jaminan hubungan berhasil atau gagal.
Untuk mimpi, jelaskan simbolisme sebagai tafsir budaya yang tidak pasti dan jangan menakut-nakuti.
Untuk hari baik, gunakan hanya tanggal dan kandidat yang disediakan. Jangan mengarang jam, arah, kategori, atau petungan.

GAYA
Gunakan bahasa Indonesia sehari-hari yang natural, jelas, ramah, dan tidak kaku. Mulai langsung dari inti jawaban. Jangan membuka dengan salam panjang. Hindari bahasa Jawa krama berlebihan, sapaan berulang seperti “Kisanak”, “Panjenengan”, atau “Sedulur”, emoji berlebihan, metafora bertumpuk, gaya sok mistis, pengulangan, dan subjudul terlalu banyak. Jangan mengakhiri setiap jawaban dengan pertanyaan yang tidak diperlukan. Jangan membahas hal yang tidak diminta.

KEJUJURAN
Primbon adalah tradisi budaya untuk refleksi, bukan kepastian ilmiah atau jaminan masa depan. Jangan memastikan kekayaan, jodoh, penyakit, umur, kecelakaan, kematian, atau kejadian masa depan. Jika informasi tidak cukup, katakan dengan jelas dan jangan menebak.
`;

function cleanText(value: unknown, maxLength = 4000): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isClearFollowUp(question: string): boolean {
  return /\b(lanjutkan|lanjut|yang tadi|tadi itu|maksudnya apa|jelaskan lagi|perjelas|bagian itu|poin itu|jawaban tadi|contoh lainnya|terus bagaimana|kalau begitu|kenapa begitu|itu bagaimana)\b/i.test(question);
}

function historyForPrompt(chatHistory: unknown, question: string): string {
  if (!isClearFollowUp(question) || !Array.isArray(chatHistory)) return '';
  const safeMessages = chatHistory
    .filter((item: any) => item && typeof item.text === 'string' && (item.sender === 'user' || item.sender === 'kiageng' || item.sender === 'assistant'))
    .slice(-6)
    .map((item: any) => `${item.sender === 'user' ? 'Pengguna' : 'Minton'}: ${cleanText(item.text, 1200)}`);
  return safeMessages.length ? `\nKONTEKS LANJUTAN YANG RELEVAN:\n${safeMessages.join('\n')}\n` : '';
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.use(express.json({ limit: '1mb' }));

  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = apiKey ? new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
  }) : null;

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, aiConfigured: Boolean(apiKey) });
  });

  // 1. Konsultasi Minton
  app.post('/api/gemini/consult', async (req: Request, res: Response) => {
    try {
      const userQuestion = cleanText(req.body?.userQuestion, 4000);
      const wetonContext = req.body?.wetonContext;
      const chatHistory = req.body?.chatHistory;
      if (!userQuestion) return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });
      if (!ai) return res.status(503).json({ error: 'Layanan AI belum aktif. Periksa GEMINI_API_KEY pada konfigurasi server.' });

      const contextWeton = wetonContext && typeof wetonContext === 'object'
        ? `Data weton yang sedang ditampilkan aplikasi (gunakan hanya jika pertanyaan secara jelas meminta weton pengguna):\n- Hari: ${cleanText(wetonContext.dina, 50)}\n- Pasaran: ${cleanText(wetonContext.pasaran, 50)}\n- Neptu: ${cleanText(String(wetonContext.neptuTotal ?? ''), 30)}\n- Lakuning: ${cleanText(wetonContext.lakuning, 100)}\n- Pancasuda: ${cleanText(wetonContext.pancasuda, 100)}\n- Wuku: ${cleanText(wetonContext.wuku, 100)}\n` : '';
      const history = historyForPrompt(chatHistory, userQuestion);
      const promptText = `${contextWeton}${history}\nPERTANYAAN TERBARU (INI YANG HARUS DIJAWAB):\n${userQuestion}\n\nJawab pertanyaan terbaru ini secara langsung. Jangan menyebut konteks weton aplikasi jika tidak relevan. Jika pertanyaan berdiri sendiri, perlakukan sebagai topik baru.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.45 },
      });
      const reply = response.text?.trim();
      if (!reply) return res.status(502).json({ error: 'AI tidak mengembalikan jawaban. Silakan coba lagi.' });
