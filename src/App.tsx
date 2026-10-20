import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { WetonCalculator } from './components/WetonCalculator';
import { KiAgengChat, UserWetonData } from './components/KiAgengChat';
import { TodayDigestHero } from './components/TodayDigestHero';
import { JodohCalculator } from './components/JodohCalculator';
import { HariBaikCalculator } from './components/HariBaikCalculator';
import { PrimbonMimpi } from './components/PrimbonMimpi';
import { PrimbonGlossary } from './components/PrimbonGlossary';

export function App() {
  // State tersentralisasi untuk menyimpan Weton Pengguna dari tanggal lahir yang diinput.
  // PENTING: Inisialisasi bernilai null agar tidak default ke hari ini!
  const [userWeton, setUserWeton] = useState<UserWetonData | null>(null);

  // Callback saat user menghitung weton kelahiran
  const handleWetonCalculated = (wetonResult: UserWetonData) => {
    setUserWeton(wetonResult);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navbar Utama */}
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:px-8 md:py-10 space-y-12">
        {/* Banner Digest Hari Ini */}
        <TodayDigestHero />

        {/* Section 1: Kalkulator Weton Kelahiran Utama */}
        <section id="kalkulator" className="scroll-mt-20">
          <WetonCalculator onCalculate={handleWetonCalculated} />
        </section>

        {/* Section 2: Konsultasi Tanya Minton (@wetonanjawi) */}
        <section id="konsultasi" className="scroll-mt-20 pt-4">
          <KiAgengChat userWeton={userWeton} />
        </section>

        {/* Section Fitur Primbon Lainnya */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          <section id="jodoh" className="scroll-mt-20">
            <JodohCalculator />
          </section>
          <section id="hari-baik" className="scroll-mt-20">
            <HariBaikCalculator />
          </section>
        </div>

        {/* Section Tafsir Mimpi & Glosarium */}
        <section id="mimpi" className="scroll-mt-20 pt-6">
          <PrimbonMimpi />
        </section>

        <section id="glosarium" className="scroll-mt-20 pt-6">
          <PrimbonGlossary />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-900/20 bg-[#060911] py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Wetonan Jawi (@wetonanjawi). Seluruh Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}

export default App;
