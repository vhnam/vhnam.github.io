import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)), "src");
const CHECK = process.argv.includes("--check");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path)));
    } else if (entry.name.endsWith(".mdx")) {
      files.push(path);
    }
  }

  return files;
}

function formatQuotedAttribute(value) {
  return value.replace(/^\s+|\s+$/g, "").replace(/\s*\n\s*/g, " ");
}

function formatOpeningTag(attributes) {
  const withoutBlankLines = attributes.replace(/\n[ \t]*\n+/g, "\n");

  return withoutBlankLines.replace(
    /=\s*"([^"]*)"/g,
    (_match, value) => `="${formatQuotedAttribute(value)}"`,
  );
}

function formatMdx(source) {
  return source
    .split(/(```[\s\S]*?```)/g)
    .map((part, index) => {
      if (index % 2 === 1) {
        return part;
      }

      return part.replace(
        /<([A-Za-z][\w:-]*)(\s[\s\S]*?)(\s*\/?)>/g,
        (_match, name, attributes, close) =>
          `<${name}${formatOpeningTag(attributes)}${close}>`,
      );
    })
    .join("");
}

const files = await walk(ROOT);
const dirty = [];

for (const file of files) {
  const original = await readFile(file, "utf8");
  const formatted = formatMdx(original);

  if (formatted === original) {
    continue;
  }

  dirty.push(file);
  if (!CHECK) {
    await writeFile(file, formatted);
  }
}

if (CHECK && dirty.length > 0) {
  console.error("MDX HTML tags need formatting:");
  for (const file of dirty) {
    console.error(`  ${file}`);
  }
  process.exit(1);
}
