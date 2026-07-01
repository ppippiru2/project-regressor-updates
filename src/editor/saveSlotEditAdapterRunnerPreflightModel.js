export function createSaveSlotEditAdapterRunnerPreflightPreviewModel(options = {}) {
  const handoff = options.handoff || {
    version: "",
    fieldCount: 0,
    selectedSource: "none",
    payloadShape: { payloadFields: [], blockers: [], writer: "disabled" },
  };
  const gate = options.gate || { checks: [] };
  const text = options.text || {};
  const gateBlockers = gate.checks
    .filter((check) => check.status === "blocked")
    .map((check) => check.blocker || check.id)
    .filter(Boolean);
  const checks = [
    saveEditAdapterRunnerPreflightCheck("handoff-readable", true, text.checkLabels?.handoffReadable, ""),
    saveEditAdapterRunnerPreflightCheck("payload-fields-stable", handoff.fieldCount >= 8, text.checkLabels?.payloadFieldsStable, handoff.fieldCount >= 8 ? "" : "payload-fields-missing"),
    saveEditAdapterRunnerPreflightCheck("result-status-map-stable", Boolean(handoff.payloadShape.resultStatusMap?.valid), text.checkLabels?.resultStatusMapStable, "result-status-map-missing"),
    saveEditAdapterRunnerPreflightCheck("gate-blockers-visible", gateBlockers.length > 0, text.checkLabels?.gateBlockersVisible, gateBlockers.length > 0 ? "" : "gate-blockers-missing"),
    saveEditAdapterRunnerPreflightCheck("source-selected", false, text.checkLabels?.sourceSelected, "source-selector-not-created"),
    saveEditAdapterRunnerPreflightCheck("confirmation-input-ready", false, text.checkLabels?.confirmationInputReady, "confirmation-input-missing"),
    saveEditAdapterRunnerPreflightCheck("adapter-runner-bound", false, text.checkLabels?.adapterRunnerBound, "adapter-runner-missing"),
    saveEditAdapterRunnerPreflightCheck("writer-disabled", handoff.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...handoff.payloadShape.blockers,
    ...gateBlockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-adapter-runner-preflight-v1",
    mode: "read-only-preview",
    apply: "disabled",
    sourceHandoffVersion: handoff.version,
    payloadFieldCount: handoff.fieldCount,
    gateBlockerCount: gateBlockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    payloadShape: {
      version: "save-edit-adapter-runner-preflight-v1",
      mode: "read-only-preview",
      source: handoff.version,
      selectedSource: handoff.selectedSource,
      payloadFields: handoff.payloadShape.payloadFields,
      gateBlockers,
      confirmationInput: "not-created",
      adapterRunner: "not-bound",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditAdapterRunnerPreflightCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
