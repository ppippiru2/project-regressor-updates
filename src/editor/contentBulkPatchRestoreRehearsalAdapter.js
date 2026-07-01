import { renderContentBulkPatchRestoreRehearsal } from "./contentBulkPatchRestoreRehearsalView.js?v=676";

export function createContentBulkPatchRestoreRehearsalRenderer(options = {}) {
  return function renderContentBulkPatchRestoreRehearsalSection(detailText = {}) {
    const getRehearsal = typeof options.getRehearsal === "function" ? options.getRehearsal : () => ({});
    return renderContentBulkPatchRestoreRehearsal(getRehearsal(), detailText);
  };
}
