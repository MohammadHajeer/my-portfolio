import { cn } from "@/lib/utils";
import NavLink from "./nav-link";

export default function Footer() {
  return (
    <footer className="py-7 px-6 border-t border-gray-100 dark:border-[#111]">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-dm-sans text-sm font-medium text-gray-900 dark:text-gray-100">
            Ahmad Al-Rashid
          </p>
          <p className="text-[11px] mt-0.5 font-dm-mono text-gray-400 dark:text-gray-700">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>

        <p className="text-[11px] font-dm-mono tracking-wide text-gray-400 dark:text-gray-700">
          Built with{" "}
          <span className="text-cyan-600 dark:text-cyan-500">React</span>
          {" & "}
          <span className="text-cyan-600 dark:text-cyan-500">Tailwind</span>
        </p>

        <div className="flex gap-5">
          {["GitHub", "LinkedIn", "Email"].map((s) => (
            <NavLink
              key={s}
              title={s}
              section="Contact"
              className={cn(
                "text-[12px] font-dm-mono tracking-wide",
                "text-gray-400 dark:text-gray-600",
                "hover:text-cyan-600 dark:hover:text-cyan-400",
                "transition-colors bg-transparent border-none cursor-pointer",
              )}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
