import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Mail,
  ArrowUpRight,
} from 'lucide-react';
import { smoothScrollTo } from '../utils/scrollLock';
import { ProjectEstimator } from './ProjectEstimator';

interface HeroProps {
  lang: 'id' | 'en';
}

const ROLES_ID = [
  'Full Stack Web Developer',
  'Frontend Specialist & UI/UX',
  'Web Developer @ PT Sistegra Emran Sentosa',
  'Founder of RenStore Platform (1.000+ Reviews)',
  'Grand Finalis Sains Data Nasional (TSDN)',
  'Cloud Computing Mentor',
];

const ROLES_EN = [
  'Full Stack Web Developer',
  'Frontend Specialist & UI/UX',
  'Web Developer @ PT Sistegra Emran Sentosa',
  'Founder of RenStore Platform (1.000+ Reviews)',
  'National Data Science Grand Finalist',
  'Cloud Computing Mentor',
];

// Isolated Typewriter Micro-Component: Prevents continuous Hero tree re-rendering
const TypewriterText: React.FC<{ lang: 'id' | 'en' }> = ({ lang }) => {
  const roles = lang === 'id' ? ROLES_ID : ROLES_EN;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <div className="flex items-center gap-2 text-sm sm:text-xl font-mono min-h-[28px] sm:min-h-[32px] pt-1">
      <span className="text-champagne font-bold select-none">{'>_'}</span>
      <span className="text-pearl font-medium tracking-tight">
        {displayText}
      </span>
      <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-champagne ml-0.5 animate-pulse align-middle" />
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const scrollTo = (id: string) => {
    smoothScrollTo(id, 80);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-visible"
    >
      {/* Dynamic Ambient Hero Cosmic Haze (Hardware-friendly blur on mobile) */}
      <div className="absolute top-1/4 -left-28 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-sapphire/20 blur-md sm:blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute top-1/2 left-1/3 w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] rounded-full bg-champagne/15 blur-md sm:blur-[130px] pointer-events-none transform-gpu" />

      {/* Mobile Text Readability Soft Veil (Guarantees zero text interference from stars) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_35%_35%,rgba(10,16,32,0.80)_0%,rgba(10,16,32,0.40)_60%,transparent_85%)] sm:hidden z-0" />

      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        {/* Left Column: Typography, Dynamic Typewriter & Intentional Persona Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-5 sm:space-y-6 z-10">
          {/* Headline in Montserrat Display */}
          <div className="space-y-2.5 sm:space-y-3">
            <h1 className="font-display text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-bold text-pearl tracking-tight leading-[1.1] sm:leading-[1.08]">
              Rendy Fernando <br />
              <span className="bg-gradient-to-r from-[#F5B027] via-[#FFD369] to-[#D98218] bg-clip-text text-transparent font-light">
                Tambunan
              </span>
            </h1>

            {/* Smooth Typewriter Terminal Line with Zero Layout Shift */}
            <TypewriterText lang={lang} />
          </div>

          {/* Subtitle Statement */}
          <p className="text-mist text-xs sm:text-base max-w-xl leading-relaxed">
            {lang === 'id'
              ? 'Membangun aplikasi web performa tinggi dengan arsitektur bersih, keandalan sistem produksi, dan presisi antarmuka modern.'
              : 'Engineering high-performance web applications with clean architecture, production reliability, and modern UI precision.'}
          </p>

          {/* Persona Pathways & Interactive Action Buttons */}
          <div className="pt-1 sm:pt-2 flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3">
            {/* Primary Action: Karya Pilihan with Radiant Amber Solar Gradient */}
            <button
              onClick={() => scrollTo('work')}
              className="btn-champagne w-full xs:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 group transition-all duration-300 shadow-[0_0_20px_rgba(245,176,39,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <FolderGit2 className="w-4 h-4 text-midnight-0 transition-transform group-hover:scale-110" />
              <span>{lang === 'id' ? 'Eksplorasi Karya' : 'Explore Work'}</span>
              <ArrowUpRight className="w-4 h-4 text-midnight-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Direct Contact */}
            <button
              onClick={() => scrollTo('contact')}
              className="w-full xs:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl glass-2 hover:border-champagne/40 text-xs sm:text-sm font-medium text-pearl transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
            >
              <Mail className="w-4 h-4 text-champagne" />
              <span>{lang === 'id' ? 'Hubungi Langsung' : 'Get in Touch'}</span>
            </button>
          </div>

          {/* Proof-of-Scale Credentials Strip (Clean, Minimal, Architectural) */}
          <div className="pt-4 sm:pt-6 border-t border-white/[0.08] max-w-lg">
            <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
              {/* Pillar 1: Market Proof */}
              <div className="pr-1.5 sm:pr-4 group cursor-default min-w-0">
                <div className="font-display text-base xs:text-xl sm:text-2xl font-bold text-pearl tracking-tight tabular-nums truncate">
                  1.000<span className="text-champagne font-light">+</span>
                </div>
                <div className="text-[10px] xs:text-[11px] sm:text-xs text-mist group-hover:text-pearl transition-colors font-medium mt-0.5 sm:mt-1 leading-tight truncate">
                  {lang === 'id' ? 'Ulasan Positif' : 'Client Reviews'}
                </div>
                <div className="text-[9px] xs:text-[10px] sm:text-[11px] text-fog mt-0.5 leading-tight truncate">
                  Founder RenStore
                </div>
              </div>

              {/* Pillar 2: Engineering Output */}
              <div className="px-1.5 sm:px-4 group cursor-default min-w-0">
                <div className="font-display text-base xs:text-xl sm:text-2xl font-bold text-pearl tracking-tight tabular-nums truncate">
                  5<span className="text-champagne font-light">+</span>
                </div>
                <div className="text-[10px] xs:text-[11px] sm:text-xs text-mist group-hover:text-pearl transition-colors font-medium mt-0.5 sm:mt-1 leading-tight truncate">
                  {lang === 'id' ? 'Proyek Rilis' : 'Projects Shipped'}
                </div>
                <div className="text-[9px] xs:text-[10px] sm:text-[11px] text-fog mt-0.5 leading-tight truncate">
                  {lang === 'id' ? 'Web & Cloud System' : 'Web & Cloud'}
                </div>
              </div>

              {/* Pillar 3: Technical Validation */}
              <div className="pl-1.5 sm:pl-4 group cursor-default min-w-0">
                <div className="font-display text-base xs:text-xl sm:text-2xl font-bold text-pearl tracking-tight tabular-nums truncate">
                  Top 7
                </div>
                <div className="text-[10px] xs:text-[11px] sm:text-xs text-mist group-hover:text-pearl transition-colors font-medium mt-0.5 sm:mt-1 leading-tight truncate">
                  {lang === 'id' ? 'Finalis Nasional' : 'National Finalist'}
                </div>
                <div className="text-[9px] xs:text-[10px] sm:text-[11px] text-fog mt-0.5 leading-tight truncate">
                  {lang === 'id' ? 'Sains Data (TSDN)' : 'Data Science (TSDN)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Project Scope & Architecture Estimator */}
        <div className="lg:col-span-6 flex items-center justify-center relative w-full pt-4 lg:pt-0">
          <ProjectEstimator lang={lang} />
        </div>
      </div>
    </section>
  );
};
