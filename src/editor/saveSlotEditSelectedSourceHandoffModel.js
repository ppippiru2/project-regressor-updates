export function createSaveSlotEditSelectedSourceHandoffContractPreviewModel(options = {}) {
  const plan = options.plan || {
    selectedSource: "none",
    version: "",
    adapter: { target: "" },
    payloadShape: { legacyBridge: "unchanged", writer: "disabled", blockers: [] },
  };
  const text = options.text || {};
  const payloadFields = [
    "sourceId",
    "sourceVersion",
    "resultStatus",
    "resultCount",
    "blockers",
    "adapterTarget",
    "confirmationRequired",
    "writer",
  ];
  const checks = [
    saveEditSelectedSourceHandoffCheck("adapter-plan-readable", true, text.checkLabels?.adapterPlanReadable, ""),
    saveEditSelectedSourceHandoffCheck("payload-shape-declared", true, text.checkLabels?.payloadShapeDeclared, ""),
    saveEditSelectedSourceHandoffCheck("result-status-map-declared", true, text.checkLabels?.resultStatusMapDeclared, ""),
    saveEditSelectedSourceHandoffCheck("legacy-bridge-unchanged", plan.payloadShape.legacyBridge === "unchanged", text.checkLabels?.legacyBridgeUnchanged, "legacy-bridge-replaced"),
    saveEditSelectedSourceHandoffCheck("source-selected", false, text.checkLabels?.sourceSelected, "source-selector-not-created"),
    saveEditSelectedSourceHandoffCheck("adapter-runner-bound", false, text.checkLabels?.adapterRunnerBound, "adapter-runner-missing"),
    saveEditSelectedSourceHandoffCheck("writer-disabled", plan.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...plan.payloadShape.blockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-selected-source-handoff-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    selectedSource: plan.selectedSource,
    sourceAdapterPlanVersion: plan.version,
    fieldCount: payloadFields.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    payloadShape: {
      version: "save-edit-selected-source-handoff-contract-v1",
      mode: "read-only-preview",
      sourceAdapterPlan: plan.version,
      selectedSource: plan.selectedSource,
      sourceVersion: "not-selected",
      resultStatusMap: {
        valid: "ready",
        invalid: "blocked",
        warning: "blocked",
        "not-produced": "blocked",
      },
      payloadFields,
      adapterTarget: plan.adapter.target,
      adapterRunner: "not-bound",
      legacyBridge: "unchanged",
      confirmationRequired: true,
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditSelectedSourceHandoffCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
