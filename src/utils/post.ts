import type { CollectionEntry } from "astro:content";
import slugify from "slugify";

interface TagData {
  posts: CollectionEntry<"tutorial" | "hobby">[];
  total: number;
}

interface TagWithName extends TagData {
  name: string;
}

export const getTags = (
  posts: CollectionEntry<"tutorial" | "hobby">[]
): Record<string, TagWithName> => {
  const tags: Record<string, TagData> = {};

  posts.forEach((post) => {
    post.data.tags?.forEach((tag: string) => {
      if (undefined === tags[tag]) {
        tags[tag] = {
          total: 0,
          posts: [],
        };
      }

      tags[tag].total = tags[tag].total + 1;
      tags[tag].posts.push(post);
    });
  });

  return Object.entries(tags)
    .sort(([, a], [, b]) => b.total - a.total)
    .reduce(
      (obj, [key, value]) => {
        const slug = slugify(key, {
          locale: "vi",
        }).toLowerCase();

        return Object.assign(obj, {
          [slug]: {
            name: key,
            ...value,
          },
        });
      },
      {} as Record<string, TagWithName>
    );
};
