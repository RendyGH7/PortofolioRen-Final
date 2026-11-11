import React, { useState, useEffect, useRef, useCallback } from 'react';

interface HeroInteractiveAssetProps {
  lang: 'id' | 'en';
}

interface PlanetHardSkill {
  id: string;
  name: string;
  fullName: string;
  field: string;
  tech: string;
  level: string;
  descId: string;
  descEn: string;
  skills: string[];
  rx: number; // orbital radius x (% of container)
  ry: number; // orbital radius y (% of container)
  speed: number; // degrees per second
  startAngle: number;
  width: number; // pixel width on desktop
  height: number;
  color: string;
  glow: string;
}

const HARD_SKILL_PLANETS: PlanetHardSkill[] = [
  {
    id: 'frontend',
    name: 'React 19',
    fullName: 'Frontend Architecture & UI',
    field: 'Bidang 01 // UI Engineering',
    tech: 'React 19 • TypeScript',
    level: '90% Kemahiran',
    descId: 'Antarmuka web modern, interaktif, arsitektur komponen bersih & 60-120 FPS.',
    descEn: 'Modern reactive web UI, clean component architecture & fluid 60-120 FPS.',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    rx: 18,
    ry: 10.5,
    speed: 24,
    startAngle: 40,
    width: 32,
    height: 32,
    color: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.45)',
  },
  {
    id: 'backend',
    name: 'Laravel 11',
    fullName: 'Backend & System Architecture',
    field: 'Bidang 02 // Core Server',
    tech: 'Laravel 11 • PHP 8.3',
    level: '80% Kemahiran',
    descId: 'Arsitektur decoupled REST API, keandalan server tinggi, autentikasi aman & clean code.',
    descEn: 'Decoupled REST API architecture, high server reliability, secure auth & clean code.',
    skills: ['Laravel 11', 'PHP 8.3', 'REST API', 'Clean Architecture', 'Redis'],
    rx: 27,
    ry: 15.5,
    speed: 17,
    startAngle: 185,
    width: 52,
    height: 42,
    color: '#F5B027',
    glow: 'rgba(245, 176, 39, 0.50)',
  },
  {
    id: 'database',
    name: 'PostgreSQL',
    fullName: 'Database & Relational Storage',
    field: 'Bidang 03 // Data Storage',
    tech: 'PostgreSQL • MySQL',
    level: '77% Kemahiran',
    descId: 'Perancangan skema relasional, optimasi query berkecepatan tinggi, ACID safe.',
    descEn: 'Relational schema design, high-speed query optimization, ACID safe.',
    skills: ['PostgreSQL', 'MySQL', 'Database Design', 'Query Optimization', 'Indexes'],
    rx: 36,
    ry: 20.5,
    speed: 12.5,
    startAngle: 110,
    width: 30,
    height: 30,
    color: '#FB7185',
    glow: 'rgba(251, 113, 133, 0.45)',
  },
  {
    id: 'business',
    name: 'Bisnis Digital',
    fullName: 'Bisnis Digital & Strategi Produk',
    field: 'Bidang 04 // Bisnis & Solusi',
    tech: 'E-Commerce • Monetisasi',
    level: 'Mindset & Eksekusi',
    descId: 'Pola pikir wirausaha, perancangan model bisnis digital, integrasi e-commerce & payment gateway, serta solusi bisnis berorientasi profit.',
    descEn: 'Entrepreneurial mindset, digital business models, e-commerce & payment gateway integration, and profit-oriented tech solutions.',
    skills: ['E-Commerce', 'Model Bisnis', 'Payment QRIS', 'Strategi Produk', 'Analisis Pasar'],
    rx: 44,
    ry: 25,
    speed: 8.5,
    startAngle: 250,
    width: 32,
    height: 32,
    color: '#C084FC',
    glow: 'rgba(192, 132, 252, 0.45)',
  },
];

export const HeroInteractiveAsset: React.FC<HeroInteractiveAssetProps> = ({ lang }) => {
  const [time, setTime] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [sunPulse, setSunPulse] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Drag physics with rotational inertia
  const physicsRef = useRef({
    isDragging: false,
    startX: 0,
    startAngle: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
  });

  // Stardust micro-particles on 2D canvas
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

  // Continuous animation loop for planetary revolution
  useEffect(() => {
    const animRef = { id: 0 };
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      animRef.id = requestAnimationFrame(loop);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const physics = physicsRef.current;

      // Handle drag inertia decay
      if (!physics.isDragging) {
        if (Math.abs(physics.velocity) > 0.05) {
          setDragOffset((prev) => prev + physics.velocity * delta);
          physics.velocity *= 0.93; // friction
        }
      }

      // Progress solar time (slowed down when a planet is hovered for inspection)
      const speedFactor = hoveredPlanet ? 0.35 : 1;
      setTime((prev) => prev + delta * speedFactor);

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
            p.alpha -= 0.032;

            if (p.alpha <= 0) {
              sparksRef.current.splice(i, 1);
              continue;
            }

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }
    };

    animRef.id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.id);
  }, [hoveredPlanet]);

  // Touch and Mouse Drag to spin the solar system
  const handleTouchStart = (e: React.TouchEvent) => {
    const p = physicsRef.current;
    p.isDragging = true;
    p.startX = e.touches[0].clientX;
    p.lastX = e.touches[0].clientX;
    p.startAngle = dragOffset;
    p.lastTime = performance.now();
    p.velocity = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const p = physicsRef.current;
    if (!p.isDragging) return;
    const currentX = e.touches[0].clientX;
    const now = performance.now();
    const dt = (now - p.lastTime) / 1000;

    if (dt > 0.005) {
      p.velocity = ((currentX - p.lastX) / dt) * 0.22;
    }

    const dx = currentX - p.startX;
    setDragOffset(p.startAngle + dx * 0.65);
    p.lastX = currentX;
    p.lastTime = now;
  };

  const handleTouchEnd = () => {
    physicsRef.current.isDragging = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const p = physicsRef.current;
    p.isDragging = true;
    p.startX = e.clientX;
    p.lastX = e.clientX;
    p.startAngle = dragOffset;
    p.lastTime = performance.now();
    p.velocity = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const p = physicsRef.current;
    if (!p.isDragging) return;
    const currentX = e.clientX;
    const now = performance.now();
    const dt = (now - p.lastTime) / 1000;

    if (dt > 0.005) {
      p.velocity = ((currentX - p.lastX) / dt) * 0.22;
    }

    const dx = currentX - p.startX;
    setDragOffset(p.startAngle + dx * 0.65);
    p.lastX = currentX;
    p.lastTime = now;
  };

  const handleMouseUp = () => {
    physicsRef.current.isDragging = false;
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        physicsRef.current.isDragging = false;
      }}
      className="relative w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[500px] md:max-w-[560px] lg:max-w-[620px] h-[340px] xs:h-[390px] sm:h-[450px] md:h-[490px] lg:h-[530px] mx-auto flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      title={lang === 'id' ? 'Tata Surya Keahlian Rendy Fernando • Seret untuk memutar • Sorot planet untuk melihat hard skill' : 'Rendy Fernando Skill Solar System • Drag to spin • Hover planet to inspect hard skills'}
    >
      {/* ── AMBIENT NEBULA BACKLIGHT (Pure borderless celestial glow) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 rounded-full blur-2xl sm:blur-3xl opacity-60 pointer-events-none transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(245, 176, 39, 0.35) 0%, rgba(56, 189, 248, 0.18) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* ── SVG PLANETARY ORBIT TRAJECTORIES (Concentric Orbital Rings) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>

        {/* Dynamic Orbital Rings for each hard skill planet */}
        {HARD_SKILL_PLANETS.map((planet) => {
          const isTargeted = hoveredPlanet === planet.id;
          return (
            <g key={`orbit-ring-${planet.id}`}>
              <ellipse
                cx="50"
                cy="50"
                rx={planet.rx}
                ry={planet.ry}
                fill="none"
                stroke={planet.color}
                strokeWidth={isTargeted ? '0.75' : '0.35'}
                strokeOpacity={isTargeted ? '0.75' : '0.22'}
                strokeDasharray={isTargeted ? undefined : '2 3'}
                className="transition-all duration-300"
              />
              {isTargeted && (
                <ellipse
                  cx="50"
                  cy="50"
                  rx={planet.rx}
                  ry={planet.ry}
                  fill="none"
                  stroke={planet.color}
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                  filter="url(#orbitGlow)"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* ── THE SUN (CENTRAL SOLAR REACTOR // RF CORE) ── */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSunPulse((prev) => prev + 1);
          triggerSparks(e.clientX, e.clientY, '#F5B027');
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group z-20 pointer-events-auto"
        title={lang === 'id' ? 'Matahari Pusat Keahlian Rendy Fernando' : 'Rendy Fernando Full Stack Core'}
      >
        {/* Expanding Solar Flare Shockwave on Click */}
        <div
          key={sunPulse}
          className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full pointer-events-none animate-ping opacity-50"
          style={{ background: 'radial-gradient(circle, #F5B027 0%, rgba(245, 176, 39, 0) 70%)' }}
        />

        {/* Solar Corona Ambient Halo */}
        <div
          className="absolute w-22 h-22 sm:w-28 sm:h-28 rounded-full pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.55) 0%, rgba(245, 176, 39, 0.38) 45%, rgba(217, 130, 24, 0.18) 70%, transparent 85%)',
          }}
        />

        {/* Rotating Solar Flares Ring */}
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-dashed border-champagne/35 pointer-events-none animate-[spin_40s_linear_infinite]" />

        {/* Photorealistic Sun Photosphere */}
        <div
          className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full p-[2px] transition-transform duration-500 group-hover:scale-110 flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #FEF08A 25%, #F5B027 60%, #D97706 85%, #92400E 100%)',
            boxShadow: '0 0 36px rgba(245, 176, 39, 0.7), inset 0 2px 6px rgba(255, 255, 255, 0.85)',
          }}
        >
          {/* Inner Monogram Core */}
          <div className="w-full h-full rounded-full bg-midnight-0/80 flex flex-col items-center justify-center border border-white/30 backdrop-blur-xs">
            <span className="font-mono text-xs sm:text-sm font-black text-pearl tracking-wider">RF</span>
            <span className="text-[7px] sm:text-[8px] font-mono text-champagne tracking-widest leading-none mt-0.5">DEV</span>
          </div>
        </div>
      </div>

      {/* ── 5 PHOTOREALISTIC HARD SKILL PLANETS REVOLVING IN ORBIT ── */}
      {HARD_SKILL_PLANETS.map((planet) => {
        // Calculate orbital position using Keplerian speed
        const currentAngle = (time * planet.speed + planet.startAngle + dragOffset) % 360;
        const rad = (currentAngle * Math.PI) / 180;

        const leftPercent = 50 + Math.cos(rad) * planet.rx;
        const topPercent = 50 + Math.sin(rad) * planet.ry;

        const isHovered = hoveredPlanet === planet.id;

        return (
          <div
            key={planet.id}
            onMouseEnter={() => setHoveredPlanet(planet.id)}
            onMouseLeave={() => setHoveredPlanet(null)}
            onClick={(e) => {
              e.stopPropagation();
              triggerSparks(e.clientX, e.clientY, planet.color);
            }}
            className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 flex flex-col items-center group pointer-events-auto ${
              isHovered ? 'scale-120 z-40' : 'hover:scale-110'
            }`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
            }}
          >
            {/* ── PHOTOREALISTIC PLANET BODY GRAPHICS ── */}
            <div
              className="relative flex items-center justify-center transition-all duration-300"
              style={{
                width: `${planet.width}px`,
                height: `${planet.height}px`,
              }}
            >
              {/* Planetary Atmospheric Glow Halo */}
              <div
                className="absolute rounded-full transition-opacity duration-300 pointer-events-none"
                style={{
                  width: `${planet.width * 1.8}px`,
                  height: `${planet.width * 1.8}px`,
                  background: `radial-gradient(circle, ${planet.glow} 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0.65,
                }}
              />

              {/* ── PLANET 1: FRONTEND WEB (Oceanic Earth-like World) ── */}
              {planet.id === 'frontend' && (
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                  {/* Orbiting Moon Satellite (TypeScript Core) */}
                  <div className="absolute inset-0 pointer-events-none animate-[spin_6s_linear_infinite]">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#BAE6FD] -translate-x-3 -translate-y-2" />
                  </div>

                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <defs>
                      <radialGradient id="feOcean" cx="30%" cy="28%" r="70%">
                        <stop offset="0%" stopColor="#BAE6FD" />
                        <stop offset="25%" stopColor="#38BDF8" />
                        <stop offset="55%" stopColor="#0284C7" />
                        <stop offset="85%" stopColor="#082F49" />
                        <stop offset="100%" stopColor="#020617" />
                      </radialGradient>
                      <radialGradient id="feLimb" cx="28%" cy="26%" r="72%">
                        <stop offset="68%" stopColor="transparent" />
                        <stop offset="88%" stopColor="#67E8F9" stopOpacity="0.45" />
                        <stop offset="98%" stopColor="#BAE6FD" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      </radialGradient>
                      <clipPath id="feClip">
                        <circle cx="50" cy="50" r="42" />
                      </clipPath>
                    </defs>
                    <circle cx="50" cy="50" r="42" fill="url(#feOcean)" />
                    {/* Continents & Cirrus Clouds */}
                    <g clipPath="url(#feClip)">
                      <path d="M 28 35 Q 44 26 48 38 Q 44 52 30 46 Z" fill="#15803D" opacity="0.45" />
                      <path d="M 44 54 Q 64 48 70 60 Q 56 72 40 66 Z" fill="#166534" opacity="0.45" />
                      <path d="M 18 42 Q 40 32 68 38 Q 48 46 22 46 Z" fill="#FFFFFF" opacity="0.65" />
                      <path d="M 32 62 Q 58 52 78 64 Q 58 72 36 68 Z" fill="#FFFFFF" opacity="0.55" />
                    </g>
                    <circle cx="50" cy="50" r="42" fill="url(#feLimb)" />
                  </svg>
                </div>
              )}

              {/* ── PLANET 2: BACKEND ARCHITECTURE (Photorealistic Ringed Gas Giant) ── */}
              {planet.id === 'backend' && (
                <div className="relative w-12 h-10 sm:w-14 sm:h-11 flex items-center justify-center">
                  <svg viewBox="0 0 160 120" className="w-full h-full overflow-visible">
                    <defs>
                      <radialGradient id="beGasGiant" cx="32%" cy="28%" r="68%">
                        <stop offset="0%" stopColor="#FFF9E6" />
                        <stop offset="20%" stopColor="#FDE047" />
                        <stop offset="42%" stopColor="#F5B027" />
                        <stop offset="70%" stopColor="#B45309" />
                        <stop offset="100%" stopColor="#1C0F05" />
                      </radialGradient>
                      <radialGradient id="beLimb" cx="30%" cy="26%" r="72%">
                        <stop offset="70%" stopColor="transparent" />
                        <stop offset="90%" stopColor="#FDE047" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      </radialGradient>
                      <linearGradient id="beRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
                        <stop offset="28%" stopColor="#FFF7E6" stopOpacity="0.95" />
                        <stop offset="55%" stopColor="#F5B027" stopOpacity="0.9" />
                        <stop offset="78%" stopColor="#D97706" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
                      </linearGradient>
                      <clipPath id="beRingBack">
                        <rect x="0" y="0" width="160" height="60" />
                      </clipPath>
                      <clipPath id="beRingFront">
                        <rect x="0" y="59" width="160" height="61" />
                      </clipPath>
                    </defs>
                    {/* Back Half of Rings */}
                    <g clipPath="url(#beRingBack)">
                      <ellipse cx="80" cy="60" rx="72" ry="24" fill="none" stroke="url(#beRingGrad)" strokeWidth="11" transform="rotate(-18 80 60)" />
                    </g>
                    {/* Planet Sphere */}
                    <circle cx="80" cy="60" r="30" fill="url(#beGasGiant)" />
                    {/* Cloud Band Belts */}
                    <g transform="rotate(-18 80 60)">
                      <path d="M 50 54 Q 80 60 110 54 L 110 58 Q 80 64 50 58 Z" fill="#B45309" opacity="0.35" />
                      <path d="M 50 62 Q 80 68 110 62 L 110 66 Q 80 72 50 66 Z" fill="#FEF08A" opacity="0.35" />
                    </g>
                    <circle cx="80" cy="60" r="30" fill="url(#beLimb)" />
                    {/* Front Half of Rings (Overlaps Planet) */}
                    <g clipPath="url(#beRingFront)">
                      <ellipse cx="80" cy="60" rx="72" ry="24" fill="none" stroke="url(#beRingGrad)" strokeWidth="11" transform="rotate(-18 80 60)" />
                    </g>
                  </svg>
                </div>
              )}

              {/* ── PLANET 3: DATABASE SQL (Volcanic Crimson World // PostgreSQL) ── */}
              {planet.id === 'database' && (
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <defs>
                      <radialGradient id="dbSurface" cx="30%" cy="28%" r="70%">
                        <stop offset="0%" stopColor="#FFF1F2" />
                        <stop offset="22%" stopColor="#FDA4AF" />
                        <stop offset="50%" stopColor="#F43F5E" />
                        <stop offset="80%" stopColor="#9F1239" />
                        <stop offset="100%" stopColor="#2A050D" />
                      </radialGradient>
                      <radialGradient id="dbLimb" cx="28%" cy="26%" r="72%">
                        <stop offset="70%" stopColor="transparent" />
                        <stop offset="90%" stopColor="#FB7185" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      </radialGradient>
                      <clipPath id="dbClip">
                        <circle cx="50" cy="50" r="42" />
                      </clipPath>
                    </defs>
                    <circle cx="50" cy="50" r="42" fill="url(#dbSurface)" />
                    {/* Craters & Highland Ridges */}
                    <g clipPath="url(#dbClip)">
                      <circle cx="40" cy="38" r="7" fill="#4C0519" opacity="0.45" />
                      <circle cx="62" cy="58" r="8" fill="#4C0519" opacity="0.4" />
                      <circle cx="65" cy="36" r="5" fill="#4C0519" opacity="0.35" />
                      <ellipse cx="50" cy="18" rx="16" ry="5" fill="#FFFFFF" opacity="0.65" />
                    </g>
                    <circle cx="50" cy="50" r="42" fill="url(#dbLimb)" />
                  </svg>
                </div>
              )}

              {/* ── PLANET 4: BISNIS DIGITAL (Royal Amethyst & Gold Commerce World) ── */}
              {planet.id === 'business' && (
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <defs>
                      <radialGradient id="bizSurface" cx="30%" cy="28%" r="70%">
                        <stop offset="0%" stopColor="#FAF5FF" />
                        <stop offset="22%" stopColor="#E9D5FF" />
                        <stop offset="50%" stopColor="#A855F7" />
                        <stop offset="82%" stopColor="#6B21A8" />
                        <stop offset="100%" stopColor="#1E0338" />
                      </radialGradient>
                      <radialGradient id="bizLimb" cx="28%" cy="26%" r="72%">
                        <stop offset="70%" stopColor="transparent" />
                        <stop offset="90%" stopColor="#C084FC" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      </radialGradient>
                      <clipPath id="bizClip">
                        <circle cx="50" cy="50" r="42" />
                      </clipPath>
                    </defs>
                    <circle cx="50" cy="50" r="42" fill="url(#bizSurface)" />
                    {/* Global Digital Commerce & Trade Meridian Lines */}
                    <g clipPath="url(#bizClip)" opacity="0.6">
                      {/* Equator & Latitude Trade Arcs */}
                      <ellipse cx="50" cy="50" rx="40" ry="14" fill="none" stroke="#F5B027" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />
                      <ellipse cx="50" cy="50" rx="20" ry="40" fill="none" stroke="#E9D5FF" strokeWidth="1" opacity="0.4" />
                      {/* Commerce Golden Node */}
                      <circle cx="58" cy="46" r="3" fill="#F5B027" />
                      <circle cx="58" cy="46" r="5" fill="none" stroke="#FDE047" strokeWidth="0.8" opacity="0.6" />
                    </g>
                    <circle cx="50" cy="50" r="42" fill="url(#bizLimb)" />
                    {/* Golden Prosperity Crown Sparkle */}
                    <circle cx="34" cy="32" r="2" fill="#FFFFFF" opacity="0.9" />
                  </svg>
                </div>
              )}
            </div>

            {/* ── CLEAN BORDERLESS PLANET LABEL (No box, pure celestial typography) ── */}
            <span
              className="mt-1 font-mono text-[9px] sm:text-[10px] font-bold tracking-tight whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] pointer-events-none transition-colors"
              style={{ color: isHovered ? planet.color : '#F8FAFC' }}
            >
              {planet.name}
            </span>

            {/* ── INTERACTIVE HARD SKILL DETAIL HUD (Appears on Hover) ── */}
            {isHovered && (
              <div className="absolute top-full mt-2 z-50 p-2.5 rounded-xl bg-midnight-1/95 border border-white/20 backdrop-blur-md shadow-glass-lg pointer-events-none w-48 text-left animate-fadeIn">
                <div className="flex items-center justify-between gap-1 text-[8px] font-mono text-fog">
                  <span className="uppercase tracking-wider">{planet.field}</span>
                  <span className="font-bold" style={{ color: planet.color }}>
                    {planet.level}
                  </span>
                </div>
                <div className="font-bold text-[10.5px] text-pearl mt-0.5 tracking-tight">
                  {planet.fullName}
                </div>
                <div className="text-[8.5px] text-mist mt-0.5 leading-snug">
                  {lang === 'id' ? planet.descId : planet.descEn}
                </div>
                <div className="mt-1.5 pt-1 border-t border-white/10 flex flex-wrap gap-1">
                  {planet.skills.map((s) => (
                    <span
                      key={s}
                      className="px-1.5 py-0.5 rounded text-[7.5px] font-mono bg-white/5 border border-white/10 text-pearl/90"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── 2D CANVAS FOR SPARKS (Hardware-accelerated particle sparks) ── */}
      <canvas
        ref={canvasRef}
        width={580}
        height={500}
        className="absolute inset-0 w-full h-full pointer-events-none z-40"
      />
    </div>
  );
};
