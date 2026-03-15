// components/custom-cursor.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "click";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onDown = () => setState("click");
    const onUp = () =>
      setState(
        document.querySelector(":hover[data-cursor-hover]")
          ? "hover"
          : "default",
      );

    const onEnterLeave = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive =
        el.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor-hover]',
        ) !== null;
      setState(e.type === "mouseover" && isInteractive ? "hover" : "default");
    };

    const onLeaveWindow = () => setVisible(false);
    const onEnterWindow = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onEnterLeave);
    window.addEventListener("mouseout", onEnterLeave);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);

    // Smooth ring follow via RAF
    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const speed = state === "hover" ? 0.18 : 0.12;

      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, speed);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, speed);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      if (trailRef.current) {
        const trailLerp = 0.07;
        const tx =
          parseFloat(trailRef.current.dataset.x ?? "-100") +
          (pos.current.x - parseFloat(trailRef.current.dataset.x ?? "-100")) *
            trailLerp;
        const ty =
          parseFloat(trailRef.current.dataset.y ?? "-100") +
          (pos.current.y - parseFloat(trailRef.current.dataset.y ?? "-100")) *
            trailLerp;
        trailRef.current.dataset.x = String(tx);
        trailRef.current.dataset.y = String(ty);
        trailRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onEnterLeave);
      window.removeEventListener("mouseout", onEnterLeave);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [state]);

  if (typeof window === "undefined") return null;

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-9999",
        "transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      {/* ── Outer trailing glow ──────────────────── */}
      <div
        ref={trailRef}
        data-x="-100"
        data-y="-100"
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2",
          "rounded-full",
          "transition-[width,height,opacity] duration-500 ease-out",
          isHover ? "w-20 h-20 opacity-[0.07]" : "w-12 h-12 opacity-[0.05]",
          "bg-cyan-400 blur-xl",
        )}
      />

      {/* ── Lagging ring ─────────────────────────── */}
      <div
        ref={ringRef}
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2",
          "rounded-full border",
          "transition-[width,height,border-color,opacity,border-width] duration-200 ease-out",
          isClick
            ? "w-5 h-5 border-cyan-300 border-[1.5px] opacity-80"
            : isHover
              ? "w-10 h-10 border-cyan-400 border-[1.5px] opacity-70"
              : "w-8 h-8 border-cyan-500/60 border opacity-60",
        )}
        style={{
          boxShadow: isHover
            ? "0 0 12px 2px rgba(34,211,238,0.2)"
            : "0 0 6px 1px rgba(34,211,238,0.1)",
        }}
      />

      {/* ── Sharp dot ────────────────────────────── */}
      <div
        ref={dotRef}
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2",
          "rounded-full",
          "transition-[width,height,background-color] duration-150 ease-out",
          isClick
            ? "w-1.5 h-1.5 bg-white"
            : isHover
              ? "w-1.5 h-1.5 bg-cyan-300"
              : "w-1 h-1 bg-cyan-400",
        )}
        style={{
          boxShadow: "0 0 6px 2px rgba(34,211,238,0.6)",
        }}
      />
    </div>
  );
}
