import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trophy,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Shield,
  Zap,
  Award,
  Rocket,
  Target,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DevStudioSectionProps {
  lang: 'id' | 'en';
}

const GOAL_SCORE = 50000;

// ── Synthesized Web Audio Engine (0KB download, zero latency) ──
class SoundSynth {
  private ctx: AudioContext | null = null;
  private enabled = true;

  constructor() {
    // Initialized lazily on first user interaction to satisfy browser autoplay policies
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio muted
    }
  }

  playEnemyLaser() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Audio muted
    }
  }

  playExplosion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.18);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Audio muted
    }
  }

  playMineExplosion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
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
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.14);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
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
      osc.frequency.linearRampToValueAtTime(1320, now + 0.22);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
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
      osc.frequency.linearRampToValueAtTime(55, now + 0.16);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Audio muted
    }
  }

  playVictory() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        const start = this.ctx!.currentTime + idx * 0.12;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(start);
        osc.stop(start + 0.35);
      });
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

interface EnemyBullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface EnemyDrone {
  id: number;
  x: number;
  y: number;
  targetY: number;
  vx: number;
  hp: number;
  maxHp: number;
  lastShotTime: number;
  shotInterval: number;
}

interface SpaceHazard {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface Asteroid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hp: number;
  maxHp: number;
  speed: number;
  rot: number;
  rotSpeed: number;
  points: number[];
  type: 'top' | 'flank_left' | 'flank_right' | 'heavy';
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

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
  size: number;
}

export const DevStudioSection: React.FC<DevStudioSectionProps> = ({ lang }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
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
  const [buffTimeLeft, setBuffTimeLeft] = useState(0);
  const [soundOn, setSoundOn] = useState<boolean>(() => sound.isEnabled());
  const [isNewRecord, setIsNewRecord] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Game internal mutable state (ensures ultra-smooth 60-120fps physics without React re-render lag)
  const gameRef = useRef({
    shipX: 200,
    shipY: 340,
    targetShipX: 200,
    targetShipY: 340,
    shipWidth: 32,
    shipHeight: 38,
    invulnerableTime: 0,
    tripleLaserTime: 0,
    lastShotTime: 0,
    lastSpawnAsteroid: 0,
    lastSpawnCrystal: 0,
    lastSpawnDrone: 0,
    lastSpawnHazard: 0,
    screenShake: 0,
    bullets: [] as Bullet[],
    enemyBullets: [] as EnemyBullet[],
    drones: [] as EnemyDrone[],
    hazards: [] as SpaceHazard[],
    shockwaves: [] as Shockwave[],
    asteroids: [] as Asteroid[],
    crystals: [] as Crystal[],
    particles: [] as Particle[],
    floatingTexts: [] as FloatingText[],
    score: 0,
    lives: 3,
    combo: 1,
    comboTimer: 0,
    hasWon: false,
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
      const speed = Math.random() * 3.2 + 1.0;
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

  // Floating text feedback helper for Points, Buffs, and K.O.s
  const spawnFloatingText = useCallback((x: number, y: number, text: string, color = '#F5B027', size = 12) => {
    gameRef.current.floatingTexts.push({
      x,
      y,
      text,
      color,
      alpha: 1,
      vy: -32,
      size,
    });
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
      targetShipY: h - 50,
      shipWidth: 32,
      shipHeight: 38,
      invulnerableTime: 0,
      tripleLaserTime: 0,
      lastShotTime: 0,
      lastSpawnAsteroid: performance.now(),
      lastSpawnCrystal: performance.now() + 800,
      lastSpawnDrone: performance.now() + 3000,
      lastSpawnHazard: performance.now() + 3500,
      screenShake: 0,
      bullets: [],
      enemyBullets: [],
      drones: [],
      hazards: [],
      shockwaves: [],
      asteroids: [],
      crystals: [],
      particles: [],
      floatingTexts: [],
      score: 0,
      lives: 3,
      combo: 1,
      comboTimer: 0,
      hasWon: false,
    };

    setScore(0);
    setLives(3);
    setCombo(1);
    setBuffTimeLeft(0);
    setIsNewRecord(false);
    setGameState('playing');
    sound.playPowerup();
  };

  // Continue to endless after victory
  const continueEndless = () => {
    setGameState('playing');
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

      // ── Progressive Difficulty Factor (Smoother & More Accessible curve) ──
      const diff = Math.min(1, g.score / GOAL_SCORE);

      // ── Check Goal Victory Condition ──
      if (g.score >= GOAL_SCORE && !g.hasWon) {
        g.hasWon = true;
        sound.playVictory();
        setGameState('victory');
        const finalScore = g.score;
        try {
          const prevBest = parseInt(localStorage.getItem('cosmic_defender_highscore') || '0', 10);
          if (finalScore > prevBest) {
            localStorage.setItem('cosmic_defender_highscore', finalScore.toString());
            setHighScore(finalScore);
            setIsNewRecord(true);
          }
        } catch {
          // Ignore storage error
        }
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.52 },
          colors: ['#F5B027', '#60A5FA', '#10B981', '#F43F5E', '#FFFFFF'],
        });
        return;
      }

      // ── Update Ship position with responsive 2D lerp (Follows mouse on desktop, finger gestures on mobile/tablet) ──
      g.shipX += (g.targetShipX - g.shipX) * 0.35;
      g.shipY += (g.targetShipY - g.shipY) * 0.35;
      g.shipX = Math.max(22, Math.min(w - 22, g.shipX));
      g.shipY = Math.max(65, Math.min(h - 35, g.shipY));

      if (g.invulnerableTime > 0) g.invulnerableTime -= dt;

      // Update Active Triple Laser Buff
      if (g.tripleLaserTime > 0) {
        g.tripleLaserTime -= dt;
        if (Math.floor(g.tripleLaserTime * 2) !== Math.floor((g.tripleLaserTime + dt) * 2)) {
          setBuffTimeLeft(Math.max(0, Math.ceil(g.tripleLaserTime)));
        }
      } else if (buffTimeLeft > 0) {
        setBuffTimeLeft(0);
      }

      // Combo decay timer
      if (g.comboTimer > 0) {
        g.comboTimer -= dt;
        if (g.comboTimer <= 0 && g.combo > 1) {
          g.combo = 1;
          setCombo(1);
        }
      }

      // ── Auto-fire twin or triple lasers (Reduced attack speed: calibrated ~420ms pace) ──
      if (now - g.lastShotTime > 420) {
        g.lastShotTime = now;
        sound.playLaser();

        if (g.tripleLaserTime > 0) {
          g.bullets.push({ x: g.shipX, y: g.shipY - 14, vx: 0, vy: -12 });
          g.bullets.push({ x: g.shipX - 12, y: g.shipY - 10, vx: -2.0, vy: -11.5 });
          g.bullets.push({ x: g.shipX + 12, y: g.shipY - 10, vx: 2.0, vy: -11.5 });
        } else {
          g.bullets.push({ x: g.shipX - 9, y: g.shipY - 10, vx: 0, vy: -12 });
          g.bullets.push({ x: g.shipX + 9, y: g.shipY - 10, vx: 0, vy: -12 });
        }
      }

      // ══════════════════════════════════════════════════════
      // 1. ASTEROID SPAWNER (Balanced cadence: 480ms-1180ms, calibrated fall speed)
      // ══════════════════════════════════════════════════════
      const asteroidInterval = Math.max(480, 1180 - Math.floor(diff * 600));
      if (now - g.lastSpawnAsteroid > asteroidInterval) {
        g.lastSpawnAsteroid = now;

        const rand = Math.random();
        let spawnX = 0;
        let spawnY = 0;
        let vx = 0;
        let vy = 0;
        let type: 'top' | 'flank_left' | 'flank_right' | 'heavy' = 'top';
        let size = Math.random() * 10 + 18;
        let hp = 1;

        // Flank attack thresholds (Gentle & fair)
        const flankLeftThreshold = 0.14 + diff * 0.10;
        const flankRightThreshold = flankLeftThreshold + 0.14 + diff * 0.10;

        if (rand < flankLeftThreshold) {
          // Left Flank
          type = 'flank_left';
          spawnX = -25;
          spawnY = Math.random() * (h * 0.45) + 35;
          vx = Math.random() * 40 + 58 + diff * 42;
          vy = Math.random() * 30 + 28 + diff * 22;
          size = Math.random() * 8 + 16;
          hp = 1;
        } else if (rand < flankRightThreshold) {
          // Right Flank
          type = 'flank_right';
          spawnX = w + 25;
          spawnY = Math.random() * (h * 0.45) + 35;
          vx = -(Math.random() * 40 + 58 + diff * 42);
          vy = Math.random() * 30 + 28 + diff * 22;
          size = Math.random() * 8 + 16;
          hp = 1;
        } else if (rand < 0.75 && g.score > 1200) {
          // Heavy Asteroid (Splits into 2 smaller fragments on destroy)
          type = 'heavy';
          spawnX = Math.random() * (w - 80) + 40;
          spawnY = -35;
          vx = (Math.random() - 0.5) * 25;
          vy = Math.random() * 25 + 42 + diff * 28;
          size = Math.random() * 10 + 26;
          hp = diff > 0.6 ? 3 : 2;
        } else {
          // Standard Top Spawn (Comfortable fall velocity: 52-107 px/s)
          type = 'top';
          spawnX = Math.random() * (w - 60) + 30;
          spawnY = -30;
          vx = (Math.random() - 0.5) * 35;
          vy = Math.random() * 30 + 52 + diff * 55;
          size = Math.random() * 10 + 17;
          hp = size > 25 ? 2 : 1;
        }

        const numPts = 7;
        const pts: number[] = [];
        for (let p = 0; p < numPts; p++) {
          pts.push(size * (0.78 + Math.random() * 0.32));
        }

        g.asteroids.push({
          x: spawnX,
          y: spawnY,
          vx,
          vy,
          size,
          hp,
          maxHp: hp,
          speed: Math.hypot(vx, vy),
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 2.2,
          points: pts,
          type,
        });
      }

      // ══════════════════════════════════════════════════════
      // 2. HOSTILE ENEMY DRONE SPAWNER (Appears at 1,200 pts, calibrated shooting rate)
      // ══════════════════════════════════════════════════════
      const maxConcurrentDrones = diff < 0.35 ? 1 : diff < 0.75 ? 2 : 2;
      const droneInterval = Math.max(4200, 7000 - diff * 2500);
      if (
        g.score >= 1200 &&
        g.drones.length < maxConcurrentDrones &&
        now - g.lastSpawnDrone > droneInterval
      ) {
        g.lastSpawnDrone = now;
        g.drones.push({
          id: now + Math.random(),
          x: Math.random() * (w - 120) + 60,
          y: -35,
          targetY: Math.random() * 60 + 45,
          vx: (Math.random() > 0.5 ? 1 : -1) * (50 + diff * 35),
          hp: 2,
          maxHp: 2,
          lastShotTime: now + 1200, // gentle delay before first shot
          shotInterval: Math.max(2000, 3100 - diff * 1000), // calibrated 2.0s - 3.1s firing rate
        });
      }

      // ══════════════════════════════════════════════════════
      // 3. SPACE HAZARDS: PLASMA MINES (Tembak untuk picu ledakan EMP pembersih layar!)
      // ══════════════════════════════════════════════════════
      const maxHazards = 1;
      const hazardInterval = Math.max(5500, 8500 - diff * 3000);
      if (
        g.score >= 1500 &&
        g.hazards.length < maxHazards &&
        now - g.lastSpawnHazard > hazardInterval
      ) {
        g.lastSpawnHazard = now;
        g.hazards.push({
          id: now + Math.random(),
          x: Math.random() * (w - 80) + 40,
          y: -30,
          vx: (Math.random() - 0.5) * 18,
          vy: Math.random() * 15 + 28 + diff * 10,
          radius: 17,
          pulse: 0,
        });
      }

      // ══════════════════════════════════════════════════════
      // 4. CRYSTALS SPAWNER (Collectibles / Powerups / Buffs)
      // ══════════════════════════════════════════════════════
      if (now - g.lastSpawnCrystal > 2400) {
        g.lastSpawnCrystal = now;
        const rand = Math.random();
        const type: 'gold' | 'sapphire' | 'shield' =
          rand < 0.60 ? 'gold' : rand < 0.85 ? 'sapphire' : 'shield';
        const val = type === 'gold' ? 100 : type === 'sapphire' ? 150 : 50;

        g.crystals.push({
          x: Math.random() * (w - 60) + 30,
          y: -25,
          size: type === 'shield' ? 15 : 13,
          speed: Math.random() * 25 + 55,
          rot: 0,
          type,
          val,
        });
      }

      // ══════════════════════════════════════════════════════
      // 5. UPDATE PLAYER BULLETS
      // ══════════════════════════════════════════════════════
      for (let i = g.bullets.length - 1; i >= 0; i--) {
        const b = g.bullets[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.y < -15 || b.x < -20 || b.x > w + 20) {
          g.bullets.splice(i, 1);
        }
      }

      // ══════════════════════════════════════════════════════
      // 6. UPDATE HOSTILE DRONES & TELEGRAPH AIMING
      // ══════════════════════════════════════════════════════
      for (let di = g.drones.length - 1; di >= 0; di--) {
        const d = g.drones[di];

        // Smooth glide down into combat zone
        if (d.y < d.targetY) {
          d.y += 85 * dt;
        }

        // Horizontal strafe
        d.x += d.vx * dt;
        if (d.x < 35) {
          d.x = 35;
          d.vx = Math.abs(d.vx);
        } else if (d.x > w - 35) {
          d.x = w - 35;
          d.vx = -Math.abs(d.vx);
        }

        // Hostile Targeted Plasma Bolt Shooting (Dodgeable speed: 130-175 px/s)
        if (d.y >= d.targetY - 5 && now - d.lastShotTime > d.shotInterval) {
          d.lastShotTime = now;
          sound.playEnemyLaser();

          const dx = g.shipX - d.x;
          const dy = g.shipY - d.y;
          const angle = Math.atan2(dy, dx);
          const bulletSpeed = 145 + diff * 35;

          g.enemyBullets.push({
            x: d.x,
            y: d.y + 12,
            vx: Math.cos(angle) * bulletSpeed,
            vy: Math.sin(angle) * bulletSpeed,
          });
        }

        // Collision: Player Bullets vs Hostile Drone
        for (let bi = g.bullets.length - 1; bi >= 0; bi--) {
          const b = g.bullets[bi];
          if (Math.hypot(b.x - d.x, b.y - d.y) < 22) {
            g.bullets.splice(bi, 1);
            d.hp -= 1;
            spawnExplosion(b.x, b.y, '#F43F5E', 7);

            if (d.hp <= 0) {
              sound.playExplosion();
              spawnExplosion(d.x, d.y, '#F43F5E', 22);
              spawnExplosion(d.x, d.y, '#F5B027', 12);
              const gained = 250 * g.combo;
              g.score += gained;
              g.combo = Math.min(10, g.combo + 1);
              g.comboTimer = 3.5;
              spawnFloatingText(d.x, d.y - 10, `+${gained} DRONE K.O.!`, '#F5B027', 13);
              setScore(g.score);
              setCombo(g.combo);
              g.drones.splice(di, 1);
              break;
            }
          }
        }
      }

      // ══════════════════════════════════════════════════════
      // 7. UPDATE ENEMY BULLETS (Fair hit-radius: 12px)
      // ══════════════════════════════════════════════════════
      for (let ebi = g.enemyBullets.length - 1; ebi >= 0; ebi--) {
        const eb = g.enemyBullets[ebi];
        eb.x += eb.vx * dt;
        eb.y += eb.vy * dt;

        // Collision: Enemy Bullet vs Player Ship
        if (Math.hypot(eb.x - g.shipX, eb.y - g.shipY) < 13) {
          g.enemyBullets.splice(ebi, 1);
          if (g.invulnerableTime <= 0) {
            sound.playHit();
            spawnExplosion(g.shipX, g.shipY, '#EF4444', 22);
            spawnFloatingText(g.shipX, g.shipY - 20, '-1 PERISAI', '#EF4444', 12);
            g.screenShake = 0.25;
            g.invulnerableTime = 2.2; // Generous recovery window
            g.lives -= 1;
            g.combo = 1;
            setLives(g.lives);
            setCombo(1);

            if (g.lives <= 0) {
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
          }
          continue;
        }

        if (eb.y > h + 30 || eb.y < -30 || eb.x < -30 || eb.x > w + 30) {
          g.enemyBullets.splice(ebi, 1);
        }
      }

      // ══════════════════════════════════════════════════════
      // 8. UPDATE SPACE HAZARDS (Plasma Mines & Tactical EMP Shockwaves)
      // ══════════════════════════════════════════════════════
      for (let hi = g.hazards.length - 1; hi >= 0; hi--) {
        const hz = g.hazards[hi];
        hz.x += hz.vx * dt;
        hz.y += hz.vy * dt;
        hz.pulse += dt * 3.8;

        let detonated = false;
        let triggeredByLaser = false;

        // Player laser shoots the mine (Tactical EMP trigger!)
        for (let bi = g.bullets.length - 1; bi >= 0; bi--) {
          const b = g.bullets[bi];
          if (Math.hypot(b.x - hz.x, b.y - hz.y) < hz.radius + 6) {
            g.bullets.splice(bi, 1);
            detonated = true;
            triggeredByLaser = true;
            break;
          }
        }

        // Ship bumps into mine trap
        if (!detonated && Math.hypot(g.shipX - hz.x, g.shipY - hz.y) < hz.radius + 10) {
          detonated = true;
          if (g.invulnerableTime <= 0) {
            sound.playHit();
            spawnExplosion(g.shipX, g.shipY, '#EF4444', 24);
            spawnFloatingText(g.shipX, g.shipY - 20, '-1 PERISAI', '#EF4444', 12);
            g.screenShake = 0.3;
            g.invulnerableTime = 2.2;
            g.lives -= 1;
            g.combo = 1;
            setLives(g.lives);
            setCombo(1);

            if (g.lives <= 0) {
              setGameState('gameover');
              const finalScore = g.score;
              try {
                const prevBest = parseInt(localStorage.getItem('cosmic_defender_highscore') || '0', 10);
                if (finalScore > prevBest) {
                  localStorage.setItem('cosmic_defender_highscore', finalScore.toString());
                  setHighScore(finalScore);
                  setIsNewRecord(true);
                }
              } catch {
                // Ignore storage error
              }
              return;
            }
          }
        }

        if (detonated) {
          sound.playMineExplosion();
          spawnExplosion(hz.x, hz.y, '#F43F5E', 24);
          spawnExplosion(hz.x, hz.y, '#38BDF8', 16);
          g.screenShake = 0.32;

          // Expanding EMP shockwave
          g.shockwaves.push({
            x: hz.x,
            y: hz.y,
            radius: 10,
            maxRadius: 120,
            alpha: 1,
          });

          // If shot by player, EMP blast clears nearby threats!
          if (triggeredByLaser) {
            const blastRadius = 120;
            spawnFloatingText(hz.x, hz.y - 15, '⚡ LEDAKAN EMP!', '#38BDF8', 13);

            // Obliterate asteroids in blast radius
            for (let ai = g.asteroids.length - 1; ai >= 0; ai--) {
              const a = g.asteroids[ai];
              if (Math.hypot(a.x - hz.x, a.y - hz.y) < blastRadius) {
                spawnExplosion(a.x, a.y, '#F5B027', 12);
                g.asteroids.splice(ai, 1);
                const empPts = 60 * g.combo;
                g.score += empPts;
                spawnFloatingText(a.x, a.y, `+${empPts}`, '#F5B027', 11);
              }
            }

            // Vaporize hostile enemy bullets in blast radius
            for (let ebi = g.enemyBullets.length - 1; ebi >= 0; ebi--) {
              const eb = g.enemyBullets[ebi];
              if (Math.hypot(eb.x - hz.x, eb.y - hz.y) < blastRadius) {
                spawnExplosion(eb.x, eb.y, '#38BDF8', 4);
                g.enemyBullets.splice(ebi, 1);
              }
            }

            // Damage nearby drones
            for (let di = g.drones.length - 1; di >= 0; di--) {
              const d = g.drones[di];
              if (Math.hypot(d.x - hz.x, d.y - hz.y) < blastRadius + 15) {
                d.hp -= 2;
                spawnExplosion(d.x, d.y, '#F43F5E', 12);
                if (d.hp <= 0) {
                  spawnExplosion(d.x, d.y, '#F5B027', 16);
                  g.score += 250 * g.combo;
                  spawnFloatingText(d.x, d.y, `+${250 * g.combo} EMP K.O.!`, '#38BDF8', 12);
                  g.drones.splice(di, 1);
                }
              }
            }

            g.score += 150 * g.combo;
            setScore(g.score);
          }

          g.hazards.splice(hi, 1);
          continue;
        }

        if (hz.y > h + 35) {
          g.hazards.splice(hi, 1);
        }
      }

      // ══════════════════════════════════════════════════════
      // 9. UPDATE SHOCKWAVES
      // ══════════════════════════════════════════════════════
      for (let si = g.shockwaves.length - 1; si >= 0; si--) {
        const sw = g.shockwaves[si];
        sw.radius += 230 * dt;
        sw.alpha -= 1.6 * dt;
        if (sw.radius >= sw.maxRadius || sw.alpha <= 0) {
          g.shockwaves.splice(si, 1);
        }
      }

      // ══════════════════════════════════════════════════════
      // 10. UPDATE ASTEROIDS & SPLITTING
      // ══════════════════════════════════════════════════════
      for (let i = g.asteroids.length - 1; i >= 0; i--) {
        const a = g.asteroids[i];
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.rot += a.rotSpeed * dt;

        // Collision: Laser vs Asteroid
        for (let bi = g.bullets.length - 1; bi >= 0; bi--) {
          const b = g.bullets[bi];
          const dist = Math.hypot(b.x - a.x, b.y - a.y);
          if (dist < a.size + 4) {
            g.bullets.splice(bi, 1);
            a.hp -= 1;
            spawnExplosion(b.x, b.y, '#F5B027', 6);

            if (a.hp <= 0) {
              sound.playExplosion();
              spawnExplosion(a.x, a.y, '#F43F5E', 18);
              spawnExplosion(a.x, a.y, '#F5B027', 10);

              // Heavy asteroid splits into fragments!
              if (a.type === 'heavy') {
                const subPts1: number[] = [];
                const subPts2: number[] = [];
                for (let p = 0; p < 6; p++) {
                  subPts1.push(14 * (0.8 + Math.random() * 0.3));
                  subPts2.push(14 * (0.8 + Math.random() * 0.3));
                }
                g.asteroids.push({
                  x: a.x - 12,
                  y: a.y,
                  vx: -45,
                  vy: 55,
                  size: 14,
                  hp: 1,
                  maxHp: 1,
                  speed: 70,
                  rot: a.rot,
                  rotSpeed: -2.5,
                  points: subPts1,
                  type: 'top',
                });
                g.asteroids.push({
                  x: a.x + 12,
                  y: a.y,
                  vx: 45,
                  vy: 55,
                  size: 14,
                  hp: 1,
                  maxHp: 1,
                  speed: 70,
                  rot: a.rot,
                  rotSpeed: 2.5,
                  points: subPts2,
                  type: 'top',
                });
              }

              const gained = 50 * g.combo;
              g.score += gained;
              g.combo = Math.min(10, g.combo + 1);
              g.comboTimer = 3.0;

              spawnFloatingText(a.x, a.y - 8, `+${gained}`, '#F5B027', 11);
              setScore(g.score);
              setCombo(g.combo);
              g.asteroids.splice(i, 1);
              break;
            }
          }
        }

        // Collision: Ship vs Asteroid (Fair hit-radius: size + 9)
        if (a && a.hp > 0) {
          const shipDist = Math.hypot(g.shipX - a.x, g.shipY - a.y);
          if (shipDist < a.size + 9 && g.invulnerableTime <= 0) {
            sound.playHit();
            spawnExplosion(g.shipX, g.shipY, '#EF4444', 22);
            spawnFloatingText(g.shipX, g.shipY - 20, '-1 PERISAI', '#EF4444', 12);
            g.screenShake = 0.28;
            g.invulnerableTime = 2.2;
            g.lives -= 1;
            g.combo = 1;
            setLives(g.lives);
            setCombo(1);

            g.asteroids.splice(i, 1);

            if (g.lives <= 0) {
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

        if (a && (a.y > h + 50 || a.x < -60 || a.x > w + 60)) {
          g.asteroids.splice(i, 1);
        }
      }

      // ══════════════════════════════════════════════════════
      // 11. UPDATE CRYSTALS & BUFF ACTIVATION
      // ══════════════════════════════════════════════════════
      for (let ci = g.crystals.length - 1; ci >= 0; ci--) {
        const c = g.crystals[ci];
        c.y += c.speed * dt;
        c.rot += dt * 2.5;

        const dist = Math.hypot(g.shipX - c.x, g.shipY - c.y);
        if (dist < c.size + 18) {
          sound.playCollect();
          const colColor = c.type === 'gold' ? '#F5B027' : c.type === 'sapphire' ? '#38BDF8' : '#10B981';
          spawnExplosion(c.x, c.y, colColor, 16);

          if (c.type === 'shield') {
            sound.playPowerup();
            if (g.lives < 3) {
              g.lives += 1;
              setLives(g.lives);
            }
            g.tripleLaserTime = 8.5; // Activate Triple Laser Buff
            setBuffTimeLeft(9);
            spawnFloatingText(c.x, c.y - 12, '⚡ +PERISAI & TRIPLE LASER!', '#10B981', 13);
          } else {
            const gained = c.val * g.combo;
            g.score += gained;
            g.combo = Math.min(10, g.combo + 1);
            g.comboTimer = 3.5;
            spawnFloatingText(c.x, c.y - 10, `+${gained} PTS`, colColor, 12);
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

      // ══════════════════════════════════════════════════════
      // 12. UPDATE PARTICLES & FLOATING TEXTS
      // ══════════════════════════════════════════════════════
      for (let pi = g.particles.length - 1; pi >= 0; pi--) {
        const p = g.particles[pi];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= dt * 2.2;
        if (p.alpha <= 0) {
          g.particles.splice(pi, 1);
        }
      }

      for (let fti = g.floatingTexts.length - 1; fti >= 0; fti--) {
        const ft = g.floatingTexts[fti];
        ft.y += ft.vy * dt;
        ft.alpha -= dt * 1.1;
        if (ft.alpha <= 0) {
          g.floatingTexts.splice(fti, 1);
        }
      }

      // ══════════════════════════════════════════════════════
      // RENDER CANVAS 2D
      // ══════════════════════════════════════════════════════
      ctx.clearRect(0, 0, w, h);
      ctx.save();

      // Screen Shake on damage/detonation
      if (g.screenShake > 0) {
        g.screenShake -= dt;
        const shakeAmt = g.screenShake * 10;
        const offsetX = (Math.random() - 0.5) * shakeAmt;
        const offsetY = (Math.random() - 0.5) * shakeAmt;
        ctx.translate(offsetX, offsetY);
      }

      // Starfield Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let gx = 0; gx < w; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }

      // ── Flank Attack Warnings (Edge Markers) ──
      for (let ai = 0; ai < g.asteroids.length; ai++) {
        const a = g.asteroids[ai];
        if (a.type === 'flank_left' && a.x < 30) {
          ctx.save();
          ctx.fillStyle = '#F43F5E';
          ctx.font = 'bold 10px monospace';
          ctx.fillText('◄ FLANK!', 10, Math.max(30, Math.min(h - 30, a.y)));
          ctx.restore();
        } else if (a.type === 'flank_right' && a.x > w - 30) {
          ctx.save();
          ctx.fillStyle = '#F43F5E';
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'right';
          ctx.fillText('FLANK! ►', w - 10, Math.max(30, Math.min(h - 30, a.y)));
          ctx.restore();
        }
      }

      // Render EMP Shockwaves
      for (let si = 0; si < g.shockwaves.length; si++) {
        const sw = g.shockwaves[si];
        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#F43F5E';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
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

      // Render Space Hazards (Plasma Mines with Clear Warning Tag)
      for (let hi = 0; hi < g.hazards.length; hi++) {
        const hz = g.hazards[hi];
        ctx.save();
        ctx.translate(hz.x, hz.y);

        const pulseScale = 1 + Math.sin(hz.pulse) * 0.12;

        // Warning perimeter pulse
        ctx.strokeStyle = `rgba(244, 63, 94, ${0.4 + Math.sin(hz.pulse) * 0.3})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, hz.radius * 1.55 * pulseScale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Spiky Mine Body
        ctx.fillStyle = '#1A1829';
        ctx.strokeStyle = '#F43F5E';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const spikes = 8;
        for (let s = 0; s < spikes * 2; s++) {
          const r = s % 2 === 0 ? hz.radius : hz.radius * 0.62;
          const a = (s / (spikes * 2)) * Math.PI * 2 + hz.pulse * 0.4;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Pulsing Core
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Distinct HUD label above hazard
        ctx.font = 'bold 8.5px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#F43F5E';
        ctx.fillText('[RANJAU EMP]', 0, -hz.radius - 8);

        ctx.restore();
      }

      // Render Hostile Enemy Drones (With Telegraph Aiming Line & Overhead HP)
      for (let di = 0; di < g.drones.length; di++) {
        const d = g.drones[di];

        // Telegraph laser line before shooting (fair telegraph warning)
        const timeUntilShot = d.shotInterval - (now - d.lastShotTime);
        if (d.y >= d.targetY - 5 && timeUntilShot <= 650 && timeUntilShot > 0) {
          ctx.save();
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(d.x, d.y + 12);
          ctx.lineTo(g.shipX, g.shipY);
          ctx.stroke();
          ctx.restore();
        }

        ctx.save();
        ctx.translate(d.x, d.y);

        // Drone Hull (Angular Stealth Gunship)
        ctx.fillStyle = '#111827';
        ctx.strokeStyle = '#F43F5E';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, 16);    // Front gun nose
        ctx.lineTo(16, -10);  // Right wingtip
        ctx.lineTo(6, -6);    // Right indent
        ctx.lineTo(0, -10);   // Engine bay
        ctx.lineTo(-6, -6);   // Left indent
        ctx.lineTo(-16, -10); // Left wingtip
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Glowing hostile visor
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(4, 2);
        ctx.lineTo(-4, 2);
        ctx.closePath();
        ctx.fill();

        // Wing plasma thrusters
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(12, -10, 2, 0, Math.PI * 2);
        ctx.arc(-12, -10, 2, 0, Math.PI * 2);
        ctx.fill();

        // Clear Overhead Drone HP Bar & Label
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#F43F5E';
        ctx.fillText(`DRONE [HP ${d.hp}/${d.maxHp}]`, 0, -22);

        const barW = 26;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(-barW / 2, -18, barW, 3.5);
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(-barW / 2, -18, (d.hp / d.maxHp) * barW, 3.5);

        ctx.restore();
      }

      // Render Hostile Enemy Bullets
      ctx.save();
      for (let ebi = 0; ebi < g.enemyBullets.length; ebi++) {
        const eb = g.enemyBullets[ebi];
        ctx.fillStyle = '#EF4444';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(eb.x, eb.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FEE2E2';
        ctx.beginPath();
        ctx.arc(eb.x, eb.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Render Player Bullets (Comfortable width 5px x 16px)
      ctx.fillStyle = g.tripleLaserTime > 0 ? '#38BDF8' : '#F5B027';
      for (let bi = 0; bi < g.bullets.length; bi++) {
        const b = g.bullets[bi];
        ctx.beginPath();
        ctx.roundRect(b.x - 2.5, b.y - 8, 5, 16, 2.5);
        ctx.fill();
      }

      // Render Crystals & Buff Items with Clear Text Badges
      for (let ci = 0; ci < g.crystals.length; ci++) {
        const c = g.crystals[ci];
        ctx.save();
        ctx.translate(c.x, c.y);

        const gemColor = c.type === 'gold' ? '#F5B027' : c.type === 'sapphire' ? '#38BDF8' : '#10B981';
        ctx.fillStyle = gemColor;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.2;

        if (c.type === 'shield') {
          // Circular shield buff orb
          ctx.beginPath();
          ctx.arc(0, 0, c.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Pulsing halo
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, c.size + 4, 0, Math.PI * 2);
          ctx.stroke();

          // Clear label beside item
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'left';
          ctx.fillStyle = '#10B981';
          ctx.fillText('BUFF PERISAI', c.size + 4, 3);
        } else {
          ctx.rotate(c.rot);
          ctx.beginPath();
          ctx.moveTo(0, -c.size);
          ctx.lineTo(c.size * 0.75, 0);
          ctx.lineTo(0, c.size);
          ctx.lineTo(-c.size * 0.75, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.rotate(-c.rot);
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'left';
          ctx.fillStyle = gemColor;
          ctx.fillText(`+${c.val}P`, c.size + 4, 3);
        }

        ctx.restore();
      }

      // Render Asteroids with HP indicators
      for (let ai = 0; ai < g.asteroids.length; ai++) {
        const a = g.asteroids[ai];
        ctx.save();
        ctx.translate(a.x, a.y);

        // Flanker trail
        if (a.type === 'flank_left' || a.type === 'flank_right') {
          const angle = Math.atan2(a.vy, a.vx) + Math.PI;
          const tailLen = a.size * 1.5;
          const tx = Math.cos(angle) * tailLen;
          const ty = Math.sin(angle) * tailLen;
          const grad = ctx.createLinearGradient(0, 0, tx, ty);
          grad.addColorStop(0, 'rgba(244, 63, 94, 0.85)');
          grad.addColorStop(0.5, 'rgba(245, 176, 39, 0.4)');
          grad.addColorStop(1, 'transparent');
          ctx.strokeStyle = grad;
          ctx.lineWidth = a.size * 0.7;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }

        ctx.rotate(a.rot);

        ctx.fillStyle = a.type === 'heavy' ? '#2A1A10' : '#1A1D2B';
        ctx.strokeStyle =
          a.type === 'heavy'
            ? '#F97316'
            : a.hp === 1
              ? '#F43F5E'
              : '#D97706';
        ctx.lineWidth = a.type === 'heavy' ? 2.5 : 2;

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

        // Core glow dot
        ctx.fillStyle = a.type === 'heavy' ? '#FB923C' : a.hp === 1 ? '#EF4444' : '#F5B027';
        ctx.beginPath();
        ctx.arc(0, 0, a.type === 'heavy' ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Show HP indicator pips on multi-hit asteroids
        if (a.maxHp > 1) {
          ctx.save();
          ctx.textAlign = 'center';
          ctx.font = 'bold 8px monospace';
          ctx.fillStyle = '#F5B027';
          ctx.fillText(`${'●'.repeat(a.hp)}`, a.x, a.y - a.size - 4);
          ctx.restore();
        }
      }

      // Render Player Starship
      const isVisible = g.invulnerableTime <= 0 || Math.floor(now / 80) % 2 === 0;
      if (isVisible) {
        ctx.save();
        ctx.translate(g.shipX, g.shipY);

        // Dynamic aerodynamic bank tilt based on lateral steering
        const bankAngle = Math.max(-0.22, Math.min(0.22, (g.targetShipX - g.shipX) * 0.012));
        ctx.rotate(bankAngle);

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

        // Ship Fuselage
        ctx.fillStyle = '#0F1830';
        ctx.strokeStyle = '#F5B027';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, -18);  // Nose
        ctx.lineTo(14, 10);  // Right Wing
        ctx.lineTo(5, 6);    // Right Indent
        ctx.lineTo(0, 8);    // Engine
        ctx.lineTo(-5, 6);   // Left Indent
        ctx.lineTo(-14, 10); // Left Wing
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Canopy Glass
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(3, -2);
        ctx.lineTo(0, 2);
        ctx.lineTo(-3, -2);
        ctx.closePath();
        ctx.fill();

        // Wingtip Lights
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(14, 10, 2, 0, Math.PI * 2);
        ctx.arc(-14, 10, 2, 0, Math.PI * 2);
        ctx.fill();

        // Active Triple Laser / Shield Aura with 3 Orbiting Energy Orbs
        if (g.tripleLaserTime > 0) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(0, 0, 25, 0, Math.PI * 2);
          ctx.stroke();

          // 3 orbiting energy nodes
          for (let oi = 0; oi < 3; oi++) {
            const orbAngle = (now / 200) + (oi * Math.PI * 2) / 3;
            const ox = Math.cos(orbAngle) * 25;
            const oy = Math.sin(orbAngle) * 25;
            ctx.fillStyle = '#38BDF8';
            ctx.beginPath();
            ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      }

      // ── Render In-Arena Floating Text Particles (+50, +100, +BUFF, etc.) ──
      ctx.save();
      ctx.textAlign = 'center';
      for (let fti = 0; fti < g.floatingTexts.length; fti++) {
        const ft = g.floatingTexts[fti];
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.font = `bold ${ft.size}px monospace`;
        ctx.fillStyle = ft.color;
        ctx.shadowColor = ft.color;
        ctx.shadowBlur = 6;
        ctx.fillText(ft.text, ft.x, ft.y);
      }
      ctx.restore();

      // ── Active Buff Floating Banner at Arena Top ──
      if (g.tripleLaserTime > 0) {
        ctx.save();
        ctx.textAlign = 'center';
        const bannerW = 200;
        const bannerH = 22;
        const bannerX = w / 2;
        const bannerY = 22;

        ctx.fillStyle = 'rgba(15, 24, 48, 0.88)';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(bannerX - bannerW / 2, bannerY - bannerH / 2, bannerW, bannerH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 9.5px monospace';
        ctx.fillStyle = '#38BDF8';
        ctx.fillText(`⚡ TRIPLE LASER: ${g.tripleLaserTime.toFixed(1)}s`, bannerX, bannerY + 3.5);
        ctx.restore();
      }

      ctx.restore();
    };

    animRef.id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.id);
  }, [gameState, spawnExplosion, spawnFloatingText, buffTimeLeft]);

  // Mutable Touch Drag State for Mobile & Tablet (Moves ship smoothly in the exact direction of finger gestures)
  const touchStateRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    shipStartX: number;
    shipStartY: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    shipStartX: 200,
    shipStartY: 340,
  });

  // Touch Handlers for Mobile & Tablet (Gestural directional drag without thumb obstruction)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing' || e.touches.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const touchX = ((touch.clientX - rect.left) / rect.width) * canvas.width;
    const touchY = ((touch.clientY - rect.top) / rect.height) * canvas.height;

    touchStateRef.current = {
      active: true,
      startX: touchX,
      startY: touchY,
      shipStartX: gameRef.current.shipX,
      shipStartY: gameRef.current.shipY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing' || e.touches.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const touchX = ((touch.clientX - rect.left) / rect.width) * canvas.width;
    const touchY = ((touch.clientY - rect.top) / rect.height) * canvas.height;

    if (!touchStateRef.current.active) {
      touchStateRef.current = {
        active: true,
        startX: touchX,
        startY: touchY,
        shipStartX: gameRef.current.shipX,
        shipStartY: gameRef.current.shipY,
      };
    }

    const deltaX = touchX - touchStateRef.current.startX;
    const deltaY = touchY - touchStateRef.current.startY;

    const newTargetX = touchStateRef.current.shipStartX + deltaX;
    const newTargetY = touchStateRef.current.shipStartY + deltaY;

    gameRef.current.targetShipX = Math.max(22, Math.min(canvas.width - 22, newTargetX));
    gameRef.current.targetShipY = Math.max(65, Math.min(canvas.height - 35, newTargetY));
  };

  const handleTouchEnd = () => {
    touchStateRef.current.active = false;
  };

  // Mouse Move Handler for Desktop (Directly follows mouse cursor position across the canvas)
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const relativeY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    gameRef.current.targetShipX = Math.max(22, Math.min(canvas.width - 22, relativeX));
    gameRef.current.targetShipY = Math.max(65, Math.min(canvas.height - 35, relativeY));
  };

  // Window-level Mouse, Touch, & Keyboard tracking during active gameplay
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Desktop: Continue following mouse cursor even when moving rapidly near canvas boundaries
    const handleWindowMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left - 60 &&
        e.clientX <= rect.right + 60 &&
        e.clientY >= rect.top - 60 &&
        e.clientY <= rect.bottom + 60
      ) {
        const relativeX = ((e.clientX - rect.left) / rect.width) * canvas.width;
        const relativeY = ((e.clientY - rect.top) / rect.height) * canvas.height;
        gameRef.current.targetShipX = Math.max(22, Math.min(canvas.width - 22, relativeX));
        gameRef.current.targetShipY = Math.max(65, Math.min(canvas.height - 35, relativeY));
      }
    };

    // Mobile & Tablet: Continue directional touch drag if finger slides slightly past canvas border
    const handleWindowTouchMove = (e: TouchEvent) => {
      if (!touchStateRef.current.active || e.touches.length === 0) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchX = ((touch.clientX - rect.left) / rect.width) * canvas.width;
      const touchY = ((touch.clientY - rect.top) / rect.height) * canvas.height;

      const deltaX = touchX - touchStateRef.current.startX;
      const deltaY = touchY - touchStateRef.current.startY;

      const newTargetX = touchStateRef.current.shipStartX + deltaX;
      const newTargetY = touchStateRef.current.shipStartY + deltaY;

      gameRef.current.targetShipX = Math.max(22, Math.min(canvas.width - 22, newTargetX));
      gameRef.current.targetShipY = Math.max(65, Math.min(canvas.height - 35, newTargetY));
    };

    const handleWindowTouchEnd = () => {
      touchStateRef.current.active = false;
    };

    // Keyboard navigation (Supports Arrow keys and WASD for full 2D mobility)
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 32;
      const canvas = canvasRef.current;
      const maxW = canvas ? canvas.width - 22 : 400;
      const maxH = canvas ? canvas.height - 35 : 400;

      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        gameRef.current.targetShipX = Math.max(22, gameRef.current.targetShipX - step);
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        gameRef.current.targetShipX = Math.min(maxW, gameRef.current.targetShipX + step);
      } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        gameRef.current.targetShipY = Math.max(65, gameRef.current.targetShipY - step);
      } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        gameRef.current.targetShipY = Math.min(maxH, gameRef.current.targetShipY + step);
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });
    window.addEventListener('touchend', handleWindowTouchEnd);
    window.addEventListener('touchcancel', handleWindowTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowTouchEnd);
      window.removeEventListener('touchcancel', handleWindowTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState]);

  // Sync canvas resolution with container
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const isMobile = window.innerWidth < 640;
      const h = isMobile
        ? Math.min(520, Math.max(430, Math.floor(window.innerHeight * 0.58)))
        : Math.min(500, Math.max(380, Math.floor(window.innerHeight * 0.52)));

      canvas.width = w;
      canvas.height = h;

      if (gameRef.current.shipX === 200) {
        gameRef.current.shipX = w / 2;
        gameRef.current.targetShipX = w / 2;
        gameRef.current.shipY = h - 50;
        gameRef.current.targetShipY = h - 50;
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section id="studio" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative text-left">
      {/* Ambient Cosmic Haze */}
      <div className="absolute top-1/2 -left-28 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-sapphire/20 blur-md sm:blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute -top-10 -right-28 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-champagne/15 blur-md sm:blur-[140px] pointer-events-none transform-gpu" />

      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 relative z-10">
        <div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl text-pearl font-normal tracking-tight">
            Cosmic Orbit Defender
          </h2>
          <p className="text-mist text-xs sm:text-sm max-w-md mt-1.5 leading-relaxed">
            {lang === 'id'
              ? 'Arkade tempur antariksa. Tembak drone musuh, asteroid, dan picu ranjau plasma.'
              : 'Cosmic arcade combat. Intercept hostile drones, asteroids, and trigger plasma mines.'}
          </p>
        </div>

        {/* Clean, spacious target & high score badges */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="glass-1 px-3 sm:px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-2 sm:gap-2.5 shadow-sm justify-center sm:justify-start">
            <Trophy className="w-4 h-4 text-champagne shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-fog leading-none uppercase">{lang === 'id' ? 'Target Misi' : 'Mission Goal'}</span>
              <span className="font-mono text-xs font-bold text-champagne tabular-nums mt-0.5">{GOAL_SCORE.toLocaleString()} PTS</span>
            </div>
          </div>

          <div className="glass-1 px-3 sm:px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-2 sm:gap-2.5 shadow-sm justify-center sm:justify-start">
            <Award className="w-4 h-4 text-pearl shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-fog leading-none uppercase">{lang === 'id' ? 'Rekor Terbaik' : 'High Score'}</span>
              <span className="font-mono text-xs font-bold text-pearl tabular-nums mt-0.5">{highScore.toLocaleString()}</span>
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
        <div className="px-3 sm:px-7 py-2.5 sm:py-3 bg-midnight-1/90 border-b border-white/10 flex items-center justify-between gap-2 sm:gap-3 text-xs font-mono">
          {/* Left: Score & Combo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-fog text-[9.5px] sm:text-[10.5px] uppercase">{lang === 'id' ? 'SKOR:' : 'SCORE:'}</span>
              <span className="font-bold text-champagne text-xs sm:text-base tabular-nums">{score.toLocaleString()}</span>
            </div>

            {combo > 1 && (
              <span className="px-1.5 sm:px-2 py-0.5 rounded bg-champagne/20 border border-champagne/40 text-champagne text-[9px] sm:text-[10px] font-bold animate-pulse">
                {combo}x
              </span>
            )}

            {/* Active Buff HUD Badge */}
            {buffTimeLeft > 0 && (
              <span className="hidden xs:inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[9px] sm:text-[9.5px] font-bold animate-pulse">
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-300" />
                <span>TRIPLE ({buffTimeLeft}s)</span>
              </span>
            )}
          </div>

          {/* Center: Live Mission Goal Progress Bar (50,000 Points Goal) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[8.5px] font-mono text-fog leading-none">TARGET STABILISASI</span>
              <span className="text-[10px] font-mono font-bold text-champagne tabular-nums">
                {score.toLocaleString()} / {GOAL_SCORE.toLocaleString()}
              </span>
            </div>
            <div className="w-16 xs:w-24 sm:w-40 h-2 sm:h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-champagne to-emerald-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (score / GOAL_SCORE) * 100)}%` }}
              />
            </div>
          </div>

          {/* Right: Lives & Sound Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5">
              {[1, 2, 3].map((heart) => (
                <Shield
                  key={heart}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all ${
                    heart <= lives
                      ? 'text-cyan-400 fill-cyan-400/30 drop-shadow-[0_0_6px_#22D3EE]'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={toggleSound}
              className="p-1 sm:p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-mist hover:text-pearl transition-colors cursor-pointer"
              title={soundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-champagne" /> : <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
            </button>
          </div>
        </div>

        {/* ── Active Canvas Arena ── */}
        <div className="relative w-full flex items-center justify-center bg-midnight-0 select-none overflow-hidden touch-none">
          <canvas
            ref={canvasRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseMove}
            className="w-full block cursor-crosshair"
          />

          {/* ── OVERLAY A: Start Screen (Detailed Legend for Enemies, Buffs & Points) ── */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-midnight-0/90 backdrop-blur-md flex flex-col p-3.5 sm:p-6 text-center z-20 animate-fade-in overflow-y-auto overscroll-contain">
              <div className="my-auto flex flex-col items-center w-full max-w-xl mx-auto py-1 sm:py-2">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-champagne/15 border border-champagne/40 flex items-center justify-center text-champagne shadow-[0_0_20px_rgba(245,176,39,0.3)] mb-1.5 sm:mb-2">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-champagne" />
                </div>

                <h3 className="font-display text-lg sm:text-2xl font-bold text-pearl tracking-tight">
                  Cosmic Orbit Defender
                </h3>
                <p className="text-mist text-[11px] sm:text-xs max-w-sm mt-0.5 sm:mt-1 leading-snug">
                  {lang === 'id'
                    ? 'Tembak musuh & ranjau, ambil kristal buff, dan hindari tembakan plasma!'
                    : 'Shoot enemies & mines, collect buff crystals, and evade hostile plasma!'}
                </p>

                {/* Detailed 3-Column Visual Guide: Musuh, Buff/Skill, dan Poin */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3 my-2.5 sm:my-3.5 max-w-xl w-full text-left font-mono">
                  {/* Column 1: Musuh & Bahaya */}
                  <div className="p-2 sm:p-3 rounded-xl bg-white/[0.04] border border-rose-500/20 flex flex-col justify-between">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-rose-400 font-bold text-[9px] sm:text-xs mb-1">
                      <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      <span className="truncate">{lang === 'id' ? 'Musuh' : 'Hostiles'}</span>
                    </div>
                    <ul className="space-y-0.5 text-mist text-[8px] sm:text-[9.5px] leading-tight">
                      <li>• <b className="text-pearl">Asteroid:</b> +50</li>
                      <li>• <b className="text-pearl">Drone:</b> +250</li>
                      <li>• <b className="text-rose-300">Ranjau:</b> EMP</li>
                    </ul>
                  </div>

                  {/* Column 2: Buff & Skill User */}
                  <div className="p-2 sm:p-3 rounded-xl bg-white/[0.04] border border-cyan-500/20 flex flex-col justify-between">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-cyan-400 font-bold text-[9px] sm:text-xs mb-1">
                      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      <span className="truncate">{lang === 'id' ? 'Buff & Skill' : 'Buffs'}</span>
                    </div>
                    <ul className="space-y-0.5 text-mist text-[8px] sm:text-[9.5px] leading-tight">
                      <li>• <b className="text-emerald-400">Perisai:</b> Nyawa</li>
                      <li>• <b className="text-cyan-300">Triple Laser:</b> 3x</li>
                      <li>• <b className="text-champagne">Combo:</b> s/d 10x</li>
                    </ul>
                  </div>

                  {/* Column 3: Koleksi Poin */}
                  <div className="p-2 sm:p-3 rounded-xl bg-white/[0.04] border border-champagne/20 flex flex-col justify-between">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-champagne font-bold text-[9px] sm:text-xs mb-1">
                      <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      <span className="truncate">{lang === 'id' ? 'Target Poin' : 'Goal'}</span>
                    </div>
                    <ul className="space-y-0.5 text-mist text-[8px] sm:text-[9.5px] leading-tight">
                      <li>• <b className="text-amber-400">Safir:</b> +150</li>
                      <li>• <b className="text-yellow-400">Emas:</b> +100</li>
                      <li>• <b className="text-pearl">Target:</b> 50K</li>
                    </ul>
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={startGame}
                  className="btn-champagne px-7 sm:px-8 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer mt-1"
                >
                  <Play className="w-4 h-4 fill-midnight-0" />
                  <span>{lang === 'id' ? 'Mulai Ekspedisi' : 'Launch Starship'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ── OVERLAY B: Victory Screen (50,000 Points Milestone Reached!) ── */}
          {gameState === 'victory' && (
            <div className="absolute inset-0 bg-midnight-0/92 backdrop-blur-md flex flex-col p-4 sm:p-8 text-center z-20 animate-fade-in overflow-y-auto overscroll-contain">
              <div className="my-auto flex flex-col items-center w-full max-w-sm mx-auto py-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-champagne shadow-[0_0_24px_rgba(245,176,39,0.3)] mb-2.5 sm:mb-3">
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-champagne" />
                </div>

                <h3 className="font-display text-xl sm:text-3xl font-bold text-pearl tracking-tight">
                  {lang === 'id' ? 'MISI BERHASIL!' : 'MISSION ACCOMPLISHED!'}
                </h3>
                <p className="text-mist text-[11px] sm:text-sm max-w-sm mt-1 leading-relaxed">
                  {lang === 'id'
                    ? `Target ${GOAL_SCORE.toLocaleString()} poin tercapai! Pertahanan sektor antariksa telah aman.`
                    : `${GOAL_SCORE.toLocaleString()} pts goal reached! Orbital defense sector secured.`}
                </p>

                <div className="glass-1 p-3.5 sm:p-4 rounded-xl border border-white/10 my-3 sm:my-4 w-72 max-w-full space-y-2">
                  {isNewRecord && (
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-semibold tracking-wide">
                          {lang === 'id' ? 'Rekor Baru Terpecahkan' : 'New Personal Best'}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        {lang === 'id' ? 'Terbaik' : 'Best'}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs font-mono text-fog">
                    <span>{lang === 'id' ? 'Skor Akhir' : 'Final Score'}</span>
                    <span className="text-sm font-bold text-champagne tabular-nums">{score.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-fog border-t border-white/5 pt-1.5">
                    <span>{lang === 'id' ? 'Rekor Terbaik' : 'High Score'}</span>
                    <span className="text-pearl tabular-nums">{highScore.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={continueEndless}
                    className="btn-champagne px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Rocket className="w-4 h-4 fill-midnight-0" />
                    <span>{lang === 'id' ? 'Lanjut Mode Tanpa Batas' : 'Continue Endless'}</span>
                  </button>
                  <button
                    onClick={startGame}
                    className="px-3.5 sm:px-4 py-2.5 rounded-xl glass-2 border border-white/15 text-xs sm:text-sm font-semibold text-pearl hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Main Ulang' : 'Restart'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── OVERLAY C: Game Over Screen ── */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-midnight-0/90 backdrop-blur-md flex flex-col p-4 sm:p-8 text-center z-20 animate-fade-in overflow-y-auto overscroll-contain">
              <div className="my-auto flex flex-col items-center w-full max-w-sm mx-auto py-2">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-[0_0_24px_rgba(244,63,94,0.35)] mb-2">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
                </div>

                <h3 className="font-display text-lg sm:text-2xl font-bold text-pearl tracking-tight">
                  {lang === 'id' ? 'Pertahanan Jebol' : 'Defense Breached'}
                </h3>

                <div className="mt-1 flex items-center gap-1.5 text-xs font-mono text-rose-300">
                  <span>
                    {lang === 'id'
                      ? `Kemajuan Target: ${Math.min(100, Math.round((score / GOAL_SCORE) * 100))}% (${score.toLocaleString()} / ${GOAL_SCORE.toLocaleString()} Poin)`
                      : `Mission Progress: ${Math.min(100, Math.round((score / GOAL_SCORE) * 100))}% (${score.toLocaleString()} / ${GOAL_SCORE.toLocaleString()} Pts)`}
                  </span>
                </div>

                {/* Score Recap Card */}
                <div className="glass-1 p-3.5 sm:p-4 rounded-xl border border-white/10 my-3 sm:my-4 w-72 max-w-full space-y-2">
                  {isNewRecord && (
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-semibold tracking-wide">
                          {lang === 'id' ? 'Rekor Baru Terpecahkan' : 'New Personal Best'}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        {lang === 'id' ? 'Terbaik' : 'Best'}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-mono text-fog">
                    <span>{lang === 'id' ? 'Skor Akhir' : 'Final Score'}</span>
                    <span className="text-sm font-bold text-champagne tabular-nums">{score.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-fog border-t border-white/5 pt-1.5">
                    <span>{lang === 'id' ? 'Rekor Terbaik' : 'High Score'}</span>
                    <span className="text-pearl tabular-nums">{highScore.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="btn-champagne px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === 'id' ? 'Coba Lagi' : 'Try Again'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom Quick Instruction Strip ── */}
        <div className="px-3 sm:px-7 py-2.5 sm:py-3 bg-midnight-1/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-fog text-center sm:text-left">
          <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start">
            <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>
              {lang === 'id'
                ? 'Garis merah putus-putus menandakan arah tembakan drone. Tembak ranjau untuk ledakan EMP!'
                : 'Dashed red lines telegraph drone fire. Shoot plasma mines to trigger an EMP blast!'}
            </span>
          </div>
          <span className="text-champagne font-semibold shrink-0">
            {lang === 'id' ? `Target Misi: ${GOAL_SCORE.toLocaleString()} Poin` : `Mission Goal: ${GOAL_SCORE.toLocaleString()} Pts`}
          </span>
        </div>
      </div>
    </section>
  );
};
