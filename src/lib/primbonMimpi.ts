/**
 * Primbon Arti Mimpi (Tafsir Sasmita Impen)
 * Bersumber dari rujukan serat Primbon Jawa adiluhung (Serat Centhini,
 * Kitab Primbon Betaljemur Adammakna, & Kitab Mujarobat Jawa).
 */

export type KategoriMimpi =
  | 'hewan'
  | 'tubuh'
  | 'alam'
  | 'leluhur'
  | 'pusaka'
  | 'rezeki'
  | 'asmara';

export type JenisFirasat =
  | 'Kebaikan & Rezeki'
  | 'Peringatan & Mawas Diri'
  | 'Derajat & Kehormatan'
  | 'Ujian Kesabaran';

export interface ArtiMimpiItem {
  id: string;
  judul: string;
  aksara: string;
  kategori: KategoriMimpi;
  kategoriLabel: string;
  firasat: JenisFirasat;
  makna: string;
  filosofi: string;
  anjuran: string;
  kataKunci: string[];
}

export interface WaktuMimpiResult {
  periode: 'Titiyoni' | 'Gondoyoni' | 'Puspowajom';
  rentang: string;
  keterangan: string;
  keabsahan: 'Kembang Turu (Tidak Bermakna)' | 'Samar / Batiniah' | 'Sasmita Hakiki (Nyata)';
  penjelasan: string;
}

/**
 * 3 Waktu Terjadinya Mimpi dalam Primbon Jawa:
 * 1. Titiyoni: Jam 20:00 - 23:00 (Awal malam, kembang turu akibat lelah atau lamunan siang)
 * 2. Gondoyoni: Jam 23:00 - 02:00 (Tengah malam, godaan angan-angan sukma & hawa nafsu)
 * 3. Puspowajom: Jam 02:00 - 05:00 (Sepertiga malam akhir hingga fajar, sasmita gaib sejati)
 */
export function cekWaktuMimpi(jamStr: string): WaktuMimpiResult {
  // jamStr format: "HH:mm" or "HH"
  const parts = jamStr.split(':');
  const jam = parseInt(parts[0], 10);

  if (isNaN(jam)) {
    return {
      periode: 'Puspowajom',
      rentang: '02:00 - 05:00 WIB',
      keterangan: 'Sepertiga Malam Terakhir (Fajar Sasmita)',
      keabsahan: 'Sasmita Hakiki (Nyata)',
      penjelasan: 'Menurut Primbon Jawa, mimpi pada waktu Puspowajom adalah isyarat nyata dari Hyang Sukma yang sering menjadi firasat kenyataan hidup.',
    };
  }

  if (jam >= 20 && jam < 23) {
    return {
      periode: 'Titiyoni',
      rentang: '20:00 - 23:00 WIB (Awal Malam)',
      keterangan: 'Kembang Turu (Bunga Tidur)',
      keabsahan: 'Kembang Turu (Tidak Bermakna)',
      penjelasan: 'Pikiran dan raga masih dipengaruhi oleh sisa kelelahan, rutinitas kerja, atau lamunan di siang hari. Umumnya tidak memiliki makna ramalan gaib.',
    };
  } else if ((jam >= 23 && jam <= 23) || (jam >= 0 && jam < 2)) {
    return {
      periode: 'Gondoyoni',
      rentang: '23:00 - 02:00 WIB (Tengah Malam)',
      keterangan: 'Samaran Sukma & Angan-Angan',
      keabsahan: 'Samar / Batiniah',
      penjelasan: 'Mimpi berasal dari pergolakan batin bawah sadar, harapan emosional, atau godaan halus. Bisa jadi petunjuk samar namun perlu keheningan rasa untuk memahaminya.',
    };
  } else if (jam >= 2 && jam < 5) {
    return {
      periode: 'Puspowajom',
      rentang: '02:00 - 05:00 WIB (Menjelang Subuh)',
      keterangan: 'Sasmita Gaib & Petunjuk Hakiki',
      keabsahan: 'Sasmita Hakiki (Nyata)',
      penjelasan: 'Inilah waktu mimpi yang diyakini paling sakral dan akurat menurut leluhur Jawa. Sukma dalam kondisi hening suci, sehingga mimpi berpotensi kuat menjadi isyarat nyata.',
    };
  } else {
    // Siang hari atau pagi hari
    return {
      periode: 'Titiyoni',
      rentang: 'Waktu Pagi / Siang / Sore',
      keterangan: 'Tidur Luar Waktu Hening',
      keabsahan: 'Kembang Turu (Tidak Bermakna)',
      penjelasan: 'Tidur di luar waktu hening malam hari dipandang sebagai lelahnya jasad, mimpi yang hadir sekadar pantulan pikiran sehari-hari.',
    };
  }
}

export const PRIMBON_MIMPI_DATABASE: ArtiMimpiItem[] = [
  // 1. HEWAN & SATWA
  {
    id: 'm-ular-patuk',
    judul: 'Mimpi Dipatuk atau Digigit Ular',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦕꦶꦤꦺꦴꦏꦺꦴꦠ꧀ꦲꦸꦭ',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Bagi yang masih lajang, pertanda dekatnya jodoh atau ada orang yang berniat meminang. Bagi yang sudah berumah tangga, isyarat akan kedatangan rezeki melimpah atau kemakmuran yang tak disangka-sangka.',
    filosofi: 'Ular melambangkan energi kundalini dan ikatan batin yang mengikat dua insan, serta simbol daya pikat rezeki duniawi.',
    anjuran: 'Bersyukur kepada Tuhan, bila lajang buka hati untuk ikhtiar jodoh, dan jaga kesopanan dalam tutur kata.',
    kataKunci: ['ular', 'dipatuk ular', 'digigit ular', 'dibelit ular', 'jodoh', 'rejeki', 'hewan'],
  },
  {
    id: 'm-ular-besar',
    judul: 'Mimpi Melihat Ular Raksasa / Naga',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦲꦸꦭꦒꦼꦝꦺ',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Derajat & Kehormatan',
    makna: 'Pertanda akan mendapatkan perlindungan gaib, dinaikkan derajat kewibawaannya di tengah masyarakat, atau mendapat amanah kepemimpinan yang besar.',
    filosofi: 'Naga atau ular besar dalam khazanah Jawa adalah lambang Antaboga, penjaga bumi dan penegak kewibawaan batin.',
    anjuran: 'Perbanyak tirakat rendah hati (andhap asor), jangan takabur atas jabatan atau kedudukan yang diraih.',
    kataKunci: ['ular besar', 'naga', 'antaboga', 'ular raksasa', 'ular hitam', 'ular kuning'],
  },
  {
    id: 'm-dikejar-harimau',
    judul: 'Mimpi Dikejar atau Berjumpa Harimau (Macan)',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦢꦶꦪꦸꦪꦏ꧀ꦩꦕꦤ꧀',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Peringatan & Mawas Diri',
    makna: 'Isyarat adanya persaingan sengit atau benturan dengan orang berkuasa/berpengaruh. Jika harimau tunduk atau bersahabat, pertanda khodam leluhur atau kewibawaan pribadi sedang menguat.',
    filosofi: 'Macan melambangkan hawa nafsu amarah dan keberanian tanpa perhitungan yang perlu diredam dengan ketenangan rasa.',
    anjuran: 'Jaga lisan di lingkungan kerja, hindari perdebatan dengan atasan, dan lakukan puasa weton untuk mematangkan batin.',
    kataKunci: ['harimau', 'macan', 'singa', 'dikejar harimau', 'macan putih', 'kewibawaan'],
  },
  {
    id: 'm-burung-perkutut',
    judul: 'Mimpi Menangkap Burung Perkutut',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦔꦸꦤ꧀ꦝꦸꦃꦥꦼꦂꦏꦸꦠꦸꦠ꧀',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Derajat & Kehormatan',
    makna: 'Firasat luhur akan dikaruniai keturunan laki-laki yang sholeh, berbudi pekerti mulia, atau mendapat kehormatan pangkat dan ketenangan rumah tangga.',
    filosofi: 'Burung perkutut adalah klangenan ksatria Jawa lambang ketentraman jiwa (katentreman batin) dan kemapanan hidup.',
    anjuran: 'Lakukan sujud syukur dan perbanyak sedekah kepada anak-anak yatim piatu di hari pasaran weton.',
    kataKunci: ['burung', 'perkutut', 'menangkap burung', 'burung perkutut', 'anak laki-laki', 'pangkat'],
  },
  {
    id: 'm-ikan-emas',
    judul: 'Mimpi Menangkap Ikan Emas / Banyak Ikan Besar',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦚꦼꦏꦼꦭ꧀ꦲꦶꦮꦏ꧀ꦩꦱ꧀',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Pertanda rezeki berlimpah yang halal dan mengalir lancar dari jalan usaha yang sedang ditekuni. Usaha dagang atau karir akan membuahkan hasil manis.',
    filosofi: 'Air dan ikan adalah lambang kesuburan alam semesta serta keluwesan manusia dalam mengarungi dinamika rezeki.',
    anjuran: 'Sisihkan sebagian rezeki untuk zakat dan sedekah agar berkah harta semakin meluas.',
    kataKunci: ['ikan', 'ikan emas', 'menangkap ikan', 'memancing', 'banyak ikan', 'kolam ikan', 'rezeki'],
  },
  {
    id: 'm-disengat-lebah',
    judul: 'Mimpi Disengat Lebah atau Memanen Madu',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦢꦶꦌꦤ꧀ꦠꦺꦴꦥ꧀ tawon',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Mendapat madu pertanda manisnya hasil perjuangan panjang. Jika disengat lebah banyak, pertanda awalnya menghadapi kritik pedas namun berbuah keberhasilan cemerlang.',
    filosofi: 'Lebah hanya menghisap sari bunga dan menghasilkan madu obat kehidupan, lambang kebaikan yang berbalas kemuliaan.',
    anjuran: 'Tetap tabah saat dikritik atau diragukan orang lain, fokus pada karya dan integritas.',
    kataKunci: ['lebah', 'tawon', 'madu', 'disengat lebah', 'sarang lebah'],
  },
  {
    id: 'm-digigit-anjing',
    judul: 'Mimpi Digigit Anjing atau Dikejar Anjing',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦕꦶꦤꦺꦴꦏꦺꦴꦠ꧀ꦲꦱꦸ',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Peringatan & Mawas Diri',
    makna: 'Waspada terhadap orang dekat atau rekan kerja yang menyimpan kedengkian atau berpotensi mengingkari janji (khianat).',
    filosofi: 'Peringatan agar tidak sembarangan membocorkan rahasia keluarga atau strategi usaha kepada sembarang orang.',
    anjuran: 'Mawas diri, teliti dalam urusan perjanjian dokumen dan jangan mudah percaya rayuan manis.',
    kataKunci: ['anjing', 'asu', 'digigit anjing', 'dikejar anjing', 'khianat', 'waspada'],
  },
  {
    id: 'm-melihat-kucing',
    judul: 'Mimpi Dielus atau Didatangi Kucing Belang',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦏꦸꦕꦶꦁ',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Mendapat kasih sayang dari orang-orang sekitar dan ada tamu yang membawa kabar gembira atau tawaran kerjasama yang menentramkan.',
    filosofi: 'Kucing melambangkan kelembutan hati dan penerimaan rezeki harian yang cukup dan barokah.',
    anjuran: 'Beri makan binatang liar bila berpapasan di jalan sebagai sarana pembuka pintu welas asih.',
    kataKunci: ['kucing', 'kucing belang', 'kucing putih', 'kucing hitam', 'kucing melahirkan'],
  },

  // 2. TUBUH & KESEHATAN
  {
    id: 'm-gigi-atas-copot',
    judul: 'Mimpi Gigi Bagian Atas Copot / Tanggal',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦲꦸꦤ꧀ꦠꦸꦝꦸꦮꦸꦂꦠꦁꦒꦭ꧀',
    kategori: 'tubuh',
    kategoriLabel: 'Tubuh & Kesehatan',
    firasat: 'Peringatan & Mawas Diri',
    makna: 'Menurut Primbon Jawa kuna, firasat salah satu orang tua, mertua, paman, atau sesepuh keluarga sedang sakit atau menghadapi ujian berat.',
    filosofi: 'Gigi atas melambangkan payung kehormatan keluarga dan garis nasab orang tua leluhur yang dituakan.',
    anjuran: 'Segera jenguk dan doakan kesehatan orang tua. Kirim kabar hangat, pererat silaturahmi, dan bersedekah tolak bala.',
    kataKunci: ['gigi copot', 'gigi atas', 'gigi tanggal', 'orang tua', 'kesehatan', 'gigi goyang'],
  },
  {
    id: 'm-gigi-bawah-copot',
    judul: 'Mimpi Gigi Bagian Bawah Copot',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦲꦸꦤ꧀ꦠꦸꦔꦶꦱꦺꦴꦂꦠꦁꦒꦭ꧀',
    kategori: 'tubuh',
    kategoriLabel: 'Tubuh & Kesehatan',
    firasat: 'Peringatan & Mawas Diri',
    makna: 'Firasat anggota keluarga yang lebih muda (anak, keponakan, adik) memerlukan perhatian ekstra dalam kesehatan atau pendidikannya.',
    filosofi: 'Gigi bawah melambangkan tunas keturunan dan generasi penerus yang menopang masa depan keluarga.',
    anjuran: 'Perhatikan asupan makanan anak/adik, luangkan waktu mendengar curahan hati mereka, dan perbanyak doa keselamatan.',
    kataKunci: ['gigi bawah', 'gigi copot bawah', 'anak sakit', 'adik', 'keluarga muda'],
  },
  {
    id: 'm-gigi-taring-copot',
    judul: 'Mimpi Gigi Taring Copot atau Patah',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦲꦸꦤ꧀ꦠꦸꦱꦶꦪꦸꦁꦥꦠꦃ',
    kategori: 'tubuh',
    kategoriLabel: 'Tubuh & Kesehatan',
    firasat: 'Ujian Kesabaran',
    makna: 'Akan menghadapi penurunan wibawa sesaat atau ada rekan kerja yang meremehkan kemampuan Anda. Namun jika dihadapi dengan tenang, justru akan menguatkan jati diri.',
    filosofi: 'Taring (siyung) adalah lambang ketajaman tekad dan pertahanan diri ksatria.',
    anjuran: 'Tingkatkan kualitas kerja, jangan terpancing emosi untuk membalas cibiran dengan amarah.',
    kataKunci: ['gigi taring', 'siyung', 'gigi patah', 'wibawa', 'harga diri'],
  },
  {
    id: 'm-rambut-rontok-panjang',
    judul: 'Mimpi Rambut Rontok atau Memotong Rambut',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦕꦸꦏꦸꦂꦫꦩ꧀ꦧꦸꦠ꧀',
    kategori: 'tubuh',
    kategoriLabel: 'Tubuh & Kesehatan',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Bila memotong rambut dengan rapi: pertanda membuang kesialan, sengkala, atau beban masalah lama. Bila rambut rontok berlebihan: waspada terhadap kelelahan pikiran atau stres kerja.',
    filosofi: 'Memotong rambut (ruwatan rekma) adalah simbol penyucian diri dari kotoran masa lampau menyambut lembaran baru yang lebih cerah.',
    anjuran: 'Istirahat yang cukup, berlibur sejenak, dan tata ulang prioritas target hidup Anda.',
    kataKunci: ['rambut', 'potong rambut', 'rambut rontok', 'cukur', 'ruwatan'],
  },
  {
    id: 'm-hamil-melahirkan',
    judul: 'Mimpi Hamil atau Melahirkan Bayi Sehat',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦔ꧀ꦒꦧꦺꦴꦠ꧀ꦭꦤ꧀ꦔ꧀ꦭꦲꦶꦫꦏꦺ',
    kategori: 'tubuh',
    kategoriLabel: 'Tubuh & Kesehatan',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Pertanda akan lahirnya ide besar, proyek baru, atau terbukanya peluang rezeki yang telah lama diperjuangkan dan kini menampakkan hasil nyata.',
    filosofi: 'Kelahiran melambangkan siklus penciptaan baru (dumadi anyar) dan kelimpahan anugerah dari Sang Maha Pencipta.',
    anjuran: 'Siapkan tenaga dan perencanaan matang untuk menyambut tanggung jawab baru yang akan mendatangkan berkah.',
    kataKunci: ['hamil', 'melahirkan', 'bayi', 'bayi laki-laki', 'bayi perempuan', 'menggendong bayi'],
  },
  {
    id: 'm-terbang-ke-angkasa',
    judul: 'Mimpi Bisa Terbang Melayang di Angkasa',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦩꦧꦸꦂ',
    kategori: 'tubuh',
    kategoriLabel: 'Tubuh & Kesehatan',
    firasat: 'Derajat & Kehormatan',
    makna: 'Pertanda sukma sedang dinaikkan derajat spiritualnya, terbebas dari jeratan masalah yang selama ini menghimpit, dan siap melangkah ke tingkat karir yang lebih tinggi.',
    filosofi: 'Terbang bebas melambangkan pelepasan belenggu keduniawian (kaluwaran saking rubeda).',
    anjuran: 'Jaga kebersihan hati, jangan merasa lebih tinggi dari orang lain saat impian Anda mulai terwujud.',
    kataKunci: ['terbang', 'melayang', 'naik ke langit', 'sayap', 'angkasa'],
  },
  {
    id: 'm-mandi-air-jernih',
    judul: 'Mimpi Mandi di Sendang / Air Bersih Jernih',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦲꦢꦸꦱ꧀ꦲꦶꦁꦱꦺꦤ꧀ꦝꦁ',
    kategori: 'tubuh',
    kategoriLabel: 'Tubuh & Kesehatan',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Penyembuhan dari penyakit jasmani maupun batiniah. Nama baik yang sempat tercemar akan pulih dan dihormati kembali oleh lingkungan.',
    filosofi: 'Banyu suci sendang adalah simbol tirta amerta yang membasuh segala kotoran dosa dan penyakit.',
    anjuran: 'Bersuci dengan wudhu atau mandi keramas air dingin di pagi hari, kuatkan niat hidup bersih.',
    kataKunci: ['mandi', 'sendang', 'sungai jernih', 'air bersih', 'mandi keramas'],
  },

  // 3. PERISTIWA ALAM & SUPRANATURAL
  {
    id: 'm-banjir-jernih',
    judul: 'Mimpi Melihat Banjir Air Jernih Meluap',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦧꦚ꧀ꦗꦶꦂꦧꦼꦤꦶꦁ',
    kategori: 'alam',
    kategoriLabel: 'Peristiwa Alam',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Jika air banjirnya jernih: rezeki berlimpah akan datang bertubi-tubi hingga mencukupi sanak keluarga. Jika air banjirnya keruh berlumpur: isyarat waspada terhadap fitnah atau masalah keuangan.',
    filosofi: 'Air melambangkan arus kehidupan dan rezeki; kejernihannya mencerminkan kehalalan dan ketentraman batin.',
    anjuran: 'Bila airnya keruh, perbanyak istighfar dan sedekah penolak sengkala. Bila jernih, siapkan wadah tabungan masa depan.',
    kataKunci: ['banjir', 'air banjir', 'banjir bandang', 'air meluap', 'tenggelam', 'sungai meluap'],
  },
  {
    id: 'm-gunung-meletus',
    judul: 'Mimpi Melihat Gunung Meletus Mengeluarkan Lahar',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦒꦸꦤꦸꦁꦚ꧀ꦗꦼꦧ꧀ꦭꦸꦒ꧀',
    kategori: 'alam',
    kategoriLabel: 'Peristiwa Alam',
    firasat: 'Ujian Kesabaran',
    makna: 'Akan ada guncangan atau perubahan drastis dalam lingkungan kerja, keluarga, atau negara. Namun setelah goncangan itu reda, akan tercipta kesuburan tanah dan kemakmuran baru.',
    filosofi: 'Gunung meletus adalah hukum alam (sunnatullah) untuk menyuburkan kembali persada nusantara.',
    anjuran: 'Siapkan mental fleksibel terhadap perubahan zaman, jangan panik dan berpegang teguh pada prinsip hidup.',
    kataKunci: ['gunung meletus', 'lahar', 'gempa bumi', 'erupsi', 'gunung', 'bencana'],
  },
  {
    id: 'm-hujan-lebat-pelangi',
    judul: 'Mimpi Hujan Lebat Disertai Pelangi (Kluwung)',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦲꦸꦢꦤ꧀ꦭꦤ꧀ꦏ꧀ꦭꦸꦮꦸꦁ',
    kategori: 'alam',
    kategoriLabel: 'Peristiwa Alam',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Pertanda datangnya masa-masa kejayaan setelah melewati masa prihatin yang panjang. Harapan yang sempat pupus akan bersemi kembali.',
    filosofi: 'Kluwung (pelangi) adalah jembatan berkah dewa-dewa yang menghubungkan doa bumi dengan rahmat langit.',
    anjuran: 'Sambut masa depan dengan senyuman dan optimisme baru, lupakan kepedihan masa lalu.',
    kataKunci: ['hujan', 'hujan lebat', 'pelangi', 'kluwung', 'gerimis', 'langit cerah'],
  },
  {
    id: 'm-melihat-gerhana',
    judul: 'Mimpi Melihat Gerhana Bulan atau Matahari',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦒꦿꦲꦤ',
    kategori: 'alam',
    kategoriLabel: 'Peristiwa Alam',
    firasat: 'Peringatan & Mawas Diri',
    makna: 'Pertanda ada tokoh pemimpin yang sedang diuji atau adanya kegelapan sesaat dalam mengambil keputusan penting. Hindari spekulasi bisnis berisiko tinggi.',
    filosofi: 'Gerhana (candragraha/suryagraha) adalah pengingat bahwa cahaya terang duniawi bisa redup sekejap mata.',
    anjuran: 'Tunda keputusan besar selama 3 hari setelah mimpi, lakukan tafakur di waktu malam.',
    kataKunci: ['gerhana', 'gerhana bulan', 'gerhana matahari', 'bulan gelap', 'matahari gelap'],
  },
  {
    id: 'm-rumah-kebakaran',
    judul: 'Mimpi Rumah Terbakar Tapi Tidak Hangus Habis',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦲꦺꦴꦩꦃꦏꦼꦠꦸꦤꦺꦴ',
    kategori: 'alam',
    kategoriLabel: 'Peristiwa Alam',
    firasat: 'Ujian Kesabaran',
    makna: 'Hawa nafsu amarah atau kecemburuan sedang memanas di dalam lingkaran keluarga. Jika api berhasil dipadamkan, masalah akan selesai dengan damai dan saling memaafkan.',
    filosofi: 'Api (geni) adalah unsur Purba yang jika dikendalikan menjadi penghangat, bila dibiarkan membakar keharmonisan.',
    anjuran: 'Dinginkan kepala saat berbicara dengan pasangan atau kerabat dekat, utamakan musyawarah mufakat.',
    kataKunci: ['kebakaran', 'api', 'rumah terbakar', 'memadamkan api', 'asap'],
  },

  // 4. KEMATIAN & LELUHUR
  {
    id: 'm-berjumpa-leluhur',
    judul: 'Mimpi Didatangi Orang Tua / Kakek Nenek yang Sudah Wafat',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦥꦶꦤꦁꦒꦶꦃꦭꦺꦭꦸꦲꦸꦂ',
    kategori: 'leluhur',
    kategoriLabel: 'Kematian & Leluhur',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Leluhur hadir untuk memberikan wejangan perlindungan, merestui ikhtiar hidup Anda, atau mengingatkan untuk mengirimkan doa arwah dan merawat makam pusara.',
    filosofi: 'Ikatan batin trah leluhur tidak pernah putus walau terpisah raga dan sukma (mikul dhuwur mendhem jero).',
    anjuran: 'Kirimkan doa tahlil / fatihah, bersihkan makam keluarga, dan laksanakan amanah baik yang pernah diwasiatkan.',
    kataKunci: ['orang tua meninggal', 'kakek nenek', 'leluhur', 'arwah', 'ziarah kubur', 'jenazah'],
  },
  {
    id: 'm-melihat-jenazah-keranda',
    judul: 'Mimpi Melihat Jenazah atau Keranda Mayat Diusung',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦩꦤꦶꦁꦒꦭ꧀ꦭꦤ꧀ꦏꦿꦤ꧀ꦝ',
    kategori: 'leluhur',
    kategoriLabel: 'Kematian & Leluhur',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Bertentangan dengan kesan seramnya, dalam tafsir Primbon Jawa ini adalah isyarat panjang umur, keselamatan dari mara bahaya, dan akan berakhirnya masa kesusahan.',
    filosofi: 'Kematian dalam mimpi adalah simbol matinya masa paceklik dan lahirnya masa kemakmuran baru.',
    anjuran: 'Bersyukur atas nafas hidup yang masih diberikan, jadikan pengingat untuk memperbanyak amal kebajikan.',
    kataKunci: ['mayat', 'jenazah', 'keranda', 'kematian', 'orang meninggal', 'kuburan'],
  },
  {
    id: 'm-diri-sendiri-mati',
    judul: 'Mimpi Diri Sendiri Meninggal Dunia',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦥꦼꦗꦃꦥꦶꦪꦩ꧀ꦧꦏ꧀',
    kategori: 'leluhur',
    kategoriLabel: 'Kematian & Leluhur',
    firasat: 'Derajat & Kehormatan',
    makna: 'Firasat akan mengalami transformasi batin yang agung, taubat dari kebiasaan buruk, dan terbukanya pintu rizki baru yang lebih barokah.',
    filosofi: 'Mati raga adalah simbol lahirnya sukma sejati yang suci dan jernih memandang dunia.',
    anjuran: 'Lakukan sedekah weton jenang abang putih sebagai tanda syukur atas kehidupan baru.',
    kataKunci: ['diri sendiri mati', 'meninggal dunia', 'sakaratul maut', 'kafan'],
  },

  // 5. BENDA PUSAKA & GAIB
  {
    id: 'm-diberi-keris',
    judul: 'Mimpi Diberi atau Menemukan Keris Berluk',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦥꦶꦤꦫꦶꦔꦤ꧀ꦏꦼꦫꦶꦱ꧀',
    kategori: 'pusaka',
    kategoriLabel: 'Pusaka & Gaib',
    firasat: 'Derajat & Kehormatan',
    makna: 'Akan mendapat kedudukan terhormat, kepercayaan dari pimpinan, kewibawaan tinggi, atau lahirnya anak laki-laki yang berani dan bertanggung jawab.',
    filosofi: 'Keris adalah curiga, lambang ketajaman akal budi, keteguhan prinsip, dan senjata perlindungan kehormatan diri.',
    anjuran: 'Jaga amanah dengan penuh ketulusan, jangan menggunakan pengaruh atau kekuasaan untuk menindas orang lemah.',
    kataKunci: ['keris', 'pusaka', 'keris luk', 'diberi keris', 'tombak', 'pedang'],
  },
  {
    id: 'm-batu-akik-mustika',
    judul: 'Mimpi Menemukan Batu Akik / Mustika Berkilau',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦩꦸꦱ꧀ꦠꦶꦏ',
    kategori: 'pusaka',
    kategoriLabel: 'Pusaka & Gaib',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Mendapat ilmu kebatinan atau keahlian khusus yang langka, serta pancaran daya tarik pesona (pengasihan) yang menyenangkan banyak orang.',
    filosofi: 'Mustika adalah saripati bumi yang memancarkan keteguhan hati dan ketenangan aura batin.',
    anjuran: 'Gunakan kecerdasan dan kemampuan Anda untuk membantu sesama yang membutuhkan pertolongan.',
    kataKunci: ['mustika', 'batu akik', 'permata', 'batu mulia', 'intan', 'berlian'],
  },
  {
    id: 'm-mahkota-selendang',
    judul: 'Mimpi Memakai Mahkota Emas atau Selendang Sutra',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦩꦏꦸꦛꦏꦼꦤ꧀ꦕꦤ',
    kategori: 'pusaka',
    kategoriLabel: 'Pusaka & Gaib',
    firasat: 'Derajat & Kehormatan',
    makna: 'Kemuliaan derajat, kemenangan dalam kompetisi atau pemilihan, serta penghormatan tulus dari masyarakat luas.',
    filosofi: 'Mahkota adalah lambang amanah kepemimpinan yang harus dipikul dengan rasa adil dan bijaksana.',
    anjuran: 'Selalu ingat amanah rakyat dan keluarga, jangan silau oleh pujian semu.',
    kataKunci: ['mahkota', 'selendang', 'baju raja', 'keraton', 'tahta', 'kursi pimpinan'],
  },

  // 6. REZEKI & HARTA
  {
    id: 'm-menemukan-emas-uang',
    judul: 'Mimpi Menemukan Emas Batangan atau Uang Banyak',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦤꦼꦩꦸꦩꦱ꧀ꦭꦤ꧀ꦝꦸꦮꦶꦠ꧀',
    kategori: 'rezeki',
    kategoriLabel: 'Rezeki & Harta',
    firasat: 'Peringatan & Mawas Diri',
    makna: 'Dalam primbon Jawa, mimpi menemukan uang koin/kertas sering kali bukan berarti dapat uang kaget, melainkan peringatan akan adanya pengeluaran mendadak atau ujian penyakit ringan.',
    filosofi: 'Uang duniawi dalam mimpi sering menjadi cermin beban pikiran atas urusan nafkah yang sedang mencemaskan.',
    anjuran: 'Tata anggaran keuangan dengan bijak, hindari belanja berlebihan, dan sedekahkan sebagian rezeki Anda.',
    kataKunci: ['emas', 'uang', 'uang banyak', 'menemukan uang', 'emas batangan', 'perhiasan'],
  },
  {
    id: 'm-panen-padi-beras',
    judul: 'Mimpi Panen Padi Menguning di Sawah Luas',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦥꦤꦺꦤ꧀ꦥꦫꦶ',
    kategori: 'rezeki',
    kategoriLabel: 'Rezeki & Harta',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Isyarat kemakmuran pangan dan sandang, keluarga akan terbebas dari jeratan hutang, dan hidup tenteram ayem tentrem.',
    filosofi: 'Padi melambangkan Dewi Sri, ibu pertiwi pemberi kehidupan dan kearifan: makin berisi makin merunduk.',
    anjuran: 'Jaga sifat rendah hati dan jangan lupa berbagi bahan pangan kepada tetangga terdekat.',
    kataKunci: ['panen', 'padi', 'sawah', 'beras', 'lumbung padi', 'petani'],
  },
  {
    id: 'm-membangun-rumah',
    judul: 'Mimpi Membangun Rumah Baru yang Megah dan Kokoh',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦪꦱꦲꦺꦴꦩꦃꦲꦚꦂ',
    kategori: 'rezeki',
    kategoriLabel: 'Rezeki & Harta',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Fondasi ekonomi keluarga semakin kokoh, usaha mandiri akan menancapkan akar yang kuat dan bertahan lama dari badai krisis.',
    filosofi: 'Rumah adalah benteng ketentraman batin dan wadah berkumpulnya sakinah mawaddah warahmah.',
    anjuran: 'Rencanakan investasi jangka panjang dengan hati-hati dan matang bersama pasangan.',
    kataKunci: ['rumah', 'bangun rumah', 'rumah baru', 'renovasi rumah', 'gedung'],
  },

  // 7. ASMARA & PERKAWINAN
  {
    id: 'm-menikah-lagi-manten',
    judul: 'Mimpi Menjadi Pengantin atau Bersanding di Pelaminan',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦢꦝꦶꦩꦤ꧀ꦠꦺꦤ꧀',
    kategori: 'asmara',
    kategoriLabel: 'Asmara & Pernikahan',
    firasat: 'Peringatan & Mawas Diri',
    makna: 'Dalam primbon Jawa kuna, bermimpi dirias menjadi pengantin sering kali menjadi peringatan tubuh sedang mengalami kelelahan daya tahan (rentan sakit flu/demam) atau ada ujian godaan asmara.',
    filosofi: 'Riasan pengantin adalah tabir pesona yang menyembunyikan ujian komitmen sejati dalam hidup.',
    anjuran: 'Perbanyak istirahat, minum vitamin/jamu tradisional beras kencur, dan jaga kesetiaan terhadap ikatan janji suci.',
    kataKunci: ['menikah', 'pengantin', 'manten', 'pelaminan', 'gaun pengantin', 'dirias'],
  },
  {
    id: 'm-diberi-bunga-melati',
    judul: 'Mimpi Diberi Rangkaian Bunga Melati Wangi',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦏꦼꦩ꧀ꦧꦁꦩ꧀ꦭꦛꦶ',
    kategori: 'asmara',
    kategoriLabel: 'Asmara & Pernikahan',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Akan terjalin hubungan asmara yang tulus suci, mendapatkan pasangan yang setia lahir batin, dan keharuman nama baik keluarga.',
    filosofi: 'Kembang melati mencerminkan kesucian hati (sukma suci) dan aroma budi pekerti luhur yang abadi.',
    anjuran: 'Jaga ketulusan cinta, jangan menuntut kesempurnaan materi dari pasangan hidup.',
    kataKunci: ['bunga', 'melati', 'kembang', 'bunga mawar', 'wewangian', 'kekasih'],
  },
  {
    id: 'm-kehilangan-cincin',
    judul: 'Mimpi Cincin Kawin Hilang atau Terlepas dari Jari',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦱꦺꦱꦺꦩ꧀ꦥꦼꦭꦁ',
    kategori: 'asmara',
    kategoriLabel: 'Asmara & Pernikahan',
    firasat: 'Ujian Kesabaran',
    makna: 'Isyarat adanya kesalahpahaman kecil dengan pasangan yang jika dibiarkan bisa merenggangkan keharmonisan komunikasi.',
    filosofi: 'Cincin adalah simbol lingkaran komitmen tak berujung yang perlu dirawat dengan saling mendengarkan.',
    anjuran: 'Ajak pasangan berbicara dari hati ke hati, hindari gengsi dan saling menyalahkan.',
    kataKunci: ['cincin', 'cincin kawin', 'cincin hilang', 'cincin patah', 'pasangan', 'cerai'],
  },
  {
    id: 'm-melihat-bintang-jatuh',
    judul: 'Mimpi Melihat Bintang Jatuh (Andaru / Wahyu)',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦭꦶꦤ꧀ꦠꦁꦲꦚ꧀ꦕ꧀ꦭꦺꦴꦏ꧀',
    kategori: 'alam',
    kategoriLabel: 'Peristiwa Alam',
    firasat: 'Derajat & Kehormatan',
    makna: 'Isyarat turunan wahyu andaru atau pulung keberuntungan besar. Keinginan luhur yang dipanjatkan dalam doa hening akan diijabah oleh Gusti Allah.',
    filosofi: 'Lintang kemukus atau andaru adalah perwujudan pulung keraton yang memilih orang yang sabar dan prihatin.',
    anjuran: 'Manfaatkan momentum keberuntungan untuk beramal kebajikan dan memperkuat ibadah spiritual.',
    kataKunci: ['bintang jatuh', 'andaru', 'wahyu', 'pulung', 'meteor', 'langit malam'],
  },
  {
    id: 'm-menyeberangi-jembatan',
    judul: 'Mimpi Menyeberangi Jembatan Panjang dengan Selamat',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦚꦼꦚꦧꦿꦁꦏꦿꦺꦠꦺꦒ꧀',
    kategori: 'tubuh',
    kategoriLabel: 'Tubuh & Kesehatan',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Berhasil melewati fase kritis dalam hidup (ujian kelulusan, krisis finansial, atau sakit berat) menuju babak baru yang lebih mapan.',
    filosofi: 'Kreteg (jembatan) melambangkan titian siratal mustaqim dalam kehidupan duniawi yang membutuhkan keseimbangan langkah.',
    anjuran: 'Tetap fokus ke depan, jangan menoleh ke belakang dengan penyesalan yang tidak perlu.',
    kataKunci: ['jembatan', 'menyeberang sungai', 'kreteg', 'titian', 'selamat'],
  },
  {
    id: 'm-naik-kuda-putih',
    judul: 'Mimpi Menunggangi Kuda Gagah Berwarna Putih',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦤꦸꦁꦒꦁꦗꦫꦤ꧀',
    kategori: 'hewan',
    kategoriLabel: 'Hewan & Satwa',
    firasat: 'Derajat & Kehormatan',
    makna: 'Pertanda kemajuan karir yang sangat pesat, disegani oleh kawan maupun lawan, dan memiliki kendali penuh atas arah hidup pribadi.',
    filosofi: 'Jaran (kuda) melambangkan hawa nafsu yang berhasil dijinakkan oleh akal budi sang kusir sejati.',
    anjuran: 'Pimpin keluarga atau tim Anda dengan keteladanan budi pekerti (ing ngarsa sung tuladha).',
    kataKunci: ['kuda', 'kuda putih', 'menunggang kuda', 'jaran', 'kereta kuda'],
  },
  {
    id: 'm-melihat-wayang-kulit',
    judul: 'Mimpi Menonton Pagelaran Wayang Kulit Semalam Suntuk',
    aksara: 'ꦔꦶꦩ꧀ꦥꦶꦤꦺꦴꦤ꧀ꦠꦺꦴꦤ꧀ꦮꦪꦁ',
    kategori: 'pusaka',
    kategoriLabel: 'Pusaka & Gaib',
    firasat: 'Kebaikan & Rezeki',
    makna: 'Mendapat pencerahan batin (wejangan urip) atas keraguan yang dialami, serta menemukan solusi bijak dari masalah yang rumit.',
    filosofi: 'Kelir wayang adalah cermin kehidupan semesta (jagad cilik lan jagad gedhe), dalang adalah sang Maha Pengatur lakon.',
    anjuran: 'Renungkan lakon hidup Anda, jadilah ksatria penegak kebenaran seperti para Pandawa.',
    kataKunci: ['wayang', 'wayang kulit', 'dalang', 'kelir', 'semar', 'pandawa'],
  },
];

/**
 * Filter and search function
 */
export function cariArtiMimpi(
  query: string,
  kategoriFilter?: string,
  firasatFilter?: string
): ArtiMimpiItem[] {
  const q = query.trim().toLowerCase();

  return PRIMBON_MIMPI_DATABASE.filter((item) => {
    // Kategori match
    if (kategoriFilter && kategoriFilter !== 'semua' && item.kategori !== kategoriFilter) {
      return false;
    }

    // Firasat match
    if (firasatFilter && firasatFilter !== 'semua' && item.firasat !== firasatFilter) {
      return false;
    }

    // Query match
    if (!q) return true;

    const inJudul = item.judul.toLowerCase().includes(q);
    const inMakna = item.makna.toLowerCase().includes(q);
    const inFilosofi = item.filosofi.toLowerCase().includes(q);
    const inKeywords = item.kataKunci.some((k) => k.toLowerCase().includes(q));

    return inJudul || inMakna || inFilosofi || inKeywords;
  });
}
