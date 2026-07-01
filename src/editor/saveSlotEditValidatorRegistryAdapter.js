import { renderSaveSlotEditValidatorRegistryView } from "./saveSlotEditValidatorRegistryView.js?v=677";

export function createSaveSlotEditValidatorRegistryRenderer(options = {}) {
  return function renderSaveSlotEditValidatorRegistryContract(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createContract = typeof options.createContract === "function" ? options.createContract : () => ({});
    const contract = createContract(diagnostics);
    return renderSaveSlotEditValidatorRegistryView({
      contract,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      ruleValue: translate(
        "editorPrep.saveEditValidatorRegistry.ruleValue",
        { count: contract.ruleCount },
        `${contract.ruleCount}`,
      ),
      validatorValue: translate(
        "editorPrep.saveEditValidatorRegistry.validatorValue",
        { count: contract.validatorCount },
        `${contract.validatorCount}`,
      ),
      missingValue: translate(
        "editorPrep.saveEditValidatorRegistry.missingValue",
        { count: contract.missingValidatorCount },
        `${contract.missingValidatorCount}`,
      ),
    });
  };
}
