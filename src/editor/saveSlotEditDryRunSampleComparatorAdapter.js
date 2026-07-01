import { renderSaveSlotEditDryRunSampleComparatorView } from "./saveSlotEditDryRunSampleComparatorView.js?v=680";

export function createSaveSlotEditDryRunSampleComparatorRenderer(options = {}) {
  return function renderSaveSlotEditDryRunSampleComparatorPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPreview = typeof options.createPreview === "function" ? options.createPreview : () => ({});
    const preview = createPreview(diagnostics);
    return renderSaveSlotEditDryRunSampleComparatorView({
      preview,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      fieldValue: translate(
        "editorPrep.saveEditDryRunSampleComparator.fieldValue",
        { count: preview.fieldCount },
        `${preview.fieldCount}`,
      ),
      comparableValue: translate(
        "editorPrep.saveEditDryRunSampleComparator.comparableValue",
        { count: preview.comparableCount },
        `${preview.comparableCount}`,
      ),
      readyValue: translate(
        "editorPrep.saveEditDryRunSampleComparator.readyValue",
        { count: preview.readyComparisonCount },
        `${preview.readyComparisonCount}`,
      ),
      blockerValue: translate(
        "editorPrep.saveEditDryRunSampleComparator.blockerValue",
        { count: preview.blockerCount },
        `${preview.blockerCount}`,
      ),
    });
  };
}
