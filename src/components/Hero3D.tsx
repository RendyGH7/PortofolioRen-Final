import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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
 * Generates dark, moody, photorealistic exoplanet textures with deep sapphire oceans,
 * rich emerald-forest and weathered stone continents, crisp 3D mountain topography,
 * and delicate bioluminescent night city constellations.
 */
function createRealisticPlanetTextures() {
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

  // Emissive Map (Bioluminescent night city lights & energy grid)
  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const emissiveCtx = emissiveCanvas.getContext('2d')!;
  const emissiveImg = emissiveCtx.createImageData(width, height);
  const emissiveData = emissiveImg.data;

  // Roughness Map (Glassy water with brilliant specular sun glints, matte continents)
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

      // Continent & topography elevation using 3D fractional Brownian motion
      const continent = fbm3D(nx * 1.65, ny * 1.65, nz * 1.65, 5);
      const mountain = Math.pow(Math.abs(noise3D(nx * 5.2, ny * 5.2, nz * 5.2)), 2.2);
      const coastalMicro = noise3D(nx * 12.0, ny * 12.0, nz * 12.0) * 0.04;

      let elevation = continent + coastalMicro;
      if (elevation > 0.04) {
        elevation += mountain * 0.52;
      }

      // Polar ice sheets with organic fractal edges
      const polarNoise = noise3D(nx * 3.8, ny * 3.8, nz * 3.8) * 0.07;
      const isPolar = absLat > 0.74 + polarNoise;
      const isSubPolar = !isPolar && absLat > 0.63 + polarNoise;

      let r = 0;
      let g = 0;
      let b = 0;
      let bump = 0;
      let roughness = 0;
      let emitR = 0;
      let emitG = 0;
      let emitB = 0;

      if (isPolar) {
        // Starlight Polar Ice Sheets (Frost blue-white)
        const iceDetail = Math.sin(nx * 30 + ny * 30) * 8;
        r = Math.min(255, 175 + iceDetail);
        g = Math.min(255, 195 + iceDetail);
        b = Math.min(255, 220 + iceDetail);
        bump = 180;
        roughness = 75;
      } else if (elevation < -0.22) {
        // Deep Oceanic Abyss (#0A183A)
        r = 10;
        g = 24;
        b = 58;
        bump = 8;
        roughness = 18; // Glassy water with crisp specular glint
      } else if (elevation < -0.06) {
        // Mid-depth Ocean Basin (#0E2656)
        r = 14;
        g = 38;
        b = 86;
        bump = 16;
        roughness = 20;
      } else if (elevation < 0.03) {
        // Coastal Shelf & Shallows (#145276)
        r = 20;
        g = 82;
        b = 118;
        bump = 30;
        roughness = 26;
      } else if (elevation < 0.07) {
        // Coastal Lagoons & Reefs (#1A7078)
        r = 26;
        g = 112;
        b = 120;
        bump = 45;
        roughness = 38;
      } else if (elevation < 0.11) {
        // Muted Coastal Sand & Shores (#7D6E50)
        r = 125;
        g = 110;
        b = 80;
        bump = 75;
        roughness = 220;
      } else if (elevation < 0.32) {
        // Rich Deep Living Forest & Lowland Biomes (#184028 to #205030)
        if (isSubPolar) {
          // Subpolar Taiga (#163228)
          r = 22;
          g = 50;
          b = 40;
        } else {
          const biomeVar = (elevation - 0.11) / 0.21;
          r = Math.floor(24 + biomeVar * 10);
          g = Math.floor(64 + biomeVar * 20);
          b = Math.floor(40 + biomeVar * 12);
        }
        bump = 135;
        roughness = 230;
      } else if (elevation < 0.52) {
        // Weathered Highlands, Terracotta Plateaus & Valleys (#524834 to #5F5038)
        r = 86;
        g = 76;
        b = 54;
        bump = 185;
        roughness = 240;
      } else if (elevation < 0.72) {
        // Rugged Mountain Ranges & Slate Granite Ridges (#3C4048)
        r = 60;
        g = 64;
        b = 72;
        bump = 230;
        roughness = 245;
      } else {
        // High Alpine Peaks & Glaciated Summits (#A0AFC3)
        r = 160;
        g = 175;
        b = 195;
        bump = 255;
        roughness = 140;
      }

      // Bioluminescent Civilization & City Lights (Glowing Constellations on Night Side)
      if (!isPolar && elevation > 0.07) {
        const cityNoise = Math.abs(noise3D(nx * 20.0, ny * 20.0, nz * 20.0));
        const gridNoise = Math.abs(noise3D(nx * 48.0, ny * 48.0, nz * 48.0));

        if (cityNoise > 0.65 && gridNoise > 0.58) {
          // Metropolitan Mega-Hubs (Solar Gold) & Coastal Cyber-Ports (Cyan)
          const isGold = cityNoise > 0.76;
          emitR = isGold ? 245 : 70;
          emitG = isGold ? 176 : 190;
          emitB = isGold ? 39 : 240;

          // Subtle blend into daylight surface
          r = Math.min(255, r + (emitR >> 3));
          g = Math.min(255, g + (emitG >> 3));
          b = Math.min(255, b + (emitB >> 3));
        } else if (cityNoise > 0.58 && gridNoise > 0.68) {
          // Inter-city transport filaments
          emitR = 190;
          emitG = 140;
          emitB = 40;
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
 * Generates realistic swirling atmospheric clouds with Coriolis trade winds
 */
function createRealisticCloudTexture() {
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
    // Coriolis swirling trade wind bands
    const tradeWind = Math.cos(ny * Math.PI * 3.2) * 0.16;

    for (let x = 0; x < width; x++) {
      const lam = (x / width - 0.5) * 2 * Math.PI;
      const nx = cosPhi * Math.cos(lam);
      const nz = cosPhi * Math.sin(lam);

      // Multi-octave cloud noise
      const cloudNoise = fbm3D(nx * 3.4 + 12.0, ny * 3.4 + 12.0, nz * 3.4 + 12.0, 5) + tradeWind;

      let alpha = 0;
      if (cloudNoise > 0.08) {
        // Delicate, organic cloud wisps (feathered smoothly up to ~55% max opacity)
        alpha = Math.min(140, Math.floor((cloudNoise - 0.08) * 320));
      }

      const idx = (y * width + x) * 4;
      data[idx] = 215;
      data[idx + 1] = 228;
      data[idx + 2] = 245;
      data[idx + 3] = alpha;
    }
  }

  ctx.putImageData(img, 0, 0);
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

    // 1. High Performance WebGL Renderer with Balanced Cinematic Exposure
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
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 2. Camera & Scene with Generous Margin (Zero Clipping Guaranteed!)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    // 3. Planet Celestial Group (with natural 23.5° axial tilt)
    const planetGroup = new THREE.Group();
    const defaultAxialTilt = THREE.MathUtils.degToRad(23.5);
    planetGroup.rotation.z = -defaultAxialTilt * 0.45;
    planetGroup.rotation.x = defaultAxialTilt * 0.65;
    scene.add(planetGroup);

    // 4. Procedural Photorealistic Planet Textures
    const { albedoTexture, bumpTexture, emissiveTexture, roughnessTexture } = createRealisticPlanetTextures();
    const cloudTexture = createRealisticCloudTexture();
    const satelliteTexture = createSatelliteTexture();

    // 5. Dark Photorealistic Planet Surface Mesh
    const planetGeometry = new THREE.SphereGeometry(1.22, 96, 96);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: albedoTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.055,
      emissiveMap: emissiveTexture,
      emissive: new THREE.Color(0xFFFFFF),
      emissiveIntensity: 1.1,
      roughnessMap: roughnessTexture,
      metalness: 0.06,
    });
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planetMesh);

    // 6. Translucent Atmospheric Cloud Layer (Hovering gently above surface)
    const cloudGeometry = new THREE.SphereGeometry(1.232, 96, 96);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.42,
      roughness: 0.85,
      metalness: 0.0,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    planetGroup.add(cloudMesh);

    // 7. Atmospheric Rayleigh Scattering Glow (Delicate thin blue limb - no cartoon outline!)
    const atmosphereGeometry = new THREE.SphereGeometry(1.228, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 glowColor;
        uniform vec3 sunDir;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
          float intensity = pow(rim, 4.2) * 1.0;
          float sunFactor = max(dot(vNormal, normalize(sunDir)), 0.0);
          float atmosphericScatter = intensity * (0.25 + 0.75 * pow(sunFactor, 1.1));
          gl_FragColor = vec4(glowColor, clamp(atmosphericScatter, 0.0, 0.72));
        }
      `,
      uniforms: {
        glowColor: { value: new THREE.Color(0x3B82F6) },
        sunDir: { value: new THREE.Vector3(3.0, 1.6, 2.0) },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    planetGroup.add(atmosphereMesh);

    // 8. Compact Orbiting Satellite (Stays strictly within viewport, never clips!)
    const satelliteGeometry = new THREE.SphereGeometry(0.09, 32, 32);
    const satelliteMaterial = new THREE.MeshStandardMaterial({
      map: satelliteTexture,
      roughness: 0.85,
      metalness: 0.08,
    });
    const satelliteMesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    scene.add(satelliteMesh);

    // 9. Cosmic Stardust Dust Particles (55 points)
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
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 10. Multi-Point Cinematic Astrophysical Lighting Setup (Dark, Moody, High-Contrast)
    // Primary Star / Sun Light (Crisp, natural starlight with rich chiaroscuro)
    const primarySun = new THREE.DirectionalLight(0xFFF2DE, 1.85);
    primarySun.position.set(3.0, 1.6, 2.0);
    scene.add(primarySun);

    // Warm Solar Gold Terminator Light (Golden sunrise/sunset glow along day-night boundary)
    const terminatorLight = new THREE.DirectionalLight(0xF5B027, 0.65);
    terminatorLight.position.set(-2.4, -0.8, 1.4);
    scene.add(terminatorLight);

    // Space Ambient Fill (Moody deep space navy - keeps night hemisphere visible without blowout)
    const spaceAmbient = new THREE.AmbientLight(0x0C152B, 0.32);
    scene.add(spaceAmbient);

    // Hemisphere Light for natural atmospheric contrast
    const hemiLight = new THREE.HemisphereLight(0x243E70, 0x070D18, 0.40);
    scene.add(hemiLight);

    // Soft Edge Rim Light from behind top-left for crisp celestial separation
    const backRimLight = new THREE.DirectionalLight(0x60A5FA, 1.1);
    backRimLight.position.set(-2.8, 2.2, -2.4);
    scene.add(backRimLight);

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
      const orbitX = 1.70;
      const orbitZ = 1.45;
      satelliteMesh.position.x = Math.cos(mAngle) * orbitX;
      satelliteMesh.position.z = Math.sin(mAngle) * orbitZ;
      satelliteMesh.position.y = Math.sin(mAngle * 1.15) * 0.45;
      satelliteMesh.rotation.y += delta * 0.25;

      // Gentle stardust rotation
      particles.rotation.y += delta * 0.018;

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
      particleGeometry.dispose();
      particleMaterial.dispose();

      albedoTexture.dispose();
      bumpTexture.dispose();
      emissiveTexture.dispose();
      roughnessTexture.dispose();
      cloudTexture.dispose();
      satelliteTexture.dispose();

      renderer.dispose();
    };
  }, [hasWebGL]);

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
      {/* 
        ULTRA-SMOOTH CELESTIAL BACKLIGHT CORONA & RAYS (Zero Clipping, 100% Silky Smooth Glow)
        Positioned directly behind the 3D Planet, spreading seamlessly into the cosmos
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible" aria-hidden="true">
        {/* Layer 1: Core Radiant Stellar Beacon (Pure white-blue starlight brilliance directly behind planet silhouette) */}
        <div
          className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full blur-[30px] opacity-85"
          style={{
            background: 'radial-gradient(circle, #FFFFFF 0%, #BAE6FD 35%, #3B82F6 65%, transparent 80%)',
          }}
        />

        {/* Layer 2: Silky Volumetric Solar Corona Ray Flare (Smooth continuous expansion with zero hard edges) */}
        <div
          className="absolute w-[440px] h-[440px] sm:w-[540px] sm:h-[540px] rounded-full blur-[65px] opacity-65 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.75) 0%, rgba(59, 130, 246, 0.45) 40%, rgba(245, 176, 39, 0.22) 65%, transparent 85%)',
            animationDuration: '7s',
          }}
        />

        {/* Layer 3: Deep Atmospheric Space Haze (Smooth infinite falloff into the midnight space background) */}
        <div
          className="absolute w-[600px] h-[600px] sm:w-[740px] sm:h-[740px] rounded-full blur-[100px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(76, 111, 209, 0.45) 0%, rgba(30, 48, 92, 0.25) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* 3D WebGL Canvas Container with tactile grab cursor and ZERO clipping */}
      <div
        ref={mountRef}
        className={`w-full h-full flex items-center justify-center touch-none transition-cursor relative z-10 ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        title="Geser untuk rotasi 360°"
      />
    </div>
  );
};
