import { renderSaveSlotDraftPayloadView } from "./saveSlotDraftPayloadView.js?v=676";

export function createSaveSlotDraftPayloadRenderer(options = {}) {
  return function renderSaveSlotDraftPayloadPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPreview = typeof options.createPreview === "function" ? options.createPreview : () => ({});
    const preview = createPreview(diagnostics);
    const fieldGroups = Array.isArray(preview.fieldGroups) ? preview.fieldGroups : [];

    return renderSaveSlotDraftPayloadView({
      preview,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      targetValue: translate(
        "editorPrep.saveDraft.targetValue",
        { count: preview.targetCount },
        String(preview.targetCount || 0),
      ),
      fieldGroupValue: translate(
        "editorPrep.saveDraft.fieldGroupValue",
        { count: fieldGroups.length },
        String(fieldGroups.length),
      ),
      operationValue: translate(
        "editorPrep.saveDraft.operationValue",
        { count: preview.operationCount },
        String(preview.operationCount || 0),
      ),
    });
  };
}
