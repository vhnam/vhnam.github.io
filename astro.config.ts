import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [mdx(), svelte()],
  markdown: {
    processor: unified(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
