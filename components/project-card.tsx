"use client";

import { cn } from "@/lib/utils";
import { HoverGlowCard } from "./hover-glow-card";

type StatusVariant = "Completed" | "In Progress" | "Archived" | (string & {});

const statusStyles: Record<string, string> = {
  Completed:
    "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
  مكتمل:
    "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
  "In Progress":
    "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900",
  Archived:
    "bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800",
};

const statusDot: Record<string, string> = {
  Completed: "bg-emerald-500",
  مكتمل: "bg-emerald-500",
  "In Progress": "bg-amber-400 animate-pulse",
  Archived: "bg-gray-400",
};

interface ProjectCardProps {
  title: string;
  desc: string;
  status: StatusVariant;
  tags: string[];
  period?: string;
  images?: { src: string; alt: string }[];
  imageCountLabel: string;
  lang?: "en" | "ar";
  onClick?: () => void;
}

function ProjectCard({
  title,
  desc,
  status,
  tags,
  period,
  images,
  imageCountLabel,
  lang = "en",
  onClick,
}: ProjectCardProps) {
  const resolvedStatus = statusStyles[status] ?? statusStyles["Archived"];
  const resolvedDot = statusDot[status] ?? statusDot["Archived"];

  return (
    <HoverGlowCard onClick={onClick} className="p-6">
      {/* Header row: title + status badge */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <h3 className="text-[15px] font-semibold leading-snug text-gray-900 dark:text-gray-50">
          {title}
        </h3>
        <span
          className={cn(
            "shrink-0 inline-flex items-center gap-1.5",
            "text-[10px] px-2.5 py-1 rounded-md",
            "tracking-widest uppercase border",
            lang === "en" && "font-dm-mono",
            resolvedStatus,
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", resolvedDot)} />
          {status}
        </span>
      </div>

      {/* Period */}
      {period && (
        <p
          className={cn(
            "text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-3",
            lang === "en" && "font-dm-mono",
          )}
        >
          {period}
        </p>
      )}

      {/* Divider */}
      <div className="w-8 h-px bg-gray-200 dark:bg-white/10 mb-3" />

      {/* Description */}
      <p
        className={cn(
          "text-[13px] leading-relaxed flex-1 text-gray-500 dark:text-gray-400",
          lang === "en" && "font-dm-sans",
        )}
      >
        {desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {tags.map((t) => (
          <span
            key={t}
            className={cn(
              "text-[11px] px-2.5 py-0.75 rounded-md",
              "bg-cyan-50 dark:bg-cyan-950/60",
              "text-cyan-600 dark:text-cyan-300",
              "border border-cyan-200/70 dark:border-cyan-900/50",
              "transition-colors duration-150",
              "group-hover:border-cyan-300/80 dark:group-hover:border-cyan-800",
              lang === "en" && "font-dm-mono",
            )}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Image hint */}
      {images && images.length > 0 && (
        <p
          className={cn(
            "mt-3 text-[10px] text-cyan-500 dark:text-cyan-400/60 tracking-widest",
            lang === "en" && "font-dm-mono uppercase",
          )}
        >
          {imageCountLabel.replace("{count}", String(images.length))}{" "}
          <span aria-hidden className="inline-block rtl:rotate-180">
            →
          </span>
        </p>
      )}
    </HoverGlowCard>
  );
}

export { ProjectCard };
