import { createContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlan.js?v=468";

export const CONTENT_BULK_PATCH_RESTORE_REHEARSAL_VERSION = "content-bulk-patch-restore-rehearsal-v1";

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
    },
    blockedReasons,
    validationSteps,
    restoreActions,
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
  }));
}
