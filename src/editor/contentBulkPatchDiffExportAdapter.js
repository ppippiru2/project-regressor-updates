import { renderContentBulkPatchDiffExport } from "./contentBulkPatchDiffExportView.js?v=675";

export function createContentBulkPatchDiffExportRenderer(options = {}) {
  return function renderContentBulkPatchDiffExportSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderContentBulkPatchDiffExport(getPreview(), detailText);
  };
}
