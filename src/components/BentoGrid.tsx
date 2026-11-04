import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Award,
  ShoppingBag,
  Cpu,
  Layers,
  ArrowUpRight,
  Flame,
  GraduationCap,
  Hand,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA, HARD_SKILLS } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface BentoGridProps {
  lang: 'id' | 'en';
}

export const BentoGrid: React.FC<BentoGridProps> = ({ lang }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [greetingToast, setGreetingToast] = useState(false);

  // Mouse Parallax tracking for the center cutout
  const centerStageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('id-ID', options).format(now) + ' WIB');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!centerStageRef.current) return;
    const rect = centerStageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 3D tilt angles (max 10 deg)
    const rotateY = (x / (rect.width / 2)) * 10;
    const rotateX = -(y / (rect.height / 2)) * 10;
    setTilt({
      rotateX,
      rotateY,
      shadowX: -rotateY * 2,
      shadowY: -rotateX * 2,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shadowX: 0, shadowY: 0 });
  };

  const handlePhotoClick = () => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F5B027', '#4C6FD1', '#2C7A85', '#F3F5FA'],
    });
    setGreetingToast(true);
    setTimeout(() => setGreetingToast(false), 2400);
  };

  return (
    <section id="bento" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 text-left space-y-2">
        <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
          {lang === 'id' ? 'Profil & Kapabilitas' : 'Profile & Capabilities'}
        </h2>
        <p className="text-mist text-xs sm:text-sm">
          {lang === 'id'
            ? 'Ringkasan visual identitas, rekam jejak, dan teknologi inti.'
            : 'Visual synthesis of identity, verified milestones, and core tech.'}
        </p>
      </div>

      {/* 3-Column Modern Center-Stage Mosaic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ================= LEFT COLUMN (4 Cols) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1">
          {/* Card 1: Live Jakarta Time & Location Card */}
          <div className="glass-2 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden text-left">
            <div className="flex items-center justify-between text-xs text-fog">
              <span className="flex items-center gap-1.5 text-mist">
                <MapPin className="w-3.5 h-3.5 text-champagne" />
                <span>Jakarta Timur, ID</span>
              </span>
              <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded">UTC+7</span>
            </div>

            <div className="my-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-sapphire" />
                <span className="text-xs text-mist font-medium">Jam Lokal Saat Ini</span>
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-semibold text-pearl tracking-tight">
                {timeStr || '16:15:00 WIB'}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-mist">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-status-success inline-block animate-pulse shadow-[0_0_8px_#00DC82]" />
                <span>Zona Waktu Aktif</span>
              </span>
              <span className="text-fog">Respons Cepat</span>
            </div>
          </div>

          {/* Card 2: Keahlian & Stack Teknologi */}
          <div className="glass-2 rounded-xl p-5 flex flex-col justify-between flex-1 text-left">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sapphire" />
                <span className="text-xs font-semibold text-pearl">Keahlian & Stack Teknologi</span>
              </div>
              <span className="text-[10px] text-fog font-mono">CV Terverifikasi</span>
            </div>

            {/* Skills Progress Bars Grid (2 Columns) */}
            <div className="grid grid-cols-2 gap-2.5 my-1">
              {HARD_SKILLS.slice(0, 8).map((skill) => (
                <div
                  key={skill.name}
                  className="glass-1 rounded-lg p-2.5 flex flex-col justify-between hover:border-champagne/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-pearl truncate mr-1">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-champagne font-semibold shrink-0">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sapphire to-champagne h-full rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tags Strip */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5 text-[10px] font-mono text-fog">
              <span className="px-2 py-0.5 rounded bg-white/5">PostgreSQL</span>
              <span className="px-2 py-0.5 rounded bg-white/5">MySQL</span>
              <span className="px-2 py-0.5 rounded bg-white/5">RESTful API</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Git & GitHub</span>
              <span className="px-2 py-0.5 rounded bg-white/5">Linux Server</span>
            </div>
          </div>
        </div>

        {/* ================= CENTER STAGE (4 Cols) - FREE STANDING CUTOUT ================= */}
        <div
          ref={centerStageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-4 flex flex-col items-center justify-end relative order-1 lg:order-2 min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] select-none cursor-pointer group"
          onClick={handlePhotoClick}
          aria-label="Foto Profil Interaktif Rendy Fernando"
        >
          {/* Dual Dynamic Ambient Aura Blobs behind Rendy (NO box, pure ambient glow) */}
          <div
            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-sapphire/25 blur-[75px] pointer-events-none transition-transform duration-300"
            style={{
              transform: `translate(${tilt.shadowX * 1.5}px, ${tilt.shadowY * 1.5}px)`,
            }}
          />
          <div
            className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-champagne/20 blur-[65px] pointer-events-none transition-transform duration-300 translate-y-12"
            style={{
              transform: `translate(${-tilt.shadowX}px, ${-tilt.shadowY}px)`,
            }}
          />

          {/* Floating Holographic Badge 1: Top-Left (Full Stack Dev) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 left-2 sm:left-4 z-20 pointer-events-none"
            style={{
              transform: `translate3d(${tilt.rotateY * 2.5}px, ${tilt.rotateX * 2.5}px, 20px)`,
            }}
          >
            <div className="glass-2 px-3 py-1.5 rounded-full border border-sapphire/40 shadow-glass-md flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-sapphire animate-ping" />
              <span className="text-[11px] font-semibold text-pearl tracking-tight">
                Full Stack Developer
              </span>
            </div>
          </motion.div>

          {/* Floating Holographic Badge 2: Top-Right (Education SIJA) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-16 right-2 sm:right-4 z-20 pointer-events-none"
            style={{
              transform: `translate3d(${-tilt.rotateY * 2}px, ${-tilt.rotateX * 2}px, 25px)`,
            }}
          >
            <div className="glass-2 px-3 py-1.5 rounded-full border border-champagne/40 shadow-glass-md flex items-center gap-1.5 backdrop-blur-md">
              <GraduationCap className="w-3.5 h-3.5 text-champagne" />
              <span className="text-[11px] font-mono text-champagne font-medium">
                SMKN 26 Jakarta
              </span>
            </div>
          </motion.div>

          {/* Free-Standing Cutout Photo of Rendy with 3D Mouse Tilt & Rim Light */}
          <div
            className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] flex items-end justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            }}
          >
            <img
              src="/assets/people/me-cutout.png"
              alt="Rendy Fernando Tambunan - Cutout Profile"
              className="w-full h-auto object-contain max-h-[460px] sm:max-h-[510px] filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_0_30px_rgba(217,185,118,0.35)] transition-all duration-300"
              loading="lazy"
            />
          </div>

          {/* Bottom Center Floating Identity Pill */}
          <div className="absolute bottom-2 z-20 pointer-events-none flex flex-col items-center text-center">
            <div className="glass-3 px-4 py-2 rounded-full border border-white/20 shadow-glass-lg flex items-center gap-2.5">
              <span className="text-xs font-semibold text-pearl tracking-tight">
                Rendy Fernando Tambunan
              </span>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-champagne">
                2023 - 2027
              </span>
            </div>
          </div>

          {/* Interactive Greeting Toast when photo is clicked */}
          {greetingToast && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-28 z-30 bg-champagne text-midnight-0 px-4 py-2 rounded-full text-xs font-semibold shadow-glass-lg flex items-center gap-1.5 pointer-events-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-midnight-0" />
              <span>Halo! Senang bertemu dengan Anda ✨</span>
            </motion.div>
          )}
        </div>

        {/* ================= RIGHT COLUMN (4 Cols) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-4 order-3">
          {/* Card 3: Top 7 TSDN National Award */}
          <div className="glass-2 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group text-left">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-sapphire/15 border border-sapphire/30 text-sapphire">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-fog px-2 py-0.5 rounded bg-white/5">
                Prestasi Nasional
              </span>
            </div>

            <div className="my-3">
              <span className="font-mono text-3xl font-bold text-pearl block">Top 7</span>
              <p className="text-xs font-semibold text-pearl mt-1">
                Turnamen Sains Data Nasional (TSDN)
              </p>
              <p className="text-[11px] text-mist mt-1 leading-relaxed">
                Diselenggarakan oleh Data Academy tingkat nasional untuk pemodelan data prediktif.
              </p>
            </div>

            <div className="text-[11px] text-fog font-mono flex items-center justify-between pt-2 border-t border-white/5">
              <span>Data Academy</span>
              <span>Des 2024</span>
            </div>
          </div>

          {/* Card 4: RenStore 1.000+ Reviews Card */}
          <div className="glass-2 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group text-left">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-champagne/20 border border-champagne/40 text-champagne shadow-[0_0_14px_rgba(245,176,39,0.25)]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-status-success font-semibold px-2.5 py-0.5 rounded-full bg-status-success/15 border border-status-success/35 flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,220,130,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success shadow-[0_0_6px_#00DC82]" />
                Terverifikasi
              </span>
            </div>

            <div className="my-3">
              <span className="font-mono text-3xl font-bold text-champagne block drop-shadow-[0_0_14px_rgba(245,176,39,0.35)]">1.000+</span>
              <p className="text-xs font-semibold text-pearl mt-1">
                Ulasan Positif di Zeusx
              </p>
              <p className="text-[11px] text-mist mt-1 leading-relaxed">
                Founder platform RenStore dengan transaksi internasional dan otomasi serah terima lisensi digital.
              </p>
            </div>

            <div className="text-[11px] text-fog font-mono flex items-center justify-between pt-2 border-t border-white/5">
              <span>Global Commerce</span>
              <span>2025 - Sekarang</span>
            </div>
          </div>

          {/* Card 5: Fokus & Jaringan Media Sosial */}
          <div className="glass-2 rounded-xl p-5 flex flex-col justify-between flex-1 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-pearl mb-2">
              <Layers className="w-4 h-4 text-sapphire" />
              <span>Fokus & Media Sosial</span>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-2 my-2">
              <a
                href={PERSONAL_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-champagne/40 p-2.5 rounded-lg flex items-center justify-between text-xs text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-sapphire/40 p-2.5 rounded-lg flex items-center justify-between text-xs text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-champagne/40 p-2.5 rounded-lg flex items-center justify-between text-xs text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-1.5">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_DATA.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-petrol/40 p-2.5 rounded-lg flex items-center justify-between text-xs text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-1.5">
                  <TikTokIcon className="w-3.5 h-3.5" />
                  <span>TikTok</span>
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Target Karir Strip */}
            <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-fog">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-champagne" />
                <span>Software Engineer</span>
              </span>
              <span>@renfertz</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
