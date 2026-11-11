import { useState, useEffect, Suspense, lazy } from 'react';
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

// Dynamically code-split auxiliary tools so initial page load is instantaneous (<100ms)
const AskRendyAI = lazy(() => import('./components/AskRendyAI').then((m) => ({ default: m.AskRendyAI })));
const CommandPalette = lazy(() => import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette })));
const TerminalEasterEgg = lazy(() => import('./components/TerminalEasterEgg').then((m) => ({ default: m.TerminalEasterEgg })));

export function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const isAnyModalOpen = commandPaletteOpen || terminalOpen || isProjectModalOpen;

  // Always start at top and ensure scroll lock is released on initial paint
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    forceUnlockScroll();
  }, []);

  // Safe reference-counted scroll lock ONLY for active user-opened modals
  useEffect(() => {
    if (isAnyModalOpen) {
      lockScroll();
      return () => {
        unlockScroll();
      };
    }
  }, [isAnyModalOpen]);

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

  return (
    <div className="relative min-h-screen bg-midnight-0 text-pearl font-sans selection:bg-champagne/25 selection:text-pearl overflow-x-hidden">
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
    </div>
  );
}
