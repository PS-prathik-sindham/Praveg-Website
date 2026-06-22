"use client";

import { useEffect, useRef, useState } from "react";

// Lightweight pdf.js viewer (no Framer runtime) styled like the Framer "PDF
// viewer" component: toolbar with zoom %, rotate, download, fullscreen, and
// page navigation. The worker is served from /public.
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfPage = {
  getViewport: (o: { scale: number; rotation?: number }) => { width: number; height: number };
  render: (o: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> };
};

export default function PdfViewer({
  src,
  className = "",
  initialPage = 1,
  height = 460,
  title = "RAW SOURCE · ANNUAL REPORT",
}: {
  src: string;
  className?: string;
  initialPage?: number;
  height?: number;
  title?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<PdfDoc | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pages, setPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc = (await pdfjs.getDocument({ url: src }).promise) as unknown as PdfDoc;
        if (cancelled) return;
        docRef.current = doc;
        setPages(doc.numPages);
        setPage(Math.min(Math.max(1, initialPage), doc.numPages));
        setStatus("ready");
      } catch (e) {
        if (!cancelled) {
          setErr(String((e as Error)?.message ?? e));
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src, initialPage]);

  useEffect(() => {
    if (status !== "ready" || !docRef.current) return;
    let cancelled = false;
    (async () => {
      const pg = await docRef.current!.getPage(page);
      if (cancelled) return;
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const base = pg.getViewport({ scale: 1, rotation });
      const availW = (wrap.clientWidth || 480) - 32;
      const availH = (wrap.clientHeight || height) - 32;
      const fit = Math.min(availW / base.width, availH / base.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scale = fit * zoom * dpr;
      const vp = pg.getViewport({ scale, rotation });
      canvas.width = vp.width;
      canvas.height = vp.height;
      canvas.style.width = `${vp.width / dpr}px`;
      canvas.style.height = `${vp.height / dpr}px`;
      await pg.render({ canvasContext: ctx, viewport: vp }).promise;
    })();
    return () => {
      cancelled = true;
    };
  }, [page, zoom, rotation, status, height]);

  const tool =
    "flex h-7 w-7 items-center justify-center rounded-md text-[#3d4757] transition-colors hover:bg-[#eef2f8] disabled:opacity-35 disabled:hover:bg-transparent";
  const disabled = status !== "ready";

  const fullscreen = () => {
    const el = rootRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div ref={rootRef} className={`overflow-hidden rounded-2xl bg-white ring-1 ring-[#eef1f6] ${className}`}>
      {/* toolbar */}
      <div className="flex items-center justify-between gap-2 border-b border-[#eef1f6] px-3 py-2">
        <span className="truncate text-[10.5px] font-medium tracking-wide text-[#9aa3b2]">{title}</span>
        <div className="flex items-center gap-0.5">
          <button className={tool} onClick={() => setRotation((r) => (r + 90) % 360)} disabled={disabled} aria-label="Rotate">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 9a8 8 0 0114-3m1-3v3h-3M20 15a8 8 0 01-14 3m-1 3v-3h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className={tool} onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.15).toFixed(2)))} disabled={disabled} aria-label="Zoom out">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <span className="w-10 text-center font-mono text-[11px] tabular-nums text-[#6b7585]">{Math.round(zoom * 100)}%</span>
          <button className={tool} onClick={() => setZoom((z) => Math.min(3, +(z + 0.15).toFixed(2)))} disabled={disabled} aria-label="Zoom in">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <span className="mx-1 h-4 w-px bg-[#eef1f6]" />
          <a className={tool} href={src} download aria-label="Download" title="Download">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <button className={tool} onClick={fullscreen} disabled={disabled} aria-label="Fullscreen">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      {/* page canvas */}
      <div ref={wrapRef} className="flex items-center justify-center overflow-auto bg-[#eef1f6]/60 p-4" style={{ height }}>
        {status === "loading" && <span className="text-[13px] text-[#9aa3b2]">Loading document…</span>}
        {status === "error" && (
          <span className="max-w-[280px] text-center text-[13px] leading-5 text-[#9aa3b2]">
            Couldn&rsquo;t load the PDF. Drop your file at <code className="font-mono text-[12px]">public{src}</code>.
            {err && <span className="mt-2 block break-all font-mono text-[10px] text-[#c0506a]">{err}</span>}
          </span>
        )}
        <canvas ref={canvasRef} className={`rounded-md bg-white shadow-[0_10px_30px_-12px_rgba(20,40,90,0.4)] ${status === "ready" ? "" : "hidden"}`} />
      </div>

      {/* page controls */}
      <div className="flex items-center justify-between border-t border-[#eef1f6] px-3 py-2">
        <button className={tool} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={disabled || page <= 1} aria-label="Previous page">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className="font-mono text-[12px] tabular-nums text-[#3d4757]">
          {status === "ready" ? `Page ${page} of ${pages}` : "—"}
        </span>
        <button className={tool} onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={disabled || page >= pages} aria-label="Next page">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
