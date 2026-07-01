export function createSaveSlotEditPayloadBridgeCompatibilitySummaryPreviewModel(options = {}) {
  const payload = options.payload || {
    version: "",
    applyRunner: "not-created",
    blockerCount: 0,
    blockers: [],
    payloadShape: {
      resultSource: "not-resolved",
      confirmationInput: "not-created",
      writer: "disabled",
      sideEffects: "disabled",
    },
  };
  const bridge = options.bridge || {
    bridgeVersion: "",
    apply: "disabled",
    payloadShape: {
      resultStatus: "",
      blockers: [],
    },
  };
  const text = options.text || {};
  const rows = [
    saveEditPayloadBridgeCompatibilityRow("payload-readable", text.rowLabels?.payloadReadable, "ready", payload.version, bridge.bridgeVersion, ""),
    saveEditPayloadBridgeCompatibilityRow("blockers-forwarded", text.rowLabels?.blockersForwarded, payload.blockerCount > 0 ? "ready" : "blocked", `${payload.blockerCount}`, `${bridge.payloadShape.blockers.length}`, payload.blockerCount > 0 ? "" : "blockers-missing"),
    saveEditPayloadBridgeCompatibilityRow("result-source-compatible", text.rowLabels?.resultSourceCompatible, "blocked", payload.payloadShape.resultSource, bridge.payloadShape.resultStatus, "result-source-not-selected"),
    saveEditPayloadBridgeCompatibilityRow("confirmation-compatible", text.rowLabels?.confirmationCompatible, "blocked", payload.payloadShape.confirmationInput, "confirmation-not-implemented", "confirmation-input-missing"),
    saveEditPayloadBridgeCompatibilityRow("runner-compatible", text.rowLabels?.runnerCompatible, "blocked", payload.applyRunner, bridge.apply, "apply-runner-not-created"),
    saveEditPayloadBridgeCompatibilityRow("writer-compatible", text.rowLabels?.writerCompatible, "ready", payload.payloadShape.writer, "writer-disabled", ""),
    saveEditPayloadBridgeCompatibilityRow("side-effects-compatible", text.rowLabels?.sideEffectsCompatible, "ready", payload.payloadShape.sideEffects, "read-only-preview", ""),
  ];
  const blockers = Array.from(new Set([
    ...payload.blockers,
    ...bridge.payloadShape.blockers,
    ...rows.map((row) => row.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-apply-runner-payload-bridge-compatibility-v1",
    mode: "read-only-preview",
    apply: "disabled",
    payloadVersion: payload.version,
    bridgeVersion: bridge.bridgeVersion,
    rowCount: rows.length,
    readyRowCount: rows.filter((row) => row.status === "ready").length,
    blockedRowCount: rows.filter((row) => row.status === "blocked").length,
    blockerCount: blockers.length,
    rows,
    blockers,
    payloadShape: {
      version: "save-edit-apply-runner-payload-bridge-compatibility-v1",
      mode: "read-only-preview",
      source: payload.version,
      bridge: bridge.bridgeVersion,
      compatibility: "blocked",
      apply: "disabled",
      writer: "disabled",
      sideEffects: "disabled",
      rows: rows.map((row) => ({
        id: row.id,
        status: row.status,
        blocker: row.blocker,
      })),
      blockers,
    },
  };
}

export function saveEditPayloadBridgeCompatibilityRow(id, label, status, payloadValue, bridgeValue, blocker) {
  return {
    id,
    label: label || id,
    status,
    payloadValue,
    bridgeValue,
    blocker,
  };
}
