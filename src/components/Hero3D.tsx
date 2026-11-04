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
 * Generates seamless procedural canvas textures for the planet surface, elevation, and roughness
 */
function createPlanetSurfaceTextures() {
  const { noise3D, fbm3D } = createSeededNoise();
  const width = 1024;
  const height = 512;

  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = width;
  albedoCanvas.height = height;
  const albedoCtx = albedoCanvas.getContext('2d')!;
  const albedoImg = albedoCtx.createImageData(width, height);
  const albedoData = albedoImg.data;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d')!;
  const bumpImg = bumpCtx.createImageData(width, height);
  const bumpData = bumpImg.data;

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

      // Continent & terrain elevation
      const continent = fbm3D(nx * 1.85, ny * 1.85, nz * 1.85, 4);
      const mountain = Math.pow(Math.abs(noise3D(nx * 4.8, ny * 4.8, nz * 4.8)), 2.0);

      let elevation = continent;
      if (elevation > 0.04) {
        elevation += mountain * 0.42;
      }

      // Polar ice cap formation
      const isPolar = absLat > 0.74 + noise3D(nx * 3.0, ny * 3.0, nz * 3.0) * 0.05;

      let r = 0;
      let g = 0;
      let b = 0;
      let bump = 0;
      let roughness = 0;

      if (isPolar) {
        // Polar Ice Sheets
        r = 232;
        g = 244;
        b = 255;
        bump = 185;
        roughness = 170;
      } else if (elevation < -0.09) {
        // Deep Oceanic Abyss (Midnight Sapphire)
        r = 10;
        g = 18;
        b = 38;
        bump = 15;
        roughness = 40;
      } else if (elevation < 0.02) {
        // Mid-depth Ocean Basin
        r = 16;
        g = 36;
        b = 75;
        bump = 35;
        roughness = 40;
      } else if (elevation < 0.07) {
        // Coastal Turquoise Continental Shelf
        r = 32;
        g = 96;
        b = 118;
        bump = 70;
        roughness = 65;
      } else if (elevation < 0.12) {
        // Solar Gold Coastal Sands
        r = 245;
        g = 176;
        b = 39;
        bump = 115;
        roughness = 220;
      } else if (elevation < 0.28) {
        // Deep Emerald Lowland Rainforest
        r = 26;
        g = 68;
        b = 58;
        bump = 155;
        roughness = 230;
      } else if (elevation < 0.45) {
        // Highland Savannah & Plateau
        r = 62;
        g = 92;
        b = 72;
        bump = 190;
        roughness = 240;
      } else if (elevation < 0.65) {
        // Mountain Rock & Ridge Formations
        r = 138;
        g = 118;
        b = 92;
        bump = 225;
        roughness = 245;
      } else {
        // Alpine Snow Peaks
        r = 225;
        g = 235;
        b = 248;
        bump = 255;
        roughness = 190;
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

      roughnessData[idx] = roughness;
      roughnessData[idx + 1] = roughness;
      roughnessData[idx + 2] = roughness;
      roughnessData[idx + 3] = 255;
    }
  }

  albedoCtx.putImageData(albedoImg, 0, 0);
  bumpCtx.putImageData(bumpImg, 0, 0);
  roughnessCtx.putImageData(roughnessImg, 0, 0);

  const albedoTexture = new THREE.CanvasTexture(albedoCanvas);
  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  const roughnessTexture = new THREE.CanvasTexture(roughnessCanvas);

  return { albedoTexture, bumpTexture, roughnessTexture };
}

/**
 * Generates dynamic atmospheric cloud swirls with alpha transparency
 */
function createCloudTexture() {
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

      const cloudNoise = fbm3D(nx * 3.1 + 10.5, ny * 3.1 + 10.5, nz * 3.1 + 10.5, 4) + tradeWind;

      let alpha = 0;
      if (cloudNoise > 0.12) {
        alpha = Math.min(255, Math.floor((cloudNoise - 0.12) * 580));
      }

      const idx = (y * width + x) * 4;
      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
      data[idx + 3] = alpha;
    }
  }

  ctx.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

/**
 * Generates concentric luxury planetary ring texture with Cassini division
 */
function createRingTexture() {
  const width = 512;
  const height = 16;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(width, height);
  const data = img.data;

  for (let x = 0; x < width; x++) {
    const u = x / width;
    let r = 245;
    let g = 176;
    let b = 39;
    let a = 0;

    if (u < 0.15) {
      // Inner Crepe Ring (translucent solar gold)
      a = Math.floor((u / 0.15) * 115);
      r = 245;
      g = 176;
      b = 39;
    } else if (u < 0.55) {
      // Main B-Ring (dense bright gold starlight bands)
      const band = Math.sin(u * 140) * 0.18 + 0.82;
      a = Math.floor(band * 235);
      r = 250;
      g = 195;
      b = 65;
    } else if (u < 0.62) {
      // Cassini Division (transparent space gap)
      a = 0;
    } else if (u < 0.88) {
      // Outer A-Ring (ice sapphire with fine striae)
      const band = Math.sin(u * 95) * 0.22 + 0.78;
      a = Math.floor(band * 180);
      r = 160;
      g = 195;
      b = 245;
    } else if (u < 0.94) {
      // Encke Gap
      a = 25;
      r = 170;
      g = 200;
      b = 245;
    } else {
      // Outer stardust boundary
      const fade = 1 - (u - 0.94) / 0.06;
      a = Math.floor(Math.max(0, fade) * 125);
      r = 180;
      g = 210;
      b = 250;
    }

    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a;
    }
  }

  ctx.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

/**
 * Generates miniature moon rocky texture
 */
function createMoonTexture() {
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
      const val = Math.floor(130 + crater * 90);
      const idx = (y * width + x) * 4;
      data[idx] = Math.min(255, val + 15);
      data[idx + 1] = val;
      data[idx + 2] = Math.floor(val * 0.85);
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

    // 1. Renderer Setup
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
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    // 3. Planet Celestial Group (with realistic 23.5° axial tilt)
    const planetGroup = new THREE.Group();
    const defaultAxialTilt = THREE.MathUtils.degToRad(23.5);
    planetGroup.rotation.z = -defaultAxialTilt * 0.6; // Visual tilt towards viewer
    planetGroup.rotation.x = defaultAxialTilt * 0.8;
    scene.add(planetGroup);

    // 4. Procedural Textures
    const { albedoTexture, bumpTexture, roughnessTexture } = createPlanetSurfaceTextures();
    const cloudTexture = createCloudTexture();
    const ringTexture = createRingTexture();
    const moonTexture = createMoonTexture();

    // 5. Planet Surface Mesh
    const planetGeometry = new THREE.SphereGeometry(1.35, 96, 96);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: albedoTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.045,
      roughnessMap: roughnessTexture,
      metalness: 0.08,
    });
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planetMesh);

    // 6. Atmospheric Cloud Layer (rotates independently)
    const cloudGeometry = new THREE.SphereGeometry(1.38, 96, 96);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.85,
      roughness: 0.9,
      metalness: 0.0,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    planetGroup.add(cloudMesh);

    // 7. Atmospheric Fresnel Glow (Rayleigh scattering halo)
    const atmosphereGeometry = new THREE.SphereGeometry(1.52, 64, 64);
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
          float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          intensity = clamp(intensity, 0.0, 1.0);
          gl_FragColor = vec4(glowColor, intensity * 0.92);
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

    // 8. Luxury Planetary Ring System
    const ringGeometry = new THREE.RingGeometry(1.9, 3.25, 128);
    const pos = ringGeometry.attributes.position;
    const uvs = ringGeometry.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      const r = Math.sqrt(px * px + py * py);
      const u = (r - 1.9) / (3.25 - 1.9);
      uvs.setXY(i, u, 0.5);
    }
    ringGeometry.attributes.uv.needsUpdate = true;
    ringGeometry.rotateX(Math.PI / 2); // Aligns ring with planet's equatorial plane

    const ringMaterial = new THREE.MeshStandardMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      roughness: 0.45,
      metalness: 0.15,
      depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    planetGroup.add(ringMesh);

    // 9. Orbiting Moon (Satellite)
    const moonGeometry = new THREE.SphereGeometry(0.22, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.85,
      metalness: 0.1,
    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moonMesh);

    // 10. Cosmic Stardust Particles (70 points)
    const particlesCount = 70;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xF3F5FA,
      size: 0.026,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 11. Starlight Lighting Setup
    const sunLight = new THREE.DirectionalLight(0xFFF4E0, 4.2);
    sunLight.position.set(5.5, 3.2, 4.5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x0C1528, 1.35);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x3B62C2, 1.85);
    rimLight.position.set(-5, -2, -3.5);
    scene.add(rimLight);

    // 12. Physics, Inertia & Mouse/Touch Interaction State
    const interactionState = {
      isDragging: false,
      lastPointerX: 0,
      lastPointerY: 0,
      velX: 0,
      velY: 0,
      rotX: defaultAxialTilt * 0.8,
      rotY: 0.5,
      targetParallaxX: 0,
      targetParallaxY: 0,
      parallaxX: 0,
      parallaxY: 0,
      moonAngle: 0,
    };

    // Reset handler for the HUD action
    resetHandlerRef.current = () => {
      interactionState.velX = 0;
      interactionState.velY = 0;
      interactionState.rotX = defaultAxialTilt * 0.8;
      interactionState.rotY = 0.5;
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

        // Pitch clamp to prevent polar inversion
        interactionState.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, interactionState.rotX));

        interactionState.velX = dx * sensitivity;
        interactionState.velY = dy * sensitivity;
      } else {
        const rect = container.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        interactionState.targetParallaxX = nx * 0.35;
        interactionState.targetParallaxY = ny * 0.25;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      interactionState.isDragging = false;
      setIsInteracting(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignore if pointer capture release is not supported
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

    // 13. Animation Loop (60 FPS Smooth Rendering)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);

      // Parallax smooth interpolation
      interactionState.parallaxX += (interactionState.targetParallaxX - interactionState.parallaxX) * 0.06;
      interactionState.parallaxY += (interactionState.targetParallaxY - interactionState.parallaxY) * 0.06;

      if (!interactionState.isDragging) {
        // Natural friction decay
        interactionState.velX *= 0.94;
        interactionState.velY *= 0.94;

        // Auto planetary spin
        const autoSpin = prefersReducedMotion ? 0 : delta * 0.14;
        interactionState.rotY += interactionState.velX + autoSpin;
        interactionState.rotX += interactionState.velY;
        interactionState.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, interactionState.rotX));
      }

      // Apply rotations to Planet Group
      planetGroup.rotation.y = interactionState.rotY + interactionState.parallaxX;
      planetGroup.rotation.x = interactionState.rotX + interactionState.parallaxY;

      // Atmospheric Clouds dynamic drift (rotates faster than ground)
      if (!prefersReducedMotion) {
        cloudMesh.rotation.y += delta * 0.055;
      }

      // Orbiting Moon physics
      if (!prefersReducedMotion) {
        interactionState.moonAngle += delta * 0.38;
      }
      const mAngle = interactionState.moonAngle;
      const orbitRadiusX = 3.8;
      const orbitRadiusZ = 3.4;
      moonMesh.position.x = Math.cos(mAngle) * orbitRadiusX;
      moonMesh.position.z = Math.sin(mAngle) * orbitRadiusZ;
      moonMesh.position.y = Math.sin(mAngle * 1.1) * 0.95;
      moonMesh.rotation.y += delta * 0.25;

      // Stardust gentle rotation
      particles.rotation.y += delta * 0.02;

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
      ringGeometry.dispose();
      ringMaterial.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      albedoTexture.dispose();
      bumpTexture.dispose();
      roughnessTexture.dispose();
      cloudTexture.dispose();
      ringTexture.dispose();
      moonTexture.dispose();

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
    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px] flex items-center justify-center select-none">
      {/* Cinematic Deep Space Aura Behind Planet */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-sapphire/25 blur-[100px] pointer-events-none" />
      <div className="absolute w-56 h-56 rounded-full bg-champagne/20 blur-[80px] pointer-events-none translate-x-14 translate-y-10" />

      {/* 3D WebGL Canvas Container with tactile grab cursor */}
      <div
        ref={mountRef}
        className={`w-full h-full flex items-center justify-center touch-none transition-cursor ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        title="Planet 3D Realistis • Geser untuk rotasi 360°"
      />

      {/* Interactive Status HUD Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-4 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-2 border border-white/10 shadow-glass-sm backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
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
