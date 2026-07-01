import { renderContentBulkPatchDiffExport } from "./contentBulkPatchDiffExportView.js?v=679";

export function createContentBulkPatchDiffExportRenderer(options = {}) {
  return function renderContentBulkPatchDiffExportSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderContentBulkPatchDiffExport(getPreview(), detailText);
  };
}
