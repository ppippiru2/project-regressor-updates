import {
  normalizeBalanceCandidateGroups,
  normalizeBalanceScope,
} from "./balanceFilterModel.js?v=680";

const EMPTY_BALANCE_DETAIL_FILTER = Object.freeze({
  scope: "all",
  query: "",
  candidateId: "",
  candidateLabel: "",
  candidateGroups: [],
});

export function createBalanceDetailFilterStore(options = {}) {
  const storageKey = options.storageKey || "";
  const groups = Array.isArray(options.groups) ? options.groups : [];
  const readJson = typeof options.readJson === "function" ? options.readJson : () => null;
  const writeJson = typeof options.writeJson === "function" ? options.writeJson : () => {};
  const removeItem = typeof options.removeItem === "function" ? options.removeItem : () => {};

  return Object.freeze({
    load() {
      return normalizeBalanceDetailFilter(readJson(storageKey), groups);
    },
    persist(filter) {
      writeJson(storageKey, normalizeBalanceDetailFilterForStorage(filter, groups));
    },
    reset() {
      removeItem(storageKey);
      return createEmptyBalanceDetailFilter();
    },
  });
}

export function createEmptyBalanceDetailFilter() {
  return { ...EMPTY_BALANCE_DETAIL_FILTER, candidateGroups: [] };
}

export function normalizeBalanceDetailFilter(filter = {}, groups = []) {
  return {
    scope: normalizeBalanceScope(filter?.scope),
    query: typeof filter?.query === "string" ? filter.query : "",
    candidateId: typeof filter?.candidateId === "string" ? filter.candidateId : "",
    candidateLabel: typeof filter?.candidateLabel === "string" ? filter.candidateLabel : "",
    candidateGroups: normalizeBalanceCandidateGroups(filter?.candidateGroups, groups),
  };
}

export function normalizeBalanceDetailFilterForStorage(filter = {}, groups = []) {
  return {
    ...normalizeBalanceDetailFilter(filter, groups),
    query: String(filter?.query || ""),
    candidateId: String(filter?.candidateId || ""),
    candidateLabel: String(filter?.candidateLabel || ""),
  };
}
