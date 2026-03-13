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
    <FadeIn>
      <p className="text-cyan-500 dark:text-cyan-400 text-xs tracking-widest uppercase mb-4">
        &#47;&#47; {label}
      </p>
      <h2
        className={cn(
          "font-dm-sans text-3xl sm:text-4xl font-bold tracking-tight mb-10 text-gray-900 dark:text-gray-50",
          lang === "en" && "font-dm-mono",
        )}
      >
        {heading}
      </h2>
      <p className="font-dm-sans text-sm mb-14 text-gray-400 dark:text-gray-500">
        {subheading}
      </p>
    </FadeIn>
  );
}
