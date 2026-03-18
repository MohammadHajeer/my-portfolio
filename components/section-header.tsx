import { cn } from "@/lib/utils";
import FadeIn from "./fade-in";

interface SectionHeaderProps {
  heading: string;
  label?: string;
  subheading?: string;
  lang?: "en" | "ar";
}

export default function SectionHeader({
  heading,
  label,
  subheading,
  lang = "en",
}: SectionHeaderProps) {
  return (
    <FadeIn className="mb-14">
      <p
        className={cn(
          "text-cyan-500 dark:text-cyan-400 text-xs tracking-widest uppercase mb-4",
          lang === "en" && "font-dm-mono",
        )}
      >
        &#47;&#47; {label}
      </p>
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50",
          lang === "en" && "font-dm-mono",
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p className={cn("text-sm text-gray-400 dark:text-gray-500 mt-2")}>
          {subheading}
        </p>
      )}
    </FadeIn>
  );
}
