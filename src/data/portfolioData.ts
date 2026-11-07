export interface ProjectFeature {
  title: string;
  desc: string;
}

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
  features: ProjectFeature[];
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
  web3FormsAccessKey: "", // Opsional: Dapatkan Access Key gratis di https://web3forms.com untuk pengiriman otomatis tanpa membuka email
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
    id: "warisara",
    title: "WariSara",
    subtitle: "Gerbang Warisan Budaya Nusantara & Studio Kriya Interaktif",
    category: "Web App",
    year: "2026",
    role: "Lead Frontend & Creative Technologist",
    summary: "Ekosistem web kultural interaktif untuk pelestarian warisan 38 provinsi Nusantara dengan peta vektor dinamis, Creative Lab Studio 2.0 (generator motif batik parametrik & kanvas canting digital), buku pusaka lisan 3D, dan direktori ekonomi kreatif perajin lokal.",
    metrics: [
      { label: "Cakupan Budaya", value: "38 Provinsi" },
      { label: "Konteks Lomba", value: "TECHTOPIA 2" },
      { label: "Arsitektur", value: "Native JS" },
    ],
    tags: [
      "Vanilla JavaScript (ES6+)",
      "HTML5 Canvas 2D",
      "Tailwind CSS",
      "SVG Interactive Map",
      "Web Audio API",
      "Parametric Design",
      "Creative Lab 2.0",
      "Cultural Tech",
    ],
    features: [
      {
        title: "Peta Vektor 38 Provinsi & Paspor Digital",
        desc: "Eksplorasi geografis interaktif dengan transisi smooth pan-zoom, discovery sheet budaya lokal, dan pencatatan kunjungan otomatis ke paspor penjelajah.",
      },
      {
        title: "Creative Lab Studio 2.0 (Wastra Parametrik)",
        desc: "Generator motif geometris Nusantara (Kawung, Megamendung, Parang) dengan kontrol densitas real-time, simulasi lilin malam canting digital, dan proyeksi busana 3D.",
      },
      {
        title: "Buku Cerita Pusaka Lisan 3D",
        desc: "Dokumentasi wejangan tutur lisan maestro kriya yang dipadukan dengan efek 3D page-flip dan Web Audio sintesis narasi interaktif.",
      },
      {
        title: "Ekonomi Kreatif & Kuis WBTb",
        desc: "Konektivitas etalase kriya langsung ke perajin daerah serta ruang micro-learning dan kuis wawasan berbasis data UNESCO & Kemendikbudristek.",
      },
    ],
    problem: "Generasi muda kerap memandang kebudayaan nusantara sebagai artefak pasif yang kaku di museum atau lembaran buku pelajaran, memicu penurunan minat generasi penerus terhadap nilai adiluhung lokal.",
    solution: "Merancang ruang hidup digital (living cultural archive) berbasis web tanpa dependensi server rumit (zero-dependency), memadukan kartografi interaktif 38 provinsi, studio canting parametrik interaktif, dan storytelling audio 3D.",
    architectureNodes: [
      { name: "Interactive Map Engine", role: "Dynamic SVG Vector & ViewBox Pan-Zoom", latency: "< 8ms" },
      { name: "Creative Lab Studio", role: "HTML5 Canvas 2D & Parametric Math", latency: "< 16ms" },
      { name: "Oral Narrative Audio", role: "Web Audio & Speech Synthesis API", latency: "12ms" },
      { name: "Cultural Dataset", role: "Modular UNESCO & WBTb Local Engine", latency: "Instant" },
    ],
    codeSnippet: `// WariSara Creative Lab 2.0 - Parametric Batik Motif & Digital Wax Engine
class BatikParametricEngine {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.state = {
      motif: 'kawung',       // Classical geometry: Kawung, Megamendung, Parang
      density: 4,            // Matrix repetition factor
      strokeWidth: 2.5,
      scale: 1.0,
      curviness: 1.0,
      showCrackle: true,     // Authentic batik wax crackle effect
      primaryColor: '#16213A',
      secondaryColor: '#C9A567',
      waxBleed: true,
    };
  }

  renderParametricKawung(centerX, centerY, radius, rotation) {
    const { ctx, state } = this;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    // 4-Elliptical petal cross-pattern representing the four directions of life
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.ellipse(0, radius * 0.55, radius * 0.35, radius * 0.65, 0, 0, Math.PI * 2);
      ctx.fillStyle = state.secondaryColor;
      ctx.fill();
      ctx.lineWidth = state.strokeWidth;
      ctx.strokeStyle = state.primaryColor;
      ctx.stroke();

      // Isen-isen (inner traditional micro-dots / cecek)
      this.renderCecekDots(0, radius * 0.55, radius * 0.15);
    }
    ctx.restore();
  }
}`,
    accentColor: "#C9A567",
    githubUrl: "https://github.com/RendyGH7/warisara-apps",
    liveUrl: "https://warisara-official.vercel.app/",
    imageUrl: "/assets/projects/warisara-showcase.jpg",
  },
  {
    id: "renstore",
    title: "RenStore",
    subtitle: "Modern Full-Stack E-Commerce & Tech Lifestyle Platform",
    category: "E-Commerce",
    year: "2026",
    role: "Founder & Full Stack Developer",
    summary: "Platform e-commerce modern dengan arsitektur decoupled (Laravel 11 REST API + React 19), checkout QRIS dinamis, flash sale engine, dan dashboard analitik admin.",
    metrics: [
      { label: "Ulasan Positif", value: "1.000+" },
      { label: "Arsitektur API", value: "Laravel 11" },
      { label: "Transaksi QRIS", value: "Instan" },
    ],
    tags: ["Laravel 11", "React 19", "PostgreSQL", "TypeScript", "Tailwind CSS", "QRIS Payment"],
    features: [
      {
        title: "Decoupled Architecture",
        desc: "Frontend React 19 SPA terhubung cepat dengan RESTful API Laravel 11.",
      },
      {
        title: "Dynamic QRIS Payment",
        desc: "Generate invoice kode QR otomatis dengan validasi sesi transaksi instan.",
      },
      {
        title: "Flash Sale Engine",
        desc: "Sistem promo produk berbatas waktu dengan hitung mundur presisi.",
      },
      {
        title: "Admin Analytics",
        desc: "Dashboard metrik penjualan, grafik interaktif, dan kontrol pesanan.",
      },
    ],
    problem: "Alur belanja web konvensional yang kaku dan lambat menurunkan tingkat konversi checkout pengguna.",
    solution: "Arsitektur terpisah React 19 dan Laravel 11 dengan integrasi QRIS otomatis berkecepatan tinggi.",
    architectureNodes: [
      { name: "Frontend SPA", role: "React 19 & TypeScript", latency: "< 16ms" },
      { name: "Backend API", role: "Laravel 11 RESTful", latency: "38ms" },
      { name: "Database Engine", role: "PostgreSQL 17 Schema", latency: "12ms" },
      { name: "Payment Gateway", role: "Dynamic QRIS Service", latency: "25ms" },
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
    summary: "Asisten keuangan pribadi cerdas bertenaga Gemini AI dan Web Audio DSP untuk pencatatan transaksi instan lewat suara, alokasi Aturan 50/30/20, dan isolasi keamanan PostgreSQL RLS.",
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
      {
        title: "Voice-to-Transaction",
        desc: "Ekstraksi ucapan suara menjadi transaksi terstruktur via Gemini AI.",
      },
      {
        title: "Web Audio DSP 4-Tahap",
        desc: "Peredam derau dan penajaman frekuensi sinyal vokal secara real-time.",
      },
      {
        title: "Alokasi Anggaran 50/30/20",
        desc: "Pembagian pos otomatis (Kebutuhan, Keinginan, Tabungan) & batas harian.",
      },
      {
        title: "PostgreSQL Row Level Security",
        desc: "Isolasi privasi data multi-pengguna dengan keamanan ketat di Supabase.",
      },
    ],
    problem: "Pencatatan manual yang lambat dan rumit membuat pengguna enggan melacak pengeluaran harian secara konsisten.",
    solution: "Ekstraksi transaksi instan berbasis suara via Gemini AI, filter audio DSP, dan alokasi otomatis 50/30/20.",
    architectureNodes: [
      { name: "Client PWA", role: "React 19 & Zustand", latency: "< 16ms" },
      { name: "DSP Audio Engine", role: "Web Audio 4-Filter", latency: "2ms" },
      { name: "Multimodal AI", role: "Gemini 2.5 Flash", latency: "1.8s" },
      { name: "Supabase DB", role: "PostgreSQL RLS Engine", latency: "24ms" },
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
  vocalBoost.gain.value = 7.5;

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

