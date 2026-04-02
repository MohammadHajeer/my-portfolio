import React from "react";
import { cn } from "@/lib/utils";
import { DM_Mono, DM_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import "./globals.css";
import { baseUrl } from "@/lib/constants";

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
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  verification: {
    google: "gEbPeRBOYIbeVwlIFk64h4DXqVT1RY2_-kQ5Ha737t8",
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  openGraph: {
    images: [
      {
        url: `${baseUrl}/assets/en-og.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(dmMono.variable, dmSans.variable, ibmPlexArabic.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
