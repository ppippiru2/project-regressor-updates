export function createSaveSlotEditValidatorDryRunPlanModel(options = {}) {
  const sample = options.sample || { fieldCount: 0 };
  const drilldown = options.drilldown || { rules: [], ruleCount: 0 };
  const gate = options.gate || { applyStatus: "blocked" };
  const text = options.text || {};
  const stages = [
    saveEditDryRunStage("sample-payload-readable", sample.fieldCount > 0, text.stageLabels?.samplePayloadReadable, text.stageDetails?.samplePayloadReadable),
    saveEditDryRunStage("proposed-values-present", false, text.stageLabels?.proposedValuesPresent, text.stageDetails?.proposedValuesPresent),
    saveEditDryRunStage("validator-registry-ready", false, text.stageLabels?.validatorRegistryReady, text.stageDetails?.validatorRegistryReady),
    saveEditDryRunStage("current-path-coverage", true, text.stageLabels?.currentPathCoverage, text.stageDetails?.currentPathCoverage),
    saveEditDryRunStage("apply-gate-held", gate.applyStatus === "blocked", text.stageLabels?.applyGateHeld, text.stageDetails?.applyGateHeld),
    saveEditDryRunStage("writer-side-effects-disabled", true, text.stageLabels?.writerSideEffectsDisabled, text.stageDetails?.writerSideEffectsDisabled),
  ];
  const rules = drilldown.rules.map((rule) => ({
    id: rule.id,
    label: rule.label,
    status: "blocked",
    fieldCount: rule.fieldCount,
    mode: "dry-run-only",
    blocker: "proposed-values-missing",
  }));
  return {
    status: "blocked",
    stageCount: stages.length,
    ruleCount: rules.length,
    blockedStageCount: stages.filter((stage) => stage.status === "blocked").length,
    blockedRuleCount: rules.filter((rule) => rule.status === "blocked").length,
    stages,
    rules,
  };
}

export function saveEditDryRunStage(id, isReady, label, detail) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
  };
}
