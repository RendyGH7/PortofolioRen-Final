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

export interface SoftSkillItem {
  name: string;
  category: string;
  level: number;
}

export const PERSONAL_DATA = {
  name: "Rendy Fernando Tambunan",
  nickname: "Rendy",
  monogram: "RFT",
  role: "Full Stack Developer",
  location: "Kayu Ramin Street, East Jakarta, DKI",
  address: "Jl. Kayu Ramin, Jakarta Timur, DKI Jakarta",
  birthDate: "Jakarta, 17 November 2007",
  timeZone: "Asia/Jakarta (WIB • GMT+7)",
  email: "rendyftbaru@gmail.com",
  phone: "+62 896-6955-7444",
  website: "https://renfertz.vercel.app/",
  web3FormsAccessKey: "", // Opsional: Dapatkan Access Key gratis di https://web3forms.com untuk pengiriman otomatis tanpa membuka email
  socials: {
    github: "https://github.com/RendyGH7",
    linkedin: "https://www.linkedin.com/in/rendy-fernando-a68a362b1/",
    instagram: "https://www.instagram.com/renfertz/",
    tiktok: "https://www.tiktok.com/@renfertzz",
  },
  education: {
    school: "SMK Negeri 26 Jakarta",
    schoolEn: "Vocational High School 26 Jakarta",
    major: "Sistem Informasi Jaringan dan Aplikasi (SIJA)",
    period: "2023 - 2027",
    note: "Fokus kejuruan pada rekayasa perangkat lunak, pengembangan antarmuka interaktif modern, arsitektur jaringan komputer, dan infrastruktur cloud.",
  },
  aspirations: ["Full Stack Developer", "Businessman"],
  hobbies: ["Exercise", "Doing business"],
  quote: "Never stop learning, create meaningful work, and strive for a bright future.",
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
    id: "Saya adalah Rendy Fernando Tambunan, siswa SMK Negeri 26 Jakarta jurusan SIJA dengan keahlian utama di bidang Frontend Development dan desain antarmuka. Memiliki kemampuan menciptakan antarmuka web modern, interaktif, dan user-friendly, serta memiliki minat kuat dalam dunia bisnis yang mendorong pola pikir kreatif, adaptif, dan berorientasi solusi.",
    en: "My name is Rendy Fernando Tambunan, a student at SMK Negeri 26 Jakarta majoring in SIJA with expertise in Frontend Development and design. I have the ability to create modern, interactive, and user-friendly web interfaces. In addition, I also have a keen interest in business, which drives me to continue to develop with a creative, adaptive, and solution-oriented mindset.",
  },
};

export const HARD_SKILLS = [
  { name: "Javascript", category: "Frontend", level: 90 },
  { name: "Tailwind", category: "Frontend", level: 90 },
  { name: "Git & GitHub", category: "Tools & DevOps", level: 90 },
  { name: "Typescript", category: "Frontend", level: 85 },
  { name: "React", category: "Frontend", level: 85 },
  { name: "Laravel", category: "Backend Framework", level: 80 },
  { name: "PHP", category: "Backend", level: 80 },
  { name: "PostgreSQL", category: "Database", level: 77 },
  { name: "MySQL", category: "Database", level: 77 },
  { name: "Python", category: "Data & Backend", level: 70 },
];

export const SOFT_SKILLS: SoftSkillItem[] = [
  { name: "Attitude", category: "Interpersonal", level: 99 },
  { name: "Communication", category: "Kolaborasi", level: 95 },
  { name: "Teamwork", category: "Kolaborasi", level: 94 },
  { name: "Creativity", category: "Inovasi", level: 90 },
  { name: "Responsibility", category: "Profesionalisme", level: 90 },
];

export const AWARDS: AwardItem[] = [
  {
    id: "award-1",
    title: "Grand Finalis Turnamen Sains Data Nasional (TSDN)",
    issuer: "Data Academy",
    date: "Desember 2024",
    level: "Tingkat Nasional",
    description: "Meraih predikat Grand Finalis (Top 7) nasional dalam Turnamen Sains Data Nasional untuk pemodelan prediktif machine learning.",
  },
  {
    id: "award-2",
    title: "AI Upskilling Program with RSA",
    issuer: "Remote Skill Academy",
    date: "Juni 2025",
    level: "Sertifikasi Profesional AI",
    description: "Pelatihan intensif implementasi model kecerdasan buatan terapan untuk efisiensi rekayasa perangkat lunak modern.",
  },
  {
    id: "award-3",
    title: "React Fundamental + Redux",
    issuer: "Skilvul",
    date: "September 2025",
    level: "Sertifikasi Industri Frontend",
    description: "Penguasaan arsitektur state terpusat Redux, middleware asynchronous, dan arsitektur komponen React modern.",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-sistegra",
    role: "Web Developer",
    organization: "PT Sistegra Emran Sentosa",
    period: "Mei - September 2026",
    type: "Professional Web Development",
    location: "Jakarta",
    description: "Mengembangkan aplikasi web performa tinggi dengan arsitektur modern, implementasi antarmuka responsif, dan integrasi API yang handal.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST API"],
    highlight: "Enterprise Web Systems",
  },
  {
    id: "exp-1",
    role: "Founder & Lead Developer",
    organization: "Renfertz Store (Zeusx)",
    period: "Agustus 2025 - Sekarang",
    type: "Digital Commerce",
    location: "Internasional",
    description: "Mendirikan dan mengelola platform digital commerce di platform Zeusx dengan catatan 1.000+ ulasan positif dari pembeli internasional.",
    technologies: ["React", "API Automation", "Webhooks", "Security"],
    highlight: "1.000+ Positive Reviews",
  },
  {
    id: "exp-freelance",
    role: "Freelance UI/UX Designer & Full Stack Web Developer",
    organization: "Independen / Freelance",
    period: "Mei 2025 - Sekarang",
    type: "Freelance",
    location: "Remote",
    description: "Merancang antarmuka pengguna (UI/UX) modern yang user-friendly dan mengimplementasikannya ke dalam arsitektur Full Stack web berperforma tinggi.",
    technologies: ["Figma", "React", "TypeScript", "Laravel", "Tailwind CSS"],
    highlight: "End-to-End Delivery",
  },
  {
    id: "exp-mentor",
    role: "Cloud Computing Mentor",
    organization: "IT Club SMK Negeri 26 Jakarta",
    period: "Juli 2025 - Sekarang",
    type: "Mentorship & Training",
    location: "Jakarta",
    description: "Menjadi mentor Cloud Computing bagi anggota IT Club, mengajarkan dasar komputasi awan, konfigurasi server Linux, dan infrastruktur sistem.",
    technologies: ["Cloud Computing", "Linux Server", "Docker", "Networking"],
    highlight: "IT Club Mentorship",
  },
  {
    id: "exp-sollu",
    role: "Game Developer (Contract)",
    organization: "PT Sollu Filantropi Teknologi",
    period: "Agustus - Desember 2024",
    type: "Contract On-Site",
    location: "Jakarta",
    description: "Mengembangkan logika permainan interaktif, optimalisasi aset grafis, dan sinkronisasi data antar sesi pengguna secara on-site.",
    technologies: ["Game Logic", "UI Scripting", "Asset Optimization"],
    highlight: "Contract Game Dev",
  },
  {
    id: "exp-tsdn",
    role: "Grand Finalis Data Science & Predictive Modeling",
    organization: "Turnamen Sains Data Nasional (TSDN) • Data Academy",
    period: "Oktober - Desember 2024",
    type: "Kompetisi Nasional",
    location: "Nasional",
    description: "Menganalisis dataset skala besar, rekayasa fitur data statistik, dan merancang model prediktif machine learning hingga meraih posisi Grand Finalis tingkat nasional.",
    technologies: ["Python", "SQL", "Pandas", "Scikit-Learn", "Machine Learning"],
    highlight: "Top 7 Finalis Nasional",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "warisara",
    title: "WariSara",
    subtitle: "Web/Mobile Apps • Living Cultural Archive & Studio Kriya",
    category: "Web App",
    year: "Oktober - November 2026",
    role: "Lead Frontend & Creative Technologist",
    summary: "Platform pelestarian budaya 38 provinsi Nusantara yang memadukan kartografi digital interaktif, studio kriya parametrik, dan penuturan audio pusaka lisan.",
    metrics: [
      { label: "Cakupan Budaya", value: "38 Provinsi" },
      { label: "Konteks Lomba", value: "TECHTOPIA 2" },
      { label: "Arsitektur", value: "Native JS" },
    ],
    tags: [
      "Vanilla JS",
      "HTML5 Canvas 2D",
      "Tailwind CSS",
      "Web Audio API",
      "Parametric Math",
      "SVG Vector Map",
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
    subtitle: "ECommerce Website • Modern Decoupled Platform",
    category: "E-Commerce",
    year: "Agustus - September 2026",
    role: "Founder & Full Stack Developer",
    summary: "Platform e-commerce modern berarsitektur decoupled dengan integrasi REST API Laravel 11, pembayaran QRIS dinamis, dan pengalaman transaksi instan.",
    metrics: [
      { label: "Ulasan Positif", value: "1.000+" },
      { label: "Arsitektur API", value: "Laravel 11" },
      { label: "Transaksi QRIS", value: "Instan" },
    ],
    tags: ["Laravel 11", "React 19", "PostgreSQL", "Tailwind CSS", "QRIS API"],
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
    subtitle: "Web/Mobile Apps • AI Personal Finance & Voice DSP",
    category: "Web App",
    year: "September - Oktober 2026",
    role: "Full Stack Lead & AI Engineer",
    summary: "Asisten finansial cerdas bertenaga Google Gemini AI dan Web Audio DSP untuk pencatatan transaksi otomatis berbasis perintah suara.",
    metrics: [
      { label: "Voice AI Latency", value: "< 2.5s" },
      { label: "Filter Vokal DSP", value: "4-Stage" },
      { label: "Isolasi Data", value: "100% RLS" },
    ],
    tags: [
      "React 19",
      "TypeScript",
      "Gemini 2.5 Flash",
      "Web Audio DSP",
      "PostgreSQL RLS",
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

