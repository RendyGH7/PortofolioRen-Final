import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Check,
  X,
  Mic,
} from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';

interface ProjectsSectionProps {
  lang: 'id' | 'en';
  onModalOpenChange?: (isOpen: boolean) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang, onModalOpenChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    onModalOpenChange?.(!!activeModalProject);
  }, [activeModalProject, onModalOpenChange]);

  const handleOpenModal = (project: ProjectItem) => {
    setActiveModalProject(project);
  };

  const categories = ['All', 'Web App', 'E-Commerce'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl xl:max-w-7xl mx-auto relative">
      {/* Ambient Celestial Atmospheric Haze */}
      <div className="absolute top-1/3 -left-24 w-96 h-96 rounded-full bg-sapphire/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-champagne/15 blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 relative z-10">
        <div className="text-left">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
            {lang === 'id' ? 'Karya Pilihan' : 'Selected Work'}
          </h2>
        </div>

        {/* Controls: Category Filter Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 glass-1 p-1 sm:p-1.5 rounded-full border border-white/10 shadow-glass-sm overflow-x-auto scrollbar-none flex-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#F5B027] to-[#D98218] text-midnight-0 font-semibold shadow-[0_0_14px_rgba(245,176,39,0.35)]'
                  : 'text-mist hover:text-pearl'
              }`}
            >
              {cat === 'All' && lang === 'id' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase Grid: Balanced 3-Column Luxury Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch relative z-10">
        {filteredProjects.map((project) => {
          const isFeatured = project.id === 'warisara';

          return (
            <div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className="glass-2 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-champagne/40 transition-all duration-500 relative overflow-hidden shadow-glass-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:-translate-y-2 h-full"
            >
              {/* Ambient Accent Radial Glow */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: project.accentColor }}
              />

              <div className="flex flex-col flex-1">
                {/* Visual Showcase Thumbnail (16:10 Cinematic Aspect) */}
                <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 group-hover:border-champagne/40 transition-all bg-midnight-1 shadow-inner mb-4">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-midnight-2 flex items-center justify-center">
                      <Mic className="w-8 h-8 text-sapphire" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-0/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Left Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-2.5 left-2.5 flex items-center">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-champagne/20 border border-champagne/40 text-champagne backdrop-blur-md font-semibold">
                        ✦ {lang === 'id' ? 'Unggulan' : 'Featured'}
                      </span>
                    </div>
                  )}

                  {/* Top-Right Live Demo Indicator */}
                  {project.liveUrl && (
                    <div className="absolute top-2.5 right-2.5 flex items-center">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-midnight-0/85 hover:bg-midnight-0 text-champagne border border-champagne/40 backdrop-blur-md font-semibold flex items-center gap-1 transition-all hover:scale-105 shadow-md"
                        title={lang === 'id' ? 'Buka Web Live' : 'Open Live App'}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Web</span>
                        <ExternalLink className="w-2.5 h-2.5 text-champagne" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Meta Row: Category & Year */}
                <div className="flex items-center justify-between text-xs text-fog mb-2">
                  <span className="font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-mist text-[11px]">
                    {project.category}
                  </span>
                  <span className="font-mono text-fog text-[11px]">{project.year}</span>
                </div>

                {/* Project Title */}
                <h3 className="font-display text-xl sm:text-2xl text-pearl font-normal group-hover:text-champagne transition-colors">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p
                  className="text-xs font-medium mt-1 mb-2.5 tracking-wide line-clamp-1"
                  style={{ color: project.accentColor }}
                >
                  {project.subtitle}
                </p>

                {/* Concise, Elegant, Professional Description */}
                <p className="text-xs text-mist leading-relaxed line-clamp-2 min-h-[36px]">
                  {project.summary}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3.5 mb-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-mist/90 border border-white/5 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3.5 mt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-champagne text-midnight-0 hover:bg-champagne-light transition-all shadow-glass-sm flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>{lang === 'id' ? 'Buka Web' : 'Live App'}</span>
                    <ExternalLink className="w-3 h-3 text-midnight-0" />
                  </a>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  onClick={() => handleOpenModal(project)}
                  className="text-xs text-mist hover:text-champagne font-medium flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-white/5 ml-auto"
                >
                  <span>{lang === 'id' ? 'Detail Studi' : 'Case Study'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Study Modal (Glass 3) rendered via createPortal so it is always at top-level body */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeModalProject && (
              <motion.div
                key="case-study-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-midnight-0/85 backdrop-blur-md"
                onClick={() => setActiveModalProject(null)}
                onKeyDown={(e) => e.key === 'Escape' && setActiveModalProject(null)}
                tabIndex={0}
              >
            <motion.div
              key="case-study-dialog"
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-3 rounded-2xl p-4 sm:p-6 space-y-3.5 sm:space-y-4 text-left relative shadow-glass-lg border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-champagne/10 text-champagne border border-champagne/25">
                    {activeModalProject.category}
                  </span>
                  <span className="text-xs text-fog font-mono">• {activeModalProject.year}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-pearl font-normal">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs text-mist leading-relaxed">
                  {activeModalProject.subtitle} • <span className="text-pearl/80 font-medium">Peran: {activeModalProject.role}</span>
                </p>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1.5 rounded-full glass-1 text-mist hover:text-pearl transition-colors shrink-0 ml-2"
                aria-label="Tutup Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Showcase Illustration / Mockup */}
            {activeModalProject.imageUrl ? (
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-glass-md bg-midnight-1">
                <img
                  src={activeModalProject.imageUrl}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-0/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-pearl">
                  <span className="bg-midnight-1/90 backdrop-blur-sm px-2 py-0.5 rounded border border-white/15">
                    Showcase Multi-Device
                  </span>
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-champagne text-midnight-0 font-semibold px-2.5 py-1 rounded flex items-center gap-1 hover:brightness-110 transition-all shadow-sm"
                    >
                      <span>Kunjungi Web</span>
                      <ExternalLink className="w-3 h-3 text-midnight-0" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-glass-md bg-gradient-to-br from-sapphire/25 via-midnight-1 to-midnight-2 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-sapphire/30 border border-sapphire/50 flex items-center justify-center text-pearl shadow-[0_0_24px_rgba(76,111,209,0.4)] mb-2.5">
                  <Mic className="w-6 h-6 text-sapphire" />
                </div>
                <h4 className="font-display text-base font-semibold text-pearl">Monetra AI & Voice DSP Engine</h4>
                <p className="text-xs text-mist max-w-md mt-1">
                  Pencatatan keuangan cerdas lewat suara dengan Gemini AI, Web Audio DSP, dan Aturan 50/30/20.
                </p>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-pearl">
                  <span className="bg-midnight-1/90 backdrop-blur-sm px-2 py-0.5 rounded border border-white/15">
                    Live Production Web App
                  </span>
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-sapphire text-pearl font-semibold px-2.5 py-1 rounded flex items-center gap-1 hover:brightness-110 transition-all shadow-sm"
                    >
                      <span>Kunjungi Web</span>
                      <ExternalLink className="w-3 h-3 text-pearl" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Key Metrics Row */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl glass-1 border border-white/5">
              {activeModalProject.metrics.map((m) => (
                <div key={m.label} className="text-center sm:text-left px-2 py-0.5">
                  <span className="font-mono text-lg sm:text-xl font-bold text-champagne block">
                    {m.value}
                  </span>
                  <span className="text-[11px] text-mist">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Ringkasan & Fitur Proyek */}
            <div className="space-y-3.5">
              {/* Tantangan & Solusi Teknis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="glass-1 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[11px] font-semibold text-champagne uppercase tracking-wider block">
                    Tantangan
                  </span>
                  <p className="text-xs text-mist leading-relaxed">{activeModalProject.problem}</p>
                </div>
                <div className="glass-1 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[11px] font-semibold text-sapphire uppercase tracking-wider block">
                    Solusi Teknis
                  </span>
                  <p className="text-xs text-mist leading-relaxed">{activeModalProject.solution}</p>
                </div>
              </div>

              {/* Fitur Utama Sistem (Clean 2x2 Grid) */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-semibold text-fog uppercase tracking-wider">
                  Fitur Utama Sistem
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalProject.features.map((feat) => (
                    <div
                      key={feat.title}
                      className="glass-1 p-3 rounded-xl border border-white/5 flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-md bg-champagne/10 text-champagne flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-champagne" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-medium text-pearl block truncate">
                          {feat.title}
                        </span>
                        <p className="text-[11px] text-mist leading-relaxed mt-0.5">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-champagne px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-midnight-0" />
                    <span>Kunjungi Website</span>
                  </a>
                )}
                <a
                  href={activeModalProject.githubUrl || 'https://github.com/RendyGH7'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg glass-2 hover:border-champagne/40 text-xs font-semibold text-pearl flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-pearl" />
                  <span>Lihat di GitHub</span>
                </a>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-3.5 py-1.5 rounded-lg glass-1 text-xs text-mist hover:text-pearl transition-colors"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )}
    </section>
  );
};
