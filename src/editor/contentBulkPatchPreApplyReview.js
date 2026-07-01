export const CONTENT_BULK_PATCH_PRE_APPLY_REVIEW_VERSION = "content-bulk-patch-pre-apply-review-v1";

export function createContentBulkPatchPreApplyReview(summary = {}) {
  const contractReviewSummary = normalizePreApplyContractReviewSummary(summary.contractReviewSummary);
  const checklist = createContentBulkPatchPreApplyReviewChecklist({
    ...summary,
    contractReviewSummary,
  });
  return {
    version: CONTENT_BULK_PATCH_PRE_APPLY_REVIEW_VERSION,
    writesGameData: false,
    applyEnabled: false,
    requiresManualReview: true,
    requiresExplicitApply: true,
    requiresBackup: true,
    requiresRollbackPlan: true,
    contractReviewSummary,
    checklist,
    summary: {
      reviewItemCount: checklist.length,
      readyReviewItemCount: checklist.filter((item) => item.state === "ready").length,
      warningReviewItemCount: checklist.filter((item) => item.state === "review").length,
      blockedReviewItemCount: checklist.filter((item) => item.state === "blocked").length,
      contractReadyRowCount: contractReviewSummary.readyForStageCount,
      contractBlockedRowCount: contractReviewSummary.blockedCount,
      contractWarningRowCount: contractReviewSummary.warningCount,
      contractTargetSurfaceCount: contractReviewSummary.targetSurfaceCount,
    },
  };
}

export function createContentBulkPatchPreApplyReviewChecklist(summary = {}) {
  const contractReviewSummary = normalizePreApplyContractReviewSummary(summary.contractReviewSummary);
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
      id: "review-row-contracts",
      state: rowContractReviewState(contractReviewSummary),
      blocksApply: true,
      detail: `${contractReviewSummary.readyForStageCount} ready / ${contractReviewSummary.blockedCount} blocked / ${contractReviewSummary.warningCount} review / ${contractReviewSummary.targetSurfaceCount} surfaces`,
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

export function createPreApplyContractReviewSummary(domains = []) {
  const summaries = (Array.isArray(domains) ? domains : [])
    .map((domain) => domain.contractReviewSummary)
    .filter(Boolean);
  if (!summaries.length) return normalizePreApplyContractReviewSummary();
  return normalizePreApplyContractReviewSummary({
    rowCount: summaries.reduce((sum, summary) => sum + Number(summary.rowCount || 0), 0),
    readyForStageCount: summaries.reduce((sum, summary) => sum + Number(summary.readyForStageCount || 0), 0),
    blockedCount: summaries.reduce((sum, summary) => sum + Number(summary.blockedCount || 0), 0),
    warningCount: summaries.reduce((sum, summary) => sum + Number(summary.warningCount || 0), 0),
    targetSurfaceCount: summaries.reduce((sum, summary) => sum + Number(summary.targetSurfaceCount || 0), 0),
  });
}

export function normalizePreApplyContractReviewSummary(summary = {}) {
  return {
    rowCount: Number(summary.rowCount || 0),
    readyForStageCount: Number(summary.readyForStageCount || 0),
    blockedCount: Number(summary.blockedCount || 0),
    warningCount: Number(summary.warningCount || 0),
    targetSurfaceCount: Number(summary.targetSurfaceCount || 0),
  };
}

export function contentBulkPatchPreApplyReviewLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function rowContractReviewState(summary = {}) {
  if ((summary.blockedCount || 0) > 0) return "blocked";
  if ((summary.warningCount || 0) > 0) return "review";
  return "ready";
}
