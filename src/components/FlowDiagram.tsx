import fs from "node:fs";
import path from "node:path";
import InteractiveChips from "./InteractiveChips";
import SourceChips from "./SourceChips";

// Two layers:
//  - flow-lines.svg : the woven flow lines (animated shimmer)
//  - diagram-base.svg: the centre cube chip + dotted grid + source icons
// plus the animated InteractiveChips and the left SourceChips pills.
const dir = path.join(process.cwd(), "src/assets");
const lines = fs.readFileSync(path.join(dir, "flow-lines.svg"), "utf8");
const base = fs.readFileSync(path.join(dir, "diagram-base.svg"), "utf8");

// Framer "Animated Flow Paths", a white shimmer segment travels along each
// connector line. We reuse the same 5 line geometries from flow-lines.svg and
// drive them with the `.flow-pulses` animation already defined in globals.css.
const uniquePaths = Array.from(
  new Set(Array.from(lines.matchAll(/<path d="([^"]+)"/g), (m) => m[1]))
);
const pulses = `<svg class="flow-pulses" viewBox="0 0 1097 246" fill="none" preserveAspectRatio="xMidYMid meet" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible">${uniquePaths
  .map((d) => `<path d="${d}" pathLength="100"/>`)
  .join("")}</svg>`;

export default function FlowDiagram({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="flow-lines-layer">
        <div dangerouslySetInnerHTML={{ __html: lines }} />
        <div dangerouslySetInnerHTML={{ __html: pulses }} />
      </div>
      <div className="flow-base-layer" dangerouslySetInnerHTML={{ __html: base }} />
      <div className="cube-chip">
        <img src="/assets/cube.svg" alt="" width={180} height={180} />
      </div>
      {/* updated right-side source icons (Figma 147-1036), exactly over the old ones */}
      <div className="pointer-events-none absolute inset-0 z-[3]">
        {[
          { src: "doc1", cx: 96.6, cy: 36.0, w: 3.9 },
          { src: "doc2", cx: 96.7, cy: 44.8, w: 5.0 },
          { src: "gmail", cx: 97.4, cy: 53.2, w: 4.6 },
          { src: "chart", cx: 97.6, cy: 60.9, w: 4.4 },
          { src: "calendar", cx: 98.0, cy: 68.4, w: 4.3 },
        ].map((i) => (
          <img
            key={i.src}
            src={`/assets/flowicons/${i.src}.png`}
            alt=""
            className="absolute"
            style={{ left: `${i.cx}%`, top: `${i.cy}%`, width: `${i.w}%`, transform: "translate(-50%,-50%)" }}
          />
        ))}
      </div>
      <InteractiveChips />
      <SourceChips />
    </div>
  );
}
