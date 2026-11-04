import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  layer: 1 | 2 | 3; // 1 = distant, 2 = mid-field, 3 = foreground
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  thickness: number;
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dims = {
      w: (canvas.width = window.innerWidth),
      h: (canvas.height = window.innerHeight),
    };

    // Mouse tracking for subtle 3D parallax
    const mousePos = {
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
    };

    // Scroll tracking for cosmic depth travel through the galaxy
    const scrollState = {
      targetY: window.scrollY || 0,
      currentY: window.scrollY || 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.targetX = (e.clientX / dims.w - 0.5) * 36;
      mousePos.targetY = (e.clientY / dims.h - 0.5) * 36;
    };

    const handleScroll = () => {
      scrollState.targetY = window.scrollY || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      dims.w = canvas.width = window.innerWidth;
      dims.h = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Cosmic starlight color spectrum
    const starColors = [
      '#FFFFFF', // Pure Starlight
      '#F3F5FA', // Pearl
      '#8EA8F5', // Ice Sapphire
      '#F5B027', // Radiant Gold
      '#7CE5E8', // Cyan Stardust
      '#10B981', // Emerald Starlight
    ];

    // Multi-depth star field (360 stars distributed across 3 depth planes)
    const stars: Star[] = [];
    const starCount = Math.min(Math.floor((dims.w * dims.h) / 4000), 360);

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        const layer = Math.random() < 0.58 ? 1 : Math.random() < 0.86 ? 2 : 3;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        stars.push({
          x: Math.random() * dims.w,
          y: Math.random() * dims.h,
          size:
            layer === 1
              ? Math.random() * 0.9 + 0.4
              : layer === 2
                ? Math.random() * 1.5 + 0.9
                : Math.random() * 2.4 + 1.5,
          baseAlpha:
            layer === 1
              ? Math.random() * 0.35 + 0.15
              : layer === 2
                ? Math.random() * 0.55 + 0.3
                : Math.random() * 0.65 + 0.45,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
          layer,
          color,
        });
      }
    };

    initStars();

    // Shooting stars / Meteors
    const meteors: Meteor[] = [];
    let lastMeteorTime = Date.now();

    const spawnMeteor = () => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.22;
      meteors.push({
        x: Math.random() * dims.w * 0.9,
        y: Math.random() * (dims.h * 0.4),
        length: Math.random() * 100 + 75,
        speed: Math.random() * 8 + 13,
        angle,
        opacity: 1,
        thickness: Math.random() * 1.6 + 1.1,
      });
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;

      // Parallax smooth interpolation
      if (!prefersReducedMotion) {
        mousePos.x += (mousePos.targetX - mousePos.x) * 0.05;
        mousePos.y += (mousePos.targetY - mousePos.y) * 0.05;
        // Scroll lerp creates physical inertia as user travels downward through space
        scrollState.currentY += (scrollState.targetY - scrollState.currentY) * 0.08;
      }

      ctx.clearRect(0, 0, dims.w, dims.h);

      // Render Stars with Depth Scroll Flight
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Depth parallax scroll multipliers:
        // Layer 1 (Deep cosmos): drifts slowly (0.16x)
        // Layer 2 (Mid galaxy): drifts medium (0.42x)
        // Layer 3 (Foreground stardust): moves fast (0.85x)
        const scrollFactor = s.layer === 1 ? 0.16 : s.layer === 2 ? 0.42 : 0.85;
        const mouseFactor = s.layer === 1 ? 0.25 : s.layer === 2 ? 0.65 : 1.1;

        // Calculate screen coordinates with vertical cosmic descent
        let drawY = s.y - scrollState.currentY * scrollFactor + mousePos.y * mouseFactor;
        drawY = ((drawY % dims.h) + dims.h) % dims.h;

        let drawX = s.x + mousePos.x * mouseFactor;
        drawX = ((drawX % dims.w) + dims.w) % dims.w;

        // Twinkle Alpha calculation
        const alpha = prefersReducedMotion
          ? s.baseAlpha
          : Math.max(0.12, s.baseAlpha + Math.sin(time * s.twinkleSpeed * 10 + s.twinkleOffset) * 0.32);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;

        // Star Core
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Bright foreground stars receive subtle 4-point cross diffraction spikes
        if (s.layer === 3 && s.size > 2.0 && !prefersReducedMotion) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.55;
          ctx.globalAlpha = alpha * 0.48;
          const flareLen = s.size * 3.6;

          ctx.beginPath();
          ctx.moveTo(drawX - flareLen, drawY);
          ctx.lineTo(drawX + flareLen, drawY);
          ctx.moveTo(drawX, drawY - flareLen);
          ctx.lineTo(drawX, drawY + flareLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Meteors occasionally streaking through the cosmos
      if (!prefersReducedMotion) {
        const now = Date.now();
        if (now - lastMeteorTime > 4500 + Math.random() * 3200) {
          spawnMeteor();
          lastMeteorTime = now;
        }

        for (let j = meteors.length - 1; j >= 0; j--) {
          const m = meteors[j];
          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.opacity -= 0.015;

          if (m.opacity <= 0 || m.x > dims.w + 100 || m.y > dims.h + 100) {
            meteors.splice(j, 1);
            continue;
          }

          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y - Math.sin(m.angle) * m.length;

          const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
          gradient.addColorStop(0, 'rgba(245, 176, 39, 0)');
          gradient.addColorStop(0.65, `rgba(142, 168, 245, ${m.opacity * 0.6})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${m.opacity})`);

          ctx.save();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = m.thickness;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();

          // Meteor starlight head
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#F5B027';
          ctx.shadowBlur = 9;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.thickness * 1.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 
        LAYER A: Full-Page Cosmic Landscape (Absolute Inset-0 spanning entire document height).
        Each section from top to bottom has a completely different cosmic environment!
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0" aria-hidden="true">
        
        {/* ========================================================================= */}
        {/* ZONE 1: ORBITAL DAWN & EXOPLANET ALPHA (Hero Section: 0% - 14%) */}
        {/* ========================================================================= */}
        <div className="absolute top-0 left-0 right-0 h-[1000px]">
          {/* Sapphire Orbital Dawn Glow */}
          <div
            className="absolute w-[75vw] h-[75vw] -top-[20vw] -right-[15vw] rounded-full opacity-35 blur-[160px] animate-pulse"
            style={{
              background: 'radial-gradient(circle, #3A58B8 0%, #16213F 60%, transparent 80%)',
              animationDuration: '12s',
            }}
          />

          {/* Far Upper-Left Ringed Gas Giant (Exoplanet Alpha) */}
          <div
            className="absolute top-[120px] left-[3%] md:left-[5%] z-10 hidden sm:flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity duration-700 pointer-events-auto cursor-pointer group"
            title="Exoplanet Alpha (Ringed Gas Giant)"
          >
            <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
              {/* Planetary Ring */}
              <div
                className="absolute w-44 h-14 md:w-56 md:h-18 rounded-full border-[3px] border-champagne/45 border-t-champagne/80 border-b-sapphire/35 shadow-[0_0_28px_rgba(245,176,39,0.3)] pointer-events-none group-hover:scale-105 transition-transform duration-700"
                style={{
                  transform: 'rotate(-26deg)',
                  background:
                    'radial-gradient(ellipse, transparent 55%, rgba(245, 176, 39, 0.16) 65%, rgba(76, 111, 209, 0.22) 75%, transparent 85%)',
                }}
              />

              {/* Planet Sphere */}
              <div
                className="w-20 h-20 md:w-26 md:h-26 rounded-full relative overflow-hidden shadow-[0_0_40px_rgba(76,111,209,0.35)] group-hover:scale-105 transition-transform duration-700"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #4C6FD1 0%, #1F3366 45%, #0A1020 90%)',
                  boxShadow:
                    'inset -12px -12px 25px rgba(0, 0, 0, 0.9), inset 6px 6px 15px rgba(245, 176, 39, 0.45), 0 0 35px rgba(76, 111, 209, 0.35)',
                }}
              >
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.18)_6px,rgba(255,255,255,0.18)_12px)]" />
                <div
                  className="absolute w-full h-2.5 bg-midnight-0/80 blur-[2px] top-1/2 -translate-y-1/2"
                  style={{ transform: 'rotate(-26deg)' }}
                />
              </div>

              {/* Orbiting Moon */}
              <div
                className="absolute w-3 h-3 rounded-full bg-champagne shadow-[0_0_12px_#F5B027] -top-2 left-6 animate-pulse"
                style={{ animationDuration: '4s' }}
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ZONE 2: ASTEROID DUST BELT & CYAN ICE WORLD (Bento Section: ~1000px - 2100px) */}
        {/* ========================================================================= */}
        <div className="absolute top-[1050px] left-0 right-0 h-[1100px]">
          {/* Cyan Aurora Cosmic Dust Sheet */}
          <div
            className="absolute w-[60vw] h-[45vw] top-[100px] -left-[15vw] rounded-full opacity-30 blur-[170px]"
            style={{
              background: 'radial-gradient(circle, #2C7A85 0%, #174E56 50%, transparent 80%)',
            }}
          />

          {/* Cyan Ice World (Kepler-452) */}
          <div
            className="absolute top-[320px] left-[3%] md:left-[5%] z-10 hidden md:flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-700 pointer-events-auto cursor-pointer group"
            title="Cyan Exoplanet (Kepler-452)"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <div
                className="w-18 h-18 md:w-24 md:h-24 rounded-full relative overflow-hidden group-hover:scale-105 transition-transform duration-700"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #2C7A85 0%, #16434B 50%, #0A1020 90%)',
                  boxShadow:
                    'inset -10px -10px 22px rgba(0, 0, 0, 0.95), inset 5px 5px 14px rgba(124, 229, 232, 0.6), 0 0 35px rgba(44, 122, 133, 0.4)',
                }}
              >
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.45),transparent_60%)]" />
              </div>
              <div className="absolute w-44 h-44 rounded-full border border-dashed border-petrol/25 pointer-events-none -rotate-12 animate-[spin_40s_linear_infinite]" />
            </div>
          </div>

          {/* Drifting Asteroid Belt Field (Subtle Cosmic Rock Nodes) */}
          <div className="absolute top-[480px] right-[4%] md:right-[8%] z-10 flex flex-col gap-4 opacity-40">
            <div className="w-2.5 h-2.5 rounded-full bg-mist/30 shadow-[0_0_8px_rgba(168,178,199,0.3)] translate-x-2" />
            <div className="w-3.5 h-3.5 rounded-full bg-champagne/25 shadow-[0_0_10px_rgba(245,176,39,0.25)] -translate-x-3" />
            <div className="w-2 h-2 rounded-full bg-sapphire/35 shadow-[0_0_8px_rgba(76,111,209,0.3)] translate-x-4" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ZONE 3: THE GREAT SAPPHIRE SPIRAL GALAXY (Karya / Projects: ~2100px - 3400px) */}
        {/* ========================================================================= */}
        <div className="absolute top-[2150px] left-0 right-0 h-[1300px]">
          {/* Majestic Spiral Galaxy Core */}
          <div
            className="absolute w-[70vw] h-[70vw] top-[50px] right-[-10vw] rounded-full opacity-35 blur-[165px]"
            style={{
              background: 'radial-gradient(circle, #3A58B8 0%, #1E336B 45%, #0F1830 75%, transparent 90%)',
            }}
          />

          {/* Pulsar Beacon Starlight Wave */}
          <div className="absolute top-[280px] right-[6%] md:right-[10%] z-10 hidden sm:flex items-center justify-center pointer-events-none">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_18px_#FFFFFF] animate-ping" />
              <div className="absolute w-8 h-8 rounded-full border border-sapphire/40 animate-pulse" />
              <div className="absolute w-14 h-14 rounded-full border border-sapphire/20 animate-ping" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Deep Indigo Stardust Stream across Projects */}
          <div
            className="absolute w-[45vw] h-[35vw] top-[600px] left-[-8vw] rounded-full opacity-25 blur-[150px]"
            style={{
              background: 'radial-gradient(circle, #4C6FD1 0%, #16213F 65%, transparent 85%)',
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* ZONE 4: THE SOLAR NURSERY & GOLDEN SUPERCLUSTER (Dev Studio: ~3450px - 4600px) */}
        {/* ========================================================================= */}
        <div className="absolute top-[3450px] left-0 right-0 h-[1200px]">
          {/* Radiant Solar Gold Supernova Remnant Nebula */}
          <div
            className="absolute w-[65vw] h-[55vw] top-[80px] right-[-12vw] rounded-full opacity-25 blur-[165px]"
            style={{
              background: 'radial-gradient(circle, #F5B027 0%, #D98218 45%, #6B3D06 70%, transparent 85%)',
            }}
          />

          {/* The Golden Crater Moon (Solar Satellite) */}
          <div
            className="absolute top-[260px] right-[4%] md:right-[7%] z-10 hidden sm:flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-700 pointer-events-auto cursor-pointer group"
            title="Golden Moon (Solar Satellite)"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full relative overflow-hidden group-hover:scale-105 transition-transform duration-700"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #F5B027 0%, #A86D12 55%, #0A1020 92%)',
                  boxShadow:
                    'inset -8px -8px 20px rgba(0, 0, 0, 0.9), inset 5px 5px 14px rgba(255, 235, 175, 0.75), 0 0 32px rgba(245, 176, 39, 0.45)',
                }}
              >
                {/* Moon Crater Accents */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-midnight-0/40 top-3 left-4" />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-midnight-0/35 bottom-3 right-4" />
                <div className="absolute w-2 h-2 rounded-full bg-midnight-0/30 top-7 right-3" />
              </div>
              {/* Gravitational Magnetic Field Lines */}
              <div className="absolute w-32 h-32 rounded-full border border-champagne/20 pointer-events-none rotate-45" />
            </div>
          </div>

          {/* Emerald Cosmic Filament behind Dev Studio Labs */}
          <div
            className="absolute w-[50vw] h-[40vw] top-[550px] -left-[12vw] rounded-full opacity-25 blur-[160px]"
            style={{
              background: 'radial-gradient(circle, #2C7A85 0%, #1A545D 55%, transparent 80%)',
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* ZONE 5: THE DEEP VOID & BINARY STAR CLUSTER (Experience: ~4650px - 5600px) */}
        {/* ========================================================================= */}
        <div className="absolute top-[4650px] left-0 right-0 h-[1050px]">
          {/* Deep Indigo Cosmic Void */}
          <div
            className="absolute w-[60vw] h-[50vw] top-[50px] left-[5vw] rounded-full opacity-28 blur-[160px]"
            style={{
              background: 'radial-gradient(circle, #1E2D54 0%, #0F1830 65%, transparent 85%)',
            }}
          />

          {/* Binary Stars System (Twin Cosmic Orbiters) */}
          <div
            className="absolute top-[280px] left-[4%] md:left-[8%] z-10 hidden md:flex items-center gap-3 opacity-65 hover:opacity-95 transition-opacity duration-700 pointer-events-auto"
            title="Distant Binary Star System (Epsilon Aurigae)"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sapphire to-white shadow-[0_0_20px_#8EA8F5] animate-pulse" />
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-champagne to-white shadow-[0_0_16px_#F5B027] animate-pulse" style={{ animationDelay: '1.2s' }} />
          </div>

          {/* Outer Stardust Haze */}
          <div
            className="absolute w-[45vw] h-[45vw] top-[400px] right-[-8vw] rounded-full opacity-22 blur-[150px]"
            style={{
              background: 'radial-gradient(circle, #3A58B8 0%, #16213F 60%, transparent 80%)',
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* ZONE 6: THE EVENT HORIZON & STARDUST RIVER (Contact & Footer: ~5700px - End) */}
        {/* ========================================================================= */}
        <div className="absolute top-[5700px] left-0 right-0 bottom-0 min-h-[1400px]">
          {/* Stardust River flowing behind Contact & Footer */}
          <div
            className="absolute w-[70vw] h-[60vw] top-[50px] left-1/2 -translate-x-1/2 rounded-full opacity-25 blur-[180px]"
            style={{
              background: 'radial-gradient(circle, #2C7A85 0%, #1E336B 45%, #0A1020 80%, transparent 95%)',
            }}
          />

          {/* Distant Terrestrial Dwarf Planet at Cosmic Edge */}
          <div
            className="absolute top-[420px] left-[6%] md:left-[10%] z-10 flex items-center justify-center opacity-60 hover:opacity-90 transition-opacity duration-700"
            title="Cosmic Horizon Dwarf Planet"
          >
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full relative overflow-hidden shadow-[0_0_20px_rgba(76,111,209,0.4)]"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #8EA8F5 0%, #2A3E75 55%, #0A1020 90%)',
                boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.9), inset 3px 3px 6px rgba(255, 255, 255, 0.6)',
              }}
            />
          </div>

          {/* Solar Warmth Glow on Footer Edge */}
          <div
            className="absolute w-[50vw] h-[40vw] bottom-[40px] right-[5vw] rounded-full opacity-20 blur-[160px]"
            style={{
              background: 'radial-gradient(circle, #F5B027 0%, #D98218 45%, transparent 75%)',
            }}
          />
        </div>
      </div>

      {/* 
        LAYER B: Fixed 3D Depth Starfield & Meteor Canvas.
        Parallax scroll flight gives genuine tactile sensation of plunging through deep outer space!
      */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 w-full h-full" />

      {/* 
        LAYER C: Cinematic Film Grain Texture for High-End Astrophotography Polish
      */}
      <div className="film-grain z-30" />
    </>
  );
};
