import { renderContentBulkPatchPackageAdapterPreview } from "./contentBulkPatchPackageAdapterView.js?v=677";

export function createContentBulkPatchPackageAdapterPreviewRenderer(options = {}) {
  return function renderContentBulkPatchPackageAdapterPreviewSection(preview = {}, detailText = {}) {
    const getInput = typeof options.getInput === "function" ? options.getInput : () => ({});
    const getParseError = typeof options.getParseError === "function" ? options.getParseError : () => "";
    const isMappingVisible = typeof options.isMappingVisible === "function"
      ? options.isMappingVisible
      : () => true;
    return renderContentBulkPatchPackageAdapterPreview(preview, detailText, {
      input: getInput(),
      parseError: getParseError(),
      isMappingVisible,
    });
  };
}
