import { defineCollection, z } from "astro:content";

const tutorial = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    heroImage: z.string().optional(),
  }),
});

export const collections = { tutorial };
