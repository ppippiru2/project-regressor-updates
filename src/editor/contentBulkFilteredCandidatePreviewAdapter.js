import { renderContentBulkFilteredCandidatePreview } from "./contentBulkFilteredCandidatePreviewView.js?v=678";

export function createContentBulkFilteredCandidatePreviewRenderer() {
  return function renderContentBulkFilteredCandidatePreviewSection(preview = {}, detailText = {}) {
    return renderContentBulkFilteredCandidatePreview(preview, detailText);
  };
}
