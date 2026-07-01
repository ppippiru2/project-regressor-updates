export function createSaveSlotEditBridgeTransitionChecklistPreviewModel(options = {}) {
  const produced = options.produced || {
    routes: [],
    payloadShape: { legacyBridge: "unchanged", writer: "disabled" },
    adapter: { status: "not-connected" },
    apply: "disabled",
  };
  const legacy = options.legacy || {
    steps: [],
    payloadShape: { blockers: [] },
    apply: "disabled",
  };
  const text = options.text || {};
  const producedReadyRoutes = produced.routes.filter((route) => route.status === "ready").length;
  const legacyBlockedSteps = legacy.steps.filter((step) => step.status === "blocked").length;
  const checks = [
    saveEditProducedResultBridgeTransitionCheck(
      "produced-contract-readable",
      produced.version === "save-edit-produced-result-bridge-contract-v1",
      text.checkLabels?.producedContractReadable,
      "produced-contract-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "legacy-bridge-readable",
      legacy.bridgeVersion === "save-edit-validator-result-apply-gate-bridge-v1",
      text.checkLabels?.legacyBridgeReadable,
      "legacy-bridge-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "route-statuses-visible",
      produced.routeCount > 0 && producedReadyRoutes > 0,
      text.checkLabels?.routeStatusesVisible,
      "produced-routes-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "legacy-blockers-visible",
      legacy.blockedStepCount > 0 && legacyBlockedSteps > 0,
      text.checkLabels?.legacyBlockersVisible,
      "legacy-blockers-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "adapter-connected",
      false,
      text.checkLabels?.adapterConnected,
      "adapter-not-connected",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "legacy-schema-not-replaced",
      produced.payloadShape.legacyBridge === "unchanged",
      text.checkLabels?.legacySchemaNotReplaced,
      "legacy-bridge-replaced",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "legacy-schema-replacement-approved",
      false,
      text.checkLabels?.legacySchemaReplacementApproved,
      "legacy-bridge-still-active",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "apply-gate-held",
      produced.apply === "disabled" && legacy.apply === "disabled",
      text.checkLabels?.applyGateHeld,
      "apply-gate-open",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "apply-runner-bound",
      false,
      text.checkLabels?.applyRunnerBound,
      "apply-runner-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "writer-disabled",
      produced.payloadShape.writer === "disabled" && legacy.payloadShape.blockers.includes("writer-disabled"),
      text.checkLabels?.writerDisabled,
      "writer-enabled",
    ),
  ];
  const blockers = Array.from(new Set(checks.map((check) => check.blocker).filter(Boolean)));
  return {
    status: "blocked",
    version: "save-edit-produced-result-bridge-transition-checklist-v1",
    mode: "read-only-preview",
    apply: "disabled",
    producedVersion: produced.version,
    legacyBridgeVersion: legacy.bridgeVersion,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    payloadShape: {
      version: "save-edit-produced-result-bridge-transition-checklist-v1",
      mode: "read-only-preview",
      producedSource: produced.version,
      legacyTarget: legacy.bridgeVersion,
      producedReadyRoutes,
      legacyBlockedSteps,
      adapter: produced.adapter.status,
      legacyBridge: produced.payloadShape.legacyBridge,
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditProducedResultBridgeTransitionCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
