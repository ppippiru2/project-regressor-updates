import { renderSaveSlotEditCompatibilityConfirmationRollupView } from "./saveSlotEditCompatibilityConfirmationRollupView.js?v=676";

export function createSaveSlotEditCompatibilityConfirmationRollupRenderer(options = {}) {
  return function renderSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createRollup = typeof options.createRollup === "function" ? options.createRollup : () => ({});
    const rollup = createRollup(diagnostics);
    return renderSaveSlotEditCompatibilityConfirmationRollupView({
      rollup,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      laneValue: translate(
        "editorPrep.saveEditCompatibilityConfirmationRollup.laneValue",
        { count: rollup.laneCount },
        `${rollup.laneCount}`,
      ),
      blockerValue: translate(
        "editorPrep.saveEditCompatibilityConfirmationRollup.blockerValue",
        { count: rollup.blockerCount },
        `${rollup.blockerCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditCompatibilityConfirmationRollup.checkValue",
        { count: rollup.checkCount },
        `${rollup.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditCompatibilityConfirmationRollup.blockedValue",
        { count: rollup.blockedCheckCount },
        `${rollup.blockedCheckCount}`,
      ),
      laneBlockerValueFormatter: (count) => translate(
        "editorPrep.saveEditCompatibilityConfirmationRollup.blockerValue",
        { count },
        `${count}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditCompatibilityConfirmationRollup.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
