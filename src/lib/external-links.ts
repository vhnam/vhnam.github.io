import { defineHastPlugin } from "satteri";

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
        children: [{ type: "text", value: " 🔗" }],
      });
    },
  },
});
