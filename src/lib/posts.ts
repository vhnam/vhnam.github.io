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
  limit = 6,
  ignoreFeatured = false,
}: GetPostsOptions) {
  const hobbies = await getCollection("hobby");
  const tutorials = await getCollection("tutorial");
  const numberOfPosts = ignoreFeatured ? limit + 1 : limit;

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

  return sorted.slice(ignoreFeatured ? 1 : 0, numberOfPosts);
}

export async function getLatestPost() {
  const [hobbies, tutorials] = await Promise.all([
    getCollection("hobby"),
    getCollection("tutorial"),
  ]);

  return [...hobbies, ...tutorials].sort(
    (firstPost, secondPost) =>
      secondPost.data.pubDate.valueOf() - firstPost.data.pubDate.valueOf(),
  )[0];
}
