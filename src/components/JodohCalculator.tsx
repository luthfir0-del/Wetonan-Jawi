import React, { useState, useEffect } from 'react';
import { hitungJodoh, JodohResult } from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  BrainCircuit,
  Loader2,
  Copy,
  Check,
  Activity
} from 'lucide-react';

interface JodohCalculatorProps {
  onConsultKiAgeng: (question: string) => void;
}

export const JodohCalculator: React.FC<JodohCalculatorProps> = ({ onConsultKiAgeng }) => {
  const [tglPria, setTglPria] = useState<string>('1996-05-15');
  const [tglWanita, setTglWanita] = useState<string>('1998-08-20');
  const [jodohResult, setJodohResult] = useState<JodohResult | null>(null);

  // AI Wedding Insight
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (tglPria && tglWanita) {
      const res = hitungJodoh(tglPria, tglWanita);
      setJodohResult(res);
      setAiInsight(null);

      // Trigger celebration confetti for high compatibility
      if (res.kategori === 'RATU' || res.kategori === 'JODOH' || res.kategori === 'PESTHI') {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#D4AF37', '#F43F5E'],
        });
      }
    }
  }, [tglPria, tglWanita]);

  const handleCopyJodoh = () => {
    if (!jodohResult) return;
    const text = `💍 PETUNGAN JODOH JAWA 💍
Pria: ${jodohResult.pria.dina} ${jodohResult.pria.pasaran} (Neptu ${jodohResult.neptuPria})
Wanita: ${jodohResult.wanita.dina} ${jodohResult.wanita.pasaran} (Neptu ${jodohResult.neptuWanita})
Total Neptu: ${jodohResult.neptuTotal}
Hasil: ${jodohResult.kategori} (${jodohResult.artosJawa})
Skor Kecocokan: ${jodohResult.skorKecocokan}%

Dihitung akurat di https://wetonanjawi.ai.id (Tema Biru Dongker @wetonanjawi)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGetAiInsight = async () => {
    if (!jodohResult) return;
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/gemini/jodoh-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jodohData: jodohResult }),
      });
      const data = await res.json();
      setAiInsight(data.nasihat || 'Tetap rawat cinta kasih dengan rasa saling percaya dan tawakal.');
    } catch (err) {
      console.error(err);
      setAiInsight('Terjadi kendala saat menghubungkan wejangan Ki Ageng AI.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs sm:text-sm font-medium mb-4 shadow-lg shadow-blue-950/40">
          <Heart className="w-4 h-4 text-rose-400" />
          <span>Petungan Salaki Rabi & Kecocokan Jodoh Berbasis Primbon Keraton</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Cek Keselarasan Cinta & Mahligai <span className="text-rose-400">Jodoh Sejati</span>
        </h2>
        <p className="mt-3 text-blue-200/80 text-sm sm:text-base leading-relaxed">
          Petungan Neptu Jodoh (Pria + Wanita Modulo 8) mengungkap potensi keharmonisan rumah tangga, limpahan rezeki anak cucu, serta solusi adat penangkal sengkolo.
        </p>
        <KeratonOrnament className="mt-4" />
      </div>

      {/* Dual Input Form (Biru Dongker) */}
      <div className="bg-[#0c1838]/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Heart Divider Icon */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#081026] border border-blue-500/40 items-center justify-center z-10 shadow-lg">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-500/30 animate-pulse" />
          </div>

          {/* Pria */}
          <div className="bg-[#081026]/90 p-5 rounded-2xl border border-blue-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Tanggal Lahir Calon Pria
              </label>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-600/30 text-amber-300 border border-blue-500/30 font-medium">
                Kakang
              </span>
            </div>
            <div className="relative">
              <input
                type="date"
                value={tglPria}
                onChange={(e) => setTglPria(e.target.value)}
                className="w-full bg-[#0b142d] border border-blue-900/60 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all shadow-inner"
              />
              <Calendar className="w-4 h-4 text-amber-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>

            {jodohResult && (
              <div className="pt-2 text-xs text-blue-200 flex items-center justify-between bg-[#0b142d]/80 p-2.5 rounded-lg border border-blue-900/40">
                <span>
                  Weton: <strong className="text-amber-300">{jodohResult.pria.dina} {jodohResult.pria.pasaran}</strong>
                </span>
                <span className="bg-blue-600/30 px-2 py-0.5 rounded text-amber-300 font-bold border border-blue-500/30">
                  Neptu {jodohResult.neptuPria}
                </span>
              </div>
            )}
          </div>

          {/* Wanita */}
          <div className="bg-[#081026]/90 p-5 rounded-2xl border border-blue-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Tanggal Lahir Calon Wanita
              </label>
              <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
                Nimas
              </span>
            </div>
            <div className="relative">
              <input
                type="date"
                value={tglWanita}
                onChange={(e) => setTglWanita(e.target.value)}
                className="w-full bg-[#0b142d] border border-blue-900/60 focus:border-rose-400 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all shadow-inner"
              />
              <Calendar className="w-4 h-4 text-rose-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>

            {jodohResult && (
              <div className="pt-2 text-xs text-blue-200 flex items-center justify-between bg-[#0b142d]/80 p-2.5 rounded-lg border border-blue-900/40">
                <span>
                  Weton: <strong className="text-rose-300">{jodohResult.wanita.dina} {jodohResult.wanita.pasaran}</strong>
                </span>
                <span className="bg-rose-500/20 px-2 py-0.5 rounded text-rose-200 font-bold border border-rose-500/30">
                  Neptu {jodohResult.neptuWanita}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Result Display (Biru Dongker Luxury) */}
      {jodohResult && (
        <div className="bg-gradient-to-br from-[#0c1838] via-[#0f204c] to-[#081026] border-2 border-blue-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-blue-900/60">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5 mb-1">
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                Hasil Petungan Salaki Rabi Jawa
              </span>
              <div className="flex items-baseline gap-3">
                <h3 className="font-serif text-3xl sm:text-5xl font-black text-white">
                  Kategori: <span className="text-rose-400">{jodohResult.kategori}</span>
                </h3>
                <span className="text-2xl sm:text-3xl text-amber-300 aksara-jawa">
                  {jodohResult.kategoriAksara}
                </span>
              </div>
              <p className="text-sm font-medium text-amber-300 mt-1">
                "{jodohResult.artosJawa}"
              </p>
            </div>

            {/* Score circle / meter */}
            <div className="bg-[#081026]/90 border border-blue-500/40 rounded-2xl p-4 text-center min-w-[140px] shadow-lg">
              <span className="block text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                Indeks Keselarasan
              </span>
              <span className="font-serif text-3xl sm:text-4xl font-black text-rose-400">
                {jodohResult.skorKecocokan}%
              </span>
              <div className="w-full bg-[#0b142d] rounded-full h-1.5 mt-2 overflow-hidden border border-blue-900/40">
                <div
                  className="bg-gradient-to-r from-blue-400 via-amber-400 to-rose-500 h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${jodohResult.skorKecocokan}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-blue-200 block mt-1">
                Total Neptu: {jodohResult.neptuTotal}
              </span>
            </div>
          </div>

          {/* Narrative & Dynamics */}
          <div className="bg-[#081026]/80 p-5 rounded-2xl border border-blue-900/50 space-y-3">
            <h4 className="font-serif text-base font-bold text-blue-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" />
              Tafsir Primbon & Dinamika Rumah Tangga
            </h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              {jodohResult.maknaLengkap}
            </p>
            <p className="text-blue-200/90 text-xs italic bg-[#0b142d]/80 p-3 rounded-xl border border-blue-900/40">
              💡 Dinamika Hubungan: {jodohResult.potensiDinamika}
            </p>
          </div>

          {/* Adat Penyelaras & Ruwatan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#081026]/80 border border-blue-900/50 rounded-2xl p-4">
              <span className="text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Ruwatan / Slametan Adat:
              </span>
              <p className="text-blue-100 leading-relaxed">
                {jodohResult.solusiPenyelaras.ruwatan}
              </p>
            </div>

            <div className="bg-[#081026]/80 border border-blue-900/50 rounded-2xl p-4">
              <span className="text-emerald-400 font-bold block mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Amalan Batin & Doa:
              </span>
              <p className="text-blue-100 leading-relaxed">
                {jodohResult.solusiPenyelaras.amalan}
              </p>
            </div>

            <div className="bg-[#081026]/80 border border-blue-900/50 rounded-2xl p-4">
              <span className="text-rose-400 font-bold block mb-1.5 flex items-center gap-1.5">
                <Heart className="w-4 h-4" /> Kunci Keharmonisan:
              </span>
              <p className="text-blue-100 leading-relaxed">
                {jodohResult.solusiPenyelaras.tipsHarmonis}
              </p>
            </div>
          </div>

          {/* Action Button: AI Wedding Insight & Copy */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleGetAiInsight}
              disabled={isLoadingAi}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-blue-600 hover:from-rose-400 hover:to-blue-500 text-stone-950 font-bold text-sm shadow-xl shadow-blue-950/40 transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoadingAi ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-stone-950" />
                  <span>Menyiapkan Petuah Pernikahan bersama Minton...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-5 h-5 text-stone-950" />
                  <span>Bedah Pernikahan bersama Minton</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyJodoh}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#081026] hover:bg-blue-950 text-blue-200 border border-blue-900/60 text-sm font-semibold transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-blue-300" />
                  <span>Salin Hasil Petungan</span>
                </>
              )}
            </button>
          </div>

          {/* AI Response Display */}
          {aiInsight && (
            <div className="bg-[#081026] border border-blue-500/40 rounded-2xl p-6 shadow-xl space-y-3 animate-in fade-in duration-500">
              <div className="flex items-center justify-between pb-2 border-b border-blue-900/60">
                <span className="font-serif font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Petuah Pernikahan bersama Minton
                </span>
                <span className="text-[10px] text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                  Wetonan Jawi
                </span>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed whitespace-pre-line">
                {aiInsight}
              </p>
              <div className="pt-2 text-right">
                <button
                  onClick={() =>
                    onConsultKiAgeng(
                      `Halo Minton, kami pasangan pria weton ${jodohResult.pria.dina} ${jodohResult.pria.pasaran} dan wanita weton ${jodohResult.wanita.dina} ${jodohResult.wanita.pasaran} dengan hasil petungan ${jodohResult.kategori} (Neptu ${jodohResult.neptuTotal}). Mohon bimbingan dan panduan lebih lanjut untuk kelancaran masa depan kami.`
                    )
                  }
                  className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
                >
                  Tanya Minton lebih lanjut seputar jodoh →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
