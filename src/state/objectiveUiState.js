export function toggleObjectiveAlertState(uiState, objectiveId) {
  if (!objectiveId) return uiState;
  ensureObjectiveUiState(uiState);

  const collapsed = new Set(uiState.collapsedObjectives);
  if (collapsed.has(objectiveId)) {
    collapsed.delete(objectiveId);
  } else {
    collapsed.add(objectiveId);
  }
  uiState.collapsedObjectives = [...collapsed];
  return uiState;
}

export function toggleObjectiveRotationModeState(uiState, currentIndex = 0, total = 1) {
  ensureObjectiveUiState(uiState);

  const nextMode = uiState.objectiveRotationMode === "manual" ? "auto" : "manual";
  uiState.objectiveRotationMode = nextMode;
  if (nextMode === "manual") {
    uiState.objectiveRotationIndex = normalizeObjectiveIndex(currentIndex, total);
  }
  return uiState;
}

export function stepObjectiveRotationState(uiState, direction, currentIndex = 0, total = 1) {
  ensureObjectiveUiState(uiState);
  if (total <= 1) return uiState;

  uiState.objectiveRotationMode = "manual";
  uiState.objectiveRotationIndex = normalizeObjectiveIndex(currentIndex + direction, total);
  return uiState;
}

function ensureObjectiveUiState(uiState) {
  if (!Array.isArray(uiState.collapsedObjectives)) {
    uiState.collapsedObjectives = [];
  }
  if (uiState.objectiveRotationMode !== "manual") {
    uiState.objectiveRotationMode = "auto";
  }
  const index = Number(uiState.objectiveRotationIndex);
  uiState.objectiveRotationIndex = Number.isFinite(index) && index >= 0 ? Math.floor(index) : 0;
  return uiState;
}

function normalizeObjectiveIndex(index, total) {
  const count = Math.max(1, Number(total) || 1);
  const value = Number(index);
  const safeIndex = Number.isFinite(value) ? Math.floor(value) : 0;
  return ((safeIndex % count) + count) % count;
}
