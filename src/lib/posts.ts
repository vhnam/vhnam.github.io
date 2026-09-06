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

export function getCategoryHref(collection: "hobby" | "tutorial") {
  return collection === "hobby" ? "/hobbies" : "/tutorials";
}

export function getPostHref(post: Post) {
  const prefix = post.collection === "hobby" ? "/hobbies" : "/tutorials";
  return `${prefix}/${post.id}`;
}

let allPostsCache: Promise<Post[]> | null = null;

async function getAllPostsSorted() {
  allPostsCache ??= (async () => {
    const [hobbies, tutorials] = await Promise.all([
      getCollection("hobby"),
      getCollection("tutorial"),
    ]);

    return [...hobbies, ...tutorials].sort(
      (firstPost, secondPost) =>
        secondPost.data.datePublished.valueOf() -
        firstPost.data.datePublished.valueOf(),
    );
  })();

  return allPostsCache;
}

export async function getPosts({
  filter = "all",
  limit,
  ignoreFeatured = false,
}: GetPostsOptions) {
  const sorted = await getAllPostsSorted();

  const posts =
    filter === "all"
      ? sorted
      : sorted.filter(
          (post) =>
            post.collection === (filter === "hobbies" ? "hobby" : "tutorial"),
        );

  const start = ignoreFeatured ? 1 : 0;
  if (limit == null) {
    return posts.slice(start);
  }

  return posts.slice(start, start + limit);
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
  const sorted = await getAllPostsSorted();

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
