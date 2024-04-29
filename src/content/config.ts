import { defineCollection, z } from "astro:content";

const post = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      cover: image(),
    }),
});

export const collections = { hobby: post, tutorial: post };
