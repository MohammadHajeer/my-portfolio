"use client";

import { useEffect, useRef, useState } from "react";

type Lang = "en" | "ar";

interface LogoProps {
  lang?: Lang;
}

const LOGO_TEXT: Record<Lang, string> = {
  en: "MOHAMMAD",
  ar: "محمــــــد",
};

const SPOTLIGHT_CONFIG: Record<Lang, { ellipseW: number; ellipseH: number }> = {
  en: { ellipseW: 80, ellipseH: 80 },
  ar: { ellipseW: 100, ellipseH: 100 },
};

function Logo({ lang = "en" }: LogoProps) {
  const [posX, setPosX] = useState(0);
  const tRef = useRef(0);
  const isArabic = lang === "ar";
  const text = LOGO_TEXT[lang];
  const { ellipseW, ellipseH } = SPOTLIGHT_CONFIG[lang];

  useEffect(() => {
    tRef.current = 0;
    const interval = setInterval(() => {
      tRef.current += 0.02;
      const calculatedX = Math.sin(tRef.current) * 90 + 100;
      setPosX(calculatedX);
    }, 20);
    return () => clearInterval(interval);
  }, [lang]);

  const spotlightStyle = (darkMode: boolean): React.CSSProperties => ({
    backgroundImage: `radial-gradient(ellipse ${ellipseW}px ${ellipseH}px at ${posX}% 50%, oklch(60.9% 0.126 221.723) 0%, ${
      darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.08)"
    } 100%)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    direction: isArabic ? "rtl" : "ltr",
    letterSpacing: isArabic ? "0.05em" : undefined,
    lineHeight: isArabic ? 1.4 : undefined,
  });

  const baseClassName = `text-4xl max-lg:text-xl font-black text-transparent select-none ${
    isArabic ? "normal-case" : "uppercase tracking-widest"
  }`;

  return (
    <div className="flex items-center justify-center overflow-hidden">
      {/* Light mode */}
      <div
        className={`block dark:hidden ${baseClassName}`}
        style={spotlightStyle(false)}
        lang={lang}
      >
        {text}
      </div>

      {/* Dark mode */}
      <div
        className={`hidden dark:block ${baseClassName}`}
        style={spotlightStyle(true)}
        lang={lang}
      >
        {text}
      </div>
    </div>
  );
}

export { Logo };
