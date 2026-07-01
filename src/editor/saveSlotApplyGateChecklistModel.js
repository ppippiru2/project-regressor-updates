export function createSaveSlotApplyGateChecklistModel(options = {}) {
  const validation = options.validation || { checks: [] };
  const draft = options.draft || { payloadShape: {}, operationCount: 0, targetCount: 0 };
  const diff = options.diff || { rowCount: 0, groups: [], missingRows: 0 };
  const recovery = options.recovery || null;
  const text = options.text || {};
  const recoveryReady = recovery ? recovery.blockedSteps === 0 : false;
  const validationChecks = new Map((validation.checks || []).map((check) => [check.id, check]));
  const diagnosticsReady = ["active-save-readable", "slot-store-readable", "active-slot-safe"]
    .every((id) => validationChecks.get(id)?.status === "ready");
  const rollbackReady = validationChecks.get("rollback-snapshot-ready")?.status === "ready";
  const draftScopeLocked = draft.payloadShape?.mode === "read-only-preview"
    && draft.payloadShape?.apply === "disabled"
    && draft.operationCount > 0;
  const diffReady = diff.rowCount > 0 && diff.groups.length > 0;
  const currentPathCoverage = diff.missingRows === 0;
  const checks = [
    saveApplyGateCheck("diagnostics-readable", diagnosticsReady, text.checkLabels?.diagnosticsReadable, text.details?.diagnosticsReadable, diagnosticsReady ? "" : "diagnostics-blocked"),
    saveApplyGateCheck("rollback-contract-ready", rollbackReady, text.checkLabels?.rollbackContractReady, text.details?.rollbackContractReady, rollbackReady ? "" : "rollback-blocked"),
    saveApplyGateCheck("draft-scope-locked", draftScopeLocked, text.checkLabels?.draftScopeLocked, text.details?.draftScopeLocked, draftScopeLocked ? "" : "draft-scope-blocked"),
    saveApplyGateCheck("diff-preview-ready", diffReady, text.checkLabels?.diffPreviewReady, text.details?.diffPreviewReady, diffReady ? "" : "diff-empty"),
    saveApplyGateCheck("current-paths-covered", currentPathCoverage, text.checkLabels?.currentPathsCovered, text.details?.currentPathsCovered, currentPathCoverage ? "" : "missing-current-path"),
    saveApplyGateCheck("explicit-confirmation-required", false, text.checkLabels?.explicitConfirmationRequired, text.details?.explicitConfirmationRequired, "confirmation-not-implemented"),
    saveApplyGateCheck("writer-disabled", false, text.checkLabels?.writerDisabled, text.details?.writerDisabled, "writer-disabled"),
    saveApplyGateCheck("recovery-rehearsal-required", recoveryReady, text.checkLabels?.recoveryRehearsalRequired, text.details?.recoveryRehearsalRequired, recoveryReady ? "" : `recovery-blocked:${recovery?.blockedSteps ?? "pending"}`),
  ];
  return {
    applyStatus: "blocked",
    recoveryStatus: recoveryReady ? "ready" : "blocked",
    recoveryBlockedSteps: recovery?.blockedSteps ?? 0,
    readyChecks: checks.filter((check) => check.status === "ready").length,
    blockedChecks: checks.filter((check) => check.status === "blocked").length,
    totalChecks: checks.length,
    targetCount: draft.targetCount,
    diffRowCount: diff.rowCount,
    confirmationPhrase: text.requiredPhrase || "SAVE-EDIT-v1-CONFIRM",
    checks,
  };
}

export function saveApplyGateCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}
