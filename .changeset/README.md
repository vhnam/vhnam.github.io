# Changesets

Versioning for this site. Full tool docs: https://changesets.dev

## Bumps

This project does **not** bump major on routine work. Major is reserved for a site-wide UI redesign or a tech-stack change (this Astro rewrite is an example).

| Bump | When |
| --- | --- |
| `minor` | New feature, or a new tutorial / hobby article |
| `patch` | Bug fix |
| `major` | UI overhaul or tech-stack change — only when we intend a new major line |

```sh
pnpm changeset
```

That writes a file under `.changeset/`. Choose `minor` or `patch` unless we are deliberately starting a new major version.
