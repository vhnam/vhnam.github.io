import { defineHastPlugin, type HastNode } from "satteri";

function isWhitespace(node: HastNode) {
  return node.type === "text" && !("value" in node && node.value?.trim());
}

export const hastUnwrapImagesPlugin = defineHastPlugin({
  name: "unwrap-images",
  element: {
    filter: ["p"],
    visit(node, ctx) {
      const significant = node.children.filter((child) => !isWhitespace(child));
      const onlyChild = significant[0];
      const isBareImageParagraph =
        significant.length === 1 &&
        onlyChild?.type === "element" &&
        onlyChild.tagName === "img";

      if (isBareImageParagraph) {
        ctx.replaceNode(node, significant);
      }
    },
  },
});
