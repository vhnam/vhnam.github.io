import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  experimental: {
    assets: true,
  },
  integrations: [
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
  markdown: {
    theme: "github-dark",
    wrap: true,
  },
  site: "https://vhnam.github.io",
});
