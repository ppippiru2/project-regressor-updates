import { createContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlan.js?v=525";

export const CONTENT_BULK_PATCH_RESTORE_REHEARSAL_VERSION = "content-bulk-patch-restore-rehearsal-v1";
const RESTORE_FILE_REHEARSAL_BLOCKERS = Object.freeze([
  "restore-writer-not-implemented",
  "actual-snapshot-not-created",
  "pending-rehearsal",
]);

export function createContentBulkPatchRestoreRehearsal(backupPlan = createContentBulkPatchBackupPlan()) {
  const restoreActions = createRestoreActions(backupPlan);
  const validationSteps = [
    "verify-snapshot-manifest-name",
    "verify-all-target-files-mapped",
    "verify-restore-writer-disabled",
    "run-quick-check",
    "verify-local-http-after-rehearsal",
  ];
  const blockedReasons = [
    "restore-writer-not-implemented",
    "actual-snapshot-not-created",
  ];
  const issueSummary = createRestoreRehearsalIssueSummary({
    blockedReasons,
    restoreActions,
    preApplyReviewItems: backupPlan.preApplyReviewItems || [],
  });

  return {
    version: CONTENT_BULK_PATCH_RESTORE_REHEARSAL_VERSION,
    sourceVersion: backupPlan.version,
    writesGameData: false,
    restoreEnabled: false,
    rehearsalOnly: true,
    requiresManualReview: true,
    requiresExplicitApply: true,
    requiresBackup: true,
    requiresRollbackPlan: true,
    applyMode: "restore-rehearsal-only",
    status: "restore-disabled",
    artifactNames: backupPlan.artifactNames || {},
    summary: {
      targetFileCount: restoreActions.length,
      mappedRestoreCount: restoreActions.filter((action) => action.restoreState === "mapped-to-restore").length,
      missingRestoreCount: restoreActions.filter((action) => action.restoreState !== "mapped-to-restore").length,
      restoreStepCount: Array.isArray(backupPlan.restoreSteps) ? backupPlan.restoreSteps.length : 0,
      validationStepCount: validationSteps.length,
      blockedReasonCount: blockedReasons.length,
      filesWithRehearsalBlockers: restoreActions.filter((action) => action.rehearsalBlockerCodes.length > 0).length,
      fileRehearsalBlockerCount: restoreActions.reduce((sum, action) => sum + action.rehearsalBlockerCodes.length, 0),
      blockingIssueCount: issueSummary.blockingIssueCodes.length,
      warningIssueCount: issueSummary.warningIssueCodes.length,
    },
    blockedReasons,
    issueSummary,
    preApplyReviewSummary: {
      reviewItemCount: backupPlan.preApplyReviewSummary?.reviewItemCount || 0,
      readyReviewItemCount: backupPlan.preApplyReviewSummary?.readyReviewItemCount || 0,
      blockedReviewItemCount: backupPlan.preApplyReviewSummary?.blockedReviewItemCount || 0,
      warningReviewItemCount: backupPlan.preApplyReviewSummary?.warningReviewItemCount || 0,
    },
    preApplyReviewItems: (backupPlan.preApplyReviewItems || []).map((item) => ({
      id: item.id,
      state: item.state,
      detail: item.detail,
      blocksApply: item.blocksApply === true,
    })),
    validationSteps,
    restoreActions,
  };
}

function createRestoreRehearsalIssueSummary({ blockedReasons = [], restoreActions = [], preApplyReviewItems = [] } = {}) {
  const blockingIssueCodes = new Set(blockedReasons);
  const warningIssueCodes = new Set();
  const affectedDomainIds = new Set();
  let affectedFileCount = 0;

  for (const action of restoreActions) {
    const blockers = Array.isArray(action.rehearsalBlockerCodes) ? action.rehearsalBlockerCodes.filter(Boolean) : [];
    if (!blockers.length) continue;
    affectedFileCount += 1;
    for (const code of blockers) blockingIssueCodes.add(code);
    for (const domainId of action.domainIds || []) affectedDomainIds.add(domainId);
  }

  let affectedReviewItemCount = 0;
  for (const item of preApplyReviewItems) {
    if (item.state === "blocked") {
      blockingIssueCodes.add(item.id);
      affectedReviewItemCount += 1;
    }
    if (item.state === "review") {
      warningIssueCodes.add(item.id);
      affectedReviewItemCount += 1;
    }
  }

  return {
    blockingIssueCodes: [...blockingIssueCodes],
    warningIssueCodes: [...warningIssueCodes],
    affectedDomainCount: affectedDomainIds.size,
    affectedRowCount: affectedFileCount,
    affectedFileCount,
    affectedReviewItemCount,
  };
}

function createRestoreActions(backupPlan) {
  const files = Array.isArray(backupPlan.fileBackups) ? backupPlan.fileBackups : [];
  return files.map((file, index) => ({
    id: `restore-${index + 1}`,
    order: file.order || index + 1,
    file: file.file,
    operation: file.operation || "review",
    domainIds: Array.isArray(file.domainIds) ? file.domainIds : [],
    backupState: file.backupState || "pending-snapshot",
    restoreState: "mapped-to-restore",
    checkState: "pending-rehearsal",
    rehearsalBlockerCodes: [...RESTORE_FILE_REHEARSAL_BLOCKERS],
  }));
}


