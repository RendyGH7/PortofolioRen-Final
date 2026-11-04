import { useState, useEffect } from 'react';
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

export function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

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
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4">
        {/* Hero Section with Interactive 3D WebGL Crystal */}
        <Hero lang={lang} />

        {/* Bento Grid: Verified Metrics, Photo, Live Jakarta Clock, Tech Stack */}
        <BentoGrid lang={lang} />

        {/* Selected Work: Filterable, Case Study Modal, Architecture & Code Tabs */}
        <ProjectsSection lang={lang} />

        {/* Dev Studio & Sandbox: Live REST API Client, SQL Query Runner, Glass UI Physics Lab */}
        <DevStudioSection lang={lang} />

        {/* Experience & Awards: SMKN 26, PT Sollu, RenStore, TSDN Top 7 */}
        <ExperienceTimeline lang={lang} />

        {/* Contact Section: 3-Field Clean Form & Direct Channels */}
        <ContactSection lang={lang} />
      </main>

      {/* Deep Navy Glass Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Floating Ask Rendy AI Chat Assistant */}
      <AskRendyAI />

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
    </div>
  );
}

export default App;
