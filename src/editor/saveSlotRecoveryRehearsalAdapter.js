import { renderSaveSlotRecoveryRehearsalView } from "./saveSlotRecoveryRehearsalView.js?v=676";

export function createSaveSlotRecoveryRehearsalRenderer(options = {}) {
  return function renderSaveSlotRecoveryRehearsalPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createRehearsal = typeof options.createRehearsal === "function" ? options.createRehearsal : () => ({});
    const rehearsal = createRehearsal(diagnostics);
    const snapshotKeys = Array.isArray(rehearsal.snapshotKeys) ? rehearsal.snapshotKeys : [];
    const steps = Array.isArray(rehearsal.steps) ? rehearsal.steps : [];
    const failureRoutes = Array.isArray(rehearsal.failureRoutes) ? rehearsal.failureRoutes : [];

    return renderSaveSlotRecoveryRehearsalView({
      rehearsal,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      keyValue: translate(
        "editorPrep.saveRecovery.keyValue",
        { readable: rehearsal.readableKeys, total: snapshotKeys.length },
        `${rehearsal.readableKeys}/${snapshotKeys.length}`,
      ),
      stepValue: translate("editorPrep.saveRecovery.stepValue", { count: steps.length }, `${steps.length}`),
      blockedValue: translate(
        "editorPrep.saveRecovery.blockedValue",
        { count: rehearsal.blockedSteps },
        `${rehearsal.blockedSteps}`,
      ),
      routeValue: translate(
        "editorPrep.saveRecovery.routeValue",
        { count: failureRoutes.length },
        `${failureRoutes.length}`,
      ),
      blockerFormatter: (blocker) =>
        translate(
          "editorPrep.saveRecovery.blockerValue",
          { blocker },
          `${text.blockerLabel || "Blocker"}: ${blocker}`,
        ),
      routeActionFormatter: (action) =>
        translate(
          "editorPrep.saveRecovery.routeActionValue",
          { action },
          `${text.routeActionLabel || "Action"}: ${action}`,
        ),
    });
  };
}
