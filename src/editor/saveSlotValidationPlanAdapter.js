import { renderSaveSlotValidationPlanView } from "./saveSlotValidationPlanView.js?v=675";

export function createSaveSlotValidationPlanRenderer(options = {}) {
  return function renderSaveSlotValidationPlan(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPlan = typeof options.createPlan === "function" ? options.createPlan : () => ({});
    const plan = createPlan(diagnostics, text);
    return renderSaveSlotValidationPlanView({
      plan,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      readyCheckValue: translate(
        "editorPrep.saveValidation.readyCheckValue",
        {
          ready: plan.readyChecks,
          total: plan.totalChecks,
        },
        `${plan.readyChecks}/${plan.totalChecks}`,
      ),
    });
  };
}
