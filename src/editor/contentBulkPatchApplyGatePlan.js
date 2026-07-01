import {
  createContentBulkPatchFilePatchDraftExport,
} from "./contentBulkPatchFilePatchDraftExport.js?v=675";
import {
  createContentBulkFilteredCandidateStageGateCountsFromPreview,
  createContentBulkFilteredCandidateStageGateReasonCodesFromPreview,
} from "./contentBulkFilteredCandidateStageGate.js?v=675";
import { createContentBulkPatchReviewIssueSummary } from "./contentBulkPatchIssueSummary.js?v=675";
import { createContentBulkPatchPreApplyReview } from "./contentBulkPatchPreApplyReview.js?v=675";

export const CONTENT_BULK_PATCH_APPLY_GATE_PLAN_VERSION = "content-bulk-patch-apply-gate-plan-v1";

export function createContentBulkPatchApplyGatePlan(exportPreview = createContentBulkPatchFilePatchDraftExport(), options = {}) {
  const summary = exportPreview.summary || {};
  const filteredCandidatePreview = options.filteredCandidatePreview || {};
  const filteredCandidateStageGateCounts = createContentBulkFilteredCandidateStageGateCountsFromPreview(filteredCandidatePreview);
  const filteredCandidateStageGateReasonCodes = createContentBulkFilteredCandidateStageGateReasonCodesFromPreview(filteredCandidatePreview);
  const gates = createApplyGates(exportPreview);
  const preApplyReview = exportPreview.preApplyReview || exportPreview.payload?.preApplyReview || createContentBulkPatchPreApplyReview(summary);
  const reviewChecklist = preApplyReview.checklist || [];
  const issueSummary = createContentBulkPatchReviewIssueSummary({ reviewItems: reviewChecklist, blockedReasons: [
    "writer-not-implemented",
    "rollback-not-executed",
    "explicit-apply-ui-not-confirmed",
  ] });
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
      blockingIssueCount: issueSummary.blockingIssueCodes.length,
      warningIssueCount: issueSummary.warningIssueCodes.length,
      reviewItemCount: preApplyReview.summary?.reviewItemCount || reviewChecklist.length,
      readyReviewItemCount: preApplyReview.summary?.readyReviewItemCount || reviewChecklist.filter((item) => item.state === "ready").length,
      warningReviewItemCount: preApplyReview.summary?.warningReviewItemCount || reviewChecklist.filter((item) => item.state === "review").length,
      blockedReviewItemCount: preApplyReview.summary?.blockedReviewItemCount || reviewChecklist.filter((item) => item.state === "blocked").length,
      contractReadyRowCount: preApplyReview.summary?.contractReadyRowCount || 0,
      contractBlockedRowCount: preApplyReview.summary?.contractBlockedRowCount || 0,
      contractWarningRowCount: preApplyReview.summary?.contractWarningRowCount || 0,
      contractTargetSurfaceCount: preApplyReview.summary?.contractTargetSurfaceCount || 0,
      filteredCandidateVisibleRowCount: filteredCandidatePreview.summary?.visibleRowCount || 0,
      filteredCandidateBlockingRowCount: filteredCandidatePreview.summary?.blockingRowCount || 0,
      filteredCandidateWarningRowCount: filteredCandidatePreview.summary?.warningRowCount || 0,
      filteredCandidateStageGateReadyRowCount: filteredCandidateStageGateCounts.ready,
      filteredCandidateStageGateReviewRowCount: filteredCandidateStageGateCounts.review,
      filteredCandidateStageGateBlockedRowCount: filteredCandidateStageGateCounts.blocked,
      filteredCandidateStageGateNotStagedRowCount: filteredCandidateStageGateCounts.notStaged,
      filteredCandidateStageGateReasonCount: filteredCandidateStageGateReasonCodes.length,
    },
    filteredCandidateGate: {
      activeFilter: filteredCandidatePreview.activeFilter || null,
      visibleRowCount: filteredCandidatePreview.summary?.visibleRowCount || 0,
      blockingRowCount: filteredCandidatePreview.summary?.blockingRowCount || 0,
      warningRowCount: filteredCandidatePreview.summary?.warningRowCount || 0,
      stageGateCounts: filteredCandidateStageGateCounts,
      reasonCodes: filteredCandidateStageGateReasonCodes,
      requiresExplicitApply: true,
      writesGameData: false,
    },
    blockedReasons: [
      "writer-not-implemented",
      "rollback-not-executed",
      "explicit-apply-ui-not-confirmed",
    ],
    issueSummary,
    preApplyReview,
    reviewChecklist,
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
