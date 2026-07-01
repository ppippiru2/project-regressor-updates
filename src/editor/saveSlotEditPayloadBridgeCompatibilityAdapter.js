import { renderSaveSlotEditPayloadBridgeCompatibilityView } from "./saveSlotEditPayloadBridgeCompatibilityView.js?v=676";

export function createSaveSlotEditPayloadBridgeCompatibilityRenderer(options = {}) {
  return function renderSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createSummary = typeof options.createSummary === "function" ? options.createSummary : () => ({});
    const summary = createSummary(diagnostics);
    return renderSaveSlotEditPayloadBridgeCompatibilityView({
      summary,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      rowValue: translate(
        "editorPrep.saveEditPayloadBridgeCompatibilitySummary.rowValue",
        { count: summary.rowCount },
        `${summary.rowCount}`,
      ),
      readyValue: translate(
        "editorPrep.saveEditPayloadBridgeCompatibilitySummary.readyValue",
        { count: summary.readyRowCount },
        `${summary.readyRowCount}`,
      ),
      blockerValue: translate(
        "editorPrep.saveEditPayloadBridgeCompatibilitySummary.blockerValue",
        { count: summary.blockerCount },
        `${summary.blockerCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditPayloadBridgeCompatibilitySummary.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
