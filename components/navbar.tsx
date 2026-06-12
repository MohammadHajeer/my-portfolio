"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { Logo } from "./logo";

interface NavbarProps {
  links: { id: string; label: string }[];
  lang?: "en" | "ar";
  hireMe?: string;
}

function Navbar({ links, lang, hireMe }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("");
  const scrollTo = (id: string) =>
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const onScroll = () => {
      const secs = links.map((l) =>
        document.getElementById(l.id.toLowerCase()),
      );
      for (const s of [...secs].reverse()) {
        if (s && window.scrollY >= s.offsetTop - 120) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [links]);
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6",
        "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md",
        "border-b border-gray-200 dark:border-[#1a1a1a]",
      )}
    >
      <Logo lang={lang} />

      <div className={cn("flex items-center gap-5")}>
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            className={cn(
              "hidden sm:block text-xs tracking-widest transition-colors duration-200",
              activeSection === l.id.toLowerCase()
                ? "text-cyan-600 dark:text-cyan-400"
                : "text-gray-400 dark:text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400",
            )}
          >
            {l.label}
          </button>
        ))}

        {/* Theme toggle */}
        <ThemeSwitcher />

        <button
          onClick={() => scrollTo("Contact")}
          className={cn(
            "bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-4 py-2 rounded-md",
            "transition-all duration-200 hover:-translate-y-px",
            lang === "en" && "font-dm-mono",
          )}
        >
          {hireMe || "Hire Me"}
        </button>
      </div>
    </nav>
  );
}

export { Navbar };
