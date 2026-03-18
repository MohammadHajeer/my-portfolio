"use client";

import { PROJECTS } from "@/lib/constants";
import { useEffect, useState } from "react";
import FadeIn from "./fade-in";
import ProjectCard from "./project-card";
import ProjectPreviewModal from "./project-preview-modal";

type Project = (typeof PROJECTS)[number] & { images?: string[] };

export default function ProjectsGroup({
  projects,
  lang = "en",
}: {
  projects: typeof PROJECTS;
  lang?: "en" | "ar";
}) {
  const [selected, setSelected] = useState<Project | null>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(projects as Project[])?.map((p, i) => (
          <FadeIn key={p.title} delay={i * 80}>
            <ProjectCard
              {...p}
              lang={lang}
              onClick={() => {
                setSelected(p);
              }}
            />
          </FadeIn>
        ))}
      </div>

      {/* ── Modal ─────────────────────────────────────────── */}
      {selected && (
        <ProjectPreviewModal
          title={selected.title}
          desc={selected.desc}
          tags={selected.tags}
          images={selected.images || []}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
