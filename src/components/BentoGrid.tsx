import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShoppingBag,
  Code2,
  GraduationCap,
  Hand,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface BentoGridProps {
  lang: 'id' | 'en';
}

interface SkillDetail {
  name: string;
  category: 'frontend' | 'backend' | 'data';
  level: number;
  role: string;
  context: string;
}

const SKILL_DETAILS: SkillDetail[] = [
  {
    name: 'React & TS',
    category: 'frontend',
    level: 90,
    role: 'Frontend Engineering',
    context: 'Komponen modular dengan TypeScript strict typing, state management terpusat, dan animasi smooth 60fps.',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 95,
    role: 'Design Systems & UI',
    context: 'Sistem desain atomik Midnight Glass, fluid typography, dark mode, dan arsitektur visual responsif.',
  },
  {
    name: 'Laravel',
    category: 'backend',
    level: 80,
    role: 'MVC Backend Architecture',
    context: 'Pondasi RESTful API, Eloquent ORM, webhook pembayaran otomatis, dan autentikasi sesi aman pada RenStore.',
  },
  {
    name: 'SQL Database',
    category: 'data',
    level: 85,
    role: 'Relational Schema & Indexing',
    context: 'Perancangan skema relasional, optimasi query berindeks B-tree, dan integritas transaksi ACID (PostgreSQL & MySQL).',
  },
  {
    name: 'Python',
    category: 'data',
    level: 82,
    role: 'Data Science & Modeling',
    context: 'Pemodelan data analitik prediktif & machine learning pada Turnamen Sains Data Nasional (TSDN Top 7 Finalist).',
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 86,
    role: 'Runtime & Event Engine',
    context: 'Micro-backend modular, penanganan asynchronous I/O, rate limiting, dan validasi schema Zod.',
  },
  {
    name: 'PHP',
    category: 'backend',
    level: 80,
    role: 'Server-Side Engineering',
    context: 'Pemrograman backend berorientasi objek (OOP), integrasi database relasional, dan API controller terstruktur.',
  },
  {
    name: 'Cloud & Linux',
    category: 'data',
    level: 84,
    role: 'DevOps & Infrastructure',
    context: 'Manajemen server Linux VPS, konfigurasi Nginx reverse proxy, otomasi deployment Git, dan system hardening.',
  },
];

export const BentoGrid: React.FC<BentoGridProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend' | 'data'>('all');
  const [activeSkill, setActiveSkill] = useState<SkillDetail>(SKILL_DETAILS[0]);
  const [greetingToast, setGreetingToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mouse Parallax tracking for the center cutout
  const centerStageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!centerStageRef.current) return;
    const rect = centerStageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateY = (x / (rect.width / 2)) * 8;
    const rotateX = -(y / (rect.height / 2)) * 8;
    setTilt({
      rotateX,
      rotateY,
      shadowX: -x * 0.12,
      shadowY: -y * 0.12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });
  };

  const handlePhotoClick = () => {
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#F5B027', '#4C6FD1', '#10B981', '#F3F5FA'],
    });
    setGreetingToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setGreetingToast(false), 2600);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleCategoryChange = (catId: 'all' | 'frontend' | 'backend' | 'data') => {
    setSelectedCategory(catId);
    const nextFiltered =
      catId === 'all'
        ? SKILL_DETAILS
        : SKILL_DETAILS.filter((s) => s.category === catId);
    if (nextFiltered.length > 0 && !nextFiltered.some((s) => s.name === activeSkill.name)) {
      setActiveSkill(nextFiltered[0]);
    }
  };

  const filteredSkills =
    selectedCategory === 'all'
      ? SKILL_DETAILS
      : SKILL_DETAILS.filter((s) => s.category === selectedCategory);

  const safeActiveSkill = activeSkill || filteredSkills[0] || SKILL_DETAILS[0];

  return (
    <section id="bento" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl xl:max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 sm:mb-10 text-left">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-pearl font-normal">
          {lang === 'id' ? 'Profil, Keahlian & Rekam Jejak' : 'Profile, Stack & Track Record'}
        </h2>
      </div>

      {/* 
        FLUID UNBOXED SPATIAL STAGING (No Rigid Master Enclosure Box - Modern, Open & Clean)
      */}
      <div className="relative w-full">
        {/* Subtle Ambient Cosmic Haze for the Staging Area */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-sapphire/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-champagne/15 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[#10B981]/10 blur-[110px] pointer-events-none" />

        {/* 3-Column Decoupled Spatial Layout: Responsive 1-Col Mobile -> 2-Col Tablet -> 3-Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch relative z-10">
          
          {/* ================= LEFT WING (4 Cols): MODULAR STACK & ARCHITECTURE CARDS ================= */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-between space-y-4 text-left order-2 lg:order-1 h-full">
            {/* Card 1: Interactive System Stack Console */}
            <div className="glass-2 p-4 sm:p-5 rounded-3xl border border-white/10 hover:border-white/20 shadow-glass-md flex-1 flex flex-col justify-between space-y-3 transition-all">
              {/* Header Telemetry Bar */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-champagne" />
                  <span className="text-xs font-semibold text-pearl tracking-tight">
                    {lang === 'id' ? 'Arsitektur & Stack Teknologi' : 'System Stack & Diagnostics'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-fog px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  8 Keahlian
                </span>
              </div>

              {/* Minimalist Segmented Category Filter (Single-Line, Safe Overflow Containment) */}
              <div className="p-1 rounded-xl bg-midnight-0/60 border border-white/10 flex items-center gap-1 w-full overflow-x-auto scrollbar-none flex-nowrap">
                {(
                  [
                    { id: 'all', label: lang === 'id' ? 'Semua' : 'All' },
                    { id: 'frontend', label: 'Frontend' },
                    { id: 'backend', label: 'Backend' },
                    { id: 'data', label: 'Data & Cloud' },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex-1 shrink-0 text-[10.5px] sm:text-[11px] font-mono py-1.5 px-2 sm:px-1 rounded-lg transition-all text-center whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-champagne/20 text-champagne font-semibold border border-champagne/40 shadow-sm'
                        : 'text-fog hover:text-pearl border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Clean & Tactile Skills Matrix with Razor-Thin Starlight Tracks (No Truncation) */}
              <div className="grid grid-cols-2 gap-2">
                {filteredSkills.map((skill) => {
                  const isSelected = safeActiveSkill.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setActiveSkill(skill)}
                      className={`p-2 sm:p-2.5 rounded-xl text-left transition-all flex flex-col justify-between border group cursor-pointer ${
                        isSelected
                          ? 'bg-champagne/15 border-champagne/60 text-pearl shadow-[0_0_14px_rgba(245,176,39,0.2)]'
                          : 'bg-midnight-0/40 hover:bg-white/[0.05] border-white/10 hover:border-white/20 text-mist'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5 gap-1">
                        <span className="text-[11px] sm:text-xs font-medium text-pearl group-hover:text-champagne transition-colors truncate">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs font-semibold text-champagne shrink-0">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Minimalist Micro Progress Track */}
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-champagne to-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Architecture Telemetry HUD - MATCHING RIGHT WING CARDS ANATOMY */}
            <div className="glass-2 p-4 sm:p-5 rounded-3xl border border-champagne/30 hover:border-champagne/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-3 group shadow-glass-md">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#F5B027]/25 to-[#D98218]/25 border border-[#F5B027]/50 text-[#F5B027] shadow-[0_0_14px_rgba(245,176,39,0.3)]">
                  <Code2 className="w-4 h-4 text-[#F5B027]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-champagne px-2.5 py-0.5 rounded-full bg-champagne/10 border border-champagne/25">
                  {safeActiveSkill.role}
                </span>
              </div>

              <div>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-pearl block tracking-tight">
                  {safeActiveSkill.level}%
                </span>
                <p className="text-xs font-semibold text-pearl mt-1">
                  {safeActiveSkill.name} • {safeActiveSkill.role}
                </p>
                <p className="text-[11px] text-mist mt-1 leading-relaxed">
                  {safeActiveSkill.context}
                </p>
              </div>

              <div className="text-[11px] text-fog font-mono flex items-center justify-between pt-2 border-t border-white/5">
                <span>Standar Produksi</span>
                <span className="text-champagne font-mono text-[10px]">Teruji & Terintegrasi</span>
              </div>
            </div>
          </div>

          {/* ================= CENTER STAGE (4 Cols): ENLARGED & PROMINENT PROFILE CENTERPIECE ================= */}
          <div
            ref={centerStageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handlePhotoClick}
            className="md:col-span-2 lg:col-span-4 flex flex-col items-center justify-end relative order-1 lg:order-2 min-h-[380px] xs:min-h-[420px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[580px] select-none cursor-pointer group pt-2 pb-0 h-full overflow-visible"
            title="Klik untuk sapaan interaktif Rendy"
            aria-label="Foto Profil Interaktif Rendy Fernando"
          >
            {/* ================= LUXURY CELESTIAL BACKDROP AURA ================= */}
            {/* 1. Outer Celestial Orbit Whisper Halo */}
            <div
              className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] lg:w-[440px] lg:h-[440px] rounded-full border border-sapphire/20 pointer-events-none transition-transform duration-500 ease-out"
              style={{
                transform: `translate(calc(-50% + ${tilt.shadowX * 0.6}px), calc(-50% + ${tilt.shadowY * 0.6}px))`,
              }}
            />

            {/* 2. Concentric Golden Horizon Prestige Ring */}
            <div
              className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[310px] sm:h-[310px] lg:w-[350px] lg:h-[350px] rounded-full border border-champagne/30 bg-gradient-to-b from-champagne/10 via-sapphire/5 to-transparent backdrop-blur-[1px] shadow-[0_0_45px_rgba(245,176,39,0.18)] pointer-events-none transition-transform duration-500 ease-out"
              style={{
                transform: `translate(calc(-50% + ${tilt.shadowX * 1.0}px), calc(-50% + ${tilt.shadowY * 1.0}px))`,
              }}
            />

            {/* 3. Radiant Champagne Solar Corona (Behind Head & Shoulders) */}
            <div
              className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-tr from-champagne/35 via-amber-500/20 to-transparent blur-[55px] pointer-events-none transition-transform duration-300"
              style={{
                transform: `translate(calc(-50% + ${tilt.shadowX * 1.4}px), ${tilt.shadowY * 1.4}px)`,
              }}
            />

            {/* 4. Deep Royal Sapphire Nebula Core (Torso & Atmosphere) */}
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 w-60 h-60 sm:w-72 sm:h-72 lg:w-88 lg:h-88 rounded-full bg-sapphire/40 blur-[80px] pointer-events-none transition-transform duration-300"
              style={{
                transform: `translate(calc(-50% + ${-tilt.shadowX * 1.2}px), ${-tilt.shadowY * 1.2}px)`,
              }}
            />

            {/* 5. Pedestal Uplight Glow (Grounding Base) */}
            <div className="absolute bottom-4 w-44 sm:w-56 h-8 rounded-full bg-champagne/20 blur-lg pointer-events-none" />

            {/* Floating Holographic Pill 1: Full Stack Developer (Top Left - Raised Slightly) */}
            <div
              className="absolute top-1.5 sm:top-2.5 left-2 sm:left-4 lg:left-6 z-20 pointer-events-none"
              style={{
                transform: `translate3d(${tilt.rotateY * 2.2}px, ${tilt.rotateX * 2.2}px, 20px)`,
              }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="glass-3 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-sapphire/50 shadow-glass-md flex items-center gap-1.5 sm:gap-2 backdrop-blur-md">
                  <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sapphire" />
                  <span className="text-[10px] sm:text-[11px] font-semibold text-pearl tracking-tight">Full Stack Developer</span>
                </div>
              </motion.div>
            </div>

            {/* Floating Holographic Pill 2: SMKN 26 Jakarta SIJA (Top Right - Raised Slightly to Clear Head) */}
            <div
              className="absolute top-2.5 sm:top-4 right-2 sm:right-4 lg:right-6 z-20 pointer-events-none"
              style={{
                transform: `translate3d(${-tilt.rotateY * 2.2}px, ${-tilt.rotateX * 2.2}px, 25px)`,
              }}
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              >
                <div className="glass-3 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-champagne/50 shadow-glass-md flex items-center gap-1.5 sm:gap-2 backdrop-blur-md">
                  <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-champagne" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-champagne font-medium">SMKN 26 Jakarta</span>
                </div>
              </motion.div>
            </div>

            {/* Cutout Photo of Rendy - SCALED SLIGHTLY DOWN & ELEVATED TO SIT UNDER PILLS AND COVERED AT BOTTOM BY NAME CAPSULE */}
            <div
              className="relative z-10 w-full max-w-[230px] xs:max-w-[260px] sm:max-w-[290px] md:max-w-[315px] lg:max-w-[335px] flex items-end justify-center transition-transform duration-200 ease-out pb-3.5 sm:pb-4 origin-bottom"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
            >
              <img
                src="/assets/people/me-cutout.png"
                alt="Rendy Fernando Tambunan - Cutout Profile"
                className="w-full h-auto object-contain max-h-[330px] xs:max-h-[370px] sm:max-h-[440px] md:max-h-[475px] lg:max-h-[505px] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.75)] group-hover:drop-shadow-[0_0_35px_rgba(245,176,39,0.35)] transition-all duration-300 [mask-image:linear-gradient(to_bottom,black_calc(100%-14px),transparent_100%)]"
                loading="lazy"
              />
            </div>

            {/* Bottom Floating Identity Capsule - COVERS THE CROPPED BOTTOM OF THE PHOTO */}
            <div className="absolute bottom-0 z-20 pointer-events-none flex flex-col items-center text-center">
              <div className="glass-3 bg-midnight-0/95 sm:bg-midnight-0/90 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-champagne/45 shadow-[0_12px_36px_rgba(0,0,0,0.9),0_0_24px_rgba(245,176,39,0.22)] flex items-center justify-center gap-2 sm:gap-2.5 backdrop-blur-2xl">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-champagne animate-pulse shadow-[0_0_8px_#F5B027]" />
                <span className="text-xs sm:text-sm font-semibold text-pearl tracking-tight whitespace-nowrap">
                  Rendy Fernando Tambunan
                </span>
              </div>
            </div>

            {/* Tactile Greeting Toast when Photo is Clicked */}
            <AnimatePresence>
              {greetingToast && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-28 z-30 bg-champagne text-midnight-0 px-4 py-2 rounded-full text-xs font-semibold shadow-glass-lg flex items-center gap-2 pointer-events-none"
                >
                  <Hand className="w-4 h-4 text-midnight-0" />
                  <span>Halo! Senang bertemu dengan Anda</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ================= RIGHT WING (4 Cols): DECOUPLED FLOATING IMPACT CARDS ================= */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col justify-between space-y-4 text-left order-3 h-full">
            {/* National Achievement: Top 7 TSDN */}
            <div className="glass-2 p-4 sm:p-5 rounded-3xl border border-white/10 hover:border-sapphire/40 hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between space-y-3 group shadow-glass-md">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-sapphire/20 border border-sapphire/40 text-sapphire shadow-[0_0_12px_rgba(76,111,209,0.25)]">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-fog px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  Prestasi Nasional
                </span>
              </div>

              <div>
                <span className="font-mono text-3xl font-bold text-pearl block tracking-tight">Top 7</span>
                <p className="text-xs font-semibold text-pearl mt-1">Turnamen Sains Data Nasional (TSDN)</p>
                <p className="text-[11px] text-mist mt-1 leading-relaxed">
                  Diselenggarakan oleh Data Academy tingkat nasional untuk pemodelan data prediktif dan machine learning.
                </p>
              </div>

              <div className="text-[11px] text-fog font-mono flex items-center justify-between pt-2 border-t border-white/5">
                <span>Data Academy</span>
                <span>Desember 2024</span>
              </div>
            </div>

            {/* Real Business Scale: RenStore 1.000+ Reviews */}
            <div className="glass-2 p-4 sm:p-5 rounded-3xl border border-champagne/30 hover:border-champagne/50 hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between space-y-3 group shadow-glass-md">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#F5B027]/25 to-[#D98218]/25 border border-[#F5B027]/50 text-[#F5B027] shadow-[0_0_16px_rgba(245,176,39,0.35)]">
                  <ShoppingBag className="w-4 h-4 text-[#F5B027]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-fog px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                  Global Commerce
                </span>
              </div>

              <div>
                <span className="font-mono text-3xl font-bold text-[#F5B027] block drop-shadow-[0_0_16px_rgba(245,176,39,0.45)]">
                  1.000+
                </span>
                <p className="text-xs font-semibold text-pearl mt-1">Ulasan Positif di Zeusx International</p>
                <p className="text-[11px] text-mist mt-1 leading-relaxed">
                  Founder platform RenStore dengan transaksi internasional dan otomasi serah terima lisensi digital.
                </p>
              </div>

              <div className="text-[11px] text-fog font-mono flex items-center justify-between pt-2 border-t border-white/5">
                <span>Global Digital Commerce</span>
                <a
                  href="https://renstore-project.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-champagne hover:underline flex items-center gap-1 font-mono text-[10px]"
                >
                  <span>Lihat Web</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Social Network & Developer Identity */}
            <div className="glass-2 p-4 sm:p-5 rounded-3xl border border-white/10 shadow-glass-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-pearl">
                  <Layers className="w-3.5 h-3.5 text-sapphire" />
                  <span>Jaringan & Media Sosial</span>
                </div>
                <span className="text-[10px] font-mono text-fog">@renfertz</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={PERSONAL_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-1 hover:border-champagne/40 p-2.5 rounded-xl flex items-center justify-between text-xs text-mist hover:text-pearl transition-all group"
                >
                  <span className="flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-fog group-hover:text-champagne group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-1 hover:border-sapphire/40 p-2.5 rounded-xl flex items-center justify-between text-xs text-mist hover:text-pearl transition-all group"
                >
                  <span className="flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-fog group-hover:text-sapphire group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_DATA.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-1 hover:border-pink-500/40 p-2.5 rounded-xl flex items-center justify-between text-xs text-mist hover:text-pearl transition-all group"
                >
                  <span className="flex items-center gap-1.5">
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-fog group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_DATA.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-1 hover:border-cyan-400/40 p-2.5 rounded-xl flex items-center justify-between text-xs text-mist hover:text-pearl transition-all group"
                >
                  <span className="flex items-center gap-1.5">
                    <TikTokIcon className="w-3.5 h-3.5" />
                    <span>TikTok</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-fog group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
