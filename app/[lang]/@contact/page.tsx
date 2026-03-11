"use client";

import { useState } from "react";
import FadeIn from "@/components/fade-in";
import SectionLabel from "@/components/section-label";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("hello@ahmadalrashid.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="max-w-xl mx-auto">
      <FadeIn>
        <SectionLabel text="contact" />
        <h2
          className="font-dm-sans text-3xl sm:text-4xl font-bold tracking-tight mb-3
                                 text-gray-900 dark:text-gray-50"
        >
          Let&apos;s build together
        </h2>
        <p className="font-dm-sans text-sm mb-10 text-gray-400 dark:text-gray-500">
          Open to full-time roles, freelance projects, and interesting
          collaborations.
        </p>
      </FadeIn>

      <div className="flex flex-col gap-3">
        {[
          {
            icon: "in",
            label: "LinkedIn",
            sub: "linkedin.com/in/ahmad-alrashid",
            href: "https://linkedin.com",
          },
          {
            icon: "⑂",
            label: "GitHub",
            sub: "github.com/ahmad-dev",
            href: "https://github.com",
          },
        ].map((c, i) => (
          <FadeIn key={c.label} delay={i * 80}>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "flex items-center gap-4 px-5 py-4 rounded-lg no-underline group",
                "bg-white dark:bg-[#111]",
                "border border-gray-200 dark:border-[#1f1f1f]",
                "text-gray-800 dark:text-gray-200",
                "hover:border-cyan-500 hover:translate-x-1",
                "transition-all duration-200",
                "shadow-sm dark:shadow-none",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center text-sm shrink-0",
                  "bg-gray-100 dark:bg-[#1a1a1a]",
                  "border border-gray-200 dark:border-[#2a2a2a]",
                  "text-cyan-600 dark:text-cyan-400",
                )}
              >
                {c.icon}
              </div>
              <div>
                <div
                  className={cn(
                    "font-dm-sans text-sm font-medium",
                    "text-gray-900 dark:text-gray-100",
                  )}
                >
                  {c.label}
                </div>
                <div
                  className={cn(
                    "text-xs mt-0.5 font-dm-mono",
                    "text-gray-400 dark:text-gray-600",
                  )}
                >
                  {c.sub}
                </div>
              </div>
              <span
                className={cn(
                  "ml-auto text-lg transition-colors duration-200",
                  "text-gray-300 dark:text-gray-700",
                  "group-hover:text-cyan-500 dark:group-hover:text-cyan-400",
                )}
              >
                →
              </span>
            </a>
          </FadeIn>
        ))}

        <FadeIn delay={160}>
          <button
            onClick={copyEmail}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-lg text-left cursor-pointer group",
              "bg-white dark:bg-[#111]",
              "border border-gray-200 dark:border-[#1f1f1f]",
              "hover:border-cyan-500 hover:translate-x-1",
              "transition-all duration-200",
              "shadow-sm dark:shadow-none",
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center text-sm shrink-0",
                "bg-gray-100 dark:bg-[#1a1a1a]",
                "border border-gray-200 dark:border-[#2a2a2a]",
                "text-cyan-600 dark:text-cyan-400",
              )}
            >
              @
            </div>
            <div>
              <div
                className={cn(
                  "font-dm-sans text-sm font-medium",
                  "text-gray-900 dark:text-gray-100",
                )}
              >
                Email
              </div>
              <div
                className={cn(
                  "text-xs mt-0.5 font-dm-mono",
                  "text-gray-400 dark:text-gray-600",
                )}
              >
                hello@ahmadalrashid.dev
              </div>
            </div>
            <span
              className={cn(
                "ml-auto text-xs font-dm-mono transition-colors duration-200",
                copied
                  ? "text-green-500"
                  : "text-gray-400 dark:text-gray-600 group-hover:text-cyan-500 dark:group-hover:text-cyan-400",
              )}
            >
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </FadeIn>
      </div>
    </div>
  );
}
