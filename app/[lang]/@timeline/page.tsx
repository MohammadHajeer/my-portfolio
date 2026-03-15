"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type TimelineItem =
  | {
      kind: "education";
      year: string;
      degree: string;
      institution: string;
      location: string;
      desc: string;
    }
  | {
      kind: "certification";
      year: string;
      title: string;
      issuer: string;
      credentialId?: string;
      desc: string;
    };

type Skill = { name: string; level: number; category: string };

// ─── Data (swap with your real data) ─────────────────────────────────────────

const TIMELINE: TimelineItem[] = [
  {
    kind: "education",
    year: "2021 – 2024",
    degree: "B.Sc. Computer Science",
    institution: "Lebanese American University",
    location: "Beirut, LB",
    desc: "Focused on software engineering, algorithms, and distributed systems. Graduated with honors.",
  },
  {
    kind: "education",
    year: "2020 – 2021",
    degree: "Foundation Year — Engineering",
    institution: "Lebanese University",
    location: "Sidon, LB",
    desc: "Core engineering fundamentals: mathematics, physics, and introductory programming.",
  },
  {
    kind: "certification",
    year: "2024",
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    credentialId: "AWS-DEV-2024",
    desc: "Cloud-native development, serverless architectures, and AWS service integration.",
  },
  {
    kind: "certification",
    year: "2023",
    title: "Meta Front-End Developer",
    issuer: "Meta / Coursera",
    desc: "Advanced React patterns, accessibility, and performance optimization.",
  },
];

const SKILLS: Skill[] = [
  { name: "TypeScript", level: 90, category: "lang" },
  { name: "Python",     level: 82, category: "lang" },
  { name: "Rust",       level: 48, category: "lang" },
  { name: "SQL",        level: 75, category: "lang" },

  { name: "React",      level: 92, category: "framework" },
  { name: "Next.js",    level: 88, category: "framework" },
  { name: "Node.js",    level: 80, category: "framework" },
  { name: "FastAPI",    level: 70, category: "framework" },

  { name: "Docker",     level: 72, category: "tool" },
  { name: "AWS",        level: 65, category: "tool" },
  { name: "Git",        level: 95, category: "tool" },
  { name: "PostgreSQL", level: 78, category: "tool" },
];

const SKILL_CATEGORIES = ["all", "lang", "framework", "tool"] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function TerminalLine({
  prefix,
  value,
  dimPrefix = true,
}: {
  prefix: string;
  value: string;
  dimPrefix?: boolean;
}) {
  return (
    <p className="font-dm-mono text-[12px] leading-relaxed flex gap-2">
      <span
        className={cn(
          "shrink-0",
          dimPrefix ? "text-gray-500 dark:text-gray-600" : "text-cyan-500",
        )}
      >
        {prefix}
      </span>
      <span className="text-gray-700 dark:text-gray-300">{value}</span>
    </p>
  );
}

function NodeDot({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "relative flex items-center justify-center w-8 h-8 shrink-0",
        "rounded-full border transition-all duration-300",
        active
          ? "border-cyan-400 dark:border-cyan-500 bg-cyan-50 dark:bg-cyan-950"
          : "border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111]",
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-300",
          active ? "bg-cyan-400 dark:bg-cyan-500" : "bg-gray-300 dark:bg-[#333]",
        )}
      />
      {active && (
        <span className="absolute inset-0 rounded-full border border-cyan-400/40 dark:border-cyan-500/30 animate-ping" />
      )}
    </span>
  );
}

function EducationCard({
  item,
  active,
  onClick,
}: {
  item: Extract<TimelineItem, { kind: "education" }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl p-5 border transition-all duration-200",
        "bg-white dark:bg-[#0e0e0e]",
        active
          ? "border-cyan-400 dark:border-cyan-500/40 shadow-sm"
          : "border-gray-200 dark:border-[#1f1f1f] hover:border-cyan-300 dark:hover:border-cyan-800",
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-dm-mono text-[10px] text-cyan-500 dark:text-cyan-400 tracking-widest uppercase mb-1">
            {item.year}
          </p>
          <h3 className="font-dm-sans font-semibold text-sm text-gray-900 dark:text-gray-50">
            {item.degree}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 text-[10px] px-2 py-0.5 rounded font-dm-mono tracking-widest uppercase",
            "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
            "border border-purple-200 dark:border-purple-900",
          )}
        >
          edu
        </span>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          active ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="pt-3 border-t border-gray-100 dark:border-[#1a1a1a] space-y-1.5">
          <TerminalLine prefix="institution" value={item.institution} />
          <TerminalLine prefix="location   " value={item.location} />
          <TerminalLine prefix="desc       " value={item.desc} />
        </div>
      </div>

      {!active && (
        <p className="font-dm-sans text-[12px] text-gray-500 dark:text-gray-500 mt-1">
          {item.institution} · {item.location}
        </p>
      )}
    </button>
  );
}

function CertCard({
  item,
  active,
  onClick,
}: {
  item: Extract<TimelineItem, { kind: "certification" }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl p-5 border transition-all duration-200",
        "bg-white dark:bg-[#0e0e0e]",
        active
          ? "border-cyan-400 dark:border-cyan-500/40 shadow-sm"
          : "border-gray-200 dark:border-[#1f1f1f] hover:border-cyan-300 dark:hover:border-cyan-800",
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-dm-mono text-[10px] text-cyan-500 dark:text-cyan-400 tracking-widest uppercase mb-1">
            {item.year}
          </p>
          <h3 className="font-dm-sans font-semibold text-sm text-gray-900 dark:text-gray-50">
            {item.title}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 text-[10px] px-2 py-0.5 rounded font-dm-mono tracking-widest uppercase",
            "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
            "border border-amber-200 dark:border-amber-900",
          )}
        >
          cert
        </span>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          active ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="pt-3 border-t border-gray-100 dark:border-[#1a1a1a] space-y-1.5">
          <TerminalLine prefix="issuer    " value={item.issuer} />
          {item.credentialId && (
            <TerminalLine prefix="id        " value={item.credentialId} />
          )}
          <TerminalLine prefix="desc      " value={item.desc} />
        </div>
      </div>

      {!active && (
        <p className="font-dm-sans text-[12px] text-gray-500 dark:text-gray-500 mt-1">
          {item.issuer}
        </p>
      )}
    </button>
  );
}

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-dm-mono text-[11px] text-gray-600 dark:text-gray-400 w-24 shrink-0 truncate">
        {skill.name}
      </span>
      <div className="flex-1 h-1 rounded-full bg-gray-100 dark:bg-[#1a1a1a] overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-cyan-400 to-cyan-600 dark:from-cyan-500 dark:to-cyan-400"
          style={{ width: `${skill.level}%` }}
        />
      </div>
      <span className="font-dm-mono text-[10px] text-gray-400 dark:text-gray-600 w-8 text-right shrink-0">
        {skill.level}%
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CV() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [skillFilter, setSkillFilter] =
    useState<(typeof SKILL_CATEGORIES)[number]>("all");

  const filteredSkills =
    skillFilter === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === skillFilter);

  return (
    <div className="space-y-12">

      {/* ── Terminal header ── */}
      <div
        className={cn(
          "rounded-xl border border-gray-200 dark:border-[#1f1f1f]",
          "bg-white dark:bg-[#0a0a0a] overflow-hidden",
        )}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 dark:border-[#1a1a1a]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <span className="font-dm-mono text-[11px] text-gray-400 dark:text-gray-600 ml-2 tracking-wider">
            ~/portfolio/cv.json
          </span>
        </div>
        <div className="px-5 py-4 space-y-1">
          <p className="font-dm-mono text-[12px] text-gray-400 dark:text-gray-600">
            <span className="text-cyan-500">$</span> cat cv.json
          </p>
          <TerminalLine prefix="name       " value="Your Name" dimPrefix />
          <TerminalLine prefix="role       " value="Full-Stack Engineer" dimPrefix />
          <TerminalLine prefix="location   " value="Sidon, Lebanon" dimPrefix />
          <TerminalLine prefix="available  " value="true" dimPrefix />
          <p className="font-dm-mono text-[12px]">
            <span className="text-gray-500 dark:text-gray-600">sections    </span>
            <span className="text-cyan-400 dark:text-cyan-500">
              [&quot;education&quot;, &quot;skills&quot;, &quot;certifications&quot;]
            </span>
          </p>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div>
        <p className="font-dm-mono text-[11px] text-gray-400 dark:text-gray-600 tracking-widest uppercase mb-6">
          <span className="text-cyan-500">▸</span> timeline
        </p>

        <div className="relative">
          {/* Vertical rail */}
          <div className="absolute left-3.75 top-4 bottom-4 w-px bg-gray-100 dark:bg-[#1f1f1f]" />

          <div className="space-y-6 pl-12">
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative">
                {/* Node */}
                <div className="absolute -left-12 top-4">
                  <NodeDot active={activeIdx === i} />
                </div>

                {item.kind === "education" ? (
                  <EducationCard
                    item={item}
                    active={activeIdx === i}
                    onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  />
                ) : (
                  <CertCard
                    item={item}
                    active={activeIdx === i}
                    onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skills ── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="font-dm-mono text-[11px] text-gray-400 dark:text-gray-600 tracking-widest uppercase">
            <span className="text-cyan-500">▸</span> skills
          </p>
          {/* Filter pills */}
          <div className="flex gap-1.5">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSkillFilter(cat)}
                className={cn(
                  "text-[10px] px-2.5 py-1 rounded font-dm-mono tracking-widest uppercase transition-all",
                  skillFilter === cat
                    ? "bg-cyan-500 text-white border border-cyan-500"
                    : "bg-transparent text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-[#2a2a2a] hover:border-cyan-300",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "rounded-xl border border-gray-200 dark:border-[#1f1f1f]",
            "bg-white dark:bg-[#0e0e0e] p-5 space-y-3",
          )}
        >
          {filteredSkills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}