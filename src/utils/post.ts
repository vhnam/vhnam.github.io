import slugify from "slugify";

export const getTags = (posts: any) => {
  const tags = {} as Record<
    string,
    {
      posts: any[];
      total: number;
    }
  >;

  posts.forEach((post: any) => {
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
