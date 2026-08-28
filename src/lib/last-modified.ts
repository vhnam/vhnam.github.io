import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { defineMdastPlugin } from "satteri";

export const mdastLastModifiedPlugin = defineMdastPlugin({
  name: "last-modified",
  after(_root, context) {
    const astro = context.data.astro;
    if (!astro || !context.fileURL) {
      return;
    }

    const filepath = fileURLToPath(context.fileURL);

    try {
      const result = execFileSync(
        "git",
        ["log", "-1", "--pretty=format:%cI", "--", filepath],
        { cwd: fileURLToPath(new URL("../..", import.meta.url)) },
      )
        .toString()
        .trim();

      if (result) {
        astro.frontmatter.lastModified = result;
      }
    } catch {
      // Not a git checkout (e.g. a fresh clone without history) — skip silently.
    }
  },
});
