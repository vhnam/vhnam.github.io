import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { rehypeUnwrapImages } from "./src/lib/unwrap-images";

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeUnwrapImages],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
