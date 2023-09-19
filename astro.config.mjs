import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), partytown({
    config: {
      forward: ["dataLayer.push", "FB.init"]
    }
  }), sitemap(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), react()],
  markdown: {
    theme: "github-dark",
    wrap: true
  },
  site: "https://vhnam.github.io"
});