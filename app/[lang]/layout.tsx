import { ReactNode } from "react";
import { DM_Mono, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/lib/dictionaries";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "../globals.css";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

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

export default function RootLayout({
  children: hero,
  about,
  techStack,
  projects,
  workflow,
  quote,
  contact,
}: Readonly<{
  children: ReactNode;
  about: ReactNode;
  techStack: ReactNode;
  projects: ReactNode;
  workflow: ReactNode;
  quote: ReactNode;
  contact: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased font-dm-mono bg-gray-50 dark:bg-[#0a0a0a]
        text-gray-800 dark:text-gray-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <section
            id="hero"
            className="min-h-screen flex items-center pt-14 px-6"
          >
            {hero}
          </section>
          <section
            id="about"
            className="py-20 px-6 border-t border-gray-100 dark:border-[#111]"
          >
            {about}
          </section>
          <section
            id="stack"
            className="py-20 px-6 border-t border-gray-100 dark:border-[#111]"
          >
            {techStack}
          </section>
          <section
            id="projects"
            className="py-20 px-6 border-t border-gray-100 dark:border-[#111]"
          >
            {projects}
          </section>
          <section
            id="workflow"
            className="py-20 px-6 border-t border-gray-100 dark:border-[#111]"
          >
            {workflow}
          </section>
          <section className="py-20 px-6 border-t border-gray-100 dark:border-[#111]">
            {quote}
          </section>
          <section
            id="contact"
            className="py-20 px-6 border-t border-gray-100 dark:border-[#111]"
          >
            {contact}
          </section>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
