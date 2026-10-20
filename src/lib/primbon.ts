export interface WetonResult {
  hari: string;
  pasaran: string;
  neptu: number;
  watak: string;
}

// Fungsi menghitung weton secara presisi dari tanggal lahir pengguna
export function calculateWeton(dateString: string): WetonResult {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Tanggal lahir tidak valid.');
  }

  const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const pasaranList = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

  const neptuHari: Record<string, number> = {
    Minggu: 5,
    Senin: 4,
    Selasa: 3,
    Rabu: 7,
    Kamis: 8,
    Jumat: 6,
    Sabtu: 9,
  };

  const neptuPasaran: Record<string, number> = {
    Legi: 5,
    Pahing: 9,
    Pon: 7,
    Wage: 4,
    Kliwon: 8,
  };

  const watakMap: Record<number, string> = {
    7: 'Pendito Kang Lelaku',
    8: 'Lakuning Geni',
    9: 'Lakuning Angin',
    10: 'Pendito Mbangun Candi',
    11: 'Lakuning Bumi',
    12: 'Lakuning Kembang',
    13: 'Lakuning Lintang',
    14: 'Lakuning Bulan',
    15: 'Lakuning Srengenge',
    16: 'Lakuning Kayu',
    17: 'Lakuning Gunung',
    18: 'Lakuning Paripurna',
  };

  const hari = hariList[date.getDay()];

  // Hitung offset pasaran relatif terhadap anchor date (misal 1 Jan 1900 = Selasa Pahing)
  const anchorDate = new Date('1900-01-01');
  const diffTime = date.getTime() - anchorDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
  
  // 1 Jan 1900 adalah Pahing (index 1 di array pasaran)
  const pasaranIndex = (1 + (diffDays % 5) + 5) % 5;
  const pasaran = pasaranList[pasaranIndex];

  const totalNeptu = neptuHari[hari] + neptuPasaran[pasaran];
  const watak = watakMap[totalNeptu] || 'Lakuning Kembang';

  return {
    hari,
    pasaran,
    neptu: totalNeptu,
    watak,
  };
}
