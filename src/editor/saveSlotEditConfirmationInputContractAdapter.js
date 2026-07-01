import { renderSaveSlotEditConfirmationInputContractView } from "./saveSlotEditConfirmationInputContractView.js?v=676";

export function createSaveSlotEditConfirmationInputContractRenderer(options = {}) {
  return function renderSaveSlotEditConfirmationInputContractPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createContract = typeof options.createContract === "function" ? options.createContract : () => ({});
    const contract = createContract(diagnostics);
    return renderSaveSlotEditConfirmationInputContractView({
      contract,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      fieldValue: translate(
        "editorPrep.saveEditConfirmationInputContract.fieldValue",
        { count: contract.fieldCount },
        `${contract.fieldCount}`,
      ),
      guardValue: translate(
        "editorPrep.saveEditConfirmationInputContract.guardValue",
        { count: contract.guardCount },
        `${contract.guardCount}`,
      ),
      blockerValue: translate(
        "editorPrep.saveEditConfirmationInputContract.blockerValue",
        { count: contract.blockerCount },
        `${contract.blockerCount}`,
      ),
    });
  };
}
