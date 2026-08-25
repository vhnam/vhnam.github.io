const WORDS_PER_MINUTE = 200;

/** Strip MDX/Markdown noise so word count roughly matches readable text. */
function toPlainText(body: string) {
  return body
    .replace(/^import\s.+from\s.+;?\s*$/gm, "")
    .replace(/^export\s.+;?\s*$/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getReadingTimeMinutes(body: string | undefined) {
  if (!body?.trim()) {
    return 1;
  }

  const words = toPlainText(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number) {
  return `${minutes} phút đọc`;
}
