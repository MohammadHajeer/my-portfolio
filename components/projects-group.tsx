"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "./fade-in";
import { ProjectCard } from "./project-card";
import { ProjectPreviewModal } from "./project-preview-modal";

interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  title: string;
  desc: string;
  details?: string;
  features?: string[];
  tags: string[];
  status: string;
  period?: string;
  images?: ProjectImage[];
}

interface GalleryLabels {
  imageCount: string;
  close: string;
  previous: string;
  next: string;
  viewImage: string;
  detailedDescription: string;
  keyFeatures: string;
}

function ProjectsGroup({
  projects,
  galleryLabels,
  lang = "en",
}: {
  projects: Project[];
  galleryLabels: GalleryLabels;
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
          desc={selected.desc}
          details={selected.details}
          features={selected.features}
          tags={selected.tags}
          images={selected.images || []}
          labels={galleryLabels}
          lang={lang}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

export { ProjectsGroup };
