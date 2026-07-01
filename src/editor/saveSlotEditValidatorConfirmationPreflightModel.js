export function createSaveSlotEditValidatorConfirmationPreflightPreviewModel(options = {}) {
  const bridge = options.bridge || {
    bridgeVersion: "",
    steps: [],
    gateBlockers: [],
  };
  const gate = options.gate || { confirmationPhrase: "" };
  const text = options.text || {};
  const bridgeBlockers = bridge.steps
    .filter((step) => step.status === "blocked")
    .map((step) => step.blocker)
    .filter(Boolean);
  const gateBlockers = bridge.gateBlockers.map((item) => item.blocker).filter(Boolean);
  const blockers = Array.from(new Set([
    ...bridgeBlockers,
    ...gateBlockers,
    "confirmation-input-missing",
    "apply-runner-missing",
    "writer-disabled",
  ]));
  const groups = [
    saveEditValidatorConfirmationPreflightGroup("validator-results", text.groupLabels?.validatorResults, bridgeBlockers.filter((blocker) => ["result-not-produced", "validator-missing"].includes(blocker))),
    saveEditValidatorConfirmationPreflightGroup("apply-gate", text.groupLabels?.applyGate, gateBlockers),
    saveEditValidatorConfirmationPreflightGroup("confirmation", text.groupLabels?.confirmation, ["confirmation-input-missing", "confirmation-not-implemented"]),
    saveEditValidatorConfirmationPreflightGroup("writer", text.groupLabels?.writer, ["apply-runner-missing", "writer-disabled"]),
  ];
  const checks = [
    saveEditValidatorConfirmationPreflightCheck("bridge-readable", true, text.checkLabels?.bridgeReadable, text.checkDetails?.bridgeReadable, ""),
    saveEditValidatorConfirmationPreflightCheck("blocker-summary-readable", blockers.length > 0, text.checkLabels?.blockerSummaryReadable, text.checkDetails?.blockerSummaryReadable, blockers.length > 0 ? "" : "blocker-summary-empty"),
    saveEditValidatorConfirmationPreflightCheck("confirmation-phrase-visible", Boolean(gate.confirmationPhrase), text.checkLabels?.confirmationPhraseVisible, text.checkDetails?.confirmationPhraseVisible, Boolean(gate.confirmationPhrase) ? "" : "confirmation-phrase-missing"),
    saveEditValidatorConfirmationPreflightCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, text.checkDetails?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditValidatorConfirmationPreflightCheck("apply-runner-bound", false, text.checkLabels?.applyRunnerBound, text.checkDetails?.applyRunnerBound, "apply-runner-missing"),
    saveEditValidatorConfirmationPreflightCheck("writer-enabled", false, text.checkLabels?.writerEnabled, text.checkDetails?.writerEnabled, "writer-disabled"),
  ];
  return {
    status: "blocked",
    version: "save-edit-validator-confirmation-preflight-v1",
    mode: "read-only-preview",
    apply: "disabled",
    requiredPhrase: gate.confirmationPhrase,
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    groups,
    checks,
    payloadShape: {
      version: "save-edit-validator-confirmation-preflight-v1",
      mode: "read-only-preview",
      source: bridge.bridgeVersion,
      requiredPhrase: gate.confirmationPhrase,
      confirmationInput: "not-created",
      applyRunner: "not-bound",
      writer: "disabled",
      apply: "disabled",
      blockers,
    },
  };
}

export function saveEditValidatorConfirmationPreflightGroup(id, label, blockers) {
  const uniqueBlockers = Array.from(new Set(blockers.filter(Boolean)));
  return {
    id,
    label: label || id,
    blockerCount: uniqueBlockers.length,
    blockers: uniqueBlockers,
  };
}

export function saveEditValidatorConfirmationPreflightCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}
