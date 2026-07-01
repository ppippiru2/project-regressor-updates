import { createContentBulkPatchApplyGatePlan } from "./contentBulkPatchApplyGatePlan.js?v=677";
import { createContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlan.js?v=677";
import { createContentBulkPatchRestoreRehearsal } from "./contentBulkPatchRestoreRehearsal.js?v=677";

export const CONTENT_BULK_PATCH_READINESS_PLAN_BUNDLE_VERSION =
  "content-bulk-patch-readiness-plan-bundle-v1";

export function createContentBulkPatchReadinessPlanBundle({
  filePatchDraftExport = {},
  filteredCandidatePreview = {},
} = {}) {
  const applyGatePlan = createContentBulkPatchApplyGatePlan(filePatchDraftExport, {
    filteredCandidatePreview,
  });
  const backupPlan = createContentBulkPatchBackupPlan(filePatchDraftExport, applyGatePlan);
  const restoreRehearsal = createContentBulkPatchRestoreRehearsal(backupPlan);

  return {
    version: CONTENT_BULK_PATCH_READINESS_PLAN_BUNDLE_VERSION,
    writesGameData: false,
    requiresExplicitApply: true,
    applyGatePlan,
    backupPlan,
    restoreRehearsal,
  };
}
