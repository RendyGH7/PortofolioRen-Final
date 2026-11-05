export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web App' | 'E-Commerce' | 'Data & AI' | 'Architecture';
  year: string;
  role: string;
  summary: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  features: string[];
  problem: string;
  solution: string;
  architectureNodes: { name: string; role: string; latency?: string }[];
  codeSnippet: string;
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  description: string;
  technologies: string[];
  highlight?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  level: string;
  description: string;
}

export const PERSONAL_DATA = {
  name: "Rendy Fernando Tambunan",
  nickname: "Rendy",
  monogram: "RFT",
  role: "Full Stack Developer",
  location: "Jakarta Timur, DKI Jakarta",
  timeZone: "Asia/Jakarta (WIB • GMT+7)",
  email: "rendyftbaru@gmail.com",
  phone: "+62 896-6955-7444",
  socials: {
    github: "https://github.com/RendyGH7",
    linkedin: "https://www.linkedin.com/in/rendy-fernando-a68a362b1/",
    instagram: "https://www.instagram.com/renfertz/",
    tiktok: "https://www.tiktok.com/@renfertzz",
  },
  education: {
    school: "SMK Negeri 26 Jakarta",
    major: "Sistem Informasi Jaringan dan Aplikasi (SIJA)",
    period: "2023 - 2027",
    note: "Fokus kejuruan pada rekayasa perangkat lunak, arsitektur jaringan komputer, dan infrastruktur cloud.",
  },
  aspirations: ["Software Engineer", "Tech Entrepreneur"],
  languages: [
    { name: "Indonesia", level: "Bahasa Ibu", pct: 100 },
    { name: "Inggris", level: "Kemampuan Kerja Profesional", pct: 85 },
  ],
  status: {
    available: true,
    text: "Tersedia untuk proyek & kolaborasi",
    textEn: "Available for projects & collaboration",
  },
  bio: {
    id: "Full Stack Developer berbasis di Jakarta dengan spesialisasi pengembangan antarmuka interaktif, arsitektur sistem modular, dan solusi digital yang terukur.",
    en: "Full Stack Developer based in Jakarta specializing in interactive interface engineering, modular system architecture, and measurable digital solutions.",
  },
};

export const HARD_SKILLS = [
  { name: "React & TS", category: "Frontend", level: 90 },
  { name: "Tailwind CSS", category: "Frontend", level: 95 },
  { name: "Laravel", category: "Backend Framework", level: 80 },
  { name: "Database (SQL)", category: "Database", level: 85 },
  { name: "Python", category: "Backend & Data", level: 82 },
  { name: "Node.js", category: "Backend", level: 86 },
  { name: "PHP", category: "Backend", level: 80 },
  { name: "Cloud & Linux", category: "Infrastructure", level: 84 },
  { name: "PostgreSQL / MySQL", category: "Database", level: 85 },
  { name: "Kotlin & XML", category: "Mobile", level: 70 },
];

export const AWARDS: AwardItem[] = [
  {
    id: "award-1",
    title: "Grand Finalis (Top 7) Turnamen Sains Data Nasional (TSDN)",
    issuer: "Data Academy",
    date: "Desember 2024",
    level: "Tingkat Nasional",
    description: "Meraih posisi 7 besar nasional dalam kompetisi analisis data skala besar dan pemodelan prediktif.",
  },
  {
    id: "award-2",
    title: "AI Upskilling Program with RSA",
    issuer: "Remote Skill Academy",
    date: "Juni 2025",
    level: "Pelatihan & Sertifikasi Profesional",
    description: "Penyelesaian intensif penerapan model kecerdasan artifisial terapan untuk efisiensi rekayasa perangkat lunak.",
  },
  {
    id: "award-3",
    title: "React Fundamental + Redux",
    issuer: "Skilvul",
    date: "September 2025",
    level: "Sertifikasi Industri",
    description: "Penguasaan arsitektur state terpusat, middleware asynchronous, dan lifecycle komponen React modern.",
  },
  {
    id: "award-4",
    title: "Peserta Seleksi LKS Web Design",
    issuer: "SMK Negeri 26 Jakarta",
    date: "Maret 2024",
    level: "Seleksi Kejuruan Internal",
    description: "Kompetisi desain web teknis mencakup standar aksesibilitas W3C, responsivitas presisi, dan performa kode.",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Founder & Lead Developer",
    organization: "Renfertz Store (Zeusx International)",
    period: "Agustus 2025 - Sekarang",
    type: "Digital Commerce",
    location: "Global",
    description: "Mendirikan dan mengelola platform layanan digital dengan catatan 1.000+ ulasan positif dari pengguna internasional.",
    technologies: ["React", "API Automation", "Webhooks", "Security"],
    highlight: "1.000+ Ulasan Positif",
  },
  {
    id: "exp-tsdn",
    role: "Data Science & Predictive Modeling Finalist",
    organization: "Turnamen Sains Data Nasional (TSDN) • Data Academy",
    period: "Oktober - Desember 2024",
    type: "Kompetisi Nasional",
    location: "Nasional",
    description: "Menganalisis dataset skala besar (500k+ baris data), rekayasa fitur data statistik, dan merancang model prediktif machine learning hingga meraih posisi Top 7 Grand Finalis tingkat nasional.",
    technologies: ["Python", "SQL", "Pandas", "Scikit-Learn", "Statistical Modeling"],
    highlight: "Top 7 Finalis Nasional",
  },
  {
    id: "exp-2",
    role: "Freelance UI/UX & Frontend Developer",
    organization: "Independen",
    period: "Mei 2025 - Sekarang",
    type: "Freelance",
    location: "Remote",
    description: "Merancang dan membangun antarmuka web modern dengan fokus pada performa instan dan pengalaman pengguna mulus.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    highlight: "Klien UMKM & Startup",
  },
  {
    id: "exp-3",
    role: "Cloud Computing Mentor",
    organization: "IT Club SMK Negeri 26 Jakarta",
    period: "Juli 2025 - Sekarang",
    type: "Mentorship",
    location: "Jakarta",
    description: "Membimbing anggota klub dalam fundamental komputasi awan, konfigurasi server Linux, dan praktik deployment web modern.",
    technologies: ["Linux", "Cloud Infrastructure", "Docker", "Networking"],
    highlight: "Membina 40+ Siswa",
  },
  {
    id: "exp-4",
    role: "Game Developer (Kontrak)",
    organization: "PT Sollu Filantropi Teknologi",
    period: "Agustus - Desember 2024",
    type: "Kontrak On Site",
    location: "Jakarta",
    description: "Mengembangkan logika permainan interaktif, optimalisasi aset grafis, dan sinkronisasi data antar sesi pengguna.",
    technologies: ["Game Logic", "UI Scripting", "Asset Optimization"],
    highlight: "Pengembangan Tim On Site",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "renstore",
    title: "RenStore",
    subtitle: "Modern Full-Stack E-Commerce & Tech Lifestyle Platform",
    category: "E-Commerce",
    year: "2026",
    role: "Founder & Full Stack Developer",
    summary: "Platform e-commerce modern & tech lifestyle dengan arsitektur decoupled (Laravel 11 REST API + React 19 Vite), checkout pembayaran QRIS dinamis, flash sale engine dengan countdown, shipment tracking, serta dashboard analitik administrator komprehensif.",
    metrics: [
      { label: "Ulasan Positif", value: "1.000+" },
      { label: "Arsitektur API", value: "Laravel 11" },
      { label: "Pembayaran QRIS", value: "Instan" },
    ],
    tags: ["Laravel 11", "React 19", "PostgreSQL", "TypeScript", "Tailwind CSS", "QRIS Payment"],
    features: [
      "Arsitektur decoupled: Frontend React 19 SPA + Backend Laravel 11 RESTful API berkinerja tinggi",
      "Checkout pembayaran dinamis QRIS sekali pindai dengan hitung mundur sesi dan validasi status otomatis",
      "Katalog gadget tech lifestyle unggulan, sistem Flash Sale dengan countdown timer, dan kupon diskon promo (DISKON50, RENSTORE2026)",
      "Dashboard analitik admin dengan grafik garis SVG interaktif, order tracking, dan manajemen pengguna",
      "Database PostgreSQL terindeks dengan seeder data akun role Administrator dan Customer bawaan",
    ],
    problem: "Platform e-commerce konvensional seringkali lambat, sulit dikelola di perangkat mobile, dan memiliki alur pembayaran checkout yang kaku sehingga menurunkan konversi penjualan.",
    solution: "Merancang platform decoupled modern dengan integrasi API Laravel yang bersih, database relasional PostgreSQL terstruktur, dan antarmuka responsif multi-device berkecepatan tinggi.",
    architectureNodes: [
      { name: "Frontend SPA", role: "React 19 + TypeScript + Vite", latency: "< 16ms" },
      { name: "Backend API", role: "Laravel 11 + Eloquent ORM + Sanctum", latency: "38ms" },
      { name: "Database Engine", role: "PostgreSQL 17 Relational Schema", latency: "12ms" },
      { name: "Payment Gateway", role: "Dynamic QRIS & Invoicing Engine", latency: "25ms" },
    ],
    codeSnippet: `// RenStore Dynamic QRIS Payment & Order Controller (Laravel 11)
namespace App\\Http\\Controllers\\Api;

use App\\Models\\Order;
use App\\Services\\Payment\\QrisService;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class CheckoutController extends Controller
{
    public function processQrisCheckout(Request $request, QrisService $qris): JsonResponse
    {
        $validated = $request->validate([
            'cart_items' => 'required|array|min:1',
            'shipping_address' => 'required|string',
            'voucher_code' => 'nullable|string'
        ]);

        $order = Order::createFromCart(auth()->user(), $validated);
        $qrisPayload = $qris->generateDynamicInvoice($order);

        return response()->json([
            'success' => true,
            'order_id' => $order->id,
            'qr_string' => $qrisPayload->qrString,
            'expires_at' => now()->addMinutes(15)->toIso8601String()
        ], 201);
    }
}`,
    accentColor: "#F5B027",
    githubUrl: "https://github.com/RendyGH7/renstore-project",
    liveUrl: "https://renstore-project.vercel.app/",
    imageUrl: "/assets/projects/renstore-showcase.jpg",
  },
  {
    id: "monetra",
    title: "Monetra",
    subtitle: "Asisten Keuangan Pribadi Berbasis AI & Pelacak Pengeluaran Pintar",
    category: "Web App",
    year: "2026",
    role: "Full Stack Lead & AI Engineer",
    summary: "Asisten keuangan pribadi bertenaga Google Gemini 2.5 Flash dan Web Audio DSP 4-tahap yang memungkinkan pencatatan transaksi secepat berbicara (Voice-to-Transaction), alokasi anggaran otomatis berbasis Aturan 50/30/20, kalkulasi sisa aman harian (Dynamic Daily Safe Spend), serta proteksi data Row Level Security (RLS) PostgreSQL di Supabase.",
    metrics: [
      { label: "Voice AI Latency", value: "< 2.5s" },
      { label: "Filter Vokal DSP", value: "4-Stage" },
      { label: "Isolasi Data", value: "100% RLS" },
    ],
    tags: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Google Gemini 2.5 Flash",
      "Supabase",
      "PostgreSQL RLS",
      "Web Audio API",
      "Zustand",
      "Recharts",
      "PWA"
    ],
    features: [
      "Pencatatan Suara Pintar (Voice-to-Transaction): Ekstraksi multi-transaksi dalam satu ucapan dengan pemahaman istilah nominal gaul rupiah (ceban, goceng, seceng, noceng, goban, 50 rebu, 1,5 juta)",
      "Rangkaian Filter Vokal Web Audio DSP 4-Tahap: 70Hz High-Pass (potong gemuruh/angin), 2.200Hz Peaking (+7.5dB artikulasi konsonan), 7.500Hz Low-Pass (potong desis/AC), dan Dynamics Compressor (-38dB)",
      "Alokasi Anggaran 50/30/20 & Dynamic Daily Safe Spend: Pengelompokan otomatis pos Kebutuhan (50%), Keinginan (30%), Tabungan (20%), serta kalkulasi sisa aman belanja harian",
      "Beranda Finansial & Visualisasi Arus Kas: Ringkasan Saldo Bersih (Net Worth), diagram arus kas Recharts interaktif (Mingguan, Bulanan, Tahunan), dan evaluasi skor kesehatan finansial",
      "FinAI Assistant & Adaptive Memory Engine: Konsultan keuangan interaktif bertenaga Google Gemini yang mempelajari preferensi pengguna, kebiasaan belanja, dan target tabungan",
      "Target Impian (Financial Goals) & Buku Utang-Piutang: Pemantauan batas anggaran kategori, estimasi waktu deadline tabungan, dan pelacakan utang-piutang dengan status lunas",
      "Keamanan Berstandar Bank: Isolasi penuh tiap baris data pengguna dengan Row Level Security (RLS) PostgreSQL di Supabase, autentikasi Google OAuth, dan ekspor riwayat data",
      "Desain Titanium & Ember serta PWA: Estetika dark titanium dengan aksen tembaga hangat (ember copper), kebijakan Zero-Emoji dengan Lucide SVG murni, dan instalasi PWA di iOS & Android",
    ],
    problem: "Banyak orang gagal mengelola keuangan pribadi bukan karena tidak memiliki niat, melainkan karena proses pencatatan manual yang lambat, melelahkan, dan buku kas pasif tanpa arahan perbaikan finansial.",
    solution: "Menggabungkan Voice-to-Transaction bertenaga Gemini 2.5 Flash dengan pemrosesan sinyal vokal Web Audio DSP 4-tahap, kalkulasi otomatis Aturan 50/30/20, dan perlindungan privasi isolasi PostgreSQL RLS di Supabase.",
    architectureNodes: [
      { name: "Client PWA (React 19)", role: "Zustand State, Web Speech Streaming, Recharts & PWA Cache", latency: "< 16ms" },
      { name: "Web Audio DSP Chain", role: "70Hz HPF + 2.2kHz Peaking + 7.5kHz LPF + Compressor", latency: "2ms" },
      { name: "Gemini 2.5 Multimodal AI", role: "Vocal Isolation, Multi-Transaction Extraction, Slang Currency Parser", latency: "1.8s" },
      { name: "Supabase PostgreSQL", role: "Row Level Security (auth.uid) + 50/30/20 Budget Engine", latency: "24ms" },
    ],
    codeSnippet: `// Monetra Web Audio Vocal DSP Enhancement Chain (Production VoiceModal.tsx)
export function initVocalDspChain(stream: MediaStream, audioCtx: AudioContext) {
  const source = audioCtx.createMediaStreamSource(stream);

  // 1. High-Pass Filter: Strips ambient sub-bass rumble, wind, phone vibrations (< 70 Hz)
  const highPass = audioCtx.createBiquadFilter();
  highPass.type = 'highpass';
  highPass.frequency.value = 70;

  // 2. Vocal Formant Peaking Filter: Boosts speech clarity (1800-3400Hz) by +7.5dB
  const vocalBoost = audioCtx.createBiquadFilter();
  vocalBoost.type = 'peaking';
  vocalBoost.frequency.value = 2200;
  vocalBoost.Q.value = 1.0;
  vocalBoost.gain.value = 7.5; // +7.5dB vocal boost for casual speech sensitivity

  // 3. Low-Pass Filter: Cuts off high-frequency hiss, fan noise, & AC (> 7500 Hz)
  const lowPass = audioCtx.createBiquadFilter();
  lowPass.type = 'lowpass';
  lowPass.frequency.value = 7500;

  // 4. Dynamics Compressor: Elevates soft speech & whispers to high clarity
  const compressor = audioCtx.createDynamicsCompressor();
  compressor.threshold.value = -38;
  compressor.knee.value = 25;
  compressor.ratio.value = 6.0;

  // Connect DSP chain -> Gemini Multimodal Voice-to-Transaction Pipeline
  source.connect(highPass);
  highPass.connect(vocalBoost);
  vocalBoost.connect(lowPass);
  lowPass.connect(compressor);

  return compressor;
}`,
    accentColor: "#E39A5E",
    githubUrl: "https://github.com/RendyGH7/Monetra-Apps",
    liveUrl: "https://monetra-apps.vercel.app",
    imageUrl: "/assets/projects/monetra-showcase.jpg",
  },
];

