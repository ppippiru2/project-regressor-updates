import { saveEditInputKindForField } from "./saveSlotEditInputSchemaModel.js?v=677";

export function createSaveSlotEditSamplePayloadPreviewModel(options = {}) {
  const draft = options.draft || { fieldGroups: [], payloadShape: { target: {} } };
  const matrix = options.matrix || { rows: [] };
  const ruleDrilldown = options.ruleDrilldown || { ruleCount: 0 };
  const rowByPath = new Map(matrix.rows.map((row) => [row.path, row]));
  const groups = draft.fieldGroups.map((group) => {
    const fields = group.fields.map((field) => {
      const row = rowByPath.get(field.path) || {};
      return {
        path: field.path,
        valueType: field.valueType,
        inputKind: row.inputKind || saveEditInputKindForField(field),
        validationRule: field.guard,
        proposedValue: "pending-input",
        validationResult: "not-run",
        status: "blocked",
        blocker: row.blocker || "apply-gate-blocked",
      };
    });
    return {
      id: group.id,
      label: group.label,
      fieldCount: fields.length,
      fields,
    };
  });
  const fields = groups.flatMap((group) => group.fields);
  const payloadShape = {
    version: "save-slot-edit-proposed-values-sample-v1",
    mode: "read-only-preview",
    target: draft.payloadShape.target,
    sourceContracts: [
      "save-slot-edit-draft-v1",
      "save-edit-validation-matrix",
      "save-edit-validation-rule-drilldown",
      "save-apply-gate-blocked",
    ],
    groups: groups.map((group) => ({
      id: group.id,
      fields: group.fields.map((field) => ({
        path: field.path,
        inputKind: field.inputKind,
        valueType: field.valueType,
        validationRule: field.validationRule,
        proposedValue: field.proposedValue,
        validationResult: field.validationResult,
        status: field.status,
        blocker: field.blocker,
      })),
    })),
    apply: "disabled",
  };
  return {
    status: "blocked",
    groupCount: groups.length,
    fieldCount: fields.length,
    ruleCount: ruleDrilldown.ruleCount,
    blockedFieldCount: fields.filter((field) => field.status === "blocked").length,
    groups,
    payloadShape,
  };
}
