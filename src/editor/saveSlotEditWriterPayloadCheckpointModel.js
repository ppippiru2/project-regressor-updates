export function createSaveSlotEditWriterPayloadCheckpointPreviewModel(options = {}) {
  const contract = options.contract || { version: "" };
  const draft = options.draft || {
    version: "",
    targetCount: 0,
    operationCount: 0,
  };
  const recovery = options.recovery || { snapshotKeys: [] };
  const text = options.text || {};
  const rollbackCheckpoint = {
    status: "not-created",
    mode: "contract-only",
    keys: recovery.snapshotKeys,
    blockers: ["rollback-checkpoint-not-created", "writer-disabled"],
  };
  const checks = [
    saveEditWriterPayloadCheckpointCheck("confirmation-contract-readable", true, text.checkLabels?.confirmationContractReadable, text.checkDetails?.confirmationContractReadable, ""),
    saveEditWriterPayloadCheckpointCheck("draft-payload-readable", draft.operationCount > 0, text.checkLabels?.draftPayloadReadable, text.checkDetails?.draftPayloadReadable, draft.operationCount > 0 ? "" : "draft-empty"),
    saveEditWriterPayloadCheckpointCheck("rollback-checkpoint-created", false, text.checkLabels?.rollbackCheckpointCreated, text.checkDetails?.rollbackCheckpointCreated, "rollback-checkpoint-not-created"),
    saveEditWriterPayloadCheckpointCheck("apply-runner-bound", false, text.checkLabels?.applyRunnerBound, text.checkDetails?.applyRunnerBound, "apply-runner-missing"),
    saveEditWriterPayloadCheckpointCheck("writer-enabled", false, text.checkLabels?.writerEnabled, text.checkDetails?.writerEnabled, "writer-disabled"),
    saveEditWriterPayloadCheckpointCheck("post-write-validation-ready", false, text.checkLabels?.postWriteValidationReady, text.checkDetails?.postWriteValidationReady, "post-write-validation-missing"),
  ];
  return {
    status: "blocked",
    version: "save-edit-writer-payload-rollback-checkpoint-v1",
    mode: "read-only-preview",
    apply: "disabled",
    targetCount: draft.targetCount,
    operationCount: draft.operationCount,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    rollbackCheckpoint,
    payloadShape: {
      version: "save-edit-writer-payload-rollback-checkpoint-v1",
      mode: "read-only-preview",
      source: contract.version,
      writerPayload: {
        status: "not-created",
        targetCount: draft.targetCount,
        operationCount: draft.operationCount,
        sourceDraft: draft.version,
      },
      rollbackCheckpoint: {
        status: "not-created",
        mode: "contract-only",
        keys: rollbackCheckpoint.keys,
      },
      applyRunner: "not-bound",
      writer: "disabled",
      apply: "disabled",
      blockers: ["rollback-checkpoint-not-created", "apply-runner-missing", "writer-disabled", "post-write-validation-missing"],
    },
  };
}

export function saveEditWriterPayloadCheckpointCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}
