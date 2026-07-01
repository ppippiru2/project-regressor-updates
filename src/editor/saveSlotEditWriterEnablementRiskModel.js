export function createSaveSlotEditWriterEnablementRiskSummaryModel(options = {}) {
  const restoreContract = options.restoreContract || {
    version: "",
    blockers: [],
  };
  const text = options.text || {};
  const checklist = [
    saveEditWriterEnablementRiskCheck("restore-contract-readable", true, text.checkLabels?.restoreContractReadable, text.checkDetails?.restoreContractReadable, ""),
    saveEditWriterEnablementRiskCheck("validator-results-produced", false, text.checkLabels?.validatorResultsProduced, text.checkDetails?.validatorResultsProduced, "validator-results-missing"),
    saveEditWriterEnablementRiskCheck("confirmation-input-bound", false, text.checkLabels?.confirmationInputBound, text.checkDetails?.confirmationInputBound, "confirmation-input-missing"),
    saveEditWriterEnablementRiskCheck("rollback-checkpoint-available", false, text.checkLabels?.rollbackCheckpointAvailable, text.checkDetails?.rollbackCheckpointAvailable, "rollback-checkpoint-not-created"),
    saveEditWriterEnablementRiskCheck("post-write-validation-bound", false, text.checkLabels?.postWriteValidationBound, text.checkDetails?.postWriteValidationBound, "post-write-validation-missing"),
    saveEditWriterEnablementRiskCheck("restore-runner-bound", false, text.checkLabels?.restoreRunnerBound, text.checkDetails?.restoreRunnerBound, "restore-runner-missing"),
    saveEditWriterEnablementRiskCheck("manual-unlock-approved", false, text.checkLabels?.manualUnlockApproved, text.checkDetails?.manualUnlockApproved, "manual-unlock-not-approved"),
  ];
  const blockers = Array.from(new Set(
    checklist
      .map((check) => check.blocker)
      .filter(Boolean)
      .concat(restoreContract.blockers),
  ));
  const manualUnlock = {
    status: "not-available",
    mode: "manual-review-only",
    requiredReview: [
      "validator-results",
      "rollback-checkpoint",
      "post-write-validation",
      "restore-runner",
      "failure-log",
    ],
    blockers: ["manual-unlock-not-approved", "writer-disabled"],
  };
  return {
    status: "blocked",
    version: "save-edit-final-writer-enablement-risk-manual-unlock-v1",
    mode: "read-only-preview",
    apply: "disabled",
    riskLevel: "high",
    checkCount: checklist.length,
    blockerCount: blockers.length,
    blockers,
    checklist,
    manualUnlock,
    payloadShape: {
      version: "save-edit-final-writer-enablement-risk-manual-unlock-v1",
      mode: "read-only-preview",
      source: restoreContract.version,
      riskLevel: "high",
      writer: "disabled",
      apply: "disabled",
      manualUnlock: {
        status: "not-available",
        mode: "manual-review-only",
        requiredReview: manualUnlock.requiredReview,
        blockers: manualUnlock.blockers,
      },
      blockers,
    },
  };
}

export function saveEditWriterEnablementRiskCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}
