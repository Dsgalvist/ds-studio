
"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import LiquidScene from "./liquid/LiquidScene";

export default function HeroLiquid() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setEnabled(
        !reducedMotion.matches &&
          window.innerWidth >= 1024
      );
    };

    update();

    reducedMotion.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      reducedMotion.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <Suspense fallback={null}>
          <LiquidScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
