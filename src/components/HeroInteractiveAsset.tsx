import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Layers,
  Database,
  Network,
  Sparkles,
  Radio,
  Zap,
  RotateCw,
  Terminal,
} from 'lucide-react';

interface HeroInteractiveAssetProps {
  lang: 'id' | 'en';
}

interface OrbitalNode {
  id: string;
  code: string;
  titleId: string;
  titleEn: string;
  techId: string;
  techEn: string;
  badgeId: string;
  badgeEn: string;
  icon: React.ElementType;
  color: string;
  accentGlow: string;
  latency: string;
  metrics: { label: string; val: string }[];
}

const NODES: OrbitalNode[] = [
  {
    id: 'frontend',
    code: 'MOD-01 // FRONTEND',
    titleId: 'Arsitektur Antarmuka & UX Presisi',
    titleEn: 'UI Architecture & High Precision UX',
    techId: 'React 19 • TypeScript • Tailwind CSS • Framer Motion',
    techEn: 'React 19 • TypeScript • Tailwind CSS • Framer Motion',
    badgeId: 'Antarmuka Cepat & Responsif',
    badgeEn: 'Ultra-Fast & Responsive UI',
    icon: Layers,
    color: '#60A5FA',
    accentGlow: 'rgba(96, 165, 250, 0.45)',
    latency: '8ms',
    metrics: [
      { label: 'FID Latency', val: '< 12ms' },
      { label: 'Frame Rate', val: '60-120 FPS' },
      { label: 'Rendering', val: 'Vite & SSR' },
    ],
  },
  {
    id: 'backend',
    code: 'MOD-02 // BACKEND & API',
    titleId: 'Core Server, REST API & Database',
    titleEn: 'Core Server, REST API & Database',
    techId: 'Laravel 11 • PHP 8.3 • PostgreSQL • MySQL • Redis',
    techEn: 'Laravel 11 • PHP 8.3 • PostgreSQL • MySQL • Redis',
    badgeId: 'Arsitektur Bersih & Andal',
    badgeEn: 'Clean Architecture & Reliable',
    icon: Database,
    color: '#F5B027',
    accentGlow: 'rgba(245, 176, 39, 0.45)',
    latency: '14ms',
    metrics: [
      { label: 'Database', val: 'ACID Safe' },
      { label: 'API Pattern', val: 'Decoupled REST' },
      { label: 'Security', val: 'JWT & Sanity' },
    ],
  },
  {
    id: 'cloud',
    code: 'MOD-03 // INFRASTRUKTUR',
    titleId: 'Jaringan, SIJA SMKN 26 & Cloud Ops',
    titleEn: 'Networking, SIJA SMKN 26 & Cloud Ops',
    techId: 'Linux Server • Docker • Nginx • Cloud Mentor IT Club',
    techEn: 'Linux Server • Docker • Nginx • Cloud Mentor IT Club',
    badgeId: 'Keandalan Server & DevOps',
    badgeEn: 'Server Reliability & DevOps',
    icon: Network,
    color: '#22D3EE',
    accentGlow: 'rgba(34, 211, 238, 0.45)',
    latency: '11ms',
    metrics: [
      { label: 'Spesialisasi', val: 'SIJA 4 Tahun' },
      { label: 'Peran', val: 'Cloud Mentor' },
      { label: 'Deploy', val: 'Edge & CI/CD' },
    ],
  },
  {
    id: 'datascience',
    code: 'MOD-04 // PREDICTIVE AI',
    titleId: 'Sains Data & Prediksi Cerdas (TSDN)',
    titleEn: 'Data Science & Predictive ML (TSDN)',
    techId: 'Python • Scikit-Learn • Pandas • Data Modeling',
    techEn: 'Python • Scikit-Learn • Pandas • Data Modeling',
    badgeId: 'Top 7 Finalis Nasional TSDN',
    badgeEn: 'Top 7 National Finalist TSDN',
    icon: Sparkles,
    color: '#34D399',
    accentGlow: 'rgba(52, 211, 153, 0.45)',
    latency: '19ms',
    metrics: [
      { label: 'Prestasi', val: 'Top 7 TSDN' },
      { label: 'Modeling', val: 'ML Predictive' },
      { label: 'Penyelenggara', val: 'Data Academy' },
    ],
  },
];

type SpectrumMode = 'amber' | 'sapphire' | 'emerald';
type SpeedMode = 0.8 | 2.0 | 4.0;

export const HeroInteractiveAsset: React.FC<HeroInteractiveAssetProps> = ({ lang }) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<SpeedMode>(2.0);
  const [isPaused, setIsPaused] = useState(false);
  const [spectrum, setSpectrum] = useState<SpectrumMode>('amber');
  const [isRadarScanning, setIsRadarScanning] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<{ isDragging: boolean; startX: number; startAngle: number }>({
    isDragging: false,
    startX: 0,
    startAngle: 0,
  });

  // Spark particle burst pool (2D Canvas for instantaneous 60fps micro-interaction)
  const sparksRef = useRef<{ x: number; y: number; vx: number; vy: number; alpha: number; color: string }[]>([]);

  const triggerSparks = useCallback((clientX?: number, clientY?: number, color = '#F5B027') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const originX = clientX !== undefined ? clientX - rect.left : canvas.width / 2;
    const originY = clientY !== undefined ? clientY - rect.top : canvas.height / 2;

    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 1.2;
      sparksRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
      });
    }
  }, []);

  // Continuous smooth 2D orbit loop
  useEffect(() => {
    const animRef = { id: 0 };
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      animRef.id = requestAnimationFrame(loop);
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isPaused && !dragRef.current.isDragging) {
        setOrbitAngle((prev) => (prev + delta * 24 * speedMultiplier) % 360);
      }

      // Render sparks on canvas
      const canvas = canvasRef.current;
      if (canvas && sparksRef.current.length > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let i = sparksRef.current.length - 1; i >= 0; i--) {
            const p = sparksRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.035;

            if (p.alpha <= 0) {
              sparksRef.current.splice(i, 1);
              continue;
            }

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }
    };

    animRef.id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.id);
  }, [isPaused, speedMultiplier]);

  // Handle Drag / Touch Rotation on the Orbit
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.touches[0].clientX;
    dragRef.current.startAngle = orbitAngle;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.touches[0].clientX - dragRef.current.startX;
    setOrbitAngle((dragRef.current.startAngle + dx * 0.75 + 360) % 360);
  };

  const handleTouchEnd = () => {
    dragRef.current.isDragging = false;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startAngle = orbitAngle;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    setOrbitAngle((dragRef.current.startAngle + dx * 0.75 + 360) % 360);
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
  };

  // Trigger Radar Ping Scan
  const handleRadarScan = () => {
    if (isRadarScanning) return;
    setIsRadarScanning(true);
    setPulseCount((prev) => prev + 1);
    triggerSparks(undefined, undefined, activeThemeColor);

    setTimeout(() => {
      setIsRadarScanning(false);
    }, 1800);
  };

  const activeNode = NODES[selectedNodeIndex];

  // Theme styling definitions
  const themeColors = {
    amber: {
      primary: '#F5B027',
      border: 'border-champagne/40',
      glow: 'shadow-[0_0_24px_rgba(245,176,39,0.35)]',
      bgPill: 'bg-champagne/15 text-champagne border-champagne/30',
      coreGrad: 'from-amber-400 via-[#F5B027] to-amber-700',
    },
    sapphire: {
      primary: '#38BDF8',
      border: 'border-cyan-400/40',
      glow: 'shadow-[0_0_24px_rgba(56,189,248,0.35)]',
      bgPill: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30',
      coreGrad: 'from-sky-300 via-sky-500 to-indigo-700',
    },
    emerald: {
      primary: '#10B981',
      border: 'border-emerald-400/40',
      glow: 'shadow-[0_0_24px_rgba(16,185,129,0.35)]',
      bgPill: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
      coreGrad: 'from-emerald-300 via-emerald-500 to-teal-800',
    },
  };

  const activeThemeColor = themeColors[spectrum].primary;

  return (
    <div className="w-full max-w-lg lg:max-w-xl mx-auto relative select-none">
      {/* Background Starlight Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-xl sm:blur-3xl opacity-70 transition-all duration-700 transform-gpu"
          style={{
            background: `radial-gradient(circle, ${activeThemeColor}25 0%, rgba(76,111,209,0.15) 50%, transparent 75%)`,
          }}
        />
      </div>

      {/* Main Aerospace 2D Console Asset */}
      <div className="relative z-10 w-full glass-2 rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 border border-white/10 hover:border-champagne/35 transition-all duration-500 shadow-glass-lg text-left">
        {/* ── TOP TELEMETRY BAR ── */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10.5px] sm:text-xs font-semibold text-pearl tracking-wider uppercase truncate">
              ORBITAL CORE // V2.6
              <span className="hidden xs:inline text-fog font-normal"> // 2D VECTOR HUD</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Interactive Radar Ping Trigger */}
            <button
              onClick={handleRadarScan}
              disabled={isRadarScanning}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono border transition-all cursor-pointer ${
                isRadarScanning
                  ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-mist hover:text-pearl border-white/10'
              }`}
              title={lang === 'id' ? 'Klik untuk memindai radar 360°' : 'Click to run 360° radar sweep'}
            >
              <Radio className={`w-3 h-3 ${isRadarScanning ? 'animate-spin' : 'text-champagne'}`} />
              <span className="hidden xs:inline">{isRadarScanning ? 'SCANNING' : 'PING RADAR'}</span>
            </button>
          </div>
        </div>

        {/* ── 2D INTERACTIVE ORBITAL ARENA ── */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            dragRef.current.isDragging = false;
          }}
          className="relative w-full h-56 xs:h-64 sm:h-72 rounded-xl sm:rounded-2xl bg-midnight-0/60 border border-white/5 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
          title={lang === 'id' ? 'Sentuh atau seret untuk memutar orbit • Klik modul satelit' : 'Touch/drag to rotate • Click satellite nodes'}
        >
          {/* Subtle Background Polar Grid SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
          </svg>

          {/* Elliptical Orbital Ring 1: Outer Trajectory */}
          <div
            className="absolute rounded-full border border-dashed pointer-events-none transition-colors duration-500"
            style={{
              width: '84%',
              height: '56%',
              borderColor: `${activeThemeColor}35`,
            }}
          />

          {/* Elliptical Orbital Ring 2: Inner Trajectory */}
          <div
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: '54%',
              height: '36%',
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
          />

          {/* Radar Sweep Ray (Triggered when user clicks Ping Radar) */}
          {isRadarScanning && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden animate-[spin_1.8s_linear_infinite]"
              style={{
                background: `conic-gradient(from 0deg, ${activeThemeColor}50 0deg, ${activeThemeColor}10 45deg, transparent 70deg)`,
              }}
            />
          )}

          {/* Central Reactor: Quantum Developer Core */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setPulseCount((prev) => prev + 1);
              triggerSparks(e.clientX, e.clientY, activeThemeColor);
            }}
            className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
            title={lang === 'id' ? 'Klik Reaktor Inti Rendy Fernando' : 'Click Rendy Fernando Core Reactor'}
          >
            {/* Core Pulse Ripple */}
            <div
              key={pulseCount}
              className="absolute w-20 h-20 rounded-full animate-ping pointer-events-none opacity-40"
              style={{ background: activeThemeColor }}
            />

            {/* Core Sphere */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr ${themeColors[spectrum].coreGrad} p-1 shadow-lg transition-transform duration-300 group-hover:scale-110 flex items-center justify-center`}
              style={{
                boxShadow: `0 0 24px ${activeThemeColor}80, inset 0 2px 4px rgba(255,255,255,0.6)`,
              }}
            >
              <div className="w-full h-full rounded-full bg-midnight-0/85 flex flex-col items-center justify-center border border-white/20">
                <span className="font-mono text-xs font-black text-pearl tracking-tighter">RF</span>
                <span className="text-[7.5px] font-mono text-champagne tracking-widest leading-none mt-0.5">DEV</span>
              </div>
            </div>

            {/* Core Status Label */}
            <span className="font-mono text-[9px] text-pearl/80 font-semibold tracking-wider mt-1 px-1.5 py-0.5 rounded bg-midnight-1/90 border border-white/10 shadow-sm">
              CORE 100%
            </span>
          </div>

          {/* ── 4 ORBITING SATELLITE NODES (Calculated via 2D Trigonometry) ── */}
          {NODES.map((node, index) => {
            // Offset each node by 90 degrees around the ellipse
            const nodeAngleDeg = (orbitAngle + index * 90) % 360;
            const rad = (nodeAngleDeg * Math.PI) / 180;

            // Elliptical coordinates (responsive percentages for any device)
            // rx = ~40%, ry = ~26% of arena size
            const xPercent = 50 + Math.cos(rad) * 40;
            const yPercent = 50 + Math.sin(rad) * 26;

            const isSelected = selectedNodeIndex === index;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNodeIndex(index);
                  triggerSparks(e.clientX, e.clientY, node.color);
                }}
                className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 ${
                  isSelected ? 'scale-115 sm:scale-120' : 'hover:scale-110 scale-95'
                }`}
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                }}
                title={lang === 'id' ? `Klik untuk memfokuskan modul ${node.titleId}` : `Click to focus ${node.titleEn}`}
              >
                {/* Laser Tether Beam between Core & Selected Node */}
                {isSelected && (
                  <div
                    className="absolute -z-10 pointer-events-none opacity-60"
                    style={{
                      width: '1px',
                      height: '100px',
                      transformOrigin: 'top center',
                    }}
                  />
                )}

                {/* Satellite Module Capsule */}
                <div
                  className={`relative p-2 sm:p-2.5 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-md ${
                    isSelected
                      ? 'bg-midnight-1 border-2 text-pearl'
                      : 'bg-midnight-0/90 border border-white/15 text-mist hover:text-pearl'
                  }`}
                  style={{
                    borderColor: isSelected ? node.color : 'rgba(255,255,255,0.15)',
                    boxShadow: isSelected ? `0 0 16px ${node.accentGlow}` : undefined,
                  }}
                >
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${node.color}25`,
                      color: node.color,
                    }}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[9px] xs:text-[10px] font-bold tracking-tight text-pearl whitespace-nowrap">
                      {node.id === 'frontend' && 'React 19'}
                      {node.id === 'backend' && 'Laravel 11'}
                      {node.id === 'cloud' && 'SIJA Cloud'}
                      {node.id === 'datascience' && 'TSDN AI'}
                    </span>
                    <span
                      className="font-mono text-[8px] xs:text-[8.5px] whitespace-nowrap"
                      style={{ color: node.color }}
                    >
                      {node.latency}
                    </span>
                  </div>

                  {/* Satellite Active Indicator Dot */}
                  {isSelected && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-ping"
                      style={{ backgroundColor: node.color }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Interactive Drag Hint (Fades out when user interacts) */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[8.5px] xs:text-[9.5px] font-mono text-fog pointer-events-none opacity-70">
            <span>‹ {lang === 'id' ? 'SERET UNTUK MEMUTAR' : 'DRAG TO ROTATE'} ›</span>
            <span>{isPaused ? (lang === 'id' ? 'TERTAHAN' : 'PAUSED') : `${speedMultiplier}x ORBIT`}</span>
          </div>

          {/* 2D Canvas Overlay for Micro Particle Sparkles */}
          <canvas
            ref={canvasRef}
            width={480}
            height={280}
            className="absolute inset-0 w-full h-full pointer-events-none z-40"
          />
        </div>

        {/* ── INTERACTIVE CONTROL DECK (Throttle & Spectrum) ── */}
        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          {/* Orbital Speed Throttle */}
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-mono text-fog uppercase mr-1 hidden xs:inline">Kecepatan:</span>
            {([0.8, 2.0, 4.0] as SpeedMode[]).map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-0.5 rounded text-[9.5px] font-mono transition-all cursor-pointer ${
                  speedMultiplier === spd
                    ? `${themeColors[spectrum].bgPill} font-bold`
                    : 'bg-white/5 hover:bg-white/10 text-mist'
                }`}
              >
                {spd === 0.8 && '1x Drift'}
                {spd === 2.0 && '2x Orbit'}
                {spd === 4.0 && '4x Warp'}
              </button>
            ))}
          </div>

          {/* Cosmic Spectrum Gemstones */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-fog uppercase mr-0.5 hidden xs:inline">Spektrum:</span>
            {(['amber', 'sapphire', 'emerald'] as SpectrumMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setSpectrum(mode);
                  triggerSparks(undefined, undefined, themeColors[mode].primary);
                }}
                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                  spectrum === mode
                    ? 'scale-125 border-white shadow-[0_0_8px_currentColor]'
                    : 'border-white/20 opacity-60 hover:opacity-100 hover:scale-110'
                }`}
                style={{
                  backgroundColor: themeColors[mode].primary,
                  color: themeColors[mode].primary,
                }}
                title={`Spektrum ${mode}`}
              />
            ))}
          </div>
        </div>

        {/* ── ACTIVE SUBSYSTEM TELEMETRY CARD ── */}
        <div
          className="mt-3 p-3 sm:p-3.5 rounded-xl bg-midnight-1/80 border transition-all duration-300 relative overflow-hidden"
          style={{ borderColor: `${activeNode.color}40` }}
        >
          {/* Accent Glow Top Border */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${activeNode.color} 50%, transparent 100%)`,
            }}
          />

          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: `${activeNode.color}15`,
                  borderColor: `${activeNode.color}35`,
                  color: activeNode.color,
                }}
              >
                {activeNode.code}
              </span>
              <span className="font-mono text-[9.5px] sm:text-[10px] text-pearl font-semibold truncate">
                {lang === 'id' ? activeNode.badgeId : activeNode.badgeEn}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
              <Zap className="w-2.5 h-2.5" />
              <span>{activeNode.latency} Latency</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-pearl tracking-tight">
            {lang === 'id' ? activeNode.titleId : activeNode.titleEn}
          </p>
          <p className="font-mono text-[10px] sm:text-[10.5px] text-mist mt-0.5 truncate">
            {lang === 'id' ? activeNode.techId : activeNode.techEn}
          </p>

          {/* Micro Telemetry Tags */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-2 pt-2 border-t border-white/10">
            {activeNode.metrics.map((m) => (
              <div key={m.label} className="p-1 sm:p-1.5 rounded bg-white/[0.03] text-left min-w-0">
                <div className="text-[8px] sm:text-[8.5px] font-mono text-fog truncate">{m.label}</div>
                <div className="text-[10px] sm:text-[11px] font-mono font-bold text-pearl truncate mt-0.5" style={{ color: activeNode.color }}>
                  {m.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Navigation Pill */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-fog">
          <div className="flex items-center gap-1.5 truncate">
            <Terminal className="w-3 h-3 text-champagne shrink-0" />
            <span className="truncate">SMKN 26 Jakarta SIJA // Full Stack & AI</span>
          </div>

          <button
            onClick={() => {
              setSelectedNodeIndex((prev) => (prev + 1) % NODES.length);
              triggerSparks(undefined, undefined, activeThemeColor);
            }}
            className="inline-flex items-center gap-1 text-[9.5px] text-champagne hover:underline cursor-pointer shrink-0 ml-2"
          >
            <RotateCw className="w-2.5 h-2.5" />
            <span>{lang === 'id' ? 'Ganti Modul' : 'Next Node'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
