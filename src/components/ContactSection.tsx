import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface ContactSectionProps {
  lang: 'id' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Nama belum diisi. Mohon masukkan nama Anda.';
    if (!email.trim()) {
      errs.email = 'Email belum diisi. Mohon masukkan alamat email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Format email belum valid. Periksa kembali penulisannya.';
    }
    if (!message.trim()) errs.message = 'Pesan belum diisi. Tuliskan kebutuhan proyek Anda.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#F5B027', '#4C6FD1'],
      });
    } catch {
      // safe fallback
    }

    // Prepare mailto fallback
    const subject = encodeURIComponent(`Inquiry Proyek dari ${name}`);
    const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
    window.open(`mailto:${PERSONAL_DATA.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-left space-y-2 mb-10">
        <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
          {lang === 'id' ? 'Mari Berdiskusi' : 'Get In Touch'}
        </h2>
        <p className="text-mist text-xs sm:text-sm">
          {lang === 'id'
            ? 'Terbuka untuk peluang kerja, kemitraan proyek digital, dan konsultasi teknis.'
            : 'Available for career opportunities, digital collaborations, and engineering consulting.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Info Column */}
        <div className="md:col-span-5 glass-2 rounded-xl p-6 text-left space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono text-champagne uppercase tracking-wider block">
              Kontak Langsung
            </span>
            <h3 className="font-display text-2xl text-pearl font-normal">
              Rendy Fernando Tambunan
            </h3>
            <p className="text-xs text-mist leading-relaxed">
              Respon cepat dalam 24 jam untuk setiap tawaran proyek atau peluang kerja full stack.
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-white/5 text-xs text-mist">
            {/* Email item with copy */}
            <div className="flex items-center justify-between p-2.5 rounded-lg glass-1 border border-white/5">
              <div className="flex items-center gap-2">
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
                  <Check className="w-3.5 h-3.5 text-status-success" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Phone item */}
            <div className="flex items-center justify-between p-2.5 rounded-lg glass-1 border border-white/5">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sapphire" />
                <span className="font-mono text-pearl">{PERSONAL_DATA.phone}</span>
              </div>
              <a
                href={`https://wa.me/6289669557444`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-champagne hover:underline"
              >
                WhatsApp
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg glass-1 border border-white/5">
              <MapPin className="w-4 h-4 text-petrol" />
              <span className="text-pearl">{PERSONAL_DATA.location} (WIB)</span>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] font-mono uppercase text-fog block mb-2">
              Jejaring Profesional
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={PERSONAL_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-1 hover:border-champagne/40 p-2 rounded-md flex items-center justify-between text-mist hover:text-pearl transition-all group"
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
                className="glass-1 hover:border-sapphire/40 p-2 rounded-md flex items-center justify-between text-mist hover:text-pearl transition-all group"
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
                className="glass-1 hover:border-champagne/40 p-2 rounded-md flex items-center justify-between text-mist hover:text-pearl transition-all group"
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
                className="glass-1 hover:border-petrol/40 p-2 rounded-md flex items-center justify-between text-mist hover:text-pearl transition-all group"
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

        {/* Right Form Column (3 fields strictly conforming to design.md) */}
        <div className="md:col-span-7 glass-2 rounded-xl p-6 sm:p-8 text-left">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-status-success/20 border border-status-success/40 flex items-center justify-center mx-auto text-status-success">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl text-pearl font-normal">
                Pesan Siap Terkirim
              </h3>
              <p className="text-xs text-mist max-w-sm mx-auto leading-relaxed">
                Klien email Anda telah dibuka dengan draf pesan otomatis. Terima kasih telah menghubungi Rendy!
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-4 py-2 rounded-md glass-1 text-xs text-pearl hover:border-white/20"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-white/10 pb-2">
                <span className="text-xs font-semibold text-pearl uppercase tracking-wider">
                  Kirim Pesan Langsung
                </span>
              </div>

              {/* Field 1: Nama */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-mist block">
                  Nama Anda
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="Nama lengkap atau perusahaan"
                  className={`w-full h-[48px] rounded-sm px-3.5 text-xs text-pearl bg-midnight-0/70 border transition-colors focus:outline-none ${
                    errors.name
                      ? 'border-status-error'
                      : 'border-white/10 focus:border-sapphire'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-status-error mt-1">{errors.name}</p>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-mist block">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="alamat@domain.com"
                  className={`w-full h-[48px] rounded-sm px-3.5 text-xs text-pearl bg-midnight-0/70 border transition-colors focus:outline-none ${
                    errors.email
                      ? 'border-status-error'
                      : 'border-white/10 focus:border-sapphire'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-status-error mt-1">{errors.email}</p>
                )}
              </div>

              {/* Field 3: Pesan */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-mist block">
                  Pesan & Rencana Proyek
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder="Ceritakan gambaran singkat kebutuhan atau posisi yang sedang dicari..."
                  className={`w-full rounded-sm p-3.5 text-xs text-pearl bg-midnight-0/70 border transition-colors focus:outline-none resize-none ${
                    errors.message
                      ? 'border-status-error'
                      : 'border-white/10 focus:border-sapphire'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-status-error mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn-champagne h-[48px] rounded-md text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-midnight-0" />
                <span>Kirim Pesan Sekarang</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
