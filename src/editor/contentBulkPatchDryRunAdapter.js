import { renderContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunView.js?v=676";

export function createContentBulkPatchDryRunRenderer(options = {}) {
  return function renderContentBulkPatchDryRunSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderContentBulkPatchDryRunPreview(getPreview(), detailText);
  };
}
