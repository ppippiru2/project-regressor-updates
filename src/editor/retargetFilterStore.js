import { normalizeRetargetKind } from "./retargetFilterModel.js?v=681";

const EMPTY_RETARGET_FILTER = Object.freeze({
  kind: "all",
  query: "",
});

export function createRetargetFilterStore(options = {}) {
  const storageKey = options.storageKey || "";
  const readJson = typeof options.readJson === "function" ? options.readJson : () => null;
  const writeJson = typeof options.writeJson === "function" ? options.writeJson : () => {};
  const removeItem = typeof options.removeItem === "function" ? options.removeItem : () => {};
  const maxExpandedRows = normalizeMaxExpandedRows(options.maxExpandedRows);

  return Object.freeze({
    load() {
      return normalizeRetargetFilterState(readJson(storageKey), maxExpandedRows);
    },
    persist(filter, expandedRows = []) {
      writeJson(storageKey, {
        ...normalizeRetargetFilter(filter),
        expandedRows: normalizeRetargetExpandedRows(expandedRows).slice(0, maxExpandedRows),
      });
    },
    reset() {
      removeItem(storageKey);
      return createEmptyRetargetFilterState();
    },
  });
}

export function createEmptyRetargetFilter() {
  return { ...EMPTY_RETARGET_FILTER };
}

export function createEmptyRetargetFilterState() {
  return {
    filter: createEmptyRetargetFilter(),
    expandedRows: [],
  };
}

export function normalizeRetargetFilter(filter = {}) {
  return {
    kind: normalizeRetargetKind(filter?.kind),
    query: typeof filter?.query === "string" ? filter.query : "",
  };
}

export function normalizeRetargetExpandedRows(rows = []) {
  if (!Array.isArray(rows)) return [];
  return rows.filter((rowId) => typeof rowId === "string");
}

export function normalizeRetargetFilterState(input = {}, maxExpandedRows = 160) {
  const limit = normalizeMaxExpandedRows(maxExpandedRows);
  return {
    filter: normalizeRetargetFilter(input),
    expandedRows: normalizeRetargetExpandedRows(input?.expandedRows).slice(0, limit),
  };
}

function normalizeMaxExpandedRows(value) {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 160;
}
