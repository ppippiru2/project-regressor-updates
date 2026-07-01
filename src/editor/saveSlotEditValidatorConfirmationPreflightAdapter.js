import { renderSaveSlotEditValidatorConfirmationPreflightView } from "./saveSlotEditValidatorConfirmationPreflightView.js?v=680";

export function createSaveSlotEditValidatorConfirmationPreflightRenderer(options = {}) {
  return function renderSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPreflight = typeof options.createPreflight === "function" ? options.createPreflight : () => ({});
    const preflight = createPreflight(diagnostics);
    return renderSaveSlotEditValidatorConfirmationPreflightView({
      preflight,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      blockerValue: translate(
        "editorPrep.saveEditValidatorConfirmationPreflight.blockerValue",
        { count: preflight.blockerCount },
        `${preflight.blockerCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditValidatorConfirmationPreflight.checkValue",
        { count: preflight.checkCount },
        `${preflight.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditValidatorConfirmationPreflight.blockedValue",
        { count: preflight.blockedCheckCount },
        `${preflight.blockedCheckCount}`,
      ),
      groupBlockerValueFormatter: (count) => translate(
        "editorPrep.saveEditValidatorConfirmationPreflight.groupBlockerValue",
        { count },
        `${count}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditValidatorConfirmationPreflight.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
