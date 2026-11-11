import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CosmicPreloaderProps {
  onComplete?: () => void;
  lang?: 'id' | 'en';
}

// ─── Text Phases ──────────────────────────────────────────────────────────────
const TEXT_PHASES = [
  { line1: 'Rendy Fernando', line2: 'Tambunan' },
  { line1: 'Full Stack', line2: 'Developer' },
  { line1: 'Web & Cloud', line2: 'Architect' },
];

export const CosmicPreloader: React.FC<CosmicPreloaderProps> = ({
  onComplete,
  lang: _lang = 'id',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));

  // ── Absolute Hard Safety Failsafe: Under NO circumstance will loading stay stuck ─
  useEffect(() => {
    const maxSafeTime = isMobile ? 1100 : 2200;
    const failsafe = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onComplete?.(), 200);
    }, maxSafeTime);
    return () => clearTimeout(failsafe);
  }, [isMobile, onComplete]);

  // ── 1. Canvas: Alive Space, Moving Planets, Twinkling Stars & Animated Central Planet ─
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dims = {
      w: (canvas.width = window.innerWidth),
      h: (canvas.height = window.innerHeight),
    };

    const onResize = () => {
      if (!canvas) return;
      dims.w = canvas.width = window.innerWidth;
      dims.h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // ── Generate Multi-Layer Starfield (Ultra-optimized for mobile) ──
    interface Star {
      x: number;
      y: number;
      r: number;
      a: number;
      speed: number;
      phase: number;
      vx: number;
      vy: number;
      color: string;
      hasGlint: boolean;
    }

    const STAR_COUNT = isMobile
      ? Math.min(45, Math.floor((dims.w * dims.h) / 9000))
      : Math.min(180, Math.floor((dims.w * dims.h) / 4500));
    const STAR_COLORS = [
      '255,255,255', // Pure Diamond White
      '147,197,253', // Ice Sapphire
      '254,240,138', // Solar Gold
      '196,181,253', // Cosmic Violet
      '110,231,183', // Aurora Emerald
    ];

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => {
      const isForeground = Math.random() < 0.15;
      const r = isForeground
        ? Math.random() * 1.4 + 1.2
        : Math.random() < 0.6
        ? Math.random() * 0.7 + 0.3
        : Math.random() * 1.0 + 0.6;

      return {
        x: Math.random() * dims.w,
        y: Math.random() * dims.h,
        r,
        a: Math.random() * 0.6 + 0.35,
        speed: Math.random() * 0.03 + 0.012,
        phase: Math.random() * Math.PI * 2,
        // Gentle cosmic drifting motion
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.08,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        hasGlint: isForeground && Math.random() < 0.6,
      };
    });

    // ── Shooting Stars Pool ──
    interface Shot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      len: number;
      life: number;
      max: number;
    }
    const shots: Shot[] = [];
    const renderState = { t: 0, lastShot: 0, raf: 0 };

    // ── Draw Small Background Moving Planets ──
    const drawBackgroundPlanets = (t: number) => {
      // 1. Crimson Terrestrial Planet (Mars-like, orbiting upper left)
      const p1OrbitX = dims.w * 0.2;
      const p1OrbitY = dims.h * 0.22;
      const p1x = p1OrbitX + Math.cos(t * 0.32) * (dims.w * 0.07);
      const p1y = p1OrbitY + Math.sin(t * 0.32) * (dims.h * 0.04);
      const p1r = Math.min(dims.w, dims.h) * 0.018 + 7;

      ctx.save();
      // Planet 1 atmosphere corona
      const p1Glow = ctx.createRadialGradient(p1x, p1y, p1r * 0.8, p1x, p1y, p1r * 2.0);
      p1Glow.addColorStop(0, 'rgba(239, 68, 68, 0.22)');
      p1Glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(p1x, p1y, p1r * 2.0, 0, Math.PI * 2);
      ctx.fillStyle = p1Glow;
      ctx.fill();

      // Planet 1 body (3D lighting)
      const p1Body = ctx.createRadialGradient(
        p1x - p1r * 0.3,
        p1y - p1r * 0.3,
        p1r * 0.05,
        p1x,
        p1y,
        p1r
      );
      p1Body.addColorStop(0, '#FCA5A5');
      p1Body.addColorStop(0.35, '#EF4444');
      p1Body.addColorStop(0.75, '#7F1D1D');
      p1Body.addColorStop(1, '#1A0505');
      ctx.beginPath();
      ctx.arc(p1x, p1y, p1r, 0, Math.PI * 2);
      ctx.fillStyle = p1Body;
      ctx.fill();

      // Tiny moon orbiting Planet 1
      const m1Angle = t * 1.8;
      const m1x = p1x + Math.cos(m1Angle) * (p1r * 1.8);
      const m1y = p1y + Math.sin(m1Angle) * (p1r * 0.7);
      ctx.beginPath();
      ctx.arc(m1x, m1y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FED7AA';
      ctx.shadowColor = 'rgba(254, 215, 170, 0.8)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();

      // 2. Emerald Gas Dwarf with Delicate Rings (upper right)
      const p2OrbitX = dims.w * 0.82;
      const p2OrbitY = dims.h * 0.28;
      const p2x = p2OrbitX + Math.cos(-t * 0.25 + 1.5) * (dims.w * 0.08);
      const p2y = p2OrbitY + Math.sin(-t * 0.25 + 1.5) * (dims.h * 0.05);
      const p2r = Math.min(dims.w, dims.h) * 0.022 + 9;

      ctx.save();
      // Back half of tiny ring
      ctx.save();
      ctx.translate(p2x, p2y);
      ctx.rotate(0.35);
      ctx.scale(1, 0.3);
      ctx.beginPath();
      ctx.ellipse(0, 0, p2r * 2.1, p2r * 2.1, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = 'rgba(110, 231, 183, 0.45)';
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.restore();

      // Planet 2 body
      const p2Body = ctx.createRadialGradient(
        p2x - p2r * 0.3,
        p2y - p2r * 0.3,
        p2r * 0.05,
        p2x,
        p2y,
        p2r
      );
      p2Body.addColorStop(0, '#A7F3D0');
      p2Body.addColorStop(0.3, '#10B981');
      p2Body.addColorStop(0.7, '#064E3B');
      p2Body.addColorStop(1, '#021F17');
      ctx.beginPath();
      ctx.arc(p2x, p2y, p2r, 0, Math.PI * 2);
      ctx.fillStyle = p2Body;
      ctx.fill();

      // Front half of tiny ring
      ctx.save();
      ctx.translate(p2x, p2y);
      ctx.rotate(0.35);
      ctx.scale(1, 0.3);
      ctx.beginPath();
      ctx.ellipse(0, 0, p2r * 2.1, p2r * 2.1, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(167, 243, 208, 0.8)';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();
      ctx.restore();

      // 3. Icy Violet Moon (drifting lower left background)
      const p3OrbitX = dims.w * 0.16;
      const p3OrbitY = dims.h * 0.68;
      const p3x = p3OrbitX + Math.cos(t * 0.2 + 3.2) * (dims.w * 0.06);
      const p3y = p3OrbitY + Math.sin(t * 0.2 + 3.2) * (dims.h * 0.04);
      const p3r = Math.min(dims.w, dims.h) * 0.015 + 6;

      ctx.save();
      const p3Body = ctx.createRadialGradient(
        p3x - p3r * 0.3,
        p3y - p3r * 0.3,
        p3r * 0.05,
        p3x,
        p3y,
        p3r
      );
      p3Body.addColorStop(0, '#DDD6FE');
      p3Body.addColorStop(0.35, '#8B5CF6');
      p3Body.addColorStop(0.75, '#4C1D95');
      p3Body.addColorStop(1, '#1E0B38');
      ctx.beginPath();
      ctx.arc(p3x, p3y, p3r, 0, Math.PI * 2);
      ctx.fillStyle = p3Body;
      ctx.fill();
      ctx.restore();
    };

    // ── Draw Animated Central Gas Giant with 3D Moons & Surface Rotation ──
    const drawCentralPlanet = (t: number) => {
      // Smooth dynamic levitation and subtle floating motion
      const floatY = Math.sin(t * 1.5) * 8.5;
      const floatX = Math.cos(t * 0.9) * 4;
      const cx = dims.w / 2 + floatX;
      const cy = dims.h * 0.36 + floatY;
      const R = Math.min(dims.w, dims.h) * 0.125;

      // Dynamic precession angle and tilt wobble
      const ringAngle = -0.38 + Math.sin(t * 0.8) * 0.035;
      const ringScaleY = 0.28 + Math.cos(t * 0.8) * 0.015;

      // ── Orbiting Moons Trajectory Positions (3D Occlusion) ──
      // Moon 1: Cyan Ice Moon
      const m1Speed = 1.4;
      const m1Angle = t * m1Speed;
      const m1DistX = R * 1.62;
      const m1DistY = R * 0.48;
      const m1x = cx + Math.cos(m1Angle) * m1DistX;
      const m1y = cy + Math.sin(m1Angle) * m1DistY - Math.cos(m1Angle) * (R * 0.18);
      const m1IsBehind = Math.sin(m1Angle) < 0;

      // Moon 2: Amber Golden Beacon
      const m2Speed = 0.95;
      const m2Angle = -t * m2Speed + 2.4;
      const m2DistX = R * 2.05;
      const m2DistY = R * 0.58;
      const m2x = cx + Math.cos(m2Angle) * m2DistX;
      const m2y = cy + Math.sin(m2Angle) * m2DistY + Math.cos(m2Angle) * (R * 0.22);
      const m2IsBehind = Math.sin(m2Angle) < 0;

      const drawMoon = (mx: number, my: number, color: string, glowColor: string, radius = 3.8) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      };

      ctx.save();

      // 1. Dynamic Corona & Cosmic Haze behind the planet
      const coronaSize = R * (2.3 + Math.sin(t * 2) * 0.08);
      const corona = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, coronaSize);
      corona.addColorStop(0, 'rgba(76, 111, 209, 0.24)');
      corona.addColorStop(0.45, 'rgba(245, 176, 39, 0.10)');
      corona.addColorStop(0.85, 'rgba(16, 185, 129, 0.04)');
      corona.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coronaSize, 0, Math.PI * 2);
      ctx.fillStyle = corona;
      ctx.fill();

      // Draw Moons if they are behind the planet
      if (m1IsBehind) drawMoon(m1x, m1y, '#BAE6FD', 'rgba(147, 197, 253, 0.8)', 4.2);
      if (m2IsBehind) drawMoon(m2x, m2y, '#FDE047', 'rgba(245, 176, 39, 0.8)', 3.4);

      // 2. ── RING BACK HALF (behind planet) ──
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ringAngle);
      ctx.scale(1, ringScaleY);

      // Outer icy ring arc (back)
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 2.15, R * 2.15, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.25)';
      ctx.lineWidth = R * 0.04;
      ctx.stroke();

      // Main champagne starlight ring arc (back)
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 2.0, R * 2.0, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 176, 39, 0.45)';
      ctx.lineWidth = R * 0.13;
      ctx.stroke();

      // Inner golden fiber ring arc (back)
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.68, R * 1.68, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 211, 105, 0.35)';
      ctx.lineWidth = R * 0.06;
      ctx.stroke();
      ctx.restore();

      // 3. ── PLANET SPHERE & ROTATING SURFACE CLOUDS ──
      // Dynamic spherical lighting
      const lightOffsetX = -R * 0.28 + Math.cos(t * 0.8) * 4;
      const lightOffsetY = -R * 0.32 + Math.sin(t * 0.8) * 3;
      const sphere = ctx.createRadialGradient(
        cx + lightOffsetX,
        cy + lightOffsetY,
        R * 0.04,
        cx,
        cy,
        R
      );
      sphere.addColorStop(0, '#BAE6FD');
      sphere.addColorStop(0.18, '#60A5FA');
      sphere.addColorStop(0.42, '#2563EB');
      sphere.addColorStop(0.68, '#1E1B4B');
      sphere.addColorStop(0.9, '#0D1226');
      sphere.addColorStop(1, '#030712');

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphere;
      ctx.fill();

      // ── Animated Rotating Cloud Texture / Latitude Bands ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Multiple rotational drift speeds representing atmospheric layers
      const driftSpeed1 = t * 24;
      const driftSpeed2 = t * 16;
      const driftSpeed3 = t * 32;

      // Band 1: Upper Northern Swirls
      const band1X = ((driftSpeed1) % (R * 2.4)) - R * 1.2;
      ctx.beginPath();
      ctx.ellipse(cx + band1X, cy - R * 0.45, R * 1.25, R * 0.16, 0.05, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(186, 230, 253, 0.28)';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + band1X - R * 2.4, cy - R * 0.45, R * 1.25, R * 0.16, 0.05, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(186, 230, 253, 0.28)';
      ctx.fill();

      // Band 2: Equatorial Vibrant Gas Band
      const band2X = ((-driftSpeed2) % (R * 2.4)) + R * 1.2;
      ctx.beginPath();
      ctx.ellipse(cx + band2X, cy + R * 0.05, R * 1.35, R * 0.22, -0.04, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96, 165, 250, 0.32)';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + band2X + R * 2.4, cy + R * 0.05, R * 1.35, R * 0.22, -0.04, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96, 165, 250, 0.32)';
      ctx.fill();

      // Band 3: Southern Storm Belt
      const band3X = ((driftSpeed3) % (R * 2.4)) - R * 1.2;
      ctx.beginPath();
      ctx.ellipse(cx + band3X, cy + R * 0.48, R * 1.15, R * 0.15, 0.06, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.22)';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + band3X - R * 2.4, cy + R * 0.48, R * 1.15, R * 0.15, 0.06, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.22)';
      ctx.fill();

      // Great Storm Oval Eye (Like Jupiter/Neptune Great Dark Spot)
      const spotAngle = t * 0.45;
      const spotX = cx + Math.sin(spotAngle) * (R * 0.65);
      const spotY = cy + R * 0.28;
      const spotAlpha = Math.cos(spotAngle) > 0 ? Math.cos(spotAngle) * 0.4 : 0;
      if (spotAlpha > 0) {
        ctx.beginPath();
        ctx.ellipse(spotX, spotY, R * 0.22, R * 0.12, 0.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 27, 75, ${spotAlpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(spotX, spotY, R * 0.14, R * 0.07, 0.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${spotAlpha * 1.2})`;
        ctx.fill();
      }

      ctx.restore();

      // 4. Atmosphere Rayleigh Corona Rim
      const atm = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.09);
      atm.addColorStop(0, 'rgba(0,0,0,0)');
      atm.addColorStop(0.72, 'rgba(96,165,250,0.38)');
      atm.addColorStop(1, 'rgba(147,197,253,0.85)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.09, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      // 5. ── RING FRONT HALF (in front of planet) ──
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ringAngle);
      ctx.scale(1, ringScaleY);

      // Main champagne starlight ring (front) with radiant starlight shadow
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 2.0, R * 2.0, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(255, 211, 105, 0.92)';
      ctx.lineWidth = R * 0.14;
      ctx.shadowColor = 'rgba(245, 176, 39, 0.75)';
      ctx.shadowBlur = 15;
      ctx.stroke();

      // Inner starlight icy fiber (front)
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.68, R * 1.68, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.55)';
      ctx.lineWidth = R * 0.07;
      ctx.shadowBlur = 0;
      ctx.stroke();

      // Outer starlight boundary (front)
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 2.15, R * 2.15, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = R * 0.03;
      ctx.stroke();
      ctx.restore();

      // Draw Moons if they are in front of the planet
      if (!m1IsBehind) drawMoon(m1x, m1y, '#BAE6FD', 'rgba(147, 197, 253, 0.95)', 4.2);
      if (!m2IsBehind) drawMoon(m2x, m2y, '#FDE047', 'rgba(245, 176, 39, 0.95)', 3.4);

      ctx.restore();
    };

    // ── Main Render Loop ──
    const render = (now: number) => {
      renderState.t += 0.016;
      const currentT = renderState.t;
      ctx.clearRect(0, 0, dims.w, dims.h);

      // 1. Draw Twinkling and Drifting Stars
      for (const s of stars) {
        // Drift position
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = dims.w;
        if (s.x > dims.w) s.x = 0;
        if (s.y < 0) s.y = dims.h;
        if (s.y > dims.h) s.y = 0;

        // Pulsing twinkle
        const alpha = s.a + Math.sin(currentT * s.speed * 60 + s.phase) * 0.28;
        const a = Math.max(0.08, Math.min(1, alpha));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${a})`;
        if (s.r > 1.3 && a > 0.6) {
          ctx.shadowColor = `rgba(${s.color}, 0.55)`;
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // 4-point cross diffraction lens flare on prominent stars
        if (s.hasGlint && a > 0.65) {
          const glintLen = s.r * 2.8;
          ctx.strokeStyle = `rgba(${s.color}, ${(a - 0.65) * 1.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - glintLen, s.y);
          ctx.lineTo(s.x + glintLen, s.y);
          ctx.moveTo(s.x, s.y - glintLen);
          ctx.lineTo(s.x, s.y + glintLen);
          ctx.stroke();
        }
      }

      // 2. Draw Moving Small Background Planets (Desktop only for peak mobile performance)
      if (!isMobile) {
        drawBackgroundPlanets(currentT);
      }

      // 3. Draw Animated Central Gas Giant
      drawCentralPlanet(currentT);

      // 4. Spawn & Draw Meteors / Shooting Stars (Desktop only)
      if (!isMobile && now - renderState.lastShot > 1800 && Math.random() < 0.07) {
        const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35;
        shots.push({
          x: Math.random() * dims.w * 0.85,
          y: Math.random() * dims.h * 0.4,
          vx: Math.cos(angle) * (9 + Math.random() * 8),
          vy: Math.sin(angle) * (9 + Math.random() * 8),
          len: 80 + Math.random() * 110,
          life: 0,
          max: 30 + Math.random() * 20,
        });
        renderState.lastShot = now;
      }

      if (!isMobile) {
        for (let i = shots.length - 1; i >= 0; i--) {
          const ss = shots[i];
          ss.x += ss.vx;
          ss.y += ss.vy;
          ss.life++;
          const p = ss.life / ss.max;
          const alpha = p < 0.25 ? (p / 0.25) * 0.9 : (1 - (p - 0.25) / 0.75) * 0.9;
          const hyp = Math.hypot(ss.vx, ss.vy);
          const tailX = ss.x - (ss.vx / hyp) * ss.len;
          const tailY = ss.y - (ss.vy / hyp) * ss.len;

          const g = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
          g.addColorStop(0, 'rgba(255,255,255,0)');
          g.addColorStop(0.65, `rgba(147,197,253,${alpha * 0.6})`);
          g.addColorStop(1, `rgba(255,255,255,${alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(ss.x, ss.y);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          if (ss.life >= ss.max) shots.splice(i, 1);
        }
      }

      renderState.raf = requestAnimationFrame(render);
    };

    renderState.raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(renderState.raf);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobile]);

  // ── 2. Progress bar driven by rAF (Zero React re-renders, ultra-fast on mobile) ──
  useEffect(() => {
    // Ultra-snappy on mobile (700ms), crisp & cinematic on desktop (1350ms)
    const DURATION = isMobile ? 700 : 1350;
    const start = performance.now();
    const tickState = { raf: 0 };

    const tick = (now: number) => {
      const raw = Math.min((now - start) / DURATION, 1);
      // Fast ease-out curve
      const eased = 1 - Math.pow(1 - raw, 3);
      const pct = Math.min(Math.round(eased * 100), 100);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${String(pct).padStart(2, '0')}%`;
      }

      if (raw < 1) {
        tickState.raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => onComplete?.(), 260);
        }, 120);
      }
    };

    const t1 = setTimeout(() => setShowContent(true), 40);
    tickState.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(tickState.raf);
      clearTimeout(t1);
    };
  }, [isMobile, onComplete]);

  // ── 3. Text Phase Rotation ──────────────────────────────────────────────────
  useEffect(() => {
    const PHASE_DURATION = isMobile ? 380 : 650;
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % TEXT_PHASES.length;
      setPhaseIdx(idx);
    }, PHASE_DURATION);
    return () => clearInterval(interval);
  }, [isMobile]);

  const phase = TEXT_PHASES[phaseIdx];

  // ── 4. Skip on click / tap ──────────────────────────────────────────────────
  const handleSkip = () => {
    if (progressBarRef.current) progressBarRef.current.style.width = '100%';
    if (percentRef.current) percentRef.current.textContent = '100%';
    setIsExiting(true);
    setTimeout(() => onComplete?.(), 180);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer touch-none"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, #0a0f2e 0%, #03060f 100%)' }}
        >
          {/* Top-Right Explicit One-Tap Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="absolute top-5 right-5 z-30 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 border border-white/20 text-xs font-mono text-pearl transition-all flex items-center gap-1.5 shadow-md"
            aria-label="Lewati animasi intro"
          >
            <span>{_lang === 'id' ? 'Lewati' : 'Skip'}</span>
            <span className="text-champagne">→</span>
          </button>

          {/* Canvas: Alive space, stars & animated central planet */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Nebula atmospheric ambient glows */}
          <div className="absolute top-1/4 -left-24 w-[480px] h-[480px] rounded-full bg-blue-700/20 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-24 w-[480px] h-[480px] rounded-full bg-amber-500/12 blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

          {/* ── Main Typography & Progress Content ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 w-full px-6"
            style={{ marginTop: '38vh' }} // Aligned below the dynamic central planet
          >
            {/* Minimalist Cycling Text */}
            <div className="flex flex-col items-center gap-1 min-h-[88px] sm:min-h-[108px] justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phaseIdx}
                  initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(10px)' }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <span className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.14em] text-white/95 uppercase">
                    {phase.line1}
                  </span>
                  <span
                    className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.14em] uppercase"
                    style={{
                      color:
                        phaseIdx === 0
                          ? '#F5B027' // Gold Champagne
                          : phaseIdx === 1
                          ? '#60A5FA' // Sapphire Azure
                          : '#10B981', // Emerald
                    }}
                  >
                    {phase.line2}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Minimalist Progress Section */}
            <div className="flex flex-col items-center gap-3 w-full max-w-xs sm:max-w-sm">
              {/* Percentage Indicator */}
              <span
                ref={percentRef}
                className="font-mono text-sm tracking-[0.25em] text-white/40"
              >
                00%
              </span>

              {/* Glowing Precision Progress Line */}
              <div className="w-full h-px bg-white/10 relative overflow-hidden rounded-full">
                <div
                  ref={progressBarRef}
                  className="absolute inset-y-0 left-0 rounded-full transition-none"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(to right, #4C6FD1, #F5B027, #FFD369)',
                    boxShadow: '0 0 10px rgba(245,176,39,0.6)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
