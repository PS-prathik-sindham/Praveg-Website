import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import AgentationToolbar from "@/components/AgentationToolbar";
import ScrollReveal from "@/components/ScrollReveal";

// Two-font system: Manrope (body / subtext) + Helvetica (headers, system font).
// Mono is retained only for code/terminal blocks.
const manrope = Manrope({
  variable: "--font-manrope-src",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono-src",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Praveg.ai, The agentic data platform",
  description:
    "Connect any source, build agents and workflows, and get answers you can trust, without the infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plexMono.variable} antialiased`}
    >
      <body>
        {children}
        <ScrollReveal />
        <AgentationToolbar />
      </body>
    </html>
  );
}
