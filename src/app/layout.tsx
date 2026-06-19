import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Poppins,
  Space_Grotesk,
  Inter,
  Manrope,
} from "next/font/google";
import "./globals.css";
import AgentationToolbar from "@/components/AgentationToolbar";

const plex = IBM_Plex_Sans({
  variable: "--font-plex-src",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono-src",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins-src",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk-src",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter-src",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope-src",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Praveg.ai — The agentic data platform",
  description:
    "Connect any source, build agents and workflows, and get answers you can trust — without the infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plex.variable} ${plexMono.variable} ${poppins.variable} ${grotesk.variable} ${inter.variable} ${manrope.variable} antialiased`}
    >
      <body>
        {children}
        <AgentationToolbar />
      </body>
    </html>
  );
}
