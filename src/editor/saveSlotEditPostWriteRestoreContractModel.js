export function createSaveSlotEditPostWriteRestoreContractPreviewModel(options = {}) {
  const checkpoint = options.checkpoint || {
    version: "",
    rollbackCheckpoint: {
      status: "not-created",
      blockers: [],
    },
  };
  const recovery = options.recovery || { snapshotKeys: [] };
  const text = options.text || {};
  const routes = [
    saveEditPostWriteRestoreRoute("post-write-validation", text.routeLabels?.postWriteValidation, "not-bound", "post-write-validation-missing"),
    saveEditPostWriteRestoreRoute("restore-from-checkpoint", text.routeLabels?.restoreFromCheckpoint, "not-bound", "restore-runner-missing"),
    saveEditPostWriteRestoreRoute("revalidate-after-restore", text.routeLabels?.revalidateAfterRestore, "not-bound", "restore-validation-missing"),
    saveEditPostWriteRestoreRoute("surface-failure-log", text.routeLabels?.surfaceFailureLog, "planned", "failure-log-not-connected"),
  ];
  const blockers = Array.from(new Set(routes.map((route) => route.blocker).concat(checkpoint.rollbackCheckpoint.blockers)));
  return {
    status: "blocked",
    version: "save-edit-post-write-validation-restore-route-v1",
    mode: "read-only-preview",
    apply: "disabled",
    postWriteValidation: {
      status: "not-bound",
      mode: "contract-only",
      requires: ["writer-result", "saved-state-readable", "schema-validation"],
    },
    restoreRunner: {
      status: "not-bound",
      mode: "contract-only",
      checkpointKeys: recovery.snapshotKeys,
    },
    routeCount: routes.length,
    blockerCount: blockers.length,
    routes,
    blockers,
    payloadShape: {
      version: "save-edit-post-write-validation-restore-route-v1",
      mode: "read-only-preview",
      source: checkpoint.version,
      postWriteValidation: "not-bound",
      restoreRunner: "not-bound",
      rollbackCheckpoint: checkpoint.rollbackCheckpoint.status,
      checkpointKeys: recovery.snapshotKeys,
      apply: "disabled",
      blockers,
    },
  };
}

export function saveEditPostWriteRestoreRoute(id, label, status, blocker) {
  return {
    id,
    label: label || id,
    status,
    blocker,
  };
}
