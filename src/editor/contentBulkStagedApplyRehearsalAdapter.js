import { renderContentBulkStagedApplyRehearsal } from "./contentBulkStagedApplyRehearsalView.js?v=678";

export function createContentBulkStagedApplyRehearsalRenderer(options = {}) {
  return function renderContentBulkStagedApplyRehearsalSection(filteredCandidatePreview = {}, detailText = {}) {
    return renderContentBulkStagedApplyRehearsal({
      stagedImport: resolvePreviewOption(options.stagedImport),
      filePatchDraftExport: resolvePreviewOption(options.filePatchDraftExport),
      backupPlan: resolvePreviewOption(options.backupPlan),
      restoreRehearsal: resolvePreviewOption(options.restoreRehearsal),
      filteredCandidatePreview,
    }, detailText);
  };
}

function resolvePreviewOption(value) {
  return typeof value === "function" ? value() : value || {};
}
