import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  experimental: {
    assets: true,
  },
  markdown: {
    theme: "github-dark",
    wrap: true,
  },
  site: "https://vhnam.github.io",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
});
