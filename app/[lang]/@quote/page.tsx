"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { cn } from "@/lib/utils";

/* ─── tiny animated counter for the "verse number" ─── */
function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, to]);
  return <span ref={ref}>{val}</span>;
}

/* ─── SVG calligraphy underline ─── */
function CaliLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 12"
      className={cn("w-full", className)}
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
        transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
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

/* ─── corner bracket SVG ─── */
function Corner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("text-primary", flip && "rotate-180")}
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

const ENGLISH =
  "Indeed Allah loves that when one of you does a job, he perfects it.";
const ARABIC =
  "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ";

/* ─── word-by-word reveal ─── */
function RevealWords({
  text,
  className,
  delayStart = 0,
  rtl = false,
}: {
  text: string;
  className?: string;
  delayStart?: number;
  rtl?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span
      className={cn("inline", rtl && "leading-loose")}
      dir={rtl ? "rtl" : "ltr"}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={cn("inline-block", className)}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            delay: delayStart + i * (rtl ? 0.06 : 0.05),
            ease: "easeOut",
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

export default function Quote() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={wrapperRef}
      onMouseMove={handleMouse}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      dir="ltr"
      className="relative group"
    >
      {/* ── Main card ── */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-white dark:bg-black/40",
          "border border-gray-100/80 dark:border-[#1c1c28]",
        )}
      >
        {/* subtle noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />

        {/* top-right geometric line decoration */}
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
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.path
            d="M110 20 L80 20 L110 50"
            stroke="url(#corner-grad)"
            strokeWidth="0.6"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
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

        {/* ── Content ── */}
        <div className="relative px-10 py-9 sm:px-12 sm:py-10">
          {/* top label row */}
          <motion.div
            className="flex items-center gap-3 mb-7"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Corner />
            <span className="text-[10px] tracking-[0.25em] uppercase font-dm-mono text-gray-300 dark:text-gray-600">
              Prophetic Hadith · <Counter to={1392} /> AH
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-gray-200 dark:from-gray-800 to-transparent" />
            <span className="text-[10px] tracking-[0.2em] font-ibm-plex-arabic text-primary uppercase">
              صحيح
            </span>
          </motion.div>

          {/* opening quotation mark */}
          <motion.div
            aria-hidden
            className="font-dm-sans text-[72px] leading-none text-cyan-400/15 dark:text-cyan-500/10 select-none mb-1 -mt-2"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            &quot;
          </motion.div>

          {/* English quote */}
          <p className="font-dm-sans text-xl sm:text-[1.35rem] italic font-light leading-[1.8] mb-2 text-gray-700 dark:text-gray-200">
            <RevealWords text={ENGLISH} delayStart={0.25} />
          </p>

          {/* wavy underline */}
          <div className="mb-7 -mt-1 pr-4">
            <CaliLine />
          </div>

          {/* Arabic quote */}
          <div className="relative mb-6">
            {/* faint Arabic pattern bg */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #ccc 0px, #ccc 1px, transparent 1px, transparent 12px)",
              }}
            />
            <div className="relative py-4 px-5 rounded-lg border border-gray-100 dark:border-black/0 dark:bg-black/10 bg-gray-50">
              <p
                className={cn(
                  "text-right text-xl sm:text-2xl leading-[2.2] font-ibm-plex-arabic",
                  "text-black dark:text-primary",
                )}
                dir="rtl"
              >
                <RevealWords text={ARABIC} delayStart={0.7} rtl />
              </p>
            </div>
          </div>

          {/* attribution row */}
          <motion.div
            className="flex items-center justify-between gap-4 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-[10px] tracking-[0.22em] uppercase font-dm-mono text-gray-400 dark:text-gray-600">
              — The principle behind every line of code
            </p>
          </motion.div>

          {/* bottom corner */}
          <div className="absolute bottom-3 right-4">
            <Corner flip />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
