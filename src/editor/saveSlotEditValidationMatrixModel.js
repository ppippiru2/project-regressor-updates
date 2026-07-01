export function createSaveSlotEditValidationMatrixModel(options = {}) {
  const schema = options.schema || { fields: [] };
  const diff = options.diff || { rows: [], targetCount: 0 };
  const rows = schema.fields.map((field) => {
    const targetRows = diff.rows.filter((row) => row.path === field.path);
    return {
      path: field.path,
      inputKind: field.inputKind,
      validationRule: field.validationRule,
      targetCount: targetRows.length,
      currentStatus: targetRows.some((row) => row.status === "missing-current-path") ? "missing-current-path" : "ready",
      proposedValue: "pending-input",
      validationResult: "not-run",
      status: "blocked",
      blocker: field.blocker,
    };
  });
  return {
    status: "blocked",
    fieldCount: rows.length,
    targetCount: diff.targetCount,
    placeholderCount: rows.filter((row) => row.proposedValue === "pending-input").length,
    blockedRows: rows.filter((row) => row.status === "blocked").length,
    rows,
  };
}
