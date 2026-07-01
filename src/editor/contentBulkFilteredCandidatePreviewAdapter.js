import { renderContentBulkFilteredCandidatePreview } from "./contentBulkFilteredCandidatePreviewView.js?v=677";

export function createContentBulkFilteredCandidatePreviewRenderer() {
  return function renderContentBulkFilteredCandidatePreviewSection(preview = {}, detailText = {}) {
    return renderContentBulkFilteredCandidatePreview(preview, detailText);
  };
}
