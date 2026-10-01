"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// The Courtyard's signature: bistro string lights. Strands hang as catenaries at different
// depths; bulbs glow with additive halos, sway gently and parallax with the pointer.

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,236,190,1)");
  grd.addColorStop(0.18, "rgba(255,206,130,.85)");
  grd.addColorStop(0.45, "rgba(255,170,90,.22)");
  grd.addColorStop(1, "rgba(255,150,80,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

type StrandDef = { y: number; z: number; sag: number; span: number; n: number; phase: number };

function Strand({ def, tex, reduce }: { def: StrandDef; tex: THREE.Texture; reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const halos = useRef<THREE.Sprite[]>([]);
  const pts = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60, x = (t - 0.5) * def.span;
      const y = def.y - def.sag * (1 - Math.pow((t - 0.5) * 2, 2));
      arr.push(new THREE.Vector3(x, y, def.z));
    }
    return arr;
  }, [def]);
  const bulbs = useMemo(() => {
    const b: THREE.Vector3[] = [];
    for (let i = 1; i < def.n; i++) {
      const t = i / def.n, x = (t - 0.5) * def.span;
      const y = def.y - def.sag * (1 - Math.pow((t - 0.5) * 2, 2)) - 0.09;
      b.push(new THREE.Vector3(x, y, def.z));
    }
    return b;
  }, [def]);
  const line = useMemo(() => new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: "#2a2023", transparent: true, opacity: 0.75 })), [pts]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current && !reduce) group.current.rotation.z = Math.sin(t * 0.35 + def.phase) * 0.012;
    halos.current.forEach((s, i) => {
      if (!s) return;
      const f = reduce ? 1 : 0.9 + Math.sin(t * 2.2 + i * 1.7 + def.phase) * 0.06 + Math.sin(t * 7.3 + i) * 0.03;
      const base = 0.42 + (def.z + 3) * 0.06;
      s.scale.setScalar(base * f);
    });
  });
  return (
    <group ref={group}>
      <primitive object={line} />
      {bulbs.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#ffe6b0" toneMapped={false} />
          </mesh>
          <sprite ref={(s) => { if (s) halos.current[i] = s; }} scale={0.6}>
            <spriteMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
          </sprite>
        </group>
      ))}
    </group>
  );
}

function Rig({ reduce }: { reduce: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reduce) return;
    camera.position.x += (pointer.x * 0.35 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.18 + 0.1 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.6, -2);
  });
  return null;
}

function Scene({ reduce, small }: { reduce: boolean; small: boolean }) {
  const tex = useMemo(glowTexture, []);
  const strands: StrandDef[] = useMemo(() => {
    const base: StrandDef[] = [
      { y: 3.05, z: -3.2, sag: 0.5, span: 12, n: 22, phase: 0.2 },
      { y: 2.75, z: -1.6, sag: 0.6, span: 10, n: 16, phase: 1.3 },
      { y: 2.45, z: 0.2, sag: 0.45, span: 8.5, n: 13, phase: 2.1 },
      { y: 3.5, z: -5.5, sag: 0.35, span: 15, n: 26, phase: 3.0 },
    ];
    return small ? base.slice(0, 3).map((s) => ({ ...s, n: Math.ceil(s.n * 0.6), span: s.span * 0.75 })) : base;
  }, [small]);
  return (
    <>
      <Rig reduce={reduce} />
      {strands.map((d, i) => <Strand key={i} def={d} tex={tex} reduce={reduce} />)}
    </>
  );
}

export default function StringLights() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      dpr={[1, small ? 1.25 : 1.6]}
      camera={{ position: [0, 0.1, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={reduce ? "demand" : "always"}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <Scene reduce={reduce} small={small} />
    </Canvas>
  );
}
