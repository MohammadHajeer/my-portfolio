"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

const ENGLISH =
  "Indeed Allah loves that when one of you does a job, he perfects it.";
const ARABIC =
  "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ";

/* ─── Word reveal using CSS classes — no per-word Motion instances ─── */
function RevealWords({
  text,
  className,
  delayOffset = 0,
  rtl = false,
}: {
  text: string;
  className?: string;
  delayOffset?: number;
  rtl?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} dir={rtl ? "rtl" : "ltr"} className="inline">
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-[opacity,transform]",
            "duration-450 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            className,
          )}
          style={{ transitionDelay: `${delayOffset + i * 50}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

/* ─── Wavy underline — single SVG path, drawn once ─── */
function CaliLine() {
  return (
    <svg
      viewBox="0 0 320 12"
      className="w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M0 8 Q40 2 80 8 Q120 14 160 8 Q200 2 240 8 Q280 14 320 8"
        fill="none"
        stroke="url(#cali-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="cali-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0092b8" stopOpacity="0" />
          <stop offset="30%" stopColor="#0092b8" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#0092b8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0092b8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Corner bracket ─── */
function Corner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("text-primary shrink-0", flip && "rotate-180")}
      aria-hidden
    >
      <path
        d="M1 19 L1 1 L19 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Quote card ─── */
export default function Quote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-white dark:bg-black/40",
          "border border-gray-100/80 dark:border-[#1c1c28]",
        )}
      >
        {/* Decorative top-right lines — composited once, no per-frame cost */}
        <svg
          className="absolute top-0 right-0 opacity-30 dark:opacity-20 pointer-events-none"
          width="110"
          height="70"
          viewBox="0 0 110 70"
          fill="none"
          aria-hidden
        >
          <motion.path
            d="M110 0 L60 0 L110 50"
            stroke="url(#corner-grad)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          />
          <motion.path
            d="M110 20 L80 20 L110 50"
            stroke="url(#corner-grad)"
            strokeWidth="0.6"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          />
          <defs>
            <linearGradient
              id="corner-grad"
              x1="110"
              y1="0"
              x2="60"
              y2="70"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative px-10 py-9 sm:px-12 sm:py-10">
          {/* Label row */}
          <motion.div
            className="flex items-center gap-3 mb-7"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <Corner />
            <span className="text-[10px] tracking-[0.25em] uppercase font-dm-mono text-gray-300 dark:text-gray-600">
              — Reported by al-Bayhaqī in Shuʿab al-Īmān
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-gray-200 dark:from-gray-800 to-transparent" />
          </motion.div>

          {/* Opening quote mark */}
          <div
            aria-hidden
            className="font-dm-sans text-[72px] leading-none text-cyan-400/15 dark:text-cyan-500/10 select-none mb-1 -mt-2"
          >
            &quot;
          </div>

          {/* English */}
          <p className="font-dm-sans text-xl sm:text-[1.35rem] italic font-light leading-[1.8] mb-2 text-gray-700 dark:text-gray-200">
            <RevealWords text={ENGLISH} delayOffset={250} />
          </p>

          {/* Wavy underline */}
          <div className="mb-7 -mt-1 pr-4">
            <CaliLine />
          </div>

          {/* Arabic */}
          <div className="relative mb-6">
            <div className="relative py-4 px-5 rounded-lg border border-gray-100 dark:border-black/0 dark:bg-black/10 bg-gray-50">
              <p
                className={cn(
                  "text-right text-xl sm:text-2xl leading-[2.2] font-ibm-plex-arabic",
                  "text-black dark:text-primary",
                )}
                dir="rtl"
              >
                <RevealWords text={ARABIC} delayOffset={700} rtl />
              </p>
            </div>
          </div>

          {/* Attribution */}
          <motion.p
            className="text-[10px] tracking-[0.22em] uppercase font-dm-mono text-gray-400 dark:text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            — The principle behind every line of code
          </motion.p>

          {/* Bottom corner */}
          <div className="absolute bottom-3 right-4">
            <Corner flip />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
