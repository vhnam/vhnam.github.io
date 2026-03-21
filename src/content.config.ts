import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function definePostCollection(base: string) {
  return defineCollection({
    loader: glob({ base, pattern: "**/*.{md,mdx}" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        cover: image().optional(),
        tags: z.array(z.string()).optional(),
      }),
  });
}

export const collections = {
  hobby: definePostCollection("./src/content/hobby"),
  tutorial: definePostCollection("./src/content/tutorial"),
};
