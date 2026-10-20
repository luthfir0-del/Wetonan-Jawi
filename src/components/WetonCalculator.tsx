import React, { useState } from 'react';
import { calculateWeton, WetonResult } from '../lib/primbon';

interface WetonCalculatorProps {
  onCalculate: (weton: WetonResult) => void;
}

export const WetonCalculator: React.FC<WetonCalculatorProps> = ({ onCalculate }) => {
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    try {
      const result = calculateWeton(birthDate);
      onCalculate(result); // Lempar hasil perhitungan tanggal lahir ke App.tsx
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-900 border border-amber-900/30 rounded-2xl p-6 shadow-xl max-w-xl mx-auto font-sans">
      <h2 className="text-xl font-bold text-amber-200 mb-4">Hitung Weton Kelahiran</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className="flex-1 bg-slate-950 border border-amber-900/40 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-all"
        >
          Hitung Weton
        </button>
      </form>
    </div>
  );
};
