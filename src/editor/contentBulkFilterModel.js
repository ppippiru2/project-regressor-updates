import { editorFallbackLabel } from "./editorLabelFormatters.js?v=677";

export const CONTENT_BULK_DOMAIN_FILTERS = Object.freeze([
  "all",
  "monster",
  "equipment_item",
  "loot_item",
  "skill",
  "reward_link",
  "monster_runtime",
  "runtime_vfx"
]);

export function contentBulkPatchDomainLabel(domainId, text = {}) {
  return text.domainLabels?.[domainId] || domainId || "unknown";
}

export function contentBulkFallbackLabel(id, labels = {}, fallback = "unknown") {
  return editorFallbackLabel(id, labels, fallback);
}

export function createContentBulkFilterCounts({
  adapterPreview = {},
  lootSkillPreview = {},
  monsterRuntimePreview = {},
  runtimeVfxPreview = {},
  filter = {},
} = {}) {
  const counts = {
    states: {
      all: 0,
      blocked: 0,
      review: 0,
      ready: 0,
      active: 0,
      empty: 0,
    },
    domains: Object.fromEntries(CONTENT_BULK_DOMAIN_FILTERS.map((domain) => [domain, 0])),
    visibleRows: 0,
    visibleDomains: Object.fromEntries(CONTENT_BULK_DOMAIN_FILTERS.map((domain) => [domain, 0])),
  };
  const states = [
    ...(adapterPreview.mappings || []).map((mapping) => ({
      state: Number(mapping.rowCount || 0) > 0 ? "active" : "empty",
      values: mapping,
      domains: [mapping.domainId || ""],
    })),
    ...(lootSkillPreview.lootRows || []).map((row) => ({
      state: row.intakeState,
      values: row,
      domains: ["loot_item"],
    })),
    ...(lootSkillPreview.skillRows || []).map((row) => ({
      state: row.bulkState,
      values: row,
      domains: ["skill"],
    })),
    ...(monsterRuntimePreview.rows || []).map((row) => ({
      state: row.runtimeState,
      values: row,
      domains: ["monster", "monster_runtime"],
    })),
    ...(runtimeVfxPreview.rows || []).map((row) => ({
      state: row.intakeState,
      values: row,
      domains: ["runtime_vfx"],
    })),
  ];
  for (const { state, values, domains } of states) {
    if (!matchesContentBulkFilterQuery(filter, values)) continue;
    const normalizedDomains = normalizeContentBulkRowDomains(domains);
    if (matchesContentBulkFilterDomain(filter, normalizedDomains)) {
      const bucket = contentBulkStateBucket(state);
      counts.states.all += 1;
      counts.states[bucket] = Number(counts.states[bucket] || 0) + 1;
    }
    if (matchesContentBulkFilterState(filter, state)) {
      counts.domains.all += 1;
      for (const domain of normalizedDomains) {
        if (Object.hasOwn(counts.domains, domain)) {
          counts.domains[domain] = Number(counts.domains[domain] || 0) + 1;
        }
      }
    }
    if (matchesContentBulkFilterRow(filter, state, values, normalizedDomains)) {
      counts.visibleRows += 1;
      for (const domain of normalizedDomains) {
        if (Object.hasOwn(counts.visibleDomains, domain)) {
          counts.visibleDomains[domain] = Number(counts.visibleDomains[domain] || 0) + 1;
        }
      }
    }
  }
  return counts;
}

export function contentBulkFilterLabel(state, labels = {}) {
  return labels?.[state] || state || "all";
}

export function contentBulkDomainLabel(domain, labels = {}) {
  if (domain === "all") return labels?.all || "All";
  return labels?.[domain] || domain || "all";
}

export function matchesContentBulkFilterState(filter = {}, state = "") {
  const filterState = normalizeContentBulkFilterState(filter?.state);
  if (filterState === "all") return true;
  return contentBulkStateBucket(state) === filterState;
}

export function matchesContentBulkFilterRow(filter = {}, state = "", values = [], domains = []) {
  return matchesContentBulkFilterState(filter, state)
    && matchesContentBulkFilterQuery(filter, values)
    && matchesContentBulkFilterDomain(filter, domains);
}

export function matchesContentBulkFilterDomain(filter = {}, domains = []) {
  const filterDomain = normalizeContentBulkFilterDomain(filter?.domain);
  if (filterDomain === "all") return true;
  return normalizeContentBulkRowDomains(domains).includes(filterDomain);
}

export function matchesContentBulkFilterQuery(filter = {}, values = []) {
  const query = normalizeContentBulkSearchQuery(filter?.query);
  if (!query) return true;
  return collectContentBulkSearchText(values).includes(query);
}

export function collectContentBulkSearchText(values = []) {
  const parts = [];
  collectContentBulkSearchParts(values, parts);
  return parts.join(" ").toLowerCase();
}

export function collectContentBulkSearchParts(value, parts) {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) {
    for (const entry of value) collectContentBulkSearchParts(entry, parts);
    return;
  }
  if (typeof value === "object") {
    for (const entry of Object.values(value)) collectContentBulkSearchParts(entry, parts);
    return;
  }
  parts.push(String(value));
}

export function contentBulkStateBucket(state) {
  const value = String(state || "").trim();
  if (value === "empty") return "empty";
  if (value === "active") return "active";
  if (value.includes("blocked") || value.startsWith("withheld-")) return "blocked";
  if (value.startsWith("blocked-")) return "blocked";
  if (value.startsWith("review-")) return "review";
  if (value.includes("unlinked")) return "review";
  if (value === "ready-for-runtime-review") return "review";
  if (value.startsWith("ready-")) return "ready";
  if (value.startsWith("staged-")) return "ready";
  if (value.includes("linked")) return "ready";
  return "review";
}

export function normalizeContentBulkFilterState(state) {
  return ["all", "blocked", "review", "ready", "active", "empty"].includes(state) ? state : "all";
}

export function normalizeContentBulkFilterDomain(domain) {
  return CONTENT_BULK_DOMAIN_FILTERS.includes(domain) ? domain : "all";
}

export function normalizeContentBulkSearchQuery(query) {
  return String(query || "").trim().toLowerCase();
}

export function normalizeContentBulkRowDomains(domains = []) {
  return []
    .concat(domains || [])
    .map((domain) => String(domain || "").trim())
    .filter((domain) => domain && domain !== "all");
}

export function contentBulkActiveFilterSummary(filter = {}, text = {}) {
  const state = normalizeContentBulkFilterState(filter?.state);
  const domain = normalizeContentBulkFilterDomain(filter?.domain);
  const query = normalizeContentBulkSearchQuery(filter?.query);
  return {
    state: contentBulkFilterLabel(state, text.filterLabels),
    domain: contentBulkDomainLabel(domain, text.domainLabels),
    query: query || (text.noQuery || "none"),
  };
}
