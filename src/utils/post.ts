import type { DataEntry } from "astro:content";
import slugify from "slugify";

import type { Post } from "../content/config";

export const getTags = (
  posts: DataEntry[]
): Record<string, DataEntry & Post> => {
  const tags = {} as Record<
    string,
    {
      posts: DataEntry[];
      total: number;
    }
  >;

  posts.forEach((post: DataEntry) => {
    (post.data as Post).tags?.forEach((tag: string) => {
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
    .reduce((obj, [key, value]) => {
      const slug = slugify(key, {
        locale: "vi",
      }).toLowerCase();

      return Object.assign(obj, {
        [slug]: {
          name: key,
          ...value,
        },
      });
    }, {});
};
