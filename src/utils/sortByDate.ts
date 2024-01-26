import { type CollectionEntry } from "astro:content";

export function sortByDate(
  a: CollectionEntry<"tutorial" | "hobby">,
  b: CollectionEntry<"tutorial" | "hobby">
) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}
