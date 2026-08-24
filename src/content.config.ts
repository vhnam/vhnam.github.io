import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function postSchema({ image }: SchemaContext) {
  return z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    cover: image(),
    tags: z.array(z.string()).default([]),
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

export const collections = { hobby, tutorial };
