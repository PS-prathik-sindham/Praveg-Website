"use client";

import { useEffect } from "react";

// Gates CSS entrance animations: elements with .reveal-up / masked-text stay
// paused (see globals.css) until they scroll into view, then get .in-view to
// run. Re-scans the DOM so dynamically added / route-changed content is covered.
const SELECTOR = ".reveal-up, .mtr-inner, .mtr-inner-fade";

export default function ScrollReveal() {
  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const seen = new WeakSet<Element>();

    const io =
      !reduce && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries, obs) => {
              for (const e of entries) {
                if (e.isIntersecting) {
                  e.target.classList.add("in-view");
                  obs.unobserve(e.target);
                }
              }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
          )
        : null;

    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (io) io.observe(el);
        else el.classList.add("in-view"); // reduced motion / no IO → just show
      });
    };

    scan();
    // catch elements added later (filters, route changes, etc.)
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io?.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
