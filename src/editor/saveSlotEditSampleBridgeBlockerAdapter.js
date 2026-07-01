import { renderSaveSlotEditSampleBridgeBlockerView } from "./saveSlotEditSampleBridgeBlockerView.js?v=679";

export function createSaveSlotEditSampleBridgeBlockerRenderer(options = {}) {
  return function renderSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createSummary = typeof options.createSummary === "function" ? options.createSummary : () => ({});
    const summary = createSummary(diagnostics);
    return renderSaveSlotEditSampleBridgeBlockerView({
      summary,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      readyValue: translate(
        "editorPrep.saveEditSampleBridgeBlockerSummary.readyValue",
        { count: summary.readyComparisonCount },
        `${summary.readyComparisonCount}`,
      ),
      blockerValue: translate(
        "editorPrep.saveEditSampleBridgeBlockerSummary.blockerValue",
        { count: summary.blockerCount },
        `${summary.blockerCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditSampleBridgeBlockerSummary.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
