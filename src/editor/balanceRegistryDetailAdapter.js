import {
  renderBalanceGroupRow,
  renderBalancePacingSnapshot,
  renderBalanceRelatedChecks,
} from "./balanceRegistryDetailView.js?v=680";

export function createBalanceGroupRowRenderer() {
  return function renderBalanceGroupRowSection(group, detailText = {}, options = {}) {
    return renderBalanceGroupRow(group, detailText, options);
  };
}

export function createBalancePacingSnapshotRenderer() {
  return function renderBalancePacingSnapshotSection(snapshot, detailText = {}) {
    return renderBalancePacingSnapshot(snapshot, detailText);
  };
}

export function createBalanceRelatedChecksRenderer() {
  return function renderBalanceRelatedChecksSection(checks = [], detailText = {}) {
    return renderBalanceRelatedChecks(checks, detailText);
  };
}
