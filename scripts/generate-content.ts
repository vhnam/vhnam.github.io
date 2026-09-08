import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import slugify from "slugify";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)));

const KINDS = {
  hobby: {
    collection: "hobby",
    assets: "hobbies",
    placeholder: { r: 180, g: 83, b: 9 },
  },
  tutorial: {
    collection: "tutorial",
    assets: "tutorials",
    placeholder: { r: 15, g: 118, b: 110 },
  },
} as const;

type Kind = keyof typeof KINDS;

function printUsage() {
  console.error("Usage: pnpm gen:hobby <slug>");
  console.error("       pnpm gen:tutorial <slug>");
}

function parseArgs(argv: string[]): { kind: Kind; rawSlug: string } {
  const args = argv.filter((arg) => arg !== "--");
  const kind = args[0];
  const rawSlug = args[1];

  if (kind !== "hobby" && kind !== "tutorial") {
    printUsage();
    process.exit(1);
  }

  if (!rawSlug) {
    printUsage();
    process.exit(1);
  }

  return { kind, rawSlug };
}

function toSlug(raw: string) {
  const slug = slugify(raw, { lower: true, strict: true, locale: "vi" });

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    console.error(`Invalid slug: ${raw}`);
    process.exit(1);
  }

  return slug;
}

function titleFromSlug(slug: string) {
  const spaced = slug.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function yamlString(value: string) {
  return JSON.stringify(value);
}

async function pathExists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const { kind, rawSlug } = parseArgs(process.argv.slice(2));
  const slug = toSlug(rawSlug);
  const config = KINDS[kind];
  const mdxPath = join(ROOT, "src/content", config.collection, `${slug}.mdx`);
  const assetDir = join(ROOT, "src/assets", config.assets, slug);
  const coverName = `${slug}.webp`;
  const coverPath = join(assetDir, coverName);
  const coverRel = `../../assets/${config.assets}/${slug}/${coverName}`;
  const datePublished = new Date().toISOString().slice(0, 10);

  if (await pathExists(mdxPath)) {
    console.error(`Already exists: ${mdxPath}`);
    process.exit(1);
  }

  if (await pathExists(assetDir)) {
    console.error(`Already exists: ${assetDir}`);
    process.exit(1);
  }

  await mkdir(assetDir, { recursive: true });
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: config.placeholder,
    },
  })
    .webp()
    .toFile(coverPath);

  const mdx = `---
title: ${yamlString(titleFromSlug(slug))}
description: ${yamlString("Mô tả bài viết.")}
datePublished: ${datePublished}
cover: ${yamlString(coverRel)}
tags: []
---

Viết nội dung tại đây.

## Tham khảo
`;

  await writeFile(mdxPath, mdx, "utf8");

  console.log(`Created ${mdxPath}`);
  console.log(`Created ${coverPath}`);
}

await main();
