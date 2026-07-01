import { renderSaveSlotEditConfirmationSourceSelectionView } from "./saveSlotEditConfirmationSourceSelectionView.js?v=676";

export function createSaveSlotEditConfirmationSourceSelectionRenderer(options = {}) {
  return function renderSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createContract = typeof options.createContract === "function" ? options.createContract : () => ({});
    const contract = createContract(diagnostics);
    return renderSaveSlotEditConfirmationSourceSelectionView({
      contract,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      checkValue: translate(
        "editorPrep.saveEditConfirmationSourceSelectionContract.checkValue",
        { count: contract.checkCount },
        `${contract.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditConfirmationSourceSelectionContract.blockedValue",
        { count: contract.blockedCheckCount },
        `${contract.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditConfirmationSourceSelectionContract.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
