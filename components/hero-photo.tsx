import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroPhotoProps {
  photoFallback: string;
  photoBadge: string;
}

export default function HeroPhoto({
  photoFallback,
  photoBadge,
}: HeroPhotoProps) {
  return (
    <div className="hero-photo shrink-0 relative size-100 flex items-center justify-center">
      <div
        className={cn(
          "pulse-ring absolute rounded-full",
          "border border-cyan-500/20",
        )}
        style={{ inset: "-40px" }}
      />
      <div
        className={cn(
          "pulse-ring absolute rounded-full",
          "border border-cyan-500/15",
        )}
        style={{ inset: "-20px", animationDelay: "1.75s" }}
      />
      <div
        className={cn(
          "geo-orbit absolute rounded-full",
          "border border-dashed border-cyan-500/15",
        )}
        style={{ inset: "-10px" }}
      />
      <div
        className={cn("absolute rounded-full", "border border-cyan-500/10")}
        style={{ inset: "-3px" }}
      />

      {/* Floating shapes */}
      <div
        className={cn(
          "geo-float-a absolute top-4 right-4",
          "w-2.5 h-2.5 rounded-full bg-cyan-500 opacity-60",
        )}
        style={{ boxShadow: "0 0 8px #6366f180" }}
      />
      <div
        className={cn(
          "geo-float-b absolute bottom-6 left-2",
          "w-2.5 h-2.5 rounded-sm border-2 border-cyan-400 opacity-35",
        )}
      />
      <div
        className={cn("geo-float-c absolute top-10 left-5", "opacity-25")}
        style={{
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: "9px solid #6366f1",
        }}
      />
      <div
        className={cn(
          "geo-float-a absolute bottom-6 right-3",
          "w-5 h-5 rounded-full border-2 border-cyan-400 opacity-25",
        )}
        style={{ animationDelay: "1.1s" }}
      />
      <div
        className={cn(
          "geo-float-b absolute left-0 top-1/2",
          "w-3 h-3 opacity-25",
        )}
        style={{ animationDelay: "0.6s" }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500 -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500 -translate-x-1/2" />
      </div>
      <div
        className={cn(
          "absolute -top-2 left-1/2",
          "-translate-x-1/2 w-9 h-px bg-cyan-500/20",
        )}
      />
      <div
        className={cn(
          "absolute -bottom-2 left-1/2",
          "-translate-x-1/2 w-9 h-px bg-cyan-500/20",
        )}
      />

      {/* Photo frame */}
      <div
        className={cn(
          "relative size-80 rounded-full flex items-center justify-center",
          "group transition-all duration-500",
        )}
        style={{
          boxShadow:
            "0 0 0 1px #6366f13a, 0 0 0 6px #6366f10d, 0 0 60px #6366f118",
        }}
      >
        <Image
          width={300}
          height={300}
          src="/assets/profile-photo.jpeg"
          alt="Mohammad Hajeer"
          className={cn(
            "size-75 rounded-full object-cover object-top",
            "border-2 border-cyan-500/30 relative z-10",
            "transition-all duration-500 group-hover:scale-[1.02]",
          )}
          // onError={(e) => {
          //   const target = e.target as HTMLImageElement;
          //   target.style.display = "none";
          //   (target.nextSibling as HTMLElement).style.display = "flex";
          // }}
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
  );
}
