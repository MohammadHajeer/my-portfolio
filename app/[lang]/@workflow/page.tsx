import FadeIn from "@/components/fade-in";
import SectionLabel from "@/components/section-label";
import { WORKFLOW } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Workflow() {
  return (
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <SectionLabel text="workflow" />
        <h2 className="font-dm-sans text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-gray-900 dark:text-gray-50">
          From idea to production
        </h2>
        <p className="font-dm-sans text-sm mb-14 text-gray-400 dark:text-gray-500">
          A structured pipeline that turns rough concepts into polished,
          maintained products.
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="flex flex-wrap justify-between gap-y-10">
          {WORKFLOW.map((w) => (
            <div
              key={w.step}
              className="wf-step flex flex-col items-center gap-2 flex-1 min-w-20 group"
            >
              <span
                className={cn(
                  "absolute -top-6 left-1/2 -translate-x-1/2 text-[10px]",
                  "text-cyan-500 dark:text-cyan-500 font-dm-mono tracking-widest",
                )}
              >
                {w.step}
              </span>
              <div
                className={cn(
                  "w-12 h-12 rounded-full z-10 flex items-center justify-center text-lg",
                  "bg-white dark:bg-[#111]",
                  "border border-gray-200 dark:border-[#1f1f1f]",
                  "group-hover:border-cyan-500",
                  "group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950",
                  "transition-all duration-200",
                  "shadow-sm dark:shadow-none",
                )}
              >
                {w.icon}
              </div>
              <span
                className="font-dm-sans text-xs font-semibold text-center
                                         text-gray-800 dark:text-gray-100"
              >
                {w.label}
              </span>
              <span
                className="text-[10px] text-center leading-snug max-w-22
                                         text-gray-400 dark:text-gray-600"
              >
                {w.desc}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div
          className={cn(
            "mt-12 flex flex-wrap items-center gap-4 px-5 py-4 rounded-lg",
            "bg-gray-50 dark:bg-[#0f0f0f]",
            "border border-gray-200 dark:border-[#1a1a1a]",
          )}
        >
          <span
            className={cn(
              "text-[11px] font-dm-mono tracking-widest uppercase shrink-0",
              "text-gray-400 dark:text-gray-600",
            )}
          >
            Typical Delivery
          </span>
          <div
            className={cn(
              "flex-1 min-w-20 h-1 rounded-full overflow-hidden",
              "bg-gray-200 dark:bg-[#1a1a1a]",
            )}
          >
            <div className="h-full w-[68%] bg-cyan-600 rounded-full" />
          </div>
          <span
            className={cn(
              "text-[11px] font-dm-mono shrink-0",
              "text-cyan-600 dark:text-cyan-400",
            )}
          >
            4&nbsp;12 weeks depending on scope
          </span>
        </div>
      </FadeIn>
    </div>
  );
}
