import { createContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExport.js?v=486";

export const CONTENT_BULK_PATCH_APPLY_GATE_PLAN_VERSION = "content-bulk-patch-apply-gate-plan-v1";

export function createContentBulkPatchApplyGatePlan(exportPreview = createContentBulkPatchFilePatchDraftExport()) {
  const summary = exportPreview.summary || {};
  const gates = createApplyGates(exportPreview);
  const reviewChecklist = createReviewChecklist(exportPreview);
  const rollbackSteps = [
    "export-current-save-data",
    "snapshot-target-files",
    "record-patch-draft-payload",
    "restore-target-files-on-failure",
  ];
  const validationSteps = [
    "run-content-bulk-patch-file-patch-draft-export-check",
    "run-editor-balance-tuning-metadata-check",
    "run-quick-check",
    "run-web-build",
    "verify-local-http",
  ];

  return {
    version: CONTENT_BULK_PATCH_APPLY_GATE_PLAN_VERSION,
    sourceVersion: exportPreview.version,
    writesGameData: false,
    applyEnabled: false,
    requiresManualReview: true,
    requiresExplicitApply: true,
    requiresBackup: true,
    requiresRollbackPlan: true,
    applyMode: "disabled-writer-skeleton",
    status: "apply-disabled",
    summary: {
      targetFileCount: summary.exportedFileCount || 0,
      patchBlockCount: summary.exportedBlockCount || 0,
      stagedRowCount: summary.stagedRowCount || 0,
      gateCount: gates.length,
      rollbackStepCount: rollbackSteps.length,
      validationStepCount: validationSteps.length,
      blockedReasonCount: 3,
      reviewItemCount: reviewChecklist.length,
      readyReviewItemCount: reviewChecklist.filter((item) => item.state === "ready").length,
      warningReviewItemCount: reviewChecklist.filter((item) => item.state === "review").length,
      blockedReviewItemCount: reviewChecklist.filter((item) => item.state === "blocked").length,
    },
    blockedReasons: [
      "writer-not-implemented",
      "rollback-not-executed",
      "explicit-apply-ui-not-confirmed",
    ],
    reviewChecklist,
    gates,
    rollbackSteps,
    validationSteps,
  };
}

function createReviewChecklist(exportPreview) {
  const summary = exportPreview.summary || {};
  return [
    {
      id: "review-patch-draft-payload",
      state: (summary.exportedFileCount || 0) > 0 ? "ready" : "blocked",
      blocksApply: true,
      detail: `${summary.exportedFileCount || 0} files / ${summary.exportedBlockCount || 0} blocks`,
    },
    {
      id: "resolve-withheld-rows",
      state: (summary.withheldRowCount || 0) > 0 ? "blocked" : "ready",
      blocksApply: true,
      detail: `${summary.withheldRowCount || 0} withheld`,
    },
    {
      id: "review-update-candidates",
      state: (summary.updateDraftCount || 0) > 0 ? "review" : "ready",
      blocksApply: true,
      detail: `${summary.updateDraftCount || 0} updates`,
    },
    {
      id: "confirm-explicit-apply",
      state: "blocked",
      blocksApply: true,
      detail: "required",
    },
    {
      id: "prepare-backup-snapshot",
      state: "blocked",
      blocksApply: true,
      detail: `${summary.exportedFileCount || 0} target files`,
    },
    {
      id: "prepare-rollback-rehearsal",
      state: "blocked",
      blocksApply: true,
      detail: "required",
    },
    {
      id: "run-validation-suite",
      state: "waiting",
      blocksApply: true,
      detail: "after manual review",
    },
  ];
}

function createApplyGates(exportPreview) {
  return [
    {
      id: "review-export-payload",
      state: exportPreview.payload?.files?.length ? "ready" : "blocked",
      blocksApply: true,
    },
    {
      id: "confirm-user-intent",
      state: "blocked",
      blocksApply: true,
    },
    {
      id: "create-backup",
      state: "blocked",
      blocksApply: true,
    },
    {
      id: "snapshot-target-files",
      state: "blocked",
      blocksApply: true,
    },
    {
      id: "apply-file-patches",
      state: "disabled",
      blocksApply: true,
    },
    {
      id: "run-post-apply-checks",
      state: "waiting",
      blocksApply: true,
    },
  ];
}


