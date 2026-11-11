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

    // Cosmic starlight color spectrum (Authentic astronomical stellar classifications)
    const starColors = [
      '#FFFFFF', // O/A-Class Pure Starlight
      '#F8FAFC', // Diamond Starlight
      '#BAE6FD', // B-Class Blue Giant
      '#93C5FD', // Ice Sapphire
      '#FFFBEB', // F-Class Warm White
      '#FDE047', // G-Class Solar Yellow
      '#F5B027', // K-Class Radiant Amber
    ];

    // Multi-depth star field (Optimized: 60 on mobile, 160 on desktop for 60-120fps buttery scrolling)
    const stars: Star[] = [];
    const isMobile = dims.w < 768;
    const starCount = Math.min(Math.floor((dims.w * dims.h) / 5000), isMobile ? 65 : 160);

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

    // Mobile Optimization: Paint static starfield once into GPU buffer (0% CPU/GPU overhead)
    if (isMobile) {
      ctx.clearRect(0, 0, dims.w, dims.h);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        ctx.save();
        ctx.globalAlpha = s.baseAlpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      return;
    }

    // Animation Loop (Desktop Only for buttery smooth 60-120fps)
    let time = 0;
    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (document.hidden) return;
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
        const meteorInterval = isMobile ? 6500 : 4500;
        if (now - lastMeteorTime > meteorInterval + Math.random() * 3200) {
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
          {/* Sapphire Orbital Dawn Glow (Static Hardware-Accelerated Gradient) */}
          <div
            className="absolute w-[65vw] h-[65vw] -top-[15vw] -right-[10vw] rounded-full opacity-30 blur-3xl md:blur-[120px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #3A58B8 0%, #16213F 60%, transparent 80%)',
            }}
          />

          {/* SPREAD CELESTIAL BODY: Photorealistic Ringed Gold Gas Giant (Desktop Only - Avoids clutter on mobile header) */}
          <div
            className="absolute top-[16px] sm:top-[38px] md:top-[48px] left-[1%] md:left-[3%] lg:left-[5%] z-0 hidden md:flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-700 pointer-events-none group"
            title="Golden Gas Giant Exoplanet (Photorealistic Atmospheric Cloud Belts and 3D Rings)"
          >
            <div className="relative w-36 h-28 sm:w-64 sm:h-44 md:w-72 md:h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              {/* Volumetric Planetary Starlight Haze */}
              <div
                className="absolute inset-2 rounded-full blur-[32px] opacity-45 pointer-events-none group-hover:opacity-75 transition-opacity duration-700"
                style={{
                  background:
                    'radial-gradient(circle, rgba(245, 176, 39, 0.45) 0%, rgba(227, 154, 94, 0.25) 45%, rgba(99, 102, 241, 0.15) 70%, transparent 80%)',
                }}
              />

              {/* Photorealistic 3D Ringed Gas Giant (Warm Amber/Champagne with Ice-Sapphire Rings) */}
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  {/* Gas Giant Atmospheric Surface Shading (Warm Champagne & Radiant Amber) */}
                  <radialGradient id="goldPlanetSurface" cx="32%" cy="28%" r="68%">
                    <stop offset="0%" stopColor="#FFF9E6" />
                    <stop offset="18%" stopColor="#FDE047" />
                    <stop offset="38%" stopColor="#F5B027" />
                    <stop offset="60%" stopColor="#D97706" />
                    <stop offset="80%" stopColor="#78350F" />
                    <stop offset="100%" stopColor="#1C0F05" />
                  </radialGradient>

                  {/* Atmospheric Rayleigh Limb Scattering */}
                  <radialGradient id="goldLimbScatter" cx="30%" cy="26%" r="72%">
                    <stop offset="70%" stopColor="transparent" />
                    <stop offset="88%" stopColor="#FDE047" stopOpacity="0.35" />
                    <stop offset="98%" stopColor="#FFF7E6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  </radialGradient>

                  {/* Ring System Gradients (Icy Sapphire & Platinum Crystal with Gold Trim) */}
                  <linearGradient id="goldBRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.85" />
                    <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.98" />
                    <stop offset="52%" stopColor="#BAE6FD" stopOpacity="0.92" />
                    <stop offset="76%" stopColor="#F5B027" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.82" />
                  </linearGradient>

                  <linearGradient id="goldARingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F5B027" stopOpacity="0.75" />
                    <stop offset="42%" stopColor="#BAE6FD" stopOpacity="0.85" />
                    <stop offset="75%" stopColor="#93C5FD" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="goldCRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#78350F" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#B45309" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#78350F" stopOpacity="0.45" />
                  </linearGradient>

                  {/* Cloud Band Gradients */}
                  <linearGradient id="goldBandGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FDE047" stopOpacity="0.55" />
                    <stop offset="40%" stopColor="#FFFBEB" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#B45309" stopOpacity="0.35" />
                  </linearGradient>

                  <linearGradient id="goldBandGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F5B027" stopOpacity="0.65" />
                    <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="80%" stopColor="#92400E" stopOpacity="0.4" />
                  </linearGradient>

                  {/* Blur Filters */}
                  <filter id="goldCloudSoft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.8" />
                  </filter>
                  <filter id="goldShadowSoft" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.2" />
                  </filter>

                  {/* Clips */}
                  <clipPath id="goldPlanetBodyClip">
                    <circle cx="160" cy="110" r="46" />
                  </clipPath>

                  {/* Clip for Back Half of Rings (Upper Hemisphere: y <= 1) */}
                  <clipPath id="goldRingBackClip">
                    <rect x="-160" y="-120" width="320" height="121" />
                  </clipPath>

                  {/* Clip for Front Half of Rings (Lower Hemisphere: y >= -1) */}
                  <clipPath id="goldRingFrontClip">
                    <rect x="-160" y="-1" width="320" height="121" />
                  </clipPath>
                </defs>

                {/* ================= LAYER 1: BACK HALF OF RINGS (Passes BEHIND Planet) ================= */}
                <g transform="translate(160, 110) rotate(22)" clipPath="url(#goldRingBackClip)">
                  {/* Outer Faint F-Ring */}
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#FDE047" strokeWidth="1" opacity="0.45" />

                  {/* Outer A-Ring */}
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#goldARingGrad)" strokeWidth="15" opacity="0.75" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#0A0502" strokeWidth="0.8" opacity="0.65" />

                  {/* Cassini Division Gap (True Empty Space) */}
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#0A0502" strokeWidth="3" opacity="0.85" />

                  {/* Dense Luminous B-Ring */}
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#goldBRingGrad)" strokeWidth="18" opacity="0.9" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#F5B027" strokeWidth="0.8" opacity="0.45" />

                  {/* Translucent Inner Crepe C-Ring */}
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#goldCRingGrad)" strokeWidth="10" opacity="0.4" />

                  {/* Planet's Soft Spherical Shadow cast onto the Back Rings */}
                  <ellipse cx="-22" cy="-30" rx="44" ry="24" fill="#0A0502" opacity="0.92" filter="url(#goldShadowSoft)" />
                </g>

                {/* ================= LAYER 2: THE PLANET SPHERE ================= */}
                <g>
                  {/* Base Spherical Gas Giant Body */}
                  <circle cx="160" cy="110" r="46" fill="url(#goldPlanetSurface)" />

                  {/* Atmospheric Cloud Belts & Ring Shadows (Clipped strictly to Planet Sphere) */}
                  <g clipPath="url(#goldPlanetBodyClip)">
                    {/* Tilted Cloud Belts (Aligned parallel to equatorial ring plane) */}
                    <g transform="rotate(22 160 110)">
                      {/* North Temperate Jet Stream */}
                      <path
                        d="M 112 94 Q 160 102 208 94 L 208 102 Q 160 110 112 102 Z"
                        fill="url(#goldBandGrad1)"
                        opacity="0.55"
                        filter="url(#goldCloudSoft)"
                      />
                      {/* Bright Equatorial Zone */}
                      <path
                        d="M 112 106 Q 160 115 208 106 L 208 116 Q 160 125 112 116 Z"
                        fill="url(#goldBandGrad2)"
                        opacity="0.65"
                        filter="url(#goldCloudSoft)"
                      />
                      {/* South Tropical Belt */}
                      <path
                        d="M 112 120 Q 160 128 208 120 L 208 127 Q 160 135 112 127 Z"
                        fill="url(#goldBandGrad1)"
                        opacity="0.45"
                        filter="url(#goldCloudSoft)"
                      />

                      {/* Turbulent Cloud Storm Eddies */}
                      <ellipse cx="145" cy="108" rx="8" ry="3" fill="#FFFBEB" opacity="0.45" filter="url(#goldCloudSoft)" />
                      <ellipse cx="178" cy="95" rx="6" ry="2.2" fill="#FDE047" opacity="0.35" filter="url(#goldCloudSoft)" />

                      {/* Dramatic Ring Shadow on Planet's Cloud Tops (Cast by front rings) */}
                      <path
                        d="M 112 116 Q 160 126 208 116 L 208 123 Q 160 133 112 123 Z"
                        fill="#0A0502"
                        opacity="0.78"
                        filter="url(#goldShadowSoft)"
                      />
                    </g>
                  </g>

                  {/* Atmospheric Rayleigh Limb Scatter (Crescent Glow on Illuminated Edge) */}
                  <circle cx="160" cy="110" r="46" fill="url(#goldLimbScatter)" />
                </g>

                {/* ================= LAYER 3: FRONT HALF OF RINGS (Passes IN FRONT OF Planet) ================= */}
                <g transform="translate(160, 110) rotate(22)" clipPath="url(#goldRingFrontClip)">
                  {/* Outer Faint F-Ring */}
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#FDE047" strokeWidth="1" opacity="0.55" />

                  {/* Outer A-Ring */}
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#goldARingGrad)" strokeWidth="15" opacity="0.82" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#0A0502" strokeWidth="0.9" opacity="0.7" />

                  {/* Cassini Division Gap (True Empty Space) */}
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#0A0502" strokeWidth="3" opacity="0.85" />

                  {/* Dense Luminous B-Ring */}
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#goldBRingGrad)" strokeWidth="18" opacity="0.95" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#F5B027" strokeWidth="0.9" opacity="0.5" />

                  {/* Translucent Inner Crepe C-Ring */}
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#goldCRingGrad)" strokeWidth="10" opacity="0.45" />
                </g>

                {/* ================= LAYER 4: ICY SHEPHERD MOON ================= */}
                <circle cx="52" cy="76" r="1.8" fill="#FFF9E6" />
                <circle cx="52" cy="76" r="4" fill="#FDE047" opacity="0.5" filter="url(#goldCloudSoft)" />
              </svg>
            </div>
          </div>

          {/* SPREAD CELESTIAL BODY 1: Photorealistic Ringed Gas Giant (Cassini / Kepler-186f Orbit) */}
          <div
            className="absolute top-[48px] sm:top-[26px] md:top-[34px] right-[2%] md:right-[4%] lg:right-[5%] z-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-700 pointer-events-none group"
            title="Gas Giant Exoplanet (Photorealistic Atmospheric Cloud Bands & 3D Rings)"
          >
            <div className="relative w-36 h-28 sm:w-64 sm:h-44 md:w-72 md:h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              {/* Volumetric Planetary Starlight Haze */}
              <div
                className="absolute inset-2 rounded-full blur-[32px] opacity-45 pointer-events-none group-hover:opacity-75 transition-opacity duration-700"
                style={{
                  background:
                    'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(245, 176, 39, 0.22) 50%, transparent 75%)',
                }}
              />

              {/* Photorealistic 3D Ringed Gas Giant (True Front/Back Ring Overlap + Shadows) */}
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  {/* Gas Giant Atmospheric Surface Shading */}
                  <radialGradient id="gasGiantSurface" cx="32%" cy="28%" r="68%">
                    <stop offset="0%" stopColor="#93C5FD" />
                    <stop offset="22%" stopColor="#3B82F6" />
                    <stop offset="48%" stopColor="#1D4ED8" />
                    <stop offset="74%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>

                  {/* Atmospheric Rayleigh Limb Scattering */}
                  <radialGradient id="atmosphereLimbScatter" cx="30%" cy="26%" r="72%">
                    <stop offset="70%" stopColor="transparent" />
                    <stop offset="88%" stopColor="#67E8F9" stopOpacity="0.4" />
                    <stop offset="98%" stopColor="#93C5FD" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  </radialGradient>

                  {/* Ring System Gradients */}
                  <linearGradient id="bRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F5B027" stopOpacity="0.85" />
                    <stop offset="28%" stopColor="#FFF7E6" stopOpacity="0.98" />
                    <stop offset="55%" stopColor="#FDE047" stopOpacity="0.92" />
                    <stop offset="75%" stopColor="#93C5FD" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#F5B027" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="aRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.75" />
                    <stop offset="45%" stopColor="#60A5FA" stopOpacity="0.85" />
                    <stop offset="78%" stopColor="#F5B027" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="cRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#2563EB" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.45" />
                  </linearGradient>

                  {/* Cloud Band Gradients */}
                  <linearGradient id="bandGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
                    <stop offset="40%" stopColor="#BAE6FD" stopOpacity="0.7" />
                    <stop offset="85%" stopColor="#1E40AF" stopOpacity="0.3" />
                  </linearGradient>

                  <linearGradient id="bandGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.65" />
                    <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.8" />
                    <stop offset="80%" stopColor="#1D4ED8" stopOpacity="0.35" />
                  </linearGradient>

                  {/* Blur Filters */}
                  <filter id="cloudSoft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.8" />
                  </filter>
                  <filter id="shadowSoft" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.2" />
                  </filter>

                  {/* Clips */}
                  <clipPath id="planetBodyClip">
                    <circle cx="160" cy="110" r="46" />
                  </clipPath>

                  {/* Clip for Back Half of Rings (Upper Hemisphere: y <= 1) */}
                  <clipPath id="ringBackClip">
                    <rect x="-160" y="-120" width="320" height="121" />
                  </clipPath>

                  {/* Clip for Front Half of Rings (Lower Hemisphere: y >= -1) */}
                  <clipPath id="ringFrontClip">
                    <rect x="-160" y="-1" width="320" height="121" />
                  </clipPath>
                </defs>

                {/* ================= LAYER 1: BACK HALF OF RINGS (Passes BEHIND Planet) ================= */}
                <g transform="translate(160, 110) rotate(-22)" clipPath="url(#ringBackClip)">
                  {/* Outer Faint F-Ring */}
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.45" />

                  {/* Outer A-Ring */}
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#aRingGrad)" strokeWidth="15" opacity="0.75" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#020617" strokeWidth="0.8" opacity="0.65" />

                  {/* Cassini Division Gap (True Empty Space) */}
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#020617" strokeWidth="3" opacity="0.85" />

                  {/* Dense Luminous B-Ring */}
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#bRingGrad)" strokeWidth="18" opacity="0.9" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.35" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#F5B027" strokeWidth="0.8" opacity="0.45" />

                  {/* Translucent Inner Crepe C-Ring */}
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#cRingGrad)" strokeWidth="10" opacity="0.4" />

                  {/* Planet's Soft Spherical Shadow cast onto the Back Rings */}
                  <ellipse cx="22" cy="-30" rx="44" ry="24" fill="#020617" opacity="0.92" filter="url(#shadowSoft)" />
                </g>

                {/* ================= LAYER 2: THE PLANET SPHERE ================= */}
                <g>
                  {/* Base Spherical Gas Giant Body */}
                  <circle cx="160" cy="110" r="46" fill="url(#gasGiantSurface)" />

                  {/* Atmospheric Cloud Belts & Ring Shadows (Clipped strictly to Planet Sphere) */}
                  <g clipPath="url(#planetBodyClip)">
                    {/* Tilted Cloud Belts (Aligned parallel to equatorial ring plane) */}
                    <g transform="rotate(-22 160 110)">
                      {/* North Temperate Jet Stream */}
                      <path
                        d="M 112 94 Q 160 102 208 94 L 208 102 Q 160 110 112 102 Z"
                        fill="url(#bandGrad1)"
                        opacity="0.55"
                        filter="url(#cloudSoft)"
                      />
                      {/* Bright Equatorial Zone */}
                      <path
                        d="M 112 106 Q 160 115 208 106 L 208 116 Q 160 125 112 116 Z"
                        fill="url(#bandGrad2)"
                        opacity="0.65"
                        filter="url(#cloudSoft)"
                      />
                      {/* South Tropical Belt */}
                      <path
                        d="M 112 120 Q 160 128 208 120 L 208 127 Q 160 135 112 127 Z"
                        fill="url(#bandGrad1)"
                        opacity="0.45"
                        filter="url(#cloudSoft)"
                      />

                      {/* Turbulent Cirrus Storm Eddies */}
                      <ellipse cx="145" cy="108" rx="8" ry="3" fill="#BAE6FD" opacity="0.45" filter="url(#cloudSoft)" />
                      <ellipse cx="178" cy="95" rx="6" ry="2.2" fill="#67E8F9" opacity="0.35" filter="url(#cloudSoft)" />

                      {/* Dramatic Ring Shadow on Planet's Cloud Tops (Cast by front rings) */}
                      <path
                        d="M 112 116 Q 160 126 208 116 L 208 123 Q 160 133 112 123 Z"
                        fill="#020617"
                        opacity="0.78"
                        filter="url(#shadowSoft)"
                      />
                    </g>
                  </g>

                  {/* Atmospheric Rayleigh Limb Scatter (Crescent Glow on Illuminated Edge) */}
                  <circle cx="160" cy="110" r="46" fill="url(#atmosphereLimbScatter)" />
                </g>

                {/* ================= LAYER 3: FRONT HALF OF RINGS (Passes IN FRONT OF Planet) ================= */}
                <g transform="translate(160, 110) rotate(-22)" clipPath="url(#ringFrontClip)">
                  {/* Outer Faint F-Ring */}
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.55" />

                  {/* Outer A-Ring */}
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#aRingGrad)" strokeWidth="15" opacity="0.82" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#020617" strokeWidth="0.9" opacity="0.7" />

                  {/* Cassini Division Gap (True Empty Space) */}
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#020617" strokeWidth="3" opacity="0.85" />

                  {/* Dense Luminous B-Ring */}
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#bRingGrad)" strokeWidth="18" opacity="0.95" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#F5B027" strokeWidth="0.9" opacity="0.5" />

                  {/* Translucent Inner Crepe C-Ring (Gas giant clouds faintly visible through it) */}
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#cRingGrad)" strokeWidth="10" opacity="0.45" />
                </g>

                {/* ================= LAYER 4: ICY SHEPHERD MOON ================= */}
                <circle cx="268" cy="76" r="1.8" fill="#F8FAFC" />
                <circle cx="268" cy="76" r="4" fill="#93C5FD" opacity="0.5" filter="url(#cloudSoft)" />
              </svg>
            </div>
          </div>

          {/* SPREAD CELESTIAL BODY 2: Deep Terrestrial Exoplanet (Lower-Left Deep Space) */}
          <div
            className="absolute top-[640px] sm:top-[680px] left-[3%] sm:left-[5%] md:left-[6%] z-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-700 pointer-events-none group"
            title="Terrestrial Exoplanet (Proxima Centauri b)"
          >
            <div className="relative w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 flex items-center justify-center">
              {/* Soft Oceanic Atmosphere Halo */}
              <div
                className="absolute inset-0 rounded-full blur-[20px] opacity-45 pointer-events-none group-hover:opacity-75 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)',
                }}
              />

              {/* Dashed Orbital Starlight Ring */}
              <div className="absolute w-36 sm:w-40 md:w-44 h-36 sm:h-40 md:h-44 rounded-full border border-dashed border-sapphire/30 pointer-events-none animate-[spin_60s_linear_infinite]" />

              {/* Planet Sphere Body */}
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full relative overflow-hidden group-hover:scale-105 transition-transform duration-700 z-10"
                style={{
                  background: 'radial-gradient(circle at 28% 28%, #38BDF8 0%, #1E40AF 45%, #0B132B 90%)',
                  boxShadow:
                    'inset -7px -7px 16px rgba(0, 0, 0, 0.95), inset 4px 4px 8px rgba(186, 230, 253, 0.6), 0 0 24px rgba(56, 189, 248, 0.3)',
                }}
              >
                {/* Surface Continent Silhouettes */}
                <div className="absolute w-7 h-5 rounded-full bg-[#1E3A8A]/40 top-3 left-3 blur-[1px]" />
                <div className="absolute w-8 h-6 rounded-full bg-[#1E3A8A]/40 bottom-3 right-3 blur-[1px]" />
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.45),transparent_60%)]" />
              </div>
            </div>
          </div>

          {/* SPREAD CELESTIAL BODY 3: Starlight Lunar Satellite (Lower-Right Cosmic Horizon) */}
          <div
            className="absolute top-[730px] sm:top-[770px] right-[4%] sm:right-[7%] md:right-[9%] z-0 flex items-center justify-center opacity-65 hover:opacity-100 transition-all duration-700 pointer-events-none group"
            title="Starlight Lunar Satellite (Titan Minor)"
          >
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 flex items-center justify-center">
              {/* Solar Warmth Backlight Halo */}
              <div
                className="absolute inset-0 rounded-full blur-[16px] opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 176, 39, 0.4) 0%, transparent 70%)',
                }}
              />

              {/* Tilted Elliptical Orbit Path */}
              <div className="absolute w-28 sm:w-32 md:w-34 h-28 sm:h-32 md:h-34 rounded-full border border-champagne/25 pointer-events-none -rotate-45" />

              {/* Satellite Moon Sphere */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full relative overflow-hidden group-hover:scale-110 transition-transform duration-700 z-10"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #FDE68A 0%, #D97706 60%, #1E1B18 92%)',
                  boxShadow:
                    'inset -5px -5px 12px rgba(0, 0, 0, 0.9), inset 3px 3px 6px rgba(254, 243, 199, 0.8), 0 0 20px rgba(245, 176, 39, 0.35)',
                }}
              >
                {/* Surface Crater Dots */}
                <div className="absolute w-1.5 h-1.5 rounded-full bg-black/45 top-2.5 left-3" />
                <div className="absolute w-2 h-2 rounded-full bg-black/40 bottom-3 right-3" />
                <div className="absolute w-1 h-1 rounded-full bg-black/35 top-5 right-2" />
              </div>
            </div>
          </div>

          {/* Subtle Cosmic Constellation Web in Negative Space */}
          <div className="absolute top-[220px] right-[2%] sm:right-[4%] z-0 hidden lg:block opacity-35 pointer-events-none">
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
              <line x1="20" y1="30" x2="65" y2="80" stroke="rgba(245, 176, 39, 0.35)" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="65" y1="80" x2="100" y2="140" stroke="rgba(96, 165, 250, 0.35)" strokeWidth="0.8" strokeDasharray="3 3" />
              <circle cx="20" cy="30" r="2" fill="#F5B027" />
              <circle cx="65" cy="80" r="2.5" fill="#FFFFFF" />
              <circle cx="100" cy="140" r="2" fill="#60A5FA" />
            </svg>
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

          {/* SPREAD CELESTIAL BODY 4: Photorealistic Cyan Ice Gas Giant (Desktop Only) */}
          <div
            className="absolute top-[260px] left-[2%] sm:left-[3%] md:left-[4%] lg:left-[5%] z-0 hidden md:flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-700 pointer-events-none group"
            title="Cyan Ice Gas Giant (Kepler-452b Frosted Rings)"
          >
            <div className="relative w-52 h-36 sm:w-60 sm:h-40 md:w-68 md:h-46 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              {/* Volumetric Planetary Starlight Haze */}
              <div
                className="absolute inset-2 rounded-full blur-[32px] opacity-45 pointer-events-none group-hover:opacity-75 transition-opacity duration-700"
                style={{
                  background:
                    'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(44, 122, 133, 0.25) 45%, transparent 75%)',
                }}
              />

              <svg viewBox="0 0 320 220" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="cyanPlanetSurface" cx="32%" cy="28%" r="68%">
                    <stop offset="0%" stopColor="#E0F2FE" />
                    <stop offset="20%" stopColor="#67E8F9" />
                    <stop offset="45%" stopColor="#06B6D4" />
                    <stop offset="70%" stopColor="#0E7490" />
                    <stop offset="100%" stopColor="#082F49" />
                  </radialGradient>

                  <radialGradient id="cyanLimbScatter" cx="30%" cy="26%" r="72%">
                    <stop offset="70%" stopColor="transparent" />
                    <stop offset="88%" stopColor="#67E8F9" stopOpacity="0.35" />
                    <stop offset="98%" stopColor="#A5F3FC" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  </radialGradient>

                  <linearGradient id="cyanBRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.85" />
                    <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.98" />
                    <stop offset="52%" stopColor="#A5F3FC" stopOpacity="0.92" />
                    <stop offset="76%" stopColor="#22D3EE" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#0891B2" stopOpacity="0.82" />
                  </linearGradient>

                  <linearGradient id="cyanARingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A5F3FC" stopOpacity="0.75" />
                    <stop offset="42%" stopColor="#22D3EE" stopOpacity="0.85" />
                    <stop offset="75%" stopColor="#67E8F9" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#0E7490" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="cyanCRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#082F49" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#155E75" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#082F49" stopOpacity="0.45" />
                  </linearGradient>

                  <linearGradient id="cyanBandGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.55" />
                    <stop offset="40%" stopColor="#ECFEFF" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#0E7490" stopOpacity="0.35" />
                  </linearGradient>

                  <linearGradient id="cyanBandGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.65" />
                    <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="80%" stopColor="#164E63" stopOpacity="0.4" />
                  </linearGradient>

                  <filter id="cyanCloudSoft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.8" />
                  </filter>
                  <filter id="cyanShadowSoft" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.2" />
                  </filter>

                  <clipPath id="cyanPlanetBodyClip">
                    <circle cx="160" cy="110" r="46" />
                  </clipPath>
                  <clipPath id="cyanRingBackClip">
                    <rect x="-160" y="-120" width="320" height="121" />
                  </clipPath>
                  <clipPath id="cyanRingFrontClip">
                    <rect x="-160" y="-1" width="320" height="121" />
                  </clipPath>
                </defs>

                <g transform="translate(160, 110) rotate(-18)" clipPath="url(#cyanRingBackClip)">
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#A5F3FC" strokeWidth="1" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#cyanARingGrad)" strokeWidth="15" opacity="0.75" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#04121F" strokeWidth="0.8" opacity="0.65" />
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#04121F" strokeWidth="3" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#cyanBRingGrad)" strokeWidth="18" opacity="0.9" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#22D3EE" strokeWidth="0.8" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#cyanCRingGrad)" strokeWidth="10" opacity="0.4" />
                  <ellipse cx="22" cy="-30" rx="44" ry="24" fill="#04121F" opacity="0.92" filter="url(#cyanShadowSoft)" />
                </g>

                <g>
                  <circle cx="160" cy="110" r="46" fill="url(#cyanPlanetSurface)" />
                  <g clipPath="url(#cyanPlanetBodyClip)">
                    <g transform="rotate(-18 160 110)">
                      <path d="M 112 94 Q 160 102 208 94 L 208 102 Q 160 110 112 102 Z" fill="url(#cyanBandGrad1)" opacity="0.55" filter="url(#cyanCloudSoft)" />
                      <path d="M 112 106 Q 160 115 208 106 L 208 116 Q 160 125 112 116 Z" fill="url(#cyanBandGrad2)" opacity="0.65" filter="url(#cyanCloudSoft)" />
                      <path d="M 112 120 Q 160 128 208 120 L 208 127 Q 160 135 112 127 Z" fill="url(#cyanBandGrad1)" opacity="0.45" filter="url(#cyanCloudSoft)" />
                      <ellipse cx="145" cy="108" rx="8" ry="3" fill="#ECFEFF" opacity="0.45" filter="url(#cyanCloudSoft)" />
                      <ellipse cx="178" cy="95" rx="6" ry="2.2" fill="#67E8F9" opacity="0.35" filter="url(#cyanCloudSoft)" />
                      <path d="M 112 116 Q 160 126 208 116 L 208 123 Q 160 133 112 123 Z" fill="#04121F" opacity="0.78" filter="url(#cyanShadowSoft)" />
                    </g>
                  </g>
                  <circle cx="160" cy="110" r="46" fill="url(#cyanLimbScatter)" />
                </g>

                <g transform="translate(160, 110) rotate(-18)" clipPath="url(#cyanRingFrontClip)">
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#A5F3FC" strokeWidth="1" opacity="0.55" />
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#cyanARingGrad)" strokeWidth="15" opacity="0.82" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#04121F" strokeWidth="0.9" opacity="0.7" />
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#04121F" strokeWidth="3" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#cyanBRingGrad)" strokeWidth="18" opacity="0.95" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#22D3EE" strokeWidth="0.9" opacity="0.5" />
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#cyanCRingGrad)" strokeWidth="10" opacity="0.45" />
                </g>

                <circle cx="268" cy="76" r="1.8" fill="#ECFEFF" />
                <circle cx="268" cy="76" r="4" fill="#67E8F9" opacity="0.5" filter="url(#cyanCloudSoft)" />
              </svg>
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

          {/* SPREAD CELESTIAL BODY 5: Photorealistic Amethyst Gas Giant (Desktop Only) */}
          <div
            className="absolute top-[320px] right-[2%] sm:right-[3%] md:right-[4%] lg:right-[5%] z-0 hidden md:flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-700 pointer-events-none group"
            title="Amethyst Gas Giant Exoplanet (Kepler-16b Orbital Rings)"
          >
            <div className="relative w-52 h-36 sm:w-60 sm:h-40 md:w-68 md:h-46 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              {/* Volumetric Planetary Starlight Haze */}
              <div
                className="absolute inset-2 rounded-full blur-[32px] opacity-45 pointer-events-none group-hover:opacity-75 transition-opacity duration-700"
                style={{
                  background:
                    'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(107, 33, 168, 0.25) 45%, transparent 75%)',
                }}
              />

              <svg viewBox="0 0 320 220" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="violetPlanetSurface" cx="32%" cy="28%" r="68%">
                    <stop offset="0%" stopColor="#F3E8FF" />
                    <stop offset="18%" stopColor="#C084FC" />
                    <stop offset="40%" stopColor="#9333EA" />
                    <stop offset="65%" stopColor="#6B21A8" />
                    <stop offset="85%" stopColor="#3B0764" />
                    <stop offset="100%" stopColor="#130324" />
                  </radialGradient>

                  <radialGradient id="violetLimbScatter" cx="30%" cy="26%" r="72%">
                    <stop offset="70%" stopColor="transparent" />
                    <stop offset="88%" stopColor="#C084FC" stopOpacity="0.35" />
                    <stop offset="98%" stopColor="#E9D5FF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  </radialGradient>

                  <linearGradient id="violetBRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.85" />
                    <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.98" />
                    <stop offset="52%" stopColor="#D8B4FE" stopOpacity="0.92" />
                    <stop offset="76%" stopColor="#A855F7" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.82" />
                  </linearGradient>

                  <linearGradient id="violetARingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D8B4FE" stopOpacity="0.75" />
                    <stop offset="42%" stopColor="#C084FC" stopOpacity="0.85" />
                    <stop offset="75%" stopColor="#A855F7" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#6B21A8" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="violetCRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B0764" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#581C87" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3B0764" stopOpacity="0.45" />
                  </linearGradient>

                  <linearGradient id="violetBandGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C084FC" stopOpacity="0.55" />
                    <stop offset="40%" stopColor="#FAF5FF" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#581C87" stopOpacity="0.35" />
                  </linearGradient>

                  <linearGradient id="violetBandGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.65" />
                    <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="80%" stopColor="#3B0764" stopOpacity="0.4" />
                  </linearGradient>

                  <filter id="violetCloudSoft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.8" />
                  </filter>
                  <filter id="violetShadowSoft" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.2" />
                  </filter>

                  <clipPath id="violetPlanetBodyClip">
                    <circle cx="160" cy="110" r="46" />
                  </clipPath>
                  <clipPath id="violetRingBackClip">
                    <rect x="-160" y="-120" width="320" height="121" />
                  </clipPath>
                  <clipPath id="violetRingFrontClip">
                    <rect x="-160" y="-1" width="320" height="121" />
                  </clipPath>
                </defs>

                <g transform="translate(160, 110) rotate(24)" clipPath="url(#violetRingBackClip)">
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#E9D5FF" strokeWidth="1" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#violetARingGrad)" strokeWidth="15" opacity="0.75" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#0E021A" strokeWidth="0.8" opacity="0.65" />
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#0E021A" strokeWidth="3" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#violetBRingGrad)" strokeWidth="18" opacity="0.9" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#C084FC" strokeWidth="0.8" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#violetCRingGrad)" strokeWidth="10" opacity="0.4" />
                  <ellipse cx="-22" cy="-30" rx="44" ry="24" fill="#0E021A" opacity="0.92" filter="url(#violetShadowSoft)" />
                </g>

                <g>
                  <circle cx="160" cy="110" r="46" fill="url(#violetPlanetSurface)" />
                  <g clipPath="url(#violetPlanetBodyClip)">
                    <g transform="rotate(24 160 110)">
                      <path d="M 112 94 Q 160 102 208 94 L 208 102 Q 160 110 112 102 Z" fill="url(#violetBandGrad1)" opacity="0.55" filter="url(#violetCloudSoft)" />
                      <path d="M 112 106 Q 160 115 208 106 L 208 116 Q 160 125 112 116 Z" fill="url(#violetBandGrad2)" opacity="0.65" filter="url(#violetCloudSoft)" />
                      <path d="M 112 120 Q 160 128 208 120 L 208 127 Q 160 135 112 127 Z" fill="url(#violetBandGrad1)" opacity="0.45" filter="url(#violetCloudSoft)" />
                      <ellipse cx="145" cy="108" rx="8" ry="3" fill="#FAF5FF" opacity="0.45" filter="url(#violetCloudSoft)" />
                      <ellipse cx="178" cy="95" rx="6" ry="2.2" fill="#E9D5FF" opacity="0.35" filter="url(#violetCloudSoft)" />
                      <path d="M 112 116 Q 160 126 208 116 L 208 123 Q 160 133 112 123 Z" fill="#0E021A" opacity="0.78" filter="url(#violetShadowSoft)" />
                    </g>
                  </g>
                  <circle cx="160" cy="110" r="46" fill="url(#violetLimbScatter)" />
                </g>

                <g transform="translate(160, 110) rotate(24)" clipPath="url(#violetRingFrontClip)">
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#E9D5FF" strokeWidth="1" opacity="0.55" />
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#violetARingGrad)" strokeWidth="15" opacity="0.82" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#0E021A" strokeWidth="0.9" opacity="0.7" />
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#0E021A" strokeWidth="3" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#violetBRingGrad)" strokeWidth="18" opacity="0.95" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#C084FC" strokeWidth="0.9" opacity="0.5" />
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#violetCRingGrad)" strokeWidth="10" opacity="0.45" />
                </g>

                <circle cx="52" cy="76" r="1.8" fill="#FAF5FF" />
                <circle cx="52" cy="76" r="4" fill="#C084FC" opacity="0.5" filter="url(#violetCloudSoft)" />
              </svg>
            </div>
          </div>

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
            className="absolute top-[260px] right-[4%] md:right-[7%] z-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-700 pointer-events-none group"
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

          {/* SPREAD CELESTIAL BODY 6: Photorealistic Copper Ember Gas Giant (Desktop Only) */}
          <div
            className="absolute top-[220px] right-[2%] sm:right-[3%] md:right-[4%] lg:right-[5%] z-0 hidden md:flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-700 pointer-events-none group"
            title="Copper Ember Gas Giant Exoplanet (Proxima Centauri Rings)"
          >
            <div className="relative w-52 h-36 sm:w-60 sm:h-40 md:w-68 md:h-46 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              {/* Volumetric Planetary Starlight Haze */}
              <div
                className="absolute inset-2 rounded-full blur-[32px] opacity-45 pointer-events-none group-hover:opacity-75 transition-opacity duration-700"
                style={{
                  background:
                    'radial-gradient(circle, rgba(244, 63, 94, 0.45) 0%, rgba(190, 18, 60, 0.25) 45%, rgba(245, 176, 39, 0.15) 70%, transparent 80%)',
                }}
              />

              <svg viewBox="0 0 320 220" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="emberPlanetSurface" cx="32%" cy="28%" r="68%">
                    <stop offset="0%" stopColor="#FFF1F2" />
                    <stop offset="18%" stopColor="#FDA4AF" />
                    <stop offset="40%" stopColor="#F43F5E" />
                    <stop offset="65%" stopColor="#BE123C" />
                    <stop offset="85%" stopColor="#881337" />
                    <stop offset="100%" stopColor="#28050E" />
                  </radialGradient>

                  <radialGradient id="emberLimbScatter" cx="30%" cy="26%" r="72%">
                    <stop offset="70%" stopColor="transparent" />
                    <stop offset="88%" stopColor="#FB7185" stopOpacity="0.35" />
                    <stop offset="98%" stopColor="#FFE4E6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  </radialGradient>

                  <linearGradient id="emberBRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FECDD3" stopOpacity="0.85" />
                    <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.98" />
                    <stop offset="52%" stopColor="#FDE047" stopOpacity="0.92" />
                    <stop offset="76%" stopColor="#F5B027" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#E11D48" stopOpacity="0.82" />
                  </linearGradient>

                  <linearGradient id="emberARingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F5B027" stopOpacity="0.75" />
                    <stop offset="42%" stopColor="#FDA4AF" stopOpacity="0.85" />
                    <stop offset="75%" stopColor="#FB7185" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#BE123C" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="emberCRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4C0519" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#9F1239" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#4C0519" stopOpacity="0.45" />
                  </linearGradient>

                  <linearGradient id="emberBandGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FB7185" stopOpacity="0.55" />
                    <stop offset="40%" stopColor="#FFF1F2" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#881337" stopOpacity="0.35" />
                  </linearGradient>

                  <linearGradient id="emberBandGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.65" />
                    <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="80%" stopColor="#4C0519" stopOpacity="0.4" />
                  </linearGradient>

                  <filter id="emberCloudSoft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.8" />
                  </filter>
                  <filter id="emberShadowSoft" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.2" />
                  </filter>

                  <clipPath id="emberPlanetBodyClip">
                    <circle cx="160" cy="110" r="46" />
                  </clipPath>
                  <clipPath id="emberRingBackClip">
                    <rect x="-160" y="-120" width="320" height="121" />
                  </clipPath>
                  <clipPath id="emberRingFrontClip">
                    <rect x="-160" y="-1" width="320" height="121" />
                  </clipPath>
                </defs>

                <g transform="translate(160, 110) rotate(-20)" clipPath="url(#emberRingBackClip)">
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#FDA4AF" strokeWidth="1" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#emberARingGrad)" strokeWidth="15" opacity="0.75" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#140206" strokeWidth="0.8" opacity="0.65" />
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#140206" strokeWidth="3" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#emberBRingGrad)" strokeWidth="18" opacity="0.9" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#F5B027" strokeWidth="0.8" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#emberCRingGrad)" strokeWidth="10" opacity="0.4" />
                  <ellipse cx="22" cy="-30" rx="44" ry="24" fill="#140206" opacity="0.92" filter="url(#emberShadowSoft)" />
                </g>

                <g>
                  <circle cx="160" cy="110" r="46" fill="url(#emberPlanetSurface)" />
                  <g clipPath="url(#emberPlanetBodyClip)">
                    <g transform="rotate(-20 160 110)">
                      <path d="M 112 94 Q 160 102 208 94 L 208 102 Q 160 110 112 102 Z" fill="url(#emberBandGrad1)" opacity="0.55" filter="url(#emberCloudSoft)" />
                      <path d="M 112 106 Q 160 115 208 106 L 208 116 Q 160 125 112 116 Z" fill="url(#emberBandGrad2)" opacity="0.65" filter="url(#emberCloudSoft)" />
                      <path d="M 112 120 Q 160 128 208 120 L 208 127 Q 160 135 112 127 Z" fill="url(#emberBandGrad1)" opacity="0.45" filter="url(#emberCloudSoft)" />
                      <ellipse cx="145" cy="108" rx="8" ry="3" fill="#FFF1F2" opacity="0.45" filter="url(#emberCloudSoft)" />
                      <ellipse cx="178" cy="95" rx="6" ry="2.2" fill="#FDA4AF" opacity="0.35" filter="url(#emberCloudSoft)" />
                      <path d="M 112 116 Q 160 126 208 116 L 208 123 Q 160 133 112 123 Z" fill="#140206" opacity="0.78" filter="url(#emberShadowSoft)" />
                    </g>
                  </g>
                  <circle cx="160" cy="110" r="46" fill="url(#emberLimbScatter)" />
                </g>

                <g transform="translate(160, 110) rotate(-20)" clipPath="url(#emberRingFrontClip)">
                  <ellipse cx="0" cy="0" rx="114" ry="41" fill="none" stroke="#FDA4AF" strokeWidth="1" opacity="0.55" />
                  <ellipse cx="0" cy="0" rx="103" ry="37" fill="none" stroke="url(#emberARingGrad)" strokeWidth="15" opacity="0.82" />
                  <ellipse cx="0" cy="0" rx="107" ry="38.5" fill="none" stroke="#140206" strokeWidth="0.9" opacity="0.7" />
                  <ellipse cx="0" cy="0" rx="93" ry="33.5" fill="none" stroke="#140206" strokeWidth="3" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="81" ry="29" fill="none" stroke="url(#emberBRingGrad)" strokeWidth="18" opacity="0.95" />
                  <ellipse cx="0" cy="0" rx="85" ry="30.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.45" />
                  <ellipse cx="0" cy="0" rx="76" ry="27.2" fill="none" stroke="#F5B027" strokeWidth="0.9" opacity="0.5" />
                  <ellipse cx="0" cy="0" rx="64" ry="23" fill="none" stroke="url(#emberCRingGrad)" strokeWidth="10" opacity="0.45" />
                </g>

                <circle cx="268" cy="76" r="1.8" fill="#FFF1F2" />
                <circle cx="268" cy="76" r="4" fill="#FDA4AF" opacity="0.5" filter="url(#emberCloudSoft)" />
              </svg>
            </div>
          </div>

          {/* Binary Stars System (Desktop Only) */}
          <div
            className="absolute top-[280px] left-[4%] md:left-[8%] z-10 hidden md:flex items-center gap-3 opacity-65 hover:opacity-95 transition-opacity duration-700 pointer-events-none"
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
