export const RETARGET_FILTER_KINDS = Object.freeze(["all", "text", "asset"]);

export function normalizeRetargetKind(value) {
  return RETARGET_FILTER_KINDS.includes(value) ? value : "all";
}

export function normalizeRetargetSearchQuery(value) {
  return String(value || "").trim().toLowerCase();
}

export function matchesRetargetFilter(entry = {}, filter = {}) {
  const kind = normalizeRetargetKind(filter?.kind);
  const query = normalizeRetargetSearchQuery(filter?.query);
  if (kind !== "all" && entry.kind !== kind) return false;
  return !query || String(entry.searchText || "").toLowerCase().includes(query);
}

export function createRetargetTextSearchText(entry = {}) {
  return [
    "text",
    entry.sourcePath,
    entry.sourceText,
    entry.targetTextPath,
    entry.targetText,
  ].join(" ").toLowerCase();
}

export function createRetargetAssetSearchText(entry = {}) {
  return [
    "asset",
    entry.sourceAssetId,
    entry.targetAssetId,
    entry.plannedSourceFile,
    entry.plannedWebpFile,
    entry.mappedTargetAssetId,
    ...(entry.slotPaths || []),
  ].join(" ").toLowerCase();
}
