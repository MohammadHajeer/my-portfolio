"use client";

import { scrollTo } from "@/lib/utils";

interface NavLinkProps {
  title: string;
  section: string;
  className?: string;
}

export default function NavLink({ title, section, className }: NavLinkProps) {
  return (
    <button onClick={() => scrollTo(section)} className={className}>
      {title}
    </button>
  );
}
