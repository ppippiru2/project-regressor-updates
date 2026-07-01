import { normalizeCombatVfxKind } from "./combatVfxFilterModel.js?v=677";

const EMPTY_COMBAT_VFX_FILTER = Object.freeze({
  kind: "all",
  query: "",
});

export function createCombatVfxFilterStore(options = {}) {
  const storageKey = options.storageKey || "";
  const readJson = typeof options.readJson === "function" ? options.readJson : () => null;
  const writeJson = typeof options.writeJson === "function" ? options.writeJson : () => {};
  const removeItem = typeof options.removeItem === "function" ? options.removeItem : () => {};

  return Object.freeze({
    load() {
      return normalizeCombatVfxFilter(readJson(storageKey));
    },
    persist(filter) {
      writeJson(storageKey, normalizeCombatVfxFilter(filter));
    },
    reset() {
      removeItem(storageKey);
      return createEmptyCombatVfxFilter();
    },
  });
}

export function createEmptyCombatVfxFilter() {
  return { ...EMPTY_COMBAT_VFX_FILTER };
}

export function normalizeCombatVfxFilter(filter = {}) {
  return {
    kind: normalizeCombatVfxKind(filter?.kind),
    query: typeof filter?.query === "string" ? filter.query : "",
  };
}
