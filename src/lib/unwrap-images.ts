type HastNode = {
  type: string;
  tagName?: string;
  children?: HastNode[];
  value?: string;
};

function isWhitespace(node: HastNode) {
  return node.type === "text" && !node.value?.trim();
}

function isBareImageParagraph(node: HastNode) {
  if (node.type !== "element" || node.tagName !== "p") {
    return false;
  }

  const significant = (node.children ?? []).filter(
    (child) => !isWhitespace(child),
  );
  return (
    significant.length === 1 &&
    significant[0]?.type === "element" &&
    significant[0].tagName === "img"
  );
}

function unwrapImageParagraphs(parent: HastNode) {
  const children = parent.children;
  if (!children) {
    return;
  }

  parent.children = children.flatMap((node) => {
    if (!isBareImageParagraph(node)) {
      return [node];
    }

    return (node.children ?? []).filter((child) => !isWhitespace(child));
  });
}

function walk(node: HastNode) {
  for (const child of node.children ?? []) {
    walk(child);
  }
  unwrapImageParagraphs(node);
}

export function rehypeUnwrapImages() {
  return (tree: HastNode) => {
    walk(tree);
  };
}
