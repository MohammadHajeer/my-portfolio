import { ProjectsGroup, SectionHeader } from "@/components";
import { getDictionary } from "@/lib/dictionaries";

export default async function Projects({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const { Projects: projects } = await getDictionary(lang);
  return (
    <>
      <SectionHeader
        lang={lang}
        label={projects.sectionLabel}
        heading={projects.heading}
      />
      <ProjectsGroup
        projects={projects.items}
        galleryLabels={projects.gallery}
        lang={lang}
      />
    </>
  );
}
