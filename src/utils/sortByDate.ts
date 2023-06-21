import type { CollectionEntry } from "astro:content";

export function sortByDate(
  a: CollectionEntry<"tutorial">,
  b: CollectionEntry<"tutorial">
) {
  return b.data.date.valueOf() - a.data.date.valueOf();
}
