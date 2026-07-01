import { renderContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklistView.js?v=677";

export function createContentBulkPatchManualApplyChecklistRenderer(options = {}) {
  return function renderContentBulkPatchManualApplyChecklistSection(detailText = {}) {
    const getChecklist = typeof options.getChecklist === "function" ? options.getChecklist : () => ({});
    return renderContentBulkPatchManualApplyChecklist(getChecklist(), detailText);
  };
}
