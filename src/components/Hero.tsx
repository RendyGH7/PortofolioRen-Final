import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Mail,
  ArrowUpRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { Hero3D } from './Hero3D';

interface HeroProps {
  lang: 'id' | 'en';
}

const ROLES_ID = [
  'Full Stack Web Developer',
  'Laravel 11 & React 19 Architect',
  'Founder of RenStore Platform',
  'Top 7 Turnamen Sains Data Nasional',
  'Cloud & Modern Web Engineer',
];

const ROLES_EN = [
  'Full Stack Web Developer',
  'Laravel 11 & React 19 Architect',
  'Founder of RenStore Platform',
  'Top 7 National Data Science Finalist',
  'Cloud & Modern Web Engineer',
];

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const roles = lang === 'id' ? ROLES_ID : ROLES_EN;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth Typewriter Animation Engine
  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 32);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography, Dynamic Typewriter & Intentional Persona Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 z-10">
          
          {/* Eyebrow Availability Capsule */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-2 border border-white/10 shadow-glass-sm backdrop-blur-md self-start">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-mono text-mist">
              {lang === 'id' ? 'Tersedia untuk Proyek & Rekayasa Web' : 'Available for Projects & Engineering'}
            </span>
          </div>

          {/* Headline in Montserrat Display */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-pearl tracking-tight leading-[1.08]">
              Rendy Fernando <br />
              <span className="bg-gradient-to-r from-[#F5B027] via-[#FFD369] to-[#D98218] bg-clip-text text-transparent font-light">
                Tambunan
              </span>
            </h1>

            {/* Smooth Typewriter Terminal Line with Zero Layout Shift */}
            <div className="flex items-center gap-2 text-base sm:text-xl font-mono min-h-[32px] pt-1">
              <span className="text-champagne font-bold select-none">{'>_'}</span>
              <span className="text-pearl font-medium tracking-tight">
                {displayText}
              </span>
              <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-champagne ml-0.5 animate-pulse align-middle" />
            </div>
          </div>

          {/* Subtitle Statement */}
          <p className="text-mist text-sm sm:text-base max-w-xl leading-relaxed">
            {lang === 'id'
              ? 'Membangun aplikasi web performa tinggi dengan arsitektur bersih, keandalan sistem produksi, dan presisi antarmuka modern.'
              : 'Engineering high-performance web applications with clean architecture, production reliability, and modern UI precision.'}
          </p>

          {/* Persona Pathways & Interactive Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Primary Action: Karya Pilihan with Radiant Amber Solar Gradient */}
            <button
              onClick={() => scrollTo('work')}
              className="btn-champagne px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 group transition-all duration-300 shadow-[0_0_20px_rgba(245,176,39,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <FolderGit2 className="w-4 h-4 text-midnight-0 transition-transform group-hover:scale-110" />
              <span>{lang === 'id' ? 'Eksplorasi Karya' : 'Explore Work'}</span>
              <ArrowUpRight className="w-4 h-4 text-midnight-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Direct Contact */}
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3.5 rounded-xl glass-2 hover:border-champagne/40 text-xs sm:text-sm font-medium text-pearl transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
            >
              <Mail className="w-4 h-4 text-champagne" />
              <span>{lang === 'id' ? 'Hubungi Langsung' : 'Get in Touch'}</span>
            </button>

            {/* Developer Terminal Trigger */}
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: '~' });
                window.dispatchEvent(event);
              }}
              className="px-3.5 py-3.5 rounded-xl glass-1 hover:border-sapphire/40 text-xs font-mono text-mist hover:text-pearl transition-all hidden sm:flex items-center gap-1.5"
              title="Tekan ~ untuk Terminal Interaktif"
              aria-label="Terminal Interaktif"
            >
              <Terminal className="w-3.5 h-3.5 text-sapphire" />
              <span>~</span>
            </button>
          </div>

          {/* Proof-of-Scale Credentials Strip (3 Strategic Pillars) */}
          <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/[0.08] max-w-lg">
            <div className="flex flex-col space-y-0.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-champagne shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold text-pearl">1.000+ Ulasan</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-fog truncate">Founder RenStore</span>
            </div>

            <div className="flex flex-col space-y-0.5">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-3 h-3 text-champagne shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold text-pearl">Top 7 Nasional</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-fog truncate">Turnamen Sains Data</span>
            </div>

            <div className="flex flex-col space-y-0.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#10B981] shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold text-pearl">SMKN 26 JKT</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-fog truncate">Sistem Info & Aplikasi</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Crystal Canvas */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <Hero3D />
        </div>
      </div>
    </section>
  );
};
