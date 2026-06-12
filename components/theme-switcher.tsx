"use client";

import { cn } from "@/lib/utils";
import { Loader, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!mounted)
    return (
      <span className="p-2 rounded-lg transition-colors cursor-not-allowed">
        <Loader className="animate-spin" size={16} />
      </span>
    );

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "p-2 rounded-lg transition-colors",
        "bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20",
      )}
    >
      {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export { ThemeSwitcher };
