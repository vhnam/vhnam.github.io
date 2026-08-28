# Agent contract

Personal site of Nam Vo. Static **Astro 7** + **Tailwind 4** + **MDX**. Package manager is **pnpm** (`package.json` `packageManager`). `CLAUDE.md` points here; do not fork instructions there.

README is the map of folders and scripts. This file is the unwritten policy.

## Ship

When a change should ship, add `.changeset/*.md` (`pnpm changeset`). Pick the bump from the work, not from commit count.

| Bump | Use when |
| --- | --- |
| **minor** | New feature, or a new tutorial / hobby article |
| **patch** | Bug fix (layout, a11y, typos, broken links, CI, deps that only fix bugs) |
| **major** | Site-wide UI redesign, or a tech-stack change. Only with an explicit human request. |

Routine PRs use **minor** or **patch**. Content-only article work is **minor**. A fix on an existing article is **patch**.

```markdown
---
"vhnam.github.io": minor
---

Add hobby post: Chỉ định thử vài cuộn phim
```

## Content

Hobby and tutorial posts are MDX under `src/content/{hobby,tutorial}`. Schema lives in `src/content.config.ts`. Filenames are kebab-case slugs (`pubDate` + `title` / `description` / `cover` / `tags`). Routes are `/hobbies/[id]` and `/tutorials/[id]` — collection names stay singular.

- Write posts in **Vietnamese**. UI chrome already uses Vietnamese (`Giải Trí`, `Phần Mềm`, dates via `vi-VN`).
- Cover and inline images live under `src/assets/{hobbies,tutorials}/<slug>/`. Point `cover` at a relative path from the MDX file.
- Embeds use `IFrameComponent` from `src/components/common/iframe`.
- A closing references section uses heading **Tham khảo** (or References). That heading is styled specially; keep that id.

New article → **minor** changeset. Fix on an existing article → **patch**.

## Code

Stay on this stack: Astro components, Tailwind utility classes, `src/lib/*` for shared logic. No React islands unless the user asks.

- Theme through CSS tokens in `src/styles/global.css` (`background`, `primary`, `secondary`, `accent-hobby`, `accent-software`). Hobby prose uses **secondary**; tutorial prose uses **primary**.
- Markdown pipeline is `astro.config.ts` (Satteri plugins: reading time, last-modified, unwrap images, external links). Post MDX maps `img` / `code` / `h2` in `post-layout.astro`.
- Format and lint with `pnpm check` / `pnpm format` (Biome + `scripts/format-mdx.ts`). Lefthook runs those on staged files.

UI or layout work: verify the changed flow in the browser (`pnpm dev`), including related routes that share the same state or components.
