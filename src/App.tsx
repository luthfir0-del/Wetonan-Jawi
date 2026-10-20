/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { calculateWeton, WetonResult } from './lib/primbon';
import { Navbar } from './components/Navbar';
import { TodayDigestHero } from './components/TodayDigestHero';
import { KalenderJawa } from './components/KalenderJawa';
import { WetonCalculator } from './components/WetonCalculator';
import { JodohCalculator } from './components/JodohCalculator';
import { HariBaikCalculator } from './components/HariBaikCalculator';
import { KiAgengChat } from './components/KiAgengChat';
import { PrimbonGlossary } from './components/PrimbonGlossary';
import { PrimbonMimpi } from './components/PrimbonMimpi';
import { WetonCardDownload } from './components/WetonCardDownload';
import { TodayPopupModal } from './components/TodayPopupModal';
import { GununganIcon } from './components/GununganIcon';
import {
  ArrowUp,
  Shield,
  Youtube,
  AtSign,
  CalendarDays,
  MoonStar
} from 'lucide-react';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'today' | 'kalender' | 'weton' | 'jodoh' | 'haribaik' | 'kiageng' | 'mimpi' | 'glosarium'>('today');

  // Selected date & current weton state
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [currentWeton, setCurrentWeton] = useState<WetonResult>(() => calculateWeton(todayStr));

  // Modal Card download state
  const [cardModalWeton, setCardModalWeton] = useState<WetonResult | null>(null);

  // Automatic first-visit modal popup state
  const [showPopupModal, setShowPopupModal] = useState<boolean>(false);

  // Transfer question to Ki Ageng AI
  const [kiAgengInitialQuestion, setKiAgengInitialQuestion] = useState<string | undefined>(undefined);

  // Auto trigger first visit popup modal
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('wetonanjawi_first_popup_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowPopupModal(true);
        sessionStorage.setItem('wetonanjawi_first_popup_seen', 'true');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    const res = calculateWeton(dateStr);
    setCurrentWeton(res);
  };

  const handleOpenTodayWeton = () => {
    setShowPopupModal(true);
    setActiveTab('today');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultKiAgeng = (weton: WetonResult, question?: string) => {
    setCurrentWeton(weton);
    setKiAgengInitialQuestion(question);
    setActiveTab('kiageng');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectConsult = (question: string) => {
    setKiAgengInitialQuestion(question);
    setActiveTab('kiageng');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070c18] text-slate-100 selection:bg-blue-500/30 selection:text-amber-200">
      {/* Sticky Navbar (Biru Dongker Theme) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTodayWeton={handleOpenTodayWeton}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* TAB 1: INFO HARI INI (Default Front Page View with integrated Kalender Jawa) */}
        {activeTab === 'today' && (
          <TodayDigestHero
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            onGoToCalculator={() => {
              setActiveTab('weton');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onConsultKiAgeng={handleDirectConsult}
            onOpenCardModal={(w) => setCardModalWeton(w)}
          />
        )}

        {/* TAB 2: KALENDER JAWA LENGKAP (Dedicated View) */}
        {activeTab === 'kalender' && (
          <KalenderJawa
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            onOpenCardModal={(w) => setCardModalWeton(w)}
            onConsultKiAgeng={handleConsultKiAgeng}
            onViewDigestForDate={(d) => {
              handleSelectDate(d);
              setActiveTab('today');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 3: KALKULATOR WETON LAHIR */}
        {activeTab === 'weton' && (
          <WetonCalculator
            currentWeton={currentWeton}
            onSelectDate={handleSelectDate}
            onConsultKiAgeng={handleConsultKiAgeng}
            onOpenCardModal={(w) => setCardModalWeton(w)}
          />
        )}

        {/* TAB 4: PETUNGAN JODOH */}
        {activeTab === 'jodoh' && (
          <JodohCalculator onConsultKiAgeng={handleDirectConsult} />
        )}

        {/* TAB 5: SARAN HARI BAIK & SAAT PITU */}
        {activeTab === 'haribaik' && (
          <HariBaikCalculator
            currentWeton={currentWeton}
            onConsultKiAgeng={handleDirectConsult}
          />
        )}

        {/* TAB 6: BILIK WEJANGAN KI AGENG SASANGKA AI */}
        {activeTab === 'kiageng' && (
          <KiAgengChat
            currentWeton={currentWeton}
            initialQuestion={kiAgengInitialQuestion}
          />
        )}

        {/* TAB 7: PRIMBON ARTI MIMPI (TAFSIR SASMITA IMPEN) */}
        {activeTab === 'mimpi' && (
          <PrimbonMimpi onConsultKiAgeng={handleDirectConsult} />
        )}

        {/* TAB 8: KAMUS PRIMBON & FALSAFAH LUHUR */}
        {activeTab === 'glosarium' && (
          <PrimbonGlossary
            onGoToMimpi={() => {
              setActiveTab('mimpi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onConsultKiAgeng={handleDirectConsult}
          />
        )}
      </main>

      {/* Shareable Card Modal */}
      {cardModalWeton && (
        <WetonCardDownload
          weton={cardModalWeton}
          onClose={() => setCardModalWeton(null)}
        />
      )}

      {/* First-visit & On-demand Today Weton Modal Popup */}
      <TodayPopupModal
        isOpen={showPopupModal}
        onClose={() => setShowPopupModal(false)}
        onGoToKalender={() => {
          setShowPopupModal(false);
          setActiveTab('kalender');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onConsultKiAgeng={(q) => {
          setShowPopupModal(false);
          handleDirectConsult(q);
        }}
        selectedDate={selectedDate}
      />

      {/* Floating Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-[#0c1838]/90 hover:bg-[#122452] text-amber-400 border border-blue-500/40 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Kembali ke Atas"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Prestigious Footer (Biru Dongker Theme & Threads/YouTube @wetonanjawi) */}
      <footer className="mt-20 border-t border-blue-900/50 bg-[#060b17]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Col 1: Brand Info & Socials */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-700/30 border border-amber-500/40">
                  <GununganIcon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    WetonanJawi<span className="text-amber-400 font-normal">.ai.id</span>
                  </h3>
                  <p className="text-xs text-blue-300 aksara-jawa">
                    ꦮꦼꦠꦺꦴꦤ꧀ꦤꦤ꧀ꦗꦮꦶ • Official Portal Threads & YouTube @wetonanjawi
                  </p>
                </div>
              </div>
              <p className="text-blue-200/80 text-xs sm:text-sm leading-relaxed max-w-md">
                Portal resmi Primbon & Weton Jawa adiluhung bertema biru dongker, dipadukan kecerdasan buatan Gemini AI. Menyajikan info harian weton, kalender pasaran & pawukon, rekomendasi outfit & kuliner, jodoh sejati, dan saran hari baik hajatan.
              </p>

              {/* Social Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="https://youtube.com/@wetonanjawi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>YouTube @wetonanjawi</span>
                </a>
                <a
                  href="https://threads.net/@wetonanjawi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border border-blue-500/30 text-xs font-semibold transition-colors"
                >
                  <AtSign className="w-4 h-4 text-amber-300" />
                  <span>Threads @wetonanjawi</span>
                </a>
              </div>

              <div className="text-xs text-amber-300/80 italic font-serif">
                "Memayu Hayuning Bawana, Ambrasta Dur Hangkara"
              </div>
            </div>

            {/* Col 2: Fitur Utama */}
            <div>
              <h4 className="font-serif font-bold text-white text-sm mb-3">
                Layanan & Fitur
              </h4>
              <ul className="space-y-2 text-xs text-blue-300/80">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('today');
                      scrollToTop();
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Info Weton Hari Ini (Outfit & Kuliner)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('kalender');
                      scrollToTop();
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Kalender Jawa & Pawukon</span>
                    <span className="text-[10px] text-amber-400 font-bold px-1.5 py-0.2 bg-amber-400/10 rounded">Baru</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('weton');
                      scrollToTop();
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Kalkulator Weton Kelahiran Pribadi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('jodoh');
                      scrollToTop();
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Petungan Jodoh (Salaki Rabi)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('haribaik');
                      scrollToTop();
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Saran Hari Baik & Saat Pitu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('mimpi');
                      scrollToTop();
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Primbon Arti Mimpi (Sasmita Impen)</span>
                    <span className="text-[10px] text-amber-400 font-bold px-1.5 py-0.2 bg-amber-400/10 rounded">Baru</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('kiageng');
                      scrollToTop();
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Tanya Minton (@wetonanjawi)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('glosarium');
                      scrollToTop();
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Kamus Primbon & Falsafah Luhur
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Disclaimer & Nilai Budaya */}
            <div>
              <h4 className="font-serif font-bold text-white text-sm mb-3">
                Pangertosan (Disclaimer)
              </h4>
              <p className="text-[11px] text-blue-300/70 leading-relaxed">
                Petungan Weton dan Primbon adalah warisan budaya dan kearifan lokal Nusantara untuk sarana mawas diri (introspeksi), mengasah rasa, dan ikhtiar lahir batin. Segala takdir, rezeki, jodoh, dan maut mutlak berada di bawah kekuasaan Gusti Ingkang Murbeng Dumadi.
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Kearifan Luhur Budaya Nusantara</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300/60 gap-3">
            <div>
              © 2026 <strong>WetonanJawi.ai.id</strong>. Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div className="flex items-center gap-4">
              <span>Tema: Biru Dongker @wetonanjawi</span>
              <span>•</span>
              <span className="text-amber-400/90 font-medium">Gemini 3.8 Flash AI Engine</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
