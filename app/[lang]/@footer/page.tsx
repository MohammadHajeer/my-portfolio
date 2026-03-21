import { cn, numbersToArabic } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import { Copyright, Dot } from "lucide-react";

export default async function Footer({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const {
    Footer: { name, builtWith, copyright },
  } = await getDictionary(lang);

  const year = new Date().getFullYear();

  return (
    <footer className="relative py-6 px-6 border-t border-gray-100 dark:border-white/6">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-y-3 gap-x-6">
        {/* Left: name + copyright */}
        <div className="flex items-center gap-3">
          <p className="text-[13px] font-semibold tracking-tight text-gray-800 dark:text-gray-200">
            {name}
          </p>
          <span className="w-px h-3 bg-gray-200 dark:bg-white/10" />
          <p
            className={cn(
              "text-[11px] text-gray-400 dark:text-gray-600 tabular-nums flex items-center gap-1 flex-row-reverse",
              lang === "en" ? "font-dm-mono" : "",
            )}
          >
            <Copyright className="size-3" />{" "}
            {lang === "en" ? year : numbersToArabic(year)}{" "}
            <Dot className="size-2" />
            <span>{copyright}</span>
          </p>
        </div>

        {/* Right: built with */}
        <p
          className={cn(
            "text-[11px] tracking-wide text-gray-400 dark:text-gray-600",
            lang === "en" && "font-dm-mono",
          )}
        >
          {builtWith}
        </p>
      </div>
    </footer>
  );
}
