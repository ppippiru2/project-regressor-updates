import { renderContentBulkPatchApplyGatePlan } from "./contentBulkPatchApplyGatePlanView.js?v=675";

export function createContentBulkPatchApplyGatePlanRenderer(options = {}) {
  return function renderContentBulkPatchApplyGatePlanSection(filteredCandidatePreview = {}, detailText = {}) {
    const getPlan = typeof options.getPlan === "function" ? options.getPlan : () => ({});

    return renderContentBulkPatchApplyGatePlan(getPlan(), detailText, {
      filteredCandidatePreview,
    });
  };
}
