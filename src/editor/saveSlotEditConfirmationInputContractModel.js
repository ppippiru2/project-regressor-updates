export function createSaveSlotEditConfirmationInputContractPreviewModel(options = {}) {
  const preflight = options.preflight || {
    version: "",
    requiredPhrase: "",
  };
  const text = options.text || {};
  const fields = [
    saveEditConfirmationInputContractField(
      "confirmationPhrase",
      text.fieldLabels?.confirmationPhrase,
      "text-confirmation",
      "not-created",
      preflight.requiredPhrase,
      "confirmation-input-missing",
    ),
    saveEditConfirmationInputContractField(
      "confirmationMatch",
      text.fieldLabels?.confirmationMatch,
      "boolean-match-preview",
      "not-evaluated",
      "not-evaluated",
      "confirmation-input-missing",
    ),
    saveEditConfirmationInputContractField(
      "validatorResultState",
      text.fieldLabels?.validatorResultState,
      "readonly-result-state",
      "blocked",
      "not-produced",
      "result-not-produced",
    ),
    saveEditConfirmationInputContractField(
      "applyRunnerState",
      text.fieldLabels?.applyRunnerState,
      "readonly-runner-state",
      "not-bound",
      "not-bound",
      "apply-runner-missing",
    ),
  ];
  const guards = [
    "confirmation-phrase-visible",
    "confirmation-input-created",
    "confirmation-match-verified",
    "validator-results-valid",
    "apply-runner-bound",
    "writer-enabled",
  ];
  const blockers = Array.from(new Set([
    ...fields.map((field) => field.blocker),
    "confirmation-input-missing",
    "apply-runner-missing",
    "writer-disabled",
  ]));
  const applyRunner = {
    status: "not-bound",
    mode: "contract-only",
    requires: guards,
    blockers: ["apply-runner-missing", "writer-disabled"],
    sideEffects: "disabled",
  };
  return {
    status: "blocked",
    version: "save-edit-confirmation-input-apply-runner-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    requiredPhrase: preflight.requiredPhrase,
    fieldCount: fields.length,
    guardCount: guards.length,
    blockerCount: blockers.length,
    fields,
    guards,
    blockers,
    applyRunner,
    payloadShape: {
      version: "save-edit-confirmation-input-apply-runner-contract-v1",
      mode: "read-only-preview",
      source: preflight.version,
      confirmationInput: {
        status: "not-created",
        inputKind: "text-confirmation",
        requiredPhrase: preflight.requiredPhrase,
        match: "not-evaluated",
      },
      applyRunner: {
        status: "not-bound",
        mode: "contract-only",
        requires: guards,
        sideEffects: "disabled",
      },
      writer: "disabled",
      apply: "disabled",
      blockers,
    },
  };
}

export function saveEditConfirmationInputContractField(id, label, inputKind, status, previewValue, blocker) {
  return {
    id,
    label: label || id,
    inputKind,
    status,
    previewValue,
    blocker,
  };
}
