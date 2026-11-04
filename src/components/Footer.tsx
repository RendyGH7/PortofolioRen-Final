import React from 'react';
import { ArrowUp, Terminal, MapPin } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
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
    <footer className="w-full bg-midnight-1/95 border-t border-white/10 pt-16 pb-28 sm:pb-20 px-4 sm:px-6 lg:px-8 mt-24 relative z-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Section: Brand + Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-white/10 bg-midnight-2/90 shadow-sm">
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
                  Full Stack Developer • SMKN 26 Jakarta
                </span>
              </div>
            </div>

            <p className="text-xs text-mist leading-relaxed max-w-sm">
              Membangun aplikasi web performa tinggi dengan arsitektur bersih, presisi antarmuka modern, dan pengalaman pengguna interaktif.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-mist">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse inline-block shadow-[0_0_8px_#00DC82]" />
              <span>Tersedia untuk proyek inovatif & kolaborasi</span>
            </div>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-fog block">Navigasi</span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('bento')}
                  className="text-mist hover:text-champagne transition-colors"
                >
                  Profil
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('work')}
                  className="text-mist hover:text-champagne transition-colors"
                >
                  Karya Pilihan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('studio')}
                  className="text-mist hover:text-champagne transition-colors"
                >
                  Dev Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('experience')}
                  className="text-mist hover:text-champagne transition-colors"
                >
                  Pengalaman
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-mist hover:text-champagne transition-colors"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Projects Live (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-fog block">Proyek Live</span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://renstore-project.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist hover:text-champagne transition-colors flex items-center gap-1"
                >
                  <span>RenStore</span>
                  <span className="text-champagne text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://monetra-apps.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist hover:text-sapphire transition-colors flex items-center gap-1"
                >
                  <span>Monetra</span>
                  <span className="text-sapphire text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist hover:text-pearl transition-colors flex items-center gap-1"
                >
                  <span>Open Source</span>
                  <span className="text-fog text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-fog block">Terhubung</span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={PERSONAL_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-1 hover:border-champagne/40 text-mist hover:text-pearl transition-all"
                aria-label="GitHub Rendy"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-1 hover:border-sapphire/40 text-mist hover:text-pearl transition-all"
                aria-label="LinkedIn Rendy"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-1 hover:border-champagne/40 text-mist hover:text-pearl transition-all"
                aria-label="Instagram Rendy"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_DATA.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-1 hover:border-petrol/40 text-mist hover:text-pearl transition-all"
                aria-label="TikTok Rendy"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenTerminal}
                className="px-3 py-2 rounded-xl glass-1 hover:border-champagne/40 text-xs font-mono text-fog hover:text-pearl transition-all flex items-center gap-1.5"
                title="Ketik ~ atau klik untuk terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-champagne" />
                <span>CLI (~)</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-fog font-mono flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-champagne" />
              <span>Jakarta Timur, Indonesia (WIB)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean Status & Back to Top */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3 text-xs text-fog font-mono">
            <span>Rendy Fernando Tambunan</span>
            <span>•</span>
            <span>Midnight Glass Edition</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-1 hover:border-champagne/40 text-xs font-medium text-mist hover:text-pearl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            aria-label="Kembali ke atas"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-champagne" />
          </button>
        </div>
      </div>
    </footer>
  );
};
