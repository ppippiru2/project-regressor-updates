export function cloneSessionSnapshot(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createPendingSlotCreationSnapshot({ state, uiState, activeSaveSlotId = "", viewId = "settings" }) {
  return {
    state: cloneSessionSnapshot(state),
    uiState: cloneSessionSnapshot(uiState),
    activeSaveSlotId,
    viewId,
  };
}

export function restorePendingSlotCreationSnapshot(snapshot) {
  if (!snapshot) return null;
  return {
    state: cloneSessionSnapshot(snapshot.state),
    uiState: cloneSessionSnapshot(snapshot.uiState),
    activeSaveSlotId: snapshot.activeSaveSlotId || "",
    viewId: snapshot.viewId || "settings",
  };
}
