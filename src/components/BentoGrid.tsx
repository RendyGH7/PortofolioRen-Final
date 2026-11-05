import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShoppingBag,
  Code2,
  Terminal,
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
    name: 'Database (SQL)',
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
    setTimeout(() => setGreetingToast(false), 2600);
  };

  const filteredSkills =
    selectedCategory === 'all'
      ? SKILL_DETAILS
      : SKILL_DETAILS.filter((s) => s.category === selectedCategory);

  return (
    <section id="bento" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 text-left space-y-2">
        <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
          {lang === 'id' ? 'Profil, Keahlian & Rekam Jejak' : 'Profile, Stack & Track Record'}
        </h2>
        <p className="text-mist text-xs sm:text-sm max-w-2xl leading-relaxed">
          {lang === 'id'
            ? 'Arsitektur terpadu yang merangkum identitas rekayasa, penguasaan teknologi riil, dan skala dampak produksi.'
            : 'Unified architecture synthesizing engineering identity, verified stack mastery, and production scale.'}
        </p>
      </div>

      {/* 
        FLUID UNBOXED SPATIAL STAGING (No Rigid Master Enclosure Box - Modern, Open & Clean)
      */}
      <div className="relative w-full">
        {/* Subtle Ambient Cosmic Haze for the Staging Area */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-sapphire/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-champagne/15 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[#10B981]/10 blur-[110px] pointer-events-none" />

        {/* 3-Column Decoupled Spatial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          
          {/* ================= LEFT WING (4 Cols): ULTRA-CLEAN & MINIMALIST STACK CONSOLE ================= */}
          <div className="lg:col-span-4 flex flex-col space-y-4 text-left order-2 lg:order-1 glass-2 p-5 sm:p-6 rounded-3xl border border-white/10 shadow-glass-md hover:border-white/20 transition-all">
            {/* Header Telemetry Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sapphire" />
                <span className="text-xs font-semibold text-pearl tracking-tight">
                  {lang === 'id' ? 'Arsitektur & Stack Teknologi' : 'System Stack & Diagnostics'}
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-[#6EE7B7] bg-[#064E3B]/85 px-2 py-0.5 rounded-full border border-[#10B981]/60 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live Inspect
              </span>
            </div>

            {/* Minimalist Segmented Category Filter */}
            <div className="p-1 rounded-xl bg-midnight-0/60 border border-white/10 flex items-center gap-1">
              {(
                [
                  { id: 'all', label: lang === 'id' ? 'Semua' : 'All' },
                  { id: 'frontend', label: 'Frontend' },
                  { id: 'backend', label: 'Backend' },
                  { id: 'data', label: 'Data & DB' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-1 text-[11px] font-mono py-1 rounded-lg transition-all text-center ${
                    selectedCategory === cat.id
                      ? 'bg-champagne/20 text-champagne font-semibold border border-champagne/40 shadow-sm'
                      : 'text-fog hover:text-pearl border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Clean & Tactile Skills Matrix (Zero Clutter, Zero Truncation) */}
            <div className="grid grid-cols-2 gap-2">
              {filteredSkills.map((skill) => {
                const isSelected = activeSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => setActiveSkill(skill)}
                    className={`h-[42px] px-3 rounded-xl text-left transition-all flex items-center justify-between border group ${
                      isSelected
                        ? 'bg-champagne/15 border-champagne/60 text-pearl shadow-[0_0_14px_rgba(245,176,39,0.2)]'
                        : 'bg-midnight-0/40 hover:bg-white/[0.05] border-white/10 hover:border-white/20 text-mist'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                          isSelected ? 'bg-champagne animate-pulse' : 'bg-white/25 group-hover:bg-champagne/60'
                        }`}
                      />
                      <span className="text-xs font-medium text-pearl truncate group-hover:text-champagne transition-colors">
                        {skill.name}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-semibold text-champagne shrink-0 ml-1.5">
                      {skill.level}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Architecture Telemetry HUD (Live Context Inspector) */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-midnight-0/60 border border-champagne/30 space-y-2 shadow-glass-sm transition-all">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                  <span className="font-mono font-bold text-pearl text-xs">
                    {activeSkill.name}
                  </span>
                  <span className="text-[10px] font-mono text-champagne bg-champagne/10 px-2 py-0.5 rounded-full border border-champagne/25">
                    {activeSkill.role}
                  </span>
                </div>
                <span className="text-[10px] text-[#6EE7B7] font-mono bg-[#064E3B]/70 px-2 py-0.5 rounded-full border border-[#10B981]/50 hidden sm:inline-block">
                  Verified in Prod
                </span>
              </div>

              <p className="text-xs text-mist leading-relaxed">
                {activeSkill.context}
              </p>

              {/* Real-time Telemetry Spec Ribbon */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-fog">
                <span className="flex items-center gap-1">
                  <span className="text-mist">Runtime:</span> Modern Modular
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-mist">Scale:</span> Production Tested
                </span>
                <span className="text-champagne font-semibold">Latency &lt; 16ms</span>
              </div>
            </div>
          </div>

          {/* ================= CENTER STAGE (4 Cols): ENLARGED & PROMINENT PROFILE CENTERPIECE ================= */}
          <div
            ref={centerStageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handlePhotoClick}
            className="lg:col-span-4 flex flex-col items-center justify-end relative order-1 lg:order-2 min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] select-none cursor-pointer group py-2"
            title="Klik untuk sapaan interaktif Rendy"
            aria-label="Foto Profil Interaktif Rendy Fernando"
          >
            {/* Ambient Multi-Layer Glow behind Cutout */}
            <div
              className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-sapphire/35 blur-[110px] pointer-events-none transition-transform duration-300"
              style={{
                transform: `translate(${tilt.shadowX * 1.6}px, ${tilt.shadowY * 1.6}px)`,
              }}
            />
            <div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-champagne/30 blur-[90px] pointer-events-none transition-transform duration-300 translate-y-12"
              style={{
                transform: `translate(${-tilt.shadowX}px, ${-tilt.shadowY}px)`,
              }}
            />

            {/* Floating Holographic Pill 1: Full Stack Developer (Top Left) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-2 left-0 sm:left-2 z-20 pointer-events-none"
              style={{
                transform: `translate3d(${tilt.rotateY * 2.2}px, ${tilt.rotateX * 2.2}px, 20px)`,
              }}
            >
              <div className="glass-3 px-3.5 py-1.5 rounded-full border border-sapphire/50 shadow-glass-md flex items-center gap-2 backdrop-blur-md">
                <Code2 className="w-3.5 h-3.5 text-sapphire" />
                <span className="text-[11px] font-semibold text-pearl tracking-tight">Full Stack Developer</span>
              </div>
            </motion.div>

            {/* Floating Holographic Pill 2: SMKN 26 Jakarta SIJA (Top Right) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="absolute top-12 right-0 sm:right-2 z-20 pointer-events-none"
              style={{
                transform: `translate3d(${-tilt.rotateY * 2.2}px, ${-tilt.rotateX * 2.2}px, 25px)`,
              }}
            >
              <div className="glass-3 px-3.5 py-1.5 rounded-full border border-champagne/50 shadow-glass-md flex items-center gap-2 backdrop-blur-md">
                <GraduationCap className="w-3.5 h-3.5 text-champagne" />
                <span className="text-[11px] font-mono text-champagne font-medium">SMKN 26 Jakarta</span>
              </div>
            </motion.div>

            {/* Cutout Photo of Rendy - HERO-SCALE, ENLARGED & CINEMATIC */}
            <div
              className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[450px] flex items-end justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.08, 1.08, 1.08)`,
              }}
            >
              <img
                src="/assets/people/me-cutout.png"
                alt="Rendy Fernando Tambunan - Cutout Profile"
                className="w-full h-auto object-contain max-h-[520px] sm:max-h-[580px] lg:max-h-[620px] filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.75)] group-hover:drop-shadow-[0_0_40px_rgba(245,176,39,0.4)] transition-all duration-300"
                loading="lazy"
              />
            </div>

            {/* Bottom Floating Identity Capsule */}
            <div className="absolute -bottom-2 z-20 pointer-events-none flex flex-col items-center text-center">
              <div className="glass-3 px-4 py-2 rounded-full border border-white/25 shadow-glass-lg flex items-center gap-2.5 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="text-xs font-semibold text-pearl tracking-tight">Rendy Fernando Tambunan</span>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-champagne">
                  SIJA 2023 - 2027
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
          <div className="lg:col-span-4 flex flex-col space-y-4 text-left order-3">
            {/* National Achievement: Top 7 TSDN */}
            <div className="glass-2 p-5 rounded-3xl border border-white/10 hover:border-sapphire/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3 group shadow-glass-md">
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
            <div className="glass-2 p-5 rounded-3xl border border-champagne/30 hover:border-champagne/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3 group shadow-glass-md">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#F5B027]/25 to-[#D98218]/25 border border-[#F5B027]/50 text-[#F5B027] shadow-[0_0_16px_rgba(245,176,39,0.35)]">
                  <ShoppingBag className="w-4 h-4 text-[#F5B027]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6EE7B7] font-semibold px-2.5 py-0.5 rounded-full bg-[#064E3B]/85 border border-[#10B981]/60 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Terverifikasi
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
            <div className="glass-2 p-5 rounded-3xl border border-white/10 shadow-glass-md space-y-3">
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
