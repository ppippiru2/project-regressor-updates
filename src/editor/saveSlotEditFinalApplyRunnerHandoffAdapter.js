import { renderSaveSlotEditFinalApplyRunnerHandoffView } from "./saveSlotEditFinalApplyRunnerHandoffView.js?v=676";

export function createSaveSlotEditFinalApplyRunnerHandoffRenderer(options = {}) {
  return function renderSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createChecklist = typeof options.createChecklist === "function" ? options.createChecklist : () => ({});
    const checklist = createChecklist(diagnostics);
    return renderSaveSlotEditFinalApplyRunnerHandoffView({
      checklist,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      blockerValue: translate(
        "editorPrep.saveEditFinalApplyRunnerHandoffChecklist.blockerValue",
        { count: checklist.blockerCount },
        `${checklist.blockerCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditFinalApplyRunnerHandoffChecklist.checkValue",
        { count: checklist.checkCount },
        `${checklist.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditFinalApplyRunnerHandoffChecklist.blockedValue",
        { count: checklist.blockedCheckCount },
        `${checklist.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditFinalApplyRunnerHandoffChecklist.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
