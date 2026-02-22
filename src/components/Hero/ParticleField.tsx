"use client";

/**
 * ParticleField — Three.js / R3F particle background
 *
 * Architecture:
 *   • ~480 dot particles  → 1 draw call  (THREE.Points)
 *   • ~120 connection lines → 1 draw call  (THREE.LineSegments)
 *   Total: 2 draw calls — well within the <60 limit
 *
 * Neural-network aesthetic: particles are nodes, lines are edges.
 * Fits the GNN / graph-based research theme exactly.
 */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 480;
const MAX_CONNECTIONS = 120;
const CONNECTION_DIST = 1.6; // world units

/* ─────────────────────────────────────
   Geometry helpers — run once on mount
   ───────────────────────────────────── */
function buildParticleGeometry(): THREE.BufferGeometry {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Uniform distribution inside a sphere shell (radii 3 – 7)
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 3 + Math.random() * 4;

    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Color: electric blue (#60A5FA) → near-white spectrum
    const t = Math.random();
    colors[i * 3]     = 0.376 + t * 0.624; // R  0.376 → 1.0
    colors[i * 3 + 1] = 0.647 + t * 0.353; // G  0.647 → 1.0
    colors[i * 3 + 2] = 0.98;               // B  always high (blue cast)
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
  return geo;
}

function buildLineGeometry(particleGeo: THREE.BufferGeometry): THREE.BufferGeometry {
  const src = particleGeo.attributes.position.array as Float32Array;
  const lineVerts: number[] = [];

  outer: for (let i = 0; i < PARTICLE_COUNT; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      if (lineVerts.length >= MAX_CONNECTIONS * 6) break outer;

      const dx = src[i * 3]     - src[j * 3];
      const dy = src[i * 3 + 1] - src[j * 3 + 1];
      const dz = src[i * 3 + 2] - src[j * 3 + 2];
      const d2 = dx * dx + dy * dy + dz * dz;

      if (d2 < CONNECTION_DIST * CONNECTION_DIST) {
        lineVerts.push(
          src[i * 3], src[i * 3 + 1], src[i * 3 + 2],
          src[j * 3], src[j * 3 + 1], src[j * 3 + 2],
        );
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
  return geo;
}

/* ─────────────────────────────────────
   Scene — renders inside R3F Canvas
   ───────────────────────────────────── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const rawMouse  = useRef({ x: 0, y: 0 });
  const lerpMouse = useRef({ x: 0, y: 0 });

  // Build geometries once
  const particleGeo = useMemo(buildParticleGeometry, []);
  const lineGeo     = useMemo(() => buildLineGeometry(particleGeo), [particleGeo]);

  // Build materials once
  const particleMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size:           0.022,
        vertexColors:   true,
        transparent:    true,
        opacity:        0.52,
        sizeAttenuation: true,
        depthWrite:     false,
      }),
    [],
  );
  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color:       0x3b82f6,
        transparent: true,
        opacity:     0.07,
        depthWrite:  false,
      }),
    [],
  );

  // Pre-build Three.js objects
  const points = useMemo(
    () => new THREE.Points(particleGeo, particleMat),
    [particleGeo, particleMat],
  );
  const lines = useMemo(
    () => new THREE.LineSegments(lineGeo, lineMat),
    [lineGeo, lineMat],
  );

  // Mouse tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawMouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      rawMouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Dispose on unmount
  useEffect(() => {
    return () => {
      particleGeo.dispose();
      lineGeo.dispose();
      particleMat.dispose();
      lineMat.dispose();
    };
  }, [particleGeo, lineGeo, particleMat, lineMat]);

  // Animation loop — smooth mouse lerp + slow rotation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Exponential lerp — feels spring-like, stays smooth
    lerpMouse.current.x += (rawMouse.current.x - lerpMouse.current.x) * 0.032;
    lerpMouse.current.y += (rawMouse.current.y - lerpMouse.current.y) * 0.032;

    groupRef.current.rotation.x =
      lerpMouse.current.y * 0.14 + Math.sin(t * 0.07) * 0.04;
    groupRef.current.rotation.y =
      lerpMouse.current.x * 0.18 + t * 0.038;

    // Subtle position drift
    groupRef.current.position.x = lerpMouse.current.x * 0.18;
    groupRef.current.position.y = lerpMouse.current.y * 0.12;
  });

  return (
    <group ref={groupRef}>
      <primitive object={points} />
      <primitive object={lines} />
    </group>
  );
}

/* ─────────────────────────────────────
   Exported canvas wrapper
   ───────────────────────────────────── */
export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 100 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Scene />
    </Canvas>
  );
}
