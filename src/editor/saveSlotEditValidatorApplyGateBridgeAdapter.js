import { renderSaveSlotEditValidatorApplyGateBridgeView } from "./saveSlotEditValidatorApplyGateBridgeView.js?v=681";

export function createSaveSlotEditValidatorApplyGateBridgeRenderer(options = {}) {
  return function renderSaveSlotEditValidatorApplyGateBridgePreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createBridge = typeof options.createBridge === "function" ? options.createBridge : () => ({});
    const bridge = createBridge(diagnostics);
    return renderSaveSlotEditValidatorApplyGateBridgeView({
      bridge,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      resultValue: translate(
        "editorPrep.saveEditValidatorApplyGateBridge.resultValue",
        { count: bridge.resultCount },
        `${bridge.resultCount}`,
      ),
      gateValue: translate(
        "editorPrep.saveEditValidatorApplyGateBridge.gateValue",
        { count: bridge.gateBlockedChecks },
        `${bridge.gateBlockedChecks}`,
      ),
      stepValue: translate(
        "editorPrep.saveEditValidatorApplyGateBridge.stepValue",
        { count: bridge.stepCount },
        `${bridge.stepCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditValidatorApplyGateBridge.blockedValue",
        { count: bridge.blockedStepCount },
        `${bridge.blockedStepCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditValidatorApplyGateBridge.blockerValue",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
