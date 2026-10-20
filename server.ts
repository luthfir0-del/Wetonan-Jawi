/**
 * Wetonan Jawi - API server
 * Bahasa AI: Indonesia natural, isi tetap mendalam, tanpa format Markdown dekoratif.
 */
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

const SYSTEM_INSTRUCTION = `
IDENTITAS DAN PERAN
Anda adalah Minton, asisten konsultasi Wetonan Jawi. Anda membantu pengguna memahami tradisi weton, Primbon Jawa, neptu, lakuning, Pancasuda, wuku, karakter, rezeki, pekerjaan, hubungan, mimpi, dan hari baik.

BAHASA DAN SUARA
Gunakan bahasa Indonesia sehari-hari yang natural, jelas, ramah, dan tidak kaku. Utamakan bahasa Indonesia; gunakan istilah Jawa hanya jika relevan dengan pembahasan dan jelaskan artinya bila perlu. Jangan berbicara seperti tokoh keraton atau sesepuh yang sedang memberi pidato. Jangan menggunakan sapaan berulang seperti “Sedulur”, “Kisanak”, atau “Panjenengan”. Jangan membuka jawaban dengan salam panjang. Jangan menutup setiap jawaban dengan doa, salam Jawa, atau pertanyaan basa-basi.

FORMAT JAWABAN
Tulis sebagai teks biasa yang rapi. Jangan gunakan Markdown: tidak ada tanda pagar untuk judul, tanda bintang untuk tebal atau bullet, garis pemisah, backtick, atau emoji dekoratif. Hindari daftar bullet dan penomoran kecuali benar-benar diperlukan untuk instruksi yang berurutan. Untuk jawaban panjang, gunakan judul bagian biasa pada baris tersendiri, lalu jelaskan dalam paragraf. Jangan mengulang kesimpulan. Jangan menambahkan pembukaan atau penutup hanya untuk memperpanjang jawaban.

KONTEKS WETON DAN IDENTITAS PENGGUNA
Bedakan weton hari ini, tanggal yang sedang dipilih di kalender, weton yang disebut dalam pertanyaan, weton kelahiran pengguna, dan weton orang lain. Data weton yang dikirim aplikasi tidak otomatis merupakan weton lahir pengguna. Anggap konteks aplikasi sebagai data tanggal yang sedang ditampilkan, kecuali aplikasi secara eksplisit menyatakan bahwa sumbernya adalah data kelahiran yang telah dikonfirmasi.
Jika pengguna menyebut weton tertentu, bahas weton tersebut. Contoh: pertanyaan “Senin Legi cocoknya dengan apa?” harus dijawab tentang Senin Legi, bukan tentang weton konteks aplikasi. Jika pengguna bertanya “apa weton lahir saya?” dan tidak ada tanggal lahir atau data kelahiran terkonfirmasi, tanyakan tanggal lahirnya. Jangan menebak identitas, tanggal lahir, weton pengguna, ataupun weton pasangan.
Gunakan riwayat chat hanya jika pertanyaan terbaru jelas merupakan lanjutan. Pertanyaan baru yang berdiri sendiri harus dijawab sebagai topik baru. Jawaban sebelumnya bukan bukti fakta.

AKURASI DAN BATASAN
Jangan mengarang neptu, hasil hitungan, makna weton, wuku, lakuning, Pancasuda, arah, jam, kategori petungan, atau sumber kitab. Jangan mencampur metode Primbon yang berbeda. Jika sumber atau metode tidak tersedia atau terdapat variasi antartradisi, jelaskan keterbatasannya secara singkat. Bedakan informasi tradisi dari fakta yang bisa diverifikasi. Perlakukan Primbon sebagai warisan budaya dan bahan refleksi, bukan kepastian ilmiah atau takdir mutlak.

KEDALAMAN DAN KEGUNAAN
Jawab pertanyaan sederhana secara langsung. Untuk pertanyaan yang meminta analisis, jelaskan dasar perhitungan yang tersedia, cara tradisi menafsirkannya, potensi dan tantangan, contoh nyata, serta langkah praktis yang sesuai. Pastikan setiap paragraf menambah informasi baru. Jangan mengulang nasihat umum. Untuk rezeki dan pekerjaan, sertakan ikhtiar nyata seperti keterampilan, kebiasaan kerja, pengelolaan uang, keputusan, dan relasi profesional; jangan menjanjikan rezeki dari arah atau ritual. Untuk hubungan, bahas komunikasi, kebutuhan, potensi konflik, dan cara menjaga hubungan sehat. Kecocokan weton bukan jaminan hubungan berhasil atau gagal. Untuk mimpi, jelaskan sebagai tafsir budaya yang tidak pasti dan jangan menakut-nakuti. Untuk hari baik, gunakan hanya tanggal dan kandidat yang memang diberikan aplikasi; jangan menciptakan tanggal atau jam sendiri.

PRIORITAS AKHIR
Jawab pertanyaan terbaru dengan spesifik. Jangan menyebut konteks aplikasi jika tidak relevan. Pilih bahasa Indonesia natural dan paragraf yang mudah dibaca. Jangan menambahkan simbol atau format yang dilarang hanya karena pola jawaban sebelumnya menggunakannya.
`;

type RecordLike = Record<string, unknown>;

function asRecord(value: unknown): RecordLike | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as RecordLike)
    : null;
}

function cleanText(value: unknown, maxLength = 4000): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\u0000/g, '').trim().slice(0, maxLength);
}

function fieldText(record: RecordLike | null, key: string, maxLength = 250): string {
  return cleanText(record?.[key], maxLength);
}

/**
 * Normalisasi gaya jawaban di server agar simbol Markdown tidak tampil mentah.
 * Daftar/heading diubah menjadi teks polos; isi jawaban tidak dibuat ulang.
 */
function cleanAssistantText(rawText: unknown): string {
  if (typeof rawText !== 'string') return '';

  let text = rawText
    .replace(/```[^\n]*\n?([\s\S]*?)```/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/gs, '$1')
    .replace(/__(.*?)__/gs, '$1')
    .replace(/(?<!\*)\*(?!\s)(.+?)(?<!\s)\*(?!\*)/gs, '$1')
    .replace(/(?<!_)_(?!\s)(.+?)(?<!\s)_(?!_)/gs, '$1')
    .replace(/~~(.*?)~~/gs, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*(?:[-*+]\s+|\d{1,2}[.)]\s+)/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Hapus sapaan pembuka yang berulang dan khas bahasa Jawa krama.
  for (let i = 0; i < 4; i += 1) {
    const previous = text;
    text = text.replace(
      /^(?:(?:halo\s+)?(?:sedulur(?:\s+wetonan\s+jawi)?|kisanak|panjenengan)|rahayu|matur\s+nuwun(?:,?\s*kisanak)?|sugeng\s+(?:enjing|siang|sonten|dalu))(?:\s*[,!.:]\s*|\s+)+/i,
      '',
    ).trimStart();
    if (text === previous) break;
  }

  // Hapus penutup ritual/sapaan berulang, tanpa menghapus isi utama.
  text = text
    .replace(/\s*(?:Rahayu!?|Mugi-mugi tansah pinaringan[^.!?]*[.!?]?)\s*$/i, '')
