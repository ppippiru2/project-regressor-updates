import { renderMonsterRuntimeBulkIntakePreview } from "./monsterRuntimeBulkIntakeView.js?v=681";

export function createMonsterRuntimeBulkIntakeRenderer(options = {}) {
  return function renderMonsterRuntimeBulkIntake(preview, detailText = {}) {
    const getFilter = typeof options.getFilter === "function" ? options.getFilter : () => null;
    const matchesFilterRow = typeof options.matchesFilterRow === "function"
      ? options.matchesFilterRow
      : () => true;

    return renderMonsterRuntimeBulkIntakePreview(preview, detailText, {
      matchesFilterRow: (state, values, domains) => matchesFilterRow(getFilter(), state, values, domains),
    });
  };
}
