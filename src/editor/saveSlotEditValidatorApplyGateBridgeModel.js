export function createSaveSlotEditValidatorApplyGateBridgePreviewModel(options = {}) {
  const schema = options.schema || {
    resultCount: 0,
    blockedResultCount: 0,
    results: [],
    resultShape: { version: "", apply: "disabled", resultStatus: "" },
  };
  const gate = options.gate || { applyStatus: "blocked", blockedChecks: 0, checks: [] };
  const text = options.text || {};
  const checks = Array.isArray(gate.checks) ? gate.checks : [];
  const results = Array.isArray(schema.results) ? schema.results : [];
  const gateBlockers = checks
    .filter((check) => check.status === "blocked")
    .map((check) => ({
      id: check.id,
      blocker: check.blocker || "blocked",
    }));
  const resultSchemaReadable = schema.resultCount > 0 && schema.resultShape?.apply === "disabled";
  const validatorResultsProduced = schema.resultCount > 0
    && results.every((result) => result.resultStatus !== "not-produced");
  const validatorBlockersCleared = validatorResultsProduced
    && results.every((result) => !result.blocker);
  const applyGateOpen = gate.applyStatus !== "blocked";
  const confirmationReady = checks.find((check) => check.id === "explicit-confirmation-required")?.status === "ready";
  const writerReady = checks.find((check) => check.id === "writer-disabled")?.status === "ready";
  const steps = [
    saveEditValidatorApplyBridgeStep("result-schema-readable", resultSchemaReadable, text.stepLabels?.resultSchemaReadable, text.stepDetails?.resultSchemaReadable, resultSchemaReadable ? "" : "result-schema-missing"),
    saveEditValidatorApplyBridgeStep("validator-results-produced", validatorResultsProduced, text.stepLabels?.validatorResultsProduced, text.stepDetails?.validatorResultsProduced, validatorResultsProduced ? "" : "result-not-produced"),
    saveEditValidatorApplyBridgeStep("validator-blockers-cleared", validatorBlockersCleared, text.stepLabels?.validatorBlockersCleared, text.stepDetails?.validatorBlockersCleared, validatorBlockersCleared ? "" : "validator-missing"),
    saveEditValidatorApplyBridgeStep("apply-gate-open", applyGateOpen, text.stepLabels?.applyGateOpen, text.stepDetails?.applyGateOpen, applyGateOpen ? "" : "apply-gate-blocked"),
    saveEditValidatorApplyBridgeStep("confirmation-ready", confirmationReady, text.stepLabels?.confirmationReady, text.stepDetails?.confirmationReady, confirmationReady ? "" : "confirmation-not-implemented"),
    saveEditValidatorApplyBridgeStep("writer-ready", writerReady, text.stepLabels?.writerReady, text.stepDetails?.writerReady, writerReady ? "" : "writer-disabled"),
  ];
  return {
    status: "blocked",
    bridgeVersion: "save-edit-validator-result-apply-gate-bridge-v1",
    mode: "read-only-preview",
    apply: "disabled",
    resultSchemaVersion: schema.resultShape?.version || "",
    resultCount: schema.resultCount || 0,
    blockedResultCount: schema.blockedResultCount || 0,
    gateBlockedChecks: gate.blockedChecks || 0,
    stepCount: steps.length,
    blockedStepCount: steps.filter((step) => step.status === "blocked").length,
    gateBlockers,
    steps,
    payloadShape: {
      version: "save-edit-validator-result-apply-gate-bridge-v1",
      mode: "read-only-preview",
      source: schema.resultShape?.version || "",
      target: "save-slot-apply-gate-checklist",
      resultStatus: schema.resultShape?.resultStatus || "",
      apply: "disabled",
      blockers: ["result-not-produced", "validator-missing", "apply-gate-blocked", "confirmation-not-implemented", "writer-disabled"],
    },
  };
}

export function saveEditValidatorApplyBridgeStep(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}
