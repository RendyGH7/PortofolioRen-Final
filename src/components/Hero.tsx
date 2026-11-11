import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  FolderGit2,
  Mail,
  ArrowUpRight,
} from 'lucide-react';
import { smoothScrollTo } from '../utils/scrollLock';

// Dynamically stream Three.js asynchronously so mobile initial load is instant (<200ms)
const Hero3D = lazy(() => import('./Hero3D').then((m) => ({ default: m.Hero3D })));

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
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop viewports: Only desktop loads and renders the heavy 3D Three.js planet.
  // Mobile iOS & Android remain 100% lightweight with zero 3D WebGL overhead.
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

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
    smoothScrollTo(id, 80);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-visible"
    >
      {/* Dynamic Ambient Hero Cosmic Haze */}
      <div className="absolute top-1/4 -left-28 w-[500px] h-[500px] rounded-full bg-sapphire/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-champagne/15 blur-[130px] pointer-events-none" />

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
            <div className="flex items-center gap-2 text-sm sm:text-xl font-mono min-h-[28px] sm:min-h-[32px] pt-1">
              <span className="text-champagne font-bold select-none">{'>_'}</span>
              <span className="text-pearl font-medium tracking-tight">
                {displayText}
              </span>
              <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-champagne ml-0.5 animate-pulse align-middle" />
            </div>
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
          <div className="pt-5 sm:pt-6 border-t border-white/[0.08] max-w-lg">
            <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
              {/* Pillar 1: Market Proof */}
              <div className="pr-2 sm:pr-4 group cursor-default">
                <div className="font-display text-lg xs:text-xl sm:text-2xl font-bold text-pearl tracking-tight tabular-nums">
                  1.000<span className="text-champagne font-light">+</span>
                </div>
                <div className="text-[11px] sm:text-xs text-mist group-hover:text-pearl transition-colors font-medium mt-1 leading-tight">
                  {lang === 'id' ? 'Ulasan Positif' : 'Client Reviews'}
                </div>
                <div className="text-[10px] sm:text-[11px] text-fog mt-0.5 leading-tight">
                  Founder RenStore
                </div>
              </div>

              {/* Pillar 2: Engineering Output */}
              <div className="px-2 sm:px-4 group cursor-default">
                <div className="font-display text-lg xs:text-xl sm:text-2xl font-bold text-pearl tracking-tight tabular-nums">
                  5<span className="text-champagne font-light">+</span>
                </div>
                <div className="text-[11px] sm:text-xs text-mist group-hover:text-pearl transition-colors font-medium mt-1 leading-tight">
                  {lang === 'id' ? 'Proyek Rilis' : 'Projects Shipped'}
                </div>
                <div className="text-[10px] sm:text-[11px] text-fog mt-0.5 leading-tight">
                  {lang === 'id' ? 'Web & Cloud System' : 'Web & Cloud'}
                </div>
              </div>

              {/* Pillar 3: Technical Validation */}
              <div className="pl-2 sm:pl-4 group cursor-default">
                <div className="font-display text-lg xs:text-xl sm:text-2xl font-bold text-pearl tracking-tight tabular-nums">
                  Top 7
                </div>
                <div className="text-[11px] sm:text-xs text-mist group-hover:text-pearl transition-colors font-medium mt-1 leading-tight">
                  {lang === 'id' ? 'Finalis Nasional' : 'National Finalist'}
                </div>
                <div className="text-[10px] sm:text-[11px] text-fog mt-0.5 leading-tight">
                  {lang === 'id' ? 'Sains Data (TSDN)' : 'Data Science (TSDN)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Exoplanet (Desktop Only: completely hidden & unmounted on Mobile iOS & Android for ultra-lightweight speed) */}
        {isDesktop && (
          <div className="hidden lg:flex lg:col-span-6 items-center justify-center relative overflow-visible min-h-[500px] lg:min-h-[560px]">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center relative pointer-events-none min-h-[500px]">
                  <div className="w-64 h-64 rounded-full bg-sapphire/20 blur-2xl animate-pulse" />
                </div>
              }
            >
              <Hero3D />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
};
