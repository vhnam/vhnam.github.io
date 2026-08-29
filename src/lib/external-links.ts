import { defineHastPlugin } from "satteri";

import externalLinkIconSource from "#/components/icons/external-link.svg?raw";

const externalLinkIconPath =
  externalLinkIconSource.match(/<path[^>]*\sd="([^"]+)"/)?.[1] ?? "";

export const hastExternalLinksPlugin = defineHastPlugin({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(node, context) {
      const href = node.properties?.href;
      if (typeof href !== "string" || !href.startsWith("http")) {
        return;
      }

      context.appendChild(node, {
        type: "element",
        tagName: "span",
        properties: { ariaHidden: "true" },
        children: [
          {
            type: "element",
            tagName: "svg",
            properties: {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: [
                "ml-1",
                "inline-block",
                "size-[0.75em]",
                "align-baseline",
              ],
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: { d: externalLinkIconPath },
                children: [],
              },
            ],
          },
        ],
      });
    },
  },
});
