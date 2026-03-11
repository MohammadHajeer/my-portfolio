"use client";

import { Loader, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!mounted)
    return (
      <span className="p-2 rounded-lg transition-colors cursor-not-allowed">
        <Loader className="size-5 animate-spin" size={20} />
      </span>
    );

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 rounded-lg transition-colors ${
        theme === "dark"
          ? "bg-white/10 hover:bg-white/20"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
