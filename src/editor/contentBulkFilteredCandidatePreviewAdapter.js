import { renderContentBulkFilteredCandidatePreview } from "./contentBulkFilteredCandidatePreviewView.js?v=679";

export function createContentBulkFilteredCandidatePreviewRenderer() {
  return function renderContentBulkFilteredCandidatePreviewSection(preview = {}, detailText = {}) {
    return renderContentBulkFilteredCandidatePreview(preview, detailText);
  };
}
