import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=482";
import { createContentBulkPatchTemplate } from "./contentBulkPatchIntakeContract.js?v=482";

export const CONTENT_BULK_PATCH_MANUAL_APPLY_CHECKLIST_VERSION = "content-bulk-patch-manual-apply-checklist-v1";

export function createContentBulkPatchManualApplyChecklist(batch = createContentBulkPatchTemplate(), options = {}) {
  const diffExport = options.diffExport || createContentBulkPatchDiffExport(batch, options);
  const fileChecklists = (diffExport.fileTargets || []).map(createFileChecklist);
  const uniqueChecks = Array.from(new Set((diffExport.domains || []).flatMap((domain) => domain.checkScripts || []))).sort();
  const blockedFileCount = fileChecklists.filter((entry) => entry.status === "review-withheld").length;
  const updateFileCount = fileChecklists.filter((entry) => entry.status === "review-update").length;
  const summary = {
    targetFileCount: fileChecklists.length,
    targetSurfaceCount: fileChecklists.reduce((sum, entry) => sum + entry.surfaceCount, 0),
    manualItemCount: fileChecklists.length,
    surfaceReviewItemCount: fileChecklists.reduce((sum, entry) => sum + entry.surfaceReviewItems.length, 0),
    stagedRowCount: diffExport.summary?.stagedRowCount || 0,
    appendStageCount: diffExport.summary?.appendStageCount || 0,
    updateStageCount: diffExport.summary?.updateStageCount || 0,
    withheldRowCount: diffExport.summary?.withheldRowCount || 0,
    blockedFileCount,
    updateFileCount,
    readyFileCount: fileChecklists.length - blockedFileCount - updateFileCount,
    preflightStepCount: PREFLIGHT_STEPS.length,
    verificationStepCount: uniqueChecks.length,
  };

  return {
    version: CONTENT_BULK_PATCH_MANUAL_APPLY_CHECKLIST_VERSION,
    sourceVersion: diffExport.version,
    writesGameData: false,
    exportsChecklistOnly: true,
    requiresManualReview: true,
    requiresExplicitApply: true,
    applyMode: "manual-checklist-only",
    status: checklistStatus(summary),
    summary,
    preflightSteps: PREFLIGHT_STEPS,
    fileChecklists,
    verificationSteps: uniqueChecks,
    finalReviewSteps: [
      "compare-file-targets-with-diff-export",
      "apply-only-after-user-confirmation",
      "run-required-checks",
      "verify-game-editor-and-update-manifest",
    ],
  };
}

const PREFLIGHT_STEPS = [
  "confirm-batch-source",
  "review-withheld-rows",
  "review-existing-id-updates",
  "prepare-target-file-backup",
];

function createFileChecklist(target, index) {
  const surfaceReviewItems = (target.surfaces || []).map((surface) => ({
    id: surface.id,
    domainId: surface.domainId,
    surface: surface.surface || surface.id,
    stagedCandidateCount: surface.stagedCandidateCount || 0,
    state: surface.state || "unknown",
    reviewAction: reviewActionForSurface(surface),
  }));
  return {
    order: index + 1,
    file: target.file,
    status: fileChecklistStatus(target),
    domainIds: target.domainIds || [],
    surfaceCount: target.surfaceCount || surfaceReviewItems.length,
    stagedRowCount: target.stagedRowCount || 0,
    appendStageCount: target.appendStageCount || 0,
    updateStageCount: target.updateStageCount || 0,
    withheldRowCount: target.withheldRowCount || 0,
    actions: createTargetActions(target),
    surfaceReviewItems,
  };
}

function createTargetActions(target) {
  const actions = ["open-target-file", "locate-target-surfaces"];
  if ((target.appendStageCount || 0) > 0) actions.push("append-new-rows");
  if ((target.updateStageCount || 0) > 0) actions.push("review-and-update-existing-rows");
  if ((target.withheldRowCount || 0) > 0) actions.push("hold-blocked-rows");
  actions.push("save-after-explicit-confirmation");
  return actions;
}

function fileChecklistStatus(target) {
  if ((target.withheldRowCount || 0) > 0) return "review-withheld";
  if ((target.updateStageCount || 0) > 0) return "review-update";
  return "ready-for-manual-apply";
}

function checklistStatus(summary) {
  if ((summary.withheldRowCount || 0) > 0) return "review-withheld-rows";
  if ((summary.updateStageCount || 0) > 0) return "review-update-candidates";
  if ((summary.stagedRowCount || 0) > 0) return "ready-for-manual-apply";
  return "empty";
}

function reviewActionForSurface(surface) {
  const surfaceName = surface.surface || surface.id || "";
  if (surfaceName.includes("localization") || surfaceName.includes("ko-KR")) return "verify-visible-text";
  if (surfaceName.includes("drop") || surfaceName.includes("reward")) return "verify-reward-link";
  if (surfaceName.includes("asset") || surfaceName.includes("slot")) return "verify-asset-slot";
  if (surface.domainId === "skill") return "verify-skill-runtime";
  if (surface.domainId === "monster") return "verify-monster-runtime";
  return "verify-data-row";
}


