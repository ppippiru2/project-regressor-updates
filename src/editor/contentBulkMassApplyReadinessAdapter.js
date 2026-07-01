import { renderContentBulkMassApplyReadiness } from "./contentBulkMassApplyReadinessView.js?v=680";

export function createContentBulkMassApplyReadinessRenderer(options = {}) {
  return function renderContentBulkMassApplyReadinessSection(filteredCandidatePreview = {}, detailText = {}) {
    return renderContentBulkMassApplyReadiness({
      dryRun: resolvePreviewOption(options.dryRun),
      stagedImport: resolvePreviewOption(options.stagedImport),
      applyGate: resolvePreviewOption(options.applyGate),
      backupPlan: resolvePreviewOption(options.backupPlan),
      restoreRehearsal: resolvePreviewOption(options.restoreRehearsal),
      filteredCandidatePreview,
    }, detailText);
  };
}

function resolvePreviewOption(value) {
  return typeof value === "function" ? value() : value || {};
}
