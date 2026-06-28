import { createContentBulkPatchApplyGatePlan } from "./contentBulkPatchApplyGatePlan.js?v=495";
import { createContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExport.js?v=495";

export const CONTENT_BULK_PATCH_BACKUP_PLAN_VERSION = "content-bulk-patch-backup-plan-v1";
const FILE_BACKUP_REVIEW_BLOCKERS = Object.freeze([
  "backup-writer-not-implemented",
  "snapshot-not-created",
  "restore-not-tested",
]);

export function createContentBulkPatchBackupPlan(
  exportPreview = createContentBulkPatchFilePatchDraftExport(),
  applyGatePlan = createContentBulkPatchApplyGatePlan(exportPreview),
  options = {},
) {
  const fileBackups = createFileBackups(exportPreview);
  const backupSteps = [
    "collect-target-file-list",
    "export-current-save-data",
    "copy-target-files-to-backup",
    "write-snapshot-manifest",
    "verify-backup-readable",
  ];
  const restoreSteps = [
    "select-snapshot-manifest",
    "restore-target-files",
    "restore-save-data",
    "run-post-restore-checks",
  ];
  const blockedReasons = [
    "backup-writer-not-implemented",
    "snapshot-not-created",
    "restore-not-tested",
  ];

  return {
    version: CONTENT_BULK_PATCH_BACKUP_PLAN_VERSION,
    sourceVersion: exportPreview.version,
    applyGateVersion: applyGatePlan.version,
    writesGameData: false,
    backupEnabled: false,
    restoreEnabled: false,
    requiresManualReview: true,
    requiresExplicitApply: true,
    requiresBackup: true,
    requiresRollbackPlan: true,
    applyMode: "backup-plan-only",
    status: "backup-not-created",
    artifactNames: {
      backupArchive: options.backupArchive || "project-regressor-content-bulk-backup-snapshot.zip",
      snapshotManifest: options.snapshotManifest || "project-regressor-content-bulk-backup-manifest.json",
      restoreReport: options.restoreReport || "project-regressor-content-bulk-restore-report.json",
    },
    summary: {
      targetFileCount: fileBackups.length,
      patchBlockCount: fileBackups.reduce((sum, file) => sum + file.patchBlockCount, 0),
      pendingBackupCount: fileBackups.filter((file) => file.backupState === "pending-snapshot").length,
      backupStepCount: backupSteps.length,
      restoreStepCount: restoreSteps.length,
      blockedReasonCount: blockedReasons.length,
      filesWithReviewBlockers: fileBackups.filter((file) => file.reviewBlockerCodes.length > 0).length,
      fileReviewBlockerCount: fileBackups.reduce((sum, file) => sum + file.reviewBlockerCodes.length, 0),
      applyGateCount: applyGatePlan.summary?.gateCount || 0,
      preApplyReviewItemCount: applyGatePlan.summary?.reviewItemCount || 0,
      preApplyBlockedReviewItemCount: applyGatePlan.summary?.blockedReviewItemCount || 0,
      preApplyWarningReviewItemCount: applyGatePlan.summary?.warningReviewItemCount || 0,
    },
    blockedReasons,
    preApplyReviewSummary: {
      reviewItemCount: applyGatePlan.summary?.reviewItemCount || 0,
      readyReviewItemCount: applyGatePlan.summary?.readyReviewItemCount || 0,
      blockedReviewItemCount: applyGatePlan.summary?.blockedReviewItemCount || 0,
      warningReviewItemCount: applyGatePlan.summary?.warningReviewItemCount || 0,
    },
    preApplyReviewItems: (applyGatePlan.reviewChecklist || []).map((item) => ({
      id: item.id,
      state: item.state,
      detail: item.detail,
      blocksApply: item.blocksApply === true,
    })),
    backupSteps,
    restoreSteps,
    fileBackups,
  };
}

function createFileBackups(exportPreview) {
  const files = Array.isArray(exportPreview.payload?.files) ? exportPreview.payload.files : [];
  return files.map((file, index) => ({
    order: file.order || index + 1,
    file: file.file,
    operation: file.operation || "review",
    domainIds: Array.isArray(file.domainIds) ? file.domainIds : [],
    patchBlockCount: Array.isArray(file.patchBlocks) ? file.patchBlocks.length : 0,
    backupState: "pending-snapshot",
    restoreState: "pending-restore-test",
    reviewBlockerCodes: [...FILE_BACKUP_REVIEW_BLOCKERS],
  }));
}


