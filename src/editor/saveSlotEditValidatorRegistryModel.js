import { saveEditValidatorFunctionName } from "./saveSlotEditValidators.js?v=677";

export function createSaveSlotEditValidatorRegistryContractModel(options = {}) {
  const drilldown = options.drilldown || { rules: [], ruleCount: 0 };
  const validators = drilldown.rules.map((rule) => ({
    ruleId: rule.id,
    label: rule.label,
    functionName: saveEditValidatorFunctionName(rule.id),
    status: "missing",
    mode: "contract-only",
    inputs: ["proposedValue", "currentValue", "saveTarget"],
    outputs: ["validationResult", "blocker"],
    fieldCount: rule.fieldCount,
  }));
  return {
    status: "blocked",
    contractVersion: "save-edit-validator-registry-contract-v1",
    ruleCount: drilldown.ruleCount,
    validatorCount: validators.length,
    missingValidatorCount: validators.filter((validator) => validator.status === "missing").length,
    validators,
  };
}
