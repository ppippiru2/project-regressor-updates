import { renderContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlanView.js?v=681";

export function createContentBulkPatchBackupPlanRenderer(options = {}) {
  return function renderContentBulkPatchBackupPlanSection(detailText = {}) {
    const getPlan = typeof options.getPlan === "function" ? options.getPlan : () => ({});
    return renderContentBulkPatchBackupPlan(getPlan(), detailText);
  };
}
