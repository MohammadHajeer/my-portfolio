import { cn, numbersToArabic } from "@/lib/utils";
import NavLink from "@/components/nav-link";
import { getDictionary } from "@/lib/dictionaries";
import HeroPhoto from "@/components/hero-photo";
import LangSwitcher from "@/components/lang-switcher";

export default async function Hero({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const { Hero } = await getDictionary(lang);
  return (
    <div
      className={cn(
        "max-w-5xl mx-auto w-full flex items-center justify-between gap-12 py-24",
        "flex-col-reverse lg:flex-row md:gap-20",
      )}
    >
      {/* Text */}

      <div className="hero-content flex-1">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full",
            "bg-gray-100 dark:bg-[#111]",
            "border border-gray-200 dark:border-[#1f1f1f]",
            "text-gray-500 dark:text-gray-500",
            "text-xs font-dm-mono tracking-wide",
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          {Hero.availableBadge}
        </div>

        <h1
          className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-bold",
            "leading-tight tracking-tight mb-5",
            "text-gray-900 dark:text-gray-50",
          )}
        >
          {Hero.name}
          <span className={cn("cursor-blink", lang === "ar" && "mr-2")} />
        </h1>

        <p
          className={cn(
            "text-sm text-gray-400 dark:text-gray-500 mb-6 tracking-widest",
          )}
        >
          <span className="text-cyan-600 dark:text-cyan-400">
            {Hero.photoBadge}
          </span>
          {" · " + Hero.title}
        </p>

        <p
          className={cn(
            "leading-relaxed max-w-lg mb-10",
            "text-gray-500 dark:text-gray-400",
          )}
        >
          {Hero.intro}
        </p>

        <div className="flex flex-wrap gap-3 mb-14">
          <NavLink
            title={Hero.viewProjects}
            section="Projects"
            className={cn(
              "bg-cyan-600 hover:bg-cyan-500 text-white text-sm",
              "px-6 py-2.5 rounded-md transition-all duration-200",
              "hover:-translate-y-px",
              lang === "en" && "font-dm-mono",
            )}
          />

          <NavLink
            title={Hero.getInTouch}
            section="Contact"
            className={cn(
              "border border-cyan-500 text-cyan-600 dark:text-cyan-400",
              "hover:bg-cyan-50 dark:hover:bg-cyan-600/10",
              "text-sm px-6 py-2.5 rounded-md transition-all duration-200",
              "hover:-translate-y-px",
              lang === "en" && "font-dm-mono",
            )}
          />
          <LangSwitcher currentLang={lang} />
        </div>

        <div className="flex flex-wrap gap-10">
          {Hero.stats.map(({ value, label }) => (
            <div key={label}>
              <div
                className={cn(
                  "text-2xl font-bold",
                  "text-gray-900 dark:text-gray-50",
                )}
              >
                {lang === "en" ? value : numbersToArabic(value)}+
              </div>
              <div
                className={cn(
                  "text-[11px] text-gray-400 dark:text-gray-500",
                  "tracking-widest mt-1 uppercase",
                )}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo + geometric decorations */}
      <div className="relative">
        <HeroPhoto
          lang={lang}
          photoBadge={Hero.photoBadge}
          photoFallback={Hero.photoFallback}
        />
      </div>
    </div>
  );
}
