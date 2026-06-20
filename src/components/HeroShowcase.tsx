// Hero showcase, Figma node 183:496: the Praveg.ai app shown in a macOS
// browser window over a mountain wallpaper. Exported from Figma at 2x and
// rendered responsively at the frame's native 1200×750 (8:5) aspect ratio.
export default function HeroShowcase() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(20,40,90,0.35)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/hero/showcase.png"
        alt="Praveg.ai agent workspace preview"
        width={1200}
        height={750}
        className="block h-auto w-full"
      />
    </div>
  );
}
