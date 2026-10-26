import writingConfig from "@/data/writing.json";

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
  email: "mailto:nitin786pandey3@gmail.com" as string | null,
  /** PLACEHOLDER: your LinkedIn profile URL. While null, LinkedIn links point to "#". */
  linkedin: "https://www.linkedin.com/in/pmnitin" as string | null,
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

/**
 * Writing, imported from Substack at build time (scripts/fetch-substack.mjs).
 * The lists live in src/data/writing.json so the import script can read them too.
 * - featured: slugs shown on the homepage (first 3 are used). Empty = newest 3.
 * - hidden: slugs left off the site entirely (not imported, no pages, no images).
 * Approved by Nitin on 18 Oct 2026.
 */
export const writing: { featured: string[]; hidden: string[] } = writingConfig;
