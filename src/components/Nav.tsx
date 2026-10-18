import { site } from "@/content";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** Sticky top nav. On sub-pages (`home={false}`) section links point back to the homepage. */
export default function Nav({ home = true, current }: { home?: boolean; current?: "notes" }) {
  const b = home ? "" : "/";
  const linkedin = site.linkedin ?? "#";
  return (
    <nav aria-label="Primary">
      <div className="wrap">
        <a href={home ? "#top" : "/"} className="logo">
          <i aria-hidden="true" />
          Nitin Pandey
        </a>
        <div className="links mono">
          <a href={`${b}#work`}>Work</a>
          <a href={`${b}#playground`}>Playground</a>
          <a href={home ? "#notes" : "/notes/"} aria-current={current === "notes" ? "page" : undefined}>
            Notes
          </a>
          <a href={`${b}#contact`}>Contact</a>
        </div>
        <div className="ico">
          {/* [LinkedIn URL: Nitin to provide] */}
          <a href={linkedin} aria-label="LinkedIn" {...ext(linkedin)}>
            <LinkedInIcon />
          </a>
          <a href={site.github} aria-label="GitHub" {...ext(site.github)}>
            <GitHubIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}
