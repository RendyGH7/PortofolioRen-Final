import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { PERSONAL_DATA, PROJECTS, HARD_SKILLS } from '../data/portfolioData';

interface TerminalEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalEasterEgg: React.FC<TerminalEasterEggProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-mist">
          <p className="text-champagne font-bold">Rendy Fernando Tambunan • Interactive Shell v1.2</p>
          <p className="text-fog text-[11px]">Ketik <span className="text-pearl font-mono">help</span> untuk melihat daftar perintah yang tersedia.</p>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, logs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let result: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        result = (
          <div className="space-y-1 text-[11px] text-mist">
            <p><span className="text-champagne font-mono w-24 inline-block">whoami</span> : Ringkasan identitas dan bio Rendy</p>
            <p><span className="text-champagne font-mono w-24 inline-block">skills</span> : Daftar stack teknologi dan level keahlian</p>
            <p><span className="text-champagne font-mono w-24 inline-block">projects</span> : Karya pilihan (Monetra, RenStore, TSDN)</p>
            <p><span className="text-champagne font-mono w-24 inline-block">contact</span> : Detail email, WhatsApp, dan tautan sosial</p>
            <p><span className="text-champagne font-mono w-24 inline-block">clear</span> : Bersihkan log riwayat terminal</p>
            <p><span className="text-champagne font-mono w-24 inline-block">exit</span> : Tutup mode terminal ini</p>
          </div>
        );
        break;

      case 'whoami':
        result = (
          <div className="text-[11px] text-mist space-y-1">
            <p className="text-pearl font-semibold">{PERSONAL_DATA.name} ({PERSONAL_DATA.role})</p>
            <p>Edukasi: {PERSONAL_DATA.education.school} • {PERSONAL_DATA.education.major} (2023 - 2027)</p>
            <p>Lokasi: {PERSONAL_DATA.location} • Status: {PERSONAL_DATA.status.text}</p>
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="text-[11px] text-mist grid grid-cols-2 gap-1 pt-1">
            {HARD_SKILLS.map((s) => (
              <span key={s.name}>
                <span className="text-pearl font-mono">{s.name}</span>: <span className="text-champagne">{s.level}%</span>
              </span>
            ))}
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="text-[11px] text-mist space-y-2 pt-1">
            {PROJECTS.map((p) => (
              <div key={p.id}>
                <span className="text-champagne font-semibold font-mono">{p.title}</span> ({p.category})
                <p className="text-fog">{p.summary}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="text-[11px] text-mist space-y-1">
            <p>Email: <a href={`mailto:${PERSONAL_DATA.email}`} className="text-champagne underline">{PERSONAL_DATA.email}</a></p>
            <p>WhatsApp: {PERSONAL_DATA.phone}</p>
            <p>GitHub: <a href={PERSONAL_DATA.socials.github} target="_blank" rel="noreferrer" className="text-sapphire underline">github.com/RendyGH7</a></p>
            <p>LinkedIn: <a href={PERSONAL_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="text-sapphire underline">linkedin.com/in/rendy-fernando</a></p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      default:
        result = (
          <p className="text-status-error text-[11px]">
            Perintah tidak dikenal: &apos;{trimmed}&apos;. Ketik <span className="text-champagne font-mono">help</span> untuk bantuan.
          </p>
        );
        break;
    }

    setLogs((prev) => [...prev, { command: cmd, output: result }]);
    setInputVal('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="terminal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-0/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="terminal-dialog"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl h-[460px] glass-3 rounded-2xl shadow-glass-lg border border-white/15 flex flex-col overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-midnight-1/90 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-status-error/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-status-warning/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-status-success/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-mist ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-champagne" />
              <span>rendy@portfolio-system:~ (zsh)</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-fog hover:text-pearl transition-colors"
            aria-label="Tutup Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 bg-midnight-0/95">
          {logs.map((log, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-pearl">
                <span className="text-champagne">❯</span>
                <span className="text-fog">~</span>
                <span className="font-semibold">{log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputVal.trim()) handleCommand(inputVal);
            }}
            className="flex items-center gap-2 text-pearl pt-1"
          >
            <span className="text-champagne">❯</span>
            <span className="text-fog">~</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent text-xs text-pearl focus:outline-none caret-champagne"
              placeholder="ketik help..."
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
};
