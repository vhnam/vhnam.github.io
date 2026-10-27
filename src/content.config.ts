import { defineCollection, type SchemaContext } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

import { threadsShortcode } from "#/lib/threads";

function postSchema({ image }: SchemaContext) {
  return z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    cover: image(),
    tags: z.array(z.string()).default([]),
    isFeatured: z.boolean().default(false),
  });
}

const hobby = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/hobby",
  }),
  schema: postSchema,
});

const tutorial = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/tutorial",
  }),
  schema: postSchema,
});

// One Threads post URL per array item; the id is the post shortcode.
const gallery = defineCollection({
  loader: file("src/content/gallery.json", {
    parser: (text) =>
      (JSON.parse(text) as string[]).map((url) => ({
        id: threadsShortcode(url),
        url,
      })),
  }),
  schema: z.object({ url: z.url() }),
});

export const collections = { hobby, tutorial, gallery };
