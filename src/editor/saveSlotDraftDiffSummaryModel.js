import { createSaveSlotDraftPayloadPreview } from "./saveSlotDraftPayloadModel.js?v=679";

export function createSaveSlotDraftDiffSummary(diagnostics = {}, text = {}) {
  const draft = createSaveSlotDraftPayloadPreview(diagnostics, text.saveDraft || {});
  const targets = createSaveDraftDiffTargets(diagnostics, text.saveDraftDiff || {})
    .filter((target) => draft.payloadShape.target.ids.includes(target.id));
  const fields = draft.fieldGroups.flatMap((group) => group.fields.map((field) => ({
    ...field,
    groupId: group.id,
    groupLabel: group.label,
  })));
  const rows = targets.flatMap((target) => fields.map((field) => createSaveDraftDiffRow(target, field)));
  const groups = draft.fieldGroups.map((group) => {
    const groupRows = rows.filter((row) => row.groupId === group.id);
    return {
      id: group.id,
      label: group.label,
      fieldCount: group.fields.length,
      rowCount: groupRows.length,
      comparableRows: groupRows.filter((row) => row.status === "waiting-input").length,
      missingRows: groupRows.filter((row) => row.status === "missing-current-path").length,
      blockedRows: groupRows.filter((row) => row.status === "target-blocked").length,
      paths: group.fields.map((field) => field.path),
    };
  });
  return {
    applyStatus: "blocked",
    targetCount: targets.length,
    fieldCount: fields.length,
    rowCount: rows.length,
    comparableRows: rows.filter((row) => row.status === "waiting-input").length,
    missingRows: rows.filter((row) => row.status === "missing-current-path").length,
    blockedRows: rows.filter((row) => row.status === "target-blocked").length,
    rows,
    groups,
  };
}

export function createSaveDraftDiffTargets(diagnostics = {}, text = {}) {
  const slots = Array.isArray(diagnostics.slots) ? diagnostics.slots : [];
  return [
    {
      id: "activeSave",
      label: text.activeSaveTarget || "Active save",
      status: diagnostics.activeSave?.status,
      saveState: diagnostics.activeSave?.value,
    },
    ...slots.map((slot) => ({
      id: slot.id,
      label: slot.label,
      status: slot.status,
      saveState: slot.saveState,
    })),
  ];
}

export function createSaveDraftDiffRow(target, field) {
  const targetReady = ["ready", "warning"].includes(target.status) && isPlainObject(target.saveState);
  if (!targetReady) {
    return {
      ...field,
      targetId: target.id,
      targetLabel: target.label,
      status: "target-blocked",
      currentPreview: "-",
      proposedPreview: "pending-input",
      blocker: target.status || "unavailable",
    };
  }
  const current = readSaveDraftPath(target.saveState, field.path);
  return {
    ...field,
    targetId: target.id,
    targetLabel: target.label,
    status: current.exists ? "waiting-input" : "missing-current-path",
    currentPreview: current.exists ? formatSaveDraftDiffValue(current.value) : "-",
    proposedPreview: "pending-input",
    blocker: current.exists ? "writer-disabled" : "missing-current-path",
  };
}

export function readSaveDraftPath(source, path) {
  const parts = String(path || "").split(".").filter(Boolean);
  let value = source;
  for (const part of parts) {
    if (!isPlainObject(value) && !Array.isArray(value)) return { exists: false, value: undefined };
    if (!Object.hasOwn(value, part)) return { exists: false, value: undefined };
    value = value[part];
  }
  return { exists: true, value };
}

export function formatSaveDraftDiffValue(value) {
  if (value === null) return "null";
  if (value === undefined) return "-";
  if (Array.isArray(value)) return `array(${value.length})`;
  if (isPlainObject(value)) return `object(${Object.keys(value).length})`;
  const text = String(value);
  return text.length > 32 ? `${text.slice(0, 29)}...` : text;
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}
