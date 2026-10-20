
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
      return res.json({ reply });
    } catch (error: any) {
      console.error('Error in /api/gemini/consult:', error);
      return res.status(500).json({ error: 'Gagal memproses konsultasi Minton.', details: error?.message || String(error) });
    }
  });

  // 2. Bedah weton mendalam
  app.post('/api/gemini/deep-analysis', async (req: Request, res: Response) => {
    try {
      const weton = req.body?.weton;
      if (!weton || !weton.dina || !weton.pasaran) return res.status(400).json({ error: 'Data weton tidak valid.' });
      if (!ai) return res.status(503).json({ error: 'Layanan AI belum aktif. Periksa GEMINI_API_KEY pada konfigurasi server.' });
      const promptText = `Lakukan analisis mendalam untuk data weton berikut.\n\nHari dan pasaran: ${cleanText(weton.dina, 50)} ${cleanText(weton.pasaran, 50)}\nNeptu total: ${cleanText(String(weton.neptuTotal ?? ''), 30)}\nNeptu hari: ${cleanText(String(weton.neptuDina ?? ''), 30)}\nNeptu pasaran: ${cleanText(String(weton.neptuPasaran ?? ''), 30)}\nLakuning: ${cleanText(weton.lakuning, 100)} — ${cleanText(weton.lakuningDesc, 500)}\nPancasuda: ${cleanText(weton.pancasuda, 100)} — ${cleanText(weton.pancasudaDesc, 500)}\nWuku: ${cleanText(weton.wuku, 100)} — ${cleanText(weton.wukuMakna, 500)}\n\nSusun dengan bagian: 1) Gambaran dasar weton dan arti unsur yang tersedia; 2) potensi kekuatan dan cara mengembangkannya; 3) tantangan atau titik buta yang mungkin perlu diperhatikan; 4) rezeki dan pekerjaan dengan strategi yang realistis; 5) kebiasaan praktis untuk pengembangan diri; 6) satu filosofi Jawa yang relevan beserta arti dan penerapannya.\n\nJangan mengarang makna unsur yang tidak tersedia. Beri kedalaman pada tiap bagian tanpa mengulang nasihat. Gunakan bahasa Indonesia natural. Jangan mengasumsikan kondisi hidup, pasangan, atau pekerjaan orang ini. Jangan menjanjikan hasil gaib.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.4 },
      });
      const text = response.text?.trim();
      if (!text) return res.status(502).json({ error: 'AI tidak mengembalikan analisis.' });
      return res.json({ text });
    } catch (error: any) {
      console.error('Error in /api/gemini/deep-analysis:', error);
      return res.status(500).json({ error: 'Gagal menghasilkan bedah weton AI.', details: error?.message || String(error) });
    }
  });

  // 3. Insight petungan jodoh
  app.post('/api/gemini/jodoh-insight', async (req: Request, res: Response) => {
    try {
      const jodohData = req.body?.jodohData;
      if (!jodohData?.pria || !jodohData?.wanita) return res.status(400).json({ error: 'Data jodoh tidak valid.' });
      if (!ai) return res.status(503).json({ error: 'Layanan AI belum aktif. Periksa GEMINI_API_KEY pada konfigurasi server.' });
      const promptText = `Analisis hasil petungan hubungan berdasarkan hasil sistem berikut. Jangan menghitung ulang atau mengubah hasilnya.\n\nPihak pertama: ${cleanText(jodohData.pria.dina, 50)} ${cleanText(jodohData.pria.pasaran, 50)} (neptu ${cleanText(String(jodohData.neptuPria ?? ''), 30)})\nPihak kedua: ${cleanText(jodohData.wanita.dina, 50)} ${cleanText(jodohData.wanita.pasaran, 50)} (neptu ${cleanText(String(jodohData.neptuWanita ?? ''), 30)})\nTotal neptu: ${cleanText(String(jodohData.neptuTotal ?? ''), 30)}\nKategori petungan dari sistem: ${cleanText(jodohData.kategori, 100)} (${cleanText(jodohData.artosJawa, 300)})\nSkor sistem: ${cleanText(String(jodohData.skorKecocokan ?? ''), 30)}%\n\nJelaskan makna kategori sebagai tafsir tradisi, dinamika yang mungkin muncul, risiko komunikasi yang perlu diperhatikan, dan langkah praktis membangun hubungan sehat. Jangan menyebut kategori sebagai kepastian nasib, jangan menakut-nakuti, jangan menjanjikan hubungan berhasil/gagal, dan jangan menyarankan ritual sebagai syarat. Gunakan 3–5 paragraf natural dan spesifik.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.4 },
      });
      return res.json({ nasihat: response.text?.trim() || 'AI tidak mengembalikan analisis hubungan. Silakan coba lagi.' });
    } catch (error: any) {
      console.error('Error in /api/gemini/jodoh-insight:', error);
      return res.status(500).json({ error: 'Gagal menganalisis jodoh AI.', details: error?.message || String(error) });
    }
  });

  // 4. Saran hari baik berdasarkan kandidat yang dihitung aplikasi
  app.post('/api/gemini/saran-hari-baik', async (req: Request, res: Response) => {
    try {
      const { wetonPemohon, targetHajatan, bulanTahun, topDays } = req.body ?? {};
      if (!wetonPemohon || !targetHajatan) return res.status(400).json({ error: 'Data hajatan tidak lengkap.' });
      if (!ai) return res.status(503).json({ error: 'Layanan AI belum aktif. Periksa GEMINI_API_KEY pada konfigurasi server.' });
      const safeTopDays = Array.isArray(topDays) ? topDays.slice(0, 6) : [];
      const promptText = `Bantu menjelaskan kandidat hari baik dari algoritma aplikasi. Jangan menciptakan kandidat baru dan jangan mengarang jam, arah mata angin, kategori, atau makna petungan yang tidak tercantum.\n\nWeton pemohon: ${cleanText(wetonPemohon.dina, 50)} ${cleanText(wetonPemohon.pasaran, 50)} (neptu ${cleanText(String(wetonPemohon.neptuTotal ?? ''), 30)}, lakuning ${cleanText(wetonPemohon.lakuning, 100)})\nKeperluan: ${cleanText(targetHajatan, 200)}\nBulan/periode: ${cleanText(bulanTahun, 50)}\nKandidat yang dihitung aplikasi:\n${JSON.stringify(safeTopDays, null, 2)}\n\nPilih maksimal dua kandidat dari daftar jika ada dasar yang memadai. Sebut tanggal dan weton sesuai data. Jelaskan alasan hanya berdasarkan informasi yang tersedia. Jika kandidat kosong, katakan bahwa data kandidat belum tersedia. Tambahkan langkah persiapan praktis sesuai acara. Tegaskan secara singkat bahwa petungan hari baik merupakan tradisi budaya, bukan jaminan keberhasilan. Gunakan bahasa Indonesia natural dan jangan membuat klaim tentang jam paling mustajab atau ritual wajib.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.3 },
      });
      return res.json({ rekomendasi: response.text?.trim() || 'AI tidak mengembalikan rekomendasi. Silakan coba lagi.' });
    } catch (error: any) {
      console.error('Error in /api/gemini/saran-hari-baik:', error);
      return res.status(500).json({ error: 'Gagal menghasilkan saran hari baik AI.', details: error?.message || String(error) });
    }
  });

  // Serve static files or Vite dev server
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WetonanJawi.ai.id server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
