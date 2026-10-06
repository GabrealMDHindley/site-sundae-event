"use client";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// The Courtyard's signature: bistro string lights, drawn in the Sundae palette on a white ground.
// Strands drop in from above the band as catenaries at different depths; glossy bulbs in blue,
// slate and Sundae red sway gently and parallax with the pointer. No dark stage, no glow (BRAND-SPEC 1.5).

const BLUE = "#1C51A0", SLATE = "#C9D2E0", RED = "#DB3D55", INK = "#4A4A4A";
const CYCLE = [BLUE, SLATE, RED, SLATE];
const CAM_Z = 6;
const PX_PER_UNIT = 100; // at z = 0 one world unit is 100 CSS pixels, whatever the band's size

// x1/x2: anchor x as a fraction of the visible width at that depth; lift: anchor height above the
// band's top edge (world units); low: lowest point as a fraction of the visible height below the top.
type StrandDef = { z: number; x1: number; x2: number; lift: number; low: number; gap: number; r: number; phase: number };

const STRANDS: StrandDef[] = [
  // two shallow back swags nested inside the front V's two bowls, so no strand crosses another
  { z: -2.6, x1: -0.62, x2: 0.12, lift: 0.05, low: 0.22, gap: 0.78, r: 0.048, phase: 0.2 },
  { z: -2.6, x1: 0.32, x2: 0.72, lift: 0.05, low: 0.18, gap: 0.78, r: 0.048, phase: 0.9 },
  // front two strands are consecutive swags sharing one anchor (x 0.22) just above the band's top edge,
  // festoon style, so they meet in a clean V under the nav instead of crossing
  { z: -0.6, x1: -0.72, x2: 0.22, lift: 0.04, low: 0.72, gap: 0.66, r: 0.058, phase: 1.3 },
  { z: 0.2, x1: 0.22, x2: 0.8, lift: 0.04, low: 0.6, gap: 0.66, r: 0.06, phase: 2.1 },
];

function Strand({ def, w, h, reduce }: { def: StrandDef; w: number; h: number; reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  // visible size at this strand's depth
  const k = (CAM_Z - def.z) / CAM_Z, W = w * k, H = h * k;
  const { tube, bulbs } = useMemo(() => {
    const xa = def.x1 * W, xb = def.x2 * W, ya = H / 2 + def.lift, yl = H / 2 - def.low * H, sag = ya - yl;
    const at = (t: number) => new THREE.Vector3(xa + (xb - xa) * t, ya - sag * (1 - Math.pow(t * 2 - 1, 2)), def.z);
    const pts = Array.from({ length: 81 }, (_, i) => at(i / 80));
    const tube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.009, 6, false);
    const n = Math.max(3, Math.round(Math.abs(xb - xa) / def.gap));
    const bulbs = Array.from({ length: n - 1 }, (_, i) => at((i + 1) / n));
    return { tube, bulbs };
  }, [def, W, H]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current && !reduce) { group.current.position.y = Math.sin(t * 0.4 + def.phase) * 0.018; group.current.rotation.z = Math.sin(t * 0.33 + def.phase) * 0.004; }
  });
  return (
    <group ref={group}>
      <mesh geometry={tube}>
        <meshBasicMaterial color={INK} transparent opacity={0.6} />
      </mesh>
      {bulbs.map((p, i) => {
        const color = CYCLE[(i + Math.round(def.phase * 3)) % CYCLE.length];
        return (
          <group key={i} position={p}>
            <mesh position={[0, -0.04, 0]}>
              <cylinderGeometry args={[def.r * 0.32, def.r * 0.32, 0.08, 10]} />
              <meshStandardMaterial color={INK} roughness={0.6} />
            </mesh>
            <mesh position={[0, -0.08 - def.r, 0]}>
              <sphereGeometry args={[def.r, 24, 24]} />
              <meshStandardMaterial color={color} roughness={0.28} metalness={0} emissive={color} emissiveIntensity={0.18} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Keep 1 world unit = 100 CSS px at z = 0 so bulbs stay the same size whatever the band's height.
function Fit() {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = (2 * Math.atan(size.height / PX_PER_UNIT / 2 / CAM_Z) * 180) / Math.PI;
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

function Rig({ reduce }: { reduce: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reduce) return;
    camera.position.x += (pointer.x * 0.3 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.08 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ reduce }: { reduce: boolean }) {
  const { size } = useThree();
  const w = size.width / PX_PER_UNIT, h = size.height / PX_PER_UNIT;
  const strands = size.width < 768 ? STRANDS.map((s) => ({ ...s, gap: s.gap * 0.8 })) : STRANDS;
  return (
    <>
      <Fit />
      <Rig reduce={reduce} />
      <ambientLight intensity={1.35} />
      <directionalLight position={[-2, 4, 6]} intensity={1.6} />
      {strands.map((d, i) => <Strand key={i} def={d} w={w} h={h} reduce={reduce} />)}
    </>
  );
}

export default function StringLights() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      camera={{ position: [0, 0, CAM_Z], fov: 20 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={reduce ? "demand" : "always"}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <Scene reduce={reduce} />
    </Canvas>
  );
}
