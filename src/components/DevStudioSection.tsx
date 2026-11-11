import React, { useState } from 'react';
import {
  Server,
  Cpu,
  Workflow,
  Zap,
  CheckCircle2,
  ArrowRight,
  Layers,
  Activity,
  Sparkles,
  Clock,
  Lock,
  Play,
  ShoppingBag,
  Code2,
  Globe,
  Database,
} from 'lucide-react';

interface DevStudioSectionProps {
  lang: 'id' | 'en';
}

interface ArchitectureNode {
  id: string;
  stepNumber: string;
  name: string;
  tech: string;
  role: string;
  latencyMs: number;
  statusText: string;
  icon: React.ComponentType<{ className?: string }>;
  decisionTitleId: string;
  decisionTitleEn: string;
  decisionDescId: string;
  decisionDescEn: string;
  metrics: { label: string; value: string }[];
}

interface Scenario {
  id: 'renstore' | 'warisara' | 'tsdn';
  titleId: string;
  titleEn: string;
  badge: string;
  descriptionId: string;
  descriptionEn: string;
  totalRoundtrip: string;
  protocol: string;
  icon: React.ComponentType<{ className?: string }>;
  nodes: ArchitectureNode[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'renstore',
    titleId: 'RenStore E-Commerce',
    titleEn: 'RenStore E-Commerce',
    badge: 'Transaksi & Webhook',
    descriptionId:
      'Arsitektur terpisah (decoupled): Mengamankan transaksi pembayaran QRIS internasional dan otomasi penyerahan lisensi digital dalam waktu nyata.',
    descriptionEn:
      'Decoupled architecture: Securing international QRIS payments and real-time automated digital license fulfillment.',
    totalRoundtrip: '24.8ms Roundtrip',
    protocol: 'HTTPS TLS 1.3 • HMAC SHA-512',
    icon: ShoppingBag,
    nodes: [
      {
        id: 'client',
        stepNumber: '01',
        name: 'Client Viewport',
        tech: 'React 19 + TypeScript',
        role: 'Checkout & UI Trigger',
        latencyMs: 2.1,
        statusText: 'Payload Dispatched',
        icon: Globe,
        decisionTitleId: 'Arsitektur Frontend Terpisah (Decoupled UI)',
        decisionTitleEn: 'Decoupled Frontend Architecture',
        decisionDescId:
          'Frontend React 19 dibangun terpisah penuh dari backend server agar antarmuka interaktif responsif instan tanpa render ulang halaman (Zero Page Refresh).',
        decisionDescEn:
          'React 19 frontend is decoupled from the backend server so the checkout UI responds instantaneously with zero page reloads.',
        metrics: [
          { label: 'Bundle Size', value: '< 45KB Gzip' },
          { label: 'State Flow', value: 'Zero-Redux Lean' },
        ],
      },
      {
        id: 'gateway',
        stepNumber: '02',
        name: 'API Gateway',
        tech: 'Laravel 11 REST API',
        role: 'Rate Limiter & Validation',
        latencyMs: 4.5,
        statusText: 'Zod / FormRequest OK',
        icon: Server,
        decisionTitleId: 'Isolasi Logika Bisnis & Validasi Skema',
        decisionTitleEn: 'Business Logic & Schema Validation',
        decisionDescId:
          'Backend Laravel 11 mengelola rute RESTful dengan rate limiter 100 req/min untuk mencegah serangan brute force dan validasi ketat setiap request order.',
        decisionDescEn:
          'Laravel 11 backend manages RESTful endpoints with a 100 req/min rate limiter to prevent spam and strictly validate every incoming order payload.',
        metrics: [
          { label: 'Rate Limiter', value: '100 req / min' },
          { label: 'Validation', value: 'FormRequest RFC' },
        ],
      },
      {
        id: 'payment',
        stepNumber: '03',
        name: 'Payment Engine',
        tech: 'Midtrans QRIS Snap',
        role: 'Payment Intent & Token',
        latencyMs: 8.2,
        statusText: 'QRIS Generated',
        icon: Zap,
        decisionTitleId: 'Integrasi Gerbang Pembayaran Terverifikasi',
        decisionTitleEn: 'Certified Payment Gateway Integration',
        decisionDescId:
          'Menghubungkan API payment gateway bersertifikasi PCI-DSS untuk memfasilitasi transaksi QRIS instan dan multi-bank transfer secara aman.',
        decisionDescEn:
          'Connecting PCI-DSS certified payment gateway API to facilitate instant QRIS payments and multi-bank transfers securely.',
        metrics: [
          { label: 'Payment Method', value: 'QRIS / Multi-Bank' },
          { label: 'Uptime SLA', value: '99.98% Target' },
        ],
      },
      {
        id: 'webhook',
        stepNumber: '04',
        name: 'Webhook Verifier',
        tech: 'Cryptographic Hash',
        role: 'HMAC SHA-512 Security',
        latencyMs: 1.8,
        statusText: 'Signature Verified',
        icon: Lock,
        decisionTitleId: 'Verifikasi Kriptografi Notifikasi Webhook',
        decisionTitleEn: 'Cryptographic Webhook Signature Check',
        decisionDescId:
          'Mencegah manipulasi pembayaran dengan memverifikasi signature hash HMAC SHA-512 pada setiap notifikasi webhook sebelum pesanan diproses.',
        decisionDescEn:
          'Prevents payment tampering by verifying HMAC SHA-512 cryptographic hash signatures on every incoming webhook notification.',
        metrics: [
          { label: 'Signature', value: 'HMAC SHA-512' },
          { label: 'Anti-Tamper', value: '100% Protected' },
        ],
      },
      {
        id: 'database',
        stepNumber: '05',
        name: 'PostgreSQL DB',
        tech: 'PostgreSQL + RLS',
        role: 'ACID Transaction & Log',
        latencyMs: 5.2,
        statusText: 'Committed & Verified',
        icon: Database,
        decisionTitleId: 'Integritas Finansial dengan Transaksi ACID',
        decisionTitleEn: 'Financial Integrity with ACID Transactions',
        decisionDescId:
          'Mengunci perubahan status order dengan transaksi ACID PostgreSQL dan Row Level Security (RLS) sehingga status transaksi tidak pernah korup.',
        decisionDescEn:
          'Locks order state changes with PostgreSQL ACID transactions and Row Level Security (RLS) ensuring financial data is never corrupted.',
        metrics: [
          { label: 'Consistency', value: 'ACID Enforced' },
          { label: 'Security', value: 'Row Level Security' },
        ],
      },
      {
        id: 'dispatch',
        stepNumber: '06',
        name: 'Auto Dispatcher',
        tech: 'Background Job Queue',
        role: 'Instant Delivery Engine',
        latencyMs: 3.0,
        statusText: 'License Delivered',
        icon: CheckCircle2,
        decisionTitleId: 'Otomasi Pengiriman Lisensi Non-Blocking',
        decisionTitleEn: 'Non-Blocking Automated Delivery Engine',
        decisionDescId:
          'Lisensi digital dan konfirmasi transaksi langsung dikirimkan ke pembeli melalui background queue tanpa menghambat alur respon HTTP.',
        decisionDescEn:
          'Digital licenses and receipts are dispatched instantly to buyers via background worker queues without blocking the main HTTP thread.',
        metrics: [
          { label: 'Delivery Time', value: '< 1.5 Detik' },
          { label: 'Social Proof', value: '1.000+ Reviews' },
        ],
      },
    ],
  },
  {
    id: 'warisara',
    titleId: 'WariSara Vector Core',
    titleEn: 'WariSara Vector Core',
    badge: 'Lab Vektor 60 FPS',
    descriptionId:
      'Mesin vektor 2D dan audio interaktif bebas dependensi eksternal: Memetakan 38 provinsi Nusantara dengan performa 60 FPS stabil.',
    descriptionEn:
      'Zero-dependency 2D vector and interactive audio engine: Rendering 38 Indonesian provinces at a consistent 60 FPS.',
    totalRoundtrip: '15.4ms Frame Budget',
    protocol: 'HTML5 Canvas 2D • Web Audio API DSP',
    icon: Code2,
    nodes: [
      {
        id: 'canvas_view',
        stepNumber: '01',
        name: 'Canvas Viewport',
        tech: 'HTML5 Canvas 2D',
        role: 'Pan-Zoom ViewBox',
        latencyMs: 1.4,
        statusText: 'Matrix Transformed',
        icon: Globe,
        decisionTitleId: 'Transformasi Matriks Vektor Ringan',
        decisionTitleEn: 'Lightweight Matrix Transformation',
        decisionDescId:
          'Implementasi navigasi peta pan-zoom langsung pada Canvas 2D native tanpa library pihak ketiga yang membengkakkan ukuran aplikasi.',
        decisionDescEn:
          'Direct native 2D canvas pan-zoom matrix transformations without third-party libraries, keeping bundle size ultra-lightweight.',
        metrics: [
          { label: 'Frame Rate', value: '60 FPS Native' },
          { label: 'RAM Footprint', value: '< 18MB' },
        ],
      },
      {
        id: 'bezier_math',
        stepNumber: '02',
        name: 'Vector Math Core',
        tech: 'Bézier Splines Engine',
        role: 'Parametric Geometry',
        latencyMs: 3.8,
        statusText: 'Curves Interpolated',
        icon: Cpu,
        decisionTitleId: 'Interpolasi Kurva Bézier Bebas Dependensi',
        decisionTitleEn: 'Zero-Dependency Bézier Math Engine',
        decisionDescId:
          'Kalkulasi kurva parametrik batik dan kontur pulau nusantara dihitung langsung via rumus aljabar linear untuk grafis tajam di resolusi apa pun.',
        decisionDescEn:
          'Parametric curves for batik motifs and provincial geography calculated via direct linear algebra for sharp graphics on any resolution.',
        metrics: [
          { label: 'Algorithm', value: 'Cubic Bézier O(n)' },
          { label: 'Resolution', value: 'Infinite Vector Scale' },
        ],
      },
      {
        id: 'audio_synth',
        stepNumber: '03',
        name: 'Web Audio DSP',
        tech: 'Web Audio API',
        role: 'Synthesizer & Oral Speech',
        latencyMs: 2.2,
        statusText: 'Acoustics Synced',
        icon: Activity,
        decisionTitleId: 'Sintesis Audio & Narasi Tanpa File MP3',
        decisionTitleEn: 'Realtime Audio Synthesis & Narration',
        decisionDescId:
          'Menghasilkan efek instrumen tradisional dan narasi suara menggunakan Web Audio API native, menghemat kuota pengguna tanpa unduhan file audio besar.',
        decisionDescEn:
          'Generates acoustic instruments and vocal narratives using native Web Audio API, saving user bandwidth without downloading heavy MP3 files.',
        metrics: [
          { label: 'Bandwidth', value: 'Zero MP3 Download' },
          { label: 'DSP Latency', value: '< 3ms Hardware' },
        ],
      },
      {
        id: 'data_graph',
        stepNumber: '04',
        name: 'Provincial Graph',
        tech: 'WBTb Kemendikbud',
        role: 'Structured Cultural Data',
        latencyMs: 4.1,
        statusText: '38 Provinces Indexed',
        icon: Layers,
        decisionTitleId: 'Struktur Data Terindeks untuk 38 Provinsi',
        decisionTitleEn: 'Indexed Knowledge Graph for 38 Provinces',
        decisionDescId:
          'Dataset kebudayaan nasional terstruktur rapi dengan indeks cepat sehingga pencarian tradisi tiap provinsi berlangsung instan.',
        decisionDescEn:
          'National cultural dataset structured with an in-memory index ensuring province-level folklore lookups happen in under 5ms.',
        metrics: [
          { label: 'Provinsi', value: '38 Wilayah NKRI' },
          { label: 'Index Size', value: '64KB Gzipped' },
        ],
      },
      {
        id: 'cache_engine',
        stepNumber: '05',
        name: 'Edge Cache',
        tech: 'Service Worker Cache',
        role: 'Offline-First Storage',
        latencyMs: 3.9,
        statusText: '100% Offline Ready',
        icon: CheckCircle2,
        decisionTitleId: 'Arsitektur Offline-First yang Andal',
        decisionTitleEn: 'Resilient Offline-First Architecture',
        decisionDescId:
          'Memastikan seluruh platform tetap dapat dijelajahi dengan lancar oleh siswa di daerah dengan sinyal internet terbatas.',
        decisionDescEn:
          'Ensures the cultural archive remains fully functional offline, accessible to students even in regions with intermittent connectivity.',
        metrics: [
          { label: 'Offline Support', value: '100% Functional' },
          { label: 'Cache Strategy', value: 'Stale-While-Revalidate' },
        ],
      },
    ],
  },
  {
    id: 'tsdn',
    titleId: 'TSDN Predictive Pipeline',
    titleEn: 'TSDN Predictive Pipeline',
    badge: 'Top 7 Nasional',
    descriptionId:
      'Pipeline data sains prediktif nasional: Rekayasa fitur statistik dan ensemble machine learning yang membawa Rendy meraih Grand Finalis Top 7.',
    descriptionEn:
      'National predictive data science pipeline: Statistical feature engineering and ML ensemble achieving Top 7 Grand Finalist nationally.',
    totalRoundtrip: '14.8ms Batch Inference',
    protocol: 'Scikit-Learn • XGBoost • Statistical Pipeline',
    icon: Sparkles,
    nodes: [
      {
        id: 'ingestion',
        stepNumber: '01',
        name: 'Dataset Ingestion',
        tech: 'Data Academy Benchmark',
        role: 'Raw Data Preprocessing',
        latencyMs: 2.5,
        statusText: 'Cleaned & Standardized',
        icon: Database,
        decisionTitleId: 'Pembersihan Data Skala Besar & Normalisasi',
        decisionTitleEn: 'Large-Scale Data Cleaning & Normalization',
        decisionDescId:
          'Penanganan nilai kosong (imputation), eliminasi outlier, dan standardisasi skala numerik untuk menjaga kualitas data input.',
        decisionDescEn:
          'Handling missing values via robust statistical imputation, eliminating outliers, and standardizing numerical scales for clean training inputs.',
        metrics: [
          { label: 'Data Quality', value: '100% Cleaned' },
          { label: 'Vectorization', value: 'NumPy Accelerated' },
        ],
      },
      {
        id: 'feature_eng',
        stepNumber: '02',
        name: 'Feature Engineering',
        tech: 'Pandas & NumPy Matrix',
        role: 'Statistical Correlation',
        latencyMs: 3.6,
        statusText: '24 Features Synthesized',
        icon: Workflow,
        decisionTitleId: 'Sintesis Fitur Prediktif dengan Daya Pisah Tinggi',
        decisionTitleEn: 'Synthesizing High-Discrimination Features',
        decisionDescId:
          'Merumuskan 24 fitur statistik baru yang menangkap pola non-linear data untuk meningkatkan akurasi model prediktif secara signifikan.',
        decisionDescEn:
          'Engineered 24 new statistical features capturing non-linear relationships, substantially boosting the predictive model accuracy.',
        metrics: [
          { label: 'Engineered Features', value: '24 Variables' },
          { label: 'Variance Retained', value: '98.5%' },
        ],
      },
      {
        id: 'ensemble',
        stepNumber: '03',
        name: 'Ensemble Core',
        tech: 'Random Forest + XGBoost',
        role: 'Stacking & Blending',
        latencyMs: 4.5,
        statusText: 'Loss Function Minimized',
        icon: Cpu,
        decisionTitleId: 'Penggabungan Model Ensemble Stacking',
        decisionTitleEn: 'Ensemble Stacking Model Architecture',
        decisionDescId:
          'Menggabungkan kekuatan Random Forest dan XGBoost untuk meminimalkan variance dan overfitting pada data pengujian kompetisi.',
        decisionDescEn:
          'Combines Random Forest and XGBoost to balance bias and variance, strictly mitigating overfitting on test evaluation datasets.',
        metrics: [
          { label: 'Validation Score', value: '94.2% Accuracy' },
          { label: 'Ensemble Method', value: 'Weighted Stacking' },
        ],
      },
      {
        id: 'inference',
        stepNumber: '04',
        name: 'Fast Scoring API',
        tech: 'Scoring Runtime',
        role: 'Realtime Batch Prediction',
        latencyMs: 2.4,
        statusText: 'Scoring Complete',
        icon: Zap,
        decisionTitleId: 'Inferensi Cepat di Bawah 15 Milidetik',
        decisionTitleEn: 'Sub-15ms Real-Time Inference Scoring',
        decisionDescId:
          'Optimalisasi komputasi matriks agar model mampu menghasilkan prediksi probabilistik dalam waktu singkat untuk kebutuhan sistem nyata.',
        decisionDescEn:
          'Optimized matrix scoring pipeline to compute probability outputs within 15 milliseconds for production deployments.',
        metrics: [
          { label: 'Inference Speed', value: '< 15ms Latency' },
          { label: 'Throughput', value: 'High-Volume Ready' },
        ],
      },
      {
        id: 'award_stage',
        stepNumber: '05',
        name: 'National Finalist',
        tech: 'Data Academy Review',
        role: 'Top 7 Ranking Achievement',
        latencyMs: 1.8,
        statusText: 'Top 7 Grand Finalist',
        icon: CheckCircle2,
        decisionTitleId: 'Validasi Prestasi Tingkat Nasional',
        decisionTitleEn: 'Nationwide Competitive Validation',
        decisionDescId:
          'Divalidasi oleh dewan juri ahli Data Academy, mengantarkan Rendy masuk jajaran Top 7 Grand Finalis Sains Data Nasional.',
        decisionDescEn:
          'Rigorously audited by Data Academy industry judges, ranking Rendy as a Top 7 Grand Finalist in Data Science nationwide.',
        metrics: [
          { label: 'Rank', value: 'Top 7 Nasional' },
          { label: 'Organizer', value: 'Data Academy (2024)' },
        ],
      },
    ],
  },
];

export const DevStudioSection: React.FC<DevStudioSectionProps> = ({ lang }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<'renstore' | 'warisara' | 'tsdn'>('renstore');
  const [activeNodeId, setActiveNodeId] = useState<string>('gateway');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const handleScenarioChange = (id: 'renstore' | 'warisara' | 'tsdn') => {
    setSelectedScenarioId(id);
    const targetScenario = SCENARIOS.find((s) => s.id === id) || SCENARIOS[0];
    setActiveNodeId(targetScenario.nodes[0].id);
    setSimulationStep(-1);
    setIsSimulating(false);
  };

  const activeNode = scenario.nodes.find((n) => n.id === activeNodeId) || scenario.nodes[0];

  // Run real-time data trace simulation across nodes
  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setActiveNodeId(scenario.nodes[0].id);

    scenario.nodes.forEach((node, idx) => {
      setTimeout(() => {
        setSimulationStep(idx);
        setActiveNodeId(node.id);

        if (idx === scenario.nodes.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
          }, 800);
        }
      }, (idx + 1) * 550);
    });
  };

  return (
    <section id="studio" className="py-14 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative text-left">
      {/* Ambient Cosmic Haze Glow */}
      <div className="absolute top-1/2 -left-28 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-sapphire/20 blur-2xl sm:blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 -right-28 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-champagne/15 blur-2xl sm:blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-[10.5px] font-mono text-champagne uppercase tracking-wider mb-2">
            <Workflow className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Arsitektur Rekayasa Sistem' : 'System Engineering Architecture'}</span>
          </div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl text-pearl font-normal tracking-tight">
            {lang === 'id' ? 'Alur Sistem & Data Nyata' : 'Real-World System Pipelines'}
          </h2>
          <p className="text-xs sm:text-sm text-mist max-w-2xl mt-1.5 leading-relaxed">
            {lang === 'id'
              ? 'Simulasi interaktif bagaimana transaksi, data, dan logika aplikasi diproses melalui arsitektur decoupled, webhook terenkripsi, dan basis data berkinerja tinggi.'
              : 'Interactive simulation of how transactions, data, and logic flow through decoupled architecture, encrypted webhooks, and high-performance databases.'}
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 glass-1 p-1 sm:p-1.5 rounded-full border border-white/10 shadow-glass-sm max-w-full overflow-x-auto scrollbar-none flex-nowrap self-start md:self-auto">
          {SCENARIOS.map((sc) => {
            const Icon = sc.icon;
            const isSelected = selectedScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleScenarioChange(sc.id)}
                className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full text-[10.5px] sm:text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#F5B027] to-[#D98218] text-midnight-0 font-semibold shadow-[0_0_16px_rgba(245,176,39,0.35)]'
                    : 'text-mist hover:text-pearl'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'id' ? sc.titleId : sc.titleEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive System Architecture Canvas */}
      <div className="glass-2 rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-glass-lg relative z-10 backdrop-blur-xl">
        
        {/* Top Architectural Telemetry Bar */}
        <div className="px-3.5 sm:px-6 py-3 bg-midnight-1/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] shrink-0" />
            <span className="font-mono text-xs font-semibold text-pearl tracking-wider uppercase truncate">
              {scenario.titleEn} // PIPELINE
            </span>
            <span className="hidden sm:inline text-fog font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {scenario.protocol}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-champagne bg-champagne/10 px-2.5 py-1 rounded-lg border border-champagne/20">
              <Clock className="w-3 h-3 text-champagne shrink-0" />
              <span>{scenario.totalRoundtrip}</span>
            </div>

            {/* Run Pipeline Simulation Button */}
            <button
              type="button"
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="btn-champagne px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-midnight-0 border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'id' ? 'Menjalankan Alur...' : 'Tracing Flow...'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-midnight-0 fill-midnight-0" />
                  <span>{lang === 'id' ? 'Simulasikan Alur' : 'Run Pipeline Trace'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pipeline Diagram Strip */}
        <div className="p-4 sm:p-7 border-b border-white/10 bg-midnight-0/40">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-mono text-fog uppercase text-[10.5px]">
              {lang === 'id' ? 'Klik node mana pun untuk melihat keputusan teknis:' : 'Click any node to inspect technical decision:'}
            </span>
            <span className="font-mono text-[10px] text-champagne">
              {scenario.nodes.length} {lang === 'id' ? 'Node Arsitektur' : 'Architecture Nodes'}
            </span>
          </div>

          {/* Desktop & Tablet: Horizontal Flow Pipeline | Mobile: Clean Stepper Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3 items-stretch">
            {scenario.nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = activeNodeId === node.id;
              const isStepActive = simulationStep === index;
              const hasBeenVisited = simulationStep > index;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`relative p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-champagne/15 border-champagne shadow-[0_0_20px_rgba(245,176,39,0.22)] -translate-y-1'
                      : isStepActive
                      ? 'bg-sapphire/25 border-sapphire shadow-[0_0_20px_rgba(76,111,209,0.35)] scale-102'
                      : hasBeenVisited
                      ? 'bg-white/[0.04] border-white/20'
                      : 'bg-midnight-0/60 border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Step Connector Indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isSelected
                        ? 'bg-champagne text-midnight-0'
                        : isStepActive
                        ? 'bg-sapphire text-white animate-pulse'
                        : 'bg-white/10 text-fog'
                    }`}>
                      {node.stepNumber}
                    </span>

                    <div className="flex items-center gap-1 font-mono text-[9.5px] text-mist">
                      <span>{node.latencyMs}ms</span>
                    </div>
                  </div>

                  {/* Node Title & Icon */}
                  <div className="space-y-1 my-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        isSelected ? 'bg-champagne/20 text-champagne' : 'bg-white/5 text-fog group-hover:text-pearl'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] xl:text-xs font-semibold text-pearl leading-tight truncate">
                        {node.name}
                      </span>
                    </div>

                    <p className="text-[10px] font-mono text-champagne/90 truncate pl-0.5">
                      {node.tech}
                    </p>
                  </div>

                  {/* Node Status Badge */}
                  <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[9.5px] font-mono">
                    <span className={`truncate ${isSelected ? 'text-pearl font-medium' : 'text-fog'}`}>
                      {node.statusText}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne shadow-[0_0_6px_#F5B027] shrink-0" />
                    )}
                  </div>

                  {/* Flow Connector Line (Desktop Only) */}
                  {index < scenario.nodes.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <ArrowRight className={`w-3.5 h-3.5 ${hasBeenVisited || isStepActive ? 'text-champagne' : 'text-white/20'}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Inspection Window: Engineering Decisions & Verified Metrics */}
        <div className="p-4 sm:p-7 bg-midnight-0/90 text-left">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            {/* Left: Engineering Decision & Rationale */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-champagne/15 border border-champagne/30 text-champagne">
                  {lang === 'id' ? 'Keputusan Rekayasa Sistem' : 'System Engineering Decision'} • Node {activeNode.stepNumber}
                </span>
                <span className="text-xs font-mono text-fog">({activeNode.name})</span>
              </div>

              <h3 className="font-display text-lg sm:text-xl text-pearl font-normal">
                {lang === 'id' ? activeNode.decisionTitleId : activeNode.decisionTitleEn}
              </h3>

              <p className="text-xs sm:text-sm text-mist leading-relaxed max-w-3xl">
                {lang === 'id' ? activeNode.decisionDescId : activeNode.decisionDescEn}
              </p>
            </div>

            {/* Right: Key Architecture Metrics */}
            <div className="lg:w-80 shrink-0 grid grid-cols-2 gap-2.5">
              {activeNode.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono text-fog uppercase">{m.label}</span>
                  <p className="text-xs sm:text-sm font-semibold font-mono text-champagne mt-1">
                    {m.value}
                  </p>
                </div>
              ))}

              <div className="col-span-2 p-2.5 rounded-xl bg-sapphire/10 border border-sapphire/25 flex items-center justify-between text-xs font-mono">
                <span className="text-fog">{lang === 'id' ? 'Latensi Komponen:' : 'Component Latency:'}</span>
                <span className="text-sapphire font-bold">{activeNode.latencyMs} ms</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
