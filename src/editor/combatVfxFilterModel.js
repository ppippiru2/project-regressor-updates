export const COMBAT_VFX_FILTER_KINDS = Object.freeze(["all", "player", "monster"]);

export function normalizeCombatVfxKind(value) {
  return COMBAT_VFX_FILTER_KINDS.includes(value) ? value : "all";
}

export function normalizeCombatVfxSearchQuery(value) {
  return String(value || "").trim().toLowerCase();
}

export function matchesCombatVfxFilter(filter = {}, kind = "", searchText = "") {
  const filterKind = normalizeCombatVfxKind(filter?.kind);
  const query = normalizeCombatVfxSearchQuery(filter?.query);
  if (filterKind !== "all" && filterKind !== kind) return false;
  return !query || String(searchText || "").toLowerCase().includes(query);
}

export function combatVfxPlayerSearchText(row = {}, options = {}) {
  const formatPlacement = typeof options.formatPlacement === "function"
    ? options.formatPlacement
    : fallbackPlacementText;
  return [
    "player",
    row.id,
    row.classId,
    row.gender,
    row.spritePath,
    ...Object.keys(row.effects || {}),
    ...Object.values(row.effects || {}).map(formatPlacement),
  ].join(" ").toLowerCase();
}

export function combatVfxMonsterSearchText(row = {}, options = {}) {
  const formatPlacement = typeof options.formatPlacement === "function"
    ? options.formatPlacement
    : fallbackPlacementText;
  return [
    "monster",
    row.id,
    row.name,
    row.classId,
    row.motionProfile,
    row.sfxProfile,
    row.effectType,
    ...(row.effectModifiers || []),
    formatPlacement(row.profilePlacement),
    formatPlacement(row.basePlacement),
    formatPlacement(row.hyperPlacement),
    ...Object.keys(row.effects || {}),
    ...Object.values(row.effects || {}).map(formatPlacement),
  ].join(" ").toLowerCase();
}

function fallbackPlacementText(placement) {
  if (!placement || typeof placement !== "object") return String(placement || "");
  return Object.values(placement).join(" ");
}
