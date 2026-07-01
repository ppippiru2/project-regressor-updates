import { renderSaveSlotEditProposedValueInjectorView } from "./saveSlotEditProposedValueInjectorView.js?v=677";

export function createSaveSlotEditProposedValueInjectorRenderer(options = {}) {
  return function renderSaveSlotEditProposedValueInjectorPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPreview = typeof options.createPreview === "function" ? options.createPreview : () => ({});
    const preview = createPreview(diagnostics);
    return renderSaveSlotEditProposedValueInjectorView({
      preview,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      fieldValue: translate(
        "editorPrep.saveEditProposedValueInjector.fieldValue",
        { count: preview.fieldCount },
        `${preview.fieldCount}`,
      ),
      validValue: translate(
        "editorPrep.saveEditProposedValueInjector.validValue",
        { count: preview.validSampleCount },
        `${preview.validSampleCount}`,
      ),
      invalidValue: translate(
        "editorPrep.saveEditProposedValueInjector.invalidValue",
        { count: preview.invalidSampleCount },
        `${preview.invalidSampleCount}`,
      ),
    });
  };
}
