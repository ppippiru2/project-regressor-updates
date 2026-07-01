import { renderContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContractView.js?v=678";

export function createContentBulkPatchIntakeContractRenderer(options = {}) {
  return function renderContentBulkPatchIntakeContractSection(detailText = {}) {
    const getContract = typeof options.getContract === "function" ? options.getContract : () => ({});
    return renderContentBulkPatchIntakeContract(getContract(), detailText);
  };
}
