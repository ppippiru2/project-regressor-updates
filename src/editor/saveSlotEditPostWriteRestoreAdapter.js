import { renderSaveSlotEditPostWriteRestoreContractView } from "./saveSlotEditPostWriteRestoreContractView.js?v=679";

export function createSaveSlotEditPostWriteRestoreContractRenderer(options = {}) {
  return function renderSaveSlotEditPostWriteRestoreContractPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createContract = typeof options.createContract === "function" ? options.createContract : () => ({});
    const contract = createContract(diagnostics);
    return renderSaveSlotEditPostWriteRestoreContractView({
      contract,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      routeValue: translate(
        "editorPrep.saveEditPostWriteRestoreContract.routeValue",
        { count: contract.routeCount },
        `${contract.routeCount}`,
      ),
      blockerValue: translate(
        "editorPrep.saveEditPostWriteRestoreContract.blockerValue",
        { count: contract.blockerCount },
        `${contract.blockerCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditPostWriteRestoreContract.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
