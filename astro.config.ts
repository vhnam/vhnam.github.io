import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { rehypeWrapReferences } from "./src/lib/references";
import { rehypeUnwrapImages } from "./src/lib/unwrap-images";

export default defineConfig({
  site: "https://vhnam.github.io",
  integrations: [mdx()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeUnwrapImages, rehypeWrapReferences],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
