import FadeIn from "@/components/fade-in";
import SectionLabel from "@/components/section-label";
import { TECH_STACK } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function TechStack() {
  return (
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <SectionLabel text="tech stack" />
        <h2 className="font-dm-sans text-3xl sm:text-4xl font-bold tracking-tight mb-10 text-gray-900 dark:text-gray-50">
          Tools of the trade
        </h2>
      </FadeIn>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {TECH_STACK.map((t, i) => (
          <FadeIn key={t.name} delay={i * 40}>
            <div
              className={cn(
                "rounded-lg p-4 flex flex-col items-center gap-2 cursor-default",
                "bg-white dark:bg-[#111]",
                "border border-gray-200 dark:border-[#1f1f1f]",
                "hover:border-cyan-500 hover:-translate-y-1",
                "transition-all duration-200",
                "shadow-sm dark:shadow-none",
              )}
            >
              <span className="text-2xl">{t.icon}</span>
              <span
                className={cn(
                  "font-dm-sans text-[13px] font-medium",
                  "text-gray-800 dark:text-gray-100",
                )}
              >
                {t.name}
              </span>
              <span
                className={cn(
                  "text-[10px] tracking-widest uppercase",
                  "text-gray-400 dark:text-gray-600",
                )}
              >
                {t.cat}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
