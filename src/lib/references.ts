type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

function normalizeId(id: string) {
  return id.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function isReferencesHeadingId(id: string | undefined) {
  if (!id) {
    return false;
  }

  const normalized = normalizeId(id);
  return (
    normalized === "tham-khao" ||
    normalized === "references" ||
    normalized === "reference"
  );
}

function headingText(node: HastNode) {
  const parts: string[] = [];

  const walk = (current: HastNode) => {
    if (current.type === "text" && current.value) {
      parts.push(current.value);
    }
    for (const child of current.children ?? []) {
      walk(child);
    }
  };

  walk(node);
  return parts.join("").replace(/\s+/g, " ").trim();
}

function isReferencesHeading(node: HastNode) {
  if (node.type !== "element" || node.tagName !== "h2") {
    return false;
  }

  const id = node.properties?.id;
  if (typeof id === "string" && isReferencesHeadingId(id)) {
    return true;
  }

  return /^(tham khảo|references?)$/i.test(headingText(node));
}

function wrapReferences(parent: HastNode) {
  const children = parent.children;
  if (!children) {
    return;
  }

  const start = children.findIndex(isReferencesHeading);
  if (start === -1) {
    return;
  }

  let end = children.length;
  for (let index = start + 1; index < children.length; index++) {
    const node = children[index];
    if (
      node?.type === "element" &&
      node.tagName != null &&
      /^h[1-6]$/.test(node.tagName)
    ) {
      end = index;
      break;
    }
  }

  const heading = children[start];
  const labelledBy =
    heading && typeof heading.properties?.id === "string"
      ? heading.properties.id
      : undefined;

  const section: HastNode = {
    type: "element",
    tagName: "section",
    properties: {
      className: ["post-references"],
      ...(labelledBy ? { "aria-labelledby": labelledBy } : {}),
    },
    children: children
      .slice(start, end)
      .map((node) =>
        node.type === "element" && node.tagName === "ul"
          ? { ...node, tagName: "ol" }
          : node,
      ),
  };

  parent.children = [
    ...children.slice(0, start),
    section,
    ...children.slice(end),
  ];
}

function walk(node: HastNode) {
  for (const child of node.children ?? []) {
    walk(child);
  }
  wrapReferences(node);
}

export function rehypeWrapReferences() {
  return (tree: HastNode) => {
    walk(tree);
  };
}
