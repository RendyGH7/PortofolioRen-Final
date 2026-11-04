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
    period: "Agustus - Desember",
    type: "Kontrak On Site",
    location: "Jakarta",
    description: "Mengembangkan logika permainan interaktif, optimalisasi aset grafis, dan sinkronisasi data antar sesi pengguna.",
    technologies: ["Game Logic", "UI Scripting", "Asset Optimization"],
    highlight: "Pengembangan Tim On Site",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "monetra",
    title: "Monetra",
    subtitle: "Web & Mobile Financial Management",
    category: "Web App",
    year: "2026",
    role: "Full Stack Lead",
    summary: "Platform pengelolaan finansial komprehensif dengan analitik real-time, grafik arus kas, dan kategorisasi transaksi otomatis.",
    metrics: [
      { label: "Waktu Pencatatan", value: "-45%" },
      { label: "Kecepatan Render", value: "<120ms" },
      { label: "Uptime Sistem", value: "99.9%" },
    ],
    tags: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"],
    features: [
      "Dashboard analitik multi-periode dengan grafik interaktif",
      "Sistem pemantauan anggaran bulanan otomatis",
      "Ekspor laporan keuangan format PDF dan CSV",
      "Autentikasi sesi terenkripsi dengan proteksi CSRF",
    ],
    problem: "Pencatatan keuangan manual memakan waktu dan menyulitkan pengguna dalam memantau tren pengeluaran bulanan secara terpadu.",
    solution: "Membangun arsitektur SPA ringan dengan sinkronisasi data instan, visualisasi visual yang jernih, dan struktur database berelasi yang cepat diakses.",
    architectureNodes: [
      { name: "Client Browser", role: "React SPA + Tailwind UI", latency: "0ms" },
      { name: "API Gateway", role: "Node.js Express + JWT Auth", latency: "42ms" },
      { name: "Database", role: "PostgreSQL Database Engine", latency: "15ms" },
      { name: "Export Worker", role: "Serverless PDF Generator", latency: "85ms" },
    ],
    codeSnippet: `// Monetra Transaction Aggregator Service
export async function calculateMonthlyMetrics(userId: string, month: number) {
  const records = await db.transactions.findMany({
    where: { userId, periodMonth: month },
    orderBy: { timestamp: 'desc' }
  });
  
  return records.reduce((acc, item) => {
    if (item.type === 'income') acc.totalIncome += item.amount;
    else acc.totalExpense += item.amount;
    acc.categories[item.category] = (acc.categories[item.category] || 0) + item.amount;
    return acc;
  }, { totalIncome: 0, totalExpense: 0, categories: {} });
}`,
    accentColor: "#4C6FD1",
    githubUrl: "https://github.com/RendyGH7",
    liveUrl: "https://monetra-apps.vercel.app/",
  },
  {
    id: "renstore",
    title: "RenStore",
    subtitle: "Modern Full-Stack E-Commerce & Tech Lifestyle Platform",
    category: "E-Commerce",
    year: "2026",
    role: "Founder & Full Stack Developer",
    summary: "Platform e-commerce modern & tech lifestyle dengan arsitektur responsif multi-device, checkout pembayaran QRIS dinamis, katalog gadget unggulan, flash sale, dan admin dashboard analitik penjualan terpadu.",
    metrics: [
      { label: "Ulasan Positif", value: "1.000+" },
      { label: "Tingkat Kepuasan", value: "99.4%" },
      { label: "Pembayaran QRIS", value: "Instan" },
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "QRIS Payment", "Vercel"],
    features: [
      "Antarmuka responsif presisi multi-device (Desktop, Tablet, Mobile, Laptop)",
      "Alur pembayaran checkout QRIS dinamis dengan countdown timer",
      "Katalog gadget unggulan (iPhone 15 Pro, MacBook Pro, Audio) & sistem Flash Sale",
      "Dashboard administrator: metrik pendapatan, tren penjualan, & manajemen pesanan",
      "Arsitektur frontend teroptimasi tinggi dengan deployment instan di Vercel",
    ],
    problem: "Platform e-commerce konvensional seringkali lambat, tidak ramah mobile, dan membutuhkan alur pembayaran berbelit-belit yang menurunkan tingkat konversi pelanggan.",
    solution: "Merancang platform e-commerce tech lifestyle terpadu dengan tema clean modern, checkout QRIS sekali pindai, dan dashboard analitik real-time untuk memantau performa bisnis.",
    architectureNodes: [
      { name: "Storefront UI", role: "React SPA + Responsive Viewport", latency: "0ms" },
      { name: "QRIS Checkout", role: "Dynamic Payment Gateway Engine", latency: "25ms" },
      { name: "Admin Dashboard", role: "CMS & Real-Time Analytics", latency: "18ms" },
      { name: "Vercel Edge", role: "Global Low-Latency Deployment", latency: "12ms" },
    ],
    codeSnippet: `// RenStore Dynamic QRIS Payment & Transaction Flow
export async function createQrisCheckoutSession(order: OrderPayload) {
  const session = await qrisGateway.generateDynamicQR({
    orderId: order.id,
    amount: order.totalAmount,
    currency: 'IDR',
    expiresInSeconds: 900 // 15 mins countdown
  });

  await orderRepository.updateStatus(order.id, 'WAITING_PAYMENT');
  
  return {
    qrString: session.qrPayload,
    checkoutUrl: session.invoiceUrl,
    expiresAt: session.expiryTimestamp
  };
}`,
    accentColor: "#F5B027",
    githubUrl: "https://github.com/RendyGH7/renstore-project",
    liveUrl: "https://renstore-project.vercel.app/",
    imageUrl: "/assets/projects/renstore-showcase.jpg",
  },
  {
    id: "tsdn-platform",
    title: "TSDN Analytics Showcase",
    subtitle: "National Data Science Competition Platform",
    category: "Data & AI",
    year: "2024",
    role: "Data Analyst & Frontend Architect",
    summary: "Dashboard pemodelan data prediktif yang mengantarkan tim mencapai Top 7 Finalis Nasional Turnamen Sains Data Nasional.",
    metrics: [
      { label: "Peringkat Nasional", value: "Top 7" },
      { label: "Dataset Diproses", value: "500k+ Baris" },
      { label: "Akurasi Prediksi", value: "92.3%" },
    ],
    tags: ["Python", "SQL", "React", "Data Modeling", "Statistical Analysis"],
    features: [
      "Visualisasi multi-dimensi korelasi variabel data",
      "Simulasi parameter skenario masa depan secara interaktif",
      "Pembersihan data dan deteksi anomali otomatis",
      "Tampilan insight ringkas siap presentasi dewan juri",
    ],
    problem: "Kumpulan data berskala besar sulit dicerna secara cepat oleh penilai tanpa media visual yang intuitif dan interaktif.",
    solution: "Merancang pipeline data terstruktur yang mengubah hasil komputasi Python menjadi komponen visual interaktif berbasis web.",
    architectureNodes: [
      { name: "Visual Client", role: "React Data Charts Dashboard", latency: "0ms" },
      { name: "Python Core", role: "Statistical Model Engine", latency: "65ms" },
      { name: "Data Pipeline", role: "SQL ETL Aggregator", latency: "35ms" },
    ],
    codeSnippet: `# TSDN Predictive Feature Scorer
def evaluate_feature_importance(df, target_col):
    corr_matrix = df.corr()
    weights = corr_matrix[target_col].abs().sort_values(ascending=False)
    selected_features = weights[weights > 0.35].index.tolist()
    return {
        "features": selected_features,
        "score_variance": float(df[selected_features].var().mean()),
        "model_readiness": True
    }`,
    accentColor: "#2C7A85",
    githubUrl: "https://github.com/RendyGH7",
  },
  {
    id: "portfolio-engine",
    title: "Midnight Glass Web Platform",
    subtitle: "High-Performance Interactive Portfolio",
    category: "Architecture",
    year: "2026",
    role: "Design & Full Stack Engineer",
    summary: "Sistem web portofolio interaktif dengan Three.js 3D, command palette, estimator proyek otomatis, dan kepatuhan ketat antislop.",
    metrics: [
      { label: "Lighthouse Performance", value: "98+" },
      { label: "Aksesibilitas", value: "100" },
      { label: "Cumulative Layout Shift", value: "0.00" },
    ],
    tags: ["React 19", "TypeScript", "Tailwind CSS", "Three.js WebGL"],
    features: [
      "Hero 3D WebGL responsif kursor tanpa membebani performa",
      "Command Palette (Cmd/Ctrl+K) dengan navigasi keyboard penuh",
      "Wizard Project Estimator dengan output ringkasan terstruktur",
      "Mode dwi-bahasa (ID/EN) dan kepatuhan WCAG 2.2 AA",
    ],
    problem: "Banyak portofolio developer terlihat seragam dan pasif, tanpa interaksi nyata yang membuktikan kemampuan rekayasa.",
    solution: "Membangun produk digital yang berfungsi sebagai studi kasus langsung dengan kedalaman interaksi, presisi desain, dan efisiensi kode.",
    architectureNodes: [
      { name: "Vite + React 19", role: "Zero-latency Static Hydration", latency: "0ms" },
      { name: "WebGL 3D Core", role: "Three.js Crystalline Simulation", latency: "16ms" },
      { name: "Command Bus", role: "Keyboard & Shortcut Dispatcher", latency: "1ms" },
    ],
    codeSnippet: `// Midnight Glass Dynamic Light Calculation
export function getRefractiveLight(cursorX: number, cursorY: number) {
  const normX = (cursorX / window.innerWidth) * 2 - 1;
  const normY = -(cursorY / window.innerHeight) * 2 + 1;
  return {
    rotationTarget: [normY * 0.45, normX * 0.45, 0],
    intensity: Math.min(1.2, 0.8 + Math.hypot(normX, normY) * 0.3)
  };
}`,
    accentColor: "#F5B027",
    githubUrl: "https://github.com/RendyGH7",
  },
];

