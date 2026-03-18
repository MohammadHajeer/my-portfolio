import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import Section from "@/components/section";
import CustomCursor from "@/components/custom-cursor";
import "../globals.css";
import CVDownloadButton from "@/components/cv-download-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.Metadata.title,
    description: dict.Metadata.description,
    openGraph: {
      title: dict.Metadata.title,
      description: dict.Metadata.ogDescription,
      url: `https://mohammadhajeer.vercel.app/${lang}`,
      type: "website",
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: "Mohammad Hajeer's Portfolio",
        },
      ],
    },
  };
}

export default async function RootLayout({
  params,
  header,
  children: hero,
  about,
  // techStack,
  projects,
  workflow,
  quote,
  contact,
  footer,
  // timeline
}: Readonly<{
  params: Promise<{ lang: "en" | "ar" }>;
  header?: ReactNode;
  children: ReactNode;
  about?: ReactNode;
  // techStack?: ReactNode;
  projects?: ReactNode;
  workflow?: ReactNode;
  quote?: ReactNode;
  contact?: ReactNode;
  footer?: ReactNode;
  // timeline?: ReactNode;
}>) {
  const { lang } = await params;
  return (
    <>
      <main
        lang={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={cn(
          "antialiased bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-200",
          lang === "ar" ? "font-ibm-plex-arabic!" : "font-dm-sans!",
        )}
      >
        {header}
        <section
          id="hero"
          className="min-h-screen flex items-center pt-14 px-6"
        >
          {hero}
        </section>
        <Section id="about">{about}</Section>
        {/* <Section id="stack">{techStack}</Section> */}
        <Section id="projects">{projects}</Section>
        <Section id="workflow">{workflow}</Section>
        <Section id="quote">{quote}</Section>
        <Section id="contact">{contact}</Section>
        {/* <Section id="timeline">{timeline}</Section> */}
        {footer}
      </main>
      <CustomCursor />
      {/* <CVDownloadButton lang={lang} cvUrl="/assets/Mohammad_Hajeer.pdf" /> */}
    </>
  );
}
