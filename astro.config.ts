import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    processor: unified(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
