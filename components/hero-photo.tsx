import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroPhotoProps {
  photoFallback: string;
  photoBadge: string;
  lang?: "en" | "ar";
}

export default function HeroPhoto({
  photoFallback,
  photoBadge,
}: HeroPhotoProps) {
  return (
    <div className="size-full max-w-110 h-110 flex items-center justify-center overflow-hidden">
      <div
        className="hero-photo shrink-0 relative flex items-center justify-center
                      w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
      >
        <div
          className="pulse-ring absolute rounded-full border border-cyan-500/20"
          style={{ inset: "-40px" }}
        />
        <div
          className="pulse-ring absolute rounded-full border border-cyan-500/15"
          style={{ inset: "-20px", animationDelay: "1.75s" }}
        />
        <div
          className="geo-orbit absolute rounded-full border border-dashed border-cyan-500/15"
          style={{ inset: "-10px" }}
        />
        <div
          className="absolute rounded-full border border-cyan-500/10"
          style={{ inset: "-3px" }}
        />

        {/* Floating shapes — unchanged */}
        <div
          className="geo-float-a absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-cyan-500 opacity-60"
          style={{ boxShadow: "0 0 8px #6366f180" }}
        />
        <div className="geo-float-b absolute bottom-6 left-2 w-2.5 h-2.5 rounded-sm border-2 border-cyan-400 opacity-35" />
        <div
          className="geo-float-c absolute top-10 left-5 opacity-25"
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: "9px solid #6366f1",
          }}
        />
        <div
          className="geo-float-a absolute bottom-6 right-3 w-5 h-5 rounded-full border-2 border-cyan-400 opacity-25"
          style={{ animationDelay: "1.1s" }}
        />
        <div
          className="geo-float-b absolute left-0 top-1/2 w-3 h-3 opacity-25"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500 -translate-x-1/2" />
        </div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-9 h-px bg-cyan-500/20" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-9 h-px bg-cyan-500/20" />

        {/* Photo frame */}
        <div
          className={cn(
            "relative rounded-full flex items-center justify-center",
            "group transition-all duration-500",
            "w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72",
          )}
          style={{
            boxShadow:
              "0 0 0 1px #6366f13a, 0 0 0 6px #6366f10d, 0 0 60px #6366f118",
          }}
        >
          <Image
            width={208}
            height={208}
            src="/assets/profile-photo.jpeg"
            alt="Mohammad Hajeer"
            className={cn(
              "rounded-full object-cover object-top border-2 border-cyan-500/30",
              "relative z-10 transition-all duration-500 group-hover:scale-[1.02]",
              "w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 select-none",
            )}
            priority
          />

          <div
            className={cn(
              "w-52 h-52 rounded-full border-2 border-cyan-500/30",
              "hidden flex-col items-center justify-center gap-2",
              "bg-gray-100 dark:bg-[#111]",
              "text-gray-400 text-xs tracking-widest z-10 relative",
            )}
          >
            <span className="text-4xl">👤</span>
            <span>{photoFallback}</span>
          </div>
        </div>

        {/* Badge */}
        <div
          className={cn(
            "absolute -bottom-3 left-1/2 -translate-x-1/2 z-20",
            "flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap",
            "bg-white dark:bg-[#0c0c10]",
            "border border-gray-200 dark:border-[#1f1f2e]",
            "text-[11px] text-gray-500 dark:text-gray-400",
            "shadow-lg shadow-black/10 dark:shadow-black/60",
          )}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-cyan-500"
            style={{ boxShadow: "0 0 8px #6366f1aa" }}
          />
          {photoBadge}
        </div>
      </div>
    </div>
  );
}
