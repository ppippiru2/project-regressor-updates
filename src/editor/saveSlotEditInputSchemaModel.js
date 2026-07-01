export function createSaveSlotEditInputSchemaPreviewModel(options = {}) {
  const draft = options.draft || { fieldGroups: [] };
  const diff = options.diff || { groups: [] };
  const gate = options.gate || { applyStatus: "blocked" };
  const groups = draft.fieldGroups.map((group) => ({
    id: group.id,
    label: group.label,
    fieldCount: group.fields.length,
    comparableRows: diff.groups.find((item) => item.id === group.id)?.comparableRows ?? 0,
  }));
  const fields = draft.fieldGroups.flatMap((group) => group.fields.map((field) => saveEditInputSchemaField(group, field, gate)));
  return {
    status: "blocked",
    groups,
    fields,
    fieldCount: fields.length,
    validationRuleCount: new Set(fields.map((field) => field.validationRule)).size,
    blockedFieldCount: fields.filter((field) => field.status === "blocked").length,
  };
}

export function saveEditInputSchemaField(group, field, gate) {
  return {
    groupId: group.id,
    groupLabel: group.label,
    path: field.path,
    valueType: field.valueType,
    inputKind: saveEditInputKindForField(field),
    validationRule: field.guard,
    status: "blocked",
    blocker: gate.applyStatus === "blocked" ? "apply-gate-blocked" : "input-control-disabled",
  };
}

export function saveEditInputKindForField(field) {
  if (field.valueType === "integer") return "number-stepper";
  if (field.valueType === "string") return "text-field";
  if (field.valueType.endsWith("[]")) return "readonly-list-editor";
  if (field.valueType === "slot-map") return "readonly-slot-map";
  if (field.valueType === "object") return "readonly-json-object";
  return "readonly-preview";
}
