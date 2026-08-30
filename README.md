# vhnam.github.io

Personal site of Nam Vo — UX Engineer, music enthusiast, cinematographer.

Built with [Astro 7](https://astro.build), Tailwind CSS 4, and MDX content collections.

## Tech stack

- **Astro 7** — static site generation
- **Tailwind CSS 4** (`@tailwindcss/vite`) — styling
- **MDX** — hobby and tutorial posts
- **Satteri** — markdown pipeline (reading time, last-modified, unwrap images, external links)
- **Sharp** — image optimization
- **GLightbox** — post image zoom
- **Pagefind** — full-text search (indexed at build time)
- **Biome** — lint/format
- **Lefthook** — git hooks
- **Changesets** — versioning
- **pnpm 11** — package manager

## Project structure

```
src/
  assets/       images (hobbies, tutorials, homepage hero, icons)
  components/   home, post, category, common, icons
  content/      hobby and tutorial MDX collections
  layouts/      page-layout.astro, post-layout.astro
  lib/          posts, reading-time, last-modified, unwrap-images, external-links, references
  pages/        index, about, hobbies, tutorials, tags, rss.xml, 404, policy-privacy
  styles/       global.css (theme tokens, typography)
```

Copy `.env.example` to `.env` for local `pnpm dev`. Site title, description, author, `GA_MEASUREMENT_ID`, and `FB_APP_ID` are read at build time.

## Scripts

| Command         | Description                              |
| --------------- | ----------------------------------------- |
| `pnpm dev`      | Start the dev server                      |
| `pnpm build`    | Build the production site and Pagefind index |
| `pnpm preview`  | Preview the production build              |
| `pnpm check`    | Run Biome checks + MDX format check       |
| `pnpm format`   | Format code and MDX with Biome            |

## Content

Hobby and tutorial posts live under `src/content/{hobby,tutorial}` as MDX. Front matter is validated in `src/content.config.ts`: `title`, `description`, `datePublished`, optional `dateModified`, `cover`, `tags`, `isFeatured`. Routes are `/hobbies/[id]` and `/tutorials/[id]`.

Posts get Open Graph / Twitter tags, reading time, table of contents, adjacent and related posts, a copy-code button, and image zoom. Date field rules live in `AGENTS.md`.

## Notes

This is the v6 rewrite of the site (Astro 7 + Tailwind 4), replacing the previous v5 stack. See `.changeset/` for a granular history of feature and fix entries, and `git log` for full commit history. Agent and shipping policy is in `AGENTS.md`.

Search is powered by Pagefind and indexed during `pnpm build` (`astro build`). Use `pnpm preview` to try search locally.
