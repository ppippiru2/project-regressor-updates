import { renderSaveSlotEditRuleDrilldownView } from "./saveSlotEditRuleDrilldownView.js?v=679";

export function createSaveSlotEditRuleDrilldownRenderer(options = {}) {
  return function renderSaveSlotEditValidationRuleDrilldown(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createDrilldown = typeof options.createDrilldown === "function" ? options.createDrilldown : () => ({});
    const drilldown = createDrilldown(diagnostics);
    return renderSaveSlotEditRuleDrilldownView({
      drilldown,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      ruleValue: translate(
        "editorPrep.saveEditRuleDrilldown.ruleValue",
        { count: drilldown.ruleCount },
        `${drilldown.ruleCount}`,
      ),
      fieldValue: translate(
        "editorPrep.saveEditRuleDrilldown.fieldValue",
        { count: drilldown.fieldCount },
        `${drilldown.fieldCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditRuleDrilldown.checkValue",
        { count: drilldown.checkCount },
        `${drilldown.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditRuleDrilldown.blockedValue",
        { count: drilldown.blockedCheckCount },
        `${drilldown.blockedCheckCount}`,
      ),
    });
  };
}
