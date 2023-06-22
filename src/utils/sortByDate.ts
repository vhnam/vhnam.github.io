import type { CollectionEntry } from "astro:content";

export function sortByDate(
  a: CollectionEntry<"tutorial">,
  b: CollectionEntry<"tutorial">
) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}
