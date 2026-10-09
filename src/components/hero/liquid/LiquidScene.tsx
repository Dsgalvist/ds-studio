
"use client";

import { useMemo } from "react";
import {
  Environment,
  OrthographicCamera,
} from "@react-three/drei";

import LiquidSurface, {
  type LiquidPoint,
} from "./LiquidSurface";

type Flow = {
  id: string;
  points: LiquidPoint[];
  width: number;
  speed: number;
  amplitude: number;
  offset: number;
};

/*
 * D/S STUDIO — CHROME FLOW
 *
 * Composición envolvente:
 *
 * 01 — Cascada superior izquierda
 * 02 — Arco superior central
 * 03 — Flujo superior derecho
 * 04 — Viento lateral izquierdo
 * 05 — Remolino lateral derecho
 * 06 — Cascada inferior
 * 07 — Pliegue frontal derecho
 *
 * El material, la animación y la respuesta
 * al cursor siguen dentro de LiquidSurface.
 *
 * Coordenadas de diseño:
 * X: -8 a 8
 * Y: -4.5 a 4.5
 */

const flows: Flow[] = [
  {
    id: "upper-left",
    points: [
      [-6.9, 5.3, -0.5],
      [-6.1, 4.7, -0.5],
      [-5.3, 4.05, -0.5],
      [-4.5, 3.85, -0.5],
      [-3.8, 4.35, -0.5],
      [-3.25, 5.15, -0.5],
      [-2.7, 5.5, -0.5],
    ],
    width: 1.05,
    speed: 0.32,
    amplitude: 0.24,
    offset: 0.8,
  },

  {
    id: "upper-center",
    points: [
      [-2.7, 5.1, -0.6],
      [-2.0, 4.5, -0.6],
      [-1.3, 4.15, -0.6],
      [-0.5, 4.55, -0.6],
      [0.2, 5.1, -0.6],
      [1.0, 5.3, -0.6],
      [1.8, 4.65, -0.6],
      [2.6, 4.25, -0.6],
      [3.5, 4.8, -0.6],
    ],
    width: 0.95,
    speed: 0.28,
    amplitude: 0.2,
    offset: 2.1,
  },

  {
    id: "upper-right",
    points: [
      [4.0, 5.25, -0.7],
      [4.8, 4.6, -0.7],
      [5.7, 4.1, -0.7],
      [6.55, 3.5, -0.7],
      [6.95, 2.7, -0.7],
      [7.4, 2.1, -0.7],
      [8.4, 2.55, -0.7],
    ],
    width: 0.9,
    speed: 0.38,
    amplitude: 0.24,
    offset: 3.6,
  },

  {
    id: "left-wind",
    points: [
      [-9.0, 3.1, -0.8],
      [-7.6, 2.65, -0.8],
      [-6.5, 2.0, -0.8],
      [-5.8, 1.35, -0.8],
      [-5.0, 0.75, -0.8],
      [-4.25, 0.35, -0.8],
      [-3.55, 0.75, -0.8],
      [-3.0, 1.45, -0.8],
    ],
    width: 0.82,
    speed: 0.35,
    amplitude: 0.2,
    offset: 1.5,
  },

  {
    id: "right-vortex",
    points: [
      [8.9, 1.7, -0.9],
      [7.9, 1.15, -0.9],
      [7.05, 0.65, -0.9],
      [6.35, 0.3, -0.9],
      [5.75, -0.15, -0.9],
      [6.25, -0.7, -0.9],
      [7.15, -0.55, -0.9],
      [8.1, -0.15, -0.9],
      [8.85, -0.6, -0.9],
    ],
    width: 1.05,
    speed: 0.4,
    amplitude: 0.26,
    offset: 4.5,
  },

  {
    id: "lower-waterfall",
    points: [
      [-9.0, -4.8, 0.1],
      [-7.7, -4.25, 0.1],
      [-6.4, -3.55, 0.1],
      [-5.35, -3.25, 0.1],
      [-4.3, -3.75, 0.1],
      [-3.1, -4.2, 0.1],
      [-1.9, -4.0, 0.1],
      [-0.65, -3.55, 0.1],
      [0.45, -3.9, 0.1],
      [1.5, -3.1, 0.1],
      [2.45, -2.85, 0.1],
      [3.5, -3.55, 0.1],
      [4.65, -4.05, 0.1],
      [6.1, -4.2, 0.1],
      [8.9, -4.75, 0.1],
    ],
    width: 1.25,
    speed: 0.45,
    amplitude: 0.28,
    offset: 0.4,
  },

  {
    id: "front-right",
    points: [
      [4.25, -1.8, 0.3],
      [4.85, -1.55, 0.3],
      [5.5, -1.9, 0.3],
      [6.1, -2.4, 0.3],
      [6.85, -2.65, 0.3],
      [7.55, -2.25, 0.3],
      [8.35, -1.95, 0.3],
      [9.0, -2.25, 0.3],
    ],
    width: 0.72,
    speed: 0.5,
    amplitude: 0.23,
    offset: 5.2,
  },
];

export default function LiquidScene() {
  const surfaces = useMemo(
    () =>
      flows.map((flow) => (
        <LiquidSurface
          key={flow.id}
          points={flow.points}
          width={flow.width}
          speed={flow.speed}
          amplitude={flow.amplitude}
          offset={flow.offset}
        />
      )),
    []
  );

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 12]}
        left={-8}
        right={8}
        top={4.5}
        bottom={-4.5}
        near={0.1}
        far={100}
      />

      <ambientLight intensity={0.28} />

      <directionalLight
        position={[-5, 6, 7]}
        intensity={3.2}
        color="#E4EDFF"
      />

      <directionalLight
        position={[5, -3, 6]}
        intensity={2.4}
        color="#FFFFFF"
      />

      <pointLight
        position={[0, -3.5, 5]}
        intensity={9}
        distance={13}
        color="#C7D8FF"
      />

      <Environment preset="studio" />

      {surfaces}
    </>
  );
}
