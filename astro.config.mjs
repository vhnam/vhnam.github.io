import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";
import tailwind from "@astrojs/tailwind";
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
export default defineConfig({
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push", "FB.init"],
      },
    }),
    starlight({
      title: "Nam Vo | Software Developer, Product Manager, UX/UI Designer",
      plugins: [
        starlightImageZoom({
          showCaptions: true,
        }),
      ],
    }),
    sitemap(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
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
