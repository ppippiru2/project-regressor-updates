import { renderSaveSlotEditValidatorResultSourceAdapterView } from "./saveSlotEditValidatorResultSourceAdapterView.js?v=677";

export function createSaveSlotEditValidatorResultSourceAdapterPlanRenderer(options = {}) {
  return function renderSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPlan = typeof options.createPlan === "function" ? options.createPlan : () => ({});
    const plan = createPlan(diagnostics);
    return renderSaveSlotEditValidatorResultSourceAdapterView({
      plan,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      candidateValue: translate(
        "editorPrep.saveEditValidatorResultSourceAdapterPlan.candidateValue",
        { count: plan.candidateCount },
        `${plan.candidateCount}`,
      ),
      readyValue: translate(
        "editorPrep.saveEditValidatorResultSourceAdapterPlan.readyValue",
        { count: plan.readyCandidateCount },
        `${plan.readyCandidateCount}`,
      ),
    });
  };
}
