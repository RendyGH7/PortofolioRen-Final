import React from 'react';
import { FolderGit2, Mail } from 'lucide-react';
import { Hero3D } from './Hero3D';

interface HeroProps {
  lang: 'id' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
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
        {/* Left Column: Typography & Intentional Persona Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 z-10">
          {/* Headline in Montserrat */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-pearl tracking-tight leading-[1.05]">
              Rendy Fernando <br />
              <span className="font-light text-champagne">Tambunan</span>
            </h1>
            <p className="text-base sm:text-lg font-medium text-sapphire tracking-normal">
              Full Stack Developer
            </p>
          </div>

          {/* Subtitle adhering strictly to design.md word budget (under 12 words) */}
          <p className="text-mist text-sm sm:text-base max-w-xl leading-relaxed">
            {lang === 'id'
              ? 'Membangun aplikasi web performa tinggi dengan arsitektur bersih dan presisi visual.'
              : 'Engineering high-performance web applications with clean architecture and visual precision.'}
          </p>

          {/* Persona Pathways & Interactive Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Primary Action: Karya Pilihan */}
            <button
              onClick={() => scrollTo('work')}
              className="btn-champagne px-5 py-3 rounded-md text-sm font-semibold flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <FolderGit2 className="w-4 h-4 text-midnight-0" />
              <span>{lang === 'id' ? 'Lihat Karya' : 'View Work'}</span>
            </button>

            {/* Direct Contact */}
            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-3 rounded-md glass-2 hover:border-champagne/40 text-sm font-medium text-pearl transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
            >
              <Mail className="w-4 h-4 text-champagne" />
              <span>{lang === 'id' ? 'Hubungi' : 'Contact'}</span>
            </button>
          </div>

          {/* Quick Real Fact Credentials from CV */}
          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/5 max-w-md">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold text-pearl">1.000+ Ulasan</span>
              <span className="text-[11px] text-fog">RenStore Zeusx Platform</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold text-pearl">SMKN 26 Jakarta</span>
              <span className="text-[11px] text-fog">Sistem Informasi & Aplikasi</span>
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
