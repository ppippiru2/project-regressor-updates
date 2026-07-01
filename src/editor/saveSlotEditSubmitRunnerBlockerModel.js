export function createSaveSlotEditSubmitRunnerBlockerContractPreviewModel(options = {}) {
  const review = options.review || {
    version: "",
    apply: "disabled",
    payloadShape: { blockers: [], writer: "disabled" },
  };
  const text = options.text || {};
  const runnerBlockers = [
    "submit-runner-not-created",
    "confirmation-input-missing",
    "confirmation-phrase-not-matched",
    "result-source-not-selected",
    "apply-gate-blocked",
  ];
  const checks = [
    saveEditSubmitRunnerBlockerCheck("review-summary-readable", true, text.checkLabels?.reviewSummaryReadable, ""),
    saveEditSubmitRunnerBlockerCheck("submit-runner-created", false, text.checkLabels?.submitRunnerCreated, "submit-runner-not-created"),
    saveEditSubmitRunnerBlockerCheck("typed-confirmation-present", false, text.checkLabels?.typedConfirmationPresent, "confirmation-input-missing"),
    saveEditSubmitRunnerBlockerCheck("confirmation-phrase-matched", false, text.checkLabels?.confirmationPhraseMatched, "confirmation-phrase-not-matched"),
    saveEditSubmitRunnerBlockerCheck("result-source-selected", false, text.checkLabels?.resultSourceSelected, "result-source-not-selected"),
    saveEditSubmitRunnerBlockerCheck("apply-gate-held", review.apply === "disabled", text.checkLabels?.applyGateHeld, "apply-gate-open"),
    saveEditSubmitRunnerBlockerCheck("writer-disabled", review.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...review.payloadShape.blockers,
    ...runnerBlockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-submit-runner-blocker-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    submitRunner: "not-created",
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    blockers,
    payloadShape: {
      version: "save-edit-submit-runner-blocker-contract-v1",
      mode: "read-only-preview",
      source: review.version,
      submitRunner: "not-created",
      submitControl: "disabled",
      confirmationInput: "not-created",
      phraseMatch: "not-evaluated",
      resultSource: "not-resolved",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditSubmitRunnerBlockerCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
