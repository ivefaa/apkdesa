import type {
  Destination,
  GalleryItem,
  TourPackage,
  VisitorReview,
} from '../types/tourism';

export const HERO_IMAGE = '/src/assets/images/hero_lereng_asri_1794886803724.jpg';

export const VILLAGE_CENTER = {
  lat: -7.4508,
  lng: 110.4368,
};

export const VILLAGE_ADDRESS =
  'Jl. Raya Lereng Asri No. 18, Kec. Selo Asri, Kab. Semarang, Jawa Tengah 50774';

export const DESTINATIONS: Destination[] = [
  {
    id: 'air-terjun-embun',
    name: 'Air Terjun Embun Pelangi',
    category: 'alam',
    categoryLabel: 'Alam & Air Terjun',
    shortDesc:
      'Air terjun alami setinggi 28 meter dengan kolam jernih yang aman untuk bermain air dan bersantai.',
    fullDesc:
      'Terletak di lembah hijau yang teduh, Air Terjun Embun Pelangi menawarkan aliran mata air pegunungan yang jernih sepanjang tahun. Jalur jalan kaki menuju lokasi sudah tertata rapi dengan tangga batu ramah keluarga dan gazebo peristirahatan.',
    image: '/src/assets/images/dest_air_terjun_1794886803702.jpg',
    imageAlt: 'Air Terjun Embun Pelangi dikelilingi pepohonan hijau Desa Wisata Lereng Asri',
    openHours: '07.00 – 17.00 WIB',
    ticketPrice: 15000,
    distanceFromGate: '10 menit jalan santai',
    facilities: ['Area Parkir Luas', 'Gazebo Teduh', 'Toilet Bersih', 'Mushola'],
    coordinates: { lat: -7.4489, lng: 110.4345 },
  },
  {
    id: 'kebun-kopi-teh',
    name: 'Agrowisata Kebun Kopi & Teh',
    category: 'agrowisata',
    categoryLabel: 'Agrowisata & Edukasi',
    shortDesc:
      'Petik daun teh segar, belajar menyangrai kopi arabika lereng, dan nikmati seduhan hangat di teras bukit.',
    fullDesc:
      'Bersama petani lokal yang ramah, pengunjung diajak menyusuri terasering kebun kopi arabika dan teh hijau di ketinggian 1.150 mdpl. Anda dapat mencoba memetik pucuk teh, melihat proses sangrai tradisional, hingga mencicipi kopi tubruk khas desa.',
    image: '/src/assets/images/dest_kebun_kopi_1794886803883.jpg',
    imageAlt: 'Terasering kebun kopi dan teh hijau di lereng bukit berkabut pagi',
    openHours: '06.30 – 16.30 WIB',
    ticketPrice: 25000,
    distanceFromGate: '12 menit via jalur setapak',
    facilities: ['Pemandu Petani', 'Cicip Kopi Gratis', 'Toko Oleh-oleh', 'Spot Foto'],
    coordinates: { lat: -7.4524, lng: 110.4392 },
  },
  {
    id: 'bumi-perkemahan-pinus',
    name: 'Hutan Pinus & Glamping Asri',
    category: 'menginap',
    categoryLabel: 'Camping & Menginap',
    shortDesc:
      'Area kemah dan tenda keluarga di bawah rindangnya pohon pinus dengan dek kayu dan api unggun malam.',
    fullDesc:
      'Nikmati malam pegunungan yang tenang tanpa repot membawa perlengkapan kemah. Tersedia dek kayu rata, tenda kanvas keluarga berkapasitas 4 orang lengkap dengan kasur empuk, selimut tebal, listrik, dan area api unggun bersama.',
    image: '/src/assets/images/dest_camping_pinus_1794886803760.jpg',
    imageAlt: 'Tenda glamping kanvas hangat di tengah hutan pinus Lereng Asri saat senja',
    openHours: '24 Jam (Check-in 14.00 WIB)',
    ticketPrice: 35000,
    distanceFromGate: '8 menit berkendara',
    facilities: ['Tenda & Kasur', 'Listrik & Lampu', 'Kamar Mandi Air Hangat', 'Api Unggun'],
    coordinates: { lat: -7.4472, lng: 110.4388 },
  },
  {
    id: 'pendopo-homestay-kuliner',
    name: 'Pendopo Homestay & Dapur Desa',
    category: 'menginap',
    categoryLabel: 'Homestay & Kuliner',
    shortDesc:
      'Menginap hangat bersama warga desa sambil menikmati hidangan nasi liwet daun pisang dan teh herbal.',
    fullDesc:
      'Rumah kayu tradisional yang bersih dan asri dikelola langsung oleh keluarga warga Lereng Asri. Tamu disambut dengan teh serai hangat serta sarapan masakan rumahan tradisional seperti tempe mendoan, sayur lodeh, dan sambal terasi segar.',
    image: '/src/assets/images/galeri_kuliner_homestay_1794886803784.jpg',
    imageAlt: 'Teras homestay kayu dan sajian kuliner tradisional desa di atas tampah bambu',
    openHours: '07.00 – 21.00 WIB',
    ticketPrice: 20000,
    distanceFromGate: '3 menit dari gerbang desa',
    facilities: ['Kamar Nyaman', 'Wi-Fi', 'Makan Tradisional', 'Teras Kebun'],
    coordinates: { lat: -7.4513, lng: 110.4359 },
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'paket-sehari-asri',
    name: 'Paket Jelajah Sehari Penuh',
    duration: '1 Hari (08.00 – 16.00 WIB)',
    pricePerPerson: 125000,
    minGuests: 2,
    recommendedFor: 'Keluarga & Pasangan',
    summary:
      'Kunjungan lengkap ke Air Terjun Embun Pelangi, wisata petik teh & seduh kopi, plus makan siang di pendopo.',
    includes: [
      'Tiket masuk seluruh destinasi utama',
      'Pemandu lokal desa yang ramah',
      '1x Makan siang nasi liwet tradisional',
      'Welcome drink teh serai & camilan',
    ],
    popular: true,
  },
  {
    id: 'paket-edukasi-kopi',
    name: 'Paket Agrowisata & Seduh Kopi',
    duration: 'Setengah Hari (4 Jam)',
    pricePerPerson: 85000,
    minGuests: 2,
    recommendedFor: 'Pecinta Kopi & Pelajar',
    summary:
      'Tur kebun kopi arabika dan teh lereng, praktik sangrai tradisional bersama petani, serta pulang membawa kopi bubuk.',
    includes: [
      'Tur jalan kaki kebun kopi & teh',
      'Workshop sangrai & seduh manual',
      '100g kopi arabika Lereng Asri',
      'Camilan gorengan hangat & teh manis',
    ],
  },
  {
    id: 'paket-menginap-pinus',
    name: 'Paket Menginap 2H1M Glamping Pinus',
    duration: '2 Hari 1 Malam',
    pricePerPerson: 340000,
    minGuests: 2,
    recommendedFor: 'Keluarga & Komunitas',
    summary:
      'Pengalaman menginap nyaman di tenda glamping hutan pinus lengkap dengan api unggun, makan 3 kali, dan jelajah air terjun.',
    includes: [
      'Tenda glamping kasur empuk & selimut',
      'Makan malam hangat & sarapan desa',
      'Paket api unggun & jagung bakar',
      'Tiket Air Terjun & Kebun Kopi pagi',
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Panorama Pagi Lereng Asri',
    caption: 'Kabut tipis menyelimuti terasering sawah dan rumah warga saat matahari terbit.',
    category: 'Pemandangan Desa',
    image: HERO_IMAGE,
    imageAlt: 'Pemandangan pagi hari Desa Wisata Lereng Asri dengan gazebo bambu dan bukit hijau',
  },
  {
    id: 'g2',
    title: 'Kesegaran Air Terjun Embun Pelangi',
    caption: 'Jalur tangga kayu dan batu alam memudahkan wisatawan menikmati gemericik air pegunungan.',
    category: 'Wisata Alam',
    image: '/src/assets/images/dest_air_terjun_1794886803702.jpg',
    imageAlt: 'Air terjun alami dengan kolam hijau jernih di hutan Lereng Asri',
  },
  {
    id: 'g3',
    title: 'Menyusuri Kebun Kopi & Teh',
    caption: 'Aktivitas pagi hari berjalan santai bersama petani lokal menyapa udara segar lereng.',
    category: 'Agrowisata',
    image: '/src/assets/images/dest_kebun_kopi_1794886803883.jpg',
    imageAlt: 'Petani berjalan di jalur batu kebun teh dan kopi hijau',
  },
  {
    id: 'g4',
    title: 'Senja Hangat di Hutan Pinus',
    caption: 'Lampu lentera menyala di dek glamping menjelang acara api unggun malam.',
    category: 'Camping & Menginap',
    image: '/src/assets/images/dest_camping_pinus_1794886803760.jpg',
    imageAlt: 'Suasana sore hari di area glamping hutan pinus dengan lampu hangat',
  },
  {
    id: 'g5',
    title: 'Jamuan Ramah Pendopo Desa',
    caption: 'Sajian kuliner tradisional hangat langsung dari dapur keluarga warga Lereng Asri.',
    category: 'Kuliner & Budaya',
    image: '/src/assets/images/galeri_kuliner_homestay_1794886803784.jpg',
    imageAlt: 'Warga dan wisatawan menikmati hidangan tradisional di teras homestay kayu',
  },
];

export const INITIAL_REVIEWS: VisitorReview[] = [
  {
    id: 'rev-1',
    visitorName: 'Ibu Ratna Wijaya',
    city: 'Semarang',
    packageName: 'Paket Jelajah Sehari Penuh',
    rating: 5,
    comment:
      'Membawa orang tua dan anak-anak ke sini sangat berkesan. Jalannya tertata rapi, pemandunya sabar menunggu, dan makan siang nasi liwet di pendopo rasanya nikmat sekali.',
    visitDate: '09 Nov 2026',
    verified: true,
  },
  {
    id: 'rev-2',
    visitorName: 'Mas Dimas Prakoso',
    city: 'Yogyakarta',
    packageName: 'Paket Menginap 2H1M Glamping Pinus',
    rating: 5,
    comment:
      'Tidur di tenda hutan pinus udaranya sejuk tapi kasur dan selimutnya hangat. Kamar mandi air panasnya juga berfungsi baik dan sangat bersih.',
    visitDate: '03 Nov 2026',
    verified: true,
  },
  {
    id: 'rev-3',
    visitorName: 'Sari Wulandari',
    city: 'Solo',
    packageName: 'Paket Agrowisata & Seduh Kopi',
    rating: 5,
    comment:
      'Baru pertama kali coba sangrai kopi langsung pakai wajan tanah liat bareng Pak Tono. Pemandangan kebun teh pas pagi hari bikin betah lama-lama.',
    visitDate: '27 Okt 2026',
    verified: true,
  },
  {
    id: 'rev-4',
    visitorName: 'Bapak Hendra Kusuma',
    city: 'Jakarta',
    packageName: 'Paket Jelajah Sehari Penuh',
    rating: 4,
    comment:
      'Pemesanan lewat WhatsApp sangat cepat direspons admin desa. Tempat parkir luas untuk rombongan mobil keluarga, cocok untuk melepas penat akhir pekan.',
    visitDate: '19 Okt 2026',
    verified: true,
  },
];
