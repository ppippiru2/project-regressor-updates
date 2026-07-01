import { renderContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportView.js?v=677";

export function createContentBulkPatchStagedImportRenderer(options = {}) {
  return function renderContentBulkPatchStagedImportSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderContentBulkPatchStagedImportPreview(getPreview(), detailText);
  };
}
