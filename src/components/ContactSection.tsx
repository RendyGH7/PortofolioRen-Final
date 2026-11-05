import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Briefcase,
  Layers,
  MessageSquare,
  FileText,
  RotateCcw,
  Loader2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface ContactSectionProps {
  lang: 'id' | 'en';
}

interface CategoryOption {
  id: string;
  labelId: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryOption[] = [
  { id: 'web-app', labelId: 'Web & App', labelEn: 'Web & App', icon: Code2 },
  { id: 'recruitment', labelId: 'Rekrutmen', labelEn: 'Recruitment', icon: Briefcase },
  { id: 'consulting', labelId: 'Konsultasi', labelEn: 'Consulting', icon: Layers },
  { id: 'general', labelId: 'Kolaborasi', labelEn: 'Collaboration', icon: MessageSquare },
];

const BUDGET_OPTIONS = [
  { id: 'discuss', labelId: 'Fleksibel', labelEn: 'Flexible' },
  { id: 'tier1', labelId: '< Rp 5 Juta', labelEn: '< $350' },
  { id: 'tier2', labelId: 'Rp 5 - 15 Jt', labelEn: '$350 - $1K' },
  { id: 'tier3', labelId: '> Rp 15 Juta', labelEn: '> $1K' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('web-app');
  const [selectedBudget, setSelectedBudget] = useState<string>('discuss');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<string>('');
  const [submissionTime, setSubmissionTime] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState(false);

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  const activeBudget = BUDGET_OPTIONS.find((b) => b.id === selectedBudget) || BUDGET_OPTIONS[0];

  const categoryLabel = lang === 'id' ? activeCategory.labelId : activeCategory.labelEn;
  const budgetLabel = lang === 'id' ? activeBudget.labelId : activeBudget.labelEn;

  const getFormattedBlueprint = useCallback(() => {
    const timeStr = submissionTime || (lang === 'id' ? 'Format Resmi Portofolio' : 'Official Portfolio Dispatch');

    return `Kepada: Rendy Fernando Tambunan (Full Stack Developer)
Email Tujuan: ${PERSONAL_DATA.email}
----------------------------------------------------------------------
SURAT INQUIRY & PENAWARAN KERJASAMA
----------------------------------------------------------------------

1. DATA PENGIRIM:
   • Nama Lengkap / Perusahaan : ${name.trim() || '[Nama Pengirim / Perusahaan]'}
   • Alamat Email Kontak       : ${email.trim() || '[email@domain.com]'}
   • Kategori Kebutuhan        : ${categoryLabel}
   • Estimasi Anggaran / Skala : ${budgetLabel}
   • Waktu Pengiriman          : ${timeStr}

2. RINCIAN SPESIFIKASI & KEBUTUHAN:
${message.trim() || '[Tuliskan rincian kebutuhan atau tawaran proyek di formulir...]'}

----------------------------------------------------------------------
Pesan ini dikirim secara resmi melalui formulir kontak portofolio Rendy Fernando Tambunan.
https://github.com/RendyGH7
----------------------------------------------------------------------`;
  }, [submissionTime, lang, name, email, categoryLabel, budgetLabel, message]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = lang === 'id' ? 'Nama lengkap atau instansi wajib diisi.' : 'Full name or company is required.';
    }
    if (!email.trim()) {
      errs.email = lang === 'id' ? 'Alamat email kontak wajib diisi.' : 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = lang === 'id' ? 'Format email tidak valid (contoh: nama@domain.com).' : 'Please enter a valid email address.';
    }
    if (!message.trim()) {
      errs.message = lang === 'id' ? 'Rincian pesan belum diisi.' : 'Project message is required.';
    } else if (message.trim().length < 15) {
      errs.message = lang === 'id' ? 'Tuliskan minimal 15 karakter agar pesan lebih jelas.' : 'Please enter at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const now = new Date();
    const timeFormatted = now.toLocaleString('id-ID', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }) + ' WIB';
    setSubmissionTime(timeFormatted);

    const receipt = `RFT-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionReceipt(receipt);

    const bodyContent = getFormattedBlueprint();
    const emailSubject = `[INQUIRY PORTOFOLIO] ${categoryLabel} - ${name.trim()}`;

    try {
      fetch(`https://formsubmit.co/ajax/${PERSONAL_DATA.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: 'box',
          _captcha: 'false',
          'Kode Receipt': receipt,
          'Nama Pengirim': name.trim(),
          'Email Kontak': email.trim(),
          'Kategori Kebutuhan': categoryLabel,
          'Estimasi Skala': budgetLabel,
          'Waktu Kirim': timeFormatted,
          'Rincian Pesan': message.trim(),
          'Dokumen Surat Lengkap': bodyContent,
        }),
      }).catch(() => {
        // Safe fallback
      });
    } catch {
      // Safe fallback
    }

    await new Promise((resolve) => setTimeout(resolve, 950));

    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#F5B027', '#4C6FD1', '#10B981'],
      });
    } catch {
      // Safe fallback
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyFormattedText = () => {
    navigator.clipboard.writeText(getFormattedBlueprint());
    setCopiedFormat(true);
    setTimeout(() => setCopiedFormat(false), 2000);
  };

  const handleOpenGmail = () => {
    const subject = encodeURIComponent(`[INQUIRY PORTOFOLIO] ${categoryLabel} - ${name.trim()}`);
    const body = encodeURIComponent(getFormattedBlueprint());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_DATA.email)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenWhatsApp = () => {
    const waText = `*Halo Rendy Fernando,*\n\nSaya ingin mendiskusikan peluang proyek/kerjasama melalui portofolio Anda:\n\n*Data Pengirim:*\n• *Nama:* ${name.trim()}\n• *Email:* ${email.trim()}\n• *Kategori:* ${categoryLabel}\n• *Estimasi Skala:* ${budgetLabel}\n\n*Rincian Pesan:*\n"${message.trim()}"\n\n_Terima kasih!_`;
    const waUrl = `https://wa.me/6289669557444?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMailto = () => {
    const subject = encodeURIComponent(`[INQUIRY PORTOFOLIO] ${categoryLabel} - ${name.trim()}`);
    const body = encodeURIComponent(getFormattedBlueprint());
    window.open(`mailto:${PERSONAL_DATA.email}?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      {/* Ambient Cosmic Contact Haze */}
      <div className="absolute top-1/2 -left-28 w-96 h-96 rounded-full bg-sapphire/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -right-28 w-96 h-96 rounded-full bg-champagne/15 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-left space-y-2 mb-10 relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
          {lang === 'id' ? 'Mari Berdiskusi' : 'Get In Touch'}
        </h2>
        <p className="text-mist text-xs sm:text-sm max-w-xl">
          {lang === 'id'
            ? 'Terbuka untuk peluang kerja, kemitraan proyek digital, konsultasi arsitektur web, dan integrasi sistem dengan transmisi langsung berformat profesional.'
            : 'Available for engineering opportunities, digital partnerships, web architecture consulting, and production systems with instant executive dispatch.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
        {/* Left Column: Direct Channels & Social Network */}
        <div className="md:col-span-5 glass-2 rounded-3xl p-6 sm:p-7 text-left flex flex-col justify-between shadow-glass-md border border-white/10 hover:border-white/20 transition-all">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-champagne block">
                {lang === 'id' ? 'Kontak Langsung' : 'Direct Contact'}
              </span>
              <h3 className="font-display text-2xl text-pearl font-normal">
                {PERSONAL_DATA.name}
              </h3>
              <p className="text-xs text-mist leading-relaxed">
                {lang === 'id'
                  ? 'Siap berdiskusi untuk implementasi proyek digital, tawaran posisi kerja, atau konsultasi arsitektur sistem modern.'
                  : 'Open for full-time roles, freelance software engineering, and technical architecture consultations.'}
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-mist">
              {/* Email item */}
              <div className="flex items-center justify-between p-3 rounded-xl glass-1 border border-white/10 hover:border-champagne/40 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-champagne shrink-0" />
                  <span className="font-mono text-pearl text-xs truncate">{PERSONAL_DATA.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 rounded text-fog hover:text-pearl transition-colors shrink-0"
                  title="Salin Email"
                  aria-label="Salin Email"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-champagne" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Phone item */}
              <div className="flex items-center justify-between p-3 rounded-xl glass-1 border border-white/10 hover:border-sapphire/40 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Phone className="w-4 h-4 text-sapphire shrink-0" />
                  <span className="font-mono text-pearl text-xs">{PERSONAL_DATA.phone}</span>
                </div>
                <a
                  href="https://wa.me/6289669557444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-champagne hover:underline font-mono flex items-center gap-1 shrink-0"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-1 border border-white/10">
                <MapPin className="w-4 h-4 text-petrol shrink-0" />
                <span className="text-pearl text-xs">{PERSONAL_DATA.location} (WIB)</span>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-6 border-t border-white/10 mt-6">
            <span className="text-[10px] font-mono uppercase tracking-wider text-fog block mb-2.5">
              {lang === 'id' ? 'Jejaring Profesional' : 'Professional Channels'}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={PERSONAL_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-champagne/40 p-2.5 rounded-xl flex items-center justify-between text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-medium truncate">GitHub</span>
                </span>
                <ExternalLink className="w-3 h-3 text-fog group-hover:text-pearl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              <a
                href={PERSONAL_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-sapphire/40 p-2.5 rounded-xl flex items-center justify-between text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-medium truncate">LinkedIn</span>
                </span>
                <ExternalLink className="w-3 h-3 text-fog group-hover:text-pearl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              <a
                href={PERSONAL_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-champagne/40 p-2.5 rounded-xl flex items-center justify-between text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-2">
                  <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-medium truncate">Instagram</span>
                </span>
                <ExternalLink className="w-3 h-3 text-fog group-hover:text-pearl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              <a
                href={PERSONAL_DATA.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-petrol/40 p-2.5 rounded-xl flex items-center justify-between text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-2">
                  <TikTokIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-medium truncate">TikTok</span>
                </span>
                <ExternalLink className="w-3 h-3 text-fog group-hover:text-pearl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column: Clean Minimalist Dispatch Form */}
        <div className="md:col-span-7 glass-2 rounded-3xl p-6 sm:p-7 text-left shadow-glass-md border border-white/10 hover:border-white/20 transition-all relative overflow-hidden flex flex-col justify-between">
          {/* Submitting Loading Overlay */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 bg-midnight-0/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-2 border-champagne/20 border-t-champagne animate-spin" />
                  <Loader2 className="w-5 h-5 text-champagne animate-pulse absolute" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-base text-pearl font-normal">
                    {lang === 'id' ? 'Menyiapkan Format Pesan' : 'Structuring Dispatch Letter'}
                  </h4>
                  <p className="text-xs text-mist font-mono">
                    {lang === 'id' ? 'Menyambungkan ke transmisi inbox Rendy...' : 'Connecting to Rendy inbox gateway...'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isSubmitted ? (
            /* Post-Submission Verified Dispatch Console */
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-1 space-y-5 flex flex-col justify-between h-full"
            >
              {/* Receipt Status Card */}
              <div className="p-4 rounded-2xl glass-1 border border-champagne/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                    <span className="text-xs font-semibold text-pearl">
                      {lang === 'id' ? 'Format Surat Siap Dikirim' : 'Message Dispatch Ready'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-champagne bg-champagne/10 px-2 py-0.5 rounded-md border border-champagne/20">
                    {submissionReceipt}
                  </span>
                </div>
                <p className="text-xs text-mist leading-relaxed">
                  {lang === 'id'
                    ? 'Inquiry Anda telah tersusun rapi. Pilih kanal pengiriman di bawah untuk membuka draf langsung di Gmail atau mengirimkannya ke WhatsApp.'
                    : 'Your inquiry has been structured. Choose your preferred gateway below to send via Gmail or forward to WhatsApp.'}
                </p>
              </div>

              {/* Formatted Letter Output Card */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-mist">
                  <span className="flex items-center gap-1.5 text-fog">
                    <FileText className="w-3.5 h-3.5 text-champagne" />
                    <span>{lang === 'id' ? 'Draf Dokumen Terstruktur:' : 'Structured Document Draft:'}</span>
                  </span>
                  <button
                    onClick={handleCopyFormattedText}
                    className="text-[11px] text-champagne hover:underline flex items-center gap-1 font-mono"
                  >
                    {copiedFormat ? (
                      <>
                        <Check className="w-3 h-3 text-champagne" />
                        <span>{lang === 'id' ? 'Tersalin' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === 'id' ? 'Salin Format Surat' : 'Copy Draft'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-midnight-0/70 border border-white/10 font-mono text-[11px] text-mist leading-relaxed max-h-44 overflow-y-auto whitespace-pre-wrap select-all">
                  {getFormattedBlueprint()}
                </div>
              </div>

              {/* Primary Direct Dispatch Gateways */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-fog block">
                  {lang === 'id' ? 'Pilih Kanal Transmisi:' : 'Choose Transmission Channel:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleOpenGmail}
                    className="btn-champagne py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group transition-all"
                  >
                    <Mail className="w-4 h-4 text-midnight-0 shrink-0" />
                    <span>{lang === 'id' ? 'Kirim via Gmail Web' : 'Open in Gmail Web'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-midnight-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </button>

                  <button
                    onClick={handleOpenWhatsApp}
                    className="py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 transition-all group"
                  >
                    <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>{lang === 'id' ? 'Teruskan ke WhatsApp' : 'Send to WhatsApp'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handleOpenMailto}
                    className="text-[11px] text-fog hover:text-pearl font-mono transition-colors flex items-center gap-1"
                  >
                    <span>{lang === 'id' ? 'Aplikasi Email Default' : 'Default Mail Client'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="text-[11px] text-champagne hover:underline font-mono flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{lang === 'id' ? 'Kirim Pesan Lain' : 'Reset Form'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Clean Minimalist Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-champagne block">
                    {lang === 'id' ? 'Formulir Komunikasi' : 'Direct Dispatch'}
                  </span>
                  <h3 className="text-sm font-semibold text-pearl">
                    {lang === 'id' ? 'Kirim Pesan Langsung' : 'Send Direct Message'}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-fog">
                  {lang === 'id' ? 'Respon Cepat' : 'Fast Response'}
                </span>
              </div>

              {/* Category Chips: Clean, symmetrical, guaranteed 1-line text */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-mist block">
                  {lang === 'id' ? 'Kategori Kebutuhan' : 'Inquiry Category'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`py-2.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-champagne/15 border-champagne/60 text-pearl shadow-[0_0_12px_rgba(245,176,39,0.18)]'
                            : 'bg-midnight-0/40 border-white/10 text-mist hover:border-white/20 hover:text-pearl'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-champagne' : 'text-fog'}`} />
                        <span className="text-xs font-medium whitespace-nowrap truncate">
                          {lang === 'id' ? cat.labelId : cat.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dual Column: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Field 1: Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-mist block">
                    {lang === 'id' ? 'Nama Lengkap / Instansi' : 'Full Name / Company'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder={lang === 'id' ? 'Contoh: Rendy / PT Digital' : 'e.g. John / Acme Inc'}
                    className={`w-full h-[42px] rounded-xl px-3.5 text-xs text-pearl bg-midnight-0/40 border transition-all focus:outline-none focus:bg-midnight-0/60 ${
                      errors.name
                        ? 'border-status-error'
                        : 'border-white/15 focus:border-champagne'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-status-error mt-0.5">{errors.name}</p>
                  )}
                </div>

                {/* Field 2: Email */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-mist block">
                    {lang === 'id' ? 'Alamat Email Kontak' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="alamat@domain.com"
                    className={`w-full h-[42px] rounded-xl px-3.5 text-xs text-pearl bg-midnight-0/40 border transition-all focus:outline-none focus:bg-midnight-0/60 ${
                      errors.email
                        ? 'border-status-error'
                        : 'border-white/15 focus:border-champagne'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-status-error mt-0.5">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Budget / Scale Selector: Clean, symmetrical, guaranteed 1-line text */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-mist">
                    {lang === 'id' ? 'Estimasi Anggaran / Skala' : 'Estimated Budget / Scale'}
                  </label>
                  <span className="text-[10px] font-mono text-fog">
                    {lang === 'id' ? 'Opsional' : 'Optional'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGET_OPTIONS.map((b) => {
                    const isSelected = selectedBudget === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBudget(b.id)}
                        className={`py-2 px-2 rounded-lg border text-center text-xs font-mono transition-all whitespace-nowrap truncate ${
                          isSelected
                            ? 'bg-sapphire/20 border-sapphire/60 text-pearl font-medium'
                            : 'bg-midnight-0/40 border-white/10 text-fog hover:text-mist hover:border-white/20'
                        }`}
                      >
                        {lang === 'id' ? b.labelId : b.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 3: Message */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-mist block">
                    {lang === 'id' ? 'Rincian Pesan & Kebutuhan Proyek' : 'Project Message & Details'}
                  </label>
                  <span className="text-[10px] font-mono text-fog">
                    {message.length} {lang === 'id' ? 'karakter' : 'chars'}
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder={
                    lang === 'id'
                      ? 'Ceritakan gambaran singkat kebutuhan sistem, peran yang dicari, atau jadwal kolaborasi yang direncanakan...'
                      : 'Briefly describe your project requirements, scope, role, or preferred timeline...'
                  }
                  className={`w-full rounded-xl p-3 text-xs text-pearl bg-midnight-0/40 border transition-all focus:outline-none focus:bg-midnight-0/60 resize-none leading-relaxed ${
                    errors.message
                      ? 'border-status-error'
                      : 'border-white/15 focus:border-champagne'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-status-error mt-0.5">{errors.message}</p>
                )}
              </div>

              {/* Submit Button & Sub-footer */}
              <div className="pt-1.5 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-champagne h-[46px] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group transition-all shadow-[0_0_18px_rgba(245,176,39,0.22)] hover:shadow-[0_0_24px_rgba(245,176,39,0.35)] disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-midnight-0 transition-transform group-hover:translate-x-1" />
                  <span>{lang === 'id' ? 'Kirim Pesan Sekarang' : 'Send Message Now'}</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-fog text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne shrink-0" />
                  <span>
                    {lang === 'id'
                      ? 'Transmisi Langsung & Terenkripsi • rendyftbaru@gmail.com'
                      : 'Direct & Encrypted Transmission • rendyftbaru@gmail.com'}
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
