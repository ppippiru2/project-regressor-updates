export function createSaveSlotEditConfirmationRunnerHandoffSummaryPreviewModel(options = {}) {
  const contract = options.contract || {
    version: "",
    mode: "read-only-preview",
    blockerCount: 0,
    blockers: [],
    applyRunner: { status: "not-bound", mode: "contract-only" },
    payloadShape: {
      confirmationInput: {
        status: "not-created",
        inputKind: "text-confirmation",
        match: "not-evaluated",
      },
    },
  };
  const checkpoint = options.checkpoint || {
    version: "",
    blockers: [],
    rollbackCheckpoint: {
      status: "not-created",
      blockers: [],
    },
  };
  const text = options.text || {};
  const rows = [
    saveEditConfirmationRunnerHandoffRow("contract-readable", text.rowLabels?.contractReadable, "ready", contract.version, contract.mode, ""),
    saveEditConfirmationRunnerHandoffRow("confirmation-input", text.rowLabels?.confirmationInput, "blocked", contract.payloadShape.confirmationInput.status, contract.payloadShape.confirmationInput.inputKind, "confirmation-input-missing"),
    saveEditConfirmationRunnerHandoffRow("confirmation-match", text.rowLabels?.confirmationMatch, "blocked", contract.payloadShape.confirmationInput.match, "match-required", "confirmation-input-missing"),
    saveEditConfirmationRunnerHandoffRow("validator-results", text.rowLabels?.validatorResults, "blocked", "not-produced", "valid-results-required", "result-not-produced"),
    saveEditConfirmationRunnerHandoffRow("apply-runner", text.rowLabels?.applyRunner, "blocked", contract.applyRunner.status, contract.applyRunner.mode, "apply-runner-missing"),
    saveEditConfirmationRunnerHandoffRow("writer-checkpoint", text.rowLabels?.writerCheckpoint, "blocked", checkpoint.version, checkpoint.rollbackCheckpoint.status, "writer-disabled"),
  ];
  const checks = [
    saveEditConfirmationRunnerHandoffCheck("contract-readable", true, text.checkLabels?.contractReadable, text.checkDetails?.contractReadable, ""),
    saveEditConfirmationRunnerHandoffCheck("blockers-forwarded", contract.blockerCount > 0, text.checkLabels?.blockersForwarded, text.checkDetails?.blockersForwarded, contract.blockerCount > 0 ? "" : "blockers-missing"),
    saveEditConfirmationRunnerHandoffCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, text.checkDetails?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditConfirmationRunnerHandoffCheck("confirmation-match-verified", false, text.checkLabels?.confirmationMatchVerified, text.checkDetails?.confirmationMatchVerified, "confirmation-input-missing"),
    saveEditConfirmationRunnerHandoffCheck("validator-results-valid", false, text.checkLabels?.validatorResultsValid, text.checkDetails?.validatorResultsValid, "result-not-produced"),
    saveEditConfirmationRunnerHandoffCheck("apply-runner-bound", false, text.checkLabels?.applyRunnerBound, text.checkDetails?.applyRunnerBound, "apply-runner-missing"),
    saveEditConfirmationRunnerHandoffCheck("writer-enabled", false, text.checkLabels?.writerEnabled, text.checkDetails?.writerEnabled, "writer-disabled"),
  ];
  const contractBlockers = Array.isArray(contract.blockers) ? contract.blockers : [];
  const checkpointBlockers = Array.isArray(checkpoint.blockers)
    ? checkpoint.blockers
    : (Array.isArray(checkpoint.rollbackCheckpoint?.blockers) ? checkpoint.rollbackCheckpoint.blockers : []);
  const blockers = Array.from(new Set([
    ...contractBlockers,
    ...checkpointBlockers,
    ...rows.map((row) => row.blocker).filter(Boolean),
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-confirmation-runner-handoff-summary-v1",
    mode: "read-only-preview",
    handoff: "blocked",
    confirmationInput: "not-created",
    applyRunner: "not-bound",
    apply: "disabled",
    writer: "disabled",
    sideEffects: "disabled",
    rowCount: rows.length,
    blockedRowCount: rows.filter((row) => row.status === "blocked").length,
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    rows,
    checks,
    blockers,
    payloadShape: {
      version: "save-edit-confirmation-runner-handoff-summary-v1",
      mode: "read-only-preview",
      source: contract.version,
      next: checkpoint.version,
      handoff: "blocked",
      confirmationInput: "not-created",
      confirmationMatch: "not-evaluated",
      applyRunner: "not-bound",
      apply: "disabled",
      writer: "disabled",
      sideEffects: "disabled",
      rows: rows.map((row) => ({
        id: row.id,
        status: row.status,
        blocker: row.blocker,
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

export function saveEditConfirmationRunnerHandoffRow(id, label, status, sourceValue, targetValue, blocker) {
  return {
    id,
    label: label || id,
    status,
    sourceValue,
    targetValue,
    blocker,
  };
}

export function saveEditConfirmationRunnerHandoffCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: isReady ? "" : blocker,
  };
}
