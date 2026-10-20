import React, { useState, useMemo } from 'react';
import { cariHariBaik, HariBaikItem, WetonResult } from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import {
  Calendar as CalendarIcon,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  Compass,
  Copy,
  Check,
  BrainCircuit,
  Loader2,
  ChevronRight,
  Award,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface HariBaikCalculatorProps {
  currentWeton: WetonResult;
  onConsultKiAgeng: (question: string) => void;
}

export const HariBaikCalculator: React.FC<HariBaikCalculatorProps> = ({
  currentWeton,
  onConsultKiAgeng,
}) => {
  const [tglWeton, setTglWeton] = useState<string>(currentWeton.tanggalMasehi);
  const now = new Date();
  const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const [targetMonth, setTargetMonth] = useState<string>(defaultMonth);
  const [jenisHajatan, setJenisHajatan] = useState<'nikah' | 'usaha' | 'pindah' | 'umum'>('nikah');
  const [filterStatus, setFilterStatus] = useState<'all' | 'terbaik' | 'hindari'>('terbaik');
  const [selectedItem, setSelectedItem] = useState<HariBaikItem | null>(null);

  // AI Saran Hari Baik State
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiSaran, setAiSaran] = useState<string | null>(null);
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);

  const hariBaikList = useMemo(() => {
    return cariHariBaik(tglWeton, targetMonth, jenisHajatan);
  }, [tglWeton, targetMonth, jenisHajatan]);

  // Top 4 recommended days sorted by score descending
  const topRecommendations = useMemo(() => {
    return [...hariBaikList]
      .filter((h) => h.status === 'Sangat Baik' || h.status === 'Baik')
      .sort((a, b) => b.skor - a.skor)
      .slice(0, 4);
  }, [hariBaikList]);

  const filteredList = useMemo(() => {
    if (filterStatus === 'terbaik') {
      return hariBaikList.filter((h) => h.status === 'Sangat Baik' || h.status === 'Baik');
    }
    if (filterStatus === 'hindari') {
      return hariBaikList.filter((h) => h.status === 'Hindari');
    }
    return hariBaikList;
  }, [hariBaikList, filterStatus]);

  const stats = useMemo(() => {
    const sangatBaik = hariBaikList.filter((h) => h.status === 'Sangat Baik').length;
    const baik = hariBaikList.filter((h) => h.status === 'Baik').length;
    const hindari = hariBaikList.filter((h) => h.status === 'Hindari').length;
    return { sangatBaik, baik, hindari, total: hariBaikList.length };
  }, [hariBaikList]);

  const hajatanLabel = {
    nikah: 'Akad Nikah / Pernikahan',
    usaha: 'Membuka Usaha / Toko Baru',
    pindah: 'Boyongan / Pindah Rumah',
    umum: 'Hajatan Umum / Beli Barang Berharga',
  }[jenisHajatan];

  const handleMintaSaranAi = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/gemini/saran-hari-baik', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wetonPemohon: currentWeton,
          targetHajatan: hajatanLabel,
          bulanTahun: targetMonth,
          topDays: topRecommendations.map((d) => ({
            tanggal: d.tanggal,
            weton: d.weton,
            pancasuda: d.pancasuda,
            skor: d.skor,
            jamBaik: d.jamBaik.filter((j) => j.status === 'Sangat Baik').map((j) => j.jam),
          })),
        }),
      });
      const data = await res.json();
      setAiSaran(data.rekomendasi || 'Tetap utamakan niat tulus dan membaca doa keselamatan sebelum memulai hajatan.');
    } catch (err) {
      console.error(err);
      setAiSaran('Terjadi kendala saat memohon wejangan saran hari baik dari Ki Ageng AI.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleCopyRekomendasi = () => {
    const text = `🌟 SARAN HARI BAIK JAWA (${hajatanLabel.toUpperCase()}) 🌟
Pemohon: Weton ${currentWeton.dina} ${currentWeton.pasaran} (Neptu ${currentWeton.neptuTotal})
Bulan: ${targetMonth}

Top Rekomendasi Hari Rahayu:
${topRecommendations
  .map(
    (h, idx) =>
      `${idx + 1}. ${h.weton} (${h.formattedDate}) - Skor: ${h.skor}% [${h.pancasuda}]\n   Jam Baik: ${h.jamBaik
        .filter((j) => j.status === 'Sangat Baik')
        .map((j) => j.jam)
        .join(', ')}\n   Arah Rezeki: ${h.arahKeberuntungan}`
  )
  .join('\n\n')}

Dihitung di https://wetonanjawi.ai.id (Tema Biru Dongker @wetonanjawi)`;

    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium mb-4 shadow-lg shadow-blue-950/40">
          <CalendarIcon className="w-4 h-4 text-amber-400" />
          <span>Ngopek Dina • Petungan Hari & Jam Baik Hajatan Akbar</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Saran Hari Baik & <span className="gold-gradient-text">Saat Pitu Rahayu</span>
        </h2>
        <p className="mt-3 text-blue-200/80 text-sm sm:text-base leading-relaxed">
          Temukan hari yang bebas dari Dina Naas, Taliwangke, serta berenergi <span className="text-amber-300 font-semibold">Wasesa Segara</span> & <span className="text-amber-300 font-semibold">Satria Wibawa</span> lengkap dengan panduan jam baik (Saat Pitu) dan arah kejayaan rezeki.
        </p>
        <KeratonOrnament className="mt-4" />
      </div>

      {/* Control Panel (Biru Dongker Card) */}
      <div className="bg-[#0c1838]/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Jenis Hajatan */}
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              Jenis Hajatan / Acara
            </label>
            <select
              value={jenisHajatan}
              onChange={(e) => setJenisHajatan(e.target.value as any)}
              className="w-full bg-[#081026] border border-blue-500/30 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm outline-none cursor-pointer transition-all"
            >
              <option value="nikah">Akad Nikah / Pernikahan</option>
              <option value="usaha">Memulai Usaha / Buka Toko Baru</option>
              <option value="pindah">Boyongan / Pindah Rumah</option>
              <option value="umum">Hajatan Umum / Beli Barang Berharga</option>
            </select>
          </div>

          {/* Weton Pemohon */}
          <div>
            <label className="block text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">
              Tanggal Lahir Pemohon (Weton)
            </label>
            <input
              type="date"
              value={tglWeton}
              onChange={(e) => setTglWeton(e.target.value)}
              className="w-full bg-[#081026] border border-blue-500/30 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
            />
          </div>

          {/* Target Month */}
          <div>
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              Bulan & Tahun Rencana Acara
            </label>
            <input
              type="month"
              value={targetMonth}
              onChange={(e) => setTargetMonth(e.target.value)}
              className="w-full bg-[#081026] border border-blue-500/30 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
            />
          </div>
        </div>

        {/* Quick Month Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-blue-900/40 text-xs text-blue-300/80">
          <span className="font-medium text-amber-300/90">Pilih Cepat:</span>
          {[0, 1, 2, 3].map((offset) => {
            const d = new Date();
            d.setMonth(d.getMonth() + offset);
            const mStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const label = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
            return (
              <button
                key={offset}
                type="button"
                onClick={() => setTargetMonth(mStr)}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  targetMonth === mStr
                    ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold'
                    : 'bg-[#081026]/70 border-blue-900/60 text-blue-300 hover:border-blue-400'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Stats Summary & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-blue-900/40 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sangat Baik: <strong>{stats.sangatBaik} hari</strong>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-950/60 text-blue-200 border border-blue-500/40">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Baik: <strong>{stats.baik} hari</strong>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/50 text-rose-300 border border-rose-500/40">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              Pantangan (Naas): <strong>{stats.hindari} hari</strong>
            </span>
          </div>

          {/* Filter toggle */}
          <div className="flex items-center gap-1.5 bg-[#081026] p-1 rounded-xl border border-blue-900/60">
            <button
              onClick={() => setFilterStatus('terbaik')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === 'terbaik'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-blue-300 hover:text-white'
              }`}
            >
              Rekomendasi ({stats.sangatBaik + stats.baik})
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 font-bold'
                  : 'text-blue-300 hover:text-white'
              }`}
            >
              Semua ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('hindari')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === 'hindari'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                  : 'text-blue-300 hover:text-rose-300'
              }`}
            >
              Pantangan ({stats.hindari})
            </button>
          </div>
        </div>
      </div>

      {/* TOP RECOMMENDATIONS SPOTLIGHT (Biru Dongker Luxury Cards) */}
      {topRecommendations.length > 0 && (
        <div className="bg-gradient-to-br from-[#0c1838] via-[#0f1f4b] to-[#081026] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-blue-900/60 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                <Award className="w-4 h-4 text-amber-400" />
                Daftar Hari Paling Sakral & Berkah
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                Saran Hari Baik Pilihan untuk <span className="gold-gradient-text">{hajatanLabel}</span>
              </h3>
              <p className="text-xs text-blue-200/80 mt-1">
                Diurutkan berdasarkan kemurnian energi Pancasuda dan keharmonisan terhadap weton pemohon.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyRekomendasi}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#081026] hover:bg-blue-950 text-amber-300 border border-blue-500/30 text-xs font-semibold transition-all"
              >
                {copiedSchedule ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Jadwal Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Salin Jadwal</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Cards of Top Picks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRecommendations.map((hari, idx) => {
              const bestHours = hari.jamBaik.filter((j) => j.status === 'Sangat Baik');
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedItem(hari)}
                  className="bg-[#081026]/90 border border-amber-500/30 hover:border-amber-400 rounded-2xl p-4 shadow-xl transition-all hover:scale-[1.02] cursor-pointer relative group flex flex-col justify-between"
                >
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{hari.skor}%</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-blue-300 block mb-0.5">
                      {hari.formattedDate.split(',')[0]}, {hari.tanggal.split('-')[2]} {new Date(hari.tanggal).toLocaleDateString('id-ID', { month: 'short' })}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {hari.weton}
                    </h4>
                    <span className="inline-block text-[10px] font-semibold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded mt-1 border border-emerald-500/30">
                      {hari.pancasuda}
                    </span>

                    <div className="mt-3 space-y-1 text-[11px] text-blue-200/80">
                      <div>Neptu Total: <strong className="text-amber-300">{hari.neptu}</strong></div>
                      <div>Wuku: <strong>{hari.wuku}</strong></div>
                      <div className="text-emerald-400 font-medium">
                        Saat Baik: {bestHours[0]?.jam || '08:30 - 11:00'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-blue-900/60 flex items-center justify-between text-[11px] text-amber-300">
                    <span>Lihat Rincian Jam Baik</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Recommendation Callout CTA */}
          <div className="mt-6 pt-5 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">
                  Ingin Kepastian Tanggal & Jam Paling Barokah bersama Minton?
                </h4>
                <p className="text-xs text-blue-200/70">
                  Dapatkan wejangan khusus, jam pelaksanaan akad/buka usaha, dan panduan keselamatan.
                </p>
              </div>
            </div>

            <button
              onClick={handleMintaSaranAi}
              disabled={isLoadingAi}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isLoadingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyiapkan Panduan Hari Baik bersama Minton...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Tanya Saran Hari Baik ke Minton</span>
                </>
              )}
            </button>
          </div>

          {/* AI Output Response Box */}
          {aiSaran && (
            <div className="mt-6 bg-[#081026] border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl relative animate-in fade-in duration-500 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-blue-900/60">
                <span className="font-serif font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Panduan Saran Hari Baik bersama Minton
                </span>
                <span className="text-[10px] text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                  Wetonan Jawi
                </span>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed whitespace-pre-line font-sans">
                {aiSaran}
              </p>
              <div className="pt-2 text-right">
                <button
                  onClick={() =>
                    onConsultKiAgeng(
                      `Halo Minton, mohon arahan lebih rinci mengenai saran hari baik untuk ${hajatanLabel} pada bulan ${targetMonth}. Apa saja perlengkapan dan amalan terbaiknya?`
                    )
                  }
                  className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
                >
                  Tanya Minton Lebih Mendalam →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid of All Days in the Month */}
      <div className="space-y-3">
        <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-400" />
          Kalender Lengkap Bulan {new Date(`${targetMonth}-01`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((hari, idx) => {
            const isSangatBaik = hari.status === 'Sangat Baik';
            const isBaik = hari.status === 'Baik';
            const isHindari = hari.status === 'Hindari';

            const borderClass = isSangatBaik
              ? 'border-emerald-500/50 bg-gradient-to-br from-[#0c1838] to-[#062c26]/60 shadow-emerald-950/20'
              : isBaik
              ? 'border-blue-500/40 bg-gradient-to-br from-[#0c1838] to-[#0f1f4b] shadow-blue-950/20'
              : isHindari
              ? 'border-rose-500/30 bg-[#081026]/80 opacity-80'
              : 'border-blue-900/40 bg-[#081026]/60';

            const badgeColor = isSangatBaik
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : isBaik
              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
              : isHindari
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : 'bg-stone-800 text-stone-300 border-stone-700';

            return (
              <div
                key={idx}
                onClick={() => setSelectedItem(hari)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-[1.02] shadow-lg relative overflow-hidden group ${borderClass}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] text-blue-300/80 block">
                      {hari.formattedDate.split(',')[0]}, {hari.tanggal.split('-')[2]}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {hari.weton}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeColor}`}>
                    {hari.status}
                  </span>
                </div>

                <div className="text-xs text-blue-200/80 mb-2 flex items-center justify-between">
                  <span>Neptu: <strong className="text-amber-300">{hari.neptu}</strong> ({hari.wuku})</span>
                  <span className="text-amber-400/90 font-semibold">{hari.pancasuda}</span>
                </div>

                <p className="text-xs text-blue-100/90 line-clamp-2 leading-relaxed">
                  {hari.alasan}
                </p>

                <div className="mt-3 pt-2.5 border-t border-blue-900/50 flex items-center justify-between text-[11px] text-amber-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Cek Jam Baik & Pantangan</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Inspector Modal (Deep Saat Pitu & Naga Dina) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0c1838] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 text-blue-300 hover:text-white p-2 rounded-full hover:bg-blue-900/40 transition-colors"
            >
              ✕
            </button>

            <div className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-1">
              Rincian Primbon & Jam Baik (Saat Pitu)
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              {selectedItem.weton}
            </h3>
            <p className="text-xs text-blue-300 mb-3">{selectedItem.formattedDate}</p>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30">
                Neptu: {selectedItem.neptu}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Pancasuda: {selectedItem.pancasuda}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Status: {selectedItem.status} ({selectedItem.skor}%)
              </span>
            </div>

            <div className="space-y-4 text-sm text-blue-100">
              {/* Alasan */}
              <div className="bg-[#081026] p-4 rounded-xl border border-blue-900/60">
                <span className="block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
                  Filosofi & Alasan Primbon:
                </span>
                <p className="leading-relaxed text-xs">{selectedItem.alasan}</p>
              </div>

              {/* Naga Dina (Arah Keberuntungan) */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#081026] p-3 rounded-xl border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold block mb-1 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Arah Kejayaan Rezeki:
                  </span>
                  <span className="text-white font-medium">{selectedItem.arahKeberuntungan}</span>
                </div>
                <div className="bg-[#081026] p-3 rounded-xl border border-rose-500/30">
                  <span className="text-rose-400 font-bold block mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Arah Pantangan:
                  </span>
                  <span className="text-white font-medium">{selectedItem.arahPantangan}</span>
                </div>
              </div>

              {/* Saat Pitu (Jam Baik Pelaksanaan) */}
              <div>
                <span className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Jadwal Jam Baik (Saat Pitu):
                </span>
                <div className="space-y-1.5">
                  {selectedItem.jamBaik.map((jam, i) => {
                    const isSuper = jam.status === 'Sangat Baik';
                    const isWaspada = jam.status === 'Waspada';
                    return (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                          isSuper
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                            : isWaspada
                            ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                            : 'bg-[#081026] border-blue-900/50 text-blue-200'
                        }`}
                      >
                        <div>
                          <strong className="text-amber-300 mr-2">{jam.jam}</strong>
                          <span className="text-[11px]">{jam.makna}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isSuper
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : isWaspada
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {jam.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onConsultKiAgeng(
                      `Halo Minton, saya berencana mengadakan ${hajatanLabel} pada hari ${selectedItem.weton} (${selectedItem.formattedDate}). Mohon panduan jam terbaik dan doa penyelarasan adiluhung.`
                    );
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs text-center transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Tanya Minton tentang Tanggal Ini →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
