"use client";

import { useMemo, useState } from "react";
import NoteCard from "./NoteCard";
import type { Post } from "@/lib/posts";

/** Grid of all notes with a quick client-side search (title + subtitle). */
export default function NotesIndex({ posts }: { posts: Post[] }) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return posts;
    return posts.filter((p) => `${p.title} ${p.subtitle} ${p.description}`.toLowerCase().includes(t));
  }, [q, posts]);

  return (
    <>
      <div className="notes-search rv" style={{ "--i": 2 } as React.CSSProperties}>
        <label htmlFor="note-q" className="sr-only">
          Search notes
        </label>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          id="note-q"
          className="mono"
          type="search"
          placeholder="Search notes"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
        />
        <span className="mono notes-count" aria-live="polite">
          {shown.length} of {posts.length}
        </span>
      </div>
      <div className="notes notes-all">
        {shown.map((p, i) => (
          <NoteCard post={p} i={i} key={p.slug} />
        ))}
      </div>
      {shown.length === 0 && <p className="notes-empty mono">No notes match.</p>}
    </>
  );
}
