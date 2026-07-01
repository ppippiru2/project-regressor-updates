import { renderContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraftView.js?v=676";

export function createContentBulkPatchFilePatchDraftRenderer(options = {}) {
  return function renderContentBulkPatchFilePatchDraftSection(detailText = {}) {
    return renderContentBulkPatchFilePatchDraft(resolvePreviewOption(options.getDraft), detailText, {
      backupPlan: resolvePreviewOption(options.backupPlan),
      restoreRehearsal: resolvePreviewOption(options.restoreRehearsal),
    });
  };
}

function resolvePreviewOption(value) {
  return typeof value === "function" ? value() : value || {};
}
