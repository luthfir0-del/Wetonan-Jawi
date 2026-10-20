import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Inisialisasi Google GenAI SDK (Server-Side Only)
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // 1. Endpoint Konsultasi Ki Ageng Sasangka AI
  app.post('/api/gemini/consult', async (req: Request, res: Response) => {
    try {
      const { userQuestion, wetonContext, chatHistory } = req.body;

      if (!userQuestion) {
        return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });
      }

      if (!apiKey) {
        // Fallback anggun jika kunci belum aktif
        return res.json({
          reply: `Nuwun sewu, kisanak. Dari sudut pandang kearifan Jawi mengenai ${wetonContext?.dina || ''} ${wetonContext?.pasaran || ''} (Neptu ${wetonContext?.neptuTotal || 'luhur'}), setiap manusia dilahirkan dengan garis titah dan wadah rezeki masing-masing. Teruslah berikhtiar dengan laku jujur lan sabar: *"Urip iku urup"* (hidup hendaknya memberi manfaat dan cahaya bagi sesama). Gusti Ingkang Murbeng Dumadi senantiasa memberkahi niat yang tulus.`,
        });
      }

      const systemInstruction = `Anda adalah Minton (Admin & Pamong Wetonan Jawi @wetonanjawi), sosok yang sangat ramah, hangat, bijak, berwawasan luas, dan bersahabat bagi komunitas Wetonan Jawi di Threads dan YouTube.
Anda memadukan kearifan filosofi luhur Primbon Jawa (seperti "Memayu Hayuning Bawana", "Sangkan Paraning Dumadi", "Urip Iku Urup", "Alon-alon Waton Kelakon", petungan weton, kalender pasaran & pawukon, serta tafsir sasmita impen/arti mimpi menurut Kitab Primbon Betaljemur Adammakna) dengan pendekatan yang mudah dipahami, relevan dengan kehidupan modern, dan penuh empati.

Karakter & Gaya Bicara:
- Bahasa Indonesia yang santun, luwes, hangat, bersahabat, dan menentramkan khas Minton @wetonanjawi.
- Menyisipkan sapaan ramah khas seperti "Halo Sedulur", "Kisanak", atau "Sobat Wetonan Jawi".
- Jika pengguna menanyakan mimpi, jelaskan firasat dan simbolisme budayanya secara menyejukkan, ingatkan etika waktu mimpi (Puspowajom di sepertiga malam akhir vs Titiyoni bunga tidur), dan berikan anjuran laku batin yang positif (seperti sedekah weton, sujud syukur, atau mawas diri).
- Berikan saran yang solutif, optimis, tidak menakut-nakuti, dan membangun semangat hidup.
- Selalu ingatkan bahwa petungan weton & tafsir mimpi adalah sarana mawas diri dan ikhtiar lahir batin, sedangkan takdir dan rezeki mutlak ada di tangan Gusti Kang Maha Kuwasa.`;

      let promptText = `Data Weton Pengguna:\n`;
      if (wetonContext) {
        promptText += `- Weton: ${wetonContext.dina} ${wetonContext.pasaran} (Neptu: ${wetonContext.neptuTotal})\n`;
        promptText += `- Lakuning: ${wetonContext.lakuning}\n`;
        promptText += `- Pancasuda: ${wetonContext.pancasuda}\n`;
        promptText += `- Wuku: ${wetonContext.wuku}\n\n`;
      }

      if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
        promptText += `Riwayat percakapan sebelumnya:\n`;
        chatHistory.slice(-4).forEach((msg: { sender: string; text: string }) => {
          promptText += `${msg.sender === 'user' ? 'Penanya' : 'Ki Ageng'}: ${msg.text}\n`;
        });
        promptText += `\n`;
      }

      promptText += `Pertanyaan Pengguna saat ini:\n"${userQuestion}"\n\nBerikan wejangan dan pencerahan yang bijak, menentramkan batin, dan memberikan panduan nyata.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Rahayu, kisanak. Semoga senantiasa dalam lindungan Gusti Ingkang Maha Agung.';
      return res.json({ reply });
    } catch (error: any) {
      console.error('Error in /api/gemini/consult:', error);
      return res.status(500).json({
        error: 'Terjadi kendala saat menghubungkan dengan wejangan Ki Ageng AI.',
        details: error?.message || String(error),
      });
    }
  });

  // 2. Endpoint Bedah Weton AI Mendalam
  app.post('/api/gemini/deep-analysis', async (req: Request, res: Response) => {
    try {
      const { weton } = req.body;
      if (!weton) {
        return res.status(400).json({ error: 'Data weton tidak valid.' });
      }

      if (!apiKey) {
        return res.json({
          analisisMendalam: `Pribadi weton ${weton.dina} ${weton.pasaran} dengan neptu ${weton.neptuTotal} diberkahi watak ${weton.lakuning}. Teruslah mengasah kepekaan rasa dan perbanyak sedekah agar energi rezeki senantiasa melimpah ruah.`,
          amalanBatin: 'Melakukan puasa weton dan memperbanyak zikir atau meditasi ketenangan batin.',
          pusakaFilosofi: 'Sabar, sareh, semeleh (berserah diri secara tawakal kepada Sang Pencipta).',
        });
      }

      const promptText = `Lakukan bedah kepribadian spiritual dan potensi hidup mendalam dari sudut pandang Primbon Jawa dan psikologi modern untuk weton berikut:
- Hari & Pasaran: ${weton.dina} ${weton.pasaran}
- Neptu: ${weton.neptuTotal} (${weton.dina}: ${weton.neptuDina}, ${weton.pasaran}: ${weton.neptuPasaran})
- Lakuning: ${weton.lakuning} (${weton.lakuningDesc})
- Pancasuda: ${weton.pancasuda} (${weton.pancasudaDesc})
- Wuku: ${weton.wuku} (${weton.wukuMakna})

Tolong buatkan:
1. "analisisMendalam": Ulasan naratif 2-3 paragraf mengenai rahasia kekuatan batin, daya cipta, potensi kepemimpinan, dan tantangan hidup yang harus diwaspadai.
2. "kunciRezeki": Nasihat khusus cara membuka pintu rezeki dan pintu keberkahan untuk weton ini.
3. "amalanPenyelaras": Tindakan atau kebiasaan luhur penyeimbang watak (misal: puasa weton, sedekah subuh, atau latihan ketenangan jiwa).
4. "ajimatFilosofi": 1 kalimat falsafah Jawa luhur yang paling cocok menjadi pegangan hidupnya seumur hidup beserta maknanya.

Format jawaban harus berwibawa, menginspirasi, dan tidak menakut-nakuti.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Anda adalah begawan spiritual Primbon Jawa Mataram yang mengupas rahasia weton secara elegan, memberdayakan, dan bijak.',
          temperature: 0.7,
        },
      });

      return res.json({ text: response.text });
    } catch (error: any) {
      console.error('Error in /api/gemini/deep-analysis:', error);
      return res.status(500).json({
        error: 'Gagal menghasilkan bedah weton AI.',
        details: error?.message || String(error),
      });
    }
  });

  // 3. Endpoint Analisis Jodoh AI Mendalam
  app.post('/api/gemini/jodoh-insight', async (req: Request, res: Response) => {
    try {
      const { jodohData } = req.body;
      if (!jodohData) {
        return res.status(400).json({ error: 'Data jodoh tidak valid.' });
      }

      const promptText = `Berikan wejangan perkawinan dan harmonisasi rumah tangga berdasarkan hasil hitungan petungan Jawi:
- Pria: ${jodohData.pria.dina} ${jodohData.pria.pasaran} (Neptu ${jodohData.neptuPria})
- Wanita: ${jodohData.wanita.dina} ${jodohData.wanita.pasaran} (Neptu ${jodohData.neptuWanita})
- Total Neptu: ${jodohData.neptuTotal}
- Kategori Petungan: ${jodohData.kategori} (${jodohData.artosJawa})
- Skor Kecocokan: ${jodohData.skorKecocokan}%

Buatlah wejangan 2-3 paragraf yang mencakup:
1. Bagaimana cara mengolah perbedaan watak kedua pasangan agar menjadi kekuatan saling melengkapi.
2. Solusi praktis dan spiritual untuk menepis pantangan atau gesekan ego (khususnya bila kategori Pegat, Padu, Sujanan, atau Topo).
3. Doa restu dan petuah bijak Jawa tentang membina mahligai rumah tangga yang sakinah mawaddah warahmah, rukun hayu rahayu.`;

      if (!apiKey) {
        return res.json({
          nasihat: `Pasangan ${jodohData.pria.dina} ${jodohData.pria.pasaran} dan ${jodohData.wanita.dina} ${jodohData.wanita.pasaran} dengan neptu total ${jodohData.neptuTotal} (${jodohData.kategori}) diberkahi potensi harmoni yang indah. Kunci utama adalah saling mengalah saat emosi meluap dan senantiasa bersyukur atas kebersamaan.`,
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Anda adalah penasihat pernikahan adat Jawa luhur yang mengutamakan keutuhan rumah tangga, kebijaksanaan komunikasi, dan doa keselamatan.',
          temperature: 0.7,
        },
      });

      return res.json({ nasihat: response.text });
    } catch (error: any) {
      console.error('Error in /api/gemini/jodoh-insight:', error);
      return res.status(500).json({
        error: 'Gagal menganalisis jodoh AI.',
        details: error?.message || String(error),
      });
    }
  });

  // 4. Endpoint Saran Hari Baik Mendalam AI (Ki Ageng AI Recommender)
  app.post('/api/gemini/saran-hari-baik', async (req: Request, res: Response) => {
    try {
      const { wetonPemohon, targetHajatan, bulanTahun, topDays } = req.body;

      if (!wetonPemohon || !targetHajatan) {
        return res.status(400).json({ error: 'Data hajatan tidak lengkap.' });
      }

      if (!apiKey) {
        return res.json({
          rekomendasi: `Berdasarkan petungan weton ${wetonPemohon.dina} ${wetonPemohon.pasaran} untuk keperluan ${targetHajatan}, pilihlah hari berenergi Wasesa Segara di jam 08:30 - 11:00 WIB. Awali dengan sedekah tumpeng robyong dan doa keselamatan.`,
        });
      }

      const promptText = `Anda adalah Ki Ageng Sasangka, pakar Primbon Keraton Jawa.
Pemohon memiliki:
- Weton: ${wetonPemohon.dina} ${wetonPemohon.pasaran} (Neptu: ${wetonPemohon.neptuTotal}, Lakuning: ${wetonPemohon.lakuning})
- Rencana Hajatan: ${targetHajatan}
- Bulan Perkiraan: ${bulanTahun}
- Kandidat Hari Baik Teratas menurut Algoritma Primbon:
${JSON.stringify(topDays, null, 2)}

Berikan wejangan dan rekomendasi saran hari baik terbaik:
1. Pilih 1 atau 2 tanggal yang paling sakral dan berkah dari daftar di atas beserta alasan filosofi Jawa (misal: bebas Naas, energi Pancasuda Wasesa Segara / Satria Wibawa).
2. Tentukan jam pelaksanaan (Saat Pitu) yang paling mustajab (misal jam ijab kabul atau jam buka pintu usaha).
3. Arah mata angin melangkah (Naga Dina) dan bekal doa / slametan penyelarasan adat.
4. Kata mutiara / nasehat penenang batin.

Gunakan gaya bahasa santun, berwibawa, penuh berkah khas sesepuh Jawi bijak.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: 'Anda adalah begawan spiritual Primbon Jawa Mataram yang mengarahkan pemilihan hari baik dengan cermat dan bijaksana.',
          temperature: 0.7,
        },
      });

      return res.json({ rekomendasi: response.text });
    } catch (error: any) {
      console.error('Error in /api/gemini/saran-hari-baik:', error);
      return res.status(500).json({
        error: 'Gagal menghasilkan saran hari baik AI.',
        details: error?.message || String(error),
      });
    }
  });

  // Serve static files or Vite dev server
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WetonanJawi.ai.id server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
