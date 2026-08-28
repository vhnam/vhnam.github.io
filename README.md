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

## Checklist: v6 vs. v5 (`e0c40eb1`)

Comparing the current branch against the last v5 commit (`e0c40eb17b4dc8ff5b9cf3300d930debc554db38`, `chore(ci): bumps version to 5.13.0`).

### Feature parity gaps (present in v5, not yet ported to v6)

- [ ] **SEO meta tags** — v5 had `BaseHead.astro` with `og:*`/`twitter:*` meta tags; v6 has none. Needed for link previews on social/chat apps.
- [ ] **Social icons/links** — v5 had Flickr, GitHub, LinkedIn, YouTube icon components; v6's `icons/` only has UI icons (arrow, sun/moon, print, aperture, trumpet, code). No social links currently rendered.
- [ ] **Copy-code button** — v5 had `CopyCodeButton.astro` for MDX code blocks; no equivalent in v6.
- [ ] **Image zoom on click** — v5 pulled in `starlight-image-zoom`; not reintroduced. Confirm whether it's wanted for post images.

### Intentional removals to confirm as final

- [ ] `react` / `@astrojs/react` — v6 has zero React components; confirm no interactive island is still needed anywhere.
- [ ] `@astrojs/partytown` — no analytics/third-party script loader configured in v6. Decide if analytics (GA, Plausible, etc.) is wanted for launch.
- [ ] `@astrojs/starlight` — likely used for a docs-style layout in v5; not used in v6.
- [ ] `dayjs`, `pluralize`, `github-slugger`, `fast-average-color-node` — replaced by hand-rolled `src/lib/*` utilities. Confirm nothing relied on average-color-based image accents.

### New in v6, worth double-checking before shipping

- [ ] `pnpm check` now runs Biome + a custom MDX format script instead of `astro check` — confirm type-checking still happens somewhere (CI?).
- [ ] Sitemap/RSS/robots AI-content signals were added recently — verify they render correctly in a production build (`pnpm build && pnpm preview`).
- [ ] `about.astro` and `policy-privacy.astro` are new pages — confirm they're linked from nav/footer on all page types (index, hobbies, tutorials, tags, 404).
- [ ] Confirm the release workflow (`.github/`) matches the new Changesets-based versioning policy now that CI auto-bump was removed.

### Housekeeping

- [ ] `dist/` is present in the working tree — confirm it's gitignored and not accidentally tracked/committed.
