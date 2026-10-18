"use client";

import { useEffect, useRef, useState } from "react";

/** Cycling "PM principles" panel. Hover a line to jump to it; pauses under reduced-motion. */
export default function Principles({ items }: { items: string[] }) {
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = String(items.length).padStart(2, "0");

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    if (r) return;
    timer.current = setInterval(() => setActive((k) => (k + 1) % items.length), 3200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [items.length]);

  // restart the progress bar each time the active line changes
  useEffect(() => {
    const el = bar.current;
    if (!el || reduce) return;
    el.classList.remove("run");
    void el.offsetWidth;
    el.classList.add("run");
  }, [active, reduce]);

  const jump = (i: number) => {
    setActive(i);
    if (reduce) return;
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setActive((k) => (k + 1) % items.length), 3200);
  };

  return (
    <aside className="prin rv" style={{ ["--i" as string]: 2 }} aria-label="PM principles">
      <div className="prin-h mono">
        <span>PM principles</span>
        <b aria-hidden="true">
          {String(active + 1).padStart(2, "0")}/{total}
        </b>
      </div>
      <ol>
        {items.map((p, i) => (
          <li key={p} className={i === active ? "on" : undefined} onMouseEnter={() => jump(i)}>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            {p}
          </li>
        ))}
      </ol>
      <div className="prog" aria-hidden="true">
        <i ref={bar} />
      </div>
    </aside>
  );
}
