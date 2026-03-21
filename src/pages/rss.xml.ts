import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import pluralize from "pluralize";

import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

import { sortByDate } from "../utils/sortByDate";

export async function GET(context: APIContext) {
  const site = context.site;
  if (!site) {
    throw new Error("RSS requires `site` in astro.config");
  }

  const hobbies = await getCollection("hobby");
  const tutorials = await getCollection("tutorial");

  const posts = [...hobbies, ...tutorials].sort(sortByDate);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${pluralize(post.collection)}/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
