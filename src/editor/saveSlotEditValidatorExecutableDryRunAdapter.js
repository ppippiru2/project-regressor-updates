import { renderSaveSlotEditValidatorExecutableDryRunView } from "./saveSlotEditValidatorExecutableDryRunView.js?v=680";

export function createSaveSlotEditValidatorExecutableDryRunRenderer(options = {}) {
  return function renderSaveSlotEditValidatorExecutableDryRunPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createPreview = typeof options.createPreview === "function" ? options.createPreview : () => ({});
    const preview = createPreview(diagnostics);
    return renderSaveSlotEditValidatorExecutableDryRunView({
      preview,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      validatorValue: translate(
        "editorPrep.saveEditValidatorExecutableDryRun.validatorValue",
        { count: preview.validatorCount },
        `${preview.validatorCount}`,
      ),
      implementedValue: translate(
        "editorPrep.saveEditValidatorExecutableDryRun.implementedValue",
        { count: preview.implementedValidatorCount },
        `${preview.implementedValidatorCount}`,
      ),
      resultValue: translate(
        "editorPrep.saveEditValidatorExecutableDryRun.resultValue",
        { count: preview.resultCount },
        `${preview.resultCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditValidatorExecutableDryRun.blockedValue",
        { count: preview.blockedResultCount },
        `${preview.blockedResultCount}`,
      ),
    });
  };
}
