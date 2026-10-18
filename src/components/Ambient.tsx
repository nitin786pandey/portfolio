"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Fixed background layers from the v2 draft:
 * - dot grid
 * - a violet "lens" that lights up the grid under the cursor, plus a soft halo
 * - a ripple across the grid on every click/tap (canvas)
 * Also drives the staggered `.rv` reveals.
 * Everything is skipped under prefers-reduced-motion (CSS hides the layers too).
 */
export default function Ambient() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const cleanups: Array<() => void> = [];

    // Reveals
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      els.forEach((e) => {
        if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add("in");
        else io.observe(e);
      });
      cleanups.push(() => io.disconnect());
    }

    if (reduce) return () => cleanups.forEach((f) => f());

    // Cursor lens (eased follow)
    let tx = window.innerWidth / 2,
      ty = window.innerHeight * 0.3,
      cx = tx,
      cy = ty,
      raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      root.style.setProperty("--mx", cx + "px");
      root.style.setProperty("--my", cy + "px");
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    });

    // Ripple on the dot grid
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) {
      const G = 24;
      let W = 0,
        H = 0,
        run = 0;
      let rings: { x: number; y: number; t: number }[] = [];
      const size = () => {
        const dpr = window.devicePixelRatio || 1;
        W = window.innerWidth;
        H = window.innerHeight;
        c.width = W * dpr;
        c.height = H * dpr;
        c.style.width = W + "px";
        c.style.height = H + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      size();
      const draw = (t: number) => {
        ctx.clearRect(0, 0, W, H);
        rings = rings.filter((r) => t - r.t < 1100);
        for (const r of rings) {
          const p = (t - r.t) / 1100,
            rad = p * 320,
            w = 40,
            a = 1 - p;
          const x0 = Math.floor((r.x - rad - w) / G) * G,
            x1 = r.x + rad + w,
            y0 = Math.floor((r.y - rad - w) / G) * G,
            y1 = r.y + rad + w;
          for (let gx = x0; gx < x1; gx += G)
            for (let gy = y0; gy < y1; gy += G) {
              const d = Math.hypot(gx - r.x, gy - r.y),
                f = 1 - Math.abs(d - rad) / w;
              if (f > 0) {
                ctx.fillStyle = `rgba(124,92,255,${(f * a * 0.9).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(gx + 0.5, gy + 0.5, 1 + f * 1.6, 0, 7);
                ctx.fill();
              }
            }
        }
        run = rings.length ? requestAnimationFrame(draw) : 0;
      };
      const onDown = (e: PointerEvent) => {
        rings.push({ x: e.clientX, y: e.clientY, t: performance.now() });
        if (!run) run = requestAnimationFrame(draw);
      };
      window.addEventListener("resize", size);
      window.addEventListener("pointerdown", onDown);
      cleanups.push(() => {
        window.removeEventListener("resize", size);
        window.removeEventListener("pointerdown", onDown);
        cancelAnimationFrame(run);
      });
    }

    return () => cleanups.forEach((f) => f());
  }, [pathname]);

  return (
    <>
      <div className="dotgrid" aria-hidden="true" />
      <div className="lens" aria-hidden="true" />
      <div className="halo" aria-hidden="true" />
      <canvas id="rip" ref={canvas} aria-hidden="true" />
    </>
  );
}
