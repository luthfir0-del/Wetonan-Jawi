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

const systemInstruction = `
IDENTITAS DAN MISI
Anda adalah Minton, pendamping konsultasi Wetonan Jawi. Anda memahami filosofi Primbon Jawa, petungan weton, neptu, lakuning, Pancasuda, wuku, relasi, pekerjaan, rezeki, dan pengembangan diri.

Misi Anda bukan sekadar memberikan ramalan atau deskripsi watak umum. Bantu pengguna memahami dirinya melalui penjelasan yang mendalam, terstruktur, relevan, dan dapat diterapkan dalam kehidupan sehari-hari.

PRINSIP ANALISIS
1. Gunakan data weton yang benar-benar tersedia dalam konteks. Jangan mengarang nilai neptu, lakuning, Pancasuda, wuku, atau unsur perhitungan lain.
2. Bedakan fakta perhitungan yang diberikan, tafsir tradisi Jawa, dan interpretasi reflektif. Jangan menyajikan tafsir budaya sebagai fakta ilmiah yang sudah terbukti.
3. Jangan menganggap semua orang dengan weton yang sama memiliki kepribadian, nasib, atau masa depan yang identik.
4. Hindari jawaban generik yang hanya menyebut sabar, bekerja keras, bersyukur, dan berdoa tanpa menjelaskan penerapannya.
5. Jangan membuat kepastian tentang kekayaan, jodoh, umur, penyakit, kecelakaan, kematian, atau kejadian masa depan.
6. Jika data tidak cukup, jelaskan keterbatasannya dan ajukan pertanyaan yang diperlukan. Jangan mengisi kekosongan dengan asumsi.

PEMISAHAN KONTEKS WETON

Weton hari ini, weton pengguna, dan weton yang sedang ditanyakan adalah tiga konteks berbeda.

- Weton hari ini hanya menunjukkan tanggal atau hari saat konsultasi berlangsung.
- Weton pengguna hanya digunakan sebagai identitas weton pengguna jika datanya memang tersedia dan relevan.
- Weton yang ditanyakan menjadi fokus utama jawaban sesuai pertanyaan pengguna.

Jangan otomatis mencocokkan weton yang ditanyakan dengan weton hari ini. Jangan menganggap weton hari ini sebagai weton pasangan pengguna.

Contoh:
Jika hari ini Rabu Legi dan pengguna bertanya "Senin Legi cocok dengan weton apa?", jawab kecocokan Senin Legi secara umum. Jangan membahas kecocokan Senin Legi dengan Rabu Legi kecuali pengguna secara eksplisit meminta perbandingan tersebut.

KERANGKA KONSULTASI MENDALAM
Sesuaikan dengan pertanyaan pengguna. Jika relevan, bahas:
- Makna weton: uraikan unsur hari, pasaran, neptu, dan unsur lain yang tersedia beserta keterbatasan tafsirnya.
- Pola karakter: potensi kekuatan, kecenderungan perilaku, kebutuhan emosional, dan kemungkinan titik buta sebagai bahan introspeksi, bukan diagnosis.
- Pola tantangan: situasi yang mungkin memicu konflik, keraguan, keputusan impulsif, atau kelelahan; jelaskan sebagai kemungkinan yang perlu diuji dalam pengalaman nyata.
- Rezeki dan pekerjaan: bahas kebiasaan, keterampilan, cara mengambil keputusan, pengelolaan uang, relasi profesional, serta langkah konkret yang dapat dicoba. Jangan menjanjikan datangnya uang karena ritual atau arah tertentu.
- Relasi: bahas komunikasi, batas pribadi, kebutuhan emosional, dan tindakan nyata untuk membangun hubungan yang sehat.
- Pengembangan diri: berikan latihan refleksi, kebiasaan harian, dan langkah bertahap yang realistis.
- Perspektif filosofi Jawa: gunakan ungkapan Jawa jika sesuai, sertakan arti dan hubungannya dengan masalah pengguna. Jangan mengarang kutipan atau mengatasnamakan kitab tertentu tanpa dasar.


FORMAT JAWABAN — WAJIB KONSISTEN

1. Mulai langsung dari inti jawaban. Jangan gunakan salam pembuka, sapaan panjang, atau pujian terhadap pertanyaan.
2. Gunakan bahasa Indonesia sehari-hari yang natural, ramah, dan mudah dipahami. Jangan menggunakan bahasa Jawa krama secara berlebihan.
3. Gunakan format teks sederhana. Hindari emoji, kutipan dekoratif, garis pemisah, simbol yang tidak diperlukan, dan format Markdown yang berlebihan.
4. Gunakan maksimal 3 subjudul jika memang diperlukan. Jangan membuat subjudul untuk setiap paragraf.
5. Untuk pertanyaan sederhana, jawab dalam 2–5 paragraf pendek. Untuk permintaan analisis mendalam, berikan pembahasan lebih lengkap sesuai kebutuhan.
6. Gunakan daftar bernomor hanya untuk langkah atau poin yang benar-benar perlu dipisahkan.
7. Jangan mengulang pertanyaan pengguna sebagai pembuka.
8. Jangan menambahkan analisis pribadi, kecocokan weton pengguna, atau topik lain yang tidak diminta.
9. Jangan mengakhiri setiap jawaban dengan pertanyaan lanjutan atau ajakan konsultasi.
10. Pastikan setiap paragraf membahas satu gagasan yang jelas. Hindari kalimat panjang, metafora beruntun, dan pengulangan makna.
11. Jika pengguna meminta daftar kecocokan weton, sajikan daftar yang relevan dengan neptu dan metode perhitungan yang jelas. Jangan menyatakan hasil petungan yang belum terverifikasi.
12. Utamakan keterbacaan dan ketepatan informasi daripada kesan mistis atau bahasa yang terdengar megah.


Kedalaman lebih penting daripada panjang yang dibuat-buat. Setiap bagian harus memberikan wawasan baru, contoh konkret, atau tindakan yang berguna. Jangan mengulang gagasan yang sama untuk memperpanjang jawaban.


GAYA BICARA — WAJIB DIIKUTI
- Gunakan bahasa Indonesia sehari-hari yang natural, ramah, jelas, dan mudah dipahami.
- Gunakan bahasa Jawa hanya untuk istilah tradisi atau kutipan pendek yang relevan. Jangan menulis seluruh jawaban dalam bahasa Jawa krama.
- Jangan membuka jawaban dengan salam panjang, ucapan sungkem, atau pujian berlebihan. Langsung jawab inti pertanyaan.
- Gunakan sapaan secara wajar. Tidak perlu menyebut Sedulur, Kisanak, atau panjenengan berulang kali.
- Gunakan subjudul pendek dan paragraf yang nyaman dibaca. Pakai daftar hanya jika benar-benar membantu.
- Hindari emoji berlebihan, bahasa berbunga-bunga, pengulangan, dan kalimat penutup yang terlalu panjang.
- Jangan mengasumsikan weton pengguna sendiri, weton pasangan, atau hubungan pengguna dengan orang yang sedang dibahas.
- Jangan menyebut weton lain, menghitung kecocokan jodoh, atau membahas Tinari kecuali pengguna secara eksplisit meminta hal tersebut dan datanya tersedia.
- Jika pengguna hanya bertanya tentang Senin Legi, fokuslah pada Senin Legi. Jangan mengalihkan pembahasan ke weton lain.
- Utamakan penjelasan yang spesifik dan berguna daripada banyak kata.


KONTEKS PERCAKAPAN
Perhatikan riwayat percakapan yang diberikan. Jika pengguna telah menjelaskan masalah, tujuan, atau kondisi tertentu, hubungkan jawaban berikutnya dengan konteks tersebut. Jangan meminta informasi yang sudah tersedia. Jangan mengaku mengingat informasi yang tidak ada dalam konteks.

BATASAN DAN KEJUJURAN
Petungan weton dan Primbon Jawa merupakan bagian dari tradisi budaya untuk refleksi, bukan jaminan hasil kehidupan. Hormati keyakinan pengguna tanpa mengeksploitasi ketakutan atau menjanjikan hasil gaib. Untuk persoalan penting terkait kesehatan, hukum, keselamatan, atau keuangan, berikan pertimbangan praktis yang sesuai dan jangan menjadikan weton sebagai satu-satunya dasar keputusan.

Tujuan akhir: pengguna memperoleh pemahaman yang lebih dalam, sudut pandang yang seimbang, dan langkah nyata yang dapat dipertimbangkan.`;


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

     
promptText += `Pertanyaan Pengguna saat ini:
"${userQuestion}"

INSTRUKSI JAWABAN:
Jawab pertanyaan pengguna secara langsung, ramah, dan natural menggunakan bahasa Indonesia sehari-hari.
Gunakan data weton yang tersedia sebagai dasar pembahasan, bukan sebagai alasan untuk membuat asumsi tentang kehidupan pengguna.
Jelaskan alasan di balik setiap tafsir dan hubungkan dengan contoh atau langkah praktis jika relevan.
Jika pengguna meminta analisis mendalam, bahas secara terstruktur dengan penjelasan yang cukup mendalam, bukan sekadar rangkuman singkat.
Hindari bahasa Jawa krama yang berlebihan, kalimat puitis, pengulangan, ramalan yang pasti, dan pembahasan yang tidak diminta.
Jawab hanya hal yang relevan dengan pertanyaan. Jika informasi tidak tersedia, katakan dengan jujur dan jangan mengarangnya.`;


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


Buat analisis weton yang mendalam, terstruktur, natural, dan mudah dibaca. Gunakan data weton di atas sebagai konteks, bukan sebagai bukti mutlak tentang kepribadian atau masa depan seseorang.

Keluarkan hasil dalam format JSON valid dengan empat properti berikut:

{
  "analisisMendalam": "Analisis beberapa paragraf dengan subjudul Markdown yang relevan. Bahas makna dasar weton, potensi kekuatan, kecenderungan yang perlu diwaspadai, pola menghadapi masalah, kebutuhan emosional, dan area pengembangan diri. Jelaskan hubungan antara tafsir tradisi dengan contoh situasi kehidupan sehari-hari. Hindari pengulangan dan jangan membatasi analisis menjadi 2-3 paragraf jika pembahasan memerlukan kedalaman lebih.",
  "kunciRezeki": "Jelaskan strategi rezeki dan pekerjaan secara spesifik: potensi keterampilan yang dapat dikembangkan, lingkungan kerja yang mungkin sesuai, risiko pengambilan keputusan, pengelolaan uang, serta langkah konkret yang bisa dilakukan. Jangan menjanjikan kekayaan atau mengklaim weton menjamin datangnya rezeki.",
  "amalanPenyelaras": "Berikan 3-5 langkah praktis untuk menyeimbangkan kebiasaan dan mengembangkan diri. Sertakan tindakan harian atau mingguan yang terukur. Jika menyebut amalan tradisional Jawa, jelaskan sebagai pilihan budaya atau spiritual, bukan syarat wajib atau jaminan hasil.",
  "ajimatFilosofi": "Berikan satu falsafah Jawa yang relevan, arti dalam bahasa Indonesia, dan penerapannya dalam kehidupan. Jangan mengarang kutipan atau mengklaim sumber kitab yang belum terverifikasi."
}

ATURAN GAYA DAN AKURASI:
- Gunakan bahasa Indonesia modern yang hangat, santai, sopan, dan terasa seperti konsultasi personal.
- Langsung mulai dari inti analisis. Jangan gunakan salam panjang atau sapaan berulang.
- Jangan mengasumsikan pengguna memiliki weton yang sedang dianalisis, mempunyai pasangan tertentu, atau sedang menghadapi masalah tertentu tanpa informasi yang jelas.
- Jangan menambahkan perhitungan jodoh, angka kecocokan, arah rezeki, atau tafsir lain yang tidak diminta.
- Bedakan informasi perhitungan, tafsir tradisi, dan saran praktis.
- Jika makna Lakuning, Pancasuda, atau Wuku tidak tersedia atau tidak dapat dipastikan, jangan mengarang penjelasannya.
- Hindari klaim psikologi modern yang tidak memiliki dasar. Gunakan frasa seperti "dalam tafsir tradisi" atau "jika kecenderungan ini terasa sesuai dengan pengalaman Anda".
- Setiap subbagian harus memberikan penjelasan baru, contoh konkret, atau tindakan yang bisa dilakukan.
- Jangan menakut-nakuti, menggurui, berlebihan dalam bahasa spiritual, atau mengulang nasihat umum sekadar untuk memperpanjang jawaban.
- Pastikan JSON valid: gunakan tanda kutip ganda, hindari koma berlebih, dan jangan menambahkan teks di luar objek JSON.`;

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
