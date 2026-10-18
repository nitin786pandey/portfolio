import data from "@/data/posts.json";
import { writing } from "@/content";

export type TocItem = { id: string; text: string; level: number };
export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  url: string;
  wordcount: number;
  readingMinutes: number;
  cover: string | null;
  coverRemote: string | null;
  toc: TocItem[];
  html: string;
};

export const publication = data.publication;

/** All published posts shown on the site, newest first (minus any hidden in content.ts). */
export const posts: Post[] = (data.posts as Post[])
  .filter((p) => !writing.hidden.includes(p.slug))
  .sort((a, b) => b.date.localeCompare(a.date));

/** The posts featured on the homepage, in the order set in content.ts. */
export const featured: Post[] = (
  writing.featured.length
    ? writing.featured.map((s) => posts.find((p) => p.slug === s)).filter(Boolean)
    : posts
).slice(0, 3) as Post[];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export { formatDate } from "./format";
