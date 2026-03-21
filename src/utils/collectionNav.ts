import type { CollectionEntry } from "astro:content";

/** Serializable subset for prev/next links (getStaticPaths cannot pass full entries). */
export type CollectionNavPost = {
  id: string;
  data: { title: string };
};

export function collectionNavSlice<C extends "hobby" | "tutorial">(
  post: CollectionEntry<C>,
): CollectionNavPost {
  return { id: post.id, data: { title: post.data.title } };
}
