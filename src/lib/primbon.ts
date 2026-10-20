/**
 * Primbon & Wetonan Jawi Astrology Engine
 * Menghitung Dina, Pasaran, Neptu, Wuku, Watak Kelahiran, Pancasuda, Rakam,
 * Petungan Jodoh, Hari Baik (Ngopek Dina), dan Konversi Kalender Jawa.
 */

export interface WetonResult {
  tanggalMasehi: string; // YYYY-MM-DD
  formattedDate: string;
  dina: string; // Hari (Minggu, Senin, ...)
  dinaJawa: string; // Radite, Soma, Hanggara, Buda, Respation, Sukra, Tumpak
  neptuDina: number;
  pasaran: string; // Legi, Pahing, Pon, Wage, Kliwon
  pasaranAksara: string;
  neptuPasaran: number;
  neptuTotal: number;
  wuku: string;
  wukuMakna: string;
  lakuning: string; // Lakuning Lintang, Lakuning Mbulan, etc.
  lakuningDesc: string;
  pancasuda: string; // Tunggak Semi, Sri, etc.
  pancasudaDesc: string;
  rakam: string; // Sanggar Waringin, Demang Kandhuruhan, etc.
  rakamDesc: string;
  parasan: string; // Aras Kembang, Aras Tuding, etc.
  parasanDesc: string;
  sifatKarakter: {
    positif: string[];
    kelemahan: string[];
    ringkasan: string;
  };
  karirRezeki: {
    bidangCocok: string[];
    arahKejayaan: string; // Utara, Selatan, Barat, Timur
    nasihatFinansial: string;
  };
  warnaAura: {
    nama: string;
    hex: string;
    makna: string;
  };
  elemenJawa: string; // Tanah, Air, Api, Angin, Logam
  jodohIdealNeptu: number[];
  hariNaas: string;
}

export const DINA_LIST = [
  { nama: 'Minggu', jawa: 'Radite', neptu: 5, aksara: 'ꦔꦲꦢ꧀' },
  { nama: 'Senin', jawa: 'Soma', neptu: 4, aksara: 'ꦱꦼꦤꦶꦤ꧀' },
  { nama: 'Selasa', jawa: 'Hanggara', neptu: 3, aksara: 'ꦱꦭꦱ' },
  { nama: 'Rabu', jawa: 'Buda', neptu: 7, aksara: 'ꦉꦧꦸ' },
  { nama: 'Kamis', jawa: 'Respati', neptu: 8, aksara: 'ꦏꦩꦶꦱ꧀' },
  { nama: 'Jumat', jawa: 'Sukra', neptu: 6, aksara: 'ꦗꦸꦩꦸꦮꦃ' },
  { nama: 'Sabtu', jawa: 'Tumpak', neptu: 9, aksara: 'ꦱꦼꦠꦸ' },
];

export const PASARAN_LIST = [
  { nama: 'Legi', neptu: 5, aksara: 'ꦭꦼꦒꦶ', elemen: 'Kayu / Udara', arah: 'Timur', warna: 'Putih' },
  { nama: 'Pahing', neptu: 9, aksara: 'ꦥꦲꦶꦁ', elemen: 'Api', arah: 'Selatan', warna: 'Merah' },
  { nama: 'Pon', neptu: 7, aksara: 'ꦥꦺꦴꦤ꧀', elemen: 'Logam / Emas', arah: 'Barat', warna: 'Kuning' },
  { nama: 'Wage', neptu: 4, aksara: 'ꦮꦒꦺ', elemen: 'Air', arah: 'Utara', warna: 'Hitam' },
  { nama: 'Kliwon', neptu: 8, aksara: 'ꦏ꧀ꦭꦶꦮꦺꦴꦤ꧀', elemen: 'Tanah / Pusat', arah: 'Pusat (Tengah)', warna: 'Manca Warna' },
];

export const WUKU_LIST = [
  { nama: 'Sinta', makna: 'Dewa Batara Yamadipati - Tegas, berwibawa, disegani' },
  { nama: 'Landep', makna: 'Dewa Batara Mahadewa - Cerdas, tajam pemikirannya, tangkas' },
  { nama: 'Wukir', makna: 'Dewa Batara Mahayekti - Rendah hati, bijaksana, banyak kawan' },
  { nama: 'Kurantil', makna: 'Dewa Batara Langsur - Berparas rupawan, senang bepergian, lincah' },
  { nama: 'Tolu', makna: 'Dewa Batara Bayu - Berkemauan keras, berani, pantang mundur' },
  { nama: 'Gumbreg', makna: 'Dewa Batara Cakra - Senang berderma, suka damai, dicintai bawahan' },
  { nama: 'Warigalit', makna: 'Dewa Batara Asmara - Memikat hati, berjiwa seni tinggi, setia' },
  { nama: 'Warigagung', makna: 'Dewa Batara Maharesi - Cermat mengatur keuangan, pemikir strategis' },
  { nama: 'Julungwangi', makna: 'Dewa Batara Sambu - Harum namanya, berbudi luhur, berkarisma' },
  { nama: 'Sungsang', makna: 'Dewa Batara Gana - Pemberani, kuat tekadnya, pemecah masalah ulung' },
  { nama: 'Galungan', makna: 'Dewa Batara Kamajaya - Berhati teguh, suka menolong sesama, tabah' },
  { nama: 'Kuningan', makna: 'Dewa Batara Indra - Suka ketenangan, berbakat memimpin, disegani' },
  { nama: 'Langkir', makna: 'Dewa Batara Kala - Berani menghadapi tantangan, tangguh batin' },
  { nama: 'Mandasiya', makna: 'Dewa Batara Brama - Cepat tanggap, bersemangat membara, jujur' },
  { nama: 'Julungpujut', makna: 'Dewa Batara Guritna - Pandai berdiplomasi, tutur katanya menyejukkan' },
  { nama: 'Pahang', makna: 'Dewa Batara Tantra - Rajin bekerja, ulet berusaha, hemat' },
  { nama: 'Kuruwelut', makna: 'Dewa Batara Wisnu - Berwawasan luas, penyayang keluarga, berilmu' },
  { nama: 'Marakeh', makna: 'Dewa Batara Surenggana - Tenang batinnya, teliti, berwibawa' },
  { nama: 'Tambir', makna: 'Dewa Batara Siwah - Berjiwa adil, tidak suka kepura-puraan, kokoh' },
  { nama: 'Medangkungan', makna: 'Dewa Batara Basuki - Berbakat spiritual, suka meneliti hal mendalam' },
  { nama: 'Maktal', makna: 'Dewa Batara Sakri - Berenergi besar, senang membuka jalan baru' },
  { nama: 'Wuye', makna: 'Dewa Batara Kowera - Murah rezeki, suka memberi berkah, ramah' },
  { nama: 'Manahil', makna: 'Dewa Batara Citragotra - Berbudi pekerti luhur, terampil dalam karya' },
  { nama: 'Prangbakat', makna: 'Dewa Batara Bisma - Ksatria sejati, setia pada janji, pelindung' },
  { nama: 'Bala', makna: 'Dewa Batara Durga - Berani mengambil risiko, tangkas dalam krisis' },
  { nama: 'Wugu', makna: 'Dewa Batara Singajalma - Cerdas mengamati keadaan, waspada, bijak' },
  { nama: 'Wayang', makna: 'Dewa Batari Sri - Lambang kesuburan pangan, makmur, disayangi' },
  { nama: 'Kulawu', makna: 'Dewa Batara Sadana - Memiliki magnet rezeki, pintar berdagang' },
  { nama: 'Dukut', makna: 'Dewa Batara Sakra - Mandiri, pantang bergantung pada orang lain' },
  { nama: 'Watugunung', makna: 'Dewa Batara Anantaboga - Panjang umur, kaya pengalaman, berwibawa' },
];

/**
 * Benchmark reference date:
 * 2024-01-01 was Monday (Senin), Pasaran: Pahing.
 * Wuku on 2024-01-01: Warigagung (Index 7, 0-indexed).
 */
export function calculateWeton(dateStr: string): WetonResult {
  const [year, month, day] = dateStr.split('-').map(Number);
  const targetDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  // Reference date: 2024-01-01 (Monday Pahing, Wuku Warigagung)
  const refDate = new Date(Date.UTC(2024, 0, 1, 12, 0, 0));
  const diffDays = Math.round((targetDate.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));

  // Day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayIndex = targetDate.getUTCDay();
  const dinaInfo = DINA_LIST[dayIndex];

  // Pasaran: 2024-01-01 was Pahing (index 1 in Legi, Pahing, Pon, Wage, Kliwon)
  const pasaranIndex = ((1 + diffDays) % 5 + 5) % 5;
  const pasaranInfo = PASARAN_LIST[pasaranIndex];

  // Wuku calculation: 210-day cycle
  // 2024-01-01 was Day 1 (Monday) in Wuku Warigagung (index 7)
  // Day offset inside the 210-day cycle:
  // Base day for 2024-01-01 in wuku cycle: 7 * 7 + 1 = 50
  const wukuDay = ((50 + diffDays) % 210 + 210) % 210;
  const wukuIndex = Math.floor(wukuDay / 7);
  const wukuInfo = WUKU_LIST[wukuIndex];

  const neptuTotal = dinaInfo.neptu + pasaranInfo.neptu;

  // Lakuning based on Neptu Total
  const lakuningMap: Record<number, { nama: string; desc: string; aura: string; hex: string }> = {
    7: {
      nama: 'Lakuning Bumi',
      desc: 'Berwatak sabar, mengalah, cinta damai, dan suka melindungi seperti bumi yang menopang segala makhluk.',
      aura: 'Kuning Keemasan Bumi',
      hex: '#B8860B',
    },
    8: {
      nama: 'Lakuning Geni',
      desc: 'Bersemangat tinggi, dinamis, berjiwa ksatria, berani bersuara, dan pantang putus asa saat menghadapi rintangan.',
      aura: 'Merah Bara Menyala',
      hex: '#DC2626',
    },
    9: {
      nama: 'Lakuning Angin',
      desc: 'Lincah, fleksibel, mudah beradaptasi di lingkungan baru, berwawasan luas, dan tidak menyukai tekanan.',
      aura: 'Biru Langit Sejuk',
      hex: '#0284C7',
    },
    10: {
      nama: 'Pendhito Kang Lelaku',
      desc: 'Memiliki kecerdasan spiritual, suka merantau mencari ilmu, pemikir filosofis, dan senang menolong sesama.',
      aura: 'Ungu Kedalaman Spiritual',
      hex: '#7C3AED',
    },
    11: {
      nama: 'Lakuning Setan (Pemberani Tangguh)',
      desc: 'Ulet, gigih, memiliki nyali baja, tidak gentar menghadapi kesulitan besar, dan sangat mandiri dalam berkarya.',
      aura: 'Oranye Tembaga Berani',
      hex: '#EA580C',
    },
    12: {
      nama: 'Lakuning Kembang',
      desc: 'Menawan, santun, menyenangkan siapa pun yang berada di dekatnya, suka kedamaian, dan pemaaf.',
      aura: 'Merah Muda Anggun',
      hex: '#DB2777',
    },
    13: {
      nama: 'Lakuning Lintang',
      desc: 'Pemberi petunjuk di malam gulita, rendah hati, tidak suka pamer, namun karyanya bersinar terang dan dihormati.',
      aura: 'Putih Kemilau Bintang',
      hex: '#E2E8F0',
    },
    14: {
      nama: 'Lakuning Mbulan (Bulan Purnama)',
      desc: 'Penerang dalam kegelapan, lembut hatinya, bijaksana, pendengar yang baik, dan menjadi tempat berkeluh kesah.',
      aura: 'Perak Sinar Rembulan',
      hex: '#94A3B8',
    },
    15: {
      nama: 'Lakuning Srengenge (Matahari)',
      desc: 'Hangat, berwibawa, berjiwa pemimpin alami, berenergi besar, dan menerangi serta menghidupi sekitarnya.',
      aura: 'Kuning Surya Keemasan',
      hex: '#F59E0B',
    },
    16: {
      nama: 'Lakuning Bumi Subur',
      desc: 'Teguh pendirian, pengayom sejati, penyubur kemakmuran keluarga, serta sangat tabah dan sabar.',
      aura: 'Hijau Zamrud Kesuburan',
      hex: '#059669',
    },
    17: {
      nama: 'Lakuning Gunung',
      desc: 'Kuat, kokoh tak tergoyahkan, memiliki cita-cita setinggi angkasa, misterius, dan dihormati kawan maupun lawan.',
      aura: 'Biru Safir Ningrat',
      hex: '#2563EB',
    },
    18: {
      nama: 'Lakuning Paripurna',
      desc: 'Memiliki karisma kepemimpinan sempurna, wibawa raja, disegani khalayak luas, dan memiliki tuah keberuntungan.',
      aura: 'Emas Keraton Luhur',
      hex: '#D97706',
    },
  };

  const lakuning = lakuningMap[neptuTotal] || lakuningMap[14];

  // Pancasuda (Neptu % 7)
  const pancasudaList = [
    { nama: 'Lebu Katiup Angin', desc: 'Sering menghadapi ujian perjalanan hidup, namun jika sabar akan menemukan jalan kesuksesan tak terduga.' },
    { nama: 'Wasesa Segara', desc: 'Berhati seluas samudra, pemaaf, berlimpah rezeki dan keberuntungan, suka memberi sedekah.' },
    { nama: 'Tunggak Semi', desc: 'Rezekinya selalu tumbuh dan mengalir terus-menerus, seperti tunas pohon yang bersemi kembali.' },
    { nama: 'Satria Wibawa', desc: 'Mendapatkan kehormatan, wibawa, derajat tinggi, serta disayangi oleh pimpinan dan masyarakat.' },
    { nama: 'Sumur Sinaba', desc: 'Menjadi sumber ilmu, tempat banyak orang meminta nasihat dan petuah bijak.' },
    { nama: 'Satria Wirang', desc: 'Pernah mengalami ujian rasa malu atau fitnah, namun jika istiqomah derajatnya akan dinaikkan setinggi langit.' },
    { nama: 'Bumi Kapetak', desc: 'Pekerja keras yang tahan uji banting, tabah memikul beban keluarga, kelak menuai hasil makmur.' },
  ];
  const pancasudaIndex = neptuTotal % 7;
  const pancasuda = pancasudaList[pancasudaIndex];

  // Rakam (Neptu % 6)
  const rakamList = [
    { nama: 'Kala Tinantang', desc: 'Pemberani, tidak takut pada bahaya, memiliki mental baja dalam persaingan hidup.' },
    { nama: 'Demang Kandhuruhan', desc: 'Berbakat memimpin, disegani rekan kerja, tegas dalam mengambil keputusan penting.' },
    { nama: 'Sanggar Waringin', desc: 'Sosok pengayom keluarga dan lingkungan, memberi keteduhan dan tempat bernaung sesama.' },
    { nama: 'Mantri Sinaroja', desc: 'Disukai pimpinan, selalu memperoleh kemudahan dalam berkarier dan meraih jabatan.' },
    { nama: 'Macan Ketawan', desc: 'Cermat dan waspada terhadap segala kemungkinan, memiliki intuisi tajam mendeteksi niat orang.' },
    { nama: 'Nuju Pati', desc: 'Disarankan memperbanyak tirakat, doa, dan sedekah untuk menetralkan energi negatif.' },
  ];
  const rakam = rakamList[neptuTotal % 6];

  // Parasan (Pangarasan)
  const parasanList = [
    { nama: 'Aras Kembang', desc: 'Memiliki pesona daya tarik alami yang kuat, memikat simpati lawan bicara dan disukai banyak orang.' },
    { nama: 'Aras Tuding', desc: 'Sering ditunjuk memegang tanggung jawab besar, diandalkan saat situasi genting.' },
    { nama: 'Laku Bintang', desc: 'Senang kesunyian dan perenungan, pemikir dalam keheningan yang menghasilkan ide cemerlang.' },
    { nama: 'Laku Pandhita', desc: 'Berjiwa alim, menjunjung tinggi nilai moral, etika, dan kejujuran.' },
    { nama: 'Laku Ksatria', desc: 'Berani menegakkan kebenaran, membela yang lemah, dan berjiwa pelindung.' },
  ];
  const parasan = parasanList[neptuTotal % 5];

  // Karakter spesifik gabungan Dina + Pasaran
  const sifatSpesifik: Record<string, { positif: string[]; kelemahan: string[]; ringkasan: string; karir: string[]; arah: string }> = {
    'Minggu Legi': {
      positif: ['Tegas', 'Dermawan', 'Memiliki selera tinggi', 'Teguh memegang rahasia'],
      kelemahan: ['Terkadang keras kepala', 'Cenderung menyimpan unek-unek'],
      ringkasan: 'Sosok berwibawa yang mengutamakan harga diri dan kesetiakawanan tinggi.',
      karir: ['Wirausaha mandiri', 'Pejabat pemerintahan', 'Arsitek / Desainer', 'Diplomat'],
      arah: 'Timur dan Utara',
    },
    'Minggu Pahing': {
      positif: ['Berwawasan luas', 'Hemat cermat', 'Pandai bergaul', 'Tekun beribadah'],
      kelemahan: ['Mudah curiga', 'Sulit memaafkan jika dikhianati'],
      ringkasan: 'Pribadi yang tenang di luar namun menyimpan energi dan kecerdasan analisis tajam.',
      karir: ['Akuntan / Perbankan', 'Peneliti', 'Guru / Dosen', 'Agrobisnis'],
      arah: 'Selatan dan Barat',
    },
    'Minggu Pon': {
      positif: ['Pemberani', 'Suka menolong orang tertindas', 'Cerdas', 'Kreatif'],
      kelemahan: ['Suka mendominasi pembicaraan', 'Cepat bosan dengan rutinitas monoton'],
      ringkasan: 'Ksatria berjiwa penolong yang tidak suka melihat ketidakadilan di sekitarnya.',
      karir: ['Advokat / Hukum', 'Jurnalis / Media', 'Event Organizer', 'Manajer Proyek'],
      arah: 'Barat dan Utara',
    },
    'Minggu Wage': {
      positif: ['Berbudi halus', 'Pemaaf', 'Setia kawan', 'Rajin beribadah'],
      kelemahan: ['Mudah dipengaruhi bujuk rayu', 'Kurang percaya diri di awal'],
      ringkasan: 'Pribadi teduh yang membawa kedamaian dan ketenteraman dalam keluarga.',
      karir: ['Bidang Kesehatan', 'Pekerja Sosial', 'Pendidik', 'Kuliner'],
      arah: 'Utara dan Timur',
    },
    'Minggu Kliwon': {
      positif: ['Pendiam berwibawa', 'Pemaaf', 'Sederhana', 'Punya daya batin kuat'],
      kelemahan: ['Jika marah sulit diredakan', 'Terkadang terlalu tertutup'],
      ringkasan: 'Sosok spiritual yang mendalam, memiliki intuisi kuat dan dihormati di lingkungannya.',
      karir: ['Konsultan', 'Spiritualis / Budayawan', 'Penulis', 'Dosen Filsafat'],
      arah: 'Pusat (Segala Arah Membawa Berkah)',
    },
    'Senin Legi': {
      positif: ['Ceria', 'Suka menghibur sesama', 'Murah senyum', 'Cepat belajar hal baru'],
      kelemahan: ['Mudah bimbang jika dihadapkan pada banyak pilihan'],
      ringkasan: 'Sosok menyenangkan yang selalu dirindukan kehadirannya dalam lingkaran pertemanan.',
      karir: ['Entertainment', 'Public Relations', 'Pariwisata', 'Pemasaran Kreatif'],
      arah: 'Timur dan Selatan',
    },
    'Senin Pahing': {
      positif: ['Pekerja keras', 'Tahan banting', 'Jujur', 'Cinta keluarga'],
      kelemahan: ['Mudah tersinggung harga dirinya', 'Terkadang pendendam'],
      ringkasan: 'Pekerja ulet yang pantang menyerah sebelum cita-cita besarnya terwujud.',
      karir: ['Teknisi / Engineering', 'Perkebunan', 'Manajemen Operasional', 'Kontraktor'],
      arah: 'Selatan dan Timur',
    },
    'Senin Pon': {
      positif: ['Lembut tutur katanya', 'Suka damai', 'Sopan santun tinggi', 'Penengah yang adil'],
      kelemahan: ['Terkadang terlalu mengalah sehingga dimanfaatkan orang lain'],
      ringkasan: 'Pribadi beretika luhur yang memegang teguh tata krama warisan leluhur.',
      karir: ['Diplomasi', 'Humas Korporat', 'Penyiar / MC', 'Konselor Pernikahan'],
      arah: 'Barat dan Selatan',
    },
    'Senin Wage': {
      positif: ['Setia pada janji', 'Hemat', 'Penyabar', 'Pandai menyimpan rahasia'],
      kelemahan: ['Cenderung pesimis jika menemui kegagalan pertama'],
      ringkasan: 'Sosok setia yang dapat dipercaya sepenuhnya dalam urusan amanah dan rahasia.',
      karir: ['Administrasi Keuangan', 'Arsiparis', 'Apoteker', 'Pengelola Toko'],
      arah: 'Utara dan Barat',
    },
    'Senin Kliwon': {
      positif: ['Rendah hati', 'Cerdas', 'Suka prihatin / tirakat', 'Penyayang'],
      kelemahan: ['Sensitif perasaannya', 'Mudah cemas memikirkan masa depan'],
      ringkasan: 'Pribadi yang diberkahi kedalaman batin dan doa yang mustajab karena ketulusannya.',
      karir: ['Akademisi', 'Peneliti Sains', 'Psikolog', 'Pekerja Kemanusiaan'],
      arah: 'Timur dan Utara',
    },
    'Selasa Legi': {
      positif: ['Berani bertindak', 'Cepat tanggap', 'Suka petualangan', 'Loyal'],
      kelemahan: ['Cepat marah jika disepelekan', 'Kurang sabar dalam proses lama'],
      ringkasan: 'Pribadi dinamis dengan semangat api yang membara dan siap memimpin pergerakan.',
      karir: ['Militer / Kepolisian', 'Olahragawan', 'Pebisnis Rintisan (Startup)', 'Politikus'],
      arah: 'Timur dan Barat',
    },
    'Selasa Pahing': {
      positif: ['Santun', 'Menawan', 'Suka menolong tanpa pamrih', 'Pandai bergaul'],
      kelemahan: ['Mudah tergiur sanjungan manis', 'Boros untuk hal estetika'],
      ringkasan: 'Pribadi yang memesona dan disukai berbagai kalangan masyarakat.',
      karir: ['Fashion & Busana', 'Perhotelan', 'Desain Interior', 'Seniman'],
      arah: 'Selatan dan Utara',
    },
    'Selasa Pon': {
      positif: ['Setia kawan', 'Rajin', 'Tidak suka merepotkan orang lain', 'Mandiri'],
      kelemahan: ['Cenderung tertutup mengenai kesulitan pribadinya'],
      ringkasan: 'Sosok pekerja mandiri yang mengutamakan integritas dan pantang meminta-minta.',
      karir: ['Wiraswasta', 'Logistik', 'Industri Kreatif', 'Perdagangan'],
      arah: 'Barat dan Timur',
    },
    'Selasa Wage': {
      positif: ['Sabar', 'Pemaaf', 'Tulus', 'Mengalah demi kebaikan bersama'],
      kelemahan: ['Kurang agresif dalam mengambil peluang besar'],
      ringkasan: 'Sosok air penyejuk yang meredakan ketegangan dalam keluarga maupun lingkungan.',
      karir: ['Perawat / Medis', 'Staf Edukasi', 'Kerajinan Tangan', 'Perpustakaan'],
      arah: 'Utara dan Selatan',
    },
    'Selasa Kliwon': {
      positif: ['Ramah', 'Pandai berbicara', 'Setia pada ikrar', 'Berjiwa welas asih'],
      kelemahan: ['Suka bimbang dalam menentukan pilihan jodoh atau karier'],
      ringkasan: 'Sosok Anggoro Kasih yang sarat karisma, kata-katanya didengar dan dihormati sesama.',
      karir: ['Negosiator', 'Public Speaker', 'Pendidik Agama', 'Konsultan SDM'],
      arah: 'Pusat dan Timur',
    },
    'Rabu Legi': {
      positif: ['Menjunjung tinggi keadilan', 'Jujur', 'Menghormati tata krama', 'Pemaaf'],
      kelemahan: ['Suka membela diri jika merasa benar meskipun memperpanjang debat'],
      ringkasan: 'Sosok ksatria yang memegang teguh kejujuran dan membela kebenaran tanpa pandang bulu.',
      karir: ['Hakim / Notaris', 'Auditor Keuangan', 'Pengawas Proyek', 'Guru Besar'],
      arah: 'Timur dan Utara',
    },
    'Rabu Pahing': {
      positif: ['Teduh', 'Penyayang', 'Pandai menjaga emosi', 'Suka beramal'],
      kelemahan: ['Mudah terlena oleh kenyamanan zona mapan'],
      ringkasan: 'Pribadi penyabar yang memancarkan aura ketenangan bagi siapa saja di sekelilingnya.',
      karir: ['Manajer Korporat', 'Investasi / Saham', 'Penerbitan Buku', 'Bisnis Properti'],
      arah: 'Selatan dan Timur',
    },
    'Rabu Pon': {
      positif: ['Sopan', 'Cerdas', 'Berpenampilan menarik', 'Tertib dan teratur'],
      kelemahan: ['Suka dipuji atas prestasinya', 'Cemas terhadap hal sepele'],
      ringkasan: 'Pribadi elegan berdaya pikat tinggi dengan pemikiran strategis dan terukur.',
      karir: ['Arsitektur', 'Brand Specialist', 'Eksekutif Perusahaan', 'Diplomat'],
      arah: 'Barat dan Selatan',
    },
    'Rabu Wage': {
      positif: ['Cerdas', 'Mudah bergaul', 'Cermat menganalisis', 'Menepati janji'],
      kelemahan: ['Kadang suka meremehkan hal yang dianggap sepele'],
      ringkasan: 'Pribadi intelektual yang cekatan dan memiliki solusi praktis atas masalah rumit.',
      karir: ['Programmer / IT', 'Analis Data', 'Jurnalistik Investigasi', 'Dosen'],
      arah: 'Utara dan Barat',
    },
    'Rabu Kliwon': {
      positif: ['Berjiwa pemimpin', 'Menepati janji', 'Disiplin', 'Pemberi semangat sesama'],
      kelemahan: ['Kurang peka terhadap perasaan halus orang yang pendiam'],
      ringkasan: 'Pemimpin yang tegas, berkarisma, dan mampu menggerakkan orang banyak menuju visi luhur.',
      karir: ['Direktur Perusahaan', 'Ketua Organisasi', 'Konsultan Bisnis', 'Birokrat'],
      arah: 'Timur dan Selatan',
    },
    'Kamis Legi': {
      positif: ['Bercita-cita mulia', 'Murah hati', 'Banyak kawan', 'Pandai bergaul'],
      kelemahan: ['Suka dipuji, agak boros dalam menjamu tamu'],
      ringkasan: 'Sosok tuan rumah yang dermawan, ramah, dan selalu membuka pintu bagi sahabatnya.',
      karir: ['Bisnis F&B (Restoran)', 'Pariwisata', 'Event Planner', 'Politik Kebangsaan'],
      arah: 'Timur dan Barat',
    },
    'Kamis Pahing': {
      positif: ['Cerdas', 'Gigih', 'Bercita-cita tinggi', 'Cinta kebersihan & kerapian'],
      kelemahan: ['Curigaan, jika marah sulit dipadamkan'],
      ringkasan: 'Pribadi tangguh berpikiran maju yang selalu ingin mencapai kesempurnaan hidup.',
      karir: ['Kedokteran', 'Teknologi Tinggi', 'Manajemen Senior', 'Dosen Sains'],
      arah: 'Selatan dan Utara',
    },
    'Kamis Pon': {
      positif: ['Cekatan', 'Hemat', 'Pemberi rezeki bagi keluarga', 'Penyabar'],
      kelemahan: ['Sering memendam perasaan sakit hati'],
      ringkasan: 'Tulang punggung keluarga yang ulet, setia, dan membawa keberkahan materi yang awet.',
      karir: ['Perdagangan Ekspor Impor', 'Perbankan', 'Perkebunan', 'Pengrajin'],
      arah: 'Barat dan Utara',
    },
    'Kamis Wage': {
      positif: ['Tahan uji', 'Berhati mulia', 'Pandai menyimpan harta', 'Patuh orang tua'],
      kelemahan: ['Kadang keras kepala jika prinsip dasarnya diganggu'],
      ringkasan: 'Pribadi yang kokoh bagai karang, berbakti kepada keluarga dan leluhur.',
      karir: ['PNS / Aparatur Negara', 'Keuangan', 'Pendidikan', 'Pertanian'],
      arah: 'Utara dan Timur',
    },
    'Kamis Kliwon': {
      positif: ['Penuh kasih sayang', 'Ramah', 'Suka menolong', 'Mudah berempati'],
      kelemahan: ['Cenderung bimbang saat menentukan keputusan besar hidup'],
      ringkasan: 'Sosok pengayom berhati emas yang selalu mendahulukan kepentingan orang tersayang.',
      karir: ['Psikologi / Konseling', 'Pekerja Sosial', 'Dokter / Bidan', 'Budayawan'],
      arah: 'Timur dan Selatan',
    },
    'Jumat Legi': {
      positif: ['Jujur tanpa pamrih', 'Suka bersedekah', 'Teguh memegang komitmen', 'Rendah hati'],
      kelemahan: ['Terkadang terlalu polos hingga mudah dibohongi orang licik'],
      ringkasan: 'Weton sakral yang penuh berkah, tulus batinnya dan disayangi para malaikat.',
      karir: ['Pemuka Agama', 'Filantropis / Yayasan Amal', 'Guru', 'Penyembuh'],
      arah: 'Timur dan Utara',
    },
    'Jumat Pahing': {
      positif: ['Cerdas berbicara', 'Kreatif', 'Banyak ide segar', 'Menyenangkan'],
      kelemahan: ['Suka membual jika tidak dibimbing, mudah tergoda kemewahan'],
      ringkasan: 'Pribadi penuh pesona dan daya tarik kreatif yang mampu menghidupkan suasana sepi.',
      karir: ['Broadcasting', 'Pemasaran Digital', 'Content Creator', 'Dunia Hiburan'],
      arah: 'Selatan dan Barat',
    },
    'Jumat Pon': {
      positif: ['Tenang', 'Bijaksana', 'Suka kedamaian', 'Pandai beradaptasi'],
      kelemahan: ['Suka menyendiri hingga terkesan menjauh dari keramaian'],
      ringkasan: 'Pribadi tenang yang memiliki kedalaman spiritual dan intuisi batin tajam.',
      karir: ['Peneliti Alam', 'Penulis Buku', 'Pengajar Meditasi', 'Arsitek Lanskap'],
      arah: 'Barat dan Utara',
    },
    'Jumat Wage': {
      positif: ['Pemberani', 'Jujur', 'Suka membela kebenaran', 'Tidak gentar bahaya'],
      kelemahan: ['Bicaranya blak-blakan sehingga kadang melukai perasaan orang'],
      ringkasan: 'Ksatria sejati yang lurus jalannya, membenci dusta dan kepalsuan.',
      karir: ['Aktivis HAM', 'Jurnalis Investigasi', 'Pengacara', 'Penyelidik'],
      arah: 'Utara dan Timur',
    },
    'Jumat Kliwon': {
      positif: ['Sangat berwibawa', 'Menepati janji', 'Murah hati', 'Memiliki tuah spiritual'],
      kelemahan: ['Jika tersinggung sulit meredakan kemarahannya'],
      ringkasan: 'Salah satu weton paling dihormati dalam tradisi Jawa; berdaya linuwih dan penuh magnet rezeki.',
      karir: ['Tokoh Bangsa', 'Pemimpin Spiritual', 'Eksekutif Puncak', 'Diplomat Ulung'],
      arah: 'Pusat (Segala Arah Membuka Jalan)',
    },
    'Sabtu Legi': {
      positif: ['Santai', 'Pandai bergaul', 'Banyak kawan setia', 'Pemaaf'],
      kelemahan: ['Sering meremehkan masalah penting di saat awal'],
      ringkasan: 'Pribadi bersahaja yang membawa tawa dan keringanan di tengah beban kehidupan berat.',
      karir: ['Industri Kreatif', 'Pariwisata', 'Hospitality', 'Kuliner Kekinian'],
      arah: 'Timur dan Selatan',
    },
    'Sabtu Pahing': {
      positif: ['Karisma tinggi', 'Pemberani', 'Berdikari', 'Punya cita-cita raksasa'],
      kelemahan: ['Cepat emosi jika ditantang secara terbuka, ego tinggi'],
      ringkasan: 'Neptu tertinggi (18); berwatak matahari agung yang siap menjadi mercusuar kehidupan.',
      karir: ['Pimpinan Negara / Daerah', 'CEO Korporasi', 'Jenderal / Komandan', 'Konglomerat'],
      arah: 'Selatan dan Barat',
    },
    'Sabtu Pon': {
      positif: ['Sabar', 'Pekerja keras', 'Tahan banting', 'Penyayang keluarga'],
      kelemahan: ['Mudah tersinggung dan suka memendam dendam jika dipermalukan'],
      ringkasan: 'Pribadi kokoh yang membangun kesuksesan batu demi batu hingga menjadi istana megah.',
      karir: ['Kontraktor Bangunan', 'Pertambangan', 'Manufaktur', 'Properti'],
      arah: 'Barat dan Utara',
    },
    'Sabtu Wage': {
      positif: ['Teguh memegang rahasia', 'Hemat', 'Penyendiri yang tangguh', 'Mandiri'],
      kelemahan: ['Cenderung curiga pada orang asing yang baru dikenal'],
      ringkasan: 'Sosok mandiri yang tidak pernah mengeluh, tahan dalam kesendirian dan berjiwa baja.',
      karir: ['Teknologi Keamanan', 'Akuntansi Forensik', 'Riset Laboratorium', 'Pengrajin Emas'],
      arah: 'Utara dan Selatan',
    },
    'Sabtu Kliwon': {
      positif: ['Sabar', 'Rendah hati', 'Suka menolong sesama', 'Dihormati orang banyak'],
      kelemahan: ['Mudah iba hingga terkadang tertipu orang yang berpura-pura susah'],
      ringkasan: 'Sosok pengayom berjiwa luhur (Lakuning Bumi Subur) yang selalu memberi berkah rezeki.',
      karir: ['Pendidik', 'Yayasan Sosial', 'Dokter Keluarga', 'Pengusaha Dermawan'],
      arah: 'Pusat dan Timur',
    },
  };

  const wetonKey = `${dinaInfo.nama} ${pasaranInfo.nama}`;
  const sifatDefault = {
    positif: ['Sabar', 'Ulet', 'Jujur', 'Budi pekerti luhur'],
    kelemahan: ['Kadang ragu dalam mengambil keputusan kilat'],
    ringkasan: 'Pribadi yang mengutamakan keselarasan hidup (harmoni batin) sesuai filosofi Jawa.',
    karir: ['Wirausaha Mandiri', 'Manajemen', 'Pendidikan', 'Kreatif'],
    arah: 'Timur dan Selatan',
  };

  const sifat = sifatSpesifik[wetonKey] || sifatDefault;

  // Jodoh ideal neptu (matches based on primbon: Ratu, Jodoh, Tinari, Pesthi)
  // Jodoh rule: (Neptu 1 + Neptu 2) mod 8 in [2, 3, 5, 8]
  const idealNeptuList: number[] = [];
  for (let n = 7; n <= 18; n++) {
    const sum = neptuTotal + n;
    const sisa = sum % 8;
    // Ratu (2), Jodoh (3), Tinari (5), Pesthi (0 / 8)
    if (sisa === 2 || sisa === 3 || sisa === 5 || sisa === 0) {
      idealNeptuList.push(n);
    }
  }

  // Hari Naas Weton (Was Gede & Was Telu)
  // Was Gede: hari yang sama pasaran ke-4 atau hari ke-4
  const dinaNaasIndex = (dayIndex + 3) % 7;
  const pasaranNaasIndex = (pasaranIndex + 2) % 5;
  const hariNaas = `${DINA_LIST[dinaNaasIndex].nama} ${PASARAN_LIST[pasaranNaasIndex].nama} (Dina Was Gede)`;

  const formattedDate = targetDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return {
    tanggalMasehi: dateStr,
    formattedDate,
    dina: dinaInfo.nama,
    dinaJawa: dinaInfo.jawa,
    neptuDina: dinaInfo.neptu,
    pasaran: pasaranInfo.nama,
    pasaranAksara: pasaranInfo.aksara,
    neptuPasaran: pasaranInfo.neptu,
    neptuTotal,
    wuku: wukuInfo.nama,
    wukuMakna: wukuInfo.makna,
    lakuning: lakuning.nama,
    lakuningDesc: lakuning.desc,
    pancasuda: pancasuda.nama,
    pancasudaDesc: pancasuda.desc,
    rakam: rakam.nama,
    rakamDesc: rakam.desc,
    parasan: parasan.nama,
    parasanDesc: parasan.desc,
    sifatKarakter: {
      positif: sifat.positif,
      kelemahan: sifat.kelemahan,
      ringkasan: sifat.ringkasan,
    },
    karirRezeki: {
      bidangCocok: sifat.karir,
      arahKejayaan: sifat.arah,
      nasihatFinansial: 'Jaga laku prihatin, sisihkan 20% rezeki untuk sedekah subuh, dan perkuat silaturahmi.',
    },
    warnaAura: {
      nama: lakuning.aura,
      hex: lakuning.hex,
      makna: 'Warna vibrasi energi batin yang memperkuat daya tarik keberuntungan Anda.',
    },
    elemenJawa: pasaranInfo.elemen,
    jodohIdealNeptu: idealNeptuList,
    hariNaas,
  };
}

/**
 * Petungan Jodoh (Kecocokan Pasangan Berdasarkan Neptu Pria & Wanita)
 */
export interface JodohResult {
  pria: WetonResult;
  wanita: WetonResult;
  neptuPria: number;
  neptuWanita: number;
  neptuTotal: number;
  kategori: string; // PEGAT, RATU, JODOH, TOPO, TINARI, PADU, SUJANAN, PESTHI
  kategoriAksara: string;
  artosJawa: string;
  skorKecocokan: number; // 0 - 100
  maknaLengkap: string;
  potensiDinamika: string;
  solusiPenyelaras: {
    ruwatan: string;
    amalan: string;
    tipsHarmonis: string;
  };
}

export function hitungJodoh(tglPria: string, tglWanita: string): JodohResult {
  const pria = calculateWeton(tglPria);
  const wanita = calculateWeton(tglWanita);

  const neptuTotal = pria.neptuTotal + wanita.neptuTotal;
  const sisa = neptuTotal % 8;

  // 1: Pegat, 2: Ratu, 3: Jodoh, 4: Topo, 5: Tinari, 6: Padu, 7: Sujanan, 0/8: Pesthi
  const kategoriMap: Record<number, {
    kategori: string;
    aksara: string;
    artos: string;
    skor: number;
    makna: string;
    dinamika: string;
    ruwatan: string;
    amalan: string;
    tips: string;
  }> = {
    1: {
      kategori: 'PEGAT',
      aksara: 'ꦥꦼꦒꦠ꧀',
      artos: 'Pisah / Ujian Kesabaran Batin',
      skor: 55,
      makna: 'Hubungan ini berpotensi sering menemui ujian masalah ekonomi, kekuasaan, atau campur tangan orang luar yang menguji komitmen.',
      dinamika: 'Keduanya memiliki ego yang sama-sama kuat. Bila tidak ada yang mau mengalah, percikan kecil dapat membesar.',
      ruwatan: 'Slametan brokohan jenang sengkolo dan sedekah beras kuning untuk menolak balak perpisahan.',
      amalan: 'Rutin berpuasa weton masing-masing dan perbanyak musyawarah dengan kepala dingin sebelum mengambil keputusan penting.',
      tips: 'Jadikan komunikasi jujur tanpa prasangka sebagai kunci utama. Jangan biarkan pihak ketiga terlalu ikut campur.',
    },
    2: {
      kategori: 'RATU',
      aksara: 'ꦫꦠꦸ',
      artos: 'Dihormati & Berwibawa Bak Raja Permaisuri',
      skor: 96,
      makna: 'Pasangan ini memang sudah jodohnya. Sangat dihargai, disegani, dan menjadi panutan di mata keluarga besar serta tetangga.',
      dinamika: 'Hubungan sangat seimbang dan penuh rasa saling menghormati derajat masing-masing.',
      ruwatan: 'Syukuran tumpeng robyong sebagai rasa syukur kepada Gusti Ingkang Murbeng Dumadi.',
      amalan: 'Menjaga kerendahan hati, bersedekah kepada anak yatim dan kaum dhuafa agar karunia tetap langgeng.',
      tips: 'Pertahankan wibawa keluarga dan jadilah pelindung bagi sanak saudara yang membutuhkan pertolongan.',
    },
    3: {
      kategori: 'JODOH',
      aksara: 'ꦗꦺꦴꦣꦺꦴꦃ',
      artos: 'Cocok Lahir Batin & Langgeng Hingga Kaki Nini',
      skor: 98,
      makna: 'Pasangan yang benar-benar saling menerima kelebihan dan kekurangan satu sama lain. Rumah tangganya rukun, harmonis, dan tentram.',
      dinamika: 'Chemistry batin sangat kuat. Satu berpikir, yang lain mengerti tanpa perlu banyak kata terucap.',
      ruwatan: 'Slametan kenduri tumpeng punar (kuning) sebagai lambang kemuliaan cinta abadi.',
      amalan: 'Rutin sholat berjamaah atau ibadah bersama dan memelihara kebiasaan saling memaafkan sebelum tidur.',
      tips: 'Terus pupuk romantisme sederhana sehari-hari agar bara asmara tidak padam tergerus usia.',
    },
    4: {
      kategori: 'TOPO',
      aksara: 'ꦠꦥ',
      artos: 'Prihatin di Awal, Memetik Kejayaan di Hari Tua',
      skor: 78,
      makna: 'Di awal pernikahan sering mengalami masa sulit (prihatin) dalam hal ekonomi atau penyesuaian karakter, namun kelak sukses dan makmur berkah.',
      dinamika: 'Diuji ketabahan bersama. Jika berhasil melewati 5 tahun pertama, kekayaan dan kebahagiaan akan berlipat ganda.',
      ruwatan: 'Tirakat melek bengi dan sedekah pangan bagi orang yang berpuasa.',
      amalan: 'Rajin menabung bersama, menghindari gaya hidup konsumtif berlebihan di awal rumah tangga.',
      tips: 'Saling menyemangati saat roda kehidupan berada di bawah. Ingatlah bahwa keprihatinan awal adalah pupuk kejayaan masa depan.',
    },
    5: {
      kategori: 'TINARI',
      aksara: 'ꦠꦶꦤꦫꦶ',
      artos: 'Murah Rezeki & Berlimpah Kebahagiaan',
      skor: 92,
      makna: 'Akan menemukan kebahagiaan dan kemudahan dalam mencari sandang pangan. Sering mendapat rezeki yang tidak terduga-duga.',
      dinamika: 'Keluarga ceria, jarang kekurangan materi, dan anak-anak tumbuh dengan riang gembira.',
      ruwatan: 'Slametan tumpeng golong untuk mempererat kerukunan dan rasa syukur rezeki.',
      amalan: 'Memperbanyak infak dan sedekah jariyah agar rezeki mengalir berkah dan tidak menimbulkan penyakit hati.',
      tips: 'Gunakan kemudahan rezeki untuk investasi masa depan pendidikan anak dan bekal ibadah.',
    },
    6: {
      kategori: 'PADU',
      aksara: 'ꦥꦢꦸ',
      artos: 'Sering Beda Pendapat Namun Tidak Sampai Cerai',
      skor: 68,
      makna: 'Dalam rumah tangga sering terjadi adu mulut atau perdebatan sengit tentang hal-hal sepele, namun cinta mereka tetap mengikat hingga tidak sampai bercerai.',
      dinamika: 'Dua kepala keras yang sama-sama pintar berargumen. Suasana rumah ramai dengan diskusi dan kritik.',
      ruwatan: 'Slametan jenang pethak (putih) dan jenang abang untuk mendinginkan suhu batin.',
      amalan: 'Terapkan jeda 10 menit saat emosi memuncak; jangan menanggapi kemarahan pasangan dengan nada tinggi.',
      tips: 'Belajarlah tertawa menertawakan perbedaan kecil. Beda pendapat adalah warna, bukan alasan untuk merendahkan pasangan.',
    },
    7: {
      kategori: 'SUJANAN',
      aksara: 'ꦱꦸꦗꦤꦤ꧀',
      artos: 'Ujian Perselingkuhan / Prasangka Cemburu',
      skor: 60,
      makna: 'Diuji dengan pertengkaran akibat rasa cemburu, prasangka, atau adanya godaan dari orang ketiga yang mencoba masuk.',
      dinamika: 'Rasa percaya rawan goyah jika ada yang suka menutup-nutupi ponsel atau aktivitas pribadi.',
      ruwatan: 'Ruwatan buang sengkolo dan slametan kupat luwar sebagai simbol terbebas dari jeratan niat buruk pihak luar.',
      amalan: 'Transparansi penuh dalam keuangan dan komunikasi. Hindari privasi berlebihan yang memicu kecurigaan.',
      tips: 'Teguhkan komitmen ikrar suci perkawinan. Batasi pertemanan akrab dengan lawan jenis di luar koridor profesional.',
    },
    0: {
      kategori: 'PESTHI',
      aksara: 'ꦥꦺꦱ꧀ꦛꦶ',
      artos: 'Tentram, Adem Ayem & Damai Sentosa',
      skor: 95,
      makna: 'Rumah tangganya senantiasa adem ayem, rukun, dan tenteram. Meski ada sedikit kerikil kehidupan, tidak akan merusak keharmonisan keluarga.',
      dinamika: 'Saling memahami kebutuhan batin. Rumah menjadi surga kecil yang selalu dirindukan saat bepergian jauh.',
      ruwatan: 'Slametan tumpeng megana dengan doa keselamatan lahir batin.',
      amalan: 'Menjaga kebiasaan makan bersama dan mengucap syukur atas ketenteraman batin yang dinikmati.',
      tips: 'Lindungi kebahagiaan keluarga dari penyakit ‘ain dengan tidak pamer kebahagiaan secara berlebihan di media sosial.',
    },
  };

  const info = kategoriMap[sisa];

  return {
    pria,
    wanita,
    neptuPria: pria.neptuTotal,
    neptuWanita: wanita.neptuTotal,
    neptuTotal,
    kategori: info.kategori,
    kategoriAksara: info.aksara,
    artosJawa: info.artos,
    skorKecocokan: info.skor,
    maknaLengkap: info.makna,
    potensiDinamika: info.dinamika,
    solusiPenyelaras: {
      ruwatan: info.ruwatan,
      amalan: info.amalan,
      tipsHarmonis: info.tips,
    },
  };
}

/**
 * Petungan Hari Baik (Ngopek Dina / Memilih Hari untuk Hajatan, Pindah Rumah, Usaha)
 */
export interface JamBaikDetail {
  jam: string;
  status: 'Sangat Baik' | 'Baik' | 'Netral' | 'Waspada';
  makna: string;
}

export interface HariBaikItem {
  tanggal: string; // YYYY-MM-DD
  formattedDate: string;
  weton: string;
  dina: string;
  pasaran: string;
  neptu: number;
  wuku: string;
  pancasuda: string;
  lakuning: string;
  status: 'Sangat Baik' | 'Baik' | 'Netral' | 'Hindari';
  skor: number; // 0 - 100
  alasan: string;
  arahKeberuntungan: string;
  arahPantangan: string;
  jamBaik: JamBaikDetail[];
  rekomendasiAcara: string[];
}

/**
 * Petungan Saat Pitu (Jam Baik Harian Berdasarkan Primbon Jawa)
 */
export function getJamBaikHarian(dina: string): JamBaikDetail[] {
  // Matriks Saat Pitu klasik
  const matrix: Record<string, JamBaikDetail[]> = {
    Minggu: [
      { jam: '06:00 - 08:24', status: 'Baik', makna: 'Jam Slamet & Kasampurnan — lancar untuk mengawali perjalanan.' },
      { jam: '08:25 - 10:48', status: 'Sangat Baik', makna: 'Jam Rezeki & Pangan — pintu rezeki dan kemudahan terbuka.' },
      { jam: '10:49 - 13:12', status: 'Waspada', makna: 'Jam Pangkalan — sebaiknya hindari transaksi berisiko tinggi.' },
      { jam: '13:13 - 15:36', status: 'Baik', makna: 'Jam Ayem — cocok untuk pertemuan keluarga atau silaturahmi.' },
      { jam: '15:37 - 18:00', status: 'Sangat Baik', makna: 'Jam Kamulyan — doa dan ikrar restu terkabul.' },
    ],
    Senin: [
      { jam: '06:00 - 08:24', status: 'Sangat Baik', makna: 'Jam Rezeki Agung — pembukaan toko atau niaga sangat berkah.' },
      { jam: '08:25 - 10:48', status: 'Baik', makna: 'Jam Slamet — selamat dari fitnah dan marabahaya.' },
      { jam: '10:49 - 13:12', status: 'Sangat Baik', makna: 'Jam Kawibawan — disukai atasan dan disegani mitra bisnis.' },
      { jam: '13:13 - 15:36', status: 'Waspada', makna: 'Jam Pasulayan — rawan perdebatan, jaga tutur kata.' },
      { jam: '15:37 - 18:00', status: 'Baik', makna: 'Jam Kuncara — baik untuk menandatangani kesepakatan.' },
    ],
    Selasa: [
      { jam: '06:00 - 08:24', status: 'Waspada', makna: 'Jam Brahala — hati-hati saat berkendara atau membawa senjata tajam.' },
      { jam: '08:25 - 10:48', status: 'Sangat Baik', makna: 'Jam Sri & Rezeki — keberuntungan materi berpihak pada Anda.' },
      { jam: '10:49 - 13:12', status: 'Baik', makna: 'Jam Slamet — urusan birokrasi dan hajat berjalan lancar.' },
      { jam: '13:13 - 15:36', status: 'Sangat Baik', makna: 'Jam Luhur — tepat untuk akad nikah atau ijab kabul.' },
      { jam: '15:37 - 18:00', status: 'Baik', makna: 'Jam Tentrem — menyejukkan hati dan keluarga.' },
    ],
    Rabu: [
      { jam: '06:00 - 08:24', status: 'Baik', makna: 'Jam Slamet — langkah awal yang penuh keselamatan.' },
      { jam: '08:25 - 10:48', status: 'Waspada', makna: 'Jam Kala — waspada terhadap tipu daya orang baru.' },
      { jam: '10:49 - 13:12', status: 'Sangat Baik', makna: 'Jam Rezeki & Pangan — kemakmuran dan keberkahan mengalir.' },
      { jam: '13:13 - 15:36', status: 'Sangat Baik', makna: 'Jam Kawibawan — cocok untuk promosi jabatan atau negosiasi.' },
      { jam: '15:37 - 18:00', status: 'Baik', makna: 'Jam Asih — meluluhkan hati calon mertua atau pasangan.' },
    ],
    Kamis: [
      { jam: '06:00 - 08:24', status: 'Sangat Baik', makna: 'Jam Rezeki Langgeng — investasi dan tabungan bertambah berkah.' },
      { jam: '08:25 - 10:48', status: 'Baik', makna: 'Jam Slamet — perjalanan jauh terhindar dari aral melintang.' },
      { jam: '10:49 - 13:12', status: 'Waspada', makna: 'Jam Kerepotan — tunda keputusan terburu-buru.' },
      { jam: '13:13 - 15:36', status: 'Sangat Baik', makna: 'Jam Mukti — membawa derajat tinggi dan kehormatan keluarga.' },
      { jam: '15:37 - 18:00', status: 'Baik', makna: 'Jam Rahayu — suasana rumah tangga adem ayem.' },
    ],
    Jumat: [
      { jam: '06:00 - 08:24', status: 'Sangat Baik', makna: 'Jam Berkah Mustajab — awal hari yang penuh limpahan rahmat.' },
      { jam: '08:25 - 10:48', status: 'Sangat Baik', makna: 'Jam Rezeki & Kedudukan — sangat baik untuk akad atau buka usaha.' },
      { jam: '10:49 - 13:12', status: 'Baik', makna: 'Jam Slamet — persiapan ibadah dan doa bersama.' },
      { jam: '13:13 - 15:36', status: 'Baik', makna: 'Jam Kawicaksanan — ide cemerlang mudah diterima orang banyak.' },
      { jam: '15:37 - 18:00', status: 'Waspada', makna: 'Jam Surup — perbanyak doa dan kurangi aktivitas berisiko.' },
    ],
    Sabtu: [
      { jam: '06:00 - 08:24', status: 'Baik', makna: 'Jam Tentrem — suasana damai dan cocok untuk syukuran.' },
      { jam: '08:25 - 10:48', status: 'Waspada', makna: 'Jam Pangkalan — teliti kembali berkas atau barang berharga.' },
      { jam: '10:49 - 13:12', status: 'Sangat Baik', makna: 'Jam Rezeki — rezeki tak terduga hadir.' },
      { jam: '13:13 - 15:36', status: 'Baik', makna: 'Jam Slamet — lancar dalam prosesi hajatan resepsi.' },
      { jam: '15:37 - 18:00', status: 'Sangat Baik', makna: 'Jam Kamulyan — kebahagiaan abadi bagi kedua mempelai.' },
    ],
  };

  return matrix[dina] || matrix['Minggu'];
}

/**
 * Arah Naga Dina (Arah Keberuntungan & Pantangan)
 */
export function getNagaDina(dina: string, pasaran: string): { rezeki: string; pantangan: string } {
  // Arah Naga Dina & Rezeki
  const arahMap: Record<string, { rezeki: string; pantangan: string }> = {
    Legi: { rezeki: 'Timur dan Utara', pantangan: 'Barat Daya' },
    Pahing: { rezeki: 'Selatan dan Timur', pantangan: 'Barat Laut' },
    Pon: { rezeki: 'Barat dan Selatan', pantangan: 'Timur Laut' },
    Wage: { rezeki: 'Utara dan Barat', pantangan: 'Tenggara' },
    Kliwon: { rezeki: 'Pusat (Segala Arah Membawa Berkah)', pantangan: 'Tenggara' },
  };
  return arahMap[pasaran] || { rezeki: 'Timur dan Utara', pantangan: 'Selatan' };
}

export function cariHariBaik(
  tglWetonPemohon: string,
  bulanTahunTarget: string, // YYYY-MM
  jenisHajatan: 'nikah' | 'usaha' | 'pindah' | 'umum'
): HariBaikItem[] {
  const pemohon = calculateWeton(tglWetonPemohon);
  const [targetYear, targetMonth] = bulanTahunTarget.split('-').map(Number);

  // Ambil jumlah hari dalam bulan
  const totalDays = new Date(targetYear, targetMonth, 0).getDate();
  const listHari: HariBaikItem[] = [];

  for (let d = 1; d <= totalDays; d++) {
    const dayStr = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const wetonHari = calculateWeton(dayStr);

    let status: 'Sangat Baik' | 'Baik' | 'Netral' | 'Hindari' = 'Netral';
    let skor = 70;
    let alasan = 'Hari ini berenergi stabil untuk aktivitas umum.';
    const rekomendasiAcara: string[] = [];

    // Cek Naas Weton pemohon
    const isHariSama = wetonHari.dina === pemohon.dina && wetonHari.pasaran === pemohon.pasaran;
    const isWasGede = wetonHari.dina === pemohon.dina; // hari kelahiran

    // Taliwangke & Samparwangke (pantangan klasik)
    const isTaliwangke =
      (wetonHari.dina === 'Senin' && wetonHari.pasaran === 'Kliwon') ||
      (wetonHari.dina === 'Selasa' && wetonHari.pasaran === 'Legi') ||
      (wetonHari.dina === 'Rabu' && wetonHari.pasaran === 'Pahing') ||
      (wetonHari.dina === 'Kamis' && wetonHari.pasaran === 'Pon') ||
      (wetonHari.dina === 'Jumat' && wetonHari.pasaran === 'Wage');

    if (isHariSama) {
      status = 'Hindari';
      skor = 25;
      alasan = 'Dina Wiyosan (Weton Kelahiran Sendiri) — sebaiknya digunakan untuk tirakat, puasa weton, dan menahan diri dari hajatan ramai.';
    } else if (isTaliwangke) {
      status = 'Hindari';
      skor = 35;
      alasan = 'Dina Taliwangke — menurut primbon keraton dihindari untuk memulai akad nikah atau boyongan rumah.';
    } else if (wetonHari.pancasuda === 'Wasesa Segara' || wetonHari.pancasuda === 'Satria Wibawa') {
      status = 'Sangat Baik';
      skor = wetonHari.pancasuda === 'Wasesa Segara' ? 98 : 95;
      alasan = `Dina ${wetonHari.pancasuda} — energi semesta sangat menguntungkan, membawa berkah kehormatan, keselamatan, dan kelimpahan rezeki.`;
      rekomendasiAcara.push('Akad Nikah / Ijab Qabul', 'Buka Usaha / Toko Baru', 'Boyongan Pindah Rumah', 'Tanda Tangan Kontrak');
    } else if (wetonHari.pancasuda === 'Tunggak Semi' || wetonHari.pancasuda === 'Sumur Sinaba') {
      status = 'Baik';
      skor = wetonHari.pancasuda === 'Tunggak Semi' ? 90 : 86;
      alasan = `Dina ${wetonHari.pancasuda} — rezeki mengalir berkesinambungan dan membawa berkah ilmu serta kedamaian batin.`;
      rekomendasiAcara.push('Memulai Bisnis / Usaha', 'Membeli Kendaraan / Properti', 'Pelantikan Jabatan');
    } else if (wetonHari.pancasuda === 'Lebu Katiup Angin' || wetonHari.pancasuda === 'Bumi Kapetak') {
      status = 'Netral';
      skor = 65;
      alasan = 'Dina netral — dianjurkan membaca doa slametan jika tetap memilih hari ini untuk kelancaran.';
      rekomendasiAcara.push('Silaturahmi Santai', 'Perjalanan Ziarah');
    }

    const naga = getNagaDina(wetonHari.dina, wetonHari.pasaran);
    const jamBaik = getJamBaikHarian(wetonHari.dina);

    listHari.push({
      tanggal: dayStr,
      formattedDate: wetonHari.formattedDate,
      weton: `${wetonHari.dina} ${wetonHari.pasaran}`,
      dina: wetonHari.dina,
      pasaran: wetonHari.pasaran,
      neptu: wetonHari.neptuTotal,
      wuku: wetonHari.wuku,
      pancasuda: wetonHari.pancasuda,
      lakuning: wetonHari.lakuning,
      status,
      skor,
      alasan,
      arahKeberuntungan: naga.rezeki,
      arahPantangan: naga.pantangan,
      jamBaik,
      rekomendasiAcara,
    });
  }

  return listHari;
}

/**
 * Info Harian Weton (Daily Weton Digest):
 * Weton hari ini, Baik untuk apa, Jelek untuk apa, Rekomendasi Outfit & Warna Keberuntungan, Makanan & Minuman.
 */
export interface InfoHarianWeton {
  tanggal: string;
  formattedDate: string;
  weton: string;
  dina: string;
  dinaJawa: string;
  pasaran: string;
  pasaranAksara: string;
  neptuDina: number;
  neptuPasaran: number;
  neptuTotal: number;
  wuku: string;
  wukuMakna: string;
  lakuning: string;
  lakuningDesc: string;
  pancasuda: string;
  pancasudaDesc: string;
  elemen: string;
  arahRezeki: string;
  arahPantangan: string;
  outfit: {
    warnaUtama: string;
    hexUtama: string;
    warnaAksen: string;
    hexAksen: string;
    rekomendasiGaya: string;
    aksesori: string;
    filosofiBusana: string;
  };
  makanan: {
    namaMakanan: string;
    namaMinuman: string;
    karakterRasa: string;
    khasiatElemen: string;
  };
  baikUntuk: string[];
  jelekUntuk: string[];
  quoteHarian: string;
}

export function getInfoHariIni(dateStr: string): InfoHarianWeton {
  const weton = calculateWeton(dateStr);
  const naga = getNagaDina(weton.dina, weton.pasaran);

  // Rekomendasi Outfit & Makanan Berdasarkan Elemen Pasaran & Hari
  const outfitMakananMap: Record<string, {
    warnaUtama: string;
    hexUtama: string;
    warnaAksen: string;
    hexAksen: string;
    gaya: string;
    aksesori: string;
    filosofi: string;
    makanan: string;
    minuman: string;
    rasa: string;
    khasiat: string;
  }> = {
    Legi: {
      warnaUtama: 'Putih Bersih / Gading',
      hexUtama: '#F8FAFC',
      warnaAksen: 'Kuning Emas Keraton',
      hexAksen: '#D4AF37',
      gaya: 'Kemeja katun rapi, batik motif Truntum atau Kawung lembut, pakaian bernuansa terang dan bersahaja.',
      aksesori: 'Jam tangan perak, kacamata bingkai tipis, atau selendang warna pastel.',
      filosofi: 'Warna putih melambangkan kesucian budi dan ketulusan niat (elemen udara/timur).',
      makanan: 'Gudeg basah dengan rasa gurih manis, tumpeng nasi putih, atau apem kukus pandan.',
      minuman: 'Air kelapa muda (degan) dengan gula aren, atau wedang secang wangi.',
      rasa: 'Manis Gurih Alami',
      khasiat: 'Menyejukkan metabolisme tubuh dan menstabilkan ketenangan pikiran di pagi hari.',
    },
    Pahing: {
      warnaUtama: 'Merah Marun / Terakota',
      hexUtama: '#991B1B',
      warnaAksen: 'Hitam Arang Elegan',
      hexAksen: '#1E293B',
      gaya: 'Blazer bold, batik sogan gelap motif Parang Rusak, jaket casual bernuansa hangat dan tegas.',
      aksesori: 'Sabuk kulit cokelat tua, tas berstruktur tegas, atau cincin batu akik merah delima.',
      filosofi: 'Warna merah marun membangkitkan aura keberanian, vitalitas, dan kepemimpinan (elemen api/selatan).',
      makanan: 'Ayam bakar bumbu rujak pedas manis, rawon daging kuah hitam pekat, atau sambal goreng ati.',
      minuman: 'Wedang jahe geprek hangat, beras kencur, atau teh tubruk melati pekat.',
      rasa: 'Hangat, Pedas Berempah',
      khasiat: 'Memicu aliran darah, membakar kelesuan, dan meningkatkan fokus konsentrasi kerja.',
    },
    Pon: {
      warnaUtama: 'Kuning Kunyit / Mustard',
      hexUtama: '#EAB308',
      warnaAksen: 'Cokelat Moka Hangat',
      hexAksen: '#78350F',
      gaya: 'Smart casual rajut, kemeja linen warna tanah/bumi, batik motif Sidomukti keemasan.',
      aksesori: 'Aksesoris logam kuningan, tas canvas bernuansa vintage, atau syal hangat.',
      filosofi: 'Kuning keemasan adalah simbol kemakmuran, kemuliaan, dan keterbukaan rezeki (elemen logam/barat).',
      makanan: 'Nasi kuning komplit lauk telur bumbu bali, tahu tempe bacem, atau getuk lindri.',
      minuman: 'Kunyit asam segar dingin, wedang ronde hangat isi kacang, atau jus nanas madu.',
      rasa: 'Segar Manis Asam Berenergi',
      khasiat: 'Menjaga stamina pencernaan dan mendetoksifikasi racun tubuh.',
    },
    Wage: {
      warnaUtama: 'Biru Dongker / Navy Pekat',
      hexUtama: '#1E3A8A',
      warnaAksen: 'Abu-abu Baja (Charcoal)',
      hexAksen: '#475569',
      gaya: 'Jas casual biru dongker, polo shirt navy, batik motif Sekar Jagad bernuansa gelap wibawa.',
      aksesori: 'Sepatu pantofel kulit hitam, jam tangan tali kulit navy, atau dompet minimalis.',
      filosofi: 'Warna biru dongker melambangkan kedalaman ilmu, ketenangan samudra, dan wibawa sejati (elemen air/utara).',
      makanan: 'Sayur lodeh tempe kluwih, ikan bakar sambal kecap, atau pecel pincuk daun kemangi.',
      minuman: 'Wedang uwuh komplet rempah, teh telang biru lemon, atau kopi tubruk robusta.',
      rasa: 'Gurih Segar Menenangkan',
      khasiat: 'Meredakan tekanan darah tinggi dan mengasah ketajaman daya ingat serta intuisi batin.',
    },
    Kliwon: {
      warnaUtama: 'Hijau Zamrud / Emerald',
      hexUtama: '#047857',
      warnaAksen: 'Emas Keraton / Bronze',
      hexAksen: '#D97706',
      gaya: 'Kombinasi warna bumi/mancawarna, batik keraton motif Semen Rama, busana berlapis elegan.',
      aksesori: 'Gelang tasbih kayu gaharu/cendana, bros gunungan emas, atau cincin safir.',
      filosofi: 'Kliwon sebagai pasaran pusat (mancawarna) menyatukan keseimbangan empat penjuru semesta.',
      makanan: 'Nasi tumpeng megono, urap sayuran aneka warna, atau bubur sumsum manis kinca.',
      minuman: 'Sari jahe temulawak, wedang bajigur santan gurih, atau teh hijau melati.',
      rasa: 'Harmoni Rempah Nusantara',
      khasiat: 'Menyeimbangkan cakra batin, memperkuat imunitas tubuh, dan mempertebal ketenangan batin.',
    },
  };

  const outfitMakanan = outfitMakananMap[weton.pasaran] || outfitMakananMap['Legi'];

  // Baik Untuk Apa & Jelek Untuk Apa (Berdasarkan Pancasuda, Lakuning & Neptu)
  const aktivitasBaikPancasuda: Record<string, string[]> = {
    'Wasesa Segara': [
      'Memulai negosiasi bisnis atau tanda tangan kontrak penting',
      'Melakukan sedekah subuh, berderma, dan menyantuni anak yatim',
      'Silaturahmi ke kediaman orang tua, guru, atau tokoh yang dihormati',
      'Memulai perjalanan dinas atau rencana ekspansi kerja',
      'Berdiskusi untuk menyelesaikan sengketa dengan kepala dingin',
    ],
    'Satria Wibawa': [
      'Menghadiri wawancara kerja atau presentasi proyek besar',
      'Melakukan pembicaraan lamaran keluarga atau menentukan tanggal baik',
      'Membeli barang berharga (kendaraan, tanah, emas, perhiasan)',
      'Memulai kursus / pelatihan untuk meningkatkan kompetensi diri',
      'Mendaftar kompetisi, tender, atau seleksi jabatan',
    ],
    'Tunggak Semi': [
      'Membuka rekening tabungan baru atau memulai investasi modal',
      'Membuka toko, merilis produk baru, atau launching bisnis online',
      'Menanam bibit tanaman atau memulai renovasi halaman rumah',
      'Membayar hutang atau menyelesaikan kewajiban finansial',
      'Menjalin relasi baru dengan komunitas usaha',
    ],
    'Sumur Sinaba': [
      'Mencari nasihat dari sesepuh atau konseling pernikahan',
      'Membaca kitab, mendalami ilmu filsafat, atau belajar teknologi baru',
      'Mengajar, memberikan pelatihan, dan membagikan ilmu bermanfaat',
      'Menyusun rencana strategis hidup 6 bulan ke depan',
      'Melakukan meditasi, salat tahajud, dan perenungan batin',
    ],
    'Bumi Kapetak': [
      'Menyelesaikan tugas-tugas berat yang tertunda dengan disiplin tinggi',
      'Olahraga fisik, lari pagi, atau membersihkan lingkungan rumah',
      'Gotong royong bersama tetangga atau rekan kerja',
      'Melatih ketahanan mental dan menahan emosi negatif',
      'Tirakat puasa sunnah atau puasa weton untuk mawas diri',
    ],
    'Satria Wirang': [
      'Melatih kerendahan hati dan banyak mendengarkan daripada banyak bicara',
      'Merapikan keuangan pribadi dan meninjau ulang pengeluaran boros',
      'Melakukan introspeksi diri (mawas diri) atas kekhilafan masa lalu',
      'Memperbanyak istigfar, doa tolak bala, dan perbuatan baik tersembunyi',
      'Menghindari pamer prestasi atau kemewahan di media sosial',
    ],
    'Lebu Katiup Angin': [
      'Menjaga ketenangan di rumah bersama keluarga inti',
      'Membaca buku inspiratif dan menenangkan pikiran yang penat',
      'Berdoa memohon keteguhan iman dan kemudahan rezeki',
      'Menjauhi pergaulan toksik atau gosip yang tidak berfaedah',
      'Berfokus pada penyelesaian tugas rutin yang pasti dan stabil',
    ],
  };

  const baikUntuk = aktivitasBaikPancasuda[weton.pancasuda] || [
    'Menjalin komunikasi hangat dengan sanak saudara',
    'Memperbanyak doa syukur dan sedekah pangan',
    'Belajar keterampilan baru yang menunjang pekerjaan',
    'Menata kerapian rumah dan tempat ibadah',
  ];

  // Pantangan / Jelek Untuk Apa di Bidang Umum
  const jelekUntuk = [
    `Memulai perdebatan sengit atau adu argumen emosional (khususnya di sore hari)`,
    `Melakukan spekulasi finansial berisiko tinggi atau pinjaman tanpa perhitungan matang`,
    `Melakukan perjalanan jauh ke arah pantangan naga dina (${naga.pantangan}) tanpa berdoa keselamatan`,
    `Mengambil keputusan penting dalam keadaan marah, lapar, atau lelah berlebihan`,
    `Menyebarkan rahasia orang lain atau membicarakan aib sanak kerabat`,
  ];

  // Tambahkan pantangan jika dina naas/taliwangke
  if (weton.pancasuda === 'Lebu Katiup Angin' || weton.pancasuda === 'Satria Wirang') {
    jelekUntuk.unshift('Menandatangani perjanjian utang piutang dengan jaminan besar');
  }

  const quotes = [
    'Aja gumunan, aja getunan, aja kagetan, aja aleman.',
    'Urip iku urup — berilah manfaat sekecil apapun bagi sekitarmu hari ini.',
    'Sing sapa temen bakal tinemu — barangsiapa bersungguh-sungguh niscaya akan memetik hasil.',
    'Alon-alon waton kelakon — jalani langkah hari ini dengan penuh kehati-hatian dan ketelitian.',
    'Sabar iku lire momot kuwat nandhang sakehing coba lan godha.',
  ];
  const quoteHarian = quotes[weton.neptuTotal % quotes.length];

  return {
    tanggal: dateStr,
    formattedDate: weton.formattedDate,
    weton: `${weton.dina} ${weton.pasaran}`,
    dina: weton.dina,
    dinaJawa: weton.dinaJawa,
    pasaran: weton.pasaran,
    pasaranAksara: weton.pasaranAksara,
    neptuDina: weton.neptuDina,
    neptuPasaran: weton.neptuPasaran,
    neptuTotal: weton.neptuTotal,
    wuku: weton.wuku,
    wukuMakna: weton.wukuMakna,
    lakuning: weton.lakuning,
    lakuningDesc: weton.lakuningDesc,
    pancasuda: weton.pancasuda,
    pancasudaDesc: weton.pancasudaDesc,
    elemen: weton.elemenJawa,
    arahRezeki: naga.rezeki,
    arahPantangan: naga.pantangan,
    outfit: {
      warnaUtama: outfitMakanan.warnaUtama,
      hexUtama: outfitMakanan.hexUtama,
      warnaAksen: outfitMakanan.warnaAksen,
      hexAksen: outfitMakanan.hexAksen,
      rekomendasiGaya: outfitMakanan.gaya,
      aksesori: outfitMakanan.aksesori,
      filosofiBusana: outfitMakanan.filosofi,
    },
    makanan: {
      namaMakanan: outfitMakanan.makanan,
      namaMinuman: outfitMakanan.minuman,
      karakterRasa: outfitMakanan.rasa,
      khasiatElemen: outfitMakanan.khasiat,
    },
    baikUntuk,
    jelekUntuk,
    quoteHarian,
  };
}

export interface KalenderJawaCell {
  dateStr: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  dina: string;
  pasaran: string;
  pasaranAksara: string;
  neptuDina: number;
  neptuPasaran: number;
  neptuTotal: number;
  wuku: string;
  pancasuda: string;
  elemen: string;
  wetonResult: WetonResult;
  tanggalJawa: string;
}

export interface KalenderJawaBulan {
  tahunMasehi: number;
  bulanMasehi: number; // 1-12
  namaBulanMasehi: string;
  bulanJawa: string;
  tahunJawa: number;
  wukuList: string[];
  cells: KalenderJawaCell[];
}

export const BULAN_JAWA_LIST = [
  'Sura', 'Sapar', 'Mulud', 'Bakda Mulud',
  'Jumadilawal', 'Jumadilakir', 'Rejeb', 'Ruwah',
  'Pasa', 'Sawal', 'Dulkangidah', 'Besar'
];

/**
 * Konversi tanggal Masehi ke perkiraan penanggalan Jawa Sultan Agungan
 */
export function getTanggalJawaText(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const target = new Date(Date.UTC(y, m - 1, d));
  // Reference: 2024-01-01 was 19 Jumadilawal 1957 Jawa
  // Jumadilawal is month index 4 (0-indexed)
  const ref = new Date(Date.UTC(2024, 0, 1));
  const diffDays = Math.round((target.getTime() - ref.getTime()) / 86400000);

  // Lunar month average length ~29.530588 days
  const lunarDaysTotal = 19 + diffDays;
  const monthLen = 29.530588;
  const totalMonthsPassed = Math.floor(lunarDaysTotal / monthLen);
  const dayInMonth = Math.floor((lunarDaysTotal % monthLen + monthLen) % monthLen) + 1;

  const monthIndex = ((4 + totalMonthsPassed) % 12 + 12) % 12;
  const namaBulan = BULAN_JAWA_LIST[monthIndex];
  const yearOffset = Math.floor((4 + totalMonthsPassed) / 12);
  const tahunJawa = 1957 + yearOffset;

  return `${dayInMonth} ${namaBulan} ${tahunJawa} Jawa`;
}

/**
 * Menghasilkan grid kalender bulanan Jawa lengkap dengan Pasaran dan Wuku
 */
export function getKalenderJawaBulan(
  year: number,
  month: number, // 1-12
  selectedDateStr: string
): KalenderJawaBulan {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const totalDays = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const startDayOfWeek = firstDay.getUTCDay(); // 0 = Sunday, 1 = Monday, ...

  const namaBulanMasehi = firstDay.toLocaleDateString('id-ID', { month: 'long', timeZone: 'UTC' });

  const cells: KalenderJawaCell[] = [];
  const wukuSet = new Set<string>();

  // 1. Previous month trailing days
  const prevMonthTotalDays = new Date(Date.UTC(year, month - 1, 0)).getUTCDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const prevDayNum = prevMonthTotalDays - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(prevDayNum).padStart(2, '0')}`;
    const weton = calculateWeton(dateStr);
    wukuSet.add(weton.wuku);

    cells.push({
      dateStr,
      dayNumber: prevDayNum,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      isSelected: dateStr === selectedDateStr,
      dina: weton.dina,
      pasaran: weton.pasaran,
      pasaranAksara: weton.pasaranAksara,
      neptuDina: weton.neptuDina,
      neptuPasaran: weton.neptuPasaran,
      neptuTotal: weton.neptuTotal,
      wuku: weton.wuku,
      pancasuda: weton.pancasuda,
      elemen: weton.elemenJawa,
      wetonResult: weton,
      tanggalJawa: getTanggalJawaText(dateStr),
    });
  }

  // 2. Current month days
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const weton = calculateWeton(dateStr);
    wukuSet.add(weton.wuku);

    cells.push({
      dateStr,
      dayNumber: d,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      isSelected: dateStr === selectedDateStr,
      dina: weton.dina,
      pasaran: weton.pasaran,
      pasaranAksara: weton.pasaranAksara,
      neptuDina: weton.neptuDina,
      neptuPasaran: weton.neptuPasaran,
      neptuTotal: weton.neptuTotal,
      wuku: weton.wuku,
      pancasuda: weton.pancasuda,
      elemen: weton.elemenJawa,
      wetonResult: weton,
      tanggalJawa: getTanggalJawaText(dateStr),
    });
  }

  // 3. Next month leading days (fill up to multiple of 7, up to 35 or 42 cells)
  const remainingCells = (7 - (cells.length % 7)) % 7;
  for (let nextD = 1; nextD <= remainingCells; nextD++) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(nextD).padStart(2, '0')}`;
    const weton = calculateWeton(dateStr);
    wukuSet.add(weton.wuku);

    cells.push({
      dateStr,
      dayNumber: nextD,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      isSelected: dateStr === selectedDateStr,
      dina: weton.dina,
      pasaran: weton.pasaran,
      pasaranAksara: weton.pasaranAksara,
      neptuDina: weton.neptuDina,
      neptuPasaran: weton.neptuPasaran,
      neptuTotal: weton.neptuTotal,
      wuku: weton.wuku,
      pancasuda: weton.pancasuda,
      elemen: weton.elemenJawa,
      wetonResult: weton,
      tanggalJawa: getTanggalJawaText(dateStr),
    });
  }

  // Mid-month Javanese date for header
  const midDateStr = `${year}-${String(month).padStart(2, '0')}-15`;
  const midJawaText = getTanggalJawaText(midDateStr);
  const parts = midJawaText.split(' ');
  const bulanJawa = parts[1] || 'Sura';
  const tahunJawa = parseInt(parts[2], 10) || 1957;

  return {
    tahunMasehi: year,
    bulanMasehi: month,
    namaBulanMasehi,
    bulanJawa,
    tahunJawa,
    wukuList: Array.from(wukuSet),
    cells,
  };
}

