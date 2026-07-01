import { renderSaveSlotEditAdapterRunnerPreflightView } from "./saveSlotEditAdapterRunnerPreflightView.js?v=677";

export function createSaveSlotEditAdapterRunnerPreflightRenderer(options = {}) {
  return function renderSaveSlotEditAdapterRunnerPreflightPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPreflight = typeof options.createPreflight === "function" ? options.createPreflight : () => ({});
    const preflight = createPreflight(diagnostics);
    return renderSaveSlotEditAdapterRunnerPreflightView({
      preflight,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      payloadValue: translate(
        "editorPrep.saveEditAdapterRunnerPreflight.payloadValue",
        { count: preflight.payloadFieldCount },
        `${preflight.payloadFieldCount}`,
      ),
      gateValue: translate(
        "editorPrep.saveEditAdapterRunnerPreflight.gateValue",
        { count: preflight.gateBlockerCount },
        `${preflight.gateBlockerCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditAdapterRunnerPreflight.checkValue",
        { count: preflight.checkCount },
        `${preflight.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditAdapterRunnerPreflight.blockedValue",
        { count: preflight.blockedCheckCount },
        `${preflight.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditAdapterRunnerPreflight.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
