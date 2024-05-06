import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import pluralize from "pluralize";

import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

import { sortByDate } from "../utils/sortByDate";

export async function GET(context: APIContext) {
  const hobbies = await getCollection("hobby");
  const tutorials = await getCollection("tutorial");

  const posts = [...hobbies, ...tutorials].sort(sortByDate);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site as URL,
    items: posts.map((post) => ({
      ...post.data,
      pubDate: post.data.pubDate,
      link: `/${pluralize(post.collection)}/${post.slug}/`,
    })),
  });
}
