import { renderContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunView.js?v=675";

export function createContentBulkPatchDryRunRenderer(options = {}) {
  return function renderContentBulkPatchDryRunSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderContentBulkPatchDryRunPreview(getPreview(), detailText);
  };
}
