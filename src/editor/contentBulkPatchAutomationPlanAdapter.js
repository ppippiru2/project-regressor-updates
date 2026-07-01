import { renderContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlanView.js?v=678";

export function createContentBulkPatchAutomationPlanRenderer(options = {}) {
  return function renderContentBulkPatchAutomationPlanSection(detailText = {}) {
    const getPlan = typeof options.getPlan === "function" ? options.getPlan : () => ({});
    return renderContentBulkPatchAutomationPlan(getPlan(), detailText);
  };
}
