import { renderContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExportView.js?v=680";

export function createContentBulkPatchFilePatchDraftExportRenderer(options = {}) {
  return function renderContentBulkPatchFilePatchDraftExportSection(detailText = {}) {
    return renderContentBulkPatchFilePatchDraftExport(resolvePreviewOption(options.getExport), detailText, {
      backupPlan: resolvePreviewOption(options.backupPlan),
      restoreRehearsal: resolvePreviewOption(options.restoreRehearsal),
    });
  };
}

function resolvePreviewOption(value) {
  return typeof value === "function" ? value() : value || {};
}
