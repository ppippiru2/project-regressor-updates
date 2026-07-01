import { renderContentBulkFilterControls } from "./contentBulkFilterControlsView.js?v=680";

export function createContentBulkFilterControlsRenderer(options = {}) {
  return function renderContentBulkFilterControlsSection(text = {}, counts = {}) {
    const getFilter = typeof options.getFilter === "function" ? options.getFilter : () => ({});
    const getDomainFilters = typeof options.getDomainFilters === "function" ? options.getDomainFilters : () => ["all"];
    return renderContentBulkFilterControls(text, counts, {
      filter: getFilter(),
      domainFilters: getDomainFilters(),
    });
  };
}
