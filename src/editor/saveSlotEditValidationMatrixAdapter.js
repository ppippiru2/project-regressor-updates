import { renderSaveSlotEditValidationMatrixView } from "./saveSlotEditValidationMatrixView.js?v=680";

export function createSaveSlotEditValidationMatrixRenderer(options = {}) {
  return function renderSaveSlotEditValidationMatrix(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createMatrix = typeof options.createMatrix === "function" ? options.createMatrix : () => ({});
    const matrix = createMatrix(diagnostics);
    return renderSaveSlotEditValidationMatrixView({
      matrix,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      fieldValue: translate(
        "editorPrep.saveEditMatrix.fieldValue",
        { count: matrix.fieldCount },
        `${matrix.fieldCount}`,
      ),
      targetValue: translate(
        "editorPrep.saveEditMatrix.targetValue",
        { count: matrix.targetCount },
        `${matrix.targetCount}`,
      ),
      placeholderValue: translate(
        "editorPrep.saveEditMatrix.placeholderValue",
        { count: matrix.placeholderCount },
        `${matrix.placeholderCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditMatrix.blockedValue",
        { count: matrix.blockedRows },
        `${matrix.blockedRows}`,
      ),
    });
  };
}
