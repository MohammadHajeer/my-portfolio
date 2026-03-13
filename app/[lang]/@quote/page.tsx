import FadeIn from "@/components/fade-in";
import { cn } from "@/lib/utils";

export default function Quote() {
  return (
    <>
      <FadeIn>
        <div
          dir="ltr"
          className={cn(
            "border-l-4 pl-8 pr-6 py-7 rounded-r-xl",
            "bg-gray-50 dark:bg-[#0f0f0f]",
            "border-t border-r border-b",
            "border-gray-100 dark:border-[#1a1a1a]",
          )}
        >
          <p
            className={cn(
              "font-dm-sans text-xl sm:text-2xl italic font-light leading-relaxed mb-6",
              "text-gray-700 dark:text-gray-200",
            )}
          >
            &quot;Indeed Allah loves that when one of you does a job, he
            perfects it.&quot;
          </p>
          <p
            className={cn(
              "text-right text-lg sm:text-xl leading-loose tracking-wide mb-5 font-ibm-plex-arabic",
              "text-cyan-500 dark:text-cyan-400",
            )}
            dir="rtl"
          >
            إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ
            يُتْقِنَهُ
          </p>
          <p
            className={cn(
              "text-[11px] tracking-widest uppercase font-dm-mono",
              "text-gray-400 dark:text-gray-600",
            )}
          >
            — Prophetic Hadith · The principle behind every line of code
          </p>
        </div>
      </FadeIn>
    </>
  );
}
