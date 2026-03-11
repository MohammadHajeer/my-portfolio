import { cn } from "@/lib/utils";
import FadeIn from "@/components/fade-in";
import SectionLabel from "@/components/section-label";
import { PROJECTS } from "@/lib/constants";

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <SectionLabel text="projects" />
        <h2 className="font-dm-sans text-3xl sm:text-4xl font-bold tracking-tight mb-10 text-gray-900 dark:text-gray-50">
          Selected work
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 80}>
            <div
              className={cn(
                "rounded-xl p-6 flex flex-col h-full",
                "bg-white dark:bg-[#111]",
                "border border-gray-200 dark:border-[#1f1f1f]",
                "hover:border-cyan-400 dark:hover:border-cyan-500/30",
                "hover:-translate-y-1 transition-all duration-200",
                "shadow-sm dark:shadow-none",
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-dm-sans text-base font-semibold text-gray-900 dark:text-gray-50">
                  {p.title}
                </h3>
                <span
                  className={cn(
                    "shrink-0 text-[10px] px-2.5 py-1 rounded font-dm-mono",
                    "tracking-widest uppercase",
                    "bg-green-50   dark:bg-green-950",
                    " text-green-600 dark:text-green-400",
                    " border border-green-200 dark:border-green-900",
                  )}
                >
                  {p.status}
                </span>
              </div>
              <p
                className="font-dm-sans text-[13px] leading-relaxed mb-4 flex-1
                                  text-gray-500 dark:text-gray-400"
              >
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "text-[11px] px-2.5 py-1 rounded font-dm-mono tracking-wide",
                      "bg-cyan-50 dark:bg-cyan-950",
                      "text-cyan-600 dark:text-cyan-300",
                      "border border-cyan-200 dark:border-cyan-900/60",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
