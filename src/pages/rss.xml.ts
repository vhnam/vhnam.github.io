import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { getPostHref, getPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const site = context.site;
  if (!site) {
    throw new Error("RSS requires `site` in astro.config");
  }

  const posts = await getPosts({ filter: "all" });

  return rss({
    title: "Nam Vo's Blog",
    description: "Nam Vo | UX Engineer, Music Enthusiast, Cinematographer",
    site,
    trailingSlash: false,
    customData: "<language>vi</language>",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getPostHref(post),
      categories: post.data.tags,
    })),
  });
}
