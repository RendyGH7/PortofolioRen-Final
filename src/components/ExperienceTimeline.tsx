import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Award,
  GraduationCap,
  Calendar,
  MapPin,
  Trophy,
  CheckCircle2,
  ShoppingBag,
  Code2,
  Server,
  Users,
  Sparkles,
} from 'lucide-react';
import { EXPERIENCES, AWARDS, PERSONAL_DATA, SOFT_SKILLS } from '../data/portfolioData';

interface ExperienceTimelineProps {
  lang: 'id' | 'en';
}

function renderHighlightIcon(highlight: string, isNationalAward: boolean) {
  if (highlight.includes('1.000+')) {
    return <ShoppingBag className="w-3.5 h-3.5 text-champagne shrink-0" />;
  }
  if (isNationalAward || highlight.includes('Top 7') || highlight.includes('Nasional')) {
    return <Trophy className="w-3.5 h-3.5 text-champagne shrink-0" />;
  }
  if (highlight.includes('Enterprise') || highlight.includes('PT') || highlight.includes('Tim') || highlight.includes('Pengembangan')) {
    return <Code2 className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0" />;
  }
  if (highlight.includes('Klien') || highlight.includes('UMKM') || highlight.includes('Startup') || highlight.includes('Delivery') || highlight.includes('Contract')) {
    return <Briefcase className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0" />;
  }
  if (highlight.includes('Siswa') || highlight.includes('Membina') || highlight.includes('Mentor')) {
    return <Users className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0" />;
  }
  return <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0" />;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'awards' | 'education'>('experience');

  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 text-left">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal tracking-tight">
            {lang === 'id' ? 'Pengalaman & Rekam Jejak' : 'Experience & Track Record'}
          </h2>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 glass-1 p-1 sm:p-1.5 rounded-full self-start sm:self-auto border border-white/10 shadow-glass-sm max-w-full overflow-x-auto scrollbar-none flex-nowrap">
          <button
            onClick={() => setActiveTab('experience')}
            className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-[#F5B027] to-[#D98218] text-midnight-0 font-semibold shadow-[0_0_16px_rgba(245,176,39,0.35)]'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Pengalaman' : 'Experience'}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
              activeTab === 'experience' ? 'bg-midnight-0/20 text-midnight-0' : 'bg-white/10 text-mist'
            }`}>
              {EXPERIENCES.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('awards')}
            className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'awards'
                ? 'bg-gradient-to-r from-[#F5B027] to-[#D98218] text-midnight-0 font-semibold shadow-[0_0_16px_rgba(245,176,39,0.35)]'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Penghargaan' : 'Awards'}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
              activeTab === 'awards' ? 'bg-midnight-0/20 text-midnight-0' : 'bg-white/10 text-mist'
            }`}>
              {AWARDS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'education'
                ? 'bg-gradient-to-r from-[#F5B027] to-[#D98218] text-midnight-0 font-semibold shadow-[0_0_16px_rgba(245,176,39,0.35)]'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Edukasi' : 'Education'}</span>
          </button>
        </div>
      </div>

      {/* Tab Content with Fluid Unboxed Timeline Layout */}
      <AnimatePresence mode="wait">
        {activeTab === 'experience' && (
          <motion.div
            key="tab-experience"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <div className="space-y-1">
              {EXPERIENCES.map((exp, index) => {
                const isCurrent = exp.period.toLowerCase().includes('sekarang');
                const isNationalAward = exp.id === 'exp-tsdn';

                return (
                  <div key={exp.id} className="relative flex gap-3 sm:gap-6 group">
                    {/* Left Column: Timeline Spine & Luminous Milestone Node */}
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
                          isNationalAward
                            ? 'bg-midnight-0 border-2 border-champagne text-champagne shadow-[0_0_18px_rgba(245,176,39,0.45)] group-hover:scale-110'
                            : isCurrent
                            ? 'bg-midnight-0 border-2 border-champagne/80 text-champagne shadow-[0_0_14px_rgba(245,176,39,0.25)] group-hover:scale-110'
                            : 'bg-midnight-0 border-2 border-sapphire/70 text-sapphire shadow-[0_0_12px_rgba(76,111,209,0.25)] group-hover:border-sapphire group-hover:scale-110'
                        }`}
                      >
                        {isNationalAward ? (
                          <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne" />
                        ) : isCurrent ? (
                          <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne" />
                        ) : (
                          <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sapphire" />
                        )}
                      </div>

                      {/* Continuous Spine Line */}
                      {index !== EXPERIENCES.length - 1 && (
                        <div className="w-[2px] flex-1 my-2 bg-gradient-to-b from-white/15 via-white/8 to-white/5 group-hover:from-champagne/40 group-hover:via-sapphire/30 group-hover:to-white/10 transition-colors" />
                      )}
                    </div>

                    {/* Right Column: Unboxed Milestone Content */}
                    <div className="flex-1 pb-8 sm:pb-10 transition-all">
                      <div className="rounded-2xl p-3.5 sm:p-6 -mt-1 transition-all duration-300 group-hover:bg-white/[0.025] border border-transparent group-hover:border-white/[0.08]">
                        {/* Meta Header: Role Category Pill + Period & Location */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                                isNationalAward
                                  ? 'text-champagne bg-champagne/10 border-champagne/30'
                                  : 'text-sapphire bg-sapphire/10 border-sapphire/30'
                              }`}
                            >
                              {exp.type}
                            </span>

                            {isCurrent && (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-champagne bg-champagne/10 px-2.5 py-0.5 rounded-full border border-champagne/25 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
                                <span>{lang === 'id' ? 'Aktif' : 'Active'}</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs font-mono text-fog">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-mist" />
                              <span>{exp.period}</span>
                            </span>
                            <span className="hidden xs:flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-mist" />
                              <span>{exp.location}</span>
                            </span>
                          </div>
                        </div>

                        {/* Title & Organization */}
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl text-pearl font-normal group-hover:text-champagne transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-sapphire mt-0.5 flex items-center gap-1.5">
                            <span>{exp.organization}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-sapphire/80" />
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-[13px] text-mist leading-relaxed my-3 max-w-3xl">
                          {exp.description}
                        </p>

                        {/* Bottom Row: Technologies + Standout Highlight Metric */}
                        <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] text-mist border border-white/[0.06] group-hover:border-white/10 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {exp.highlight && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all text-champagne bg-champagne/15 border-champagne/40 shadow-sm">
                              {renderHighlightIcon(exp.highlight, isNationalAward)}
                              <span>{exp.highlight}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'awards' && (
          <motion.div
            key="tab-awards"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left"
          >
            {AWARDS.map((award) => {
              const isGrandFinalist = award.id === 'award-1';

              return (
                <div
                  key={award.id}
                  className={`rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group border ${
                    isGrandFinalist
                      ? 'bg-gradient-to-br from-champagne/10 via-white/[0.02] to-transparent border-champagne/30 shadow-[0_0_24px_rgba(245,176,39,0.12)]'
                      : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.08] hover:border-sapphire/35'
                  }`}
                >
                  {/* Subtle Top-Right Ambient Glow */}
                  {isGrandFinalist && (
                    <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-champagne/20 blur-[60px] pointer-events-none group-hover:bg-champagne/30 transition-colors" />
                  )}

                  {/* Header: Level Pill & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                        isGrandFinalist
                          ? 'text-champagne bg-champagne/15 border-champagne/35'
                          : 'text-sapphire bg-sapphire/15 border-sapphire/30'
                      }`}
                    >
                      {isGrandFinalist ? (
                        <Trophy className="w-3 h-3 text-champagne" />
                      ) : (
                        <Award className="w-3 h-3 text-sapphire" />
                      )}
                      <span>{award.level}</span>
                    </span>

                    <span className="text-xs font-mono text-fog">{award.date}</span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-pearl font-normal group-hover:text-champagne transition-colors">
                      {award.title}
                    </h3>
                    <p className="text-xs text-sapphire font-medium mt-1 flex items-center gap-1">
                      <span>{award.issuer}</span>
                      <CheckCircle2 className="w-3 h-3 text-sapphire/80" />
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-mist leading-relaxed mt-3 pt-3 border-t border-white/[0.06]">
                    {award.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'education' && (
          <motion.div
            key="tab-education"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-left space-y-6"
          >
            {/* Top Academic Banner */}
            <div className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-sapphire/15 via-white/[0.02] to-transparent relative overflow-hidden group">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-sapphire/20 blur-[80px] pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-champagne/10 border border-champagne/30 text-[10px] font-mono text-champagne uppercase tracking-wider mb-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Pendidikan Formal Kejuruan • Program Unggulan 4 Tahun</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-pearl font-normal">
                    {PERSONAL_DATA.education.school}
                  </h3>
                  <p className="text-sm font-medium text-sapphire flex items-center gap-1.5">
                    <span>{PERSONAL_DATA.education.major}</span>
                    <CheckCircle2 className="w-4 h-4 text-sapphire" />
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="font-mono text-xs text-pearl bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    {PERSONAL_DATA.education.period}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-champagne bg-champagne/10 border border-champagne/25 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 mt-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
                    <span>Siswa Aktif</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-mist leading-relaxed mt-4 pt-4 border-t border-white/[0.08] max-w-3xl">
                {PERSONAL_DATA.education.note}
              </p>
            </div>

            {/* 3 Core Competency Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl p-5 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-sapphire/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-sapphire/20 border border-sapphire/35 flex items-center justify-center text-sapphire mb-3 group-hover:scale-105 transition-transform">
                  <Code2 className="w-5 h-5 text-sapphire" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-fog block">
                  Pilar Utama 01
                </span>
                <h4 className="font-display text-base text-pearl font-normal mt-0.5">
                  Software Engineering
                </h4>
                <p className="text-xs text-mist leading-relaxed mt-2">
                  Pengembangan aplikasi modern dengan React 19, TypeScript, Laravel REST API, database relasional PostgreSQL, dan arsitektur modular.
                </p>
              </div>

              <div className="rounded-xl p-5 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-champagne/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-champagne/20 border border-champagne/35 flex items-center justify-center text-champagne mb-3 group-hover:scale-105 transition-transform">
                  <Server className="w-5 h-5 text-champagne" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-fog block">
                  Pilar Utama 02
                </span>
                <h4 className="font-display text-base text-pearl font-normal mt-0.5">
                  Jaringan & Cloud Server
                </h4>
                <p className="text-xs text-mist leading-relaxed mt-2">
                  Konfigurasi Linux Server, switching & routing jaringan, containerization Docker, dan fundamental implementasi cloud infrastructure.
                </p>
              </div>

              <div className="rounded-xl p-5 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-sapphire/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-sapphire/20 border border-sapphire/35 flex items-center justify-center text-sapphire mb-3 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5 text-sapphire" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-fog block">
                  Pilar Utama 03
                </span>
                <h4 className="font-display text-base text-pearl font-normal mt-0.5">
                  Leadership & Mentorship
                </h4>
                <p className="text-xs text-mist leading-relaxed mt-2">
                  Membina 40+ siswa di IT Club SMKN 26 Jakarta dalam fundamental komputasi awan, konfigurasi lingkungan dev, dan budaya kolaborasi Git.
                </p>
              </div>
            </div>

            {/* Soft Skills & Core Attributes from Updated CV */}
            <div className="rounded-2xl p-5 sm:p-6 border border-white/10 bg-white/[0.02] mt-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-champagne" />
                  <h4 className="font-display text-base text-pearl font-normal">
                    {lang === 'id' ? 'Karakter & Soft Skill Profesional' : 'Professional Soft Skills & Mindset'}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-fog px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
                  {lang === 'id' ? 'Kompetensi Sikap & Kolaborasi' : 'Collaboration & Work Ethic'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {SOFT_SKILLS.map((skill) => (
                  <div key={skill.name} className="p-3 rounded-xl bg-midnight-0/50 border border-white/10 flex flex-col justify-between">
                    <span className="text-xs font-medium text-pearl">{skill.name}</span>
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-champagne to-amber-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-champagne shrink-0">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Aspirasi, Hobi & Penguasaan Bahasa */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs text-mist">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-fog uppercase text-[10px] shrink-0">Aspirasi:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {PERSONAL_DATA.aspirations.map((asp) => (
                      <span key={asp} className="px-2 py-0.5 rounded-md bg-champagne/10 border border-champagne/25 text-champagne text-[11px] font-medium">
                        {asp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-fog uppercase text-[10px] shrink-0">Hobi:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {PERSONAL_DATA.hobbies.map((h) => (
                      <span key={h} className="px-2 py-0.5 rounded-md bg-sapphire/15 border border-sapphire/30 text-pearl text-[11px]">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-fog uppercase text-[10px] shrink-0">Bahasa:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {PERSONAL_DATA.languages.map((l) => (
                      <span key={l.name} className="text-pearl text-[11px]">
                        {l.name} <span className="font-mono text-champagne font-semibold">({l.pct}%)</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
