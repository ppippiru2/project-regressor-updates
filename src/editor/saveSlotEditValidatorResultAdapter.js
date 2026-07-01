import { renderSaveSlotEditValidatorResultView } from "./saveSlotEditValidatorResultView.js?v=678";

export function createSaveSlotEditValidatorResultRenderer(options = {}) {
  return function renderSaveSlotEditValidatorResultSchemaPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createSchema = typeof options.createSchema === "function" ? options.createSchema : () => ({});
    const schema = createSchema(diagnostics);
    return renderSaveSlotEditValidatorResultView({
      schema,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      validatorValue: translate(
        "editorPrep.saveEditValidatorResult.validatorValue",
        { count: schema.validatorCount },
        `${schema.validatorCount}`,
      ),
      fieldValue: translate(
        "editorPrep.saveEditValidatorResult.fieldValue",
        { count: schema.fieldCount },
        `${schema.fieldCount}`,
      ),
      resultValue: translate(
        "editorPrep.saveEditValidatorResult.resultValue",
        { count: schema.resultCount },
        `${schema.resultCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditValidatorResult.blockedValue",
        { count: schema.blockedResultCount },
        `${schema.blockedResultCount}`,
      ),
    });
  };
}
