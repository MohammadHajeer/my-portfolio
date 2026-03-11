"use client";

import { useEffect, useState } from "react";
import ThemeSwitcher from "./theme-switcher";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const scrollTo = (id: string) =>
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const onScroll = () => {
      const secs = NAV_LINKS.map((l) =>
        document.getElementById(l.toLowerCase()),
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
  }, []);
  return (
    <nav
      className="
          fixed top-0 left-0 right-0 z-50 h-14
          flex items-center justify-between px-6
          bg-white/80       dark:bg-[#0a0a0a]/80
          backdrop-blur-md
          border-b border-gray-200 dark:border-[#1a1a1a]
          transition-colors duration-300
        "
    >
      <span className="text-cyan-600 dark:text-cyan-500 font-medium text-sm tracking-wider font-dm-mono">
        {"<"}
        <span className="text-gray-800 dark:text-gray-200">dev</span>
        {"/>"}
      </span>

      <div className="flex items-center gap-5">
        {NAV_LINKS.map((l) => (
          <button
            key={l}
            onClick={() => scrollTo(l)}
            className={`hidden sm:block text-xs tracking-widest font-dm-mono transition-colors duration-200
                        ${
                          activeSection === l.toLowerCase()
                            ? "text-cyan-600 dark:text-cyan-400"
                            : "text-gray-400 dark:text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400"
                        }`}
          >
            {l}
          </button>
        ))}

        {/* Theme toggle */}
        <ThemeSwitcher />

        <button
          onClick={() => scrollTo("Contact")}
          className="
                      bg-cyan-600 hover:bg-cyan-500
                      text-white text-xs px-4 py-2 rounded-md
                      transition-all duration-200 hover:-translate-y-px font-dm-mono
                    "
        >
          Hire Me
        </button>
      </div>
    </nav>
  );
}
