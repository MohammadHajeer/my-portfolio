"use client";

import { cn } from "@/lib/utils";

interface HoverGlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowClassName?: string;
  onClick?: () => void;
}

function HoverGlowCard({
  children,
  className,
  glowClassName,
  onClick,
}: HoverGlowCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative rounded-2xl",
        "bg-white dark:bg-[#0e0e0e]",
        "border border-gray-200/80 dark:border-white/6",
        "hover:border-cyan-400/60 dark:hover:border-cyan-500/25",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5",
        "transition-all duration-300 ease-out",
        "shadow-sm dark:shadow-none",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {/* Glow overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0",
          "group-hover:opacity-100 transition-opacity duration-300",
          "bg-linear-to-br from-cyan-500/3 via-transparent to-transparent",
          glowClassName,
        )}
      />

      {children}
    </div>
  );
}

export { HoverGlowCard };
