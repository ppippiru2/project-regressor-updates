import { renderContentBulkFilteredCandidatePreview } from "./contentBulkFilteredCandidatePreviewView.js?v=675";

export function createContentBulkFilteredCandidatePreviewRenderer() {
  return function renderContentBulkFilteredCandidatePreviewSection(preview = {}, detailText = {}) {
    return renderContentBulkFilteredCandidatePreview(preview, detailText);
  };
}
