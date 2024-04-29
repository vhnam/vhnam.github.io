import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import yaml from "@rollup/plugin-yaml";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push", "FB.init"],
      },
    }),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
  ],
  markdown: {
    theme: "github-dark",
    wrap: true,
  },
  site: "https://vhnam.github.io",
  vite: {
    plugins: [yaml()],
  },
});
