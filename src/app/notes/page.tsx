import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NotesIndex from "@/components/NotesIndex";
import { posts, publication } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Notes · Nitin Pandey",
  description: `Essays on product, growth and AI by Nitin Pandey, from ${publication.name} on Substack.`,
  alternates: { canonical: "/notes/" },
  openGraph: { title: "Notes · Nitin Pandey", url: "/notes/", images: ["/og.png"] },
};

export default function NotesPage() {
  return (
    <>
      <a href="#top" className="skip mono">
        Skip to content
      </a>
      <Ambient />
      <Nav home={false} current="notes" />
      <main id="top">
        <div className="wrap">
          <header className="page-head">
            <div className="pill mono rv">
              <span className="dot" aria-hidden="true" />
              Notes
            </div>
            <h1 className="page-title rv" style={{ "--i": 1 } as React.CSSProperties}>
              Thinking out loud.
            </h1>
            <p className="bio rv" style={{ "--i": 2 } as React.CSSProperties}>
              Essays on product, growth and building with AI. First published on{" "}
              <a className="sub-link" href={publication.url} target="_blank" rel="noopener noreferrer">
                {publication.name}
              </a>
              , my Substack.
            </p>
          </header>
          <NotesIndex posts={posts} />
          <section className="cta rv" aria-labelledby="sub-title">
            <div>
              <h2 id="sub-title">New notes land on Substack first.</h2>
              <p>Subscribe to {publication.name} to get them by email.</p>
            </div>
            <div className="btns mono" style={{ margin: 0 }}>
              <a className="btn pr" href={`${publication.url}/subscribe`} target="_blank" rel="noopener noreferrer">
                Subscribe ↗
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
