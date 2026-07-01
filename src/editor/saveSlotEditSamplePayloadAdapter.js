import { renderSaveSlotEditSamplePayloadView } from "./saveSlotEditSamplePayloadView.js?v=678";

export function createSaveSlotEditSamplePayloadRenderer(options = {}) {
  return function renderSaveSlotEditSamplePayloadPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPreview = typeof options.createPreview === "function" ? options.createPreview : () => ({});
    const preview = createPreview(diagnostics);
    return renderSaveSlotEditSamplePayloadView({
      preview,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      groupValue: translate(
        "editorPrep.saveEditSamplePayload.groupValue",
        { count: preview.groupCount },
        `${preview.groupCount}`,
      ),
      fieldValue: translate(
        "editorPrep.saveEditSamplePayload.fieldValue",
        { count: preview.fieldCount },
        `${preview.fieldCount}`,
      ),
      ruleValue: translate(
        "editorPrep.saveEditSamplePayload.ruleValue",
        { count: preview.ruleCount },
        `${preview.ruleCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditSamplePayload.blockedValue",
        { count: preview.blockedFieldCount },
        `${preview.blockedFieldCount}`,
      ),
      groupFieldFormatter: (group) => translate(
        "editorPrep.saveEditSamplePayload.groupFieldValue",
        { count: group.fieldCount },
        `${group.fieldCount}`,
      ),
      fieldChipFormatter: (field) => `${field.path} / ${field.inputKind} / ${text.pendingInput || field.proposedValue}`,
    });
  };
}
