import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FolderGit2,
  User,
  Workflow,
  Briefcase,
  Mail,
  Copy,
  Terminal,
  ExternalLink,
  X,
} from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const scrollTo = (sectionId: string) => {
    onClose();
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} berhasil disalin!`);
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-bento',
      title: 'Profil & Kapabilitas (Bento Grid)',
      category: 'Navigasi',
      icon: <User className="w-4 h-4 text-sapphire" />,
      action: () => scrollTo('bento'),
    },
    {
      id: 'nav-work',
      title: 'Karya Pilihan (Selected Work)',
      category: 'Navigasi',
      icon: <FolderGit2 className="w-4 h-4 text-champagne" />,
      action: () => scrollTo('work'),
    },
    {
      id: 'nav-studio',
      title: 'Dev Studio & Sandbox (API, SQL, Glass Lab)',
      category: 'Navigasi',
      icon: <Workflow className="w-4 h-4 text-petrol" />,
      action: () => scrollTo('studio'),
    },
    {
      id: 'nav-experience',
      title: 'Pengalaman & Edukasi SMKN 26',
      category: 'Navigasi',
      icon: <Briefcase className="w-4 h-4 text-mist" />,
      action: () => scrollTo('experience'),
    },
    {
      id: 'nav-contact',
      title: 'Formulir Kontak Langsung',
      category: 'Navigasi',
      icon: <Mail className="w-4 h-4 text-pearl" />,
      action: () => scrollTo('contact'),
    },
    {
      id: 'act-email',
      title: `Salin Email (${PERSONAL_DATA.email})`,
      category: 'Aksi Cepat',
      icon: <Copy className="w-4 h-4 text-champagne" />,
      action: () => copyToClipboard(PERSONAL_DATA.email, 'Email Rendy'),
    },
    {
      id: 'act-terminal',
      title: 'Buka Developer Interactive Terminal',
      category: 'Easter Egg',
      icon: <Terminal className="w-4 h-4 text-sapphire" />,
      action: () => {
        onClose();
        onOpenTerminal();
      },
      shortcut: '~',
    },
    {
      id: 'link-monetra',
      title: 'Buka Web Monetra (monetra-apps.vercel.app)',
      category: 'Proyek Live',
      icon: <ExternalLink className="w-4 h-4 text-sapphire" />,
      action: () => window.open('https://monetra-apps.vercel.app/', '_blank'),
    },
    {
      id: 'link-renstore',
      title: 'Buka Web RenStore (renstore-project.vercel.app)',
      category: 'Proyek Live',
      icon: <ExternalLink className="w-4 h-4 text-champagne" />,
      action: () => window.open('https://renstore-project.vercel.app/', '_blank'),
    },
    {
      id: 'link-github',
      title: 'Buka Profil GitHub (RendyGH7)',
      category: 'Tautan Eksternal',
      icon: <GithubIcon className="w-4 h-4 text-mist" />,
      action: () => window.open(PERSONAL_DATA.socials.github, '_blank'),
    },
    {
      id: 'link-linkedin',
      title: 'Buka Profil LinkedIn (Rendy Fernando)',
      category: 'Tautan Eksternal',
      icon: <LinkedinIcon className="w-4 h-4 text-sapphire" />,
      action: () => window.open(PERSONAL_DATA.socials.linkedin, '_blank'),
    },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="command-palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-midnight-0/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="command-palette-panel"
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl glass-3 rounded-2xl p-4 shadow-glass-lg border border-white/15 text-left space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Search Bar */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-midnight-0/70 border border-white/10">
          <Search className="w-4 h-4 text-fog shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Cari navigasi, proyek, aksi, atau ketik perintah..."
            className="w-full bg-transparent text-xs text-pearl placeholder:text-fog focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-fog hover:text-pearl"
            aria-label="Tutup Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toast alert if active */}
        {toastMessage && (
          <div className="px-3 py-2 rounded-lg bg-[#064E3B]/85 border border-[#10B981]/60 text-[#6EE7B7] text-xs font-semibold flex items-center gap-2 shadow-sm">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Results Stream */}
        <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-fog">
              Tidak ada perintah yang sesuai.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-sapphire/20 border border-sapphire/40 text-pearl'
                      : 'text-mist hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="text-xs font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-fog uppercase">
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-pearl">
                        {item.shortcut}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-fog font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigasi</span>
            <span>↵ Pilih</span>
            <span>Esc Tutup</span>
          </div>
          <span>Rendy Fernando Tambunan</span>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
};
