import { renderSaveSlotEditInputSchemaView } from "./saveSlotEditInputSchemaView.js?v=680";

export function createSaveSlotEditInputSchemaRenderer(options = {}) {
  return function renderSaveSlotEditInputSchemaPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createSchema = typeof options.createSchema === "function" ? options.createSchema : () => ({ groups: [] });
    const schema = createSchema(diagnostics);
    const groups = Array.isArray(schema.groups) ? schema.groups : [];
    return renderSaveSlotEditInputSchemaView({
      schema,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      groupValue: translate(
        "editorPrep.saveEditInput.groupValue",
        { count: groups.length },
        `${groups.length}`,
      ),
      fieldValue: translate(
        "editorPrep.saveEditInput.fieldValue",
        { count: schema.fieldCount },
        `${schema.fieldCount}`,
      ),
      validationValue: translate(
        "editorPrep.saveEditInput.validationValue",
        { count: schema.validationRuleCount },
        `${schema.validationRuleCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditInput.blockedValue",
        { count: schema.blockedFieldCount },
        `${schema.blockedFieldCount}`,
      ),
      groupFieldFormatter: (group) => translate(
        "editorPrep.saveEditInput.groupFieldValue",
        { count: group.fieldCount },
        `${group.fieldCount}`,
      ),
      groupComparableFormatter: (group) => translate(
        "editorPrep.saveEditInput.groupComparableValue",
        { count: group.comparableRows },
        `${group.comparableRows}`,
      ),
    });
  };
}
