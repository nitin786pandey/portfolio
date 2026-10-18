import type { CSSProperties } from "react";
import { formatDate, type Post } from "@/lib/posts";

/** A note card: 16:9 cover, date · read time, title, one-line subtitle. Links to the on-site article. */
export default function NoteCard({ post, i = 0, headingLevel = "h2" }: { post: Post; i?: number; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <a className="card note rv" style={{ "--i": i % 3 } as CSSProperties} href={`/notes/${post.slug}/`}>
      <div className="note-media" aria-hidden="true">
        {post.cover ? <img src={post.cover} alt="" loading="lazy" decoding="async" /> : <span className="note-ph" />}
      </div>
      <div className="note-body">
        <div className="dt mono">
          <time dateTime={post.date.slice(0, 10)}>{formatDate(post.date)}</time>
          <span>{post.readingMinutes} min read</span>
        </div>
        <H className="note-title">{post.title}</H>
        {post.subtitle && <p>{post.subtitle}</p>}
        <span className="go mono">Read →</span>
      </div>
    </a>
  );
}
