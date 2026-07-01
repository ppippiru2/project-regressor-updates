import { renderSaveSlotEditSelectedSourceHandoffView } from "./saveSlotEditSelectedSourceHandoffView.js?v=680";

export function createSaveSlotEditSelectedSourceHandoffRenderer(options = {}) {
  return function renderSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createContract = typeof options.createContract === "function" ? options.createContract : () => ({});
    const contract = createContract(diagnostics);
    return renderSaveSlotEditSelectedSourceHandoffView({
      contract,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      fieldValue: translate(
        "editorPrep.saveEditSelectedSourceHandoffContract.fieldValue",
        { count: contract.fieldCount },
        `${contract.fieldCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditSelectedSourceHandoffContract.checkValue",
        { count: contract.checkCount },
        `${contract.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditSelectedSourceHandoffContract.blockedValue",
        { count: contract.blockedCheckCount },
        `${contract.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditSelectedSourceHandoffContract.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
