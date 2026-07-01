import { renderContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlanView.js?v=680";

export function createContentBulkPatchBackupPlanRenderer(options = {}) {
  return function renderContentBulkPatchBackupPlanSection(detailText = {}) {
    const getPlan = typeof options.getPlan === "function" ? options.getPlan : () => ({});
    return renderContentBulkPatchBackupPlan(getPlan(), detailText);
  };
}
