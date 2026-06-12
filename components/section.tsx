import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

function Section({
  id,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 px-6 border-t border-gray-100 dark:border-[#111]",
        className,
      )}
    >
      <div className={cn("max-w-5xl mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export { Section };
