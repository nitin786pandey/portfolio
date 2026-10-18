# Nitin Pandey · Portfolio

Personal portfolio for Nitin Pandey, Product Manager working on LLM and agentic AI products.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and the Geist fonts. The site is a static export (`out/`) and is hosted on Vercel at https://portfolio-steel-xi-78.vercel.app (auto-deploys on every push to `main`).

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

## Editing content

All copy that still needs filling in lives in [`src/content.ts`](src/content.ts) and in `src/app/page.tsx`. Anything in `[square brackets]` is a placeholder and renders in violet on purpose. Swap them for real words and numbers; don't ship invented metrics.

- `site.email` / `site.linkedin`: contact links (currently placeholders pointing to `#`)
- `stats`: the `[metric]` shipped at work
- `principles`: draft PM principles to rewrite in your own words
- `writing`: which Substack posts are featured on the homepage (`featured`) or left off the site (`hidden`)
- In `page.tsx`: Manifest AI and Nojoto chapter descriptions, the `[Area]` chip, and project outcomes

## Notes (Substack)

Notes come from Nitin's Substack, [The Product Sensei](https://theproductsensei.substack.com). `npm run build` runs `scripts/fetch-substack.mjs` first (`prebuild`). It pulls every public post from the Substack API, cleans the HTML, downloads cover and inline images to `public/writing/`, and refreshes `src/data/posts.json`. That JSON is committed and acts as the fallback: if Substack is down the build uses the snapshot and still passes. Set `SKIP_SUBSTACK_FETCH=1` to build offline. Stub posts under 100 words (Substack's default "Coming soon" post) are skipped.

Each post gets an on-site page at `/notes/<slug>/` with a table of contents and a link back to the original. Its canonical URL points at Substack, so search engines treat Substack as the source.

## Structure

- `src/app/page.tsx`: the homepage
- `src/components/Ambient.tsx`: dot grid, cursor lens, click ripple, scroll reveals (client)
- `src/components/Principles.tsx`: cycling PM principles panel (client)
- `src/app/notes/`: notes index (with search) and article pages
- `src/app/globals.css`: design tokens and styles
- `public/og.png`: social preview image (Open Graph / Twitter)

All motion respects `prefers-reduced-motion`.

Showcased projects: [PM-Chief-of-Staff](https://github.com/nitin786pandey/PM-Chief-of-Staff) and [companion-reader](https://github.com/nitin786pandey/companion-reader).
