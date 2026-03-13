"use client";

import { cn } from "@/lib/utils";
import { MouseEvent, useState } from "react";

interface CopyToClipboardProps {
  text: string;
  lang?: "en" | "ar";
}

export default function CopyToClipboard({
  text,
  lang = "en",
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);
  const copyText = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const copiedLabel = lang === "en" ? "Copied!" : "تم النسخ!";
  const copyLabel = lang === "en" ? "Copy" : "نسخ";
  return (
    <button
      onClick={copyText}
      className={cn(
        "text-xs font-dm-mono transition-colors duration-200",
        lang === "en" ? "ml-auto" : "mr-auto",
        copied
          ? "text-green-500"
          : "text-gray-400 dark:text-gray-600 group-hover:text-cyan-500 dark:group-hover:text-cyan-400",
      )}
    >
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
