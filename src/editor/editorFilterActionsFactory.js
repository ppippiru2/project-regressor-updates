import { createBalanceCandidateFilter, findBalanceTuningCandidate } from "./balanceFilterModel.js?v=679";
import {
  clearContentBulkQueryFilter,
  createBalanceScopeFilter,
  createCombatVfxKindFilter,
  createContentBulkDomainFilter,
  createContentBulkStateFilter,
  createRetargetKindFilter,
} from "./editorFilterActionState.js?v=679&cachebust=679";
import {
  scrollEditorBalanceCandidateSummaryIntoView,
  scrollEditorContentBulkPackageIntoView,
} from "./editorScrollTargets.js?v=679&cachebust=679";

export function createEditorFilterActions({
  balanceGroups = [],
  elements = {},
  getManifest = () => ({}),
  getBalanceDetailFilter = () => ({}),
  setBalanceDetailFilter = () => {},
  balanceDetailFilterStore,
  getContentBulkDetailFilter = () => ({}),
  setContentBulkDetailFilter = () => {},
  contentBulkFilterStore,
  getCombatVfxDetailFilter = () => ({}),
  setCombatVfxDetailFilter = () => {},
  combatVfxFilterStore,
  getRetargetDetailFilter = () => ({}),
  setRetargetDetailFilter = () => {},
  getExpandedRetargetRows = () => new Set(),
  retargetFilterStore,
} = {}) {
  function persistBalanceDetailFilter() {
    balanceDetailFilterStore?.persist?.(getBalanceDetailFilter());
  }

  function setAndPersistBalanceDetailFilter(filter) {
    setBalanceDetailFilter(filter);
    persistBalanceDetailFilter();
  }

  function persistContentBulkDetailFilter() {
    contentBulkFilterStore?.persist?.(getContentBulkDetailFilter());
  }

  function setAndPersistContentBulkDetailFilter(filter) {
    setContentBulkDetailFilter(filter);
    persistContentBulkDetailFilter();
  }

  function persistCombatVfxDetailFilter() {
    combatVfxFilterStore?.persist?.(getCombatVfxDetailFilter());
  }

  function setAndPersistCombatVfxDetailFilter(filter) {
    setCombatVfxDetailFilter(filter);
    persistCombatVfxDetailFilter();
  }

  function persistRetargetDetailFilter() {
    retargetFilterStore?.persist?.(getRetargetDetailFilter(), getExpandedRetargetRows());
  }

  function setAndPersistRetargetDetailFilter(filter) {
    setRetargetDetailFilter(filter);
    persistRetargetDetailFilter();
  }

  function updateRetargetQuery(value) {
    setAndPersistRetargetDetailFilter({
      ...getRetargetDetailFilter(),
      query: value,
    });
  }

  function updateBalanceQuery(value) {
    setAndPersistBalanceDetailFilter({
      ...getBalanceDetailFilter(),
      query: value,
      candidateId: "",
      candidateLabel: "",
      candidateGroups: [],
    });
  }

  function updateCombatVfxQuery(value) {
    setAndPersistCombatVfxDetailFilter({
      ...getCombatVfxDetailFilter(),
      query: value,
    });
  }

  function updateContentBulkQuery(value) {
    setAndPersistContentBulkDetailFilter({
      ...getContentBulkDetailFilter(),
      query: value,
    });
  }

  function applyContentBulkStateFilter(filterId) {
    setAndPersistContentBulkDetailFilter(createContentBulkStateFilter(getContentBulkDetailFilter(), filterId));
  }

  function applyContentBulkDomainFilter(domainId) {
    setAndPersistContentBulkDetailFilter(createContentBulkDomainFilter(getContentBulkDetailFilter(), domainId));
  }

  function clearContentBulkQueryFilterAction() {
    setAndPersistContentBulkDetailFilter(clearContentBulkQueryFilter(getContentBulkDetailFilter()));
  }

  function resetCombatVfxDetailFilter() {
    setCombatVfxDetailFilter(combatVfxFilterStore?.reset?.() || getCombatVfxDetailFilter());
  }

  function applyCombatVfxKindFilter(kind) {
    setAndPersistCombatVfxDetailFilter(createCombatVfxKindFilter(getCombatVfxDetailFilter(), kind));
  }

  function applyBalanceCandidateFilter(candidateId) {
    const registryMeta = getManifest()?.balanceTuningRegistry || {};
    const candidates = Array.isArray(registryMeta.tuningCandidates) ? registryMeta.tuningCandidates : [];
    const candidate = findBalanceTuningCandidate(candidateId, candidates);
    if (!candidate) return;
    setAndPersistBalanceDetailFilter(createBalanceCandidateFilter(candidate, balanceGroups));
  }

  function resetBalanceDetailFilter() {
    setBalanceDetailFilter(balanceDetailFilterStore?.reset?.() || getBalanceDetailFilter());
  }

  function applyBalanceScopeFilter(scope) {
    setAndPersistBalanceDetailFilter(createBalanceScopeFilter(getBalanceDetailFilter(), scope));
  }

  function resetRetargetDetailFilter() {
    const resetState = retargetFilterStore?.reset?.() || { filter: getRetargetDetailFilter() };
    setRetargetDetailFilter(resetState.filter || {});
    getExpandedRetargetRows()?.clear?.();
  }

  function applyRetargetKindFilter(kind) {
    setAndPersistRetargetDetailFilter(createRetargetKindFilter(getRetargetDetailFilter(), kind));
  }

  function toggleRetargetRow(rowId) {
    const expandedRows = getExpandedRetargetRows();
    if (expandedRows.has(rowId)) {
      expandedRows.delete(rowId);
    } else {
      expandedRows.add(rowId);
    }
    persistRetargetDetailFilter();
  }

  function scrollBalanceCandidateSummaryIntoView() {
    scrollEditorBalanceCandidateSummaryIntoView(elements.panelDetail);
  }

  function scrollContentBulkPackageIntoView() {
    scrollEditorContentBulkPackageIntoView(elements.panelDetail);
  }

  return {
    applyBalanceCandidateFilter,
    applyBalanceScopeFilter,
    applyCombatVfxKindFilter,
    applyContentBulkDomainFilter,
    applyContentBulkStateFilter,
    applyRetargetKindFilter,
    clearContentBulkQueryFilter: clearContentBulkQueryFilterAction,
    resetBalanceDetailFilter,
    resetCombatVfxDetailFilter,
    resetRetargetDetailFilter,
    scrollBalanceCandidateSummaryIntoView,
    scrollContentBulkPackageIntoView,
    toggleRetargetRow,
    updateBalanceQuery,
    updateCombatVfxQuery,
    updateContentBulkQuery,
    updateRetargetQuery,
  };
}
