export function createSaveSlotEditConfirmationSourceSelectionContractPreviewModel(options = {}) {
  const preflight = options.preflight || { apply: "disabled", version: "", payloadShape: { blockers: [], writer: "disabled" } };
  const gate = options.gate || { confirmationPhrase: "" };
  const text = options.text || {};
  const checks = [
    saveEditConfirmationSourceSelectionCheck("preflight-readable", true, text.checkLabels?.preflightReadable, ""),
    saveEditConfirmationSourceSelectionCheck("confirmation-phrase-visible", Boolean(gate.confirmationPhrase), text.checkLabels?.confirmationPhraseVisible, "confirmation-phrase-missing"),
    saveEditConfirmationSourceSelectionCheck("source-selection-contract-visible", true, text.checkLabels?.sourceSelectionContractVisible, ""),
    saveEditConfirmationSourceSelectionCheck("source-selection-created", false, text.checkLabels?.sourceSelectionCreated, "source-selector-not-created"),
    saveEditConfirmationSourceSelectionCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditConfirmationSourceSelectionCheck("selection-confirmed", false, text.checkLabels?.selectionConfirmed, "source-selection-not-confirmed"),
    saveEditConfirmationSourceSelectionCheck("apply-gate-held", preflight.apply === "disabled", text.checkLabels?.applyGateHeld, "apply-gate-open"),
    saveEditConfirmationSourceSelectionCheck("writer-disabled", preflight.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...preflight.payloadShape.blockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-confirmation-source-selection-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    requiredPhrase: gate.confirmationPhrase,
    adapterPreflightVersion: preflight.version,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    sourceSelection: {
      status: "not-created",
      selectedSource: "none",
      requiresPhrase: gate.confirmationPhrase,
    },
    checks,
    payloadShape: {
      version: "save-edit-confirmation-source-selection-contract-v1",
      mode: "read-only-preview",
      source: preflight.version,
      requiredPhrase: gate.confirmationPhrase,
      confirmationInput: "not-created",
      sourceSelection: "not-created",
      selectedSource: "none",
      adapterRunner: "not-bound",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditConfirmationSourceSelectionCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
