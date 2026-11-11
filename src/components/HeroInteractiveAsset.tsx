import React, { useState, useEffect, useRef, useCallback } from 'react';

interface HeroInteractiveAssetProps {
  lang: 'id' | 'en';
}

interface PlanetConfig {
  id: string;
  name: string;
  roleId: string;
  roleEn: string;
  rx: number; // percent of container width
  ry: number; // percent of container height
  speed: number; // degrees per second
  startAngle: number;
  size: number; // pixel diameter on desktop
  color: string;
  gradient: string;
  glow: string;
  ring?: boolean;
  moon?: boolean;
}

const PLANETS: PlanetConfig[] = [
  {
    id: 'react',
    name: 'React 19',
    roleId: 'Arsitektur Antarmuka & UX',
    roleEn: 'UI Architecture & UX',
    rx: 18,
    ry: 11,
    speed: 24, // Closer = faster orbit
    startAngle: 45,
    size: 20,
    color: '#38BDF8',
    gradient: 'radial-gradient(circle at 32% 30%, #BAE6FD 0%, #38BDF8 40%, #0284C7 80%, #082F49 100%)',
    glow: 'rgba(56, 189, 248, 0.45)',
    moon: true,
  },
  {
    id: 'laravel',
    name: 'Laravel 11',
    roleId: 'Core Backend & REST API',
    roleEn: 'Core Backend & REST API',
    rx: 29,
    ry: 17,
    speed: 16,
    startAngle: 190,
    size: 24,
    color: '#F5B027',
    gradient: 'radial-gradient(circle at 30% 30%, #FEF3C7 0%, #FDE047 28%, #F5B027 60%, #78350F 100%)',
    glow: 'rgba(245, 176, 39, 0.50)',
    ring: true,
  },
  {
    id: 'cloud',
    name: 'SIJA Cloud',
    roleId: 'Cloud Ops & Jaringan SMKN 26',
    roleEn: 'Cloud Ops & Systems',
    rx: 39,
    ry: 23,
    speed: 11,
    startAngle: 120,
    size: 19,
    color: '#2DD4BF',
    gradient: 'radial-gradient(circle at 30% 30%, #CCFBF1 0%, #2DD4BF 42%, #0F766E 82%, #042F2E 100%)',
    glow: 'rgba(45, 212, 191, 0.45)',
  },
  {
    id: 'datascience',
    name: 'TSDN AI',
    roleId: 'Sains Data & Prediksi Cerdas',
    roleEn: 'Data Science & Predictive ML',
    rx: 48,
    ry: 28,
    speed: 7.5,
    startAngle: 310,
    size: 19,
    color: '#C084FC',
    gradient: 'radial-gradient(circle at 30% 30%, #F3E8FF 0%, #C084FC 42%, #7E22CE 82%, #2E1065 100%)',
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
      className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[460px] md:max-w-[500px] lg:max-w-[540px] h-[320px] xs:h-[370px] sm:h-[430px] md:h-[460px] lg:h-[490px] mx-auto flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      title={lang === 'id' ? 'Tata Surya Rendy Fernando • Seret untuk memutar orbit • Klik matahari atau planet' : 'Rendy Fernando Solar System • Drag to spin orbit • Click sun or planets'}
    >
      {/* ── AMBIENT SOLAR NEBULA (Zero box borders, pure deep space starlight aura) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-56 h-56 xs:w-72 xs:h-72 sm:w-96 sm:h-96 rounded-full blur-2xl sm:blur-3xl opacity-55 pointer-events-none transform-gpu"
          style={{
            background: 'radial-gradient(circle, rgba(245, 176, 39, 0.32) 0%, rgba(56, 189, 248, 0.15) 45%, transparent 75%)',
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

        {/* Dynamic Orbital Rings for each planet */}
        {PLANETS.map((planet) => {
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
                strokeWidth={isTargeted ? '0.75' : '0.4'}
                strokeOpacity={isTargeted ? '0.7' : '0.22'}
                strokeDasharray={isTargeted ? undefined : '2 3'}
                className="transition-all duration-300"
              />
              {/* Subtle starlight glow ring when active */}
              {isTargeted && (
                <ellipse
                  cx="50"
                  cy="50"
                  rx={planet.rx}
                  ry={planet.ry}
                  fill="none"
                  stroke={planet.color}
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                  filter="url(#orbitGlow)"
                />
              )}
            </g>
          );
        })}

        {/* Faint Outer Kuiper Belt Trajectory */}
        <ellipse
          cx="50"
          cy="50"
          rx="52"
          ry="30"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="0.3"
          strokeDasharray="1.5 4"
        />
      </svg>

      {/* ── THE SUN (CENTRAL SOLAR REACTOR) ── */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSunPulse((prev) => prev + 1);
          triggerSparks(e.clientX, e.clientY, '#F5B027');
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group z-20 pointer-events-auto"
        title={lang === 'id' ? 'Matahari Tata Surya Rendy Fernando' : 'Rendy Fernando Solar Core'}
      >
        {/* Expanding Solar Flare Shockwave on Click */}
        <div
          key={sunPulse}
          className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full pointer-events-none animate-ping opacity-50"
          style={{ background: 'radial-gradient(circle, #F5B027 0%, rgba(245, 176, 39, 0) 70%)' }}
        />

        {/* Solar Corona Ambient Halo */}
        <div
          className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.5) 0%, rgba(245, 176, 39, 0.35) 45%, rgba(217, 130, 24, 0.15) 70%, transparent 85%)',
          }}
        />

        {/* Sun Sphere */}
        <div
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] transition-transform duration-500 group-hover:scale-110 flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #FEF08A 25%, #F5B027 60%, #D97706 85%, #92400E 100%)',
            boxShadow: '0 0 32px rgba(245, 176, 39, 0.65), inset 0 2px 6px rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Inner Monogram Core */}
          <div className="w-full h-full rounded-full bg-midnight-0/80 flex flex-col items-center justify-center border border-white/30 backdrop-blur-xs">
            <span className="font-mono text-xs sm:text-sm font-black text-pearl tracking-wider">RF</span>
            <span className="text-[7px] sm:text-[8px] font-mono text-champagne tracking-widest leading-none mt-0.5">CORE</span>
          </div>
        </div>
      </div>

      {/* ── 4 PLANETS REVOLVING AROUND THE SUN ── */}
      {PLANETS.map((planet) => {
        // Calculate planet position along its elliptical orbit using Keplerian time
        const currentAngle = (time * planet.speed + planet.startAngle + dragOffset) % 360;
        const rad = (currentAngle * Math.PI) / 180;

        // Coordinates in percentage of container (50% is center)
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
              isHovered ? 'scale-125 z-40' : 'hover:scale-115'
            }`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
            }}
          >
            {/* The Planet Celestial Sphere */}
            <div className="relative flex items-center justify-center">
              {/* Planetary Atmospheric Glow */}
              <div
                className="absolute rounded-full transition-opacity duration-300"
                style={{
                  width: `${planet.size * 2}px`,
                  height: `${planet.size * 2}px`,
                  background: `radial-gradient(circle, ${planet.glow} 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0.6,
                }}
              />

              {/* Tilted 3D Ring System for Gas Giant (Laravel 11) */}
              {planet.ring && (
                <div
                  className="absolute pointer-events-none -rotate-18"
                  style={{
                    width: `${planet.size * 2.4}px`,
                    height: `${planet.size * 0.85}px`,
                  }}
                >
                  <svg viewBox="0 0 60 22" className="w-full h-full overflow-visible">
                    <ellipse
                      cx="30"
                      cy="11"
                      rx="27"
                      ry="8"
                      fill="none"
                      stroke="url(#ringGrad)"
                      strokeWidth="2.5"
                      opacity="0.85"
                    />
                    <defs>
                      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F5B027" stopOpacity="0.3" />
                        <stop offset="35%" stopColor="#FFF7E6" stopOpacity="0.9" />
                        <stop offset="70%" stopColor="#FDE047" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#B45309" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}

              {/* Natural Satellite Moon (React 19) */}
              {planet.moon && (
                <div
                  className="absolute pointer-events-none animate-[spin_5s_linear_infinite]"
                  style={{
                    width: `${planet.size * 1.8}px`,
                    height: `${planet.size * 1.8}px`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#BAE6FD]"
                    style={{ transform: 'translate(0, 0)' }}
                  />
                </div>
              )}

              {/* Planet Body */}
              <div
                className="rounded-full relative overflow-hidden transition-all duration-300"
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                  background: planet.gradient,
                  boxShadow: isHovered
                    ? `0 0 18px ${planet.color}, inset -2px -2px 6px rgba(0,0,0,0.85), inset 1.5px 1.5px 3px rgba(255,255,255,0.7)`
                    : `0 0 10px ${planet.color}60, inset -2px -2px 5px rgba(0,0,0,0.85), inset 1px 1px 2px rgba(255,255,255,0.6)`,
                }}
              >
                {/* Crescent Shadow Overlay */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_30%_30%,transparent_40%,rgba(0,0,0,0.75)_100%)]" />
              </div>
            </div>

            {/* Minimalist Floating Planet Label (Pure starlight typography, no bulky box) */}
            <div className="mt-1 flex flex-col items-center pointer-events-none transition-all duration-300">
              <span
                className="font-mono text-[9px] sm:text-[10px] font-bold tracking-tight text-pearl/90 whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                style={{ color: isHovered ? planet.color : '#F8FAFC' }}
              >
                {planet.name}
              </span>

              {/* Minimal Tooltip on Hover */}
              {isHovered && (
                <span
                  className="text-[7.5px] sm:text-[8px] font-mono tracking-wider whitespace-nowrap px-1.5 py-0.5 rounded-full bg-midnight-0/90 border shadow-lg mt-0.5 animate-fadeIn"
                  style={{
                    borderColor: `${planet.color}50`,
                    color: planet.color,
                  }}
                >
                  {lang === 'id' ? planet.roleId : planet.roleEn}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* ── 2D CANVAS FOR SPARKS (Hardware-accelerated particle sparks) ── */}
      <canvas
        ref={canvasRef}
        width={540}
        height={490}
        className="absolute inset-0 w-full h-full pointer-events-none z-40"
      />
    </div>
  );
};
