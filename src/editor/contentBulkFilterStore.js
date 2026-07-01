import {
  normalizeContentBulkFilterDomain,
  normalizeContentBulkFilterState,
  normalizeContentBulkSearchQuery,
} from "./contentBulkFilterModel.js?v=680";

const EMPTY_CONTENT_BULK_FILTER = Object.freeze({
  state: "all",
  domain: "all",
  query: "",
});

export function createContentBulkFilterStore(options = {}) {
  const storageKey = options.storageKey || "";
  const readJson = typeof options.readJson === "function" ? options.readJson : () => null;
  const writeJson = typeof options.writeJson === "function" ? options.writeJson : () => {};
  const removeItem = typeof options.removeItem === "function" ? options.removeItem : () => {};

  return Object.freeze({
    load() {
      return normalizeContentBulkFilter(readJson(storageKey));
    },
    persist(filter) {
      writeJson(storageKey, normalizeContentBulkFilterForStorage(filter));
    },
    reset() {
      removeItem(storageKey);
      return createEmptyContentBulkFilter();
    },
  });
}

export function createEmptyContentBulkFilter() {
  return { ...EMPTY_CONTENT_BULK_FILTER };
}

export function normalizeContentBulkFilter(filter = {}) {
  return {
    state: normalizeContentBulkFilterState(filter?.state),
    domain: normalizeContentBulkFilterDomain(filter?.domain),
    query: typeof filter?.query === "string" ? filter.query : "",
  };
}

export function normalizeContentBulkFilterForStorage(filter = {}) {
  return {
    ...normalizeContentBulkFilter(filter),
    query: normalizeContentBulkSearchQuery(filter?.query),
  };
}
