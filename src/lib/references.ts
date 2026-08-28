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
