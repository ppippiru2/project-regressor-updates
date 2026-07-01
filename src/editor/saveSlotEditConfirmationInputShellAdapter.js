import { renderSaveSlotEditConfirmationInputShellView } from "./saveSlotEditConfirmationInputShellView.js?v=680";

export function createSaveSlotEditConfirmationInputShellRenderer(options = {}) {
  return function renderSaveSlotEditConfirmationInputShellContractPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const statusLabel = typeof options.statusLabel === "function" ? options.statusLabel : (status) => status || "";
    const createContract = typeof options.createContract === "function" ? options.createContract : () => ({});
    const contract = createContract(diagnostics);
    return renderSaveSlotEditConfirmationInputShellView({
      contract,
      text,
      metricCard: options.metricCard,
      statusLabel,
      fieldValue: translate(
        "editorPrep.saveEditConfirmationInputShellContract.fieldValue",
        { count: contract.fieldCount },
        `${contract.fieldCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditConfirmationInputShellContract.checkValue",
        { count: contract.checkCount },
        `${contract.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditConfirmationInputShellContract.blockedValue",
        { count: contract.blockedCheckCount },
        `${contract.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditConfirmationInputShellContract.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
      fieldStatusLabel: (field) => statusLabel(
        field.status === "not-created" || field.status === "disabled" || field.status === "not-evaluated"
          ? "blocked"
          : "ready",
      ),
    });
  };
}
