import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Shield,
  Zap,
  Sparkles,
  Rocket,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DevStudioSectionProps {
  lang: 'id' | 'en';
}

// ── Synthesized Web Audio Engine (0KB download, instant latency) ──
class SoundSynth {
  private ctx: AudioContext | null = null;
  private enabled = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cosmic_game_sound');
      this.enabled = saved !== 'false';
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cosmic_game_sound', val ? 'true' : 'false');
    }
  }

  isEnabled() {
    return this.enabled;
  }

  playLaser() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio muted
    }
  }

  playExplosion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.2);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Audio muted
    }
  }

  playCollect() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Audio muted
    }
  }

  playPowerup() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.1);
      osc.frequency.linearRampToValueAtTime(1320, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio muted
    }
  }

  playHit() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(60, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio muted
    }
  }
}

const sound = new SoundSynth();

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  hp: number;
  maxHp: number;
  speed: number;
  rot: number;
  rotSpeed: number;
  points: number[];
}

interface Crystal {
  x: number;
  y: number;
  size: number;
  speed: number;
  rot: number;
  type: 'gold' | 'sapphire' | 'shield';
  val: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export const DevStudioSection: React.FC<DevStudioSectionProps> = ({ lang }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem('cosmic_defender_highscore');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(1);
  const [soundOn, setSoundOn] = useState<boolean>(() => sound.isEnabled());
  const [isNewRecord, setIsNewRecord] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Game internal mutable state (prevents React re-renders during 60-120fps physics loop)
  const gameRef = useRef({
    shipX: 200,
    shipY: 340,
    targetShipX: 200,
    shipWidth: 32,
    shipHeight: 38,
    invulnerableTime: 0,
    tripleLaserTime: 0,
    lastShotTime: 0,
    lastSpawnAsteroid: 0,
    lastSpawnCrystal: 0,
    bullets: [] as Bullet[],
    asteroids: [] as Asteroid[],
    crystals: [] as Crystal[],
    particles: [] as Particle[],
    score: 0,
    lives: 3,
    combo: 1,
    comboTimer: 0,
  });

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sound.setEnabled(next);
  };

  // Particle explosion helper
  const spawnExplosion = useCallback((x: number, y: number, color: string, count = 14) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.2;
      gameRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: Math.random() * 2.5 + 1.5,
      });
    }
  }, []);

  // Start / Restart game
  const startGame = () => {
    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 400;
    const h = canvas ? canvas.height : 400;

    gameRef.current = {
      shipX: w / 2,
      shipY: h - 50,
      targetShipX: w / 2,
      shipWidth: 32,
      shipHeight: 38,
      invulnerableTime: 0,
      tripleLaserTime: 0,
      lastShotTime: 0,
      lastSpawnAsteroid: performance.now(),
      lastSpawnCrystal: performance.now() + 600,
      bullets: [],
      asteroids: [],
      crystals: [],
      particles: [],
      score: 0,
      lives: 3,
      combo: 1,
      comboTimer: 0,
    };

    setScore(0);
    setLives(3);
    setCombo(1);
    setIsNewRecord(false);
    setGameState('playing');
    sound.playPowerup();
  };

  // Main Canvas Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const animRef = { id: 0 };
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastFrameTime = performance.now();

    const loop = (now: number) => {
      animRef.id = requestAnimationFrame(loop);
      const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
      lastFrameTime = now;

      const g = gameRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // ── Update Ship position with smooth lerp ──
      g.shipX += (g.targetShipX - g.shipX) * 0.22;
      g.shipX = Math.max(20, Math.min(w - 20, g.shipX));
      g.shipY = h - 45;

      if (g.invulnerableTime > 0) g.invulnerableTime -= dt;
      if (g.tripleLaserTime > 0) g.tripleLaserTime -= dt;

      // Combo decay timer
      if (g.comboTimer > 0) {
        g.comboTimer -= dt;
        if (g.comboTimer <= 0 && g.combo > 1) {
          g.combo = 1;
          setCombo(1);
        }
      }

      // ── Auto-fire twin lasers every 240ms ──
      if (now - g.lastShotTime > 240) {
        g.lastShotTime = now;
        sound.playLaser();

        if (g.tripleLaserTime > 0) {
          // Triple laser
          g.bullets.push({ x: g.shipX, y: g.shipY - 14, vx: 0, vy: -13 });
          g.bullets.push({ x: g.shipX - 10, y: g.shipY - 10, vx: -2.2, vy: -12 });
          g.bullets.push({ x: g.shipX + 10, y: g.shipY - 10, vx: 2.2, vy: -12 });
        } else {
          // Twin lasers
          g.bullets.push({ x: g.shipX - 8, y: g.shipY - 10, vx: 0, vy: -13 });
          g.bullets.push({ x: g.shipX + 8, y: g.shipY - 10, vx: 0, vy: -13 });
        }
      }

      // ── Spawn Asteroids ──
      const asteroidInterval = Math.max(750, 1500 - Math.floor(g.score / 600) * 80);
      if (now - g.lastSpawnAsteroid > asteroidInterval) {
        g.lastSpawnAsteroid = now;
        const size = Math.random() * 14 + 18;
        const hp = size > 26 ? 2 : 1;
        const numPts = 7;
        const pts: number[] = [];
        for (let p = 0; p < numPts; p++) {
          pts.push(size * (0.75 + Math.random() * 0.35));
        }

        g.asteroids.push({
          x: Math.random() * (w - 60) + 30,
          y: -30,
          size,
          hp,
          maxHp: hp,
          speed: Math.random() * 45 + 55 + Math.min(60, g.score * 0.02),
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 2.2,
          points: pts,
        });
      }

      // ── Spawn Crystals (Collectibles) ──
      if (now - g.lastSpawnCrystal > 2200) {
        g.lastSpawnCrystal = now;
        const rand = Math.random();
        const type: 'gold' | 'sapphire' | 'shield' =
          rand < 0.65 ? 'gold' : rand < 0.90 ? 'sapphire' : 'shield';
        const val = type === 'gold' ? 100 : type === 'sapphire' ? 150 : 50;

        g.crystals.push({
          x: Math.random() * (w - 60) + 30,
          y: -25,
          size: type === 'shield' ? 15 : 13,
          speed: Math.random() * 30 + 65,
          rot: 0,
          type,
          val,
        });
      }

      // ── Update Bullets ──
      for (let i = g.bullets.length - 1; i >= 0; i--) {
        const b = g.bullets[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.y < -15 || b.x < 0 || b.x > w) {
          g.bullets.splice(i, 1);
        }
      }

      // ── Update Asteroids ──
      for (let i = g.asteroids.length - 1; i >= 0; i--) {
        const a = g.asteroids[i];
        a.y += a.speed * dt;
        a.rot += a.rotSpeed * dt;

        // Collision: Laser vs Asteroid
        for (let bi = g.bullets.length - 1; bi >= 0; bi--) {
          const b = g.bullets[bi];
          const dist = Math.hypot(b.x - a.x, b.y - a.y);
          if (dist < a.size + 4) {
            // Hit!
            g.bullets.splice(bi, 1);
            a.hp -= 1;
            spawnExplosion(b.x, b.y, '#F5B027', 6);

            if (a.hp <= 0) {
              sound.playExplosion();
              spawnExplosion(a.x, a.y, '#F43F5E', 18);
              spawnExplosion(a.x, a.y, '#F5B027', 10);

              const gained = 50 * g.combo;
              g.score += gained;
              g.combo = Math.min(10, g.combo + 1);
              g.comboTimer = 2.5;

              setScore(g.score);
              setCombo(g.combo);
              g.asteroids.splice(i, 1);
              break;
            }
          }
        }

        // Collision: Ship vs Asteroid
        if (a && a.hp > 0) {
          const shipDist = Math.hypot(g.shipX - a.x, g.shipY - a.y);
          if (shipDist < a.size + 14 && g.invulnerableTime <= 0) {
            // Player hit!
            sound.playHit();
            spawnExplosion(g.shipX, g.shipY, '#EF4444', 22);
            g.invulnerableTime = 1.6;
            g.lives -= 1;
            g.combo = 1;
            setLives(g.lives);
            setCombo(1);

            // Destroy this asteroid
            g.asteroids.splice(i, 1);

            if (g.lives <= 0) {
              // Game Over
              setGameState('gameover');
              const finalScore = g.score;
              try {
                const prevBest = parseInt(localStorage.getItem('cosmic_defender_highscore') || '0', 10);
                if (finalScore > prevBest) {
                  localStorage.setItem('cosmic_defender_highscore', finalScore.toString());
                  setHighScore(finalScore);
                  setIsNewRecord(true);
                  confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#F5B027', '#60A5FA', '#10B981', '#FFFFFF'],
                  });
                }
              } catch {
                // Ignore storage error
              }
              return;
            }
            continue;
          }
        }

        // Out of screen
        if (a && a.y > h + 40) {
          g.asteroids.splice(i, 1);
        }
      }

      // ── Update Crystals ──
      for (let ci = g.crystals.length - 1; ci >= 0; ci--) {
        const c = g.crystals[ci];
        c.y += c.speed * dt;
        c.rot += dt * 2.5;

        // Pickup collision: Ship vs Crystal
        const dist = Math.hypot(g.shipX - c.x, g.shipY - c.y);
        if (dist < c.size + 18) {
          sound.playCollect();
          const colColor = c.type === 'gold' ? '#F5B027' : c.type === 'sapphire' ? '#38BDF8' : '#10B981';
          spawnExplosion(c.x, c.y, colColor, 16);

          if (c.type === 'shield') {
            if (g.lives < 3) {
              g.lives += 1;
              setLives(g.lives);
            }
            g.tripleLaserTime = 8.0;
          } else {
            const gained = c.val * g.combo;
            g.score += gained;
            g.combo = Math.min(10, g.combo + 1);
            g.comboTimer = 3.0;
            setScore(g.score);
            setCombo(g.combo);
          }

          g.crystals.splice(ci, 1);
          continue;
        }

        if (c.y > h + 30) {
          g.crystals.splice(ci, 1);
        }
      }

      // ── Update Particles ──
      for (let pi = g.particles.length - 1; pi >= 0; pi--) {
        const p = g.particles[pi];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= dt * 2.2;
        if (p.alpha <= 0) {
          g.particles.splice(pi, 1);
        }
      }

      // ══════════════════════════════════════════════════════
      // RENDER CANVAS 2D
      // ══════════════════════════════════════════════════════
      ctx.clearRect(0, 0, w, h);

      // Deep space background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let gx = 0; gx < w; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }

      // Render Particles
      for (let pi = 0; pi < g.particles.length; pi++) {
        const p = g.particles[pi];
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Render Bullets
      ctx.fillStyle = g.tripleLaserTime > 0 ? '#38BDF8' : '#F5B027';
      for (let bi = 0; bi < g.bullets.length; bi++) {
        const b = g.bullets[bi];
        ctx.beginPath();
        ctx.roundRect(b.x - 2, b.y - 7, 4, 14, 2);
        ctx.fill();
      }

      // Render Crystals
      for (let ci = 0; ci < g.crystals.length; ci++) {
        const c = g.crystals[ci];
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot);

        const gemColor = c.type === 'gold' ? '#F5B027' : c.type === 'sapphire' ? '#38BDF8' : '#10B981';
        ctx.fillStyle = gemColor;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.2;

        if (c.type === 'shield') {
          // Circular shield orb
          ctx.beginPath();
          ctx.arc(0, 0, c.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          // Diamond polygon
          ctx.beginPath();
          ctx.moveTo(0, -c.size);
          ctx.lineTo(c.size * 0.75, 0);
          ctx.moveTo(0, -c.size);
          ctx.lineTo(-c.size * 0.75, 0);
          ctx.lineTo(0, c.size);
          ctx.lineTo(c.size * 0.75, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }

      // Render Asteroids (Procedural Jagged Rock)
      for (let ai = 0; ai < g.asteroids.length; ai++) {
        const a = g.asteroids[ai];
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rot);

        ctx.fillStyle = '#1A1D2B';
        ctx.strokeStyle = a.hp === 1 ? '#F43F5E' : '#D97706';
        ctx.lineWidth = 2;

        ctx.beginPath();
        const numPts = a.points.length;
        for (let p = 0; p < numPts; p++) {
          const ptAngle = (p / numPts) * Math.PI * 2;
          const rad = a.points[p];
          const px = Math.cos(ptAngle) * rad;
          const py = Math.sin(ptAngle) * rad;
          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Asteroid core bug dot
        ctx.fillStyle = a.hp === 1 ? '#EF4444' : '#F5B027';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Render Spaceship (If not flashing during invulnerability)
      const isVisible = g.invulnerableTime <= 0 || Math.floor(now / 80) % 2 === 0;
      if (isVisible) {
        ctx.save();
        ctx.translate(g.shipX, g.shipY);

        // Thruster exhaust flame
        const flameLen = Math.random() * 8 + 10;
        const grad = ctx.createLinearGradient(0, 10, 0, 10 + flameLen);
        grad.addColorStop(0, '#38BDF8');
        grad.addColorStop(0.5, '#F5B027');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-5, 10);
        ctx.lineTo(5, 10);
        ctx.lineTo(0, 10 + flameLen);
        ctx.closePath();
        ctx.fill();

        // Main Ship Body (Aerospace Arrowhead)
        ctx.fillStyle = '#0F1830';
        ctx.strokeStyle = '#F5B027';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, -18); // Nose
        ctx.lineTo(14, 10); // Right Wing
        ctx.lineTo(5, 6);   // Right Indent
        ctx.lineTo(0, 8);   // Center Engine
        ctx.lineTo(-5, 6);  // Left Indent
        ctx.lineTo(-14, 10);// Left Wing
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cockpit canopy glass
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(3, -2);
        ctx.lineTo(0, 2);
        ctx.lineTo(-3, -2);
        ctx.closePath();
        ctx.fill();

        // Wingtip beacon lights
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(14, 10, 2, 0, Math.PI * 2);
        ctx.arc(-14, 10, 2, 0, Math.PI * 2);
        ctx.fill();

        // Active Shield Aura if powered up
        if (g.tripleLaserTime > 0) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, 24, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }
    };

    animRef.id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.id);
  }, [gameState, spawnExplosion]);

  // Touch and Mouse Controls
  const handlePointerMove = (clientX: number) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relativeX = ((clientX - rect.left) / rect.width) * canvas.width;
    gameRef.current.targetShipX = relativeX;
  };

  const handleTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState === 'playing') {
      e.preventDefault(); // Stop mobile scroll while playing game
      handlePointerMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handlePointerMove(e.clientX);
  };

  // Keyboard navigation
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 28;
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        gameRef.current.targetShipX -= step;
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        gameRef.current.targetShipX += step;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Sync canvas internal resolution with container size
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const width = Math.min(container.clientWidth - 16, 840);
      const height = window.innerWidth < 640 ? 360 : 420;
      canvas.width = width;
      canvas.height = height;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section id="studio" className="py-12 sm:py-16 px-3 xs:px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative text-left">
      {/* Ambient Cosmic Haze Glow */}
      <div className="absolute top-1/2 -left-28 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-sapphire/20 blur-md sm:blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute -top-10 -right-28 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-champagne/15 blur-md sm:blur-[140px] pointer-events-none transform-gpu" />

      {/* ── Section Header (Minimal & Clean, No Text Wall) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-[10.5px] font-mono text-champagne uppercase tracking-wider mb-2">
            <Gamepad2 className="w-3.5 h-3.5 text-champagne" />
            <span>{lang === 'id' ? 'Mini Game Kosmik // Arkade 2D' : 'Cosmic Mini Game // 2D Arcade'}</span>
          </div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl text-pearl font-normal tracking-tight">
            Cosmic Orbit Defender
          </h2>
          <p className="text-mist text-xs sm:text-sm max-w-lg mt-1 leading-relaxed">
            {lang === 'id'
              ? 'Kendalikan pesawat pengintai, kumpulkan kristal kode bersih, dan basmi bug asteroid yang mendekat!'
              : 'Pilot the scout starship, collect clean code crystals, and blast incoming bug asteroids!'}
          </p>
        </div>

        {/* High Score Capsule in Header */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="glass-1 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-champagne" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-fog leading-none">{lang === 'id' ? 'REKOR TERBAIK' : 'HIGH SCORE'}</span>
              <span className="font-mono text-xs font-bold text-pearl tabular-nums">{highScore.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Interactive Game Console Frame ── */}
      <div
        ref={containerRef}
        className="glass-2 rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-glass-lg relative z-10"
      >
        {/* Top Game HUD Bar */}
        <div className="px-3.5 sm:px-6 py-2.5 bg-midnight-1/90 border-b border-white/10 flex items-center justify-between gap-3 text-xs font-mono">
          {/* Left: Score & Combo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-fog text-[10.5px] uppercase">{lang === 'id' ? 'SKOR:' : 'SCORE:'}</span>
              <span className="font-bold text-champagne text-sm sm:text-base tabular-nums">{score.toLocaleString()}</span>
            </div>

            {combo > 1 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold animate-pulse">
                {combo}x COMBO
              </span>
            )}
          </div>

          {/* Right: Shields / Lives & Sound Toggle */}
          <div className="flex items-center gap-3">
            {/* 3 Shields Indicator */}
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((heart) => (
                <Shield
                  key={heart}
                  className={`w-3.5 h-3.5 transition-all ${
                    heart <= lives
                      ? 'text-cyan-400 fill-cyan-400/30 drop-shadow-[0_0_6px_#22D3EE]'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-mist hover:text-pearl transition-colors cursor-pointer"
              title={soundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 text-champagne" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* ── Active Canvas Arena ── */}
        <div className="relative w-full flex items-center justify-center bg-midnight-0 select-none overflow-hidden touch-none">
          <canvas
            ref={canvasRef}
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onMouseMove={handleMouseMove}
            className="w-full block cursor-crosshair"
          />

          {/* ── OVERLAY A: Start / Idle Screen ── */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-midnight-0/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center z-20 animate-fade-in">
              <div className="w-12 h-12 rounded-2xl bg-champagne/15 border border-champagne/40 flex items-center justify-center text-champagne shadow-[0_0_24px_rgba(245,176,39,0.35)] mb-3">
                <Rocket className="w-6 h-6 text-champagne" />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-pearl tracking-tight">
                Cosmic Orbit Defender
              </h3>
              <p className="text-mist text-xs sm:text-sm max-w-sm mt-1">
                {lang === 'id'
                  ? 'Kendalikan pesawat antariksa dengan jari atau mouse. Tembak asteroid dan raih skor tertinggi!'
                  : 'Pilot your starship with finger or mouse. Blast asteroids and achieve the highest score!'}
              </p>

              {/* Quick Visual 3-Pill Guide */}
              <div className="grid grid-cols-3 gap-2 my-4 max-w-sm w-full text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center">
                  <span className="text-base">🕹️</span>
                  <span className="text-pearl mt-1">{lang === 'id' ? 'Geser Layar' : 'Drag / Move'}</span>
                  <span className="text-fog text-[8.5px]">{lang === 'id' ? 'Kemudi' : 'Steer'}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center">
                  <span className="text-base">⭐</span>
                  <span className="text-champagne mt-1">{lang === 'id' ? 'Kristal' : 'Crystals'}</span>
                  <span className="text-fog text-[8.5px]">+100 Poin</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-center">
                  <span className="text-base">☄️</span>
                  <span className="text-rose-400 mt-1">{lang === 'id' ? 'Asteroid' : 'Asteroids'}</span>
                  <span className="text-fog text-[8.5px]">{lang === 'id' ? 'Tembak' : 'Blast'}</span>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={startGame}
                className="btn-champagne px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Play className="w-4 h-4 fill-midnight-0" />
                <span>{lang === 'id' ? 'Mulai Ekspedisi' : 'Launch Starship'}</span>
              </button>
            </div>
          )}

          {/* ── OVERLAY B: Game Over Screen ── */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-midnight-0/90 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-20 animate-fade-in">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-[0_0_24px_rgba(244,63,94,0.35)] mb-2">
                <Zap className="w-6 h-6 text-rose-400" />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-pearl tracking-tight">
                {lang === 'id' ? 'Misi Selesai' : 'Mission Complete'}
              </h3>

              {isNewRecord && (
                <div className="mt-1 px-3 py-0.5 rounded-full bg-champagne/20 border border-champagne/50 text-champagne text-[11px] font-mono font-bold flex items-center gap-1.5 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'REKOR BARU TERCAPAI!' : 'NEW HIGH SCORE!'}</span>
                </div>
              )}

              {/* Score Recap Card */}
              <div className="glass-1 p-3.5 rounded-2xl border border-white/10 my-3.5 w-64 max-w-full space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-fog">
                  <span>{lang === 'id' ? 'Skor Akhir' : 'Final Score'}</span>
                  <span className="text-sm font-bold text-champagne tabular-nums">{score.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-fog border-t border-white/5 pt-1">
                  <span>{lang === 'id' ? 'Rekor Terbaik' : 'High Score'}</span>
                  <span className="text-pearl tabular-nums">{highScore.toLocaleString()}</span>
                </div>
              </div>

              {/* Play Again Button */}
              <button
                onClick={startGame}
                className="btn-champagne px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'id' ? 'Main Lagi' : 'Play Again'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Quick Instruction Strip */}
        <div className="px-4 py-2.5 bg-midnight-1/70 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10.5px] font-mono text-fog">
          <span>
            {lang === 'id'
              ? '✦ Sentuh & geser jari di layar ponsel atau gerakkan mouse di PC untuk bermanuver.'
              : '✦ Touch & drag on mobile or move mouse on PC to maneuver.'}
          </span>
          <span className="text-champagne font-semibold shrink-0">
            {lang === 'id' ? 'Auto-Fire Aktif • 60 FPS' : 'Auto-Fire Active • 60 FPS'}
          </span>
        </div>
      </div>
    </section>
  );
};
