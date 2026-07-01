import {
  createContentBulkFilteredCandidateStageGateCountsFromPreview,
  createContentBulkFilteredCandidateStageGateReasonCodesFromPreview,
} from "./contentBulkFilteredCandidateStageGate.js?v=677";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=677";
import {
  contentBulkDomainBlockedStageIds,
  contentBulkStageGateReasonLabels,
  contentBulkStageGateStatusLabels,
} from "./contentBulkStageGatePreviewLabels.js?v=677";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=677";

export const CONTENT_BULK_DOMAIN_FILTER_DRILLDOWN_VERSION = "content-bulk-domain-filter-drilldown-v1";

const DETAIL_CHIP_OPTIONS = {
  blockClass: "",
  titleTag: "small",
  filterEmpty: true,
  emptyValue: "-",
};

export function renderContentBulkDomainFilterDrilldown(rows = [], text = {}, helpers = {}) {
  const summary = createContentBulkDomainFilterDrilldownSummary(rows, helpers.filteredCandidatePreview);
  const domainLabel = helpers.domainLabel || ((id) => id || "unknown");
  const stageGateReasonLabels = {
    ...(text.stageGateReasonLabels || {}),
    ...(helpers.stageGateReasonLabels || {}),
  };
  const state = summary.blockedDomainCount > 0 ? "blocked" : rows.length ? "ready" : "empty";
  const metrics = [
    [text.filteredDomains || "Filtered domains", `${rows.length}`],
    [text.dryRunBlockedDomains || "Dry-run blocked", `${summary.stageCounts.dryRun}`],
    [text.stagedBlockedDomains || "Staged blocked", `${summary.stageCounts.staged}`],
    [text.backupBlockedDomains || "Backup blocked", `${summary.stageCounts.backup}`],
    [text.restoreBlockedDomains || "Restore blocked", `${summary.stageCounts.restore}`],
    [text.stageGateReadyRows || "Stage gate ready", `${summary.stageGateCounts.ready}`],
    [text.stageGateReviewRows || "Stage gate review", `${summary.stageGateCounts.review}`],
    [text.stageGateBlockedRows || "Stage gate blocked", `${summary.stageGateCounts.blocked}`],
    [text.stageGateNotStagedRows || "Stage gate not staged", `${summary.stageGateCounts.notStaged}`],
    [text.stageGateReasons || "Stage gate reasons", `${summary.stageGateReasonCount}`],
  ];
  return `
    <div class="editor-content-bulk-contract-summary editor-content-bulk-domain-filter-drilldown" data-state="${escapeAttribute(state)}">
      <div>
        <strong>${escapeHtml(text.filterDrilldownTitle || "Current filter blocker drilldown")}</strong>
        <p class="muted">${escapeHtml(text.filterDrilldownHint || "Stage blockers only for domains matching the current filter.")}</p>
      </div>
      <div class="editor-content-bulk-contract-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-contract-issues">
        ${contentBulkChipBlock(text.filterDrilldownDomains || "Visible domains", rows.map((row) => domainLabel(row.id)), DETAIL_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.stageGateStatus || "Stage gate status", contentBulkStageGateStatusLabels(summary.stageGateCounts, text), DETAIL_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.stageGateReasons || "Stage gate reasons", contentBulkStageGateReasonLabels(summary.stageGateReasonCodes, stageGateReasonLabels, text), DETAIL_CHIP_OPTIONS)}
      </div>
    </div>
  `;
}

export function createContentBulkDomainFilterDrilldownSummary(rows = [], filteredCandidatePreview = {}) {
  const stageCounts = contentBulkDomainStageCounts(rows);
  const stageGateCounts = createContentBulkFilteredCandidateStageGateCountsFromPreview(filteredCandidatePreview);
  const stageGateReasonCodes = createContentBulkFilteredCandidateStageGateReasonCodesFromPreview(filteredCandidatePreview);
  return {
    filteredDomainCount: rows.length,
    blockedDomainCount: rows.filter((row) => row.state === "blocked").length,
    stageCounts,
    stageGateCounts,
    stageGateReasonCodes,
    stageGateReasonCount: stageGateReasonCodes.length,
    blockedStageCount: Object.values(stageCounts).reduce((sum, count) => sum + Number(count || 0), 0),
    stageGateReviewOrBlockedCount: Number(stageGateCounts.review || 0) + Number(stageGateCounts.blocked || 0),
  };
}

function contentBulkDomainStageCounts(rows = []) {
  return rows.reduce((counts, row) => {
    for (const stageId of contentBulkDomainBlockedStageIds(row.stageBlockerGroups)) {
      counts[stageId] = Number(counts[stageId] || 0) + 1;
    }
    return counts;
  }, {
    dryRun: 0,
    staged: 0,
    backup: 0,
    restore: 0,
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
