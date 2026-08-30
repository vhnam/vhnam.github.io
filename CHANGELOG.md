# vhnam.github.io

## 6.3.0

### Minor Changes

- 5c6f319: Add a mobile hamburger menu for site navigation

### Patch Changes

- 5c6f319: Fix accessibility issues across components and layouts: require a non-empty `title` on embedded iframes, stop markdown images from losing their `alt` text when a caption is present, make the theme toggle's `aria-label` reflect the current state, mark decorative cover images with `alt=""`, add an external-link indicator and `target="_blank"` handling to footer social links, and add a skip-to-content link to the page layout.

## 6.2.0

### Minor Changes

- 25fb041: Add a `#/*` path alias and Biome import groups so CSS, packages, and `src` layers stay in a stable order

## 6.1.1

### Patch Changes

- a5da2c2: Bind the GitHub Pages build job to the github-pages environment so environment-scoped SITE_* vars and GA/FB secrets reach the Astro build

## 6.1.0

### Minor Changes

- c5d268c: Add about / CV page
- 37f454a: Link homepage categories to hobby and tutorial listing pages
- 3ac5a85: Add a copy button to markdown code blocks
- 6c7a8c1: Mark outbound links in post markdown with an external-link indicator
- 887e857: Show the latest post on the homepage and link it to the post page
- a08f39f: Open post images in a lightbox on click
- 064b273: Load Google Analytics in production when a measurement id is set
- 5b120cf: Add privacy policy page content from the live site
- c41564f: Add previous and next post navigation on article pages
- 54431fa: Show cover images on featured post cards
- d036f73: Show styled image captions from alt/title in post content
- c3d0259: Show last-modified dates on posts from git history
- cdddb3d: Show estimated reading time on post pages
- 5a46ddd: Add a sticky post table of contents with scroll highlighting
- 54cf112: Style post body content with Tailwind Typography
- 5b88aca: Show related posts on article pages when other posts share the collection and tags
- 94b84f2: Switch the markdown pipeline to Satteri and compute reading time in the processor
- 9baf45e: Add scroll-to-top button on category listing pages
- f2330b8: Add Open Graph, Twitter, and canonical metadata for link previews
- 3a64ab4: List posts for each tag using the category layout and the readable tag name
- df20559: Show every tag with post counts on `/tags`
- b8f8bbb: Add dark/light theme toggle in the site header

### Patch Changes

- 9c4a53c: Restyle the 404 page with a centered layout and pill actions
- 9f29020: Document the agent contract, README, and Changesets policy
- 5c7c21b: Make the ApexCharts StackBlitz embed full width
- 979979c: Install Biome, align its config, and use it as the workspace formatter in Cursor
- f286ead: Point post breadcrumbs at /hobbies and /tutorials
- 125ac09: Use light as the default theme and dark as the opt-in variant
- bd1065a: Pass site config into the GitHub Pages build
- 648dbd6: Fix Tailwind important modifiers on the Di sản sống post image
- 60e0fd7: Replace the emoji external-link marker with an inline SVG icon
- e0c779b: Fix homepage identity icons by importing SVGs as Astro components
- 5c7c21b: Fix the ApexCharts post iframe import after the common/ move
- f0132b8: Point the RSS feed at hobby and tutorial posts using the configured site URL
- 125ac09: Self-host Space Grotesk, Source Serif 4, and JetBrains Mono via Fontsource
- 979979c: Format blank lines inside MDX HTML tags via the format script
- 9cf5d1f: Type-check the MDX format script with Node types
- 3dd5ce3: Import the hero band photo so Astro Image can optimize it
- 9bafb0a: Add more specific tags on hobby posts
- 394dde5: Rename the iframe component files to kebab-case
- 93ae44f: Lazy-load embedded iframes below the fold
- 3f40d9d: Apply inline code styles only to standalone `<code>`, not fenced blocks
- dd89a29: Run Biome and MDX format in Lefthook pre-commit
- 125ac09: Map theme tokens to Tailwind palette colors
- 52aa73b: Move leftover v5 italic image captions into alt text
- e97b173: Map datePublished and dateModified into Open Graph article tags
- f71ef70: Upgrade to pnpm 11.24.0 and bump Astro, Sharp, Biome, Lefthook, and @types/node
- b740e7d: Make post cards in a grid row share the same height
- 0ae7749: Stop wrapping post figures in paragraphs so Astro image audits stay clean
- 4c7b0c1: Extract post prose styles into a shared component
- f748d28: Style the full post References / Tham khảo section as a compact bibliography
- bfd31c6: Use semantic landmarks and headings on home, category, and post pages
- 807039d: Refresh the README to match the current stack and content schema
- 32e52a4: Remove the finished v6 vs v5 checklist from the README
- 03975ea: Convert the homepage related-posts section from React JSX to Astro
- c859641: Stop auto-bumping version in the deploy workflow
- 370abfc: Use the vi-vn language tag in the RSS feed
- 02ba761: Share a post layout between hobby and tutorial article pages
- 8c260b9: Share category listing UI via CategoryPage component
- 125ac09: Map semantic theme colors to Tailwind palette tokens
- ba79ced: Make YouTube embeds in posts full width at a 16:9 ratio
