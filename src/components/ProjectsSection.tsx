import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Code2,
  Workflow,
  CheckCircle2,
  Copy,
  Check,
  X,
  LayoutGrid,
  List,
  Mic,
} from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';

interface ProjectsSectionProps {
  lang: 'id' | 'en';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['All', 'E-Commerce', 'Web App'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Ambient Celestial Atmospheric Haze */}
      <div className="absolute top-1/3 -left-24 w-96 h-96 rounded-full bg-sapphire/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-champagne/15 blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 relative z-10">
        <div className="text-left space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
            {lang === 'id' ? 'Karya Pilihan' : 'Selected Work'}
          </h2>
          <p className="text-mist text-xs sm:text-sm max-w-xl">
            {lang === 'id'
              ? 'Aplikasi web dan platform nyata dengan arsitektur teruji, performa instan, dan skala transaksi produksi.'
              : 'Production web apps and platforms backed by verified architecture, instant performance, and production scale.'}
          </p>
        </div>

        {/* Controls: Category Filter Pills + View Mode */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 glass-1 p-1.5 rounded-full border border-white/10 shadow-glass-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#F5B027] to-[#D98218] text-midnight-0 font-semibold shadow-[0_0_14px_rgba(245,176,39,0.35)]'
                    : 'text-mist hover:text-pearl'
                }`}
              >
                {cat === 'All' && lang === 'id' ? 'Semua' : cat}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1 glass-1 p-1.5 rounded-full border border-white/10 shadow-glass-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-white/15 text-pearl' : 'text-fog hover:text-pearl'
              }`}
              aria-label="Tampilan Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-white/15 text-pearl' : 'text-fog hover:text-pearl'
              }`}
              aria-label="Tampilan List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid / List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative z-10">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className={`glass-2 rounded-3xl p-6 sm:p-7 flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-champagne/40 transition-all duration-500 relative overflow-hidden shadow-glass-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:-translate-y-2 ${
                idx === 1 ? 'md:translate-y-6' : ''
              }`}
            >
              {/* Subtle accent glow */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Project Showcase Illustration Thumbnail */}
              {project.imageUrl ? (
                <div className="relative w-full aspect-[16/9] mb-5 rounded-2xl overflow-hidden border border-white/10 group-hover:border-champagne/40 transition-all bg-midnight-1 shadow-inner">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-0/70 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="relative w-full aspect-[16/9] mb-5 rounded-2xl overflow-hidden border border-white/10 group-hover:border-sapphire/45 transition-all bg-gradient-to-br from-sapphire/20 via-midnight-1 to-midnight-2 flex flex-col items-center justify-center p-6 group shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(76,111,209,0.3),transparent_70%)]" />
                  
                  {/* High-Tech Animated Waveform Visualizer for Monetra Voice DSP */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <div className="flex items-center gap-1.5 h-10 px-4 py-2 rounded-full glass-3 border border-sapphire/40 shadow-[0_0_20px_rgba(76,111,209,0.3)]">
                      <Mic className="w-4 h-4 text-sapphire mr-1 shrink-0 animate-pulse" />
                      <div className="w-1 bg-[#4C6FD1] rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-4" />
                      <div className="w-1 bg-[#60A5FA] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-6" />
                      <div className="w-1 bg-[#93C5FD] rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-8" />
                      <div className="w-1 bg-[#F5B027] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-5" />
                      <div className="w-1 bg-[#10B981] rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-3" />
                    </div>

                    <div>
                      <span className="font-display font-semibold text-pearl text-sm tracking-wide block">
                        Monetra AI & Voice DSP Engine
                      </span>
                      <span className="font-mono text-[10px] text-fog mt-0.5 block">
                        Voice-to-Transaction • Gemini 2.5 Flash • 50/30/20 Rule
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs text-fog mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-mist text-[11px]">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-mono text-fog text-[11px]">{project.year}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-pearl font-normal group-hover:text-champagne transition-colors">
                  {project.title}
                </h3>
                <p
                  className="text-xs font-medium mt-1 mb-2.5"
                  style={{ color: project.accentColor }}
                >
                  {project.subtitle}
                </p>

                <p className="text-xs text-mist leading-relaxed line-clamp-2">
                  {project.summary}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 my-5 pt-3.5 border-t border-white/10">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col">
                      <span className="font-mono text-base font-bold text-pearl group-hover:text-champagne transition-colors">
                        {metric.value}
                      </span>
                      <span className="text-[10px] text-fog truncate">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Footer Tags & CTA */}
              <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-mist border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-champagne font-medium flex items-center gap-1 group-hover:underline">
                  <span>{lang === 'id' ? 'Detail Studi' : 'Case Study'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="glass-1 hover:glass-2 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-champagne/30 transition-all"
            >
              <div className="flex items-center gap-3.5">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-16 h-11 object-cover rounded-md border border-white/10 shrink-0 hidden xs:block"
                    loading="lazy"
                  />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl text-pearl">{project.title}</h3>
                    <span className="text-[11px] font-mono text-champagne bg-champagne/10 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-mist">{project.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-fog self-end sm:self-center">
                <span>{project.year}</span>
                <span className="text-champagne font-sans font-medium flex items-center gap-1">
                  <span>Lihat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case Study Modal (Glass 3) */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            key="case-study-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-midnight-0/80 backdrop-blur-md"
            onClick={() => setActiveModalProject(null)}
            onKeyDown={(e) => e.key === 'Escape' && setActiveModalProject(null)}
            tabIndex={0}
          >
            <motion.div
              key="case-study-dialog"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-3 rounded-2xl p-6 sm:p-8 space-y-6 text-left relative shadow-glass-lg"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-champagne uppercase tracking-wider block mb-1">
                  {activeModalProject.category} • {activeModalProject.year}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
                  {activeModalProject.title}
                </h3>
                <p
                  className="text-xs font-medium mt-1"
                  style={{ color: activeModalProject.accentColor }}
                >
                  {activeModalProject.subtitle} • Peran: {activeModalProject.role}
                </p>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-full glass-1 text-mist hover:text-pearl focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
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
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-pearl">
                  <span className="bg-midnight-1/90 backdrop-blur-sm px-2.5 py-1 rounded border border-white/15">
                    Showcase Multi-Device (Desktop • Tablet • Mobile)
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
                <div className="w-14 h-14 rounded-2xl bg-sapphire/30 border border-sapphire/50 flex items-center justify-center text-pearl shadow-[0_0_24px_rgba(76,111,209,0.4)] mb-3">
                  <Mic className="w-7 h-7 text-sapphire" />
                </div>
                <h4 className="font-display text-lg font-semibold text-pearl">Monetra AI & Voice DSP Engine</h4>
                <p className="text-xs text-mist max-w-md mt-1">
                  Pencatatan keuangan cerdas secepat berbicara dengan Google Gemini 2.5 Flash, Web Audio DSP, dan Aturan 50/30/20.
                </p>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-pearl">
                  <span className="bg-midnight-1/90 backdrop-blur-sm px-2.5 py-1 rounded border border-white/15">
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

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl glass-1 border border-white/5">
              {activeModalProject.metrics.map((m) => (
                <div key={m.label} className="text-center sm:text-left">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-champagne block">
                    {m.value}
                  </span>
                  <span className="text-xs text-mist">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Problem & Solution (C-3, R-02 compliant) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-1 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-xs font-semibold text-pearl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-warning" />
                  <span>Konteks & Tantangan</span>
                </span>
                <p className="text-xs text-mist leading-relaxed">{activeModalProject.problem}</p>
              </div>
              <div className="glass-1 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-xs font-semibold text-pearl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                  <span>Solusi Teknis</span>
                </span>
                <p className="text-xs text-mist leading-relaxed">{activeModalProject.solution}</p>
              </div>
            </div>

            {/* Features Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-pearl uppercase tracking-wider">
                Fitur Utama Sistem
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalProject.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-mist">
                    <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Architecture Flow */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-sapphire" />
                <h4 className="text-xs font-semibold text-pearl uppercase tracking-wider">
                  Alur Arsitektur Sistem
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {activeModalProject.architectureNodes.map((node, i) => (
                  <div
                    key={node.name}
                    className="glass-1 p-3 rounded-lg border border-white/5 relative"
                  >
                    <span className="text-[10px] font-mono text-fog block">Node 0{i + 1}</span>
                    <span className="text-xs font-medium text-pearl block mt-0.5">
                      {node.name}
                    </span>
                    <span className="text-[11px] text-mist block">{node.role}</span>
                    {node.latency && (
                      <span className="text-[10px] font-mono text-champagne mt-1 block">
                        Latensi: {node.latency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Code Snippet with Copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-champagne" />
                  <h4 className="text-xs font-semibold text-pearl uppercase tracking-wider">
                    Cuplikan Logika Teknis
                  </h4>
                </div>
                <button
                  onClick={() => handleCopyCode(activeModalProject.codeSnippet)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-mist hover:text-pearl font-mono transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-status-success" />
                      <span className="text-status-success">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-lg bg-midnight-0/95 border border-white/10 p-4 font-mono text-xs text-mist overflow-x-auto">
                <pre>{activeModalProject.codeSnippet}</pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-champagne px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4 text-midnight-0" />
                    <span>Kunjungi Website</span>
                  </a>
                )}
                <a
                  href={activeModalProject.githubUrl || 'https://github.com/RendyGH7'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md glass-2 hover:border-champagne/40 text-xs font-semibold text-pearl flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-pearl" />
                  <span>Lihat di GitHub</span>
                </a>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-md glass-1 text-xs text-mist hover:text-pearl transition-colors"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </section>
  );
};
