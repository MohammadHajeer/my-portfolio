"use client";

import { useState, useEffect, useRef } from "react";

const content = {
  en: {
    dir: "ltr",
    label: "Download CV",
    hint: "Software Engineer",
    downloading: "Preparing",
    done: "Got it!",
    particles: ["</>", "{}", "fn()", "01", "git", "//"],
    bracket: "[↓]",
  },
  ar: {
    dir: "rtl",
    label: "تحميل السيرة",
    hint: "مهندس برمجيات",
    downloading: "جارٍ",
    done: "تم!",
    particles: ["</>", "{}", "دالة()", "01", "git", "//"],
    bracket: "[←]",
  },
};

interface ParticleProps {
  char: string;
  delay: number;
  duration: number;
  startX: number;
}

function Particle({ char, delay, duration, startX }: ParticleProps) {
  return (
    <span
      className="absolute text-[9px] pointer-events-none select-none"
      style={{
        left: `${startX}%`,
        bottom: "100%",
        color: "#22d3ee",
        opacity: 0,
        animation: `floatUp ${duration}s ease-in ${delay}s infinite`,
      }}
    >
      {char}
    </span>
  );
}

interface CVDownloadButtonProps {
  lang?: "en" | "ar";
  cvUrl?: string;
}

export default function CVDownloadButton({
  lang = "en",
  cvUrl = "#",
}: CVDownloadButtonProps) {
  const t = content[lang] || content.en;
  const [phase, setPhase] = useState("idle");
  const [hovered, setHovered] = useState(false);
  const phaseTimer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("downloading");
    if (phaseTimer.current) {
      clearTimeout(phaseTimer.current);
    }

    if (cvUrl !== "#") {
      const a = document.createElement("a");
      a.href = cvUrl;
      a.download = "";
      a.click();
      setPhase("done");
    }
  };

  useEffect(
    () => () => {
      if (phaseTimer.current) {
        clearTimeout(phaseTimer.current);
      }
    },
    [],
  );

  // Periodic pulse glow
  const [glowing, setGlowing] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      if (phase !== "idle") return;
      setGlowing(true);
      setTimeout(() => setGlowing(false), 900);
    }, 4000);
    return () => clearInterval(t);
  }, [phase]);

  const particles = t.particles.map((char, i) => ({
    char,
    delay: i * 0.5,
    duration: 2.2 + i * 0.28,
    startX: 8 + i * 14,
    amp: 18 + (i % 3) * 10,
  }));

  return (
    <>
      <div
        dir={t.dir}
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-1.5"
      >
        {/* Hint */}
        <div
          className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded
          bg-white/80 dark:bg-zinc-900/80 backdrop-blur
          border border-zinc-200 dark:border-zinc-700
          text-zinc-400 dark:text-zinc-500
          transition-all duration-300 select-none
          group-hover:border-cyan-400"
          style={{ opacity: hovered ? 1 : 0.55 }}
        >
          {t.hint}
        </div>

        {/* Orbit + button */}
        <div className="relative inline-flex items-center justify-center">
          {/* Ring 1 */}
          <div
            className="absolute pointer-events-none"
            style={{ inset: "-9px" }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 110 56"
              fill="none"
              style={{ position: "absolute", inset: 0 }}
            >
              <g className="ring1">
                <ellipse
                  cx="55"
                  cy="28"
                  rx="51"
                  ry="24"
                  stroke="#22d3ee"
                  strokeWidth="0.7"
                  strokeDasharray="3 7"
                  strokeLinecap="round"
                />
                <circle cx="55" cy="4" r="2.5" fill="#22d3ee" />
              </g>
            </svg>
          </div>

          {/* Ring 2 */}
          <div
            className="absolute pointer-events-none"
            style={{ inset: "-15px" }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 126 68"
              fill="none"
              style={{ position: "absolute", inset: 0 }}
            >
              <g className="ring2">
                <ellipse
                  cx="63"
                  cy="34"
                  rx="59"
                  ry="30"
                  stroke="#67e8f9"
                  strokeWidth="0.6"
                  strokeDasharray="2 10"
                />
                <circle cx="63" cy="4" r="2" fill="#67e8f9" />
              </g>
            </svg>
          </div>

          {/* Float wrapper */}
          <div className={`cv-float${hovered ? " hovered" : ""}`}>
            {/* Particles */}
            <div className="absolute inset-0 overflow-visible pointer-events-none">
              {hovered && particles.map((p, i) => <Particle key={i} {...p} />)}
            </div>

            <button
              onClick={handleClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              disabled={phase !== "idle"}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-full
                text-[11px] font-semibold tracking-tight
                border transition-all duration-200 cursor-pointer select-none
                focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                ${
                  phase === "done"
                    ? "bg-cyan-500 border-cyan-400 text-white dark:bg-cyan-600"
                    : `bg-white dark:bg-zinc-900
                     border-zinc-200 dark:border-zinc-700
                     text-zinc-800 dark:text-zinc-100
                     hover:border-cyan-400 dark:hover:border-cyan-500
                     hover:bg-cyan-50 dark:hover:bg-zinc-800`
                }
              `}
              style={{
                transform:
                  hovered && phase === "idle" ? "scale(1.05)" : "scale(1)",
                boxShadow: glowing
                  ? "0 0 0 5px rgba(34,211,238,0.12), 0 4px 20px rgba(34,211,238,0.2)"
                  : hovered
                    ? "0 6px 24px rgba(34,211,238,0.18), 0 2px 6px rgba(0,0,0,0.07)"
                    : "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              {/* Icon */}
              <span className="w-4 h-4 flex items-center justify-center shrink-0">
                {phase === "idle" && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      transform: hovered ? "translateY(2px)" : "translateY(0)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <path
                      d="M12 3v13M7 11l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 20h16"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {phase === "downloading" && (
                  <svg
                    className="spin"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeOpacity="0.2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#22d3ee"
                      strokeWidth="2"
                      strokeDasharray="28 56"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {phase === "done" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      className="chk"
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>

              {/* Label */}
              <span className="whitespace-nowrap">
                {phase === "idle" && t.label}
                {phase === "downloading" && (
                  <span className="flex items-center gap-1">
                    {t.downloading}
                    <span className="d1 inline-block size-0.75 rounded-full bg-current" />
                    <span className="d2 inline-block size-0.75 rounded-full bg-current" />
                    <span className="d3 inline-block size-0.75 rounded-full bg-current" />
                  </span>
                )}
                {phase === "done" && t.done}
              </span>

              {/* Bracket */}
              {phase === "idle" && (
                <span
                  className="text-[9px] font-normal transition-opacity duration-200"
                  style={{ opacity: hovered ? 1 : 0, color: "#22d3ee" }}
                >
                  {t.bracket}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
