import {
  SAVE_EDIT_VALIDATOR_EXECUTORS,
  saveEditValidatorDryRunResult,
  saveEditValidatorFunctionName,
} from "./saveSlotEditValidators.js?v=681";

export function createSaveSlotEditValidatorExecutableRegistryModel(options = {}) {
  const drilldown = options.drilldown || { rules: [] };
  const validators = drilldown.rules.map((rule) => {
    const executor = SAVE_EDIT_VALIDATOR_EXECUTORS[rule.id];
    return {
      ruleId: rule.id,
      label: rule.label,
      functionName: saveEditValidatorFunctionName(rule.id),
      status: executor ? "implemented" : "missing",
      mode: "pure-function",
      sideEffects: "disabled",
      fieldCount: rule.fieldCount,
      executor,
    };
  });
  return {
    status: validators.every((validator) => validator.status === "implemented") ? "ready" : "blocked",
    version: "save-edit-validator-executable-registry-v1",
    validatorCount: validators.length,
    implementedValidatorCount: validators.filter((validator) => validator.status === "implemented").length,
    missingValidatorCount: validators.filter((validator) => validator.status === "missing").length,
    validators,
  };
}

export function createSaveSlotEditValidatorExecutableDryRunPreviewModel(options = {}) {
  const sample = options.sample || { groups: [], payloadShape: { target: {} } };
  const registry = options.registry || { validators: [], version: "" };
  const validatorByRule = new Map(registry.validators.map((validator) => [validator.ruleId, validator]));
  const fields = sample.groups.flatMap((group) => group.fields.map((field) => ({
    ...field,
    groupId: group.id,
    groupLabel: group.label,
  })));
  const results = fields.map((field) => {
    const validator = validatorByRule.get(field.validationRule);
    const output = validator?.executor
      ? validator.executor({
          proposedValue: field.proposedValue,
          currentValue: undefined,
          targetPath: field.path,
          saveTarget: sample.payloadShape.target,
        })
      : saveEditValidatorDryRunResult(field.validationRule, field.path, "not-produced", "not-produced", "validator-missing", []);
    return {
      ruleId: field.validationRule,
      path: field.path,
      functionName: validator?.functionName || saveEditValidatorFunctionName(field.validationRule),
      status: output.blocker ? "blocked" : "ready",
      resultStatus: output.resultStatus,
      normalizedValue: output.normalizedValue,
      blocker: output.blocker,
      warnings: output.warnings,
    };
  });
  const blockers = Array.from(new Set(results.map((result) => result.blocker).filter(Boolean)));
  return {
    status: "blocked",
    version: "save-edit-validator-executable-dry-run-results-v1",
    mode: "non-mutating-dry-run",
    apply: "disabled",
    validatorRegistryVersion: registry.version,
    validatorCount: registry.validatorCount,
    implementedValidatorCount: registry.implementedValidatorCount,
    resultCount: results.length,
    blockedResultCount: results.filter((result) => result.status === "blocked").length,
    blockers,
    results,
    payloadShape: {
      version: "save-edit-validator-executable-dry-run-results-v1",
      mode: "non-mutating-dry-run",
      source: sample.payloadShape.version,
      validatorRegistry: registry.version,
      validators: "implemented",
      resultStatus: "blocked",
      writer: "disabled",
      apply: "disabled",
      blockers,
    },
  };
}
