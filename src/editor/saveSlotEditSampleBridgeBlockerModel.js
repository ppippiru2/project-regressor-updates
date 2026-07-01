export function createSaveSlotEditSampleBridgeBlockerSummaryPreviewModel(options = {}) {
  const comparator = options.comparator || { readyComparisonCount: 0, version: "" };
  const gate = options.gate || { applyStatus: "blocked" };
  const readyComparisonCount = comparator.readyComparisonCount;
  const blockers = [
    saveEditSampleBridgeBlocker("sample-results-produced", readyComparisonCount > 0 ? "ready" : "blocked", readyComparisonCount > 0 ? "" : "sample-results-missing"),
    saveEditSampleBridgeBlocker("sample-results-not-bridged", "blocked", "bridge-not-connected"),
    saveEditSampleBridgeBlocker("apply-gate-held", gate.applyStatus === "blocked" ? "blocked" : "ready", gate.applyStatus === "blocked" ? "apply-gate-blocked" : ""),
    saveEditSampleBridgeBlocker("confirmation-input-missing", "blocked", "confirmation-input-missing"),
    saveEditSampleBridgeBlocker("writer-disabled", "blocked", "writer-disabled"),
  ];
  return {
    status: "blocked",
    version: "save-edit-sample-result-bridge-blocker-summary-v1",
    mode: "read-only-preview",
    apply: "disabled",
    readyComparisonCount,
    blockerCount: blockers.filter((blocker) => blocker.status === "blocked").length,
    bridge: {
      status: "not-connected",
      source: comparator.version,
      target: "save-edit-validator-result-apply-gate-bridge-v1",
    },
    blockers,
    payloadShape: {
      version: "save-edit-sample-result-bridge-blocker-summary-v1",
      mode: "read-only-preview",
      source: comparator.version,
      bridge: "not-connected",
      applyGate: gate.applyStatus,
      confirmation: "missing",
      writer: "disabled",
      apply: "disabled",
      blockers: blockers.filter((blocker) => blocker.status === "blocked").map((blocker) => blocker.blocker),
    },
  };
}

export function saveEditSampleBridgeBlocker(id, status, blocker) {
  return {
    id,
    status,
    blocker,
  };
}
