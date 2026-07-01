import {
  renderBalanceFilterControls,
  renderEmptyBalanceRows,
} from "./balanceFilterControlsView.js?v=680";

export function createBalanceFilterControlsRenderer() {
  return function renderBalanceFilterControlsSection(detailText = {}, visibleCount = 0, totalCount = 0, options = {}) {
    return renderBalanceFilterControls(detailText, visibleCount, totalCount, options);
  };
}

export function createEmptyBalanceRowsRenderer() {
  return function renderEmptyBalanceRowsSection(detailText = {}, options = {}) {
    return renderEmptyBalanceRows(detailText, options);
  };
}
