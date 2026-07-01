import { renderSaveSlotEditWriterEnablementRiskView } from "./saveSlotEditWriterEnablementRiskView.js?v=676";

export function createSaveSlotEditWriterEnablementRiskRenderer(options = {}) {
  return function renderSaveSlotEditWriterEnablementRiskSummary(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createSummary = typeof options.createSummary === "function" ? options.createSummary : () => ({});
    const summary = createSummary(diagnostics);
    return renderSaveSlotEditWriterEnablementRiskView({
      summary,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      checkValue: translate("editorPrep.saveEditWriterEnablementRisk.checkValue", { count: summary.checkCount }, `${summary.checkCount}`),
      blockerValue: translate("editorPrep.saveEditWriterEnablementRisk.blockerValue", { count: summary.blockerCount }, `${summary.blockerCount}`),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditWriterEnablementRisk.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
