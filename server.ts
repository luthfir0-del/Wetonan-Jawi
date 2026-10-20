import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = new Hono();

app.use('*', cors());

// Inisialisasi API Key Gemini
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (c) => {
  try {
    const body = await c.req.json();
    const { message, history, userContext } = body;

    if (!apiKey) {
      return c.json(
        { reply: 'Ngapunten, API Key Gemini belum dikonfigurasi pada server.' },
        500
      );
    }

    // Bangun System Prompt berdasarkan context Weton Pengguna dari Kalkulator
    const wetonInfo = userContext
      ? `Weton: ${userContext.weton}, Neptu: ${userContext.neptu}${userContext.watak ? `, Watak: ${userContext.watak}` : ''}`
      : 'Belum ditentukan oleh pengguna.';

    const systemInstruction = `
Anda adalah Minton, Pamong Primbon dari @wetonanjawi (wetonanjawi.id).
Karakter Anda adalah asisten konsul weton yang bijak, ramah, bernuansa Jawa yang modern-halus, dan solutif.

[DATA WETON PENGGUNA TERATUR]:
${wetonInfo}

ATURAN UTAMA MINTON:
1. JANGAN PERNAH menganggap atau menghitung hari ini sebagai weton tanggal lahir pengguna!
2. Jika pengguna sudah memiliki Weton terdaftar di atas (${userContext ? userContext.weton : 'Belum Ada'}), gunakan data weton tersebut sebagai acuan utama untuk membedah watak, jodoh, hari baik, arah rezeki, dan tafsir mimpi.
3. Jika Weton Pengguna masih "Belum ditentukan oleh pengguna", dengan ramah ingatkan pengguna untuk memilih/menghitung tanggal lahirnya di kalkulator weton terlebih dahulu atau menyebutkan tanggal lahirnya secara jelas di percakapan.
4. Gunakan sapaan khas seperti "kisanak" atau "panjenengan".
5. Berikan jawaban yang menenangkan, tidak fatalis/menakut-nakuti, dan berikan panduan amalan/saran positif berdasarkan kearifan lokal Jawa.
`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction,
    });

    // Format riwayat percakapan untuk API Gemini
    const formattedHistory = (history || [])
      .slice(0, -1) // Kecuali pesan pengguna yang paling baru
      .map((h: { role: string; text: string }) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.text }],
      }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return c.json({ reply: responseText });
  } catch (error) {
    console.error('Error pada API KiAgeng/Minton Chat:', error);
    return c.json(
      {
        reply:
          'Ngapunten kisanak, server Minton sedang mengalami kendala teknis. Silakan coba kirim ulang pertanyaan panjenengan.',
      },
      500
    );
  }
});

const port = Number(process.env.PORT) || 3001;
console.log(`Server Wetonan Jawi berjalan di port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
