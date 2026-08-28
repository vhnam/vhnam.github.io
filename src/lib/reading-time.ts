import getReadingTime from "reading-time";
import { defineMdastPlugin } from "satteri";

export const mdastReadingTimePlugin = defineMdastPlugin({
  name: "reading-time",
  after(root, context) {
    const text = context.textContent(root);
    const { minutes } = getReadingTime(text);

    const astro = context.data.astro;
    if (astro) {
      astro.frontmatter.minutesRead = Math.max(1, Math.ceil(minutes));
    }
  },
});

export function formatReadingTime(minutes: number) {
  return `${minutes} phút đọc`;
}
