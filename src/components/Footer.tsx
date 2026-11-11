import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { smoothScrollTo } from '../utils/scrollLock';
import { GithubIcon, LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface FooterProps {
  onOpenTerminal?: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WIB'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo('hero', 0);
  };

  const scrollTo = (id: string) => {
    smoothScrollTo(id, 80);
  };

  return (
    <footer className="w-full bg-midnight-0/60 border-t border-white/[0.06] pt-12 pb-28 sm:pb-14 px-4 sm:px-6 lg:px-8 mt-24 relative z-20 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Main Architectural Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-white/10 bg-white/[0.03] shrink-0">
              <img
                src="/assets/brand/logo.png"
                alt="Logo Rendy Fernando"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-display text-base font-semibold text-pearl block leading-tight">
                {PERSONAL_DATA.name}
              </span>
              <span className="text-xs text-fog block mt-0.5 font-sans">
                Full Stack Developer • Jakarta, Indonesia
              </span>
            </div>
          </div>

          {/* Center: Quiet Regional Presence (Clean, no tacky capsule/pulse slop) */}
          <div className="flex items-center gap-2 text-xs font-sans text-fog">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" />
            <span className="text-mist font-medium">Jakarta, ID</span>
            <span className="text-white/20">·</span>
            <span className="tabular-nums text-fog font-mono text-[11px]">{time || 'WIB'}</span>
          </div>

          {/* Social Channels: Uniform, Minimalist Frosted Glass Circles */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-champagne/40 text-mist hover:text-pearl flex items-center justify-center transition-all duration-200"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-champagne/40 text-mist hover:text-pearl flex items-center justify-center transition-all duration-200"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_DATA.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-champagne/40 text-mist hover:text-pearl flex items-center justify-center transition-all duration-200"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_DATA.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-champagne/40 text-mist hover:text-pearl flex items-center justify-center transition-all duration-200"
              title="TikTok"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Minimalist Sub-Bar: Quick Nav & Copyright & Back to Top */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-fog">
          {/* Quick Nav Links (Clean Sans-Serif, Proper Spacing) */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer Navigation">
            <button
              onClick={() => scrollTo('bento')}
              className="text-mist hover:text-champagne transition-colors"
            >
              Profil
            </button>
            <button
              onClick={() => scrollTo('work')}
              className="text-mist hover:text-champagne transition-colors"
            >
              Karya
            </button>
            <button
              onClick={() => scrollTo('studio')}
              className="text-mist hover:text-champagne transition-colors"
            >
              Studio
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="text-mist hover:text-champagne transition-colors"
            >
              Pengalaman
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-mist hover:text-champagne transition-colors"
            >
              Kontak
            </button>
          </nav>

          {/* Copyright & Back to Top (with right padding so it avoids the floating chat widget) */}
          <div className="flex items-center gap-5 sm:pr-28">
            <span className="text-[11px] text-fog/75 font-sans">
              © {CURRENT_YEAR} Rendy Fernando Tambunan
            </span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-mist hover:text-champagne transition-colors group font-sans"
              aria-label="Kembali ke atas"
            >
              <span>Atas</span>
              <ArrowUp className="w-3.5 h-3.5 text-champagne transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
