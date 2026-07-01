import { renderSaveSlotApplyGateChecklistView } from "./saveSlotApplyGateChecklistView.js?v=681";

export function createSaveSlotApplyGateChecklistRenderer(options = {}) {
  return function renderSaveSlotApplyGateChecklist(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createGate = typeof options.createGate === "function" ? options.createGate : () => ({});
    const gate = createGate(diagnostics);

    return renderSaveSlotApplyGateChecklistView({
      gate,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      readyValue: translate(
        "editorPrep.saveApplyGate.readyValue",
        { ready: gate.readyChecks, total: gate.totalChecks },
        `${gate.readyChecks}/${gate.totalChecks}`,
      ),
      blockedValue: translate(
        "editorPrep.saveApplyGate.blockedValue",
        { count: gate.blockedChecks },
        `${gate.blockedChecks}`,
      ),
      targetValue: translate(
        "editorPrep.saveApplyGate.targetValue",
        { count: gate.targetCount },
        `${gate.targetCount}`,
      ),
      diffRowValue: translate(
        "editorPrep.saveApplyGate.diffRowValue",
        { count: gate.diffRowCount },
        `${gate.diffRowCount}`,
      ),
      recoveryValue: translate(
        "editorPrep.saveApplyGate.recoveryValue",
        { count: gate.recoveryBlockedSteps },
        `${gate.recoveryBlockedSteps}`,
      ),
      blockerFormatter: (blocker) =>
        translate(
          "editorPrep.saveApplyGate.blockerValue",
          { blocker },
          `${text.blockerLabel || "Blocker"}: ${blocker}`,
        ),
    });
  };
}
