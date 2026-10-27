import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { OEMBED_ENDPOINT, threadsShortcode } from "../src/lib/threads";

const LIST_PATH = join(
  fileURLToPath(new URL("..", import.meta.url)),
  "src/content/gallery.json",
);

async function main() {
  const url = process.argv.slice(2).find((arg) => arg !== "--");

  if (!url) {
    console.error("Usage: pnpm gallery:add <threads-post-url>");
    process.exit(1);
  }

  const shortcode = threadsShortcode(url);
  const list = JSON.parse(await readFile(LIST_PATH, "utf8")) as string[];

  if (list.some((item) => threadsShortcode(item) === shortcode)) {
    console.error(`Already in gallery: ${shortcode}`);
    process.exit(1);
  }

  // Private, deleted, or geo-gated posts fail here instead of at build time.
  const response = await fetch(
    `${OEMBED_ENDPOINT}?url=${encodeURIComponent(url)}`,
  );

  if (!response.ok) {
    console.error(
      `Threads oEmbed ${response.status}: ${await response.text()}`,
    );
    process.exit(1);
  }

  const clean = url.split(/[?#]/)[0];
  await writeFile(LIST_PATH, `${JSON.stringify([...list, clean], null, 2)}\n`);
  console.log(`Added ${clean}`);
}

await main();
