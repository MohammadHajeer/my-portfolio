"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

interface ProjectPreviewModalProps {
  title: string;
  desc: string;
  tags: string[];
  images: string[];
  onClose?: () => void;
}

function ProjectPreviewModal({
  title,
  desc,
  tags,
  images,
  onClose,
}: ProjectPreviewModalProps) {
  const [activeImg, setActiveImg] = useState(0);

  const close = useCallback(() => {
    setActiveImg(0);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setActiveImg((i) => Math.min(i + 1, (images?.length ?? 1) - 1));
      if (e.key === "ArrowLeft") setActiveImg((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images, close]);
  return (
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
              {title}
            </h2>
            <p className="font-dm-sans text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">
              {desc}
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
              <Image
                width={100}
                height={100}
                key={activeImg}
                src={images[activeImg]}
                alt={`${title} screenshot ${activeImg + 1}`}
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
                      setActiveImg((i) => Math.min(i + 1, images.length - 1))
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
                    <Image
                      width={100}
                      height={100}
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
            {/* <p className="font-dm-mono text-[12px] tracking-widest uppercase">
              No images yet
            </p> */}
          </div>
        )}

        {/* Footer — tags */}
        <div className="flex flex-wrap gap-1.5 px-6 py-4 border-t border-gray-100 dark:border-[#1a1a1a]">
          {tags.map((t) => (
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
  );
}

export { ProjectPreviewModal };
