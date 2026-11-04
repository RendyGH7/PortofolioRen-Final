import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Command } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  lang: 'id' | 'en';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  lang,
  onToggleLang,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'bento', 'work', 'studio', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'bento', label: lang === 'id' ? 'Profil' : 'Profile' },
    { id: 'work', label: lang === 'id' ? 'Karya' : 'Work' },
    { id: 'studio', label: lang === 'id' ? 'Studio' : 'Studio' },
    { id: 'experience', label: lang === 'id' ? 'Pengalaman' : 'Experience' },
    { id: 'contact', label: lang === 'id' ? 'Kontak' : 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pointer-events-none`}
      >
        <nav
          className={`pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled ? 'glass-2 shadow-glass-md' : 'glass-1'
          }`}
          aria-label="Navigasi Utama"
        >
          {/* Brand dengan Logo Kustom Baru */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire rounded-full"
            aria-label="Kembali ke atas"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm p-1 border border-white/10 group-hover:border-champagne/40 bg-midnight-2/90">
              <img
                src="/assets/brand/logo.png"
                alt="Logo Rendy Fernando"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-sm font-semibold text-pearl tracking-tight">
                Rendy Fernando
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-3 text-sm font-medium text-mist">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3.5 py-1.5 rounded-full transition-colors relative hover:text-pearl tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire ${
                    isActive ? 'text-pearl font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-champagne rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="px-3 py-1.5 rounded-full glass-1 hover:border-champagne/40 transition-colors text-xs font-medium text-mist hover:text-pearl flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
              aria-label={lang === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] uppercase tracking-wider">{lang}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full glass-1 text-mist hover:text-pearl focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Panel (Glass 3) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 md:hidden flex flex-col justify-between p-6 glass-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-white/10 bg-midnight-2/90">
                  <img
                    src="/assets/brand/logo.png"
                    alt="Logo Rendy Fernando"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-semibold text-pearl text-sm">{PERSONAL_DATA.name}</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full glass-1 text-mist hover:text-pearl"
                aria-label="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 py-6 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-lg font-medium px-4 py-2.5 rounded-xl transition-all ${
                    activeSection === item.id
                      ? 'text-champagne bg-champagne/10 border border-champagne/20 font-semibold'
                      : 'text-pearl/90 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-mist">
                <span className="w-2 h-2 rounded-full bg-status-success shadow-[0_0_8px_#00DC82]" />
                <span>{PERSONAL_DATA.status.text}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-2 text-xs text-pearl"
              >
                <Command className="w-3.5 h-3.5 text-champagne" />
                <span>Command Palette</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
