import { defineCollection, z } from "astro:content";

const tutorial = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    cover: z.string().optional(),
  }),
});

export const collections = { tutorial };
