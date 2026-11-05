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
  Clock,
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
  { id: 'web-app', labelId: 'Proyek Web & App', labelEn: 'Web & App Project', icon: Code2 },
  { id: 'recruitment', labelId: 'Tawaran Kerja / Rekrutmen', labelEn: 'Hiring / Career Offer', icon: Briefcase },
  { id: 'consulting', labelId: 'Konsultasi Arsitektur', labelEn: 'System Architecture', icon: Layers },
  { id: 'general', labelId: 'Kolaborasi & Diskusi', labelEn: 'General Inquiry', icon: MessageSquare },
];

const BUDGET_OPTIONS = [
  { id: 'discuss', labelId: 'Fleksibel / Diskusi', labelEn: 'Flexible / Discuss' },
  { id: 'tier1', labelId: '< Rp 5 Juta', labelEn: '< $350 USD' },
  { id: 'tier2', labelId: 'Rp 5 - 15 Juta', labelEn: '$350 - $1,000 USD' },
  { id: 'tier3', labelId: '> Rp 15 Juta', labelEn: '> $1,000 USD' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('web-app');
  const [selectedBudget, setSelectedBudget] = useState<string>('discuss');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // High-Tech Form States
  const [viewTab, setViewTab] = useState<'form' | 'preview'>('form');
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

  // Generate Professional Standardized Email Blueprint
  const getFormattedBlueprint = useCallback(() => {
    const timeStr = submissionTime || 'Format Resmi Portofolio';

    return `Kepada: Rendy Fernando Tambunan (Full Stack Developer)
Email Tujuan: ${PERSONAL_DATA.email}
----------------------------------------------------------------------
SURAT INQUIRY & PENAWARAN KERJASAMA PROYEK
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
Sistem Verifikasi: Portofolio Digital • https://github.com/RendyGH7
----------------------------------------------------------------------`;
  }, [submissionTime, name, email, categoryLabel, budgetLabel, message]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = lang === 'id' ? 'Nama lengkap atau perusahaan belum diisi.' : 'Full name or company is required.';
    }
    if (!email.trim()) {
      errs.email = lang === 'id' ? 'Alamat email belum diisi.' : 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = lang === 'id' ? 'Format email belum valid (contoh: nama@domain.com).' : 'Please enter a valid email address.';
    }
    if (!message.trim()) {
      errs.message = lang === 'id' ? 'Pesan dan rencana proyek belum diisi.' : 'Project message is required.';
    } else if (message.trim().length < 15) {
      errs.message = lang === 'id' ? 'Tuliskan pesan minimal 15 karakter agar lebih jelas.' : 'Please enter at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setViewTab('form');
      return;
    }

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

    // Silent background transmission attempt to FormSubmit AJAX
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
        // Safe fallback handled gracefully
      });
    } catch {
      // Safe fallback
    }

    // High-tech cinematic transmission delay
    await new Promise((resolve) => setTimeout(resolve, 1100));

    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 55,
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
    setTimeout(() => setCopiedFormat(false), 2200);
  };

  const handleOpenGmail = () => {
    const subject = encodeURIComponent(`[INQUIRY PORTOFOLIO] ${categoryLabel} - ${name.trim()}`);
    const body = encodeURIComponent(getFormattedBlueprint());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_DATA.email)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenWhatsApp = () => {
    const waText = `*Halo Rendy Fernando,*\n\nSaya ingin mendiskusikan peluang proyek/kerjasama melalui portofolio Anda:\n\n*Data Pengirim:*\n• *Nama:* ${name.trim()}\n• *Email:* ${email.trim()}\n• *Kategori:* ${categoryLabel}\n• *Estimasi Skala:* ${budgetLabel}\n\n*Rincian Kebutuhan:*\n"${message.trim()}"\n\n_Terima kasih!_`;
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Info Column: Direct Channels & Social Network */}
        <div className="md:col-span-5 glass-2 rounded-3xl p-6 sm:p-7 text-left space-y-6 shadow-glass-md border border-white/10 hover:border-white/20 transition-all">
          <div className="space-y-3">
            <span className="text-xs font-mono text-champagne uppercase tracking-wider block">
              Kontak Langsung
            </span>
            <h3 className="font-display text-2xl text-pearl font-normal">
              Rendy Fernando Tambunan
            </h3>
            <p className="text-xs text-mist leading-relaxed">
              Kirimkan pesan melalui formulir resmi di samping untuk menghasilkan format surat bisnis terstruktur yang langsung sampai ke inbox email saya.
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-mist">
            {/* Email item with copy */}
            <div className="flex items-center justify-between p-3 rounded-xl glass-1 border border-white/10 hover:border-champagne/40 transition-all">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-champagne" />
                <span className="font-mono text-pearl">{PERSONAL_DATA.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1 rounded text-fog hover:text-pearl transition-colors"
                title="Salin Email"
                aria-label="Salin Email"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Phone item */}
            <div className="flex items-center justify-between p-3 rounded-xl glass-1 border border-white/10 hover:border-sapphire/40 transition-all">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sapphire" />
                <span className="font-mono text-pearl">{PERSONAL_DATA.phone}</span>
              </div>
              <a
                href="https://wa.me/6289669557444"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-champagne hover:underline font-mono flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl glass-1 border border-white/10">
              <MapPin className="w-4 h-4 text-petrol" />
              <span className="text-pearl">{PERSONAL_DATA.location} (WIB)</span>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase text-fog block mb-2.5">
              Jejaring Profesional
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={PERSONAL_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-champagne/40 p-2.5 rounded-xl flex items-center justify-between text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-sapphire/40 p-2.5 rounded-xl flex items-center justify-between text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-champagne/40 p-2.5 rounded-xl flex items-center justify-between text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-1.5">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_DATA.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-petrol/40 p-2.5 rounded-xl flex items-center justify-between text-mist hover:text-pearl transition-all group"
              >
                <span className="flex items-center gap-1.5">
                  <TikTokIcon className="w-3.5 h-3.5" />
                  <span>TikTok</span>
                </span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column: Advanced Professional Dispatch Module */}
        <div className="md:col-span-7 glass-2 rounded-3xl p-6 sm:p-8 text-left shadow-glass-md border border-white/10 hover:border-white/20 transition-all relative overflow-hidden">
          {/* Submitting Loading Overlay */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 bg-midnight-0/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-champagne/20 border-t-champagne animate-spin" />
                  <Loader2 className="w-6 h-6 text-champagne animate-pulse absolute" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-lg text-pearl font-normal">
                    Menyusun & Mengirimkan Pesan
                  </h4>
                  <p className="text-xs text-mist font-mono">
                    Format surat profesional sedang disiapkan untuk inbox Rendy...
                  </p>
                </div>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-champagne via-sapphire to-[#10B981] animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isSubmitted ? (
            /* Post-Submission Verified Dispatch Console */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-4 space-y-6"
            >
              {/* Receipt Status Badge */}
              <div className="p-4 rounded-2xl bg-[#064E3B]/85 border border-[#10B981]/60 flex items-start gap-3.5 text-left shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#10B981]/20 flex items-center justify-center shrink-0 text-[#6EE7B7]">
                  <CheckCircle2 className="w-5 h-5 text-[#6EE7B7]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#6EE7B7] uppercase tracking-wider">
                      Format Surat Siap Dikirim
                    </span>
                    <span className="text-[10px] font-mono text-mist bg-white/10 px-2 py-0.5 rounded-md">
                      {submissionReceipt}
                    </span>
                  </div>
                  <p className="text-xs text-pearl leading-relaxed">
                    Data inquiry Anda telah dikemas rapi dengan struktur surat bisnis eksekutif. Anda dapat langsung membuka draf di Gmail atau mengirimkannya via WhatsApp untuk tanggapan instan.
                  </p>
                </div>
              </div>

              {/* Formatted Letter Output Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-mist">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-champagne" />
                    <span>Draf Dokumen Terstruktur:</span>
                  </span>
                  <button
                    onClick={handleCopyFormattedText}
                    className="text-[11px] text-champagne hover:underline flex items-center gap-1 font-mono"
                  >
                    {copiedFormat ? (
                      <>
                        <Check className="w-3 h-3 text-[#10B981]" />
                        <span className="text-[#10B981]">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Format Surat</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-midnight-0/70 border border-white/10 font-mono text-[11px] text-mist leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-all">
                  {getFormattedBlueprint()}
                </div>
              </div>

              {/* Primary Direct Dispatch Gateways */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-fog block">
                  Pilih Kanal Pengiriman:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Gateway 1: Gmail Web Compose */}
                  <button
                    onClick={handleOpenGmail}
                    className="btn-champagne py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group transition-all"
                  >
                    <Mail className="w-4 h-4 text-midnight-0" />
                    <span>Kirim via Gmail Web</span>
                    <ExternalLink className="w-3.5 h-3.5 text-midnight-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  {/* Gateway 2: WhatsApp Direct */}
                  <button
                    onClick={handleOpenWhatsApp}
                    className="py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-[#064E3B]/85 hover:bg-[#064E3B] text-[#6EE7B7] border border-[#10B981]/60 transition-all group"
                  >
                    <Phone className="w-4 h-4 text-[#6EE7B7]" />
                    <span>Teruskan ke WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6EE7B7] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleOpenMailto}
                    className="text-[11px] text-fog hover:text-pearl font-mono transition-colors flex items-center gap-1"
                  >
                    <span>Gunakan Aplikasi Email Default (Outlook/Apple Mail)</span>
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
                    <span>Kirim Pesan Lain</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Interactive Dispatch Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Mode & Live Preview Switcher */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-semibold text-pearl uppercase tracking-wider flex items-center gap-2">
                  <span>Kirim Pesan Langsung</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                </span>

                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setViewTab('form')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      viewTab === 'form'
                        ? 'bg-champagne/20 text-champagne font-semibold border border-champagne/40'
                        : 'text-fog hover:text-pearl'
                    }`}
                  >
                    Formulir
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewTab('preview')}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                      viewTab === 'preview'
                        ? 'bg-champagne/20 text-champagne font-semibold border border-champagne/40'
                        : 'text-fog hover:text-pearl'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>Pratinjau Format</span>
                  </button>
                </div>
              </div>

              {viewTab === 'preview' ? (
                /* Live Format Preview Screen */
                <div className="space-y-3 py-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-fog font-mono">Pratinjau Surat yang Dihasilkan:</span>
                    <button
                      type="button"
                      onClick={() => setViewTab('form')}
                      className="text-champagne font-mono hover:underline text-[11px]"
                    >
                      &larr; Kembali ke Isi Formulir
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight-0/80 border border-white/10 font-mono text-[11px] text-mist leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap">
                    {getFormattedBlueprint()}
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <>
                  {/* Category Selection Chips */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-mist block">
                      Kategori Kebutuhan
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
                            className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                              isSelected
                                ? 'bg-champagne/15 border-champagne/60 text-pearl shadow-[0_0_12px_rgba(245,176,39,0.2)]'
                                : 'bg-midnight-0/40 border-white/10 text-mist hover:border-white/25 hover:text-pearl'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-champagne' : 'text-fog'}`} />
                            <span className="text-[11px] font-medium leading-tight">
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
                        Nama Lengkap / Instansi
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="Contoh: Rendy / PT Digital"
                        className={`w-full h-[46px] rounded-xl px-3.5 text-xs text-pearl bg-midnight-0/40 border transition-all focus:outline-none focus:bg-midnight-0/60 ${
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
                        Alamat Email Kontak
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="alamat@domain.com"
                        className={`w-full h-[46px] rounded-xl px-3.5 text-xs text-pearl bg-midnight-0/40 border transition-all focus:outline-none focus:bg-midnight-0/60 ${
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

                  {/* Budget / Scale Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-mist block">
                      Estimasi Skala / Anggaran Proyek <span className="text-fog text-[10px]">(Opsional)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGET_OPTIONS.map((b) => {
                        const isSelected = selectedBudget === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBudget(b.id)}
                            className={`py-1.5 px-2 rounded-lg border text-center text-[11px] font-mono transition-all ${
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
                        Rincian Pesan & Kebutuhan Proyek
                      </label>
                      <span className="text-[10px] font-mono text-fog">
                        {message.length} karakter
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      placeholder="Ceritakan gambaran singkat kebutuhan sistem, peran yang dicari, atau jadwal kolaborasi yang direncanakan..."
                      className={`w-full rounded-xl p-3 text-xs text-pearl bg-midnight-0/40 border transition-all focus:outline-none focus:bg-midnight-0/60 resize-none ${
                        errors.message
                          ? 'border-status-error'
                          : 'border-white/15 focus:border-champagne'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-status-error mt-0.5">{errors.message}</p>
                    )}
                  </div>
                </>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-champagne h-[48px] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group transition-all shadow-[0_0_20px_rgba(245,176,39,0.25)] hover:shadow-[0_0_26px_rgba(245,176,39,0.4)] disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-midnight-0 transition-transform group-hover:translate-x-1" />
                  <span>Kirim Pesan Sekarang (Format Profesional)</span>
                </button>

                <div className="flex items-center justify-center gap-4 mt-2.5 text-[10px] font-mono text-fog">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                    <span>Format Surat Bisnis Terstandarisasi</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-champagne" />
                    <span>Notifikasi Langsung ke Inbox Rendy</span>
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
