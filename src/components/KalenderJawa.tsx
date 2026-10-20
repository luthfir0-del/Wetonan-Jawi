import React, { useState, useMemo, useEffect } from 'react';
import {
  getKalenderJawaBulan,
  KalenderJawaCell,
  WetonResult,
  calculateWeton
} from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass,
  ArrowRight,
  Share2,
  MessageSquareQuote,
  Flame,
  Shirt,
  AlertOctagon,
  BookOpen,
  CalendarDays,
  Shield,
  Layers
} from 'lucide-react';

interface KalenderJawaProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
  onOpenCardModal?: (weton: WetonResult) => void;
  onConsultKiAgeng?: (weton: WetonResult, question?: string) => void;
  onViewDigestForDate?: (dateStr: string) => void;
}

export const KalenderJawa: React.FC<KalenderJawaProps> = ({
  selectedDate,
  onSelectDate,
  onOpenCardModal,
  onConsultKiAgeng,
  onViewDigestForDate,
}) => {
  // Parse initial year & month from selectedDate or fallback to today
  const [viewYear, setViewYear] = useState<number>(() => {
    const [y] = (selectedDate || '').split('-').map(Number);
    return y || new Date().getFullYear();
  });

  const [viewMonth, setViewMonth] = useState<number>(() => {
    const [, m] = (selectedDate || '').split('-').map(Number);
    return m || new Date().getMonth() + 1;
  });

  // Sync viewMonth and viewYear whenever selectedDate changes externally
  useEffect(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split('-').map(Number);
      if (y && m) {
        setViewYear(y);
        setViewMonth(m);
      }
    }
  }, [selectedDate]);

  // Today string formatted YYYY-MM-DD
  const todayStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);

  const safeSelectedDate = selectedDate || todayStr;

  // Compute month calendar data
  const calendarData = useMemo(() => {
    return getKalenderJawaBulan(viewYear, viewMonth, safeSelectedDate);
  }, [viewYear, viewMonth, safeSelectedDate]);

  // Selected date weton detail
  const selectedWeton: WetonResult = useMemo(() => {
    return calculateWeton(safeSelectedDate);
  }, [safeSelectedDate]);

  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleJumpToToday = () => {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth() + 1);
    onSelectDate(todayStr);
  };

  // Day of week labels (Sunday - Saturday)
  const weekdays = [
    { masehi: 'Minggu', jawa: 'Radite' },
    { masehi: 'Senin', jawa: 'Soma' },
    { masehi: 'Selasa', jawa: 'Hanggara' },
    { masehi: 'Rabu', jawa: 'Buda' },
    { masehi: 'Kamis', jawa: 'Respati' },
    { masehi: 'Jumat', jawa: 'Sukra' },
    { masehi: 'Sabtu', jawa: 'Tumpak' },
  ];

  // Group cells into 7-day weeks to display Wuku on each row
  const weekRows = useMemo(() => {
    const rows: KalenderJawaCell[][] = [];
    for (let i = 0; i < calendarData.cells.length; i += 7) {
      rows.push(calendarData.cells.slice(i, i + 7));
    }
    return rows;
  }, [calendarData.cells]);

  // Pasaran colors
  const pasaranBadgeColor: Record<string, { text: string; bg: string; border: string }> = {
    Legi: { text: 'text-amber-200', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
    Pahing: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
    Pon: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
    Wage: { text: 'text-blue-300', bg: 'bg-blue-500/10', border: 'border-blue-400/30' },
    Kliwon: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-400/30' },
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pt-2 pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs sm:text-sm font-medium mb-3 shadow-xl shadow-blue-950/40 backdrop-blur-md">
          <CalendarDays className="w-4 h-4 text-amber-400" />
          <span>Almanak Sultan Agungan • Integrasi Pasaran & Pawukon Jawa</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Kalender Jawa, <span className="gold-gradient-text">Pasaran & Pawukon</span>
        </h2>
        <p className="mt-2 text-blue-200/80 text-sm sm:text-base leading-relaxed">
          Peta penanggalan terpadu yang memadukan kalender Masehi, siklus 5 Pasaran (Pancawara), 7 Dina (Saptawara), dan 30 Pawukon (Wuku) dengan detail weton akurat.
        </p>
        <KeratonOrnament className="mt-4" />
      </div>

      {/* Main Grid & Inspector Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / TOP: Interactive Calendar Matrix (8 Cols on Desktop) */}
        <div className="lg:col-span-8 bg-[#0c1838]/95 border-2 border-blue-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-blue-900/60">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  {calendarData.namaBulanMasehi} {calendarData.tahunMasehi}
                </h3>
              </div>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                Bulan Jawa: <strong className="text-white">{calendarData.bulanJawa} {calendarData.tahunJawa} Jawa</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleJumpToToday}
                className="px-3 py-1.5 rounded-xl bg-[#081026] hover:bg-blue-950 text-blue-200 hover:text-amber-300 border border-blue-500/30 text-xs font-semibold transition-all cursor-pointer"
              >
                Hari Ini
              </button>
              <div className="flex items-center gap-1 bg-[#081026] p-1 rounded-xl border border-blue-900/60">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/50 transition-colors cursor-pointer"
                  title="Bulan Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-900/50 transition-colors cursor-pointer"
                  title="Bulan Berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Weekday Column Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs">
            {weekdays.map((w, idx) => (
              <div
                key={idx}
                className="py-2 px-1 rounded-xl bg-[#081026]/90 border border-blue-900/50 text-blue-200"
              >
                <span className="block font-bold text-white text-xs sm:text-sm">
                  {w.masehi.slice(0, 3)}
                </span>
                <span className="block text-[10px] text-amber-400/80 font-medium">
                  {w.jawa}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Rows with Integrated Wuku Indicator */}
          <div className="space-y-2">
            {weekRows.map((week, rowIdx) => {
              // The wuku for this 7-day row
              const rowWuku = week[0]?.wuku || 'Sinta';
              const isSelectedRow = week.some((c) => c.dateStr === safeSelectedDate);

              return (
                <div key={rowIdx} className="space-y-1">
                  {/* Subtle Wuku Header for this week */}
                  <div className="flex items-center justify-between px-1.5 text-[10px] text-blue-300/70">
                    <span className="flex items-center gap-1 font-serif font-semibold text-amber-400/90">
                      <Layers className="w-3 h-3 text-amber-400" />
                      Wuku {rowWuku}
                    </span>
                    {isSelectedRow && (
                      <span className="text-[9px] text-amber-300 font-medium animate-pulse">
                        • Minggu Tanggal Terpilih
                      </span>
                    )}
                  </div>

                  {/* 7 Day Cells */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {week.map((cell: KalenderJawaCell, colIdx: number) => {
                      const isSelected = cell.dateStr === safeSelectedDate;
                      const isToday = cell.isToday;
                      const isCurrent = cell.isCurrentMonth;
                      const pBadge = pasaranBadgeColor[cell.pasaran] || pasaranBadgeColor['Legi'];

                      return (
                        <div
                          key={colIdx}
                          onClick={() => onSelectDate(cell.dateStr)}
                          className={`min-h-[78px] sm:min-h-[92px] p-1.5 sm:p-2 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between group ${
                            isSelected
                              ? 'bg-gradient-to-b from-[#10275c] to-[#0a183d] border-amber-400 shadow-xl shadow-amber-500/20 scale-[1.03] z-10'
                              : isToday
                              ? 'bg-[#0e214d] border-blue-400/80 shadow-md hover:border-amber-400/60'
                              : isCurrent
                              ? 'bg-[#081026]/85 border-blue-900/40 hover:border-blue-500/60 hover:bg-[#0c1a3d]'
                              : 'bg-[#060c1c]/40 border-transparent opacity-35 hover:opacity-70'
                          }`}
                        >
                          {/* Top: Day Number & Today indicator */}
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-serif text-sm sm:text-base font-bold ${
                                isSelected
                                  ? 'text-amber-300 font-black'
                                  : isToday
                                  ? 'text-white'
                                  : isCurrent
                                  ? 'text-slate-100'
                                  : 'text-slate-500'
                              }`}
                            >
                              {cell.dayNumber}
                            </span>

                            {isToday && (
                              <span
                                className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"
                                title="Hari Ini"
                              />
                            )}
                          </div>

                          {/* Middle: Pasaran + Neptu */}
                          <div className="mt-1">
                            <div className="flex items-baseline justify-between gap-1">
                              <span className={`text-[10px] sm:text-xs font-bold leading-tight ${pBadge.text}`}>
                                {cell.pasaran}
                              </span>
                              <span className="text-[9px] text-blue-300/70 font-mono" title={`Neptu ${cell.neptuTotal}`}>
                                {cell.neptuTotal}
                              </span>
                            </div>

                            <span className="hidden sm:block text-[9px] text-blue-300/50 aksara-jawa truncate">
                              {cell.pasaranAksara}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend / Wuku strip in this month */}
          <div className="pt-4 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-200/80">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-amber-300 font-medium">Wuku Bulan Ini:</span>
              <div className="flex flex-wrap gap-1">
                {calendarData.wukuList.map((wuku, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[#081026] text-blue-300 text-[11px] border border-blue-900/50"
                  >
                    Wuku {wuku}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-md bg-amber-400/40 border border-amber-400"></span>
                <span>Terpilih</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-md bg-emerald-500/40 border border-emerald-400"></span>
                <span>Hari Ini</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Selected Date Astrological Inspector Card (4 Cols on Desktop) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#0c1838] via-[#0f204c] to-[#081026] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-5">
          {/* Watermark Gunungan */}
          <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
            <GununganIcon size={180} className="text-amber-400" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Rincian Pasaran & Pawukon Terpilih
              </span>
              {safeSelectedDate === todayStr && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Hari Ini
                </span>
              )}
            </div>

            <h3 className="font-serif text-3xl font-black text-white mt-1">
              {selectedWeton.dina} <span className="gold-gradient-text">{selectedWeton.pasaran}</span>
            </h3>

            <p className="text-xs text-blue-200/80 mt-1">
              {selectedWeton.formattedDate}
            </p>
            <p className="text-xs text-amber-300 font-serif mt-0.5">
              {calendarData.cells.find((c) => c.dateStr === safeSelectedDate)?.tanggalJawa || ''}
            </p>
          </div>

          {/* Prominent Wuku & Pasaran Card */}
          <div className="bg-[#081026]/90 p-4 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Pawukon (30 Wuku Jawa)
                </span>
                <h4 className="font-serif text-xl font-black text-white mt-0.5">
                  Wuku {selectedWeton.wuku}
                </h4>
              </div>
              <span className="px-2 py-1 rounded-lg bg-blue-900/40 text-blue-200 text-[10px] font-mono border border-blue-500/30">
                Siklus 210 Hari
              </span>
            </div>

            <div className="bg-[#0c1838] p-3 rounded-xl border border-blue-900/50 text-xs">
              <span className="text-amber-300/90 font-medium block text-[11px]">
                Dewa Pelindung:
              </span>
              <p className="text-slate-100 font-serif text-xs mt-0.5">
                {selectedWeton.wukuMakna}
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 bg-[#081026]/90 p-4 rounded-2xl border border-blue-900/60 text-xs">
            <div>
              <span className="text-blue-300/70 block text-[10px] uppercase font-semibold">
                Total Neptu
              </span>
              <span className="font-serif text-2xl font-black text-amber-300">
                {selectedWeton.neptuTotal}
              </span>
              <span className="text-[10px] text-blue-300 block">
                ({selectedWeton.dina} {selectedWeton.neptuDina} + {selectedWeton.pasaran} {selectedWeton.neptuPasaran})
              </span>
            </div>

            <div>
              <span className="text-blue-300/70 block text-[10px] uppercase font-semibold">
                Pancasuda (Rezeki)
              </span>
              <strong className="text-emerald-400 text-xs font-serif block mt-1">
                {selectedWeton.pancasuda}
              </strong>
              <span className="text-[10px] text-blue-200/70 block line-clamp-1">
                {selectedWeton.pancasudaDesc}
              </span>
            </div>

            <div className="border-t border-blue-900/50 pt-2 col-span-2">
              <span className="text-blue-300/70 block text-[10px] uppercase font-semibold">
                Watak (Lakuning)
              </span>
              <strong className="text-amber-200 text-xs font-serif block mt-0.5">
                {selectedWeton.lakuning}
              </strong>
              <span className="text-[10px] text-blue-200/70 block mt-0.5">
                {selectedWeton.lakuningDesc}
              </span>
            </div>
          </div>

          {/* Direction & Elements */}
          <div className="space-y-2 text-xs">
            <div className="bg-[#081026]/70 p-3 rounded-xl border border-blue-900/40 flex items-center justify-between">
              <span className="text-blue-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" /> Arah Kejayaan:
              </span>
              <strong className="text-white">{selectedWeton.karirRezeki.arahKejayaan}</strong>
            </div>

            <div className="bg-[#081026]/70 p-3 rounded-xl border border-blue-900/40 flex items-center justify-between">
              <span className="text-blue-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> Elemen Semesta:
              </span>
              <strong className="text-amber-300">{selectedWeton.elemenJawa}</strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            {onViewDigestForDate && (
              <button
                onClick={() => onViewDigestForDate(safeSelectedDate)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Lihat Panduan Outfit & Pantangan Hari Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              {onOpenCardModal && (
                <button
                  onClick={() => onOpenCardModal(selectedWeton)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#081026] hover:bg-blue-950 text-blue-200 border border-blue-500/40 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Unduh Kartu</span>
                </button>
              )}

              {onConsultKiAgeng && (
                <button
                  onClick={() =>
                    onConsultKiAgeng(
                      selectedWeton,
                      `Halo Minton, mohon panduan dan wejangan mengenai tanggal ${selectedWeton.dina} ${selectedWeton.pasaran} (Neptu ${selectedWeton.neptuTotal}, Wuku ${selectedWeton.wuku}). Apa potensi dan nasihat luhur untuk hari tersebut?`
                    )
                  }
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#081026] hover:bg-blue-950 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all cursor-pointer"
                >
                  <MessageSquareQuote className="w-3.5 h-3.5" />
                  <span>Tanya Minton</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
