import { renderContentBulkPackageOverview } from "./contentBulkPackageOverviewView.js?v=679";

export function createContentBulkPackageOverviewRenderer(options = {}) {
  return function renderContentBulkPackageOverviewSection(preview = {}, detailText = {}, filterCounts = {}) {
    const renderFilterControls = typeof options.renderFilterControls === "function"
      ? options.renderFilterControls
      : null;
    return renderContentBulkPackageOverview(preview, detailText, filterCounts, {
      renderFilterControls: renderFilterControls
        ? (text, counts) => renderFilterControls(text, counts)
        : undefined,
    });
  };
}
