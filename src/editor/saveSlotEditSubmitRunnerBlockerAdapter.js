import { renderSaveSlotEditSubmitRunnerBlockerView } from "./saveSlotEditSubmitRunnerBlockerView.js?v=681";

export function createSaveSlotEditSubmitRunnerBlockerRenderer(options = {}) {
  return function renderSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createContract = typeof options.createContract === "function" ? options.createContract : () => ({});
    const contract = createContract(diagnostics);
    return renderSaveSlotEditSubmitRunnerBlockerView({
      contract,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      blockerValue: translate(
        "editorPrep.saveEditSubmitRunnerBlockerContract.blockerValue",
        { count: contract.blockerCount },
        `${contract.blockerCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditSubmitRunnerBlockerContract.checkValue",
        { count: contract.checkCount },
        `${contract.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditSubmitRunnerBlockerContract.blockedValue",
        { count: contract.blockedCheckCount },
        `${contract.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditSubmitRunnerBlockerContract.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
      blockerChipFormatter: (blocker) => translate(
        "editorPrep.saveEditSubmitRunnerBlockerContract.blockerText",
        { blocker },
        blocker,
      ),
    });
  };
}
