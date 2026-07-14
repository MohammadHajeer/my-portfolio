"use client";

import type { Project, ProjectGalleryLabels } from "@/lib/project-types";
import { useEffect, useState } from "react";
import { FadeIn } from "./fade-in";
import { ProjectCard } from "./project-card";
import { ProjectPreviewModal } from "./project-preview-modal";

function ProjectsGroup({
  projects,
  galleryLabels,
  lang = "en",
}: {
  projects: Project[];
  galleryLabels: ProjectGalleryLabels;
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
        {projects.map((p, i) => (
          <FadeIn key={p.title} delay={i * 80}>
            <ProjectCard
              {...p}
              lang={lang}
              imageCountLabel={galleryLabels.imageCount}
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
          shortDescription={selected.shortDescription}
          description={selected.description}
          features={selected.features}
          technologies={selected.technologies}
          repoUrl={selected.repoUrl}
          liveUrl={selected.liveUrl}
          images={selected.images}
          labels={galleryLabels}
          lang={lang}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

export { ProjectsGroup };
