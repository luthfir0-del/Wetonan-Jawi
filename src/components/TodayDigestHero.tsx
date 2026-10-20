import React, { useState } from 'react';
import { getInfoHariIni, InfoHarianWeton, WetonResult } from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import { KalenderJawa } from './KalenderJawa';
import {
  Sparkles,
  Shirt,
  UtensilsCrossed,
  CheckCircle2,
  AlertOctagon,
  Compass,
  Calendar,
  Share2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface TodayDigestHeroProps {
  selectedDate?: string;
  onSelectDate: (dateStr: string) => void;
  onGoToCalculator: () => void;
  onConsultKiAgeng: (question: string) => void;
  onOpenCardModal?: (weton: WetonResult) => void;
}

export const TodayDigestHero: React.FC<TodayDigestHeroProps> = ({
  selectedDate,
  onSelectDate,
  onGoToCalculator,
  onConsultKiAgeng,
  onOpenCardModal,
}) => {
  const getTodayStr = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  const safeDate = selectedDate || getTodayStr();
  const [copied, setCopied] = useState<boolean>(false);

  const digest: InfoHarianWeton = React.useMemo(() => {
    return getInfoHariIni(safeDate);
  }, [safeDate]);

  const isToday = safeDate === getTodayStr();

  const handleShiftDate = (days: number) => {
    const [y, m, d] = safeDate.split('-').map(Number);
    const dateObj = new Date(Date.UTC(y, m - 1, d));
    dateObj.setUTCDate(dateObj.getUTCDate() + days);
    const newStr = `${dateObj.getUTCFullYear()}-${String(dateObj.getUTCMonth() + 1).padStart(2, '0')}-${String(dateObj.getUTCDate()).padStart(2, '0')}`;
    onSelectDate(newStr);
  };

  const handleScrollToKalender = () => {
    const el = document.getElementById('kalender-jawa-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyDigest = () => {
    const text = `🌟 INFO WETON HARI INI 🌟
Tanggal: ${digest.formattedDate}
Weton: ${digest.weton} (Neptu ${digest.neptuTotal})
Wuku: ${digest.wuku} • ${digest.lakuning}
Elemen: ${digest.elemen} • Arah Rezeki: ${digest.arahRezeki}

👔 OUTFIT & WARNA KEBERUNTUNGAN:
- Warna: ${digest.outfit.warnaUtama} (Aksen: ${digest.outfit.warnaAksen})
- Gaya: ${digest.outfit.rekomendasiGaya}
- Aksesori: ${digest.outfit.aksesori}

🍲 MAKANAN & MINUMAN PENYEIMBANG:
- Makanan: ${digest.makanan.namaMakanan}
- Minuman: ${digest.makanan.namaMinuman}
- Khasiat: ${digest.makanan.khasiatElemen}

✨ BAIK UNTUK:
${digest.baikUntuk.map((b) => `✓ ${b}`).join('\n')}

⚠️ PANTANGAN UMUM HARI INI:
${digest.jelekUntuk.map((j) => `✗ ${j}`).join('\n')}

💡 Falsafah: "${digest.quoteHarian}"
Sumber: https://wetonanjawi.ai.id (@wetonanjawi)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* SECTION 1: Top Banner & Date Selector */}
      <div className="space-y-8">
        <div className="relative text-center max-w-4xl mx-auto pt-2 pb-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs sm:text-sm font-medium mb-4 shadow-xl shadow-blue-950/40 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Panduan Harian Astrologi & Kearifan Hidup Primbon Jawa</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Info Weton: <span className="gold-gradient-text">{digest.weton}</span>
          </h1>

          <p className="mt-3 text-blue-200/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {digest.formattedDate} • Pasaran <strong className="text-white">{digest.pasaran}</strong> ({digest.pasaranAksara}) • Total Neptu <strong className="text-amber-300">{digest.neptuTotal}</strong> • Wuku {digest.wuku}
          </p>

          {/* Date Navigator Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleShiftDate(-1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0c1838] hover:bg-blue-900/60 text-blue-200 border border-blue-500/30 text-xs transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Kemarin</span>
            </button>

            <button
              onClick={() => onSelectDate(getTodayStr())}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                isToday
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md shadow-amber-950/30 font-bold'
                  : 'bg-[#0c1838] border-blue-500/30 text-blue-200 hover:text-white'
              }`}
            >
              Hari Ini
            </button>

            <button
              onClick={() => handleShiftDate(1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0c1838] hover:bg-blue-900/60 text-blue-200 border border-blue-500/30 text-xs transition-all cursor-pointer"
            >
              <span>Besok</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="relative inline-flex items-center">
              <input
                type="date"
                value={safeDate}
                onChange={(e) => e.target.value && onSelectDate(e.target.value)}
                className="bg-[#0c1838] border border-blue-500/30 text-blue-200 hover:border-amber-400 focus:border-amber-400 text-xs rounded-xl px-3 py-1.5 outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={handleScrollToKalender}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900/50 hover:bg-blue-800/70 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Gulir ke Kalender Jawa & Pawukon"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Buka Kalender Jawa</span>
            </button>
          </div>

          <KeratonOrnament className="mt-4" />
        </div>

        {/* 4-Quadrant Cards (Biru Dongker Luxury) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Rekomendasi Outfit & Warna Keberuntungan */}
          <div className="bg-[#0c1838]/90 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-amber-400/60 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-amber-300">
                    <Shirt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg">
                      Outfit & Warna Keberuntungan
                    </h3>
                    <p className="text-[11px] text-blue-300/80">
                      Penyelaras aura energi elemen {digest.elemen}
                    </p>
                  </div>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="grid grid-cols-2 gap-3 bg-[#081026] p-4 rounded-2xl border border-blue-900/50">
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-xl border border-white/30 shadow-md shrink-0"
                    style={{ backgroundColor: digest.outfit.hexUtama }}
                  ></span>
                  <div>
                    <span className="block text-[10px] text-blue-300 uppercase tracking-wider font-semibold">
                      Warna Utama
                    </span>
                    <strong className="text-white text-xs sm:text-sm block">
                      {digest.outfit.warnaUtama}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-blue-900/60 pl-3">
                  <span
                    className="w-8 h-8 rounded-xl border border-white/30 shadow-md shrink-0"
                    style={{ backgroundColor: digest.outfit.hexAksen }}
                  ></span>
                  <div>
                    <span className="block text-[10px] text-blue-300 uppercase tracking-wider font-semibold">
                      Warna Aksen
                    </span>
                    <strong className="text-amber-300 text-xs sm:text-sm block">
                      {digest.outfit.warnaAksen}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Gaya Busana & Aksesori */}
              <div className="space-y-2 text-xs text-blue-100/90">
                <div>
                  <span className="font-semibold text-amber-300 block mb-0.5">
                    Rekomendasi Gaya Busana:
                  </span>
                  <p className="leading-relaxed bg-[#081026]/70 p-3 rounded-xl border border-blue-900/40">
                    {digest.outfit.rekomendasiGaya}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-amber-300 block mb-0.5">
                    Aksesori Penunjang:
                  </span>
                  <p className="leading-relaxed bg-[#081026]/70 p-3 rounded-xl border border-blue-900/40">
                    {digest.outfit.aksesori}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 pt-3 border-t border-blue-900/60 text-[11px] text-blue-300/70 italic">
              💡 {digest.outfit.filosofiBusana}
            </p>
          </div>

          {/* 2. Rekomendasi Makanan & Minuman */}
          <div className="bg-[#0c1838]/90 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-amber-400/60 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg">
                      Makanan & Minuman Hari Ini
                    </h3>
                    <p className="text-[11px] text-blue-300/80">
                      Keseimbangan rasa penguat stamina & batin
                    </p>
                  </div>
                </div>
              </div>

              {/* Food Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#081026] p-4 rounded-2xl border border-blue-900/50">
                  <span className="block text-[10px] text-amber-400 uppercase tracking-wider font-bold mb-1">
                    Kuliner Tradisional
                  </span>
                  <strong className="text-white text-sm block mb-1">
                    {digest.makanan.namaMakanan}
                  </strong>
                  <span className="text-[11px] text-blue-300/80 block">
                    Karakter: {digest.makanan.karakterRasa}
                  </span>
                </div>

                <div className="bg-[#081026] p-4 rounded-2xl border border-blue-900/50">
                  <span className="block text-[10px] text-amber-400 uppercase tracking-wider font-bold mb-1">
                    Minuman Herbal / Wedang
                  </span>
                  <strong className="text-white text-sm block mb-1">
                    {digest.makanan.namaMinuman}
                  </strong>
                  <span className="text-[11px] text-blue-300/80 block">
                    Penyegar energi batin
                  </span>
                </div>
              </div>

              {/* Khasiat Elemen */}
              <div className="bg-[#081026]/70 p-3.5 rounded-xl border border-blue-900/40 text-xs">
                <span className="font-semibold text-emerald-400 block mb-1">
                  Khasiat Bagi Tubuh & Batin:
                </span>
                <p className="text-blue-100/90 leading-relaxed">
                  {digest.makanan.khasiatElemen}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-900/60 flex items-center justify-between text-[11px] text-blue-300">
              <span>Arah Pintu Rezeki: <strong className="text-amber-300">{digest.arahRezeki}</strong></span>
              <span>Watak: <strong className="text-white">{digest.lakuning}</strong></span>
            </div>
          </div>

          {/* 3. Baik Untuk Apa */}
          <div className="bg-[#0c1838]/90 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-emerald-400/60 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg">
                      Sangat Baik Dilakukan Hari Ini
                    </h3>
                    <p className="text-[11px] text-emerald-300/80">
                      Didukung energi kosmis {digest.pancasuda}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-blue-100">
                {digest.baikUntuk.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 bg-[#081026]/80 p-3 rounded-xl border border-emerald-500/20"
                  >
                    <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 pt-3 border-t border-blue-900/60 text-[11px] text-emerald-300/80">
              Pancasuda: <strong>{digest.pancasuda}</strong> — {digest.pancasudaDesc}
            </p>
          </div>

          {/* 4. Jelek / Pantangan Hari Ini (Bidang Umum) */}
          <div className="bg-[#0c1838]/90 border-2 border-rose-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-rose-400/60 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg">
                      Pantangan Umum / Sebaiknya Dihindari
                    </h3>
                    <p className="text-[11px] text-rose-300/80">
                      Kehati-hatian lahiriah & kewaspadaan batin
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-blue-100">
                {digest.jelekUntuk.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 bg-[#081026]/80 p-3 rounded-xl border border-rose-500/20"
                  >
                    <span className="w-5 h-5 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      ✗
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 pt-3 border-t border-blue-900/60 text-[11px] text-rose-300/80">
              Arah Pantangan Melangkah: <strong className="text-white">{digest.arahPantangan}</strong> (Naga Dina)
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-gradient-to-r from-[#0c1838] via-[#0f214e] to-[#0c1838] border-2 border-blue-500/40 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
              Mutiara Kearifan Jawa
            </span>
            <p className="font-serif italic text-white text-sm sm:text-base">
              "{digest.quoteHarian}"
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyDigest}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#081026] hover:bg-blue-950 text-blue-200 border border-blue-500/40 text-xs font-semibold transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Tersalin ke WhatsApp!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>Bagikan Info Hari Ini</span>
                </>
              )}
            </button>

            <button
              onClick={() =>
                onConsultKiAgeng(
                  `Halo Minton, weton hari ini adalah ${digest.weton} (Neptu ${digest.neptuTotal}, Lakuning ${digest.lakuning}). Bagaimana saran dan panduan agar aktivitas saya hari ini lancar dan penuh berkah?`
                )
              }
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-blue-800/60 hover:bg-blue-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Tanya Minton</span>
            </button>

            <button
              onClick={onGoToCalculator}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Hitung Weton Lahir Saya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: KALENDER JAWA LENGKAP (Pasaran, Pawukon, Wuku & Tanggal Jawa) */}
      <div id="kalender-jawa-section" className="pt-6 border-t border-blue-900/40">
        <KalenderJawa
          selectedDate={safeDate}
          onSelectDate={onSelectDate}
          onOpenCardModal={onOpenCardModal}
          onConsultKiAgeng={(weton, q) => onConsultKiAgeng(q || '')}
        />
      </div>
    </div>
  );
};
