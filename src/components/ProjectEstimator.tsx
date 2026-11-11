import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  ShoppingBag,
  Sparkles,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Clock,
  ArrowUpRight,
  Check,
  Layers,
  Zap,
} from 'lucide-react';
import { smoothScrollTo } from '../utils/scrollLock';

interface ProjectEstimatorProps {
  lang: 'id' | 'en';
}

type ProjectType = 'webapp' | 'ecommerce' | 'landing';
type TimelinePace = 'sprint' | 'standard';

interface FeatureOption {
  id: string;
  nameId: string;
  nameEn: string;
  icon: React.ComponentType<{ className?: string }>;
  days: number;
}

const FEATURES: FeatureOption[] = [
  {
    id: 'payment',
    nameId: 'Payment QRIS',
    nameEn: 'Payment (QRIS)',
    icon: CreditCard,
    days: 3,
  },
  {
    id: 'auth_db',
    nameId: 'Auth & Database',
    nameEn: 'Auth & Database',
    icon: ShieldCheck,
    days: 3,
  },
  {
    id: 'admin_dashboard',
    nameId: 'Admin Dashboard',
    nameEn: 'Admin Dashboard',
    icon: BarChart3,
    days: 4,
  },
];

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ lang }) => {
  const [projectType, setProjectType] = useState<ProjectType>('webapp');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['payment', 'auth_db']);
  const [pace, setPace] = useState<TimelinePace>('sprint');
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parallax subtle tilt (Desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Dynamic calculations based on user interaction
  const calculation = useMemo(() => {
    let baseDays = 7;
    let stack = 'React 19 • TypeScript • Tailwind CSS';
    let architecture = 'Modular Component Architecture';
    let typeNameId = 'Web App Full Stack';
    let typeNameEn = 'Full Stack Web App';

    if (projectType === 'webapp') {
      baseDays = 8;
      stack = 'React 19 • Laravel 11 • PostgreSQL';
      architecture = 'Decoupled REST API & Clean Architecture';
      typeNameId = 'Web App Full Stack';
      typeNameEn = 'Full Stack Web App';
    } else if (projectType === 'ecommerce') {
      baseDays = 10;
      stack = 'React 19 • Laravel 11 • Midtrans QRIS • PostgreSQL';
      architecture = 'High-Conversion Checkout & Automated Webhook';
      typeNameId = 'Toko Online & E-Commerce';
      typeNameEn = 'E-Commerce Platform';
    } else {
      baseDays = 5;
      stack = 'React 19 • Vite • Tailwind • Motion';
      architecture = 'Performance-First & SEO Optimized';
      typeNameId = 'Landing Page & Profil';
      typeNameEn = 'High-Speed Landing Page';
    }

    // Add days for features
    selectedFeatures.forEach((fid) => {
      const f = FEATURES.find((item) => item.id === fid);
      if (f) baseDays += f.days;
    });

    // Pace adjustment
    let minDays = baseDays;
    let maxDays = baseDays + 4;

    if (pace === 'sprint') {
      minDays = Math.max(5, Math.round(baseDays * 0.75));
      maxDays = Math.round(maxDays * 0.8);
    }

    return {
      minDays,
      maxDays,
      stack,
      architecture,
      typeNameId,
      typeNameEn,
    };
  }, [projectType, selectedFeatures, pace]);

  // Dispatch prefilled project brief to Contact form and smooth scroll
  const handleProceedToContact = () => {
    const selectedFeatureNames = selectedFeatures
      .map((fid) => {
        const f = FEATURES.find((item) => item.id === fid);
        return f ? (lang === 'id' ? f.nameId : f.nameEn) : '';
      })
      .filter(Boolean)
      .join(', ');

    const projectTypeName = lang === 'id' ? calculation.typeNameId : calculation.typeNameEn;
    const paceText = pace === 'sprint' ? (lang === 'id' ? 'Sprint Cepat' : 'Fast Sprint') : (lang === 'id' ? 'Produksi Penuh' : 'Standard Production');

    const formattedMessage =
      lang === 'id'
        ? `Halo Rendy, saya ingin berdiskusi mengenai proyek "${projectTypeName}" dengan fitur [${selectedFeatureNames || 'Dasar'}] dan target [${paceText}] (estimasi ~${calculation.minDays}-${calculation.maxDays} hari). Mohon info ketersediaan dan diskusi teknis lebih lanjut.`
        : `Hi Rendy, I'd like to discuss a "${projectTypeName}" project with features [${selectedFeatureNames || 'Standard'}] targeting [${paceText}] (estimated ~${calculation.minDays}-${calculation.maxDays} days). Looking forward to discussing details.`;

    // Emit event for ContactSection
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('rendy:prefill-contact', {
          detail: {
            category: 'web-app',
            message: formattedMessage,
          },
        })
      );
    }

    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);

    // Smooth scroll to contact section
    smoothScrollTo('contact', 80);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-lg lg:max-w-xl mx-auto relative flex flex-col items-center justify-center p-1 sm:p-3 select-none"
      style={{
        transform: `perspective(1000px) rotateX(${-mouseOffset.y * 0.3}deg) rotateY(${mouseOffset.x * 0.3}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background Starlight Ambient Halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-champagne/15 via-sapphire/20 to-transparent blur-xl sm:blur-3xl opacity-80 transform-gpu" />
      </div>

      {/* Main Glass Console */}
      <div className="relative z-10 w-full glass-2 rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 border border-white/10 hover:border-champagne/35 transition-all duration-500 shadow-glass-lg text-left">
        
        {/* Top Header Bar: Telemetry & Title */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/10 mb-3 sm:mb-3.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] shrink-0" />
            <span className="font-mono text-[10.5px] sm:text-xs font-semibold text-pearl tracking-wider uppercase truncate">
              {lang === 'id' ? 'Estimator Proyek' : 'Project Estimator'}
              <span className="hidden xs:inline text-fog font-normal"> // {lang === 'id' ? 'Kalkulasi Instan' : 'Quick Scope'}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono text-[9px] sm:text-[10px] text-champagne px-2 py-0.5 rounded-full bg-champagne/10 border border-champagne/25 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-champagne shrink-0" />
              <span>{lang === 'id' ? 'Interaktif' : 'Live'}</span>
            </span>
          </div>
        </div>

        {/* Section 1: Jenis Solusi (Single Select Tabs) */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-fog flex items-center gap-1.5">
              <span>01.</span>
              <span className="text-mist">{lang === 'id' ? 'Tipe Solusi Digital' : 'Digital Solution Type'}</span>
            </label>
            <span className="text-[10px] font-mono text-champagne/90 font-medium">
              {projectType === 'webapp' ? 'Full Stack' : projectType === 'ecommerce' ? 'E-Commerce' : 'Landing'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setProjectType('webapp')}
              className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 cursor-pointer ${
                projectType === 'webapp'
                  ? 'bg-champagne/15 border-champagne/50 text-pearl shadow-[0_0_12px_rgba(245,176,39,0.2)]'
                  : 'bg-midnight-0/50 border-white/5 text-mist hover:border-white/15 hover:text-pearl'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Code2 className={`w-3.5 h-3.5 ${projectType === 'webapp' ? 'text-champagne' : 'text-fog'}`} />
                {projectType === 'webapp' && <span className="w-1.5 h-1.5 rounded-full bg-champagne shadow-[0_0_6px_#F5B027]" />}
              </div>
              <span className="text-[10.5px] sm:text-[11px] font-semibold leading-tight mt-0.5 truncate w-full">
                Web App
              </span>
              <span className="text-[9px] font-mono text-fog leading-tight truncate">
                React & Laravel
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProjectType('ecommerce')}
              className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 cursor-pointer ${
                projectType === 'ecommerce'
                  ? 'bg-champagne/15 border-champagne/50 text-pearl shadow-[0_0_12px_rgba(245,176,39,0.2)]'
                  : 'bg-midnight-0/50 border-white/5 text-mist hover:border-white/15 hover:text-pearl'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <ShoppingBag className={`w-3.5 h-3.5 ${projectType === 'ecommerce' ? 'text-champagne' : 'text-fog'}`} />
                {projectType === 'ecommerce' && <span className="w-1.5 h-1.5 rounded-full bg-champagne shadow-[0_0_6px_#F5B027]" />}
              </div>
              <span className="text-[10.5px] sm:text-[11px] font-semibold leading-tight mt-0.5 truncate w-full">
                E-Commerce
              </span>
              <span className="text-[9px] font-mono text-fog leading-tight truncate">
                Toko Online
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProjectType('landing')}
              className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 cursor-pointer ${
                projectType === 'landing'
                  ? 'bg-champagne/15 border-champagne/50 text-pearl shadow-[0_0_12px_rgba(245,176,39,0.2)]'
                  : 'bg-midnight-0/50 border-white/5 text-mist hover:border-white/15 hover:text-pearl'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Sparkles className={`w-3.5 h-3.5 ${projectType === 'landing' ? 'text-champagne' : 'text-fog'}`} />
                {projectType === 'landing' && <span className="w-1.5 h-1.5 rounded-full bg-champagne shadow-[0_0_6px_#F5B027]" />}
              </div>
              <span className="text-[10.5px] sm:text-[11px] font-semibold leading-tight mt-0.5 truncate w-full">
                Landing Page
              </span>
              <span className="text-[9px] font-mono text-fog leading-tight truncate">
                Profil & Bisnis
              </span>
            </button>
          </div>
        </div>

        {/* Section 2: Fitur Utama (Toggleable Multi-Chips) */}
        <div className="space-y-1.5 mb-3">
          <label className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-fog flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>02.</span>
              <span className="text-mist">{lang === 'id' ? 'Kebutuhan Fitur' : 'Key Feature Set'}</span>
            </span>
            <span className="text-[9px] text-fog lowercase">{lang === 'id' ? 'bisa pilih lebih dari satu' : 'multi-select'}</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              const isSelected = selectedFeatures.includes(feat.id);
              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => toggleFeature(feat.id)}
                  className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-sapphire/20 border-sapphire/50 text-pearl shadow-sm'
                      : 'bg-midnight-0/40 border-white/5 text-mist hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-sapphire' : 'text-fog'}`} />
                    <span className="text-[10px] sm:text-[10.5px] font-medium truncate">
                      {lang === 'id' ? feat.nameId : feat.nameEn}
                    </span>
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-md flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-sapphire border-sapphire text-white' : 'border-white/20 bg-transparent'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Target Timeline Pace */}
        <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-midnight-0/60 border border-white/5 mb-3">
          <span className="text-[10px] sm:text-[11px] font-mono text-fog ml-1 flex items-center gap-1.5 shrink-0">
            <Clock className="w-3 h-3 text-mist" />
            <span>{lang === 'id' ? 'Target Pengerjaan:' : 'Pace Target:'}</span>
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPace('sprint')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer ${
                pace === 'sprint'
                  ? 'bg-champagne/20 text-champagne border border-champagne/40 font-semibold'
                  : 'text-fog hover:text-pearl'
              }`}
            >
              {lang === 'id' ? '⚡ Sprint Cepat' : '⚡ Fast Sprint'}
            </button>
            <button
              type="button"
              onClick={() => setPace('standard')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer ${
                pace === 'standard'
                  ? 'bg-sapphire/25 text-sapphire border border-sapphire/40 font-semibold'
                  : 'text-fog hover:text-pearl'
              }`}
            >
              {lang === 'id' ? 'Standar Produksi' : 'Standard'}
            </button>
          </div>
        </div>

        {/* Dynamic Calculation Output Card */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-champagne/25 relative overflow-hidden mb-3">
          <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/5">
            <span className="text-[10px] font-mono text-fog uppercase">
              {lang === 'id' ? 'Hasil Estimasi Spesifikasi' : 'Live Calculated Specification'}
            </span>
            <div className="flex items-center gap-1.5 text-champagne font-mono font-bold text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 text-champagne" />
              <span>~{calculation.minDays} - {calculation.maxDays} {lang === 'id' ? 'Hari Kerja' : 'Business Days'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
            <div>
              <span className="text-[9.5px] font-mono text-fog block">STACK TEKNOLOGI</span>
              <p className="font-semibold text-pearl truncate mt-0.5">{calculation.stack}</p>
            </div>
            <div>
              <span className="text-[9.5px] font-mono text-fog block">POLA ARSITEKTUR</span>
              <p className="font-semibold text-sapphire truncate mt-0.5">{calculation.architecture}</p>
            </div>
          </div>
        </div>

        {/* Action Button: Proceed to Contact Form with Auto-fill */}
        <button
          type="button"
          onClick={handleProceedToContact}
          className="btn-champagne w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,176,39,0.25)] hover:shadow-[0_0_22px_rgba(245,176,39,0.35)] transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-midnight-0" />
          <span>{lang === 'id' ? 'Konsultasikan Spesifikasi Ini' : 'Discuss This Specification'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-midnight-0" />
        </button>

        {/* Toast confirmation */}
        <AnimatePresence>
          {copiedBrief && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[10px] font-mono text-emerald-400 text-center mt-2"
            >
              ✓ {lang === 'id' ? 'Spesifikasi telah diteruskan ke formulir kontak di bawah!' : 'Specification forwarded to contact form below!'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
