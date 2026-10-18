import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Ambient from "@/components/Ambient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { formatDate, getPost, posts, publication } from "@/lib/posts";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const desc = post.subtitle || post.description;
  return {
    title: `${post.title} · Nitin Pandey`,
    description: desc,
    // The Substack post is the original; point search engines at it.
    alternates: { canonical: post.url },
    openGraph: {
      type: "article",
      title: post.title,
      description: desc,
      url: `/notes/${post.slug}/`,
      publishedTime: post.date,
      authors: ["Nitin Pandey"],
      images: post.cover ? [post.cover] : ["/og.png"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: desc, images: post.cover ? [post.cover] : ["/og.png"] },
  };
}

const v = (o: Record<string, number>) => o as CSSProperties;

export default async function NotePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const newer = posts[idx - 1];
  const older = posts[idx + 1];
  // Substack posts often open with their own lead image; skip the cover then so it isn't shown twice.
  const showCover = !!post.cover && !post.html.trimStart().startsWith("<figure");
  const toc = post.toc.filter((t) => t.level === 2).length >= 2 ? post.toc.filter((t) => t.level === 2) : post.toc;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.subtitle || post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Nitin Pandey" },
    mainEntityOfPage: post.url,
    image: post.coverRemote ?? undefined,
  };

  return (
    <>
      <a href="#article" className="skip mono">
        Skip to article
      </a>
      <Ambient />
      <Nav home={false} current="notes" />
      <main id="top">
        <div className="wrap">
          <article className="note-page" id="article">
            <header className="note-head">
              <a className="back mono rv" href="/notes/">
                ← Notes
              </a>
              <div className="ey mono rv" style={v({ "--i": 1 })}>
                Note · {publication.name}
              </div>
              <h1 className="note-h1 rv" style={v({ "--i": 1 })}>
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="note-dek rv" style={v({ "--i": 2 })}>
                  {post.subtitle}
                </p>
              )}
              <div className="note-meta mono rv" style={v({ "--i": 3 })}>
                <span>Written by Nitin Pandey</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date.slice(0, 10)}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
                <a className="orig" href={post.url} target="_blank" rel="noopener noreferrer">
                  Read on Substack ↗
                </a>
              </div>
            </header>

            {showCover && (
              <figure className="note-cover rv" style={v({ "--i": 3 })}>
                <img src={post.cover ?? undefined} alt="" />
              </figure>
            )}

            <div className={toc.length ? "note-grid" : "note-grid no-toc"}>
              {toc.length > 0 && (
                <aside className="toc" aria-label="On this page">
                  <details className="toc-m">
                    <summary className="mono">Jump to section</summary>
                    <ol>
                      {toc.map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`}>{t.text}</a>
                        </li>
                      ))}
                    </ol>
                  </details>
                  <div className="toc-d">
                    <div className="toc-h mono">On this page</div>
                    <ol>
                      {toc.map((t) => (
                        <li key={t.id} className={t.level === 3 ? "l3" : undefined}>
                          <a href={`#${t.id}`}>{t.text}</a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </aside>
              )}
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>

            <div className="note-foot">
              <div className="orig-card">
                <div>
                  <div className="ey mono">Originally published</div>
                  <p>
                    This note first appeared on {publication.name}, {formatDate(post.date)}.
                  </p>
                </div>
                <div className="btns mono" style={{ margin: 0 }}>
                  <a className="btn pr" href={post.url} target="_blank" rel="noopener noreferrer">
                    Read on Substack ↗
                  </a>
                  <a className="btn" href={`${publication.url}/subscribe`} target="_blank" rel="noopener noreferrer">
                    Subscribe
                  </a>
                </div>
              </div>
              <div className="pn" role="navigation" aria-label="More notes">
                {newer ? (
                  <a className="card pn-a" href={`/notes/${newer.slug}/`}>
                    <span className="mono">← Newer</span>
                    <b>{newer.title}</b>
                  </a>
                ) : (
                  <span />
                )}
                {older ? (
                  <a className="card pn-a r" href={`/notes/${older.slug}/`}>
                    <span className="mono">Older →</span>
                    <b>{older.title}</b>
                  </a>
                ) : (
                  <span />
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
