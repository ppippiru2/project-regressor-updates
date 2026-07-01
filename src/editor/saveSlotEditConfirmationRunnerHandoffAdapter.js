import { renderSaveSlotEditConfirmationRunnerHandoffView } from "./saveSlotEditConfirmationRunnerHandoffView.js?v=681";

export function createSaveSlotEditConfirmationRunnerHandoffRenderer(options = {}) {
  return function renderSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createSummary = typeof options.createSummary === "function" ? options.createSummary : () => ({});
    const summary = createSummary(diagnostics);
    return renderSaveSlotEditConfirmationRunnerHandoffView({
      summary,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      rowValue: translate(
        "editorPrep.saveEditConfirmationRunnerHandoffSummary.rowValue",
        { count: summary.rowCount },
        `${summary.rowCount}`,
      ),
      blockerValue: translate(
        "editorPrep.saveEditConfirmationRunnerHandoffSummary.blockerValue",
        { count: summary.blockerCount },
        `${summary.blockerCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditConfirmationRunnerHandoffSummary.checkValue",
        { count: summary.checkCount },
        `${summary.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditConfirmationRunnerHandoffSummary.blockedValue",
        { count: summary.blockedCheckCount },
        `${summary.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditConfirmationRunnerHandoffSummary.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
