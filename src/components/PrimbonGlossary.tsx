import React, { useState } from 'react';
import { PASARAN_LIST, DINA_LIST, WUKU_LIST } from '../lib/primbon';
import { GununganIcon, KeratonOrnament } from './GununganIcon';
import { BookOpen, Search, Sparkles, MoonStar, ArrowRight, MessageSquareQuote } from 'lucide-react';

interface PrimbonGlossaryProps {
  onGoToMimpi?: () => void;
  onConsultKiAgeng?: (q: string) => void;
}

export const PrimbonGlossary: React.FC<PrimbonGlossaryProps> = ({ onGoToMimpi, onConsultKiAgeng }) => {
  const [activeCategory, setActiveCategory] = useState<'pasaran' | 'dina' | 'wuku' | 'jodoh' | 'falsafah'>('pasaran');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const falsafahList = [
    {
      pepatah: 'Memayu Hayuning Bawana',
      aksara: 'ꦩꦼꦩꦪꦸꦲꦪꦸꦤꦶꦁꦧꦮꦤ',
      arti: 'Memperindah keindahan dunia.',
      makna: 'Tujuan hidup manusia adalah menjaga kedamaian, kelestarian alam, serta menghindarkan diri dari perbuatan yang merusak tatanan harmoni semesta.',
    },
    {
      pepatah: 'Urip Iku Urup',
      aksara: 'ꦲꦸꦫꦶꦥ꧀ꦲꦶꦏꦸꦲꦸꦫꦸꦥ꧀',
      arti: 'Hidup itu menyala (memberi terang).',
      makna: 'Kehidupan manusia hendaknya memberi manfaat, pertolongan, dan pencerahan bagi orang lain di sekitarnya, sekecil apapun peran kita.',
    },
    {
      pepatah: 'Sangkan Paraning Dumadi',
      aksara: 'ꦱꦁꦏꦤ꧀ꦥꦫꦤꦶꦁꦢꦸꦩꦢꦶ',
      arti: 'Asal mula dan tujuan akhir segala penciptaan.',
      makna: 'Kesadaran spiritual bahwa manusia berasal dari Tuhan Yang Maha Esa dan kelak akan kembali mempertanggungjawabkan setiap laku di hadapan-Nya.',
    },
    {
      pepatah: 'Ngluruk Tanpa Bala, Menang Tanpa Ngasorake',
      aksara: 'ꦔ꧀ꦭꦸꦫꦸꦏ꧀ꦠꦤ꧀ꦥꦧꦭꦩꦼꦤꦁꦠꦤ꧀ꦥꦔꦱꦺꦴꦫꦏꦺ',
      arti: 'Menyerbu tanpa pasukan, menang tanpa merendahkan.',
      makna: 'Kekuatan sejati lahir dari kemuliaan budi dan kebenaran, bukan kekerasan. Ketika menang, tetap menghormati harga diri lawan.',
    },
    {
      pepatah: 'Aja Kagetan, Aja Gumunan, Aja Ogelan',
      aksara: 'ꦲꦗꦏꦒꦺꦠꦤ꧀ꦲꦗꦒꦸꦩꦸꦤꦤ꧀',
      arti: 'Jangan mudah terkejut, jangan mudah heran, jangan mudah goyah.',
      makna: 'Memiliki ketenangan batin yang matang saat menghadapi pasang surut duniawi dan gejolak zaman.',
    },
    {
      pepatah: 'Mikul Dhuwur Mendhem Jero',
      aksara: 'ꦩꦶꦏꦸꦭ꧀ꦝꦸꦮꦸꦂꦩꦼꦤ꧀ꦝꦼꦩ꧀ꦗꦼꦫꦺꦴ',
      arti: 'Menjunjung tinggi kehormatan, mengubur dalam aib orang tua.',
      makna: 'Kewajiban berbakti kepada orang tua dan leluhur dengan memuliakan nama baik keluarga serta menutup rapat aib atau kelemahan mereka.',
    },
  ];

  const jodohCategories = [
    { nama: 'PEGAT', neptu: 'Sisa 1, 9, 10, 18, 19, 27, 28, 36', arti: 'Pisah / Ujian Kesabaran Batin', solusi: 'Slametan brokohan jenang sengkolo dan puasa weton rutin.' },
    { nama: 'RATU', neptu: 'Sisa 2, 11, 20, 29', arti: 'Dihormati & Disegani Bak Raja Permaisuri', solusi: 'Syukuran tumpeng robyong dan memperbanyak sedekah anak yatim.' },
    { nama: 'JODOH', neptu: 'Sisa 3, 12, 21, 30', arti: 'Cocok Lahir Batin & Langgeng Hingga Kaki Nini', solusi: 'Kenduri tumpeng punar sebagai lambang kelanggengan cinta.' },
    { nama: 'TOPO', neptu: 'Sisa 4, 13, 22, 31', arti: 'Prihatin di Awal, Memetik Kejayaan di Hari Tua', solusi: 'Tirakat melek bengi dan hidup hemat di 5 tahun awal pernikahan.' },
    { nama: 'TINARI', neptu: 'Sisa 5, 14, 23, 32', arti: 'Murah Rezeki & Sering Mendapat Keberuntungan', solusi: 'Slametan tumpeng golong untuk mempererat kerukunan.' },
    { nama: 'PADU', neptu: 'Sisa 6, 15, 24, 33', arti: 'Sering Beda Pendapat Namun Tidak Sampai Cerai', solusi: 'Slametan jenang pethak & abang serta melatih kesabaran jeda emosi.' },
    { nama: 'SUJANAN', neptu: 'Sisa 7, 16, 25, 34', arti: 'Ujian Perselingkuhan / Prasangka Cemburu', solusi: 'Ruwatan buang sengkolo dan keterbukaan komunikasi penuh.' },
    { nama: 'PESTHI', neptu: 'Sisa 8, 17, 26, 35', arti: 'Tentram, Adem Ayem & Damai Sentosa', solusi: 'Slametan tumpeng megana dan menjaga keharmonisan batin.' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs sm:text-sm font-medium mb-4 shadow-lg shadow-blue-950/40">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Ensiklopedia Astrologi & Filosofi Luhur Jawi</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Kamus Primbon & <span className="gold-gradient-text">Falsafah Kehidupan</span>
        </h2>
        <p className="mt-3 text-blue-200/80 text-sm sm:text-base leading-relaxed">
          Pustaka rujukan terlengkap mengenai hitungan Pancawara (Pasaran), Saptawara (Dina), 30 Wuku Pawukon, 8 Kategori Salaki Rabi, dan ajaran adiluhung warisan leluhur Mataram.
        </p>
        <KeratonOrnament className="mt-4" />
      </div>

      {/* Tabs & Search (Biru Dongker) */}
      <div className="bg-[#0c1838]/90 border border-blue-500/30 rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setActiveCategory('pasaran')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'pasaran'
                ? 'bg-blue-600/30 text-amber-300 border border-amber-500/40'
                : 'text-blue-200/80 hover:text-white'
            }`}
          >
            5 Pasaran
          </button>
          <button
            onClick={() => setActiveCategory('dina')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'dina'
                ? 'bg-blue-600/30 text-amber-300 border border-amber-500/40'
                : 'text-blue-200/80 hover:text-white'
            }`}
          >
            7 Dina
          </button>
          <button
            onClick={() => setActiveCategory('wuku')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'wuku'
                ? 'bg-blue-600/30 text-amber-300 border border-amber-500/40'
                : 'text-blue-200/80 hover:text-white'
            }`}
          >
            30 Wuku
          </button>
          <button
            onClick={() => setActiveCategory('jodoh')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'jodoh'
                ? 'bg-blue-600/30 text-amber-300 border border-amber-500/40'
                : 'text-blue-200/80 hover:text-white'
            }`}
          >
            8 Jodoh
          </button>
          <button
            onClick={() => setActiveCategory('falsafah')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'falsafah'
                ? 'bg-blue-600/30 text-amber-300 border border-amber-500/40'
                : 'text-blue-200/80 hover:text-white'
            }`}
          >
            Falsafah Luhur
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari istilah primbon..."
            className="w-full bg-[#081026] border border-blue-900/60 focus:border-amber-400 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white outline-none"
          />
          <Search className="w-4 h-4 text-blue-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Content Panes */}
      <div className="space-y-4">
        {/* 1. Pasaran */}
        {activeCategory === 'pasaran' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PASARAN_LIST.filter((p) => p.nama.toLowerCase().includes(searchTerm.toLowerCase())).map((p, i) => (
              <div
                key={i}
                className="bg-[#0c1838]/80 border border-blue-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-400 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {p.nama}
                  </h3>
                  <span className="text-2xl text-amber-400 aksara-jawa">
                    {p.aksara}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-blue-200">
                  <div className="flex justify-between border-b border-blue-900/60 pb-1">
                    <span className="text-blue-300">Neptu Angka:</span>
                    <strong className="text-amber-300 font-bold">{p.neptu}</strong>
                  </div>
                  <div className="flex justify-between border-b border-blue-900/60 pb-1">
                    <span className="text-blue-300">Elemen Semesta:</span>
                    <span className="text-white">{p.elemen}</span>
                  </div>
                  <div className="flex justify-between border-b border-blue-900/60 pb-1">
                    <span className="text-blue-300">Arah Mata Angin:</span>
                    <span className="text-white">{p.arah}</span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-blue-300">Warna Aura Simbolik:</span>
                    <span className="text-amber-200">{p.warna}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Dina */}
        {activeCategory === 'dina' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DINA_LIST.filter(
              (d) =>
                d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.jawa.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((d, i) => (
              <div
                key={i}
                className="bg-[#0c1838]/80 border border-blue-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-400 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {d.nama}
                    </h3>
                    <span className="text-xs text-amber-300">Nama Jawa: {d.jawa}</span>
                  </div>
                  <span className="text-xl text-amber-400 aksara-jawa">
                    {d.aksara}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-blue-900/60 flex justify-between items-center text-xs">
                  <span className="text-blue-300">Neptu Hari:</span>
                  <span className="text-lg font-serif font-black text-amber-300">
                    {d.neptu}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Wuku */}
        {activeCategory === 'wuku' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WUKU_LIST.filter(
              (w) =>
                w.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                w.makna.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((w, i) => (
              <div
                key={i}
                className="bg-[#0c1838]/80 border border-blue-900/60 hover:border-amber-500/40 rounded-xl p-4 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-serif font-bold text-amber-300 text-sm">
                    {i + 1}. Wuku {w.nama}
                  </h4>
                </div>
                <p className="text-xs text-blue-200/90 leading-relaxed">
                  {w.makna}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 4. Jodoh */}
        {activeCategory === 'jodoh' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jodohCategories
              .filter(
                (j) =>
                  j.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  j.arti.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((j, i) => (
                <div
                  key={i}
                  className="bg-[#0c1838]/80 border border-blue-500/30 rounded-2xl p-5 shadow-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-rose-400">
                      {j.nama}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-amber-300 border border-blue-500/30">
                      {j.neptu}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    "{j.arti}"
                  </p>
                  <p className="text-xs text-blue-200/80 bg-[#081026] p-3 rounded-xl border border-blue-900/50">
                    🛡️ <strong className="text-amber-300">Saran Penyelaras Adat:</strong> {j.solusi}
                  </p>
                </div>
              ))}
          </div>
        )}

        {/* 5. Falsafah Luhur */}
        {activeCategory === 'falsafah' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {falsafahList
              .filter(
                (f) =>
                  f.pepatah.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  f.arti.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  f.makna.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((f, i) => (
                <div
                  key={i}
                  className="bg-[#0c1838]/80 border border-blue-500/30 rounded-2xl p-5 shadow-lg space-y-2 relative overflow-hidden"
                >
                  <span className="text-xs text-amber-400 aksara-jawa tracking-wide block">
                    {f.aksara}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    "{f.pepatah}"
                  </h3>
                  <div className="text-xs text-amber-300 font-medium italic">
                    Artosipun: {f.arti}
                  </div>
                  <p className="text-xs text-blue-200/90 leading-relaxed pt-2 border-t border-blue-900/60">
                    {f.makna}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* SECTION: PRIMBON ARTI MIMPI DI BAWAH GLOSARIUM */}
      <div className="mt-12 pt-8 border-t border-blue-900/60">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1838] via-[#091430] to-[#050b1a] border border-amber-500/40 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <MoonStar className="w-3.5 h-3.5 text-amber-400" />
                <span>Fitur Baru • Kitab Primbon Sasmita Impen</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Tafsir & Primbon <span className="text-amber-400">Arti Mimpi Jawa</span>
              </h3>

              <p className="text-xs sm:text-sm text-blue-200/80 leading-relaxed">
                Ingin menerjemahkan makna mimpi Anda semalam? Buka kamus lengkap arti mimpi berdasarkan Kitab Betaljemur Adammakna. Dilengkapi kalkulator waktu impen (Titiyoni, Gondoyoni, Puspowajom) dan filter firasat rezeki atau peringatan mawas diri.
              </p>

              {/* Sample teaser chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-blue-300/60">Tafsir Populer:</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/80 text-amber-300 border border-blue-800/40 font-medium">
                  🐍 Dipatuk Ular (Dekat Jodoh/Rejeki)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/80 text-rose-300 border border-blue-800/40 font-medium">
                  🦷 Gigi Copot (Pangeling Sesepuh)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/80 text-emerald-300 border border-blue-800/40 font-medium">
                  🌊 Banjir Jernih (Limpahan Barokah)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/80 text-amber-300 border border-blue-800/40 font-medium">
                  🗡️ Diberi Keris (Derajat & Wibawa)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              {onGoToMimpi && (
                <button
                  onClick={onGoToMimpi}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <MoonStar className="w-4 h-4 text-stone-950" />
                  <span>Buka Kamus Arti Mimpi Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {onConsultKiAgeng && (
                <button
                  onClick={() =>
                    onConsultKiAgeng(
                      'Halo Minton, semalam saya bermimpi dan ingin menanyakan arti serta firasatnya menurut Primbon Jawa. Mohon bimbingannya.'
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-950/80 hover:bg-blue-900/60 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-colors cursor-pointer"
                >
                  <MessageSquareQuote className="w-4 h-4 text-purple-400" />
                  <span>Tanya Minton Seputar Mimpi</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
