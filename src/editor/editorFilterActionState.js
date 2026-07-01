import { normalizeBalanceScope } from "./balanceFilterModel.js?v=676";
import {
  normalizeContentBulkFilterDomain,
  normalizeContentBulkFilterState,
} from "./contentBulkFilterModel.js?v=676";
import { normalizeCombatVfxKind } from "./combatVfxFilterModel.js?v=676";
import { normalizeRetargetKind } from "./retargetFilterModel.js?v=676";

export function createContentBulkStateFilter(filter = {}, state = "") {
  return {
    ...filter,
    state: normalizeContentBulkFilterState(state),
  };
}

export function createContentBulkDomainFilter(filter = {}, domain = "") {
  return {
    ...filter,
    domain: normalizeContentBulkFilterDomain(domain),
  };
}

export function clearContentBulkQueryFilter(filter = {}) {
  return {
    ...filter,
    query: "",
  };
}

export function createCombatVfxKindFilter(filter = {}, kind = "") {
  return {
    ...filter,
    kind: normalizeCombatVfxKind(kind),
  };
}

export function createBalanceScopeFilter(filter = {}, scope = "") {
  return {
    ...filter,
    scope: normalizeBalanceScope(scope),
    candidateId: "",
    candidateLabel: "",
    candidateGroups: [],
  };
}

export function createRetargetKindFilter(filter = {}, kind = "") {
  return {
    ...filter,
    kind: normalizeRetargetKind(kind),
  };
}
