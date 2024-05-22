export const getTags = (posts: any) => {
  const tags = {} as Record<string, number>;

  posts.forEach((post: any) => {
    post.data.tags?.forEach((tag: string) => {
      const value = tags[tag];
      tags[tag] = value ? value + 1 : 1;
    });
  });

  return Object.entries(tags)
    .sort(([, a], [, b]) => b - a)
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
};
