# vhnam.github.io

Personal site of Nam Vo — UX Engineer, music enthusiast, cinematographer.

Built with [Astro 7](https://astro.build), Tailwind CSS 4, and MDX content collections.

## Tech stack

- **Astro 7** — static site generation
- **Tailwind CSS 4** (`@tailwindcss/vite`) — styling
- **MDX** — post/hobby/tutorial content
- **Sharp** — image optimization
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
  lib/          posts, reading-time, references, unwrap-images
  pages/        index, about, hobbies, tutorials, tags, rss.xml, 404, policy-privacy
  styles/       global.css (theme tokens, typography)
```

## Scripts

| Command         | Description                              |
| --------------- | ----------------------------------------- |
| `pnpm dev`      | Start the dev server                      |
| `pnpm build`    | Build the production site                 |
| `pnpm preview`  | Preview the production build              |
| `pnpm check`    | Run Biome checks + MDX format check       |
| `pnpm format`   | Format code and MDX with Biome            |

## Content

Hobby and tutorial posts live under `src/content/{hobby,tutorial}` as MDX, with front matter validated by the Astro content collection schema. Each post supports featured flags, tags, reading time, table of contents, adjacent-post navigation, and related posts.

## Notes

This is the v6 rewrite of the site (Astro 7 + Tailwind 4), replacing the previous v5 stack. See `.changeset/` for a granular history of feature and fix entries, and `git log` for full commit history.
