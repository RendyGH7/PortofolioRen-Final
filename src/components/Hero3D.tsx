import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, Orbit } from 'lucide-react';

/**
 * Seeded 3D Perlin Noise generator for deterministic, seamless procedural planet textures
 */
function createSeededNoise() {
  let seed = 42891;
  const rnd = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const perm = new Uint8Array(512);
  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const temp = perm[i];
    perm[i] = perm[j];
    perm[j] = temp;
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad3 = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  const noise3D = (x: number, y: number, z: number): number => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const zf = z - Math.floor(z);
    const u = fade(xf);
    const v = fade(yf);
    const w = fade(zf);
    const A = perm[X] + Y;
    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;

    return lerp(
      w,
      lerp(
        v,
        lerp(u, grad3(perm[AA], xf, yf, zf), grad3(perm[BA], xf - 1, yf, zf)),
        lerp(u, grad3(perm[AB], xf, yf - 1, zf), grad3(perm[BB], xf - 1, yf - 1, zf))
      ),
      lerp(
        v,
        lerp(u, grad3(perm[AA + 1], xf, yf, zf - 1), grad3(perm[BA + 1], xf - 1, yf, zf - 1)),
        lerp(u, grad3(perm[AB + 1], xf, yf - 1, zf - 1), grad3(perm[BB + 1], xf - 1, yf - 1, zf - 1))
      )
    );
  };

  const fbm3D = (x: number, y: number, z: number, octaves = 4): number => {
    let val = 0;
    let amp = 0.5;
    let freq = 1.0;
    for (let i = 0; i < octaves; i++) {
      val += noise3D(x * freq, y * freq, z * freq) * amp;
      freq *= 2.0;
      amp *= 0.5;
    }
    return val;
  };

  return { noise3D, fbm3D };
}

/**
 * Generates dark, atmospheric exoplanet textures matching Midnight Glass (#0A1020)
 * with bioluminescent city lights and obsidian continental topography
 */
function createDarkPlanetTextures() {
  const { noise3D, fbm3D } = createSeededNoise();
  const width = 1024;
  const height = 512;

  // Albedo (Color Map)
  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = width;
  albedoCanvas.height = height;
  const albedoCtx = albedoCanvas.getContext('2d')!;
  const albedoImg = albedoCtx.createImageData(width, height);
  const albedoData = albedoImg.data;

  // Bump Map (Elevation)
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d')!;
  const bumpImg = bumpCtx.createImageData(width, height);
  const bumpData = bumpImg.data;

  // Emissive Map (Bioluminescent night city clusters & energy networks)
  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const emissiveCtx = emissiveCanvas.getContext('2d')!;
  const emissiveImg = emissiveCtx.createImageData(width, height);
  const emissiveData = emissiveImg.data;

  // Roughness Map (Glossy water, matte land)
  const roughnessCanvas = document.createElement('canvas');
  roughnessCanvas.width = width;
  roughnessCanvas.height = height;
  const roughnessCtx = roughnessCanvas.getContext('2d')!;
  const roughnessImg = roughnessCtx.createImageData(width, height);
  const roughnessData = roughnessImg.data;

  for (let y = 0; y < height; y++) {
    const phi = (y / height - 0.5) * Math.PI;
    const cosPhi = Math.cos(phi);
    const ny = Math.sin(phi);
    const absLat = Math.abs(ny);

    for (let x = 0; x < width; x++) {
      const lam = (x / width - 0.5) * 2 * Math.PI;
      const nx = cosPhi * Math.cos(lam);
      const nz = cosPhi * Math.sin(lam);

      // Continent & topography elevation
      const continent = fbm3D(nx * 1.85, ny * 1.85, nz * 1.85, 4);
      const mountain = Math.pow(Math.abs(noise3D(nx * 4.8, ny * 4.8, nz * 4.8)), 2.0);

      let elevation = continent;
      if (elevation > 0.04) {
        elevation += mountain * 0.45;
      }

      // Polar ice cap formation
      const isPolar = absLat > 0.76 + noise3D(nx * 3.0, ny * 3.0, nz * 3.0) * 0.05;

      let r = 0;
      let g = 0;
      let b = 0;
      let bump = 0;
      let roughness = 0;
      let emitR = 0;
      let emitG = 0;
      let emitB = 0;

      if (isPolar) {
        // Deep starlight polar ice
        r = 110;
        g = 135;
        b = 175;
        bump = 160;
        roughness = 140;
      } else if (elevation < -0.09) {
        // Deep Midnight Ocean Abyss (#070E1C)
        r = 7;
        g = 13;
        b = 26;
        bump = 15;
        roughness = 30; // High specular reflection
      } else if (elevation < 0.02) {
        // Mid-depth Ocean Basin (#0B172E)
        r = 11;
        g = 22;
        b = 44;
        bump = 35;
        roughness = 35;
      } else if (elevation < 0.07) {
        // Deep Cyan Continental Shelf (#122B42)
        r = 16;
        g = 40;
        b = 62;
        bump = 65;
        roughness = 55;
      } else if (elevation < 0.16) {
        // Dark Coastal Plain / Lowlands (#141E30)
        r = 18;
        g = 28;
        b = 44;
        bump = 110;
        roughness = 210;
      } else if (elevation < 0.38) {
        // Obsidian Slate Continents (#18253A)
        r = 22;
        g = 34;
        b = 52;
        bump = 160;
        roughness = 225;
      } else if (elevation < 0.65) {
        // Mountain Ridges (#243550)
        r = 32;
        g = 48;
        b = 72;
        bump = 215;
        roughness = 240;
      } else {
        // High Alpine Peaks (#486088)
        r = 60;
        g = 82;
        b = 118;
        bump = 250;
        roughness = 180;
      }

      // Bioluminescent City Lights & Energy Networks on Land
      if (!isPolar && elevation > 0.07) {
        const cityNoise = Math.abs(noise3D(nx * 18.0, ny * 18.0, nz * 18.0));
        const microGrid = Math.abs(noise3D(nx * 42.0, ny * 42.0, nz * 42.0));

        if (cityNoise > 0.68 && microGrid > 0.62) {
          // Warm gold and cyan starlight energy networks
          const isGold = cityNoise > 0.78;
          emitR = isGold ? 245 : 0;
          emitG = isGold ? 176 : 220;
          emitB = isGold ? 39 : 130;
          // Add subtle boost to surface color
          r = Math.min(255, r + (emitR >> 2));
          g = Math.min(255, g + (emitG >> 2));
          b = Math.min(255, b + (emitB >> 2));
        }
      }

      const idx = (y * width + x) * 4;
      albedoData[idx] = r;
      albedoData[idx + 1] = g;
      albedoData[idx + 2] = b;
      albedoData[idx + 3] = 255;

      bumpData[idx] = bump;
      bumpData[idx + 1] = bump;
      bumpData[idx + 2] = bump;
      bumpData[idx + 3] = 255;

      emissiveData[idx] = emitR;
      emissiveData[idx + 1] = emitG;
      emissiveData[idx + 2] = emitB;
      emissiveData[idx + 3] = 255;

      roughnessData[idx] = roughness;
      roughnessData[idx + 1] = roughness;
      roughnessData[idx + 2] = roughness;
      roughnessData[idx + 3] = 255;
    }
  }

  albedoCtx.putImageData(albedoImg, 0, 0);
  bumpCtx.putImageData(bumpImg, 0, 0);
  emissiveCtx.putImageData(emissiveImg, 0, 0);
  roughnessCtx.putImageData(roughnessImg, 0, 0);

  const albedoTexture = new THREE.CanvasTexture(albedoCanvas);
  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  const emissiveTexture = new THREE.CanvasTexture(emissiveCanvas);
  const roughnessTexture = new THREE.CanvasTexture(roughnessCanvas);

  return { albedoTexture, bumpTexture, emissiveTexture, roughnessTexture };
}

/**
 * Generates dark, subtle atmospheric cosmic clouds
 */
function createDarkCloudTexture() {
  const { fbm3D } = createSeededNoise();
  const width = 1024;
  const height = 512;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(width, height);
  const data = img.data;

  for (let y = 0; y < height; y++) {
    const phi = (y / height - 0.5) * Math.PI;
    const cosPhi = Math.cos(phi);
    const ny = Math.sin(phi);
    const tradeWind = Math.cos(ny * Math.PI * 3.5) * 0.12;

    for (let x = 0; x < width; x++) {
      const lam = (x / width - 0.5) * 2 * Math.PI;
      const nx = cosPhi * Math.cos(lam);
      const nz = cosPhi * Math.sin(lam);

      const cloudNoise = fbm3D(nx * 3.2 + 8.5, ny * 3.2 + 8.5, nz * 3.2 + 8.5, 4) + tradeWind;

      let alpha = 0;
      if (cloudNoise > 0.14) {
        // Soft cloud transparency (up to ~48% opacity)
        alpha = Math.min(125, Math.floor((cloudNoise - 0.14) * 360));
      }

      const idx = (y * width + x) * 4;
      data[idx] = 160;
      data[idx + 1] = 185;
      data[idx + 2] = 230;
      data[idx + 3] = alpha;
    }
  }

  ctx.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

/**
 * Generates radiant starlight backlight corona disk placed directly behind the planet
 */
function createBacklightCoronaTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(76, 111, 209, 0.95)'); // Core starlight sapphire
  gradient.addColorStop(0.22, 'rgba(0, 220, 130, 0.55)'); // Mint electric auroral halo
  gradient.addColorStop(0.45, 'rgba(245, 176, 39, 0.40)'); // Solar Gold starlight corona
  gradient.addColorStop(0.70, 'rgba(30, 45, 84, 0.20)');
  gradient.addColorStop(1, 'rgba(10, 16, 32, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

/**
 * Miniature sleek satellite moon
 */
function createSatelliteTexture() {
  const { noise3D } = createSeededNoise();
  const width = 256;
  const height = 128;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(width, height);
  const data = img.data;

  for (let y = 0; y < height; y++) {
    const ny = (y / height - 0.5) * 2;
    for (let x = 0; x < width; x++) {
      const nx = (x / width - 0.5) * 2;
      const crater = Math.abs(noise3D(nx * 4, ny * 4, 1.2));
      const val = Math.floor(70 + crater * 60);
      const idx = (y * width + x) * 4;
      data[idx] = Math.min(255, val + 15);
      data[idx + 1] = val;
      data[idx + 2] = Math.floor(val * 0.9);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const resetHandlerRef = useRef<(() => void) | null>(null);

  const [hasWebGL] = useState(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!hasWebGL) return;
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. High Performance WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Camera & Scene with Generous Margin (Zero Clipping Guaranteed!)
    const scene = new THREE.Scene();
    // Compact FOV and distance ensuring the planet fits comfortably with plenty of space on all screen sizes
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // 3. Radiant Backlight Corona Plane (Directly Behind Planet)
    // Makes the dark planet look brilliantly backlit, alive and glowing like an eclipse!
    const coronaTexture = createBacklightCoronaTexture();
    const coronaGeometry = new THREE.PlaneGeometry(3.6, 3.6);
    const coronaMaterial = new THREE.MeshBasicMaterial({
      map: coronaTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coronaMesh = new THREE.Mesh(coronaGeometry, coronaMaterial);
    coronaMesh.position.set(0.15, 0.1, -0.65); // Placed directly behind planet center
    scene.add(coronaMesh);

    // 4. Planet Celestial Group (with 23.5° axial tilt)
    const planetGroup = new THREE.Group();
    const defaultAxialTilt = THREE.MathUtils.degToRad(23.5);
    planetGroup.rotation.z = -defaultAxialTilt * 0.55;
    planetGroup.rotation.x = defaultAxialTilt * 0.75;
    scene.add(planetGroup);

    // 5. Procedural Dark Planet Textures
    const { albedoTexture, bumpTexture, emissiveTexture, roughnessTexture } = createDarkPlanetTextures();
    const cloudTexture = createDarkCloudTexture();
    const satelliteTexture = createSatelliteTexture();

    // 6. Dark Planet Surface Mesh (Radius 1.22 gives generous padding from canvas boundaries)
    const planetGeometry = new THREE.SphereGeometry(1.22, 96, 96);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: albedoTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.038,
      emissiveMap: emissiveTexture,
      emissive: new THREE.Color(0xFFFFFF),
      emissiveIntensity: 0.85,
      roughnessMap: roughnessTexture,
      metalness: 0.1,
    });
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planetMesh);

    // 7. Subtle Cosmic Cloud Layer (Radius 1.24)
    const cloudGeometry = new THREE.SphereGeometry(1.24, 96, 96);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.65,
      roughness: 0.85,
      metalness: 0.0,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    planetGroup.add(cloudMesh);

    // 8. Atmospheric Fresnel Glow (Rayleigh scattering halo)
    // Produces a glowing rim silhouette around the dark planet
    const atmosphereGeometry = new THREE.SphereGeometry(1.36, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          // Sharp glowing halo around the edge silhouette
          float intensity = pow(0.70 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          intensity = clamp(intensity, 0.0, 1.0);
          gl_FragColor = vec4(glowColor, intensity * 1.5);
        }
      `,
      uniforms: {
        glowColor: { value: new THREE.Color(0x4C6FD1) },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    planetGroup.add(atmosphereMesh);

    // 9. Compact Orbiting Satellite (Stays strictly within viewport, never clips!)
    const satelliteGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    const satelliteMaterial = new THREE.MeshStandardMaterial({
      map: satelliteTexture,
      roughness: 0.85,
      metalness: 0.1,
    });
    const satelliteMesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    scene.add(satelliteMesh);

    // 10. Cosmic Stardust Dust Particles (55 points)
    const particlesCount = 55;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 7;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xF3F5FA,
      size: 0.022,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 11. Dramatic Backlit Eclipse Lighting Setup
    // Key Rim Light from behind & top-right (creates brilliant glowing crescent on top-right edge)
    const keyRimLight = new THREE.DirectionalLight(0x7EB3FF, 5.8);
    keyRimLight.position.set(2.8, 2.2, -3.2);
    scene.add(keyRimLight);

    // Warm Solar Gold Rim Light from behind & bottom-left
    const warmRimLight = new THREE.DirectionalLight(0xF5B027, 4.0);
    warmRimLight.position.set(-2.6, -1.8, -2.8);
    scene.add(warmRimLight);

    // Subtle dark ambient fill so the front dark hemisphere is moody deep navy, NOT pitch black
    const darkAmbient = new THREE.AmbientLight(0x0A1224, 0.95);
    scene.add(darkAmbient);

    // Very soft front fill light to bring out continental obsidian textures and glossy ocean speculars
    const frontFill = new THREE.DirectionalLight(0x2A3E70, 0.85);
    frontFill.position.set(0.5, 0.8, 4.2);
    scene.add(frontFill);

    // 12. Physics, Inertia & Mouse/Touch Drag Interaction State
    const interactionState = {
      isDragging: false,
      lastPointerX: 0,
      lastPointerY: 0,
      velX: 0,
      velY: 0,
      rotX: defaultAxialTilt * 0.75,
      rotY: 0.6,
      targetParallaxX: 0,
      targetParallaxY: 0,
      parallaxX: 0,
      parallaxY: 0,
      moonAngle: 0,
    };

    resetHandlerRef.current = () => {
      interactionState.velX = 0;
      interactionState.velY = 0;
      interactionState.rotX = defaultAxialTilt * 0.75;
      interactionState.rotY = 0.6;
    };

    const onPointerDown = (e: PointerEvent) => {
      interactionState.isDragging = true;
      interactionState.lastPointerX = e.clientX;
      interactionState.lastPointerY = e.clientY;
      interactionState.velX = 0;
      interactionState.velY = 0;
      setIsInteracting(true);
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (interactionState.isDragging) {
        const dx = e.clientX - interactionState.lastPointerX;
        const dy = e.clientY - interactionState.lastPointerY;
        interactionState.lastPointerX = e.clientX;
        interactionState.lastPointerY = e.clientY;

        const sensitivity = 0.0055;
        interactionState.rotY += dx * sensitivity;
        interactionState.rotX += dy * sensitivity;

        interactionState.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, interactionState.rotX));
        interactionState.velX = dx * sensitivity;
        interactionState.velY = dy * sensitivity;
      } else {
        const rect = container.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        interactionState.targetParallaxX = nx * 0.3;
        interactionState.targetParallaxY = ny * 0.2;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      interactionState.isDragging = false;
      setIsInteracting(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // Safe fallback
      }
    };

    const onPointerLeave = () => {
      interactionState.targetParallaxX = 0;
      interactionState.targetParallaxY = 0;
      if (interactionState.isDragging) {
        interactionState.isDragging = false;
        setIsInteracting(false);
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerLeave);

    // 13. Animation Loop (Smooth 60 FPS)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);

      // Parallax smooth interpolation
      interactionState.parallaxX += (interactionState.targetParallaxX - interactionState.parallaxX) * 0.06;
      interactionState.parallaxY += (interactionState.targetParallaxY - interactionState.parallaxY) * 0.06;

      if (!interactionState.isDragging) {
        // Friction decay
        interactionState.velX *= 0.94;
        interactionState.velY *= 0.94;

        // Auto planetary spin
        const autoSpin = prefersReducedMotion ? 0 : delta * 0.12;
        interactionState.rotY += interactionState.velX + autoSpin;
        interactionState.rotX += interactionState.velY;
        interactionState.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, interactionState.rotX));
      }

      // Apply rotations to Planet Group
      planetGroup.rotation.y = interactionState.rotY + interactionState.parallaxX;
      planetGroup.rotation.x = interactionState.rotX + interactionState.parallaxY;

      // Clouds dynamic drift
      if (!prefersReducedMotion) {
        cloudMesh.rotation.y += delta * 0.045;
      }

      // Orbiting Satellite Physics (Tight orbit, never clips!)
      if (!prefersReducedMotion) {
        interactionState.moonAngle += delta * 0.42;
      }
      const mAngle = interactionState.moonAngle;
      const orbitX = 2.05;
      const orbitZ = 1.85;
      satelliteMesh.position.x = Math.cos(mAngle) * orbitX;
      satelliteMesh.position.z = Math.sin(mAngle) * orbitZ;
      satelliteMesh.position.y = Math.sin(mAngle * 1.15) * 0.65;
      satelliteMesh.rotation.y += delta * 0.25;

      // Gentle stardust rotation
      particles.rotation.y += delta * 0.018;

      // Gentle breathing pulse on the radiant corona
      if (!prefersReducedMotion) {
        const timeElapsed = clock.getElapsedTime();
        coronaMesh.scale.setScalar(1.0 + Math.sin(timeElapsed * 1.2) * 0.04);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 14. Responsive Viewport Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 15. Disposal Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      planetGeometry.dispose();
      planetMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      satelliteGeometry.dispose();
      satelliteMaterial.dispose();
      coronaGeometry.dispose();
      coronaMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      albedoTexture.dispose();
      bumpTexture.dispose();
      emissiveTexture.dispose();
      roughnessTexture.dispose();
      cloudTexture.dispose();
      satelliteTexture.dispose();
      coronaTexture.dispose();

      renderer.dispose();
    };
  }, [hasWebGL]);

  const handleReset = useCallback(() => {
    if (resetHandlerRef.current) {
      resetHandlerRef.current();
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-48 h-48 rounded-2xl border border-champagne/30 bg-gradient-to-tr from-sapphire/20 via-midnight-1 to-champagne/20 flex items-center justify-center p-6 shadow-glass-md">
          <img
            src="/assets/brand/logo.png"
            alt="Logo Rendy Fernando"
            className="w-24 h-24 object-contain drop-shadow-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px] flex items-center justify-center select-none overflow-visible">
      {/* Radiant Cosmic Backlight Corona Glow behind the Planet */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-sapphire/35 blur-[95px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute w-60 h-60 rounded-full bg-champagne/25 blur-[80px] pointer-events-none translate-x-4 -translate-y-4" />
      <div className="absolute w-44 h-44 rounded-full bg-status-success/15 blur-[65px] pointer-events-none -translate-x-6 translate-y-6" />

      {/* 3D WebGL Canvas Container with tactile grab cursor and ZERO clipping */}
      <div
        ref={mountRef}
        className={`w-full h-full flex items-center justify-center touch-none transition-cursor ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        title="Exoplanet R-26 • Geser untuk rotasi 360°"
      />

      {/* Interactive Status HUD Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-4 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-2 border border-white/10 shadow-glass-sm backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="font-mono text-[11px] font-semibold text-pearl tracking-wide">Exoplanet R-26</span>
        </div>
        <span className="w-1 h-3 border-r border-white/10" />
        <span className="text-[10px] text-fog hidden sm:inline">
          {isInteracting ? 'Memutar 360°...' : 'Geser untuk Eksplorasi'}
        </span>
        <button
          onClick={handleReset}
          className="p-1 rounded-full hover:bg-white/10 text-mist hover:text-champagne transition-colors"
          title="Reset Sudut Pandang"
          aria-label="Reset Sudut Pandang"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
        <Orbit className="w-3.5 h-3.5 text-champagne/80 hidden sm:block animate-[spin_12s_linear_infinite]" />
      </div>
    </div>
  );
};
