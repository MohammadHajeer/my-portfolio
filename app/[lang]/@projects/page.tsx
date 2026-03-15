"use client";

import { cn } from "@/lib/utils";
import FadeIn from "@/components/fade-in";
import { PROJECTS } from "@/lib/constants";
import SectionHeader from "@/components/section-header";
import { useState, useEffect, useCallback } from "react";

// Extend your PROJECTS type to include optional images array
// Each project can have: images?: string[]

type Project = (typeof PROJECTS)[number] & { images?: string[] };

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  const close = useCallback(() => {
    setSelected(null);
    setActiveImg(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setActiveImg((i) =>
          Math.min(i + 1, (selected.images?.length ?? 1) - 1),
        );
      if (e.key === "ArrowLeft") setActiveImg((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, close]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const images = selected?.images ?? [];

  return (
    <>
      <SectionHeader lang={"en"} label={"projects"} heading={"Selected work"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(PROJECTS as Project[]).map((p, i) => (
          <FadeIn key={p.title} delay={i * 80}>
            <div
              onClick={() => {
                setSelected(p);
                setActiveImg(0);
              }}
              className={cn(
                "rounded-xl p-6 flex flex-col h-full cursor-pointer",
                "bg-white dark:bg-[#111]",
                "border border-gray-200 dark:border-[#1f1f1f]",
                "hover:border-cyan-400 dark:hover:border-cyan-500/30",
                "hover:-translate-y-1 transition-all duration-200",
                "shadow-sm dark:shadow-none",
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-dm-sans text-base font-semibold text-gray-900 dark:text-gray-50">
                  {p.title}
                </h3>
                <span
                  className={cn(
                    "shrink-0 text-[10px] px-2.5 py-1 rounded font-dm-mono",
                    "tracking-widest uppercase",
                    "bg-green-50   dark:bg-green-950",
                    " text-green-600 dark:text-green-400",
                    " border border-green-200 dark:border-green-900",
                  )}
                >
                  {p.status}
                </span>
              </div>
              <p
                className="font-dm-sans text-[13px] leading-relaxed mb-4 flex-1
                                  text-gray-500 dark:text-gray-400"
              >
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "text-[11px] px-2.5 py-1 rounded font-dm-mono tracking-wide",
                      "bg-cyan-50 dark:bg-cyan-950",
                      "text-cyan-600 dark:text-cyan-300",
                      "border border-cyan-200 dark:border-cyan-900/60",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* subtle "view" hint */}
              {p.images && p.images.length > 0 && (
                <p className="mt-3 text-[11px] font-dm-mono text-cyan-500 dark:text-cyan-400 opacity-60 tracking-widest uppercase">
                  {p.images.length} image{p.images.length !== 1 ? "s" : ""} →
                </p>
              )}
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ── Modal ─────────────────────────────────────────── */}
      {selected && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8",
            "bg-black/70 backdrop-blur-sm",
            "animate-in fade-in duration-200",
          )}
          onClick={close}
        >
          <div
            className={cn(
              "relative w-full max-w-3xl rounded-2xl overflow-hidden",
              "bg-white dark:bg-[#0e0e0e]",
              "border border-gray-200 dark:border-[#222]",
              "shadow-2xl",
              "animate-in zoom-in-95 duration-200",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100 dark:border-[#1a1a1a]">
              <div>
                <h2 className="font-dm-sans text-lg font-semibold text-gray-900 dark:text-gray-50">
                  {selected.title}
                </h2>
                <p className="font-dm-sans text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {selected.desc}
                </p>
              </div>
              <button
                onClick={close}
                className={cn(
                  "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                  "text-gray-400 hover:text-gray-900 dark:hover:text-gray-100",
                  "bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#252525]",
                  "transition-colors duration-150",
                )}
                aria-label="Close"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* Image area */}
            {images.length > 0 ? (
              <>
                {/* Main image */}
                <div className="relative bg-gray-50 dark:bg-[#0a0a0a] aspect-video overflow-hidden">
                  <img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={`${selected.title} screenshot ${activeImg + 1}`}
                    className="w-full h-full object-cover animate-in fade-in duration-300"
                  />

                  {/* Prev / Next arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg((i) => Math.max(i - 1, 0))}
                        disabled={activeImg === 0}
                        className={cn(
                          "absolute left-3 top-1/2 -translate-y-1/2",
                          "w-9 h-9 rounded-full flex items-center justify-center",
                          "bg-white/80 dark:bg-black/60 backdrop-blur-sm",
                          "border border-gray-200 dark:border-white/10",
                          "text-gray-700 dark:text-gray-200",
                          "disabled:opacity-25 hover:bg-white dark:hover:bg-black/80",
                          "transition-all duration-150 shadow-sm",
                        )}
                        aria-label="Previous image"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 1L3 7l6 6" />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setActiveImg((i) =>
                            Math.min(i + 1, images.length - 1),
                          )
                        }
                        disabled={activeImg === images.length - 1}
                        className={cn(
                          "absolute right-3 top-1/2 -translate-y-1/2",
                          "w-9 h-9 rounded-full flex items-center justify-center",
                          "bg-white/80 dark:bg-black/60 backdrop-blur-sm",
                          "border border-gray-200 dark:border-white/10",
                          "text-gray-700 dark:text-gray-200",
                          "disabled:opacity-25 hover:bg-white dark:hover:bg-black/80",
                          "transition-all duration-150 shadow-sm",
                        )}
                        aria-label="Next image"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 1l6 6-6 6" />
                        </svg>
                      </button>

                      {/* Counter pill */}
                      <span
                        className={cn(
                          "absolute bottom-3 right-3",
                          "text-[11px] font-dm-mono tracking-wider",
                          "px-2.5 py-1 rounded-full",
                          "bg-black/40 text-white/90 backdrop-blur-sm",
                        )}
                      >
                        {activeImg + 1} / {images.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                  <div className="flex gap-2 px-6 py-4 overflow-x-auto border-t border-gray-100 dark:border-[#1a1a1a]">
                    {images.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(idx)}
                        className={cn(
                          "shrink-0 w-16 h-12 rounded-lg overflow-hidden",
                          "border-2 transition-all duration-150",
                          idx === activeImg
                            ? "border-cyan-400 dark:border-cyan-500 opacity-100"
                            : "border-transparent opacity-50 hover:opacity-80",
                        )}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Empty state when no images provided */
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-300 dark:text-gray-700">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p className="font-dm-mono text-[12px] tracking-widest uppercase">
                  No images yet
                </p>
              </div>
            )}

            {/* Footer — tags */}
            <div className="flex flex-wrap gap-1.5 px-6 py-4 border-t border-gray-100 dark:border-[#1a1a1a]">
              {selected.tags.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "text-[11px] px-2.5 py-1 rounded font-dm-mono tracking-wide",
                    "bg-cyan-50 dark:bg-cyan-950",
                    "text-cyan-600 dark:text-cyan-300",
                    "border border-cyan-200 dark:border-cyan-900/60",
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}