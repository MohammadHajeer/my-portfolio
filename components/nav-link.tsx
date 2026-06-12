"use client";

import { cn, scrollTo } from "@/lib/utils";

interface NavLinkProps {
  title: string;
  section: string;
  className?: string;
}

function NavLink({ title, section, className }: NavLinkProps) {
  return (
    <button
      onClick={() => scrollTo(section)}
      className={cn("select-none", className)}
    >
      {title}
    </button>
  );
}

export { NavLink };
