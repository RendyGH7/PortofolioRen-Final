import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface FooterProps {
  onOpenTerminal?: () => void;
}

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
          second: '2-digit',
        }) + ' WIB'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <footer className="w-full bg-midnight-1/90 border-t border-white/[0.08] pt-12 pb-24 sm:pb-16 px-4 sm:px-6 lg:px-8 mt-20 relative z-20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Main Architectural Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-white/10 bg-midnight-2/90 shadow-glass-sm shrink-0">
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
              <span className="text-xs text-fog block mt-0.5">
                Full Stack Developer • Jakarta, Indonesia
              </span>
            </div>
          </div>

          {/* Center: Live WIB Clock Badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-mist bg-white/[0.02] border border-white/[0.08] px-3.5 py-1.5 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span>Jakarta (WIB)</span>
            <span className="text-white/20">•</span>
            <span className="tabular-nums text-pearl font-medium">{time || 'Live WIB'}</span>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-1 hover:border-champagne/40 text-mist hover:text-pearl transition-all"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-1 hover:border-sapphire/40 text-mist hover:text-pearl transition-all"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_DATA.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-1 hover:border-champagne/40 text-mist hover:text-pearl transition-all"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_DATA.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-1 hover:border-petrol/40 text-mist hover:text-pearl transition-all"
              title="TikTok"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Minimalist Sub-Bar: Quick Nav & Copyright & Back to Top */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-fog">
          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              onClick={() => scrollTo('bento')}
              className="hover:text-champagne transition-colors"
            >
              Profil
            </button>
            <button
              onClick={() => scrollTo('work')}
              className="hover:text-champagne transition-colors"
            >
              Karya
            </button>
            <button
              onClick={() => scrollTo('studio')}
              className="hover:text-champagne transition-colors"
            >
              Studio
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="hover:text-champagne transition-colors"
            >
              Pengalaman
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-champagne transition-colors"
            >
              Kontak
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-fog/80">
              © {new Date().getFullYear()} Rendy Fernando Tambunan
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-mist hover:text-pearl transition-colors group ml-2"
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
