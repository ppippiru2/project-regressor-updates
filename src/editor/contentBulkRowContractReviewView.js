import { tf } from "../localization/index.js?v=675";

export const CONTENT_BULK_ROW_CONTRACT_REVIEW_VIEW_VERSION = "content-bulk-row-contract-review-view-v1";

export function renderContentBulkRowContractReviewChip(review = {}, text = {}) {
  return contentBulkRowContractReviewChipBlock(
    text.contractReview || "Contract review",
    contentBulkRowContractReviewLabels(review, text),
  );
}

export function contentBulkRowContractReviewLabels(review = {}, text = {}) {
  if (!review?.version) return [text.noIssues || "None"];
  const stateLabels = text.bulkStateLabels || text.stateLabels || {};
  const state = stateLabels[review.state] || review.state || "unknown";
  const status = review.blocked
    ? (text.contractBlocked || "Blocked")
    : review.warning
        ? (text.contractReviewing || "Review")
      : review.readyForStage
        ? (text.contractReady || "Ready")
        : (text.contractNotStaged || "Not staged");
  return [
    tf("editorPrep.balanceTuningDetail.contractReviewSummary", {
      status,
      state,
      surfaces: review.targetSurfaceCount || 0,
    }, `${status} - ${state} - ${review.targetSurfaceCount || 0}`),
  ];
}

function contentBulkRowContractReviewChipBlock(title, values = []) {
  return `
    <div class="editor-balance-chip-block editor-content-bulk-row-contract-review">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.map((value) => `<span>${escapeHtml(value)}</span>`).join("")}</div>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
