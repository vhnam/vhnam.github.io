import { defineCollection, z } from "astro:content";

const post = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      cover: image().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = { hobby: post, tutorial: post };
