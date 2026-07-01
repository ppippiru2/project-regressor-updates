import { renderSaveSlotEditBridgeTransitionView } from "./saveSlotEditBridgeTransitionView.js?v=677";

export function createSaveSlotEditBridgeTransitionRenderer(options = {}) {
  return function renderSaveSlotEditBridgeTransitionChecklistPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createChecklist = typeof options.createChecklist === "function" ? options.createChecklist : () => ({});
    const checklist = createChecklist(diagnostics);
    return renderSaveSlotEditBridgeTransitionView({
      checklist,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      checkValue: translate(
        "editorPrep.saveEditProducedResultBridgeTransitionChecklist.checkValue",
        { count: checklist.checkCount },
        `${checklist.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditProducedResultBridgeTransitionChecklist.blockedValue",
        { count: checklist.blockedCheckCount },
        `${checklist.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditProducedResultBridgeTransitionChecklist.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
