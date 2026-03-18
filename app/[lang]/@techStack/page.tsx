import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import FadeIn from "@/components/fade-in";
import SectionHeader from "@/components/section-header";

export default async function TechStack({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const {
    TechStack: { sectionLabel, heading, items },
  } = await getDictionary(lang);
  return (
    <>
      <SectionHeader lang={lang} label={sectionLabel} heading={heading} />

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((t, i) => (
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
              {/* <span className="text-2xl">{t.icon}</span> */}
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
    </>
  );
}
