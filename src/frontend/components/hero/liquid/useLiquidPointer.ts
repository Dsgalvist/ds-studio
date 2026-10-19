"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useLiquidPointer() {
  const pointer = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      pointer.current.set(x, y);
    };

    window.addEventListener("pointermove", onMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return pointer;
}
