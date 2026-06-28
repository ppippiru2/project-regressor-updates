import { createContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExport.js?v=483";

export const CONTENT_BULK_PATCH_APPLY_GATE_PLAN_VERSION = "content-bulk-patch-apply-gate-plan-v1";

export function createContentBulkPatchApplyGatePlan(exportPreview = createContentBulkPatchFilePatchDraftExport()) {
  const summary = exportPreview.summary || {};
  const gates = createApplyGates(exportPreview);
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
    },
    blockedReasons: [
      "writer-not-implemented",
      "rollback-not-executed",
      "explicit-apply-ui-not-confirmed",
    ],
    gates,
    rollbackSteps,
    validationSteps,
  };
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


