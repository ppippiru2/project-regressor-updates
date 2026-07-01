import { saveEditValidatorDryRunResult } from "./saveSlotEditValidators.js?v=675";

export function createSaveSlotEditProposedValueInjectorPreviewModel(options = {}) {
  const sample = options.sample || { groups: [], payloadShape: { target: {} } };
  const registry = options.registry || { validators: [], version: "" };
  const validatorByRule = new Map(registry.validators.map((validator) => [validator.ruleId, validator]));
  const fields = sample.groups.flatMap((group) => group.fields.map((field) => {
    const validator = validatorByRule.get(field.validationRule);
    const sampleValues = saveEditProposedValueSamplesForField(field);
    const validResult = validator?.executor
      ? validator.executor({
          proposedValue: sampleValues.valid,
          currentValue: undefined,
          targetPath: field.path,
          saveTarget: sample.payloadShape.target,
        })
      : saveEditValidatorDryRunResult(field.validationRule, field.path, "not-produced", "not-produced", "validator-missing", []);
    const invalidResult = validator?.executor
      ? validator.executor({
          proposedValue: sampleValues.invalid,
          currentValue: undefined,
          targetPath: field.path,
          saveTarget: sample.payloadShape.target,
        })
      : saveEditValidatorDryRunResult(field.validationRule, field.path, "not-produced", "not-produced", "validator-missing", []);
    return {
      groupId: group.id,
      groupLabel: group.label,
      path: field.path,
      inputKind: field.inputKind,
      validationRule: field.validationRule,
      inputStatus: "not-created",
      injectorStatus: "disabled",
      validSample: saveEditSerializePreviewValue(sampleValues.valid),
      validResult: validResult.resultStatus,
      invalidSample: saveEditSerializePreviewValue(sampleValues.invalid),
      invalidResult: invalidResult.resultStatus,
      blocker: "input-shell-not-created",
    };
  }));
  return {
    status: "blocked",
    version: "save-edit-proposed-value-input-shell-sample-injector-v1",
    mode: "read-only-preview",
    injector: "disabled",
    apply: "disabled",
    fieldCount: fields.length,
    validSampleCount: fields.filter((field) => field.validResult === "valid").length,
    invalidSampleCount: fields.filter((field) => field.invalidResult === "invalid").length,
    fields,
    payloadShape: {
      version: "save-edit-proposed-value-input-shell-sample-injector-v1",
      mode: "read-only-preview",
      source: sample.payloadShape.version,
      validatorRegistry: registry.version,
      inputShell: "not-created",
      injector: "disabled",
      writer: "disabled",
      apply: "disabled",
      blockers: ["input-shell-not-created", "sample-injector-disabled", "writer-disabled"],
    },
  };
}

export function saveEditProposedValueSamplesForField(field = {}) {
  switch (field.validationRule) {
    case "min:1":
      return { valid: 2, invalid: 0 };
    case "min:0":
      return { valid: 10, invalid: -1 };
    case "known-region-id":
      return { valid: "tutorial_island", invalid: "" };
    case "known-region-id-list":
      return { valid: ["tutorial_island"], invalid: "not-array" };
    case "gate-map-shape":
      return { valid: { tutorial_island: { currentNodeId: "start" } }, invalid: [] };
    case "known-item-id-list":
      return { valid: [], invalid: "not-array" };
    case "known-equipment-slot-map":
      return { valid: { weapon: null, armor: null }, invalid: [] };
    case "profile-text-limit":
      return { valid: "Regressor", invalid: "" };
    case "portrait-frame-shape":
      return { valid: { frameId: "default" }, invalid: [] };
    default:
      return saveEditDefaultSamplesForValueType(field.valueType || "");
  }
}

export function saveEditDefaultSamplesForValueType(valueType) {
  if (valueType === "integer") return { valid: 1, invalid: "not-number" };
  if (valueType.endsWith("[]")) return { valid: [], invalid: "not-array" };
  if (valueType === "object" || valueType === "slot-map") return { valid: {}, invalid: [] };
  return { valid: "sample", invalid: "" };
}

export function saveEditSerializePreviewValue(value) {
  if (typeof value === "string") return value || "\"\"";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}
