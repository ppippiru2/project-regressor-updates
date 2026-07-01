import { renderSaveSlotEditProducedResultBridgeView } from "./saveSlotEditProducedResultBridgeView.js?v=675";

export function createSaveSlotEditProducedResultBridgeRenderer(options = {}) {
  return function renderSaveSlotEditProducedResultBridgeContractPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createContract = typeof options.createContract === "function" ? options.createContract : () => ({});
    const contract = createContract(diagnostics);
    return renderSaveSlotEditProducedResultBridgeView({
      contract,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      resultValue: translate(
        "editorPrep.saveEditProducedResultBridgeContract.resultValue",
        { count: contract.resultCount },
        `${contract.resultCount}`,
      ),
      routeValue: translate(
        "editorPrep.saveEditProducedResultBridgeContract.routeValue",
        { count: contract.routeCount },
        `${contract.routeCount}`,
      ),
      blockerValue: translate(
        "editorPrep.saveEditProducedResultBridgeContract.blockerValue",
        { count: contract.blockerCount },
        `${contract.blockerCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditProducedResultBridgeContract.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
