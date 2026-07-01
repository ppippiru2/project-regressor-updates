export function createSaveSlotEditConfirmationMatchReviewSummaryPreviewModel(options = {}) {
  const inputShell = options.inputShell || {
    requiredPhrase: "",
    version: "",
    apply: "disabled",
    payloadShape: { blockers: [], writer: "disabled" },
  };
  const text = options.text || {};
  const reviews = [
    saveEditConfirmationMatchReviewRow("requiredPhrase", text.reviewLabels?.requiredPhrase, "ready", inputShell.requiredPhrase, ""),
    saveEditConfirmationMatchReviewRow("typedConfirmation", text.reviewLabels?.typedConfirmation, "blocked", "not-created", "confirmation-input-missing"),
    saveEditConfirmationMatchReviewRow("phraseMatch", text.reviewLabels?.phraseMatch, "blocked", "not-evaluated", "confirmation-phrase-not-matched"),
    saveEditConfirmationMatchReviewRow("selectedSource", text.reviewLabels?.selectedSource, "blocked", "none", "source-selector-not-created"),
    saveEditConfirmationMatchReviewRow("resultSource", text.reviewLabels?.resultSource, "blocked", "not-resolved", "result-source-not-selected"),
    saveEditConfirmationMatchReviewRow("submitControl", text.reviewLabels?.submitControl, "ready", "disabled", ""),
  ];
  const checks = [
    saveEditConfirmationMatchReviewCheck("input-shell-readable", true, text.checkLabels?.inputShellReadable, ""),
    saveEditConfirmationMatchReviewCheck("required-phrase-known", Boolean(inputShell.requiredPhrase), text.checkLabels?.requiredPhraseKnown, "confirmation-phrase-missing"),
    saveEditConfirmationMatchReviewCheck("typed-confirmation-present", false, text.checkLabels?.typedConfirmationPresent, "confirmation-input-missing"),
    saveEditConfirmationMatchReviewCheck("confirmation-phrase-matches", false, text.checkLabels?.confirmationPhraseMatches, "confirmation-phrase-not-matched"),
    saveEditConfirmationMatchReviewCheck("source-selection-present", false, text.checkLabels?.sourceSelectionPresent, "source-selector-not-created"),
    saveEditConfirmationMatchReviewCheck("result-source-resolved", false, text.checkLabels?.resultSourceResolved, "result-source-not-selected"),
    saveEditConfirmationMatchReviewCheck("submit-control-disabled", true, text.checkLabels?.submitControlDisabled, ""),
    saveEditConfirmationMatchReviewCheck("apply-path-held", inputShell.apply === "disabled", text.checkLabels?.applyPathHeld, "apply-gate-open"),
    saveEditConfirmationMatchReviewCheck("writer-disabled", inputShell.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...inputShell.payloadShape.blockers,
    ...reviews.map((review) => review.blocker).filter(Boolean),
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-confirmation-match-result-source-review-v1",
    mode: "read-only-preview",
    apply: "disabled",
    resultSource: "not-resolved",
    requiredPhrase: inputShell.requiredPhrase,
    reviewCount: reviews.length,
    blockedReviewCount: reviews.filter((review) => review.status === "blocked").length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    reviews,
    checks,
    payloadShape: {
      version: "save-edit-confirmation-match-result-source-review-v1",
      mode: "read-only-preview",
      source: inputShell.version,
      requiredPhrase: inputShell.requiredPhrase,
      typedConfirmation: "not-created",
      phraseMatch: "not-evaluated",
      selectedSource: "none",
      resultSource: "not-resolved",
      submitControl: "disabled",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditConfirmationMatchReviewRow(id, label, status, value, blocker) {
  return {
    id,
    label: label || id,
    status,
    value,
    blocker,
  };
}

export function saveEditConfirmationMatchReviewCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
