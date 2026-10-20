import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = new Hono();
app.use('*', cors());

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (c) => {
  try {
    const { message, userContext } = await c.req.json();

    if (!apiKey) {
      return c.json({ reply: 'Waduh, API Key Gemini belum terpasang di server nih.' }, 500);
    }

    const systemInstruction = `
Anda adalah Minton, asisten konsul weton dari @wetonanjawi.
GAYA BAHASA: Santai, ramah, komunikatif, mudah dimengerti, dan modern (Gunakan bahasa Indonesia sehari-hari yang akrab). Hindari bahasa Jawa kromo/halus yang terlalu kaku.

DATA WETON USER:
${userContext ? `Weton Terdaftar: ${userContext.weton} (Neptu${userContext.neptu})` : 'User belum memasukkan weton.'}

ATURAN BALASAN:
1. Jawab pertanyaan pengguna secara LENGKAP, JELAS, dan DETAIL (misal pembahasan rezeki, watak, jodoh, atau saran hari baik).
2. DILARANG membalas singkat seperti "Matur nuwun" atau kalimat puitis tanpa memberikan penjelasan isi.
3. Jika pengguna menanyakan weton tertentu di dalam chat (contoh: "weton senin legi gimana rejekinya"), langsung jelaskan detail weton Senin Legi tersebut secara gamblang dan mudah dipahami.
`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return c.json({ reply: responseText });
  } catch (error) {
    console.error('Server Error:', error);
    return c.json({ reply: 'Waduh, Minton lagi ada kendala jaringan nih. Coba kirim ulang ya!' }, 500);
  }
});

const port = Number(process.env.PORT) || 3001;
serve({ fetch: app.fetch, port });
