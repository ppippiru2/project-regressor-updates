import { createContentBulkPatchApplyGatePlan } from "./contentBulkPatchApplyGatePlan.js?v=481";
import { createContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExport.js?v=481";

export const CONTENT_BULK_PATCH_BACKUP_PLAN_VERSION = "content-bulk-patch-backup-plan-v1";

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
      applyGateCount: applyGatePlan.summary?.gateCount || 0,
    },
    blockedReasons,
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
  }));
}


