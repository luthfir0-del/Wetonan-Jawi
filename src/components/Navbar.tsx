import React from 'react';
import { GununganIcon } from './GununganIcon';
import { calculateWeton } from '../lib/primbon';
import { Sparkles, Heart, Calendar, MessageSquareQuote, BookOpen, Compass, SunMedium, Calculator, CalendarDays, MoonStar } from 'lucide-react';

export interface NavbarProps {
  activeTab: 'today' | 'kalender' | 'weton' | 'jodoh' | 'haribaik' | 'kiageng' | 'mimpi' | 'glosarium';
  setActiveTab: (tab: 'today' | 'kalender' | 'weton' | 'jodoh' | 'haribaik' | 'kiageng' | 'mimpi' | 'glosarium') => void;
  onOpenTodayWeton: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenTodayWeton }) => {
  // Current date
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const todayWeton = calculateWeton(todayStr);

  return (
    <header className="sticky top-0 z-50 bg-[#070c18]/95 backdrop-blur-md border-b border-blue-900/40 transition-all">
      {/* Top Banner: Today's Javanese Astrological Date & Social Branding */}
      <div className="bg-gradient-to-r from-[#081026] via-[#0e1f4d] to-[#081026] border-b border-blue-500/20 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs text-blue-200/90 gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-amber-300 font-medium">Weton Dina Iki:</span>
            <strong className="text-white font-semibold">
              {todayWeton.dina} {todayWeton.pasaran} ({todayWeton.neptuTotal})
            </strong>
            <span className="hidden md:inline text-blue-300/70">• Wuku {todayWeton.wuku} • {todayWeton.lakuning}</span>
          </div>

          <div className="flex items-center gap-3 mx-auto sm:mx-0 text-[11px]">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-blue-300">
              <span className="font-semibold text-amber-300">@wetonanjawi</span> di Threads & YouTube
            </span>
            <button
              onClick={onOpenTodayWeton}
              className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 transition-colors cursor-pointer"
            >
              <Compass className="w-3 h-3 text-amber-400" />
              Info Weton Hari Ini
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('today')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-blue-700/30 via-[#0e1f4d] to-[#070c18] border border-amber-500/40 shadow-lg shadow-blue-950/40 group-hover:border-amber-400 transition-all">
              <GununganIcon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  WetonanJawi<span className="text-amber-400 font-normal">.ai.id</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-600/30 text-amber-300 border border-blue-500/30">
                  Primbon Jawi
                </span>
              </div>
              <p className="text-[11px] text-blue-300/80 aksara-jawa tracking-wide hidden sm:block">
                ꦮꦼꦠꦺꦴꦤ꧀ꦤꦤ꧀ꦗꦮꦶ • Official Threads & YouTube @wetonanjawi
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0b142d]/80 p-1.5 rounded-2xl border border-blue-900/50 shadow-inner">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'today'
                  ? 'bg-gradient-to-r from-blue-600/40 to-blue-700/30 text-amber-300 border border-amber-500/40 shadow-md font-bold'
                  : 'text-blue-200/80 hover:text-white hover:bg-blue-950/60'
              }`}
            >
              <SunMedium className="w-4 h-4 text-amber-400" />
              Info Hari Ini
            </button>
            <button
              onClick={() => setActiveTab('kalender')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'kalender'
                  ? 'bg-gradient-to-r from-blue-600/40 to-blue-700/30 text-amber-300 border border-amber-500/40 shadow-md font-bold'
                  : 'text-blue-200/80 hover:text-white hover:bg-blue-950/60'
              }`}
            >
              <CalendarDays className="w-4 h-4 text-amber-400" />
              Kalender Jawa
            </button>
            <button
              onClick={() => setActiveTab('weton')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'weton'
                  ? 'bg-gradient-to-r from-blue-600/40 to-blue-700/30 text-amber-300 border border-amber-500/40 shadow-md font-bold'
                  : 'text-blue-200/80 hover:text-white hover:bg-blue-950/60'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              Kalkulator Lahir
            </button>
            <button
              onClick={() => setActiveTab('jodoh')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'jodoh'
                  ? 'bg-gradient-to-r from-rose-500/30 to-blue-700/30 text-rose-300 border border-rose-500/40 shadow-md font-bold'
                  : 'text-blue-200/80 hover:text-rose-200 hover:bg-blue-950/60'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400" />
              Petungan Jodoh
            </button>
            <button
              onClick={() => setActiveTab('haribaik')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'haribaik'
                  ? 'bg-gradient-to-r from-amber-500/30 to-blue-700/30 text-amber-300 border border-amber-500/40 shadow-md font-bold'
                  : 'text-blue-200/80 hover:text-amber-200 hover:bg-blue-950/60'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              Saran Hari Baik
            </button>
            <button
              onClick={() => setActiveTab('kiageng')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'kiageng'
                  ? 'bg-gradient-to-r from-purple-500/30 to-blue-700/30 text-purple-200 border border-purple-500/40 shadow-md font-bold'
                  : 'text-blue-200/80 hover:text-purple-200 hover:bg-blue-950/60'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4 text-purple-400" />
              Tanya Minton
            </button>
            <button
              onClick={() => setActiveTab('mimpi')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'mimpi'
                  ? 'bg-gradient-to-r from-blue-600/40 to-blue-700/30 text-amber-300 border border-amber-500/40 shadow-md font-bold'
                  : 'text-blue-200/80 hover:text-amber-200 hover:bg-blue-950/60'
              }`}
            >
              <MoonStar className="w-4 h-4 text-amber-400" />
              Arti Mimpi
            </button>
            <button
              onClick={() => setActiveTab('glosarium')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'glosarium'
                  ? 'bg-gradient-to-r from-blue-600/40 to-blue-700/30 text-amber-300 border border-amber-500/40 shadow-md font-bold'
                  : 'text-blue-200/80 hover:text-amber-200 hover:bg-blue-950/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              Kamus Primbon
            </button>
          </nav>

          {/* Action Button: Tanya Minton */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('kiageng')}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all active:scale-95 cursor-pointer"
            >
              <MessageSquareQuote className="w-4 h-4 text-stone-950" />
              <span>Tanya Minton</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="lg:hidden flex items-center justify-around py-2.5 border-t border-blue-900/40 overflow-x-auto text-[11px] gap-1">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg shrink-0 ${
              activeTab === 'today' ? 'text-amber-400 font-bold' : 'text-blue-300/70'
            }`}
          >
            <SunMedium className="w-4 h-4" />
            <span>Hari Ini</span>
          </button>
          <button
            onClick={() => setActiveTab('kalender')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg shrink-0 ${
              activeTab === 'kalender' ? 'text-amber-400 font-bold' : 'text-blue-300/70'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Kalender</span>
          </button>
          <button
            onClick={() => setActiveTab('weton')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg shrink-0 ${
              activeTab === 'weton' ? 'text-blue-400 font-bold' : 'text-blue-300/70'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Weton</span>
          </button>
          <button
            onClick={() => setActiveTab('jodoh')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg shrink-0 ${
              activeTab === 'jodoh' ? 'text-rose-400 font-bold' : 'text-blue-300/70'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Jodoh</span>
          </button>
          <button
            onClick={() => setActiveTab('haribaik')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg shrink-0 ${
              activeTab === 'haribaik' ? 'text-amber-400 font-bold' : 'text-blue-300/70'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Hari Baik</span>
          </button>
          <button
            onClick={() => setActiveTab('mimpi')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg shrink-0 ${
              activeTab === 'mimpi' ? 'text-amber-400 font-bold' : 'text-blue-300/70'
            }`}
          >
            <MoonStar className="w-4 h-4" />
            <span>Mimpi</span>
          </button>
          <button
            onClick={() => setActiveTab('kiageng')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg shrink-0 ${
              activeTab === 'kiageng' ? 'text-purple-400 font-bold' : 'text-blue-300/70'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Minton</span>
          </button>
          <button
            onClick={() => setActiveTab('glosarium')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg shrink-0 ${
              activeTab === 'glosarium' ? 'text-amber-400 font-bold' : 'text-blue-300/70'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kamus</span>
          </button>
        </div>
      </div>
    </header>
  );
};
