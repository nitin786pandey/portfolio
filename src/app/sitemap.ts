import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

export const dynamic = "force-static";
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-steel-xi-78.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/notes/`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({ url: `${base}/notes/${p.slug}/`, lastModified: p.date, priority: 0.6 })),
  ];
}
