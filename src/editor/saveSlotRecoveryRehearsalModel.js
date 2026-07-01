export function createSaveSlotRecoveryRehearsalPreviewModel(options = {}) {
  const diagnostics = options.diagnostics || {};
  const keys = options.keys || {};
  const validation = options.validation || {};
  const draft = options.draft || {};
  const diff = options.diff || {};
  const gate = options.gate || { applyStatus: "blocked" };
  const text = options.text || {};
  const snapshotKeys = [
    saveRecoverySnapshotKey(keys.activeSave, text.keyLabels?.activeSave, diagnostics.activeSave),
    saveRecoverySnapshotKey(keys.slotStore, text.keyLabels?.slotStore, diagnostics.slotStore),
    saveRecoverySnapshotKey(keys.activeSlot, text.keyLabels?.activeSlot, diagnostics.activeSlot),
    saveRecoverySnapshotKey(keys.uiState, text.keyLabels?.uiState, diagnostics.uiState),
  ];
  const keysReadable = snapshotKeys.every((item) => item.status === "ready");
  const rollbackReady = validation.rollbackStatus === "ready";
  const diffReady = diff.rowCount > 0;
  const gateBlocked = gate.applyStatus === "blocked";
  const steps = [
    saveRecoveryStep("snapshot-readiness", keysReadable, text.stepLabels?.snapshotReadiness, text.stepDetails?.snapshotReadiness, keysReadable ? "" : "snapshot-key-invalid"),
    saveRecoveryStep("rollback-contract", rollbackReady, text.stepLabels?.rollbackContract, text.stepDetails?.rollbackContract, rollbackReady ? "" : "rollback-contract-blocked"),
    saveRecoveryStep("draft-diff-boundary", draft.operationCount > 0 && diffReady, text.stepLabels?.draftDiffBoundary, text.stepDetails?.draftDiffBoundary, diffReady ? "" : "diff-preview-empty"),
    saveRecoveryStep("apply-gate-hold", gateBlocked, text.stepLabels?.applyGateHold, text.stepDetails?.applyGateHold, ""),
    saveRecoveryStep("writer-exception-restore", false, text.stepLabels?.writerExceptionRestore, text.stepDetails?.writerExceptionRestore, "writer-not-implemented"),
    saveRecoveryStep("post-apply-validation-restore", false, text.stepLabels?.postApplyValidationRestore, text.stepDetails?.postApplyValidationRestore, "post-apply-validation-missing"),
  ];
  const failureRoutes = [
    saveRecoveryRoute("parse-failure-before-apply", text.routeLabels?.parseFailure, text.routeDetails?.parseFailure, "stop-before-writer"),
    saveRecoveryRoute("missing-path-before-apply", text.routeLabels?.missingPath, text.routeDetails?.missingPath, diff.missingRows > 0 ? "block-on-missing-path" : "no-missing-path"),
    saveRecoveryRoute("writer-exception", text.routeLabels?.writerException, text.routeDetails?.writerException, "restore-snapshot-keys"),
    saveRecoveryRoute("post-apply-validation-failure", text.routeLabels?.postApplyValidationFailure, text.routeDetails?.postApplyValidationFailure, "restore-then-rerun-diagnostics"),
  ];
  return {
    status: "blocked",
    readableKeys: snapshotKeys.filter((item) => item.status === "ready").length,
    blockedSteps: steps.filter((step) => step.status === "blocked").length,
    snapshotKeys,
    steps,
    failureRoutes,
    previewShape: {
      version: "save-slot-recovery-rehearsal-v1",
      mode: "read-only-preview",
      snapshotKeys: snapshotKeys.map((item) => item.key),
      apply: "disabled",
    },
  };
}

export function saveRecoverySnapshotKey(key, label, diagnostic) {
  const status = diagnostic?.status === "invalid" || diagnostic?.status === "unavailable" ? "blocked" : "ready";
  return {
    key,
    label: label || key,
    status,
    detail: diagnostic?.hint || "",
  };
}

export function saveRecoveryStep(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}

export function saveRecoveryRoute(id, label, detail, action) {
  return {
    id,
    label: label || id,
    detail: detail || "",
    action,
  };
}
