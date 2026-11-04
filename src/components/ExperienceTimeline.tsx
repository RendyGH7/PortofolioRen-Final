import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Award, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCES, AWARDS, PERSONAL_DATA } from '../data/portfolioData';

interface ExperienceTimelineProps {
  lang: 'id' | 'en';
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'awards' | 'education'>('experience');

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 text-left">
        <div className="space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl text-pearl font-normal">
            {lang === 'id' ? 'Pengalaman & Rekam Jejak' : 'Experience & Track Record'}
          </h2>
          <p className="text-mist text-xs sm:text-sm">
            {lang === 'id'
              ? 'Perjalanan karir, peran kepemimpinan, dan penghargaan terverifikasi.'
              : 'Professional journey, leadership roles, and verified achievements.'}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 glass-1 p-1 rounded-full self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'experience'
                ? 'bg-champagne text-midnight-0 font-semibold'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Pengalaman' : 'Experience'}</span>
          </button>
          <button
            onClick={() => setActiveTab('awards')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'awards'
                ? 'bg-champagne text-midnight-0 font-semibold'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Penghargaan' : 'Awards'}</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 ${
              activeTab === 'education'
                ? 'bg-champagne text-midnight-0 font-semibold'
                : 'text-mist hover:text-pearl'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Edukasi' : 'Education'}</span>
          </button>
        </div>
      </div>

      {/* Tab Content with Smooth Transitions */}
      <AnimatePresence mode="wait">
        {activeTab === 'experience' && (
          <motion.div
            key="tab-experience"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 text-left"
          >
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="glass-2 rounded-xl p-6 relative border border-white/5 hover:border-champagne/30 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <span className="text-xs font-mono text-champagne uppercase tracking-wider block">
                      {exp.type}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-pearl font-normal group-hover:text-champagne transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-semibold text-sapphire mt-0.5">{exp.organization}</p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end text-xs font-mono text-fog gap-2 sm:gap-1 mt-1 sm:mt-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-mist leading-relaxed my-3">{exp.description}</p>

                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-mist"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {exp.highlight && (
                    <span className="text-[11px] font-mono font-medium text-status-success bg-status-success/15 px-2.5 py-0.5 rounded-full border border-status-success/30 shadow-[0_0_10px_rgba(0,220,130,0.15)]">
                      {exp.highlight}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'awards' && (
          <motion.div
            key="tab-awards"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left"
          >
            {AWARDS.map((award) => (
              <div
                key={award.id}
                className="glass-2 rounded-xl p-6 border border-white/5 hover:border-champagne/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sapphire bg-sapphire/15 px-2 py-0.5 rounded border border-sapphire/20">
                    {award.level}
                  </span>
                  <span className="text-xs font-mono text-fog">{award.date}</span>
                </div>

                <div>
                  <h3 className="font-display text-xl text-pearl font-normal">{award.title}</h3>
                  <p className="text-xs text-champagne font-medium mt-0.5">{award.issuer}</p>
                </div>

                <p className="text-xs text-mist leading-relaxed">{award.description}</p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'education' && (
          <motion.div
            key="tab-education"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="glass-2 rounded-xl p-6 text-left border border-white/5 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-champagne uppercase tracking-wider block">
                  Pendidikan Formal Kejuruan
                </span>
                <h3 className="font-display text-2xl text-pearl font-normal mt-1">
                  {PERSONAL_DATA.education.school}
                </h3>
                <p className="text-xs font-medium text-sapphire mt-0.5">
                  {PERSONAL_DATA.education.major}
                </p>
              </div>
              <span className="font-mono text-xs text-fog bg-white/5 px-3 py-1 rounded-full w-fit">
                {PERSONAL_DATA.education.period}
              </span>
            </div>

            <p className="text-xs text-mist leading-relaxed pt-2 border-t border-white/5">
              {PERSONAL_DATA.education.note}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="glass-1 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-fog block">Kurikulum Terapan</span>
                <span className="text-xs text-pearl font-medium mt-0.5 block">
                  Software & Web Engineering
                </span>
              </div>
              <div className="glass-1 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-fog block">Jaringan Komputer</span>
                <span className="text-xs text-pearl font-medium mt-0.5 block">
                  Routing, Switching, & Linux Server
                </span>
              </div>
              <div className="glass-1 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-fog block">Mentorship</span>
                <span className="text-xs text-pearl font-medium mt-0.5 block">
                  Cloud Computing Club Mentor
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
