
"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import LiquidScene from "./liquid/LiquidScene";

type ViewportSettings = {
  mobile: boolean;
  reducedMotion: boolean;
};

export default function HeroLiquid() {
  const [viewport, setViewport] =
    useState<ViewportSettings | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const mobileQuery = window.matchMedia(
      "(max-width: 1023px)"
    );

    const updateViewport = () => {
      setViewport({
        mobile: mobileQuery.matches,
        reducedMotion: motionQuery.matches,
      });
    };

    // Detectar configuración inicial
    updateViewport();

    // Detectar cambios de dispositivo o preferencias
    motionQuery.addEventListener(
      "change",
      updateViewport
    );

    mobileQuery.addEventListener(
      "change",
      updateViewport
    );

    return () => {
      motionQuery.removeEventListener(
        "change",
        updateViewport
      );

      mobileQuery.removeEventListener(
        "change",
        updateViewport
      );
    };
  }, []);

  // Evitar renderizar WebGL antes de detectar
  // el dispositivo o si se prefiere reducir movimiento.
  if (!viewport || viewport.reducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        z-[5]
        overflow-hidden
      "
    >
      <Canvas
        key={viewport.mobile ? "mobile" : "desktop"}
        dpr={
          viewport.mobile
            ? [1, 1]
            : [1, 1.5]
        }
        frameloop="always"
        gl={{
          alpha: true,
          antialias: !viewport.mobile,
          powerPreference: "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          pointerEvents: "none",
        }}
      >
        <Suspense fallback={null}>
          <LiquidScene mobile={viewport.mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
