export function createSaveSlotEditCompatibilityConfirmationRollupPreviewModel(options = {}) {
  const compatibility = options.compatibility || {
    status: "blocked",
    version: "",
    blockers: [],
  };
  const bridge = options.bridge || {
    status: "blocked",
    bridgeVersion: "",
    steps: [],
    gateBlockers: [],
  };
  const preflight = options.preflight || {
    status: "blocked",
    version: "",
    groups: [],
    payloadShape: { blockers: [] },
  };
  const text = options.text || {};
  const bridgeBlockers = Array.from(new Set([
    ...bridge.steps.map((step) => step.blocker).filter(Boolean),
    ...bridge.gateBlockers.map((item) => item.blocker).filter(Boolean),
  ]));
  const confirmationBlockers = preflight.groups.find((group) => group.id === "confirmation")?.blockers || [];
  const writerBlockers = preflight.groups.find((group) => group.id === "writer")?.blockers || [];
  const lanes = [
    saveEditCompatibilityConfirmationRollupLane("payload-compatibility", text.laneLabels?.payloadCompatibility, compatibility.status, compatibility.version, compatibility.blockers),
    saveEditCompatibilityConfirmationRollupLane("apply-bridge", text.laneLabels?.applyBridge, bridge.status, bridge.bridgeVersion, bridgeBlockers),
    saveEditCompatibilityConfirmationRollupLane("confirmation-preflight", text.laneLabels?.confirmationPreflight, preflight.status, preflight.version, confirmationBlockers),
    saveEditCompatibilityConfirmationRollupLane("writer-runner", text.laneLabels?.writerRunner, "blocked", preflight.version, writerBlockers),
  ];
  const checks = [
    saveEditCompatibilityConfirmationRollupCheck("payload-compatibility-readable", true, text.checkLabels?.payloadCompatibilityReadable, text.checkDetails?.payloadCompatibilityReadable, ""),
    saveEditCompatibilityConfirmationRollupCheck("apply-bridge-readable", true, text.checkLabels?.applyBridgeReadable, text.checkDetails?.applyBridgeReadable, ""),
    saveEditCompatibilityConfirmationRollupCheck("confirmation-preflight-readable", true, text.checkLabels?.confirmationPreflightReadable, text.checkDetails?.confirmationPreflightReadable, ""),
    saveEditCompatibilityConfirmationRollupCheck("result-source-resolved", !compatibility.blockers.includes("result-source-not-selected"), text.checkLabels?.resultSourceResolved, text.checkDetails?.resultSourceResolved, "result-source-not-selected"),
    saveEditCompatibilityConfirmationRollupCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, text.checkDetails?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditCompatibilityConfirmationRollupCheck("apply-runner-bound", false, text.checkLabels?.applyRunnerBound, text.checkDetails?.applyRunnerBound, "apply-runner-missing"),
    saveEditCompatibilityConfirmationRollupCheck("writer-enabled", false, text.checkLabels?.writerEnabled, text.checkDetails?.writerEnabled, "writer-disabled"),
  ];
  const blockers = Array.from(new Set([
    ...lanes.flatMap((lane) => lane.blockers),
    ...preflight.payloadShape.blockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-compatibility-confirmation-rollup-v1",
    mode: "read-only-preview",
    apply: "disabled",
    writer: "disabled",
    sideEffects: "disabled",
    laneCount: lanes.length,
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    lanes,
    checks,
    blockers,
    payloadShape: {
      version: "save-edit-compatibility-confirmation-rollup-v1",
      mode: "read-only-preview",
      sources: {
        compatibility: compatibility.version,
        bridge: bridge.bridgeVersion,
        preflight: preflight.version,
      },
      compatibility: "blocked",
      confirmationPreflight: "blocked",
      apply: "disabled",
      writer: "disabled",
      sideEffects: "disabled",
      lanes: lanes.map((lane) => ({
        id: lane.id,
        status: lane.status,
        blockerCount: lane.blockerCount,
      })),
      checks: checks.map((check) => ({
        id: check.id,
        status: check.status,
        blocker: check.blocker,
      })),
      blockers,
    },
  };
}

export function saveEditCompatibilityConfirmationRollupLane(id, label, status, source, blockers) {
  const uniqueBlockers = Array.from(new Set((blockers || []).filter(Boolean)));
  return {
    id,
    label: label || id,
    status,
    source,
    blockerCount: uniqueBlockers.length,
    blockers: uniqueBlockers,
  };
}

export function saveEditCompatibilityConfirmationRollupCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: isReady ? "" : blocker,
  };
}
