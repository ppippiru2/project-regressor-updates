import { renderRuntimeVfxBulkIntakePreview } from "./runtimeVfxBulkIntakeView.js?v=676";

export function createRuntimeVfxBulkIntakeRenderer(options = {}) {
  return function renderRuntimeVfxBulkIntake(preview, detailText = {}) {
    const getFilter = typeof options.getFilter === "function" ? options.getFilter : () => null;
    const matchesFilterRow = typeof options.matchesFilterRow === "function"
      ? options.matchesFilterRow
      : () => true;
    const formatPlacement = typeof options.formatPlacement === "function"
      ? options.formatPlacement
      : undefined;

    return renderRuntimeVfxBulkIntakePreview(preview, detailText, {
      matchesFilterRow: (state, values, domains) => matchesFilterRow(getFilter(), state, values, domains),
      formatPlacement,
    });
  };
}
