import { cn } from "@/lib/utils";
import { SKILLS } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";
import { FadeIn, HoverGlowCard, SectionHeader } from "@/components";

export default async function About({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const {
    About: { sectionLabel, heading, paragraphs, focusAreas },
  } = await getDictionary(lang);
  return (
    <>
      <SectionHeader lang={lang} label={sectionLabel} heading={heading} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <FadeIn delay={100}>
          <p
            className={cn(
              "text-[15px] leading-loose mb-5 text-gray-500 dark:text-gray-400",
              lang === "en" && "font-dm-sans",
            )}
          >
            {paragraphs[0]}
          </p>
          <p
            className={cn(
              "text-[15px] leading-loose text-gray-500 dark:text-gray-400",
              lang === "en" && "font-dm-sans",
            )}
          >
            {paragraphs[1]}
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {focusAreas.map((f) => (
              <HoverGlowCard key={f.title} className="p-4">
                <div
                  className={cn(
                    "text-[13px] font-semibold mb-1",
                    "text-gray-800 dark:text-gray-100",
                    lang === "en" && "font-dm-sans",
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
              </HoverGlowCard>
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
                  " hover:text-cyan-600 dark:hover:text-cyan-600",
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
