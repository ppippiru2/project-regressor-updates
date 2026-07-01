export function createSaveSlotValidationPlan(diagnostics = {}, text = {}) {
  const activeSaveReady = diagnostics.activeSave?.status === "ready";
  const slotStoreReady = diagnostics.slotStore?.status === "ready";
  const activeSlotStatus = diagnostics.activeSlot?.status || "";
  const activeSlotSafe = ["ready", "none", "empty"].includes(activeSlotStatus);
  const rollbackReady = [diagnostics.activeSave, diagnostics.slotStore, diagnostics.uiState]
    .every((entry) => entry?.status !== "invalid") && activeSlotSafe;
  const checks = [
    saveValidationCheck("active-save-readable", activeSaveReady, text.checkLabels?.activeSaveReadable, diagnostics.activeSave?.hint),
    saveValidationCheck("slot-store-readable", slotStoreReady, text.checkLabels?.slotStoreReadable, diagnostics.slotStore?.hint),
    saveValidationCheck("active-slot-safe", activeSlotSafe, text.checkLabels?.activeSlotSafe, diagnostics.activeSlot?.hint),
    saveValidationCheck("rollback-snapshot-ready", rollbackReady, text.checkLabels?.rollbackSnapshotReady, text.rollbackSnapshotDetail),
    saveValidationCheck("write-controls-blocked", true, text.checkLabels?.writeControlsBlocked, text.writeControlsBlockedDetail),
    saveValidationCheck("explicit-confirmation-required", false, text.checkLabels?.explicitConfirmationRequired, text.explicitConfirmationDetail),
    saveValidationCheck("apply-writer-disabled", false, text.checkLabels?.applyWriterDisabled, text.applyWriterDisabledDetail),
  ];
  return {
    checks,
    readyChecks: checks.filter((check) => check.status === "ready").length,
    totalChecks: checks.length,
    rollbackStatus: rollbackReady ? "ready" : "blocked",
    applyStatus: "blocked",
  };
}

export function saveValidationCheck(id, isReady, label, detail) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
  };
}
