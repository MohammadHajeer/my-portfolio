import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import NavLink from "@/components/nav-link";

export default async function Footer({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const {
    Footer: { name, builtWith, copyright, quickLinks },
  } = await getDictionary(lang);
  return (
    <footer className="py-7 px-6 border-t border-gray-100 dark:border-[#111]">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {name}
          </p>
          <p
            className={cn(
              "text-[11px] mt-0.5 text-gray-400 dark:text-gray-700",
              lang === "en" && "font-dm-mono",
            )}
          >
            © {new Date().getFullYear()} · {copyright}
          </p>
        </div>

        <p
          className={cn(
            "text-[11px] tracking-wide text-gray-400 dark:text-gray-700",
            lang === "en" && "font-dm-mono",
          )}
        >
          {builtWith}
        </p>

        <div className="flex gap-5">
          {quickLinks.map((s) => (
            <NavLink
              key={s}
              title={s}
              section="Contact"
              className={cn(
                "text-[12px] tracking-wide",
                "text-gray-400 dark:text-gray-600",
                "hover:text-cyan-600 dark:hover:text-cyan-400",
                "transition-colors bg-transparent border-none cursor-pointer",
                lang === "en" && "font-dm-mono",
              )}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
