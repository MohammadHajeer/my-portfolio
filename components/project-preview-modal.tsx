"use client";

import Image from "next/image";
import type { Project, ProjectGalleryLabels } from "@/lib/project-types";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

interface ProjectPreviewModalProps
  extends Pick<
    Project,
    | "title"
    | "shortDescription"
    | "description"
    | "features"
    | "technologies"
    | "repoUrl"
    | "liveUrl"
    | "images"
  > {
  labels: ProjectGalleryLabels;
  lang?: "en" | "ar";
  onClose?: () => void;
}

function ProjectPreviewModal({
  title,
  shortDescription,
  description,
  features,
  technologies,
  repoUrl,
  liveUrl,
  images,
  labels,
  lang = "en",
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
        setActiveImg((i) => Math.min(i + 1, Math.max(images.length - 1, 0)));
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
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={cn(
          "relative w-full max-w-4xl max-h-[calc(100vh-2rem)] rounded-2xl overflow-y-auto",
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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              {title}
            </h2>
            <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400 mt-0.5">
              {shortDescription}
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
            aria-label={labels.close}
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
            <div className="relative bg-gray-50 dark:bg-[#0a0a0a] aspect-[2/1] overflow-hidden">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                key={activeImg}
                src={images[activeImg].src}
                alt={images[activeImg].alt}
                className="object-contain animate-in fade-in duration-300"
              />

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => Math.max(i - 1, 0))}
                    disabled={activeImg === 0}
                    className={cn(
                      "absolute start-3 top-1/2 -translate-y-1/2",
                      "w-9 h-9 rounded-full flex items-center justify-center",
                      "bg-white/80 dark:bg-black/60 backdrop-blur-sm",
                      "border border-gray-200 dark:border-white/10",
                      "text-gray-700 dark:text-gray-200",
                      "disabled:opacity-25 hover:bg-white dark:hover:bg-black/80",
                      "transition-all duration-150 shadow-sm",
                    )}
                    aria-label={labels.previous}
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
                      <path
                        className="rtl:rotate-180 origin-center"
                        d="M9 1L3 7l6 6"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImg((i) => Math.min(i + 1, images.length - 1))
                    }
                    disabled={activeImg === images.length - 1}
                    className={cn(
                      "absolute end-3 top-1/2 -translate-y-1/2",
                      "w-9 h-9 rounded-full flex items-center justify-center",
                      "bg-white/80 dark:bg-black/60 backdrop-blur-sm",
                      "border border-gray-200 dark:border-white/10",
                      "text-gray-700 dark:text-gray-200",
                      "disabled:opacity-25 hover:bg-white dark:hover:bg-black/80",
                      "transition-all duration-150 shadow-sm",
                    )}
                    aria-label={labels.next}
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
                      <path
                        className="rtl:rotate-180 origin-center"
                        d="M5 1l6 6-6 6"
                      />
                    </svg>
                  </button>

                  {/* Counter pill */}
                  <span
                    className={cn(
                      "absolute bottom-3 end-3",
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
                {images.map((image, idx) => (
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
                    aria-label={labels.viewImage.replace(
                      "{count}",
                      String(idx + 1),
                    )}
                  >
                    <Image
                      width={160}
                      height={80}
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : null}

        {(description || features.length > 0) && (
          <div className="grid gap-5 px-6 py-5 border-t border-gray-100 dark:border-[#1a1a1a] md:grid-cols-2">
            {description && (
              <section>
                <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {labels.detailedDescription}
                </h3>
                <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </section>
            )}
            {features.length > 0 && (
              <section>
                <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {labels.keyFeatures}
                </h3>
                <ul className="list-disc space-y-1.5 ps-5 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {(repoUrl || liveUrl) && (
          <div className="flex flex-wrap gap-2 px-6 py-4 border-t border-gray-100 dark:border-[#1a1a1a]">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[12px] font-medium",
                  "border border-gray-200 dark:border-white/10",
                  "text-gray-700 dark:text-gray-200 hover:border-cyan-300 dark:hover:border-cyan-800",
                  "transition-colors duration-150",
                )}
              >
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-4a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 20.4 5 5 5 0 0 0 20.3 1S19.1.6 16 2.5a13.4 13.4 0 0 0-7 0C5.9.6 4.7 1 4.7 1A5 5 0 0 0 4.6 5a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A3.4 3.4 0 0 0 9 18v4" />
                </svg>
                {labels.repository}
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[12px] font-medium",
                  "bg-cyan-600 text-white hover:bg-cyan-700",
                  "transition-colors duration-150",
                )}
              >
                {labels.liveDemo}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}

        {/* Footer — technologies */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-[#1a1a1a]">
          <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            {labels.technologies}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((technology) => (
              <span
                key={technology}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded font-dm-mono tracking-wide",
                  "bg-cyan-50 dark:bg-cyan-950",
                  "text-cyan-600 dark:text-cyan-300",
                  "border border-cyan-200 dark:border-cyan-900/60",
                )}
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectPreviewModal };
