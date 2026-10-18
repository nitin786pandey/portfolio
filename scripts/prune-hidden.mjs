/**
 * Removes hidden posts from the committed snapshot and deletes their images,
 * so nothing about them ships even when the build falls back to the snapshot.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "src/data/posts.json");
const { hidden = [] } = JSON.parse(await fs.readFile(path.join(ROOT, "src/data/writing.json"), "utf8"));
const data = JSON.parse(await fs.readFile(OUT, "utf8"));
const before = data.posts.length;
data.posts = data.posts.filter((p) => !hidden.includes(p.slug));
if (data.posts.length !== before) await fs.writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
for (const slug of hidden) await fs.rm(path.join(ROOT, "public/writing", slug), { recursive: true, force: true });
console.log(`[substack] pruned hidden posts: ${before - data.posts.length} removed from snapshot`);
