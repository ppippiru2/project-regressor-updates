import { renderContentBulkDomainApplyReadiness } from "./contentBulkDomainApplyReadinessView.js?v=680";

export function createContentBulkDomainApplyReadinessRenderer(options = {}) {
  return function renderContentBulkDomainApplyReadinessSection({
    filterCounts = {},
    filteredCandidatePreview = {},
  } = {}, detailText = {}) {
    const getFilter = typeof options.getFilter === "function" ? options.getFilter : () => null;
    const matchesFilterRow = typeof options.matchesFilterRow === "function"
      ? options.matchesFilterRow
      : () => true;
    const activeFilter = typeof options.activeFilter === "function"
      ? options.activeFilter
      : () => ({});
    const domainLabel = typeof options.domainLabel === "function"
      ? options.domainLabel
      : (id) => id || "unknown";

    return renderContentBulkDomainApplyReadiness({
      dryRun: resolvePreviewOption(options.dryRun),
      stagedImport: resolvePreviewOption(options.stagedImport),
      filePatchDraftExport: resolvePreviewOption(options.filePatchDraftExport),
      backupPlan: resolvePreviewOption(options.backupPlan),
      restoreRehearsal: resolvePreviewOption(options.restoreRehearsal),
      filterCounts,
      filteredCandidatePreview,
    }, detailText, {
      activeFilter: (text) => activeFilter(getFilter(), text),
      matchesFilterRow: (state, values, domains) => matchesFilterRow(getFilter(), state, values, domains),
      domainLabel,
    });
  };
}

function resolvePreviewOption(value) {
  return typeof value === "function" ? value() : value || {};
}
