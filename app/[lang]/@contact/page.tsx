import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import FadeIn from "@/components/fade-in";
import CopyToClipboard from "@/components/copy-to-clipboard";
import SectionHeader from "@/components/section-header";
import HoverGlowCard from "@/components/hover-glow-card";

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const {
    Contact: { heading, links, sectionLabel, subheading },
  } = await getDictionary(lang);
  return (
    <>
      <SectionHeader
        lang={lang}
        label={sectionLabel}
        heading={heading}
        subheading={subheading}
      />

      <div className="flex flex-col gap-3">
        {links.map((c, i) => (
          <FadeIn key={c.label} delay={i * 80}>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
            
            >
              <HoverGlowCard   className={cn(
                "flex items-center gap-4 px-5 py-4 rounded-lg no-underline group relative ",
                "bg-white dark:bg-[#111]",
                "border border-gray-200 dark:border-[#1f1f1f]",
                "text-gray-800 dark:text-gray-200",
                "hover:border-cyan-500",
                "transition-all duration-200",
                "shadow-sm dark:shadow-none",
              )}>
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-sm shrink-0",
                    "bg-gray-100 dark:bg-[#1a1a1a]",
                    "border border-gray-200 dark:border-[#2a2a2a]",
                    "text-cyan-600 dark:text-cyan-400",
                  )}
                >
                  {c.icon}
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      "text-gray-900 dark:text-gray-100",
                      lang === "en" && "font-dm-sans",
                    )}
                  >
                    {c.label}
                  </div>
                  <div
                    className={cn(
                      "text-xs mt-0.5 font-dm-mono",
                      "text-gray-400 dark:text-gray-600",
                    )}
                  >
                    {c.sub}
                  </div>
                </div>
                {c.copyText ? (
                  <CopyToClipboard text={c.sub} lang={lang} />
                ) : (
                  <span
                    className={cn(
                      "text-lg transition-colors duration-200",
                      "text-gray-300 dark:text-gray-700",
                      "group-hover:text-cyan-500 dark:group-hover:text-cyan-400",
                      lang === "ar" && "rotate-180",
                      lang === "en" ? "ml-auto" : "mr-auto",
                    )}
                  >
                    →
                  </span>
                )}
              </HoverGlowCard>
            </a>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
