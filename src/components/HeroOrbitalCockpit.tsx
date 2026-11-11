import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Activity,
  Trophy,
  Sparkles,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface HeroOrbitalCockpitProps {
  lang: 'id' | 'en';
}

export const HeroOrbitalCockpit: React.FC<HeroOrbitalCockpitProps> = ({ lang }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'stack' | 'metrics' | 'achievements'>('stack');
  const [isHovered, setIsHovered] = useState(false);

  // Parallax subtle tilt (Desktop only, 0% lag)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 14, y: y * 14 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-lg lg:max-w-xl mx-auto relative flex flex-col items-center justify-center p-2 sm:p-4 select-none"
      style={{
        transform: `perspective(1000px) rotateX(${-mouseOffset.y * 0.4}deg) rotateY(${mouseOffset.x * 0.4}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* ── Background Starlight Ambient Halo ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-sapphire/20 via-champagne/15 to-transparent blur-3xl" />
      </div>

      {/* ── Interactive Cockpit Master Glass Console ── */}
      <div className="relative z-10 w-full glass-2 rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-champagne/35 transition-all duration-500 shadow-glass-lg backdrop-blur-md">
        
        {/* Top Cockpit Header: Status Telemetry & Live Ping */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10B981]" />
            <span className="font-mono text-xs font-semibold text-pearl tracking-wider uppercase">
              ARCHITECT CORE // V2.5
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-fog px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
              {lang === 'id' ? 'Aktif • 60 FPS' : 'Live • 60 FPS'}
            </span>
            <div className="w-6 h-6 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
              <Cpu className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Central Visual: Aerospace Orbital Radar HUD (Pure SVG & CSS - Zero WebGL!) */}
        <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-1 overflow-hidden rounded-2xl bg-midnight-0/50 border border-white/5">
          {/* Concentric Orbital Radar Rings */}
          <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-sapphire/20 border-dashed animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-champagne/25 animate-[spin_24s_linear_infinite_reverse]" />
          <div className="absolute w-20 h-20 rounded-full border border-emerald-400/30" />

          {/* Radar Sweep Ray */}
          <div
            className="absolute w-24 sm:w-28 h-24 sm:h-28 rounded-full pointer-events-none opacity-40 animate-[spin_8s_linear_infinite]"
            style={{
              background: 'conic-gradient(from 0deg, rgba(245, 176, 39, 0.4) 0deg, rgba(76, 111, 209, 0.1) 60deg, transparent 90deg)',
            }}
          />

          {/* Central Starlight Node */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-midnight-1/90 border border-champagne/40 shadow-[0_0_25px_rgba(245,176,39,0.25)]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne to-amber-600 flex items-center justify-center text-midnight-0 shadow-[0_0_15px_#F5B027] mb-1.5">
              <Code2 className="w-5 h-5 font-bold" />
            </div>
            <span className="text-[11px] font-bold text-pearl tracking-tight">Full Stack Web</span>
            <span className="text-[9px] font-mono text-champagne">React 19 • Laravel 11</span>
          </div>

          {/* Orbiting Satellite Node 1: Fast Response */}
          <div className="absolute top-3 left-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sapphire/20 border border-sapphire/40 text-[10px] font-mono text-pearl shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sapphire animate-ping" />
            <span>&lt;12ms Latency</span>
          </div>

          {/* Orbiting Satellite Node 2: Production Standard */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-champagne/15 border border-champagne/40 text-[10px] font-mono text-champagne shadow-sm">
            <ShieldCheck className="w-3 h-3 text-champagne" />
            <span>Verified Spec</span>
          </div>
        </div>

        {/* Interactive Telemetry Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-1 rounded-xl bg-midnight-0/60 border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab('stack')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'stack'
                ? 'bg-champagne/20 text-champagne font-semibold border border-champagne/40 shadow-sm'
                : 'text-fog hover:text-pearl'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Stack</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'metrics'
                ? 'bg-sapphire/25 text-sapphire font-semibold border border-sapphire/50 shadow-sm'
                : 'text-fog hover:text-pearl'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>{lang === 'id' ? 'Performa' : 'Metrics'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'achievements'
                ? 'bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/40 shadow-sm'
                : 'text-fog hover:text-pearl'
            }`}
          >
            <Trophy className="w-3 h-3" />
            <span>{lang === 'id' ? 'Prestasi' : 'Awards'}</span>
          </button>
        </div>

        {/* Dynamic Telemetry Metric Cards */}
        <div className="mt-3.5 space-y-2">
          {activeTab === 'stack' && (
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-champagne/30 transition-all">
                <div className="flex items-center justify-between text-[10px] font-mono text-fog">
                  <span>FRONTEND</span>
                  <span className="text-champagne font-semibold">90%</span>
                </div>
                <p className="text-xs font-semibold text-pearl mt-1">JS, TS & React</p>
                <p className="text-[10px] text-mist">Tailwind CSS • UI/UX Design</p>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sapphire/30 transition-all">
                <div className="flex items-center justify-between text-[10px] font-mono text-fog">
                  <span>BACKEND</span>
                  <span className="text-sapphire font-semibold">80%</span>
                </div>
                <p className="text-xs font-semibold text-pearl mt-1">Laravel & PHP</p>
                <p className="text-[10px] text-mist">SQL Database • Git & GitHub</p>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-fog uppercase">Sistem Bisnis</span>
                <p className="text-lg font-bold text-champagne font-mono">1.000+</p>
                <p className="text-[10px] text-mist">Positive Reviews di Zeusx</p>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-fog uppercase">Performa Web</span>
                <p className="text-lg font-bold text-emerald-400 font-mono">99.9%</p>
                <p className="text-[10px] text-mist">Target Uptime & Produksi</p>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-champagne/10 via-amber-500/5 to-transparent border border-champagne/30 text-left flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-champagne text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Grand Finalis TSDN (Top 7)</span>
                </div>
                <p className="text-[11px] text-mist mt-0.5">
                  Turnamen Sains Data Nasional — Data Academy (Des 2024)
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-champagne/20 text-champagne shrink-0 ml-2">
                Nasional
              </span>
            </div>
          )}
        </div>

        {/* Footer Quick Metric Bar */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-fog font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
            <span>SMKN 26 Jakarta SIJA</span>
          </div>
          <span className="text-pearl font-medium">Jakarta, Indonesia</span>
        </div>
      </div>
    </div>
  );
};
