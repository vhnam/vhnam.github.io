import { defineCollection, z } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  cover: z.any().optional(),
  tags: z.array(z.string()).optional(),
  // slug: z.string(),
});

const postCollection = defineCollection({
  type: "content",
  schema: postSchema,
});

export const collections = { hobby: postCollection, tutorial: postCollection };

export type Post = z.infer<typeof postSchema>;
