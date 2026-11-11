import React, { useState } from 'react';
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
  RotateCcw,
  Loader2,
  AlertCircle,
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

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('web-app');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  const categoryLabel = lang === 'id' ? activeCategory.labelId : activeCategory.labelEn;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = lang === 'id' ? 'Nama wajib diisi.' : 'Name is required.';
    }
    if (!email.trim()) {
      errs.email = lang === 'id' ? 'Email wajib diisi.' : 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = lang === 'id' ? 'Format email tidak valid.' : 'Please enter a valid email address.';
    }
    if (!message.trim()) {
      errs.message = lang === 'id' ? 'Pesan belum diisi.' : 'Message is required.';
    } else if (message.trim().length < 5) {
      errs.message = lang === 'id' ? 'Tuliskan minimal 5 karakter.' : 'Please enter at least 5 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const emailSubject = `[Inquiry Portofolio] ${categoryLabel} - ${name.trim()}`;

    try {
      const accessKey = (PERSONAL_DATA as { web3FormsAccessKey?: string }).web3FormsAccessKey;

      if (!accessKey) {
        // Direct seamless fallback: Open native email client with prefilled details
        const mailtoUrl = `mailto:${PERSONAL_DATA.email}?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(
          `Halo Rendy,\n\nNama: ${name.trim()}\nEmail: ${email.trim()}\nKategori: ${categoryLabel}\n\nPesan:\n${message.trim()}`
        )}`;
        window.location.href = mailtoUrl;
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 50,
            spread: 65,
            origin: { y: 0.75 },
            colors: ['#F5B027', '#4C6FD1', '#10B981'],
          });
        } catch {}
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: emailSubject,
          from_name: name.trim(),
          email: email.trim(),
          category: categoryLabel,
          message: message.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (data && data.success) {
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 50,
            spread: 65,
            origin: { y: 0.75 },
            colors: ['#F5B027', '#4C6FD1', '#10B981'],
          });
        } catch {}
      } else {
        setSubmitError(
          (data && data.message) ||
            (lang === 'id'
              ? 'Gagal mengirim pesan melalui gateway email. Silakan periksa koneksi atau hubungi langsung via WhatsApp di bawah.'
              : 'Failed to send message via gateway. Please check your connection or contact directly via WhatsApp below.')
        );
      }
    } catch {
      setSubmitError(
        lang === 'id'
          ? 'Koneksi ke gateway email terputus. Silakan hubungi langsung via WhatsApp atau Email di bawah.'
          : 'Connection to email gateway failed. Please contact via WhatsApp or Email below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    setSubmitError('');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      {/* Ambient Cosmic Contact Haze */}
      <div className="absolute top-1/2 -left-28 w-96 h-96 rounded-full bg-sapphire/20 blur-2xl sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -right-28 w-96 h-96 rounded-full bg-champagne/15 blur-2xl sm:blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-left mb-10 relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
          {lang === 'id' ? 'Mari Berdiskusi' : 'Get In Touch'}
        </h2>
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
                <span className="text-pearl text-xs">
                  {lang === 'id' ? PERSONAL_DATA.address : PERSONAL_DATA.location} (WIB)
                </span>
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
                    {lang === 'id' ? 'Mengirim Pesan ke Email Rendy...' : "Dispatching to Rendy's Inbox..."}
                  </h4>
                  <p className="text-xs text-mist font-mono">
                    {lang === 'id' ? 'Menghubungkan langsung ke server email...' : 'Connecting to direct email gateway...'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isSubmitted ? (
            /* Clean Minimalist Success Confirmation */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[380px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="w-7 h-7 text-[#10B981]" />
              </div>

              <div className="space-y-1.5 max-w-sm">
                <h3 className="font-display text-2xl text-pearl font-normal">
                  {lang === 'id' ? 'Pesan Terkirim' : 'Message Sent'}
                </h3>
                <p className="text-xs sm:text-sm text-mist leading-relaxed">
                  {lang === 'id' ? (
                    <>
                      Terima kasih <span className="text-pearl font-medium">{name}</span>. Pesan Anda telah terkirim langsung ke email Rendy (<span className="text-champagne font-mono">{PERSONAL_DATA.email}</span>). Saya akan segera membalasnya.
                    </>
                  ) : (
                    <>
                      Thank you <span className="text-pearl font-medium">{name}</span>. Your message has been delivered to Rendy's inbox (<span className="text-champagne font-mono">{PERSONAL_DATA.email}</span>). I will get back to you shortly.
                    </>
                  )}
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-champagne py-2.5 px-6 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-[0_0_16px_rgba(245,176,39,0.2)] hover:shadow-[0_0_22px_rgba(245,176,39,0.3)] transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-midnight-0" />
                  <span>{lang === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Clean Minimalist Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-semibold text-pearl">
                  {lang === 'id' ? 'Kirim Pesan' : 'Send Message'}
                </h3>
                <span className="text-[11px] font-mono text-fog">
                  {lang === 'id' ? 'Respon Cepat' : 'Fast Response'}
                </span>
              </div>

              {/* Category Chips */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-mist block">
                  {lang === 'id' ? 'Kategori' : 'Category'}
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
                    {lang === 'id' ? 'Nama' : 'Name'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder={lang === 'id' ? 'Nama Anda' : 'Your name'}
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="email@domain.com"
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

              {/* Field 3: Message - Kotak Pesan Lebih Luas & Bersih */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-mist block">
                  {lang === 'id' ? 'Pesan' : 'Message'}
                </label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder={
                    lang === 'id'
                      ? 'Tulis pesan Anda di sini...'
                      : 'Write your message here...'
                  }
                  className={`w-full min-h-[155px] rounded-xl p-3.5 text-xs text-pearl bg-midnight-0/40 border transition-all focus:outline-none focus:bg-midnight-0/60 resize-none leading-relaxed ${
                    errors.message
                      ? 'border-status-error'
                      : 'border-white/15 focus:border-champagne'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-status-error mt-0.5">{errors.message}</p>
                )}
              </div>

              {/* Submission Error Alert with Quick Fallback Options */}
              {submitError && (
                <div className="p-3.5 rounded-xl bg-status-error/10 border border-status-error/30 text-xs text-status-error space-y-2.5">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-status-error" />
                    <span className="leading-relaxed">{submitError}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-status-error/20">
                    <span className="text-[11px] text-fog font-mono">
                      {lang === 'id' ? 'Opsi langsung:' : 'Direct options:'}
                    </span>
                    <a
                      href={`https://wa.me/6289669557444?text=${encodeURIComponent(
                        `Halo Rendy, saya ${name.trim() || 'Klien'}.\n\nKategori: ${categoryLabel}\nEmail: ${email.trim() || '-'}\n\nPesan:\n${message.trim()}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center gap-1 transition-all"
                    >
                      <span>WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={`mailto:${PERSONAL_DATA.email}?subject=${encodeURIComponent(
                        `[Inquiry Portofolio] ${categoryLabel} - ${name.trim() || 'Klien'}`
                      )}&body=${encodeURIComponent(
                        `Nama: ${name.trim()}\nEmail: ${email.trim()}\nKategori: ${categoryLabel}\n\nPesan:\n${message.trim()}`
                      )}`}
                      className="px-2.5 py-1 rounded-lg bg-champagne/15 hover:bg-champagne/25 border border-champagne/30 text-champagne font-mono text-[11px] flex items-center gap-1 transition-all"
                    >
                      <span>Buka Email</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* Submit Button - Jarak nyaman ke bawah */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-champagne h-[46px] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group transition-all shadow-[0_0_18px_rgba(245,176,39,0.22)] hover:shadow-[0_0_24px_rgba(245,176,39,0.35)] disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-midnight-0 transition-transform group-hover:translate-x-1" />
                  <span>{lang === 'id' ? 'Kirim Pesan' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
