import { type CollectionEntry, getCollection } from "astro:content";

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
      secondPost.data.pubDate.valueOf() - firstPost.data.pubDate.valueOf(),
  );

  const start = ignoreFeatured ? 1 : 0;
  if (limit == null) {
    return sorted.slice(start);
  }

  return sorted.slice(start, start + limit);
}

export async function getFeaturedPost() {
  const [hobbies, tutorials] = await Promise.all([
    getCollection("hobby"),
    getCollection("tutorial"),
  ]);

  const sorted = [...hobbies, ...tutorials].sort(
    (firstPost, secondPost) =>
      secondPost.data.pubDate.valueOf() - firstPost.data.pubDate.valueOf(),
  );

  return sorted.find((post) => post.data.isFeatured) ?? sorted[0];
}
