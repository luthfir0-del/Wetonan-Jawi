import React from 'react';
import { getInfoHariIni, InfoHarianWeton, WetonResult } from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import {
  X,
  Sparkles,
  Shirt,
  AlertOctagon,
  UtensilsCrossed,
  CheckCircle2,
  Calendar,
  MessageSquareQuote,
  ArrowRight,
  Compass,
  CalendarDays
} from 'lucide-react';

interface TodayPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToKalender: () => void;
  onConsultKiAgeng: (question: string) => void;
  selectedDate?: string;
}

export const TodayPopupModal: React.FC<TodayPopupModalProps> = ({
  isOpen,
  onClose,
  onGoToKalender,
  onConsultKiAgeng,
  selectedDate,
}) => {
  if (!isOpen) return null;

  const now = new Date();
  const todayStr =
    selectedDate ||
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const digest: InfoHarianWeton = getInfoHariIni(todayStr);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0c1838] via-[#09142e] to-[#060c1c] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-200 hover:text-white border border-blue-500/30 transition-all cursor-pointer"
          title="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-amber-500/40 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sugeng Rawuh • Info Weton Hari Ini</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
            Weton Dina Iki: <span className="gold-gradient-text">{digest.weton}</span>
          </h2>

          <p className="text-xs sm:text-sm text-blue-200/80">
            {digest.formattedDate} • Pasaran <strong className="text-white">{digest.pasaran}</strong> ({digest.pasaranAksara}) • Total Neptu <strong className="text-amber-300">{digest.neptuTotal}</strong> • Wuku {digest.wuku}
          </p>

          <KeratonOrnament className="mt-2 scale-75" />
        </div>

        {/* Focus 1: Outfit & Warna Harian (As requested by user) */}
        <div className="bg-[#081026]/90 border border-blue-500/40 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-blue-900/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-amber-300">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-sm">
                  Outfit & Warna Keberuntungan Hari Ini
                </h3>
                <span className="text-[10px] text-blue-300">
                  Energi Elemen {digest.elemen}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-4 h-4 rounded-full border border-amber-300 shadow-sm"
                style={{ backgroundColor: digest.outfit.hexUtama }}
                title={digest.outfit.warnaUtama}
              />
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-sm"
                style={{ backgroundColor: digest.outfit.hexAksen }}
                title={digest.outfit.warnaAksen}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#0c1838] p-3 rounded-xl border border-blue-900/50">
              <span className="text-[10px] text-blue-300 font-semibold block uppercase">
                Warna Dominan & Aksen
              </span>
              <strong className="text-amber-300 font-serif text-sm block mt-0.5">
                {digest.outfit.warnaUtama}
              </strong>
              <span className="text-[11px] text-blue-200/80">
                Aksen: {digest.outfit.warnaAksen}
              </span>
            </div>

            <div className="bg-[#0c1838] p-3 rounded-xl border border-blue-900/50">
              <span className="text-[10px] text-blue-300 font-semibold block uppercase">
                Gaya Busana Disarankan
              </span>
              <p className="text-[11px] text-white mt-0.5 line-clamp-2">
                {digest.outfit.rekomendasiGaya}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-blue-200/70 italic bg-blue-950/40 p-2 rounded-lg border border-blue-900/30">
            "{digest.outfit.filosofiBusana}"
          </p>
        </div>

        {/* Focus 2: Pantangan Aktivitas & Arah (As requested by user) */}
        <div className="bg-[#081026]/90 border border-rose-500/30 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-rose-900/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-rose-200 text-sm">
                  Pantangan Aktivitas Umum Hari Ini
                </h3>
                <span className="text-[10px] text-rose-300/80">
                  Hindari hal berikut agar terhindar dari sengkolo
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Waspada
            </span>
          </div>

          <ul className="space-y-2 text-xs">
            {digest.jelekUntuk.slice(0, 3).map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 bg-[#0c1838]/80 p-2.5 rounded-xl border border-rose-500/20 text-rose-100"
              >
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                <span className="text-[11px] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between text-[11px] text-blue-200/80 pt-1 border-t border-blue-900/40">
            <span>
              Arah Pantangan (Naga Dina): <strong className="text-rose-300">{digest.arahPantangan}</strong>
            </span>
            <span>
              Arah Rezeki: <strong className="text-emerald-400">{digest.arahRezeki}</strong>
            </span>
          </div>
        </div>

        {/* Secondary: Makanan & Hal Baik Ringkas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-[#081026]/70 p-3 rounded-xl border border-blue-900/50 flex items-start gap-2.5">
            <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-300 block">
                Saran Makanan Penyeimbang
              </span>
              <span className="text-[11px] text-white font-medium block">
                {digest.makanan.namaMakanan.split(',')[0]}
              </span>
              <span className="text-[10px] text-amber-300/80">
                Minum: {digest.makanan.namaMinuman.split(',')[0]}
              </span>
            </div>
          </div>

          <div className="bg-[#081026]/70 p-3 rounded-xl border border-blue-900/50 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-300 block">
                Baik Untuk Dilakukan
              </span>
              <span className="text-[11px] text-white font-medium block line-clamp-1">
                {digest.baikUntuk[0]}
              </span>
              <span className="text-[10px] text-emerald-300/80">
                {digest.baikUntuk[1] || 'Perbanyak rasa syukur & sedekah'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-blue-900/60">
          <button
            onClick={() => {
              onClose();
              onGoToKalender();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-800/40 hover:bg-blue-800/60 text-blue-200 border border-blue-500/40 text-xs font-semibold transition-all cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-amber-400" />
            <span>Buka Kalender Jawa & Pawukon</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onConsultKiAgeng(
                  `Halo Minton, weton hari ini adalah ${digest.weton}. Mohon panduan dan saran terbaik untuk kelancaran rezeki dan aktivitas saya hari ini.`
                );
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/40 text-xs font-semibold transition-all cursor-pointer"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-purple-300" />
              <span>Tanya Minton</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Jelajahi Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
