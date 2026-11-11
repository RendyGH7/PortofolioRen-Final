import { useState, useEffect, Suspense, lazy } from 'react';
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
import { ScrollFadeSection } from './components/ScrollFadeSection';
import { lockScroll, unlockScroll, forceUnlockScroll } from './utils/scrollLock';

// Dynamically code-split auxiliary tools & preloader so mobile loads instantly (<150ms)
const AskRendyAI = lazy(() => import('./components/AskRendyAI').then((m) => ({ default: m.AskRendyAI })));
const CommandPalette = lazy(() => import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette })));
const TerminalEasterEgg = lazy(() => import('./components/TerminalEasterEgg').then((m) => ({ default: m.TerminalEasterEgg })));
const CosmicPreloader = lazy(() => import('./components/CosmicPreloader').then((m) => ({ default: m.CosmicPreloader })));

const checkIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export function App() {
  const isMobile = checkIsMobile();
  // On mobile: Zero waiting, zero blocking canvas. Page renders INSTANTLY on first paint.
  // On desktop: Play cinematic cosmic preloader.
  const [isLoading, setIsLoading] = useState(!isMobile);
  const [contentVisible, setContentVisible] = useState(isMobile);
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

    // Safety timer: Ensure scroll lock is released and content is 100% visible
    if (!isMobile) {
      const failsafe = setTimeout(() => {
        setIsLoading(false);
        setContentVisible(true);
        forceUnlockScroll();
      }, 1800);
      return () => clearTimeout(failsafe);
    } else {
      forceUnlockScroll();
    }
  }, [isMobile]);

  // Safe reference-counted scroll lock for modals (never traps mobile users)
  useEffect(() => {
    if (isLoading || isAnyModalOpen) {
      lockScroll();
      return () => {
        unlockScroll();
      };
    }
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
    forceUnlockScroll();
    // Slight delay so the preloader exit animation finishes before content fades in
    setTimeout(() => setContentVisible(true), 80);
  };

  return (
    <div className="relative min-h-screen bg-midnight-0 text-pearl font-sans selection:bg-champagne/25 selection:text-pearl overflow-x-hidden">
      {/* Cosmic Entrance Preloader (Desktop Only - Mobile skips directly for instantaneous load) */}
      <AnimatePresence>
        {isLoading && !isMobile && (
          <Suspense fallback={null}>
            <CosmicPreloader
              onComplete={handleLoadingComplete}
              lang={lang}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Main site content — fades + rises in after preloader */}
      <motion.div
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: isMobile ? 0.2 : 0.85, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Main Content Sections with Butter-Smooth Hardware-Accelerated Reveal */}
        <main className="relative z-10 space-y-6 sm:space-y-10">
          <ScrollFadeSection isHero>
            <Hero lang={lang} />
          </ScrollFadeSection>

          <ScrollFadeSection>
            <BentoGrid lang={lang} />
          </ScrollFadeSection>

          <ScrollFadeSection>
            <ProjectsSection lang={lang} onModalOpenChange={setIsProjectModalOpen} />
          </ScrollFadeSection>

          <ScrollFadeSection>
            <DevStudioSection lang={lang} />
          </ScrollFadeSection>

          <ScrollFadeSection>
            <ExperienceTimeline lang={lang} />
          </ScrollFadeSection>

          <ScrollFadeSection>
            <ContactSection lang={lang} />
          </ScrollFadeSection>
        </main>

        {/* Deep Navy Glass Footer */}
        <ScrollFadeSection isFooter>
          <Footer onOpenTerminal={() => setTerminalOpen(true)} />
        </ScrollFadeSection>

        {/* Auxiliary Modals & AI Chat (Streamed asynchronously) */}
        <Suspense fallback={null}>
          <AskRendyAI isModalOpen={isAnyModalOpen} />

          {commandPaletteOpen && (
            <CommandPalette
              isOpen={commandPaletteOpen}
              onClose={() => setCommandPaletteOpen(false)}
              onOpenTerminal={() => setTerminalOpen(true)}
            />
          )}

          {terminalOpen && (
            <TerminalEasterEgg
              isOpen={terminalOpen}
              onClose={() => setTerminalOpen(false)}
            />
          )}
        </Suspense>
      </motion.div>
    </div>
  );
}

export default App;
