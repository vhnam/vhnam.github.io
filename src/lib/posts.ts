import { type CollectionEntry, getCollection } from "astro:content";
import slugify from "slugify";

export type Post = CollectionEntry<"hobby"> | CollectionEntry<"tutorial">;

export type Filter = "all" | "hobbies" | "tutorials";

type GetPostsOptions = {
  filter: Filter;
  limit?: number;
  ignoreFeatured?: boolean;
};

export const CATEGORY_LABEL = {
  hobby: "Giải Trí",
  tutorial: "Phần Mềm",
} as const;

export function getPostHref(post: Post) {
  const prefix = post.collection === "hobby" ? "/hobbies" : "/tutorials";
  return `${prefix}/${post.id}`;
}

export async function getPosts({
  filter = "all",
  limit,
  ignoreFeatured = false,
}: GetPostsOptions) {
  const hobbies = await getCollection("hobby");
  const tutorials = await getCollection("tutorial");

  let posts = [...hobbies, ...tutorials];
  if (filter !== "all") {
    posts = posts.filter(
      (post) =>
        post.collection === (filter === "hobbies" ? "hobby" : "tutorial"),
    );
  }

  const sorted = posts.sort(
    (firstPost, secondPost) =>
      secondPost.data.datePublished.valueOf() -
      firstPost.data.datePublished.valueOf(),
  );

  const start = ignoreFeatured ? 1 : 0;
  if (limit == null) {
    return sorted.slice(start);
  }

  return sorted.slice(start, start + limit);
}

function isSamePost(first: Post, second: Post) {
  return first.id === second.id && first.collection === second.collection;
}

export async function getAdjacentPosts(post: Post) {
  const filter: Filter = post.collection === "hobby" ? "hobbies" : "tutorials";
  const posts = await getPosts({ filter });
  const index = posts.findIndex((candidate) => isSamePost(candidate, post));

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export async function getRelatedPosts(post: Post, limit = 3) {
  const filter: Filter = post.collection === "hobby" ? "hobbies" : "tutorials";
  const posts = await getPosts({ filter });
  const currentTags = new Set(post.data.tags);

  return posts
    .filter((candidate) => !isSamePost(candidate, post))
    .filter((candidate) =>
      candidate.data.tags.some((tag: string) => currentTags.has(tag)),
    )
    .sort((firstPost, secondPost) => {
      const firstOverlap = firstPost.data.tags.filter((tag: string) =>
        currentTags.has(tag),
      ).length;
      const secondOverlap = secondPost.data.tags.filter((tag: string) =>
        currentTags.has(tag),
      ).length;
      if (secondOverlap !== firstOverlap) {
        return secondOverlap - firstOverlap;
      }
      return (
        secondPost.data.datePublished.valueOf() -
        firstPost.data.datePublished.valueOf()
      );
    })
    .slice(0, limit);
}

export async function getFeaturedPost() {
  const [hobbies, tutorials] = await Promise.all([
    getCollection("hobby"),
    getCollection("tutorial"),
  ]);

  const sorted = [...hobbies, ...tutorials].sort(
    (firstPost, secondPost) =>
      secondPost.data.datePublished.valueOf() -
      firstPost.data.datePublished.valueOf(),
  );

  return sorted.find((post) => post.data.isFeatured) ?? sorted[0];
}

export function getTagSlug(tag: string) {
  return slugify(tag, { lower: true, locale: "vi" });
}

export function getTagHref(tag: string) {
  return `/tags/${getTagSlug(tag)}`;
}

export async function getPostsByTagSlug() {
  const posts = await getPosts({ filter: "all" });
  const tags = new Map<string, { tag: string; posts: Post[] }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = getTagSlug(tag);
      const entry = tags.get(slug);

      if (entry == null) {
        tags.set(slug, { tag, posts: [post] });
        continue;
      }

      entry.posts.push(post);
    }
  }

  return tags;
}
