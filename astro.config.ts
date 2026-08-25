import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { rehypeWrapReferences } from "./src/lib/references";
import { rehypeUnwrapImages } from "./src/lib/unwrap-images";

export default defineConfig({
  site: "https://vhnam.github.io",
  integrations: [
    mdx(),
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
    processor: unified({
      rehypePlugins: [rehypeUnwrapImages, rehypeWrapReferences],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
