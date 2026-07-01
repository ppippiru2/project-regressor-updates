import { renderContentBulkFilteredCandidatePreview } from "./contentBulkFilteredCandidatePreviewView.js?v=680";

export function createContentBulkFilteredCandidatePreviewRenderer() {
  return function renderContentBulkFilteredCandidatePreviewSection(preview = {}, detailText = {}) {
    return renderContentBulkFilteredCandidatePreview(preview, detailText);
  };
}
