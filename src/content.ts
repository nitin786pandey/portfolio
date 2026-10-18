/**
 * All site copy lives here.
 *
 * Anything in [square brackets], or a link set to null, is a PLACEHOLDER that
 * Nitin still needs to fill in. Placeholders render in violet so they're easy
 * to spot. Never replace them with made-up numbers or quotes.
 */

export const site = {
  name: "Nitin Pandey",
  title: "Nitin Pandey · Product Manager",
  description:
    "Nitin Pandey is a Product Manager building LLM and agentic AI products. PM on Manifest AI at Bik.ai; on the side he ships agents he uses every day.",
  github: "https://github.com/nitin786pandey",
  /** PLACEHOLDER: e.g. "mailto:you@example.com". While null, the button shows "[Email] →" and links to "#". */
  email: null as string | null,
  /** PLACEHOLDER: your LinkedIn profile URL. While null, LinkedIn links point to "#". */
  linkedin: null as string | null,
};

/** DRAFT principles: placeholders for Nitin to rewrite in his own words. */
export const principles = [
  "Evals before demos.",
  "Memory is the product.",
  "Ship the boring version first.",
  "Cut until it hurts.",
  "Numbers or it didn't happen.",
  "Users over roadmaps.",
];

export const stats = [
  { v: "4.8 yrs", k: "product experience" },
  { v: "[metric]", k: "shipped at work", placeholder: true }, // PLACEHOLDER
  { v: "2", k: "live side projects" },
];

/** PLACEHOLDERS: real notes go here. */
export const notes = [0, 1, 2].map(() => ({
  date: "[Date]",
  read: "[x] min read",
  title: "[Draft title]",
  summary: "[One-line summary of the note.]",
  href: "#",
}));
