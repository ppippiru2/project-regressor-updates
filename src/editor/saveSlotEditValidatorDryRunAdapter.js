import { renderSaveSlotEditValidatorDryRunView } from "./saveSlotEditValidatorDryRunView.js?v=680";

export function createSaveSlotEditValidatorDryRunRenderer(options = {}) {
  return function renderSaveSlotEditValidatorDryRunPlan(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPlan = typeof options.createPlan === "function" ? options.createPlan : () => ({});
    const plan = createPlan(diagnostics);
    return renderSaveSlotEditValidatorDryRunView({
      plan,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      stageValue: translate(
        "editorPrep.saveEditDryRun.stageValue",
        { count: plan.stageCount },
        `${plan.stageCount}`,
      ),
      ruleValue: translate(
        "editorPrep.saveEditDryRun.ruleValue",
        { count: plan.ruleCount },
        `${plan.ruleCount}`,
      ),
      blockedStageValue: translate(
        "editorPrep.saveEditDryRun.blockedStageValue",
        { count: plan.blockedStageCount },
        `${plan.blockedStageCount}`,
      ),
      blockedRuleValue: translate(
        "editorPrep.saveEditDryRun.blockedRuleValue",
        { count: plan.blockedRuleCount },
        `${plan.blockedRuleCount}`,
      ),
    });
  };
}
