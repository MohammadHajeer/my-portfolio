import FadeIn from "@/components/fade-in";
import SectionLabel from "@/components/section-label";
import { SKILLS } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

export default async function About({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const { About } = await getDictionary(lang);
  return (
    <>
      <FadeIn>
        <SectionLabel text={About.sectionLabel} />
        <h2 className="font-dm-sans text-3xl sm:text-4xl font-bold tracking-tight mb-10 text-gray-900 dark:text-gray-50">
          {About.heading}
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <FadeIn delay={100}>
          <p className="font-dm-sans text-[15px] leading-loose mb-5 text-gray-500 dark:text-gray-400">
            {About.paragraphs[0]}{" "}
          </p>
          <p className="font-dm-sans text-[15px] leading-loose text-gray-500 dark:text-gray-400">
            {About.paragraphs[1]}
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {About.focusAreas.map((f) => (
              <div
                key={f.title}
                className={cn(
                  "rounded-xl p-4 cursor-default",
                  "bg-white dark:bg-[#111]",
                  "border border-gray-200 dark:border-[#1f1f1f]",
                  "hover:border-cyan-400 dark:hover:border-cyan-500/40",
                  "hover:-translate-y-1 transition-all duration-200",
                  "shadow-sm dark:shadow-none",
                )}
              >
                {/* <div className="text-xl mb-2">{f.icon}</div> */}
                <div
                  className={cn(
                    "font-dm-sans text-[13px] font-semibold mb-1",
                    "text-gray-800 dark:text-gray-100",
                  )}
                >
                  {f.title}
                </div>
                <div
                  className={cn(
                    "text-[11px] leading-snug",
                    "text-gray-400 dark:text-gray-500",
                  )}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] cursor-default",
                  "bg-gray-100 dark:bg-[#111]",
                  "border border-gray-200 dark:border-[#1f1f1f]",
                  "text-gray-500 dark:text-gray-500",
                  "hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400",
                  "transition-all duration-200",
                )}
              >
                {s}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </>
  );
}
