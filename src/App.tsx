import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { ProjectsSection } from './components/ProjectsSection';
import { DevStudioSection } from './components/DevStudioSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AskRendyAI } from './components/AskRendyAI';
import { CommandPalette } from './components/CommandPalette';
import { TerminalEasterEgg } from './components/TerminalEasterEgg';
import { CosmicPreloader } from './components/CosmicPreloader';
import { ScrollFadeSection } from './components/ScrollFadeSection';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [hasReachedFooter, setHasReachedFooter] = useState(false);
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const isAnyModalOpen = commandPaletteOpen || terminalOpen || isProjectModalOpen;

  // Always start at the top of the page on every load/refresh
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Monitor scroll to detect reaching bottom / footer
  useEffect(() => {
    if (hasReachedFooter) return;

    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      // Trigger when user scrolls within 120px of page bottom
      if (scrollBottom >= docHeight - 120) {
        setHasReachedFooter(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReachedFooter]);

  // Prevent background scroll when preloader or any modal/pop-up is active
  useEffect(() => {
    if (isLoading || isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading, isAnyModalOpen]);

  // Global keyboard shortcuts: Ctrl+K or Cmd+K for Command Palette, `~` for Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '`' || e.key === '~') {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setTerminalOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Slight delay so the preloader exit animation finishes before content fades in
    setTimeout(() => setContentVisible(true), 80);
  };

  return (
    <div className="relative min-h-screen bg-midnight-0 text-pearl font-sans selection:bg-champagne/25 selection:text-pearl overflow-x-hidden">
      {/* Cosmic Entrance Preloader */}
      <AnimatePresence>
        {isLoading && (
          <CosmicPreloader
            onComplete={handleLoadingComplete}
            lang={lang}
          />
        )}
      </AnimatePresence>

      {/* Main site content — fades + rises in after preloader */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle Ambient Background Mesh & Luxury Grain */}
        <AmbientBackground />

        {/* Floating Glass Navigation */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          lang={lang}
          onToggleLang={toggleLanguage}
          isModalOpen={isAnyModalOpen}
        />

        {/* Main Content Sections with Scroll Fade-In & Fade-Out */}
        <main className="relative z-10 space-y-6 sm:space-y-10">
          <ScrollFadeSection isHero disabled={hasReachedFooter}>
            <Hero lang={lang} />
          </ScrollFadeSection>

          <ScrollFadeSection disabled={hasReachedFooter}>
            <BentoGrid lang={lang} />
          </ScrollFadeSection>

          <ScrollFadeSection disabled={hasReachedFooter}>
            <ProjectsSection lang={lang} onModalOpenChange={setIsProjectModalOpen} />
          </ScrollFadeSection>

          <ScrollFadeSection disabled={hasReachedFooter}>
            <DevStudioSection lang={lang} />
          </ScrollFadeSection>

          <ScrollFadeSection disabled={hasReachedFooter}>
            <ExperienceTimeline lang={lang} />
          </ScrollFadeSection>

          <ScrollFadeSection disabled={hasReachedFooter}>
            <ContactSection lang={lang} />
          </ScrollFadeSection>
        </main>

        {/* Deep Navy Glass Footer: reaching footer permanently locks animations until refresh */}
        <ScrollFadeSection
          isFooter
          disabled={hasReachedFooter}
          onReachInView={() => setHasReachedFooter(true)}
        >
          <Footer onOpenTerminal={() => setTerminalOpen(true)} />
        </ScrollFadeSection>

        {/* Floating Ask Rendy AI Chat Assistant */}
        <AskRendyAI isModalOpen={isAnyModalOpen} />

        {/* Command Palette (Ctrl+K) */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Interactive Terminal Easter Egg (~) */}
        <TerminalEasterEgg
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />
      </motion.div>
    </div>
  );
}

export default App;
