import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { hastExternalLinksPlugin } from "#/lib/external-links";
import { mdastLastModifiedPlugin } from "#/lib/last-modified";
import { pagefindIntegration } from "#/lib/pagefind";
import { mdastReadingTimePlugin } from "#/lib/reading-time";
import { hastUnwrapImagesPlugin } from "#/lib/unwrap-images";

export default defineConfig({
  site: "https://vhnam.github.io",
  integrations: [
    mdx(),
    pagefindIntegration(),
    sitemap({
      filter: (page) =>
        !page.endsWith("/404") &&
        !page.endsWith("/404/") &&
        !page.endsWith("/rss.xml"),
      namespaces: {
        news: false,
        xhtml: false,
        video: false,
        image: false,
      },
    }),
  ],
  markdown: {
    processor: satteri({
      mdastPlugins: [mdastReadingTimePlugin, mdastLastModifiedPlugin],
      hastPlugins: [hastUnwrapImagesPlugin, hastExternalLinksPlugin],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
