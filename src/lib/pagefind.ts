import { spawn } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

function runPagefind(sitePath: string) {
  const bin = join(process.cwd(), "node_modules", ".bin", "pagefind");

  return new Promise<void>((resolvePromise, reject) => {
    const child = spawn(bin, ["--site", sitePath, "--force-language", "vi"], {
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }
      reject(new Error(`pagefind exited with code ${code}`));
    });
  });
}

export function pagefindIntegration(): AstroIntegration {
  return {
    name: "pagefind",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        await runPagefind(fileURLToPath(dir));
      },
    },
  };
}
