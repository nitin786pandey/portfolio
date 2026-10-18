/**
 * Build-time import of Nitin's Substack ("The Product Sensei").
 *
 * - Pulls every published post from the public Substack API.
 * - Cleans the article HTML (drops subscribe widgets, buttons, share UI).
 * - Downloads cover and inline images into public/writing/<slug>/.
 * - Writes src/data/posts.json (committed, so it doubles as the offline snapshot).
 *
 * If Substack can't be reached, the committed snapshot is kept and the build
 * carries on. Set SKIP_SUBSTACK_FETCH=1 to skip the network entirely.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sanitizeHtml from "sanitize-html";

const PUB = process.env.SUBSTACK_PUB_URL || "https://theproductsensei.substack.com";
const PROFILE = "https://substack.com/@learningnitin";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "src/data/posts.json");
const IMG_DIR = path.join(ROOT, "public/writing");
const UA = { "User-Agent": "Mozilla/5.0 (portfolio build; +https://github.com/nitin786pandey/portfolio)" };
const WPM = 230;
// Posts below this word count are Substack stubs (e.g. the default "Coming soon" welcome post).
const MIN_WORDS = 100;

const log = (...a) => console.log("[substack]", ...a);

async function getJson(url) {
  const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

/** Substack image URLs are often CDN "fetch" wrappers; recover the original. */
function originalImage(u) {
  if (!u) return null;
  const i = u.indexOf("https%3A%2F%2F");
  return i >= 0 ? decodeURIComponent(u.slice(i)) : u;
}
const cdn = (orig, w) => `https://substackcdn.com/image/fetch/w_${w},c_limit,f_webp,q_auto:good,fl_progressive:steep/${encodeURIComponent(orig)}`;

async function download(orig, dest, width) {
  const rel = `/writing/${path.relative(IMG_DIR, dest).split(path.sep).join("/")}`;
  try {
    await fs.access(dest);
    return rel; // already downloaded (immutable source images)
  } catch {}
  for (const url of [cdn(orig, width), orig]) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.writeFile(dest, buf);
      return rel;
    } catch {}
  }
  log("could not download image, linking remote:", orig);
  return orig;
}

const slugify = (s) =>
  s.toLowerCase().replace(/&[a-z]+;/g, "").replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const unescapeAttr = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, "&");

async function cleanBody(html, slug, postUrl) {
  // Drop Substack chrome before sanitizing.
  html = html
    .replace(/<div class="subscription-widget-wrap[\s\S]*?<\/form><\/div><\/div>/g, "")
    .replace(/<p class="button-wrapper"[\s\S]*?<\/p>/g, "")
    .replace(/<div class="captioned-button-wrap"[\s\S]*?<\/div><\/div>/g, "")
    .replace(/<div class="image-link-expand">[\s\S]*?<\/svg><\/div><\/div><\/div><\/div>/g, "")
    // image links just point at the full-size CDN file: unwrap them
    .replace(/<a class="image-link[^"]*"[^>]*>/g, "")
    .replace(/<\/a>(?=\s*(<figcaption|<\/figure>))/g, "")
    // @mentions are empty spans with JSON attrs; turn them into plain links
    .replace(/<span class="mention-wrap" data-attrs="([^"]*)"[^>]*><\/span>/g, (_, attrs) => {
      try {
        const a = JSON.parse(unescapeAttr(attrs));
        return a.url ? `<a href="${a.url}">${a.name}</a>` : a.name || "";
      } catch {
        return "";
      }
    })
    // Substack-hosted videos can't be embedded off-site
    .replace(/<div class="native-video-embed"[^>]*><\/div>/g, `<p class="embed-note"><a href="${postUrl}">▶ Watch the video in the original post on Substack</a></p>`)
    .replace(/<div class="pullquote">([\s\S]*?)<\/div>/g, '<blockquote class="pullquote">$1</blockquote>');

  const images = [];
  let n = 0;
  let clean = sanitizeHtml(html, {
    allowedTags: ["p", "h2", "h3", "h4", "h5", "a", "strong", "b", "em", "i", "u", "s", "code", "pre", "blockquote",
      "ul", "ol", "li", "figure", "figcaption", "img", "hr", "br", "sup", "sub", "iframe"],
    allowedAttributes: {
      a: ["href"],
      img: ["src", "alt", "width", "height", "loading"],
      iframe: ["src", "width", "height", "allowfullscreen", "title"],
      blockquote: ["class"],
      p: ["class"],
    },
    allowedClasses: { blockquote: ["pullquote"], p: ["embed-note"] },
    allowedIframeHostnames: ["www.youtube-nocookie.com", "www.youtube.com"],
    transformTags: {
      img: (tag, attribs) => {
        const id = `__IMG_${n++}__`;
        images.push({ id, src: attribs.src });
        const w = Math.round(Number(attribs.width) || 0) || undefined;
        const h = Math.round(Number(attribs.height) || 0) || undefined;
        return { tagName: "img", attribs: { src: id, alt: attribs.alt || "", ...(w && { width: String(w) }), ...(h && { height: String(h) }), loading: "lazy" } };
      },
      iframe: (tag, attribs) => ({ tagName: "iframe", attribs: { ...attribs, title: "Embedded video" } }),
    },
    exclusiveFilter: (f) => f.tag === "p" && !f.text.trim() && !(f.mediaChildren && f.mediaChildren.length),
  });
  clean = clean.replace(/<p>(\s|<br \/>)*<\/p>/g, "");
  // drop trailing "Share / Leave a comment / Subscribe" leftovers
  clean = clean.replace(/<p>(\s*(Share|Leave a comment|Subscribe now)\s*)+<\/p>/g, "");
  clean = clean.replace(/<p>\s*<a href="[^"]*">\s*(Share|Leave a comment|Subscribe now)\s*<\/a>\s*<\/p>/g, "");
  clean = clean.replace(/<hr \/>\s*$/g, "");

  for (const im of images) {
    const orig = originalImage(im.src);
    const local = orig ? await download(orig, path.join(IMG_DIR, slug, `img-${im.id.match(/\d+/)[0]}.webp`), 1200) : "";
    clean = clean.replace(im.id, local);
  }

  // heading ids + table of contents
  const toc = [];
  const used = new Set();
  clean = clean.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (_, tag, inner) => {
    let id = slugify(inner) || "section";
    while (used.has(id)) id += "-x";
    used.add(id);
    const text = inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "’").replace(/&quot;/g, '"').trim();
    if (text) toc.push({ id, text, level: tag === "h2" ? 2 : 3 });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html: clean.trim(), toc };
}

async function main() {
  if (process.env.SKIP_SUBSTACK_FETCH) return log("SKIP_SUBSTACK_FETCH set, using snapshot");
  let archive = [];
  try {
    for (let offset = 0; ; offset += 50) {
      const page = await getJson(`${PUB}/api/v1/archive?sort=new&limit=50&offset=${offset}`);
      archive.push(...page);
      if (page.length < 50) break;
    }
  } catch (e) {
    return log("Substack unreachable, keeping committed snapshot:", e.message);
  }

  const posts = [];
  const skipped = [];
  for (const a of archive) {
    if (a.audience && a.audience !== "everyone") { skipped.push(`${a.slug} (paid)`); continue; }
    if ((a.wordcount ?? 0) < MIN_WORDS) { skipped.push(`${a.slug} (${a.wordcount} words)`); continue; }
    try {
      const full = await getJson(`${PUB}/api/v1/posts/${a.slug}`);
      const p = full.post ?? full;
      const { html, toc } = await cleanBody(p.body_html || "", a.slug, a.canonical_url);
      const coverOrig = originalImage(p.cover_image || a.cover_image);
      const cover = coverOrig ? await download(coverOrig, path.join(IMG_DIR, a.slug, "cover.webp"), 1200) : null;
      posts.push({
        slug: a.slug,
        title: a.title.trim(),
        subtitle: (a.subtitle || "").trim(),
        description: (p.description || a.description || "").trim(),
        date: a.post_date,
        url: a.canonical_url,
        wordcount: a.wordcount,
        readingMinutes: Math.max(1, Math.round(a.wordcount / WPM)),
        cover,
        coverRemote: coverOrig,
        toc,
        html,
      });
      log("ok", a.slug);
    } catch (e) {
      return log(`failed on ${a.slug}, keeping committed snapshot:`, e.message);
    }
  }
  const data = {
    publication: { name: "The Product Sensei", url: PUB, profile: PROFILE },
    fetchedAt: new Date().toISOString(),
    skipped,
    posts,
  };
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  // Only touch the snapshot when the posts actually changed (keeps git diffs clean).
  try {
    const prev = JSON.parse(await fs.readFile(OUT, "utf8"));
    if (JSON.stringify(prev.posts) === JSON.stringify(posts) && JSON.stringify(prev.skipped) === JSON.stringify(skipped)) {
      return log(`no changes (${posts.length} posts)`);
    }
  } catch {}
  await fs.writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  log(`wrote ${posts.length} posts (skipped: ${skipped.join(", ") || "none"})`);
}

main().catch((e) => log("unexpected error, keeping snapshot:", e.message));
