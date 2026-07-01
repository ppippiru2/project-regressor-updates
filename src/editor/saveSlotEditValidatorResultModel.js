export function createSaveSlotEditValidatorResultSchemaPreviewModel(options = {}) {
  const contract = options.contract || { validators: [], validatorCount: 0 };
  const results = contract.validators.map((validator) => ({
    ruleId: validator.ruleId,
    functionName: validator.functionName,
    status: "blocked",
    resultStatus: "not-produced",
    fieldCount: validator.fieldCount,
    normalizedValue: "not-produced",
    blocker: "validator-missing",
    warnings: [],
  }));
  return {
    status: "blocked",
    validatorCount: contract.validatorCount,
    fieldCount: results.reduce((sum, result) => sum + result.fieldCount, 0),
    resultCount: results.length,
    blockedResultCount: results.filter((result) => result.status === "blocked").length,
    results,
    resultShape: {
      version: "save-edit-validator-result-schema-v1",
      mode: "read-only-preview",
      resultStatus: "not-produced",
      resultStatusEnum: ["valid", "invalid", "warning", "not-produced"],
      fields: ["ruleId", "functionName", "targetPath", "normalizedValue", "validationResult", "blocker", "warnings"],
      apply: "disabled",
    },
  };
}
