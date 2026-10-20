import React, { useState, useMemo } from 'react';
import {
  PRIMBON_MIMPI_DATABASE,
  ArtiMimpiItem,
  KategoriMimpi,
  JenisFirasat,
  cekWaktuMimpi,
  WaktuMimpiResult,
} from '../lib/primbonMimpi';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import {
  MoonStar,
  Search,
  Clock,
  Sparkles,
  HelpCircle,
  ShieldAlert,
  Award,
  HeartHandshake,
  MessageSquareQuote,
  X,
  ChevronRight,
  BookOpen,
  Filter,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface PrimbonMimpiProps {
  onConsultKiAgeng: (question: string) => void;
}

export const PrimbonMimpi: React.FC<PrimbonMimpiProps> = ({ onConsultKiAgeng }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [selectedFirasat, setSelectedFirasat] = useState<string>('semua');
  const [selectedItem, setSelectedItem] = useState<ArtiMimpiItem | null>(null);

  // Kalkulator Waktu Impen State
  const [waktuInput, setWaktuInput] = useState<string>('03:30');
  const waktuResult: WaktuMimpiResult = useMemo(
    () => cekWaktuMimpi(waktuInput),
    [waktuInput]
  );

  // Filtered List
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return PRIMBON_MIMPI_DATABASE.filter((item) => {
      // Category filter
      if (selectedCategory !== 'semua' && item.kategori !== selectedCategory) {
        return false;
      }

      // Firasat filter
      if (selectedFirasat !== 'semua' && item.firasat !== selectedFirasat) {
        return false;
      }

      // Query filter
      if (!q) return true;

      const inJudul = item.judul.toLowerCase().includes(q);
      const inMakna = item.makna.toLowerCase().includes(q);
      const inFilosofi = item.filosofi.toLowerCase().includes(q);
      const inKeywords = item.kataKunci.some((k) => k.toLowerCase().includes(q));

      return inJudul || inMakna || inFilosofi || inKeywords;
    });
  }, [searchQuery, selectedCategory, selectedFirasat]);

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'semua', label: 'Semua Kategori', count: PRIMBON_MIMPI_DATABASE.length },
    {
      id: 'hewan',
      label: 'Hewan & Satwa',
      count: PRIMBON_MIMPI_DATABASE.filter((i) => i.kategori === 'hewan').length,
    },
    {
      id: 'tubuh',
      label: 'Tubuh & Kesehatan',
      count: PRIMBON_MIMPI_DATABASE.filter((i) => i.kategori === 'tubuh').length,
    },
    {
      id: 'alam',
      label: 'Peristiwa Alam',
      count: PRIMBON_MIMPI_DATABASE.filter((i) => i.kategori === 'alam').length,
    },
    {
      id: 'leluhur',
      label: 'Kematian & Leluhur',
      count: PRIMBON_MIMPI_DATABASE.filter((i) => i.kategori === 'leluhur').length,
    },
    {
      id: 'pusaka',
      label: 'Pusaka & Gaib',
      count: PRIMBON_MIMPI_DATABASE.filter((i) => i.kategori === 'pusaka').length,
    },
    {
      id: 'rezeki',
      label: 'Rezeki & Harta',
      count: PRIMBON_MIMPI_DATABASE.filter((i) => i.kategori === 'rezeki').length,
    },
    {
      id: 'asmara',
      label: 'Asmara & Jodoh',
      count: PRIMBON_MIMPI_DATABASE.filter((i) => i.kategori === 'asmara').length,
    },
  ];

  const firasatBadges: { id: string; label: string; color: string }[] = [
    { id: 'semua', label: 'Semua Firasat', color: 'bg-blue-900/40 text-blue-300' },
    {
      id: 'Kebaikan & Rezeki',
      label: 'Rezeki & Keberuntungan',
      color: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
    },
    {
      id: 'Derajat & Kehormatan',
      label: 'Derajat & Wibawa',
      color: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
    },
    {
      id: 'Peringatan & Mawas Diri',
      label: 'Peringatan & Mawas Diri',
      color: 'bg-rose-950/60 text-rose-300 border-rose-500/40',
    },
    {
      id: 'Ujian Kesabaran',
      label: 'Ujian Kesabaran',
      color: 'bg-purple-950/60 text-purple-300 border-purple-500/40',
    },
  ];

  const quickKeywords = [
    'Ular',
    'Gigi Copot',
    'Banjir',
    'Keris',
    'Ikan Emas',
    'Orang Tua Meninggal',
    'Menikah',
    'Perkutut',
    'Hamil',
    'Emas',
    'Harimau',
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. HERO SECTION BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1838] via-[#081028] to-[#040817] border border-blue-800/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium">
            <MoonStar className="w-4 h-4 text-amber-400" />
            <span>Tafsir Sasmita Impen • Kitab Primbon Betaljemur Adammakna</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Primbon <span className="text-amber-400 font-normal">Arti Mimpi</span>
          </h1>

          <p className="text-sm sm:text-base text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
            Menerjemahkan tabir rahasia dan sasmita gaib di balik bunga tidur Anda
            berdasarkan kearifan primbon Jawa kuna, dilengkapi petunjuk waktu keabsahan
            dan anjuran laku batin.
          </p>

          <div className="pt-2 flex justify-center">
            <KeratonOrnament className="w-48 text-amber-400/50" />
          </div>
        </div>
      </div>

      {/* 2. KALKULATOR TIGA WAKTU SAKRAL MIMPI (Puspowajom, Gondoyoni, Titiyoni) */}
      <div className="rounded-3xl bg-[#09132c]/90 border border-blue-900/50 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-blue-900/40">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg sm:text-xl">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Cek Keabsahan Waktu Mimpi (Mangsa Impen)</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-300/70 mt-1">
              Menurut leluhur Jawa, tidak semua mimpi bermakna gaib. Waktu terjadinya mimpi
              menentukan apakah ia bunga tidur biasa atau sasmita hakiki.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="text-xs text-blue-200 font-medium whitespace-nowrap">
              Jam Berapa Anda Bermimpi?
            </label>
            <input
              type="time"
              value={waktuInput}
              onChange={(e) => setWaktuInput(e.target.value)}
              className="px-3 py-2 rounded-xl bg-blue-950/80 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs text-blue-300/60">Pilihan Cepat Waktu:</span>
          <button
            onClick={() => setWaktuInput('21:30')}
            className={`px-3 py-1 rounded-lg text-xs transition-all ${
              waktuResult.periode === 'Titiyoni'
                ? 'bg-blue-700/50 text-white border border-blue-500/50 font-bold'
                : 'bg-blue-950/50 text-blue-300/70 hover:text-white border border-blue-900/40'
            }`}
          >
            Awal Malam (21:30 WIB)
          </button>
          <button
            onClick={() => setWaktuInput('00:30')}
            className={`px-3 py-1 rounded-lg text-xs transition-all ${
              waktuResult.periode === 'Gondoyoni'
                ? 'bg-blue-700/50 text-white border border-blue-500/50 font-bold'
                : 'bg-blue-950/50 text-blue-300/70 hover:text-white border border-blue-900/40'
            }`}
          >
            Tengah Malam (00:30 WIB)
          </button>
          <button
            onClick={() => setWaktuInput('03:45')}
            className={`px-3 py-1 rounded-lg text-xs transition-all ${
              waktuResult.periode === 'Puspowajom'
                ? 'bg-amber-500/30 text-amber-300 border border-amber-500/60 font-bold shadow-md'
                : 'bg-blue-950/50 text-blue-300/70 hover:text-white border border-blue-900/40'
            }`}
          >
            Sepertiga Akhir / Subuh (03:45 WIB) ⭐
          </button>
        </div>

        {/* Result Card */}
        <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-[#0a1533] to-blue-950/70 border border-blue-800/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs uppercase font-mono tracking-widest text-blue-300">
                Kategori Periode:
              </span>
              <span className="text-base sm:text-lg font-serif font-bold text-amber-400">
                Mangsa {waktuResult.periode}
              </span>
              <span className="text-xs text-blue-300/60">({waktuResult.rentang})</span>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                waktuResult.periode === 'Puspowajom'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60'
                  : waktuResult.periode === 'Gondoyoni'
                  ? 'bg-purple-950/80 text-purple-300 border-purple-500/60'
                  : 'bg-blue-950/80 text-blue-300 border-blue-500/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{waktuResult.keabsahan}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            {waktuResult.penjelasan}
          </p>
        </div>
      </div>

      {/* 3. SEARCH & CATEGORY FILTER */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-amber-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari arti mimpi Anda... (misal: ular, gigi copot, banjir, keris, ikan emas, meninggal)"
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#09132c]/90 border border-blue-800/60 text-white placeholder-blue-300/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400/80 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Keywords */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-blue-300/60 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Sering Dicari:
          </span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setSearchQuery(kw)}
              className="px-2.5 py-1 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-blue-200/90 border border-blue-800/40 transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Categories Tab */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold border border-amber-400/40 shadow-lg'
                  : 'bg-[#09132c]/70 text-blue-200/80 hover:bg-blue-950/90 hover:text-white border border-blue-900/40'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-blue-950 font-bold'
                    : 'bg-blue-900/60 text-blue-300'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Firasat Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-blue-300/60 flex items-center gap-1 whitespace-nowrap">
            <Filter className="w-3 h-3 text-amber-400" /> Filter Firasat:
          </span>
          {firasatBadges.map((fb) => (
            <button
              key={fb.id}
              onClick={() => setSelectedFirasat(fb.id)}
              className={`px-3 py-1 rounded-lg border transition-all whitespace-nowrap ${
                selectedFirasat === fb.id
                  ? 'ring-2 ring-amber-400 font-bold ' + fb.color
                  : 'bg-blue-950/40 text-blue-300/70 border-blue-900/40 hover:text-white'
              }`}
            >
              {fb.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. RESULTS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs sm:text-sm text-blue-300/80">
            Menampilkan <strong>{filteredList.length}</strong> arti mimpi berdasarkan Primbon
            Jawa
          </div>
          {(searchQuery || selectedCategory !== 'semua' || selectedFirasat !== 'semua') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('semua');
                setSelectedFirasat('semua');
              }}
              className="text-xs text-amber-400 hover:text-amber-300 underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {filteredList.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#09132c]/50 border border-blue-900/40 space-y-4">
            <HelpCircle className="w-12 h-12 text-blue-400/50 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-white">
              Arti Mimpi Tidak Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-blue-300/70 max-w-md mx-auto">
              Kata kunci "{searchQuery}" belum ada di database ringkas. Anda bisa langsung
              menanyakan tafsir mimpi ini kepada <strong>Minton</strong>.
            </p>
            <button
              onClick={() =>
                onConsultKiAgeng(
                  `Halo Minton, semalam saya bermimpi tentang "${searchQuery}". Mohon tafsir dan wejangan luhur berdasarkan Primbon Jawa mengenai mimpi ini.`
                )
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-700 text-white font-bold text-xs sm:text-sm hover:from-purple-500 hover:to-blue-600 shadow-lg cursor-pointer"
            >
              <MessageSquareQuote className="w-4 h-4 text-amber-300" />
              <span>Tanyakan Mimpi Ini ke Minton</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-gradient-to-b from-[#0b1636] to-[#070e24] border border-blue-900/50 hover:border-amber-500/50 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-3">
                  {/* Category & Firasat Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-blue-300/80 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/40">
                      {item.kategoriLabel}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.firasat === 'Kebaikan & Rezeki'
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                          : item.firasat === 'Derajat & Kehormatan'
                          ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                          : item.firasat === 'Peringatan & Mawas Diri'
                          ? 'bg-rose-950/70 text-rose-300 border-rose-500/40'
                          : 'bg-purple-950/70 text-purple-300 border-purple-500/40'
                      }`}
                    >
                      {item.firasat}
                    </span>
                  </div>

                  {/* Title & Aksara */}
                  <div>
                    <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {item.judul}
                    </h3>
                    <div className="text-xs text-amber-400/80 aksara-jawa mt-1">
                      {item.aksara}
                    </div>
                  </div>

                  {/* Makna Preview */}
                  <p className="text-xs text-blue-200/80 line-clamp-3 leading-relaxed">
                    {item.makna}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 mt-4 border-t border-blue-900/40 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Rincian & Filosofi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      onConsultKiAgeng(
                        `Halo Minton, semalam saya ${item.judul}. Berdasarkan primbon Jawa maknanya adalah: "${item.makna}". Bagaimana wejangan dan panduan Minton untuk menyikapinya secara bijak?`
                      )
                    }
                    title="Konsultasikan mimpi ini ke Minton"
                    className="p-1.5 rounded-lg bg-blue-900/40 hover:bg-purple-600/30 text-blue-300 hover:text-purple-300 border border-blue-800/40 transition-colors cursor-pointer"
                  >
                    <MessageSquareQuote className="w-4 h-4 text-purple-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. MODAL RINCIAN MIMPI */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#0c1838] via-[#09132c] to-[#050b1a] border border-amber-500/50 p-6 sm:p-8 shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-blue-950/80 text-blue-300 hover:text-white border border-blue-800/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-800/40 font-medium">
                  {selectedItem.kategoriLabel}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                    selectedItem.firasat === 'Kebaikan & Rezeki'
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                      : selectedItem.firasat === 'Derajat & Kehormatan'
                      ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                      : selectedItem.firasat === 'Peringatan & Mawas Diri'
                      ? 'bg-rose-950/70 text-rose-300 border-rose-500/40'
                      : 'bg-purple-950/70 text-purple-300 border-purple-500/40'
                  }`}
                >
                  {selectedItem.firasat}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {selectedItem.judul}
              </h2>
              <p className="text-xs text-amber-400 aksara-jawa">
                {selectedItem.aksara}
              </p>
            </div>

            {/* Content Blocks */}
            <div className="space-y-4 text-xs sm:text-sm">
              {/* Makna Primbon */}
              <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-800/50 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-serif font-bold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Makna Primbon Jawa</span>
                </div>
                <p className="text-blue-100/90 leading-relaxed">
                  {selectedItem.makna}
                </p>
              </div>

              {/* Filosofi & Simbolisme */}
              <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-800/50 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-serif font-bold">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Filosofi & Simbolisme Leluhur</span>
                </div>
                <p className="text-blue-200/80 leading-relaxed italic">
                  "{selectedItem.filosofi}"
                </p>
              </div>

              {/* Anjuran Laku Batin */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-serif font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Anjuran Ikhtiar & Tindakan</span>
                </div>
                <p className="text-amber-100/90 leading-relaxed">
                  {selectedItem.anjuran}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900/60 text-blue-200 text-xs font-semibold border border-blue-800/50 transition-colors cursor-pointer"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  const q = `Halo Minton, semalam saya ${selectedItem.judul}. Berdasarkan primbon Jawa maknanya adalah: "${selectedItem.makna}". Bagaimana panduan dan saran terbaik Minton untuk saya?`;
                  setSelectedItem(null);
                  onConsultKiAgeng(q);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-700 text-white text-xs sm:text-sm font-bold shadow-lg hover:from-purple-500 hover:to-blue-600 transition-all cursor-pointer"
              >
                <MessageSquareQuote className="w-4 h-4 text-amber-300" />
                <span>Konsultasikan ke Minton</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. EDUKASI ADAB BERMIMPI MENURUT TRADISI JAWA */}
      <div className="rounded-3xl bg-[#09132c]/80 border border-blue-900/50 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-blue-700/30 border border-amber-500/40">
            <GununganIcon className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-white text-base sm:text-lg">
              Tata Krama & Adab Menyikapi Mimpi (Serat Primbon)
            </h3>
            <p className="text-xs text-blue-300/70">
              Prinsip leluhur Jawa dalam merespons firasat alam bawah sadar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <h4 className="font-serif font-bold text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Bila Bermimpi Baik (Sasmita Apik):</span>
            </h4>
            <ul className="space-y-1.5 text-blue-200/80 list-disc list-inside">
              <li>Ucapkan sujud syukur kepada Gusti Allah Ingkang Murbeng Dumadi.</li>
              <li>Jangan takabur atau membanggakan diri kepada orang lain.</li>
              <li>Sedekahkan sedikit makanan atau rezeki di hari pasaran weton Anda.</li>
              <li>Jadikan motivasi untuk semakin rajin berikhtiar dan bekerja cerdas.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <h4 className="font-serif font-bold text-rose-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Bila Bermimpi Buruk (Sasmita Ala / Pangeling):</span>
            </h4>
            <ul className="space-y-1.5 text-blue-200/80 list-disc list-inside">
              <li>Saat terjaga, meludah pelan ke arah kiri 3 kali dan baca doa perlindungan.</li>
              <li>Ubah posisi tidur dan jangan biarkan pikiran larut dalam ketakutan.</li>
              <li>Jangan menceritakan mimpi buruk kepada sembarang orang yang iri dengki.</li>
              <li>Lakukan tirakat mawas diri dan sedekah tolak bala (jenang sengkolo).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
