import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareCode, X, Send, Bot, ArrowUpRight } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  link?: { text: string; sectionId: string };
}

interface AskRendyAIProps {
  isModalOpen?: boolean;
}

export const AskRendyAI: React.FC<AskRendyAIProps> = ({ isModalOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Halo! Saya asisten portofolio Rendy. Tanyakan tentang pengalaman teknis, proyek unggulan, atau ketersediaan kolaborasi.',
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const quickQuestions = [
    'Apa proyek unggulan Rendy?',
    'Bagaimana pencapaian RenStore?',
    'Apakah Rendy menerima proyek freelance?',
    'Riwayat pendidikan dan sertifikasi?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAnswer = (query: string): { text: string; link?: { text: string; sectionId: string } } => {
    const q = query.toLowerCase();

    if (q.includes('warisara') || q.includes('budaya') || q.includes('nusantara') || q.includes('batik')) {
      return {
        text: 'WariSara (Gerbang Warisan Budaya Nusantara) adalah ekosistem arsip kebudayaan hidup yang mencakup 38 provinsi di Indonesia dengan peta vektor interaktif, Creative Lab Studio 2.0 (generator motif batik parametrik & kanvas canting digital), buku cerita pusaka lisan 3D, dan direktori ekonomi kreatif perajin lokal (Zero-Dependency Architecture). Proyek ini dirancang untuk kompetisi TECHTOPIA Vol. 2 (INTEGER#8) tema PUSAKA.',
        link: { text: 'Lihat Detail WariSara di Portofolio', sectionId: 'work' },
      };
    }

    if (q.includes('monetra')) {
      return {
        text: 'Monetra adalah asisten keuangan pribadi cerdas bertenaga Google Gemini 2.5 Flash dan Web Audio DSP 4-tahap (Voice-to-Transaction), dilengkapi evaluasi Aturan 50/30/20, Dynamic Daily Safe Spend, serta keamanan penuh PostgreSQL Row Level Security (RLS) di Supabase. Web app ini sudah live di https://monetra-apps.vercel.app/.',
        link: { text: 'Lihat Detail Monetra di Portofolio', sectionId: 'work' },
      };
    }

    if (q.includes('proyek') || q.includes('project') || q.includes('karya')) {
      return {
        text: 'Rendy memiliki 3 proyek unggulan dengan domain keahlian yang beragam: 1) WariSara (Living Cultural Archive 38 Provinsi & Creative Lab Studio 2.0), 2) RenStore (Modern Full-Stack E-Commerce Laravel 11 + React 19 dengan 1.000+ ulasan internasional), dan 3) Monetra (AI Personal Finance Assistant & Voice DSP Gemini 2.5). Rendy juga merupakan Grand Finalis Top 7 Turnamen Sains Data Nasional (TSDN).',
        link: { text: 'Buka Bagian Karya', sectionId: 'work' },
      };
    }

    if (q.includes('renstore') || q.includes('zeusx') || q.includes('ulasan') || q.includes('review')) {
      return {
        text: 'Rendy adalah Founder RenStore yang melayani transaksi produk digital di platform internasional Zeusx dengan akumulasi lebih dari 1.000 ulasan positif terverifikasi.',
        link: { text: 'Lihat Detail RenStore', sectionId: 'work' },
      };
    }

    if (q.includes('freelance') || q.includes('hire') || q.includes('kontak') || q.includes('proyek') || q.includes('tersedia')) {
      return {
        text: 'Rendy saat ini berstatus tersedia untuk proyek freelance, kontrak, dan kolaborasi pengembangan aplikasi web full stack. Anda dapat mengirim pesan langsung lewat formulir kontak.',
        link: { text: 'Buka Formulir Kontak', sectionId: 'contact' },
      };
    }

    if (q.includes('sekolah') || q.includes('edukasi') || q.includes('smk') || q.includes('pendidikan') || q.includes('sertifikasi')) {
      return {
        text: 'Rendy bersekolah di SMK Negeri 26 Jakarta jurusan Sistem Informasi Jaringan dan Aplikasi (SIJA, 2023 - 2027) dan juga membina 40+ siswa sebagai Cloud Computing Mentor di IT Club sekolah.',
        link: { text: 'Lihat Detail Edukasi', sectionId: 'experience' },
      };
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('teknologi') || q.includes('bahasa') || q.includes('laravel') || q.includes('python') || q.includes('database')) {
      return {
        text: 'Stack teknologi utama Rendy: React & TypeScript, Tailwind CSS, Laravel (80%), Database (PostgreSQL & MySQL), Python, Node.js, PHP, dan Cloud/Linux infrastructure.',
        link: { text: 'Lihat Visual Tech Stack', sectionId: 'bento' },
      };
    }

    if (q.includes('tsdn') || q.includes('prestasi') || q.includes('award') || q.includes('lomba')) {
      return {
        text: 'Prestasi nasional Rendy antara lain: Grand Finalis (Top 7) Turnamen Sains Data Nasional 2024 oleh Data Academy, AI Upskilling RSA, dan sertifikasi React Redux Skilvul.',
        link: { text: 'Lihat Penghargaan', sectionId: 'experience' },
      };
    }

    return {
      text: 'Rendy Fernando Tambunan adalah Full Stack Developer berbasis di Jakarta Timur yang menguasai React, TypeScript, dan arsitektur backend. Anda dapat langsung mengontaknya via WhatsApp atau email.',
      link: { text: 'Hubungi Rendy Langsung', sectionId: 'contact' },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const q = textToSend || inputQuery.trim();
    if (!q) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateAnswer(q);
      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: resp.text,
        link: resp.link,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const scrollTo = (sectionId: string) => {
    setIsOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const targetPosition = elRect - bodyRect - navOffset;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-300 ease-out ${
          isModalOpen
            ? 'opacity-0 translate-y-12 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative p-2.5 sm:px-4 sm:py-3 rounded-full glass-2 hover:border-champagne/60 shadow-glass-md flex items-center gap-2 text-pearl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          aria-label={isOpen ? 'Tutup Asisten Tanya Rendy' : 'Buka Asisten Tanya Rendy'}
        >
          <div className="w-8 h-8 rounded-full bg-sapphire/20 border border-sapphire/40 flex items-center justify-center text-champagne">
            <MessageSquareCode className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-pearl">
            Tanya Rendy
          </span>
          <span className="w-2 h-2 rounded-full bg-champagne" />
        </button>
      </div>

      {/* Floating Chat Panel (Glass 3) with buttery spring animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ask-rendy-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 18 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-96 max-h-[75vh] sm:max-h-[520px] h-[460px] sm:h-[500px] glass-3 rounded-2xl shadow-glass-lg flex flex-col justify-between p-3.5 sm:p-4 border border-white/15"
          >
          {/* Header dengan Logo Kustom Baru */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center p-0.5 border border-white/10 bg-midnight-2/90">
                <img
                  src="/assets/brand/logo.png"
                  alt="Logo Rendy Fernando"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-pearl block leading-none">
                  Tanya Rendy AI
                </span>

              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full glass-1 text-mist hover:text-pearl"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-left">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 text-xs leading-relaxed ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-sapphire/20 border border-sapphire/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-sapphire" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#F5B027] to-[#D98218] text-midnight-0 font-medium rounded-tr-xs shadow-[0_0_12px_rgba(245,176,39,0.25)]'
                      : 'glass-1 text-mist rounded-tl-xs border border-white/5'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.link && (
                    <button
                      onClick={() => scrollTo(msg.link!.sectionId)}
                      className="mt-2 text-[11px] text-champagne font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>{msg.link.text}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 text-xs text-fog items-center">
                <div className="w-6 h-6 rounded-full bg-sapphire/20 flex items-center justify-center">
                  <Bot className="w-3 h-3 text-sapphire" />
                </div>
                <div className="glass-1 px-3 py-1.5 rounded-full text-[11px] animate-pulse">
                  Mencari data portofolio...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-t border-white/5">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="shrink-0 text-[10px] px-2.5 py-1 rounded-full glass-1 text-mist hover:text-pearl hover:border-champagne/30 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5 pt-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Tanyakan sesuatu..."
              className="flex-1 bg-midnight-0/90 border border-white/10 rounded-full px-3.5 py-2 text-xs text-pearl focus:outline-none focus:border-champagne/60"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2 rounded-full btn-champagne disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Kirim pertanyaan"
            >
              <Send className="w-3.5 h-3.5 text-midnight-0" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
