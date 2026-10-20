import React, { useState } from 'react';
import { calculateWeton, WetonResult } from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import {
  Sparkles,
  Compass,
  Briefcase,
  Share2,
  Calendar,
  AlertTriangle,
  BrainCircuit,
  Loader2,
  Award,
  Flame,
  CheckCircle2,
  Copy,
  Check,
  Youtube
} from 'lucide-react';

interface WetonCalculatorProps {
  currentWeton: WetonResult;
  onSelectDate: (dateStr: string) => void;
  onConsultKiAgeng: (weton: WetonResult, question?: string) => void;
  onOpenCardModal: (weton: WetonResult) => void;
}

export const WetonCalculator: React.FC<WetonCalculatorProps> = ({
  currentWeton,
  onSelectDate,
  onConsultKiAgeng,
  onOpenCardModal,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(currentWeton.tanggalMasehi);
  const [gender, setGender] = useState<'pria' | 'wanita'>('pria');
  const [copied, setCopied] = useState<boolean>(false);

  // AI Deep Analysis State
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    if (val) {
      onSelectDate(val);
      setAiAnalysisResult(null); // Reset previous AI reading on new date
    }
  };

  const handleCopySummary = () => {
    const text = `🌟 HASIL WETONAN JAWI 🌟
Weton: ${currentWeton.dina} ${currentWeton.pasaran} (Neptu: ${currentWeton.neptuTotal})
Wuku: ${currentWeton.wuku}
Watak: ${currentWeton.lakuning}
Pancasuda: ${currentWeton.pancasuda}
Arah Rezeki: ${currentWeton.karirRezeki.arahKejayaan}
Karier Cocok: ${currentWeton.karirRezeki.bidangCocok.join(', ')}

Dihitung di https://wetonanjawi.ai.id (Tema Biru Dongker @wetonanjawi)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRunAiAnalysis = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/gemini/deep-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weton: currentWeton }),
      });
      const data = await res.json();
      if (data.text) {
        setAiAnalysisResult(data.text);
      } else if (data.analisisMendalam) {
        setAiAnalysisResult(`${data.analisisMendalam}\n\nAmalan Penyelaras: ${data.amalanBatin}\n\nPusaka Filosofi: ${data.pusakaFilosofi}`);
      } else {
        setAiAnalysisResult('Wejangan batin: Jalani hidup dengan eling lan waspada, serta perbanyak laku welas asih.');
      }
    } catch (err) {
      console.error(err);
      setAiAnalysisResult('Kendala koneksi ke Ki Ageng AI. Silakan coba kembali sesaat lagi.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative text-center max-w-3xl mx-auto pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs sm:text-sm font-medium mb-4 shadow-lg shadow-blue-950/50">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Kalkulator Weton Jawi & Primbon Cerdas Berbasis AI</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ungkap Rahasia Batin & Garis Rezeki <span className="gold-gradient-text">Weton Kelahiran</span>
        </h1>
        <p className="mt-3 text-blue-200/80 text-sm sm:text-base leading-relaxed">
          Masukkan tanggal kelahiran Anda untuk menghitung Neptu, Dina, Pasaran, Wuku, Watak Lakuning, arah kejayaan, hingga petunjuk jodoh menurut kitab Primbon Jawa Mataram & AI Gemini.
        </p>
        <KeratonOrnament className="mt-4" />
      </div>

      {/* Date Input Card (Biru Dongker) */}
      <div className="max-w-2xl mx-auto bg-[#0c1838]/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-2 uppercase tracking-wider">
                Tanggal Lahir (Masehi)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="w-full bg-[#081026] border border-blue-500/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 rounded-xl px-4 py-3 text-white text-sm sm:text-base outline-none transition-all shadow-inner"
                  required
                />
                <Calendar className="w-5 h-5 text-amber-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wider">
                Jenis Kelamin
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('pria')}
                  className={`py-3 px-3 rounded-xl text-sm font-medium border transition-all ${
                    gender === 'pria'
                      ? 'bg-blue-600/30 border-amber-400 text-amber-200 shadow-md font-bold'
                      : 'bg-[#081026] border-blue-900/60 text-blue-300/80 hover:border-blue-400'
                  }`}
                >
                  Pria (Kakang)
                </button>
                <button
                  type="button"
                  onClick={() => setGender('wanita')}
                  className={`py-3 px-3 rounded-xl text-sm font-medium border transition-all ${
                    gender === 'wanita'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-md font-bold'
                      : 'bg-[#081026] border-blue-900/60 text-blue-300/80 hover:border-blue-400'
                  }`}
                >
                  Wanita (Nimas)
                </button>
              </div>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-blue-900/40 text-xs text-blue-300/80">
            <span className="font-medium text-amber-300/90">Contoh Populer:</span>
            <button
              type="button"
              onClick={() => {
                const d = '1945-08-17';
                setSelectedDate(d);
                onSelectDate(d);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#081026] hover:bg-blue-950 text-amber-300 border border-blue-900/60 transition-colors"
            >
              17 Ags 1945 (Jumat Legi)
            </button>
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                const d = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                setSelectedDate(d);
                onSelectDate(d);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#081026] hover:bg-blue-950 text-blue-200 border border-blue-900/60 transition-colors"
            >
              Hari Ini
            </button>
          </div>
        </form>
      </div>

      {/* Main Result Showcase (Biru Dongker Luxury Velvet Box) */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Flagship Weton Card Badge */}
        <div className="relative bg-gradient-to-br from-[#0c1838] via-[#0f204c] to-[#081026] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Background Watermark Gunungan */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <GununganIcon size={260} className="text-amber-400" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-blue-900/60">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Kelahiran: {currentWeton.formattedDate}
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-wide">
                  {currentWeton.dina} <span className="gold-gradient-text">{currentWeton.pasaran}</span>
                </h2>
                <span className="text-xl sm:text-3xl text-amber-400 aksara-jawa">
                  {currentWeton.pasaranAksara}
                </span>
              </div>
              <p className="text-blue-200 text-sm mt-1">
                Hari {currentWeton.dinaJawa} • Pasaran {currentWeton.pasaran} • Dina ke-{currentWeton.neptuDina} & Pasaran ke-{currentWeton.neptuPasaran}
              </p>
            </div>

            {/* Total Neptu Badge */}
            <div className="flex items-center gap-4 bg-[#081026]/90 border border-amber-500/50 rounded-2xl p-4 shadow-xl">
              <div className="text-center px-2">
                <span className="block text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                  Total Neptu
                </span>
                <span className="font-serif text-4xl sm:text-5xl font-black text-amber-300">
                  {currentWeton.neptuTotal}
                </span>
              </div>
              <div className="h-10 w-px bg-blue-900/60"></div>
              <div className="text-xs text-blue-200 space-y-0.5">
                <div>Dina: <strong className="text-amber-400">{currentWeton.neptuDina}</strong></div>
                <div>Pasaran: <strong className="text-amber-400">{currentWeton.neptuPasaran}</strong></div>
                <div className="text-[11px] text-blue-300 font-medium">Wuku: {currentWeton.wuku}</div>
              </div>
            </div>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-blue-900/60 text-xs">
            <div className="bg-[#081026]/80 p-3 rounded-xl border border-blue-900/50">
              <span className="text-blue-300/80 block mb-0.5">Lakuning (Watak Utama)</span>
              <strong className="text-amber-300 text-sm font-serif block">{currentWeton.lakuning}</strong>
            </div>
            <div className="bg-[#081026]/80 p-3 rounded-xl border border-blue-900/50">
              <span className="text-blue-300/80 block mb-0.5">Pancasuda (Garis Rezeki)</span>
              <strong className="text-emerald-400 text-sm font-serif block">{currentWeton.pancasuda}</strong>
            </div>
            <div className="bg-[#081026]/80 p-3 rounded-xl border border-blue-900/50">
              <span className="text-blue-300/80 block mb-0.5">Rakam (Kepemimpinan)</span>
              <strong className="text-amber-300 text-sm font-serif block">{currentWeton.rakam}</strong>
            </div>
            <div className="bg-[#081026]/80 p-3 rounded-xl border border-blue-900/50">
              <span className="text-blue-300/80 block mb-0.5">Pangarasan (Daya Pikat)</span>
              <strong className="text-purple-300 text-sm font-serif block">{currentWeton.parasan}</strong>
            </div>
          </div>

          {/* Detailed Narrative Section */}
          <div className="pt-6 space-y-6">
            {/* Karakter Bawaan */}
            <div className="bg-[#081026]/70 rounded-2xl p-5 border border-blue-900/50">
              <h3 className="font-serif text-lg font-bold text-amber-200 flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-amber-400" />
                Watak & Sifat Lahiriah ({currentWeton.lakuning})
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                {currentWeton.lakuningDesc} {currentWeton.sifatKarakter.ringkasan}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3">
                  <span className="text-emerald-300 font-semibold block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Kelebihan & Sifat Unggul:
                  </span>
                  <ul className="space-y-1 text-blue-100">
                    {currentWeton.sifatKarakter.positif.map((pos, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {pos}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-3">
                  <span className="text-rose-300 font-semibold block mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Hal yang Perlu Diwaspadai:
                  </span>
                  <ul className="space-y-1 text-blue-100">
                    {currentWeton.sifatKarakter.kelemahan.map((kel, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        {kel}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Garis Karier, Rezeki, & Arah Kejayaan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#081026]/80 border border-blue-900/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Briefcase className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-white text-sm">Bidang Karier Ideal</h4>
                </div>
                <p className="text-xs text-blue-200/80 mb-3">
                  Profesi yang selaras dengan getaran elemen weton Anda:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentWeton.karirRezeki.bidangCocok.map((bidang, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/60 text-amber-300 text-xs border border-blue-500/30"
                    >
                      {bidang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#081026]/80 border border-blue-900/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Compass className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-white text-sm">Arah Kejayaan Rezeki</h4>
                </div>
                <div className="text-2xl font-bold font-serif text-amber-300 mb-1">
                  {currentWeton.karirRezeki.arahKejayaan}
                </div>
                <p className="text-xs text-blue-200/80 leading-relaxed">
                  Arah mata angin yang disarankan saat memulai perjalanan niaga atau mendirikan tempat usaha.
                </p>
              </div>

              <div className="bg-[#081026]/80 border border-blue-900/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Flame className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-white text-sm">Warna Aura & Elemen</h4>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: currentWeton.warnaAura.hex }}
                  ></span>
                  <span className="text-xs font-semibold text-white">
                    {currentWeton.warnaAura.nama}
                  </span>
                </div>
                <p className="text-xs text-blue-200/80">
                  Elemen Semesta: <strong className="text-amber-300">{currentWeton.elemenJawa}</strong>
                </p>
                <p className="text-[11px] text-blue-300/80 mt-1">
                  Hari Naas Waspada: <strong className="text-rose-400">{currentWeton.hariNaas}</strong>
                </p>
              </div>
            </div>

            {/* Jodoh Ideal Neptu */}
            <div className="bg-[#081026]/80 border border-blue-900/50 rounded-2xl p-5">
              <h4 className="font-serif font-bold text-amber-300 text-sm flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Pasangan Neptu Paling Selaras (Hasil Ratu, Jodoh, Tinari, Pesthi)
              </h4>
              <p className="text-xs text-blue-200/80 mb-3">
                Weton Anda ({currentWeton.neptuTotal}) paling harmonis bersanding dengan seseorang yang memiliki total neptu:
              </p>
              <div className="flex flex-wrap gap-2">
                {currentWeton.jodohIdealNeptu.map((n) => (
                  <span
                    key={n}
                    className="px-3 py-1.5 rounded-xl bg-blue-950 text-amber-300 text-xs font-bold border border-blue-500/40"
                  >
                    Neptu {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons: AI Deep Analysis & Share Card */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleRunAiAnalysis}
                disabled={isLoadingAi}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-900/30 transition-all active:scale-98 disabled:opacity-50"
              >
                {isLoadingAi ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-stone-950" />
                    <span>Membuka Wejangan Batin Minton...</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-5 h-5 text-stone-950" />
                    <span>Bedah Karakter bersama Minton</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onOpenCardModal(currentWeton)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#081026] hover:bg-blue-950 text-amber-300 border border-amber-500/40 text-sm font-semibold transition-all"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Unduh Kartu Weton</span>
              </button>

              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#081026] hover:bg-blue-950 text-blue-200 border border-blue-900/60 text-sm transition-all"
                title="Salin Ringkasan"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-blue-300" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Deep Analysis Response Box */}
            {aiAnalysisResult && (
              <div className="mt-6 bg-[#081026] border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative animate-in fade-in duration-500">
                <div className="flex items-center justify-between pb-3 border-b border-blue-900/60 mb-4">
                  <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-base">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Wejangan Batin & Bedah Karakter bersama Minton</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Wetonan Jawi
                  </span>
                </div>

                <div className="text-blue-100 text-sm leading-relaxed whitespace-pre-line space-y-4 font-sans">
                  {aiAnalysisResult}
                </div>

                <div className="mt-5 pt-4 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-blue-300/80 italic">
                    "Sangkan Paraning Dumadi — Memayu Hayuning Bawana"
                  </span>
                  <button
                    onClick={() =>
                      onConsultKiAgeng(
                        currentWeton,
                        `Halo Minton, saya memiliki weton ${currentWeton.dina} ${currentWeton.pasaran} (Neptu ${currentWeton.neptuTotal}). Bagaimana panduan Minton untuk memaksimalkan potensi rezeki dan ketenangan batin saya?`
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-200 font-semibold cursor-pointer"
                  >
                    Lanjutkan Tanya Minton →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
