import { renderSaveSlotEditApplyRunnerPayloadShapeView } from "./saveSlotEditApplyRunnerPayloadShapeView.js?v=680";

export function createSaveSlotEditApplyRunnerPayloadShapeRenderer(options = {}) {
  return function renderSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPreview = typeof options.createPreview === "function" ? options.createPreview : () => ({});
    const preview = createPreview(diagnostics);
    return renderSaveSlotEditApplyRunnerPayloadShapeView({
      preview,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      fieldValue: translate(
        "editorPrep.saveEditApplyRunnerPayloadShape.fieldValue",
        { count: preview.fieldCount },
        `${preview.fieldCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditApplyRunnerPayloadShape.checkValue",
        { count: preview.checkCount },
        `${preview.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditApplyRunnerPayloadShape.blockedValue",
        { count: preview.blockedCheckCount },
        `${preview.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditApplyRunnerPayloadShape.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
