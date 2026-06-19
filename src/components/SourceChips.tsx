"use client";

import Image from "next/image";

// Coded gradient pills (designed in Figma) with brand-logo images in the badge.
// Each pill's vertical centre aligns to the start of its flow line.
const SOURCES = [
  { name: "Snowflakes", logo: "snowflake", top: 36.4 },
  { name: "PostgreSQL", logo: "postgresql", top: 44.2 },
  { name: "S3  GCS", logo: "s3", top: 52.1 },
  { name: "MongoDB", logo: "mongodb", top: 59.8 },
  { name: "Google Drive", logo: "googledrive", top: 67.7 },
];

export default function SourceChips() {
  return (
    <div className="source-chips-overlay">
      {SOURCES.map((s) => (
        <div className="source-pill" key={s.name} style={{ top: `${s.top}%` }}>
          <span className="source-pill-badge">
            <Image src={`/assets/logos/${s.logo}.png`} alt="" width={144} height={144} />
          </span>
          <span className="source-pill-label">{s.name}</span>
        </div>
      ))}
    </div>
  );
}
