
"use client";

import { useEffect, useRef } from "react";

export default function HeroCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    let x = -100;
    let y = -100;
    let targetX = -100;
    let targetY = -100;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.style.opacity = "1";
    };

    const hide = () => {
      cursor.style.opacity = "0";
    };

    const animate = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, {
      passive: true,
    });

    document.addEventListener("pointerleave", hide);

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-14 w-14 rounded-full border border-[#C5D9FF]/70 opacity-0 shadow-[0_0_20px_rgba(150,190,255,0.3),inset_0_0_15px_rgba(150,190,255,0.1)] transition-opacity duration-200 md:block"
    >
      <div className="absolute inset-[19px] rounded-full bg-white shadow-[0_0_12px_rgba(200,220,255,0.8)]" />
    </div>
  );
}
