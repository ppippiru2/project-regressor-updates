export function createSaveSlotEditConfirmationInputShellContractPreviewModel(options = {}) {
  const sourceContract = options.sourceContract || {
    requiredPhrase: "",
    version: "",
    apply: "disabled",
    payloadShape: { blockers: [], writer: "disabled" },
  };
  const text = options.text || {};
  const fields = [
    saveEditConfirmationInputShellField("phraseDisplay", text.fieldLabels?.phraseDisplay, "readonly-text", "ready", sourceContract.requiredPhrase, ""),
    saveEditConfirmationInputShellField("typedConfirmation", text.fieldLabels?.typedConfirmation, "text-input", "not-created", "not-created", "confirmation-input-missing"),
    saveEditConfirmationInputShellField("sourceSelection", text.fieldLabels?.sourceSelection, "source-selector", "not-created", "none", "source-selector-not-created"),
    saveEditConfirmationInputShellField("selectionMatch", text.fieldLabels?.selectionMatch, "boolean-match", "not-evaluated", "not-evaluated", "source-selection-not-confirmed"),
    saveEditConfirmationInputShellField("submitControl", text.fieldLabels?.submitControl, "button", "disabled", "disabled", "apply-runner-missing"),
  ];
  const checks = [
    saveEditConfirmationInputShellCheck("source-contract-readable", true, text.checkLabels?.sourceContractReadable, ""),
    saveEditConfirmationInputShellCheck("phrase-display-ready", Boolean(sourceContract.requiredPhrase), text.checkLabels?.phraseDisplayReady, "confirmation-phrase-missing"),
    saveEditConfirmationInputShellCheck("typed-confirmation-created", false, text.checkLabels?.typedConfirmationCreated, "confirmation-input-missing"),
    saveEditConfirmationInputShellCheck("source-selection-created", false, text.checkLabels?.sourceSelectionCreated, "source-selector-not-created"),
    saveEditConfirmationInputShellCheck("submit-control-disabled", true, text.checkLabels?.submitControlDisabled, ""),
    saveEditConfirmationInputShellCheck("apply-path-held", sourceContract.apply === "disabled", text.checkLabels?.applyPathHeld, "apply-gate-open"),
    saveEditConfirmationInputShellCheck("writer-disabled", sourceContract.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...sourceContract.payloadShape.blockers,
    ...fields.map((field) => field.blocker).filter(Boolean),
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-confirmation-input-shell-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    requiredPhrase: sourceContract.requiredPhrase,
    fieldCount: fields.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    fields,
    checks,
    payloadShape: {
      version: "save-edit-confirmation-input-shell-contract-v1",
      mode: "read-only-preview",
      source: sourceContract.version,
      requiredPhrase: sourceContract.requiredPhrase,
      fields: fields.map((field) => ({
        id: field.id,
        kind: field.kind,
        status: field.status,
      })),
      confirmationInput: "not-created",
      sourceSelection: "not-created",
      submitControl: "disabled",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditConfirmationInputShellField(id, label, kind, status, value, blocker) {
  return {
    id,
    label: label || id,
    kind,
    status,
    value,
    blocker,
  };
}

export function saveEditConfirmationInputShellCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
