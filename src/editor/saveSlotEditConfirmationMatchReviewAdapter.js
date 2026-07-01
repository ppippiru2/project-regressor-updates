import { renderSaveSlotEditConfirmationMatchReviewView } from "./saveSlotEditConfirmationMatchReviewView.js?v=677";

export function createSaveSlotEditConfirmationMatchReviewRenderer(options = {}) {
  return function renderSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createSummary = typeof options.createSummary === "function" ? options.createSummary : () => ({});
    const summary = createSummary(diagnostics);
    return renderSaveSlotEditConfirmationMatchReviewView({
      summary,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      reviewValue: translate(
        "editorPrep.saveEditConfirmationMatchReviewSummary.reviewValue",
        { count: summary.reviewCount },
        `${summary.reviewCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditConfirmationMatchReviewSummary.checkValue",
        { count: summary.checkCount },
        `${summary.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditConfirmationMatchReviewSummary.blockedValue",
        { count: summary.blockedCheckCount },
        `${summary.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditConfirmationMatchReviewSummary.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
