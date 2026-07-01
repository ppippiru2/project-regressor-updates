export function createSaveSlotEditProducedResultBridgeContractPreviewModel(options = {}) {
  const summary = options.summary || { readyComparisonCount: 0, version: "" };
  const routes = [
    saveEditProducedResultBridgeRoute("read-produced-results", "ready", ""),
    saveEditProducedResultBridgeRoute("map-result-status", "ready", ""),
    saveEditProducedResultBridgeRoute("replace-legacy-result-schema", "blocked", "legacy-bridge-still-active"),
    saveEditProducedResultBridgeRoute("open-apply-gate", "blocked", "apply-gate-blocked"),
    saveEditProducedResultBridgeRoute("keep-writer-disabled", "blocked", "writer-disabled"),
  ];
  const blockers = Array.from(new Set(routes.map((route) => route.blocker).filter(Boolean)));
  return {
    status: "blocked",
    version: "save-edit-produced-result-bridge-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    resultCount: summary.readyComparisonCount,
    routeCount: routes.length,
    blockerCount: blockers.length,
    adapter: {
      status: "not-connected",
      source: summary.version,
      target: "save-edit-validator-result-apply-gate-bridge-v1",
    },
    routes,
    payloadShape: {
      version: "save-edit-produced-result-bridge-contract-v1",
      mode: "read-only-preview",
      source: summary.version,
      adapter: "not-connected",
      maps: {
        missing: "blocked",
        valid: "ready",
        invalid: "blocked",
      },
      legacyBridge: "unchanged",
      writer: "disabled",
      apply: "disabled",
      blockers,
    },
  };
}

export function saveEditProducedResultBridgeRoute(id, status, blocker) {
  return {
    id,
    status,
    blocker,
  };
}
