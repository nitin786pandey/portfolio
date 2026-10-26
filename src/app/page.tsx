import type { CSSProperties } from "react";
import Ambient from "@/components/Ambient";
import Principles from "@/components/Principles";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NoteCard from "@/components/NoteCard";
import { featured, publication } from "@/lib/posts";
import { principles, site, stats } from "@/content";

const vars = (o: Record<string, string | number>) => o as CSSProperties;
const linkedin = site.linkedin ?? "#";
const ext = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};


export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Product Manager",
    description: site.description,
    sameAs: [site.github, ...(site.linkedin ? [site.linkedin] : [])],
  };

  return (
    <>
      <a href="#top" className="skip mono">
        Skip to content
      </a>
      <Ambient />

      <Nav />

      <main id="top">
        <div className="wrap">
          <section className="hero" aria-labelledby="hero-title">
            <div>
              <div className="pill mono rv">
                <span className="dot" aria-hidden="true" />
                Product Manager, LLM &amp; agentic AI
              </div>
              <h1 id="hero-title" className="rv" style={vars({ "--i": 1 })}>
                Nitin
                <br />
                <span>Pandey.</span>
              </h1>
              <p className="bio rv" style={vars({ "--i": 2 })}>
                PM on <b>Manifest AI at Bik.ai</b>, an AI sales assistant for Shopify stores. Previously at{" "}
                <b>Nojoto</b>. On the side, I ship agents I use every day.
              </p>
              <div className="btns mono rv" style={vars({ "--i": 3 })}>
                <a className="btn pr" href="#work">
                  See my work →
                </a>
                <a className="btn" href="#contact">
                  Contact
                </a>
              </div>
            </div>
            
            <Principles items={principles} />
          </section>

          <div className="stats rv" role="list" aria-label="At a glance">
            {stats.map((s) => (
              <div className="stat" role="listitem" key={s.k}>
                <div className="v">{s.v}</div>
                <div className="k mono">{s.k}</div>
              </div>
            ))}
          </div>

          <section id="work" aria-labelledby="work-title">
            <div className="sh rv">
              <div>
                <div className="ey mono">01 · Work</div>
                <h2 id="work-title">Chapters</h2>
              </div>
              <p className="mono">where I&apos;ve built</p>
            </div>

            <article className="card chap rv">
              <div className="ci">
                <div className="when mono">
                  <span className="dot" aria-hidden="true" />
                  Now
                </div>
                <h3>
                  Manifest AI <em>at Bik.ai</em>
                </h3>
                <p className="d">
                  An AI agent trained on a store&apos;s catalog that answers pre-sale questions and resolves support in one conversation. I work on product discovery and agent adoption: Voice of Shoppers, the default Product Comparison Concierge agent, image input and product search. The bet is that agents which own outcomes beat a chat widget.
                </p>
                <div className="chips mono">
                  <span className="chip">Agentic AI</span>
                  <span className="chip">Shopify</span>
                  <span className="chip">Conversational commerce</span>
                </div>
              </div>
              <div className="vis" aria-hidden="true">
                <div className="chat">
                  <div className="b1">Looking for something for dry skin under ₹1,000</div>
                  <div className="b2">Here are two picks that fit. Want me to compare them?</div>
                  <div className="pc">
                    <div className="im" />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                      <div className="bar" style={{ width: "80%" }} />
                      <div className="bar" style={{ width: "45%", background: "#2e2766" }} />
                    </div>
                    <span className="add mono">Add</span>
                  </div>
                  <div className="typing">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </article>

            <article className="card chap rev rv">
              <div className="ci">
                <div className="when mono">Earlier</div>
                <h3>Nojoto</h3>
                <p className="d">
                  A creator-economy live-streaming app. I conceived and launched Expert Consultations, a pay-per-minute call platform for Tier 2 India. It grew from ₹0 to ₹10 lakh a month in 5 months, and ARPU doubled from ₹142 to ₹286.
                </p>
                <div className="chips mono">
                  <span className="chip">Consumer</span>
                  <span className="chip">Creator economy</span>
                </div>
              </div>
              <div className="vis" aria-hidden="true">
                <div className="feed">
                  <div className="post">
                    <div className="hd">
                      <div className="av" />
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                        <div className="bar" style={{ width: "40%" }} />
                        <div className="bar" style={{ width: "22%", height: 5 }} />
                      </div>
                    </div>
                    <div className="md" />
                    <div className="ac mono">
                      <span className="lk">♥ like</span>
                      <span>comment</span>
                      <span>share</span>
                    </div>
                  </div>
                  <div className="post" style={{ opacity: 0.55 }}>
                    <div className="hd">
                      <div className="av" />
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                        <div className="bar" style={{ width: "52%" }} />
                        <div className="bar" style={{ width: "30%", height: 5 }} />
                      </div>
                    </div>
                    <div className="bar" style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section id="playground" aria-labelledby="pg-title">
            <div className="sh rv">
              <div>
                <div className="ey mono">02 · Playground</div>
                <h2 id="pg-title">Agents I use every day</h2>
              </div>
              <p className="mono">problem · bet · outcome</p>
            </div>
            <div className="pg">
              <article className="card rv">
                <div className="vis" role="img" aria-label="Sample pm-chief morning run in a terminal, above four memory files: decision ledger, open loops, risk register and stakeholder heatmap">
                  <div className="term mono" aria-hidden="true">
                    <div className="tbar">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="tb">
                      <span className="m">$</span> pm-chief run morning
                      <br />
                      <span className="g">✓</span> synced slack · jira · notion · calendar
                      <br />
                      <span className="p">▸ 3 decisions</span> awaiting sign-off
                      <br />
                      <span className="p">▸ 2 open loops</span> older than 5 days
                      <br />
                      <span className="p">▸ 1 risk</span> moved to high <span className="cur" />
                    </div>
                  </div>
                  <div className="mem" aria-hidden="true">
                    {[
                      ["Decision ledger", "78%"],
                      ["Open loops", "46%"],
                      ["Risk register", "30%"],
                      ["Stakeholder heatmap", "62%"],
                    ].map(([t, w]) => (
                      <div className="mb" key={t}>
                        <div className="t mono">{t}</div>
                        <div className="b">
                          <i style={vars({ "--w": w })} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ci">
                  <div className="when mono">
                    npm CLI · <span className="p">pm-chief</span>
                  </div>
                  <h3>PM Chief of Staff</h3>
                  <p className="d">
                    Scheduled morning briefs, evening debriefs and weekly radars on Claude, with persistent memory.
                  </p>
                  <div className="chips mono">
                    {["Slack", "Jira", "Notion", "Fireflies", "Google Calendar"].map((c) => (
                      <span className="chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="pbo">
                    <div className="row">
                      <span className="l mono">Problem</span>
                      <span>
                        A PM&apos;s context is scattered across Slack, Jira, Notion, meetings and calendar, and decisions
                        get lost.
                      </span>
                    </div>
                    <div className="row">
                      <span className="l mono">Bet</span>
                      <span>Scheduled briefs plus structured memory beat a chat window you have to remember to open.</span>
                    </div>
                    <div className="row">
                      <span className="l mono">Outcome</span>
                      <span>+10 hours</span>
                    </div>
                  </div>
                  <a className="more mono" href="https://github.com/nitin786pandey/PM-Chief-of-Staff" target="_blank" rel="noopener noreferrer">
                    View on GitHub →
                  </a>
                </div>
              </article>

              <article className="card rv" style={vars({ "--i": 1 })}>
                <div className="vis" role="img" aria-label="A research paper paragraph with an inline definition popover and a concept map: LoRA, fine-tuning, RAG, hallucination">
                  <div className="paper" aria-hidden="true">
                    <div className="mono m" style={{ fontSize: 11, marginBottom: 8 }}>
                      §3.2 METHOD
                    </div>
                    We fine-tune with <u>low-rank adaptation</u> on a frozen backbone, then apply{" "}
                    <u>retrieval-augmented</u> decoding to reduce hallucination.
                    <div className="pop">
                      <div className="mono" style={{ fontSize: 10, color: "var(--ac)", marginBottom: 5 }}>
                        DEFINITION
                      </div>
                      Low-rank adaptation trains small add-on matrices instead of the whole model.
                    </div>
                  </div>
                  <div className="map mono" aria-hidden="true">
                    <span className="node">LoRA</span>
                    <span className="line" />
                    <span className="node c">Fine-tuning</span>
                    <span className="line" />
                    <span className="node">RAG</span>
                    <span className="line" />
                    <span className="node">Hallucination</span>
                  </div>
                </div>
                <div className="ci">
                  <div className="when mono">Next.js app</div>
                  <h3>Companion Reader</h3>
                  <p className="d">
                    A reader for research papers with inline definitions, concept maps and AI Q&amp;A grounded in the
                    paper.
                  </p>
                  <div className="chips mono">
                    <span className="chip">Next.js</span>
                    <span className="chip">LLM</span>
                    <span className="chip">Learning UX</span>
                  </div>
                  <div className="pbo">
                    <div className="row">
                      <span className="l mono">Problem</span>
                      <span>Dense papers lose readers at the first unfamiliar term, and switching tabs breaks focus.</span>
                    </div>
                    <div className="row">
                      <span className="l mono">Bet</span>
                      <span>Help that lives in the margin keeps people reading longer than a separate chatbot.</span>
                    </div>
                    <div className="row">
                      <span className="l mono">Outcome</span>
                      <span>12+ papers finished</span>
                    </div>
                  </div>
                  <a className="more mono" href="https://github.com/nitin786pandey/companion-reader" target="_blank" rel="noopener noreferrer">
                    View on GitHub →
                  </a>
                </div>
              </article>
            </div>
          </section>

          <section id="notes" aria-labelledby="notes-title">
            <div className="sh rv">
              <div>
                <div className="ey mono">03 · Notes</div>
                <h2 id="notes-title">Thinking out loud</h2>
              </div>
              <p className="mono">
                from{" "}
                <a className="sub-link" href={publication.url} target="_blank" rel="noopener noreferrer">
                  {publication.name} ↗
                </a>
              </p>
            </div>
            <div className="notes">
              {featured.map((p, i) => (
                <NoteCard post={p} i={i} key={p.slug} headingLevel="h3" />
              ))}
            </div>
            <div className="notes-more rv">
              <a className="btn mono" href="/notes/">
                All notes →
              </a>
            </div>
          </section>

          <section id="contact" className="cta rv" aria-labelledby="contact-title">
            <div>
              <h2 id="contact-title">Building AI products? Let&apos;s talk.</h2>
              <p>Open to conversations about agents, LLM products and PM craft.</p>
            </div>
            <div className="btns mono" style={{ margin: 0 }}>
              <a className="btn pr" href={site.email ?? "#"}>
                {site.email ? "Email me →" : "[Email] →"}
              </a>
              <a className="btn" href={linkedin} {...ext(linkedin)}>
                LinkedIn ↗
              </a>
              <a className="btn" href={site.github} {...ext(site.github)}>
                GitHub ↗
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </>
  );
}
