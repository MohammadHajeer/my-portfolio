"use client";
import Link from "next/link";
import { useState, useEffect, FC } from "react";

export type Locale = "en" | "ar";

const META = {
  en: { badge: "EN", targetLocale: "ar" as Locale, targetLabel: "العربية" },
  ar: { badge: "AR", targetLocale: "en" as Locale, targetLabel: "English" },
};

const LangSwitcher: FC<{ currentLang: Locale }> = ({ currentLang }) => {
  const [loading, setLoading] = useState(false);
  const { badge, targetLocale, targetLabel } = META[currentLang];

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
  };

  useEffect(() => () => setLoading(false), []);

  return (
    <Link
      replace
      href={`/${targetLocale}`}
      onClick={handleClick}
      aria-label={`Switch to ${targetLabel}`}
      aria-busy={loading}
      className={[
        "relative flex items-center gap-2.5 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 select-none w-fit",
        loading
          ? " bg-cyan-600/10 cursor-not-allowed"
          : "bg-white dark:bg-[#111] cursor-pointer",
      ].join(" ")}
    >
      {loading && (
        <span className="absolute inset-0 rounded-lg bg-cyan-500/4 backdrop-blur-sm flex items-center justify-center gap-1.5 z-10">
          <SpinnerIcon />
          <Dot delay="0s" />
          <Dot delay=".2s" />
          <Dot delay=".4s" />
        </span>
      )}

      <GlobeIcon />
      <span className="text-[11px] px-1.5 py-0.5 rounded font-mono tracking-widest bg-gray-100 dark:bg-[#1a1a1a] text-gray-500">
        {badge}
      </span>
      <span className="w-px h-4 bg-gray-200 dark:bg-[#2a2a2a]" />
      <span
        className={[
          "tracking-wide",
          targetLocale === "ar" ? "font-[IBM_Plex_Sans_Arabic,sans-serif]" : "",
        ].join(" ")}
      >
        {targetLabel}
      </span>
      <ArrowIcon />
    </Link>
  );
};

export { LangSwitcher };

const Dot: FC<{ delay: string }> = ({ delay }) => (
  <span
    className="w-0.75 h-0.75 rounded-full bg-cyan-400 animate-[shimmer_1.2s_ease-in-out_infinite]"
    style={{ animationDelay: delay }}
  />
);
// tailwind.config.js → keyframes: { shimmer: { '0%,100%': { opacity: '.3' }, '50%': { opacity: '1' } } }

const GlobeIcon: FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="text-gray-400 dark:text-gray-500 shrink-0"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const ArrowIcon: FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="text-gray-400 dark:text-gray-600 shrink-0"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const SpinnerIcon: FC = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#06b6d4"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden
    className="animate-spin shrink-0"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
